import React from "react";
import ShinyText from "../ShinyText";
import Btn from "./Btn";
  
const Hero = () => {

  return (
    <section className=" relative h-screen w-full bg-black overflow-hidden  flex flex-col items-center justify-center">
    

      <div className="relative w-full h-full z-10 text-center  flex flex-col items-center   justify-center">
        <div className="md:w-[70%] w-full md:px-10 px-5">
          <h1 className="hero-title text-4xl md:text-6xl lg:text-7xl font-extrabold capitalize text-white text-center">
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
