import { Canvas } from "@react-three/fiber";
import RobotModel from "./RobotModel";
import Smoke from "./Smoke";
import { EffectComposer, Bloom } from "@react-three/postprocessing";
import { useState, useEffect } from "react";

const Hero = () => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  return (
    <section className="relative h-screen w-full overflow-hidden bg-gradient-to-br from-black via-[#120400] to-black">
      {/* Text – mobile par centre aur bada */}
      <div className="absolute left-[50%] -translate-x-1/2 top-1/2 md:left-[20%] md:top-1/2 z-20 -translate-y-1/2 text-white ">
        <h1 className="text-[12vw] md:text-[7vw] md:text-left text-center leading-[0.9] font-extrabold uppercase bg-gradient-to-r from-red-800 via-[#ff5a00] to-[#ff9a00] bg-clip-text text-transparent">
          NEXT
          <br />
          LEVEL
          <br />
          GAMING
        </h1>
        <p className="text-zinc-400 mt-4 text-xs md:text-sm max-w-xs md:text-left text-center tracking-wider">
          publish your own game in seconds.

        </p>
      </div>

      <div className="absolute inset-0">

        <Canvas dpr={[1, 1.5]} shadows={false} gl={{ antialias: false, powerPreference: "high-performance" }} camera={{ position: [0, 0, 5], fov: 22 }}>
          <fog attach="fog" args={["#050505", 3, 22]} />
          <ambientLight intensity={0.6} />
          <directionalLight position={[4, 5, 5]} intensity={3} />
          <Smoke />
          <pointLight position={[5, 1, -3]} intensity={80} distance={25} color="#ff5a00" />
          <pointLight position={[4, -4, -4]} intensity={50} distance={20} color="#ff9a00" />

          {!isMobile && (<RobotModel />)}


          <EffectComposer>
            <Bloom intensity={0.7} mipmapBlur />
          </EffectComposer>
        </Canvas>


      </div>
    </section>
  );
};

export default Hero;