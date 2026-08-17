import QuickGame from "./Sections-home/BlockQuickGame";
import BlockMyWords from "./Sections-home/BlockMyWords";
import BlockRecentaActivity from "./Sections-home/BlockRecentaActivity";

import BlockMyProfile from "./Sections-profile/BlockMyProfile";
import BlockRegister from "./Sections-profile/BlockRegister";

export const Home = () => {
  return (
<main className="w-full grid grid-cols-1 lg:grid-cols-[60%_1fr] gap-1 lg:gap-4">
      <section className="order-2 lg:order-1">
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

  <section className="order-1 lg:order-2 flex flex-col gap-4 mb-6 lg:mb-0">
        <BlockMyProfile />
        <BlockRegister />
      </section>
    </main>
  );
};
