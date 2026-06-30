import { lazy} from "react";
import Hero from "../components/games/Hero";

const GamesText = lazy(() => import("../components/games/GamesText"));
const PublishSteps = lazy(() => import("../components/games/PublishSteps"));
const AllGames = lazy(() => import("../components/games/AllGames"));

const Games = () => {
  return (
    <div>
      <Hero />

      
        <GamesText />
        <PublishSteps />
        <AllGames />
     
    </div>
  );
};

export default Games;