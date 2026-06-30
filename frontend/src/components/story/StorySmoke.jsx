import { Cloud } from "@react-three/drei";

const StorySmoke = () => {
  return (
    <>
      <Cloud
        position={[3, -3, -5]}
        bounds={[9, 3, 3]}
        segments={15}
        volume={3}
        opacity={0.22}
        speed={0.12}
        color="#ff6b6b"
      />

      <Cloud
        position={[-2, 2, -6]}
        bounds={[8, 3, 3]}
        segments={15}
        volume={4}
        opacity={0.18}
        speed={0.08}
        color="#ff8e53"
      /> 

      <Cloud
        position={[2, -1, -7]}
        bounds={[12, 4, 3]}
        segments={15}
        volume={5}
        opacity={0.15}
        speed={0.05}
        color="black"
      /> 
    </>
  );
};

export default StorySmoke;
