import { useState, useEffect } from "react";
import { Canvas } from "@react-three/fiber";
import MangaModel from "./MangaModel";
import MangaSmoke from "./MangaSmoke";
import { EffectComposer, Bloom } from "@react-three/postprocessing";

const Hero = () => {

  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);
  
  return (
    <section className="relative h-screen w-full overflow-hidden bg-gradient-to-br from-black via-[#0d0314] to-black">
      {/* Left Content */}
      <div className="absolute left-[50%] -translate-x-1/2 top-1/2 md:left-[20%]  md:top-1/2 z-20 -translate-y-1/2 text-white">
        <h1 className="text-[12vw] md:text-[7vw] text-center md:text-left leading-[0.9] font-extrabold uppercase bg-gradient-to-r from-white via-[#bf5af2] to-[#ff2d55] bg-clip-text text-transparent">
          MANGA
          <br />
          UNIVERSE
        </h1>
        <p className="text-zinc-400 mt-4 text-xs md:text-sm max-w-xs md:text-left text-center tracking-wider">
          Explore and publish immersive graphic stories, custom panels, and community manga.
        </p>
      </div>

      {/* 3D Scene */}
      <div className="absolute inset-0">
        <Canvas dpr={[1, 1.5]} gl={{ antialias: false, powerPreference: "high-performance" }} camera={{ position: [0, 0, 5], fov: 22 }}>
          <fog attach="fog" args={["#050208", 3, 20]} />

          {/* Lights */}
          <ambientLight intensity={0.5} />
          <directionalLight position={[4, 5, 5]} intensity={3} />

          <pointLight
            position={[2, 1, -3]}
            intensity={60}
            distance={25}
            color="#bf5af2"
          />

          <pointLight
            position={[-3, -2, -4]}
            intensity={40}
            distance={20}
            color="#ff2d55"
          />

          {/* Models and Smoke */}
          <MangaSmoke />

          {!isMobile && <MangaModel />}


          {/* Bloom Postprocessing */}
          <EffectComposer>
            <Bloom
              intensity={1.2}
              mipmapBlur
            />
          </EffectComposer>
        </Canvas>
      </div>
    </section>
  );
};

export default Hero;