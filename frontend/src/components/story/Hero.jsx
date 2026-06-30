import {useState,useEffect } from "react";
import { Canvas } from "@react-three/fiber";
import StoryModel from "./StoryModel";
import StorySmoke from "./StorySmoke";
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
    <section className="relative h-screen w-full overflow-hidden bg-gradient-to-br from-black via-[#140605] to-black">
      {/* Left Content */}
      <div className="absolute left-[50%] -translate-x-1/2 top-1/2 md:left-[20%]  md:top-1/2 z-20 -translate-y-1/2 text-white">
        <h1 className="text-[12vw] md:text-[7vw] text-center leading-[0.9] md:text-left font-extrabold uppercase bg-gradient-to-r from-red-900 via-[#ff4000] to-[#ffcc00] bg-clip-text text-transparent">
          SACRED
          <br />
          TALES
        </h1>
        <p className="text-zinc-400 mt-4 text-xs md:text-sm max-w-xs text-center md:text-left tracking-wider ">
          Publish, read, and share immersive novels, short stories, and legendary chronicles.
        </p>
      </div>

      {/* 3D Scene */}
      <div className="absolute inset-0">
        <Canvas dpr={[1, 1.5]} gl={{ antialias: false, powerPreference: "high-performance" }} camera={{ position: [0, 0, 5], fov: 22 }}>
          <fog attach="fog" args={["#0a0303", 3, 20]} />

          {/* Lights */}
          <ambientLight intensity={0.5} />
          <directionalLight position={[4, 5, 5]} intensity={3} />

          <pointLight
            position={[2, 1, -3]}
            intensity={60}
            distance={25}
            color="#ff6b6b"
          />

          <pointLight
            position={[-3, -2, -4]}
            intensity={40}
            distance={20}
            color="#ff8e53"
          />

          {/* Models and Smoke */}
          <StorySmoke />
          {!isMobile && <StoryModel />}

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