import { useEffect } from "react";
import { Lock, Check } from "lucide-react";
import { useAchievementStore } from "../../store/achievementStore";
import { useAuthStore } from "../../store/authStore";

export const Statistics = () => {
  const { isAuthenticated } = useAuthStore();
  const { achievements, isLoading, fetchAchievements } = useAchievementStore();

  useEffect(() => {
    if (isAuthenticated) {
      fetchAchievements();
    }
  }, [isAuthenticated]);

  if (!isAuthenticated) {
    return (
      <div className="text-[#CFC5E9]">
        <h1 className="text-2xl font-bold mb-2">Статистика</h1>
        <p>Увійдіть в акаунт, щоб побачити свою статистику.</p>
      </div>
    );
  }

  const unlockedCount = achievements.filter((a) => a.unlocked).length;

  return (
    <div className="text-[#CFC5E9]">
      <h1 className="text-2xl font-bold mb-2">Статистика</h1>

      <div className="flex items-center justify-between mb-5">
        <h2 className="text-lg font-semibold">Досягнення</h2>
        {achievements.length > 0 && (
          <p className="text-sm text-[#8577a8]">
            {unlockedCount} / {achievements.length}
          </p>
        )}
      </div>

      {isLoading ? (
        <p className="text-[#8577a8]">Завантаження...</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {achievements.map((achievement) => (
            <div
              key={achievement.id}
              className={`rounded-xl p-5 border transition-colors ${
                achievement.unlocked
                  ? "bg-[#1d0a44] border-[#6d28d9]"
                  : "bg-[#1d0a44]/40 border-[#3a2166] opacity-60"
              }`}
            >
              <div className="flex items-center gap-3 mb-2">
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 ${
                    achievement.unlocked
                      ? "bg-gradient-to-br from-[#6d28d9] to-[#bf33ff]"
                      : "bg-[#3a2166]"
                  }`}
                >
                  {achievement.unlocked ? (
                    <Check size={18} />
                  ) : (
                    <Lock size={16} className="text-[#8577a8]" />
                  )}
                </div>
                <h3 className="font-bold">{achievement.title}</h3>
              </div>
              <p className="text-sm text-[#8577a8]">{achievement.description}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};