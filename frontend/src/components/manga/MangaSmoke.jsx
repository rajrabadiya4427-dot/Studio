import { Cloud } from "@react-three/drei";

const MangaSmoke = () => {
  return (
    <>
      <Cloud
        position={[2, -2, -4]}
        bounds={[8, 3, 3]}
        segments={15}
        volume={3}
        opacity={0.25}
        speed={0.15}
        color="#bf5af2"
      />

      <Cloud
        position={[-3, 1, -5]}
        bounds={[6, 3, 3]}
        segments={15}
        volume={4}
        opacity={0.15}
        speed={0.1}
        color="#3a1d5d"
      /> 

      <Cloud
        position={[1, -3, -6]}
        bounds={[10, 4, 3]}
        segments={15}
        volume={4}
        opacity={0.2}
        speed={0.08}
        color="#ff2d55"
      /> 
    </>
  );
};

export default MangaSmoke;
