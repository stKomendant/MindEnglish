import { useEffect, useState } from "react";
import { Plus, Search } from "lucide-react";
import { useWordStore } from "../../store/wordStore";
import { useAuthStore } from "../../store/authStore";
import { WordCard } from "../../components/Words/WordCard";
import { WordFormModal } from "../../components/Words/WordFormModal";

export const Dictionary = () => {
  const { isAuthenticated } = useAuthStore();
  const { words, isLoading, error, fetchWords, createWord, updateWord, deleteWord } = useWordStore();

  const [search, setSearch] = useState("");

  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);

  const [word, setWord] = useState("");
  const [definition, setDefinition] = useState("");
  const [example, setExample] = useState("");

  useEffect(() => {
    if (isAuthenticated) {
      fetchWords();
    }
  }, [isAuthenticated]);

  const resetForm = () => {
    setWord("");
    setDefinition("");
    setExample("");
    setEditingId(null);
    setIsFormOpen(false);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!word.trim()) return;

    if (editingId) {
      await updateWord(editingId, word, definition, example);
    } else {
      await createWord(word, definition, example);
    }
    resetForm();
  };

  const openCreateForm = () => {
    setEditingId(null);
    setWord("");
    setDefinition("");
    setExample("");
    setIsFormOpen(true);
  };

  const openEditForm = (id: string, w: string, d: string, ex: string) => {
    setEditingId(id);
    setWord(w);
    setDefinition(d);
    setExample(ex);
    setIsFormOpen(true);
  };

  const handleDelete = async (id: string) => {
    await deleteWord(id);
  };

  const speak = (text: string) => {
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = "en-US";
    utterance.rate = 0.5;
    window.speechSynthesis.speak(utterance);
  };

  const filteredWords = words.filter((w) =>
    w.word.toLowerCase().includes(search.toLowerCase())
  );

  if (!isAuthenticated) {
    return (
      <div className="text-[#CFC5E9]">
        <h1 className="text-2xl font-bold mb-2">Словник</h1>
        <p>Увійдіть в акаунт, щоб побачити свій словник.</p>
      </div>
    );
  }

  return (
    <div className="text-[#CFC5E9]">
      <h1 className="text-2xl font-bold">Словник</h1>
      <p className="text-sm text-[#8577a8] mb-4">Вивчай нові слова щодня</p>

      <div className="flex items-center gap-3 mb-5">
        <div className="relative flex-1 max-w-md">
          <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#8577a8]" />
          <input
            type="text"
            placeholder="Пошук слова..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full bg-[#1d0a44] border border-[#3a2166] rounded-lg pl-10 pr-4 py-2
            placeholder:text-[#8577a8] focus:outline-none focus:border-[#6d28d9]"
          />
        </div>

        <button
          onClick={openCreateForm}
          className="flex items-center gap-2 bg-[#1d0a44] hover:bg-[#2a1259] border border-[#3a2166]
          transition-colors rounded-lg px-4 py-2 font-medium text-sm shrink-0"
        >
          <Plus size={16} />
          Додати слово
        </button>
      </div>

      {isFormOpen && (
        <WordFormModal
          isEditing={!!editingId}
          word={word}
          definition={definition}
          example={example}
          isLoading={isLoading}
          onWordChange={setWord}
          onDefinitionChange={setDefinition}
          onExampleChange={setExample}
          onSubmit={handleSubmit}
          onClose={resetForm}
        />
      )}

      {error && <p className="text-red-400 text-sm mb-3">{error}</p>}

      <div className="bg-[#1d0a44] border border-[#3a2166] rounded-xl overflow-hidden">
        {isLoading && filteredWords.length === 0 ? (
          <p className="p-5 text-[#8577a8]">Завантаження...</p>
        ) : filteredWords.length === 0 ? (
          <p className="p-5 text-[#8577a8]">Слово не знайдено</p>
        ) : (
          filteredWords.map((w) => (
            <WordCard
              key={w.id}
              word={w}
              onSpeak={speak}
              onEdit={openEditForm}
              onDelete={handleDelete}
            />
          ))
        )}
      </div>

      <button
        onClick={openCreateForm}
        className="fixed bottom-8 right-8 w-14 h-14 rounded-full bg-gradient-to-br from-[#6d28d9] to-[#4c1d95]
        hover:from-[#7c3aed] hover:to-[#5b21b6] transition-all duration-300 shadow-lg shadow-black/40
        flex items-center justify-center z-40"
        title="Додати слово"
      >
        <Plus size={24} />
      </button>
    </div>
  );
};