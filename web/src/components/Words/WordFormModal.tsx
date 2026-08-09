import { X } from "lucide-react";

interface WordFormModalProps {
  isEditing: boolean;
  word: string;
  definition: string;
  example: string;
  isLoading: boolean;
  onWordChange: (value: string) => void;
  onDefinitionChange: (value: string) => void;
  onExampleChange: (value: string) => void;
  onSubmit: (e: React.FormEvent) => void;
  onClose: () => void;
}

export const WordFormModal = ({
  isEditing,
  word,
  definition,
  example,
  isLoading,
  onWordChange,
  onDefinitionChange,
  onExampleChange,
  onSubmit,
  onClose,
}: WordFormModalProps) => {
  return (
   <div
  onClick={onClose}
  className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4"
>
     <form
  onClick={(e) => e.stopPropagation()}
  onSubmit={onSubmit}
  className="bg-[#1d0a44] border border-[#3a2166] rounded-xl p-6 flex flex-col gap-3 w-full max-w-md max-h-[90vh] overflow-y-auto"
>
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-bold">
            {isEditing ? "Редагувати слово" : "Нове слово"}
          </h2>
          <button type="button" onClick={onClose} className="text-[#8577a8] hover:text-white">
            <X size={20} />
          </button>
        </div>

        <input
          type="text"
          placeholder="Слово (англійською)"
          value={word}
          onChange={(e) => onWordChange(e.target.value)}
          className="bg-[#150733] border border-[#3a2166] rounded-lg px-3 py-2
          placeholder:text-[#8577a8] focus:outline-none focus:border-[#6d28d9]"
        />
        <input
          type="text"
          placeholder="Переклад"
          value={definition}
          onChange={(e) => onDefinitionChange(e.target.value)}
          className="bg-[#150733] border border-[#3a2166] rounded-lg px-3 py-2
          placeholder:text-[#8577a8] focus:outline-none focus:border-[#6d28d9]"
        />
        <input
          type="text"
          placeholder="Приклад речення"
          value={example}
          onChange={(e) => onExampleChange(e.target.value)}
          className="bg-[#150733] border border-[#3a2166] rounded-lg px-3 py-2
          placeholder:text-[#8577a8] focus:outline-none focus:border-[#6d28d9]"
        />

        <button
          type="submit"
          disabled={isLoading}
          className="bg-gradient-to-br from-[#6d28d9] to-[#4c1d95] hover:from-[#7c3aed]
          hover:to-[#5b21b6] transition-all duration-300 rounded-lg py-2 font-semibold mt-1"
        >
          {isEditing ? "Зберегти" : "Додати"}
        </button>
      </form>
    </div>
  );
};