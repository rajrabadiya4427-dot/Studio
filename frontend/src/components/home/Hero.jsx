import React from "react";
import ShinyText from "../ShinyText";
import Btn from "./Btn";
  
const Hero = () => {

  return (
    <section className="relative h-screen w-full bg-slate-950 overflow-hidden flex flex-col items-center justify-center">
      {/* Background glowing blobs */}
      <div className="absolute top-[-10%] left-[-10%] w-[40vw] h-[40vw] rounded-full bg-purple-600/30 blur-[120px] animate-pulse pointer-events-none"></div>
      <div className="absolute bottom-[-10%] right-[-10%] w-[40vw] h-[40vw] rounded-full bg-blue-600/30 blur-[120px] animate-pulse pointer-events-none" style={{ animationDelay: '1s' }}></div>
      <div className="absolute top-[20%] right-[20%] w-[30vw] h-[30vw] rounded-full bg-emerald-500/20 blur-[100px] animate-pulse pointer-events-none" style={{ animationDelay: '2s' }}></div>

      {/* Grid pattern overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)] bg-[size:14px_24px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] pointer-events-none"></div>

      <div className="relative w-full h-full z-10 text-center flex flex-col items-center justify-center">
        <div className="md:w-[70%] w-full md:px-10 px-5">
          <h1 className="hero-title text-4xl md:text-6xl lg:text-7xl font-extrabold capitalize text-transparent bg-clip-text bg-gradient-to-b from-white to-gray-400 text-center drop-shadow-md">
            Publishes your Games, Manga & Story
          </h1>

          <ShinyText
            className="my-3 md:my-5 text-center text-sm md:text-lg"
            text="✨ we are helping you to Publishes your Games, Manga, Story and more"
            speed={2}
            delay={0}
            color="white"
            shineColor="gray"
            spread={120}
            direction="left"
            yoyo={false}
            pauseOnHover={false}
            disabled={false}
          />
        </div>

     <Btn/>
      </div>
    </section>
  );
};

export default Hero;
