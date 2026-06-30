import { Cloud } from "@react-three/drei";

const Smoke = () => {
  return (
    <>
      <Cloud
        position={[4, -4, -5]}
        bounds={[12, 4, 4]}
        segments={20}
        volume={3}
        opacity={0.22}
        speed={0.12}
        color="#ff2d00"
      />

     <Cloud
        position={[5, -2, -6]}
        bounds={[10, 4, 4]}
        segments={20}
        volume={5}
        opacity={0.18}
        speed={0.09}
        color="black"
      /> 


       <Cloud
        position={[2, -5, -8]}
        bounds={[14, 5, 4]}
        segments={20}
        volume={5}
        opacity={0.15}
        speed={0.04}
        color="red"
      /> 
    </>
  );
};

export default Smoke;