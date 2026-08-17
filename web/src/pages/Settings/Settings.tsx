import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Trash2, X } from "lucide-react";
import { useAuthStore } from "../../store/authStore";

export const Settings = () => {
  const { user, updateUsername, changePassword, deleteAccount, error, isLoading } = useAuthStore();
  const navigate = useNavigate();

  const [username, setUsername] = useState(user?.username || "");
  const [usernameSuccess, setUsernameSuccess] = useState(false);

  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [passwordSuccess, setPasswordSuccess] = useState(false);

  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [deleteConfirmText, setDeleteConfirmText] = useState("");

  const handleUpdateUsername = async (e: React.FormEvent) => {
      e.preventDefault();
  if (!username.trim()) return;

    setUsernameSuccess(false);
    try {
      await updateUsername(username);
      setUsernameSuccess(true);
    } catch {
      //
    }
  };

  const handleChangePassword = async (e: React.FormEvent) => {    
    e.preventDefault();
    if (!currentPassword.trim() || !newPassword.trim()) return;

    setPasswordSuccess(false);
    try {
      await changePassword(currentPassword, newPassword);
      setPasswordSuccess(true);
      setCurrentPassword("");
      setNewPassword("");
    } catch {
      //
    }
  };

  const handleDeleteAccount = async () => {
    try {
      await deleteAccount();
      navigate("/");
    } catch {
      //
    }
  };

  return (
    <div className="text-[#CFC5E9] max-w-lg">
      <h1 className="text-2xl font-bold mb-6">Налаштування</h1>

      <form
        onSubmit={handleUpdateUsername}
        className="bg-[#1d0a44] border border-[#3a2166] rounded-xl p-5 mb-5"
      >
        <h2 className="text-lg font-bold mb-3">Ім'я користувача</h2>
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="w-full bg-[#150733] border border-[#3a2166] rounded-lg px-3 py-2 mb-3
          placeholder:text-[#8577a8] focus:outline-none focus:border-[#6d28d9]"
        />
        {usernameSuccess && (
          <p className="text-green-400 text-sm mb-3">Ім'я оновлено!</p>
        )}
        <button
          type="submit"
          disabled={isLoading}
          className="bg-gradient-to-br from-[#6d28d9] to-[#4c1d95] hover:from-[#7c3aed]
          hover:to-[#5b21b6] transition-all duration-300 rounded-lg px-5 py-2 font-semibold"
        >
          Зберегти
        </button>
      </form>

      <form
        onSubmit={handleChangePassword}
        className="bg-[#1d0a44] border border-[#3a2166] rounded-xl p-5 mb-5"
      >
        <h2 className="text-lg font-bold mb-3">Зміна пароля</h2>
        <input
          type="password"
          placeholder="Поточний пароль"
          value={currentPassword}
          onChange={(e) => setCurrentPassword(e.target.value)}
          className="w-full bg-[#150733] border border-[#3a2166] rounded-lg px-3 py-2 mb-3
          placeholder:text-[#8577a8] focus:outline-none focus:border-[#6d28d9]"
        />
        <input
          type="password"
          placeholder="Новий пароль"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
          className="w-full bg-[#150733] border border-[#3a2166] rounded-lg px-3 py-2 mb-3
          placeholder:text-[#8577a8] focus:outline-none focus:border-[#6d28d9]"
        />
        {passwordSuccess && (
          <p className="text-green-400 text-sm mb-3">Пароль змінено!</p>
        )}
        <button
          type="submit"
          disabled={isLoading}
          className="bg-gradient-to-br from-[#6d28d9] to-[#4c1d95] hover:from-[#7c3aed]
          hover:to-[#5b21b6] transition-all duration-300 rounded-lg px-5 py-2 font-semibold"
        >
          Змінити пароль
        </button>
      </form>

      {error && <p className="text-red-400 text-sm mb-5">{error}</p>}

      <div className="bg-[#1d0a44] border border-red-500/30 rounded-xl p-5">
        <h2 className="text-lg font-bold mb-2">Видалення акаунта</h2>
        <p className="text-sm text-[#8577a8] mb-4">
          Цю дію неможливо скасувати. Всі ваші слова та результати ігор будуть
          видалені назавжди.
        </p>
        <button
          onClick={() => setIsDeleteModalOpen(true)}
          className="flex items-center gap-2 bg-red-600/20 hover:bg-red-600/30 text-red-400
          transition-colors rounded-lg px-5 py-2 font-semibold"
        >
          <Trash2 size={16} />
          Видалити акаунт
        </button>
      </div>

      {isDeleteModalOpen && (
        <div
          onClick={() => setIsDeleteModalOpen(false)}
          className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="bg-[#1d0a44] border border-red-500/30 rounded-xl p-6 w-full max-w-md"
          >
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-bold text-red-400">Видалити акаунт?</h2>
              <button
                onClick={() => setIsDeleteModalOpen(false)}
                className="text-[#8577a8] hover:text-white"
              >
                <X size={20} />
              </button>
            </div>

            <p className="text-sm text-[#8577a8] mb-4">
              Цю дію неможливо скасувати. Введіть{" "}
              <span className="font-bold text-white">DELETE</span>, щоб
              підтвердити видалення.
            </p>

            <input
              type="text"
              value={deleteConfirmText}
              onChange={(e) => setDeleteConfirmText(e.target.value)}
              placeholder="DELETE"
              className="w-full bg-[#150733] border border-[#3a2166] rounded-lg px-3 py-2 mb-4
              placeholder:text-[#8577a8] focus:outline-none focus:border-red-500"
            />

            <button
              onClick={handleDeleteAccount}
              disabled={deleteConfirmText !== "DELETE" || isLoading}
              className="w-full bg-red-600 hover:bg-red-700 disabled:opacity-40
              disabled:cursor-not-allowed transition-colors rounded-lg py-2 font-semibold"
            >
              Видалити назавжди
            </button>
          </div>
        </div>
      )}
    </div>
  );
};