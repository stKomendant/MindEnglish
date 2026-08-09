import { Play, Pencil, Trash2, Star } from "lucide-react";
import type { Word } from "../../store/wordStore";

interface WordCardProps {
  word: Word;
  onSpeak: (text: string) => void;
  onEdit: (id: string, word: string, definition: string, example: string) => void;
  onDelete: (id: string) => void;
}

export const WordCard = ({ word, onSpeak, onEdit, onDelete }: WordCardProps) => {
  return (
   <div
  className="flex flex-col sm:flex-row items-start sm:items-center gap-3 sm:gap-4 px-5 py-4 border-b border-[#3a2166] last:border-b-0
  hover:bg-white/5 transition-colors"
>
  <div className="flex items-center gap-4 w-full sm:w-auto sm:flex-1 min-w-0">
  <div className="w-10 h-10 rounded-full bg-[#6d28d9]/30 flex items-center justify-center text-lg font-bold shrink-0">
    {word.word.charAt(0).toUpperCase()}
  </div>

  <div className="flex-1 min-w-0">
    <div className="font-semibold text-lg">{word.word}</div>
    <div className="text-sm text-[#8577a8] truncate">
      {word.definition}
      {word.example && <span className="italic"> — {word.example}</span>}
    </div>
  </div>
</div>
  <div className="flex items-center gap-2 self-end sm:self-auto">
    <button
      onClick={() => onSpeak(word.word)}
      className="w-9 h-9 shrink-0 rounded-full bg-[#6d28d9] hover:bg-[#7c3aed] flex items-center justify-center transition-colors"
      title="Прослухати"
    >
      <Play size={16} fill="white" />
    </button>

    <button
      onClick={() => onEdit(word.id, word.word, word.definition || "", word.example || "")}
      className="w-9 h-9 shrink-0 rounded-full hover:bg-white/10 flex items-center justify-center transition-colors"
      title="Редагувати"
    >
      <Pencil size={16} />
    </button>

    <button
      onClick={() => onDelete(word.id)}
      className="w-9 h-9 shrink-0 rounded-full hover:bg-red-500/20 text-red-400 flex items-center justify-center transition-colors"
      title="Видалити"
    >
      <Trash2 size={16} />
    </button>

    <button
      className="w-9 h-9 shrink-0 rounded-full hover:bg-white/10 flex items-center justify-center transition-colors"
      title="До обраного"
    >
      <Star size={16} />
    </button>
  </div>
</div>
  );
};