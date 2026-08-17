import { useEffect } from "react";
import { useGameResultStore } from "../../../store/gameResultStore";
import { useAuthStore } from "../../../store/authStore";

const formatTimeAgo = (dateString: string): string => {
  const diffMs = Date.now() - new Date(dateString).getTime();
  const diffMinutes = Math.floor(diffMs / 1000 / 60);

  if (diffMinutes < 1) return "щойно";
  if (diffMinutes < 60) return `${diffMinutes} хв тому`;

  const diffHours = Math.floor(diffMinutes / 60);
  if (diffHours < 24) return `${diffHours} год тому`;

  const diffDays = Math.floor(diffHours / 24);
  return `${diffDays} дн тому`;
};

const BlockRecentaActivity = () => {
  const { isAuthenticated } = useAuthStore();
  const { results, fetchResults } = useGameResultStore();

  useEffect(() => {
    if (isAuthenticated) {
      fetchResults();
    }
  }, [isAuthenticated]);

  if (!isAuthenticated || results.length === 0) {
    return (
      <div className="w-full bg-[#1d0a44] rounded-xl p-4">
        <h2 className="pb-2 font-bold">Остання активність</h2>
        <p className="text-gray-400 text-sm">Ще немає зіграних ігор</p>
      </div>
    );
  }

  return (
    <>
      <div className="w-full bg-[#1d0a44] rounded-xl p-4">
        <h2 className="pb-2 font-bold">Остання активність</h2>
        <ul className="flex flex-col gap-2">
          {results.map((result) => (
            <li
              key={result.id}
              className="flex flex-col sm:flex-row sm:justify-between gap-2 sm:gap-4 bg-[#260e55] rounded-xl p-4"
            >
              <div className="flex justify-between sm:justify-start gap-4">
                <img
                  width={30}
                  height={30}
                  src="./images/icon/words/game.png"
                  alt=""
                />
                <h3>
                  Гра з повторення слів: {result.score}/{result.totalQuestions}
                </h3>
              </div>

              <div className="flex justify-between sm:justify-start gap-4">
                <p className="text-gray-400">{formatTimeAgo(result.createdAt)}</p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
};

export default BlockRecentaActivity;