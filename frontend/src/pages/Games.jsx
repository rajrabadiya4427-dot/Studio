import { lazy, Suspense } from "react";
import Hero from "../components/games/Hero";

const GamesText = lazy(() => import("../components/games/GamesText"));
const PublishSteps = lazy(() => import("../components/games/PublishSteps"));
const AllGames = lazy(() => import("../components/games/AllGames"));

const Games = () => {
  return (
    <div>
      <Hero />
      <Suspense fallback={<div className="products-loading"><div className="animate-pulse flex space-x-4"><div className="flex-1 space-y-6 py-1"><div className="h-2 bg-slate-700 rounded"></div></div></div></div>}>
        <GamesText />
        <PublishSteps />
        <AllGames />
      </Suspense>
    </div>
  );
};

export default Games;