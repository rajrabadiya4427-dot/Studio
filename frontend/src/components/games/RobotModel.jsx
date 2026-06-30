import { useGLTF } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useRef } from "react";

const RobotModel = () => {
  const group = useRef();

  const { scene } = useGLTF(
    "/models/modural_robot_mecha_chimera_dyan_high-poly_mesh.glb"
  );

  const isMobile = window.innerWidth < 768;

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();

    // Mobile: center Y (around 0.2), Desktop: keep as before
    const baseY = isMobile ? 0.2 : -6.5;
    group.current.position.y = baseY + Math.sin(t * 1.2) * 0.04;
  });

  return (
    <group
      ref={group}
      // Mobile: x=0 to center horizontally, z adjusted if needed
      position={ [0.8, 0.8, 0.5]}
    >
      <primitive
        object={scene}
        scale={isMobile ? 2.8 : 4.5}   // keep as is (no increase)
        rotation={[0, 5.5, 0]}
      />
    </group>
  );
};

export default RobotModel;