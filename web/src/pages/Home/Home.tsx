import QuickGame from "./Sections-home/BlockQuickGame";
import BlockMyWords from "./Sections-home/BlockMyWords";
import BlockRecentaActivity from "./Sections-home/BlockRecentaActivity";

import BlockMyProfile from "./Sections-profile/BlockMyProfile";
import BlockRegister from "./Sections-profile/BlockRegister";

export const Home = () => {
  return (
    <main className="w-full grid grid-cols-[60%_1fr] gap-4">
      <section>
        <QuickGame
          title="Гра з асоціаціями"
          description="Вчи слова через асоціації з реальними ситуаціями"
          word="хліб"
          wordTranslation="bread"
          img="./images/icon/words/bread.png"
        />
        <BlockMyWords />

        <BlockRecentaActivity />
      </section>

      <section className="grid grid-rows-[300px_200px] gap-3">
        <BlockMyProfile />
        <BlockRegister />
      </section>
    </main>
  );
};
