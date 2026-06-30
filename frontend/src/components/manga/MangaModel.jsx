import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { useTexture } from "@react-three/drei";

const MangaCard = ({ position, rotation, texture }) => {
    return (
        <group position={position} rotation={rotation}>
            {/* Card Glow/Shadow Backing */}
            <mesh position={[0, 0, -0.001]}>
                <planeGeometry args={[0.66, 1.01]} />
                <meshStandardMaterial 
                    color="#000000" 
                    emissive="#bf5af2" 
                    emissiveIntensity={0.8}
                    roughness={0.2}
                    metalness={0.8}
                />
            </mesh>
            {/* Card Outer Border */}
            <mesh position={[0, 0, 0]}>
                <planeGeometry args={[0.64, 0.99]} />
                <meshStandardMaterial color="#1a0b2e" roughness={0.5} />
            </mesh>
            {/* Card Image */}
            <mesh position={[0, 0, 0.002]}>
                <planeGeometry args={[0.6, 0.95]} />
                <meshStandardMaterial map={texture} roughness={0.3} metalness={0.1} />
            </mesh>
        </group>
    );
};

const MangaModel = () => {
    const groupRef = useRef();
    const leftPageRef = useRef();
    const rightPageRef = useRef();

    const isMobile = window.innerWidth < 768;

    // Load textures for the cards
    const manga1 = useTexture("/assets/images/manga1.png");
    const manga2 = useTexture("/assets/images/manga2.png");
    const manga3 = useTexture("/assets/images/manga3.png");
    const manga4 = useTexture("/assets/images/manga4.png");

    useFrame(({ clock }) => {
        const t = clock.getElapsedTime();

        // Slow rotation and floating animation
        if (groupRef.current) {
            groupRef.current.position.y = (isMobile ? -0.8 : -0.2) + Math.sin(t * 1.2) * 0.08;
        }

        // Slow page flapping animation
        if (leftPageRef.current && rightPageRef.current) {
            const flap = Math.sin(t * 2.5) * 0.04;
            leftPageRef.current.rotation.y = -0.25 + flap;
            rightPageRef.current.rotation.y = 0.25 - flap;
        }
    });

    return (
        <group ref={groupRef} scale={isMobile ? 0.65 : 1} position={isMobile ? [0, -0.8, 0] : [0.3, -0.5, 1]}  rotation={[-0.6, -0.8, -1.40]} >
            {/* The Book Spine */}
            <mesh position={[0, 0, -0.1]}>
                <boxGeometry args={[0.12, 1.8, 0.08]} />
                <meshStandardMaterial color="#2d124d" roughness={0.3} metalness={0.8} />
            </mesh>

            {/* Left Page Group (hinged at spine) */}
            <group ref={leftPageRef} position={[-0.05, 0, 0]}>
                {/* Book Cover (Back) */}
                <mesh position={[-0.55, 0, -0.04]} rotation={[0, 0, 0]}>
                    <boxGeometry args={[1.1, 1.85, 0.03]} />
                    <meshStandardMaterial color="#4a157d" roughness={0.4} metalness={0.7} />
                </mesh>

                {/* Paper Pages (Left Stack) */}
                <mesh position={[-0.52, 0, 0.01]}>
                    <boxGeometry args={[1.0, 1.75, 0.05]} />
                    <meshStandardMaterial color="#121212" roughness={0.9} />
                </mesh>

                {/* Cards on Left Page */}
                <MangaCard 
                    position={[-0.55, 0.22, 0.036]} 
                    rotation={[0, 0, -0.06]} 
                    texture={manga1} 
                />
                <MangaCard 
                    position={[-0.47, -0.22, 0.040]} 
                    rotation={[0, 0, 0.08]} 
                    texture={manga2} 
                />
            </group>

            {/* Right Page Group (hinged at spine) */}
            <group ref={rightPageRef} position={[0.05, 0, 0]}>
                {/* Book Cover (Front) */}
                <mesh position={[0.55, 0, -0.04]} rotation={[0, 0, 0]}>
                    <boxGeometry args={[1.1, 1.85, 0.03]} />
                    <meshStandardMaterial color="#4a157d" roughness={0.4} metalness={0.7} />
                </mesh>

                {/* Paper Pages (Right Stack) */}
                <mesh position={[0.52, 0, 0.01]}>
                    <boxGeometry args={[1.0, 1.75, 0.05]} />
                    <meshStandardMaterial color="#121212" roughness={0.9} />
                </mesh>

                {/* Cards on Right Page */}
                <MangaCard 
                    position={[0.47, 0.22, 0.036]} 
                    rotation={[0, 0, -0.08]} 
                    texture={manga3} 
                />
                <MangaCard 
                    position={[0.55, -0.22, 0.040]} 
                    rotation={[0, 0, 0.06]} 
                    texture={manga4} 
                />
            </group>

            {/* Decorative particles orbiting */}
            <points>
                <bufferGeometry>
                    <bufferAttribute
                        attach="attributes-position"
                        args={[
                            new Float32Array([
                                -1.2, 0.4, 0.2,
                                1.2, -0.4, -0.2,
                                -0.6, 1.0, 0.4,
                                0.6, -1.0, 0.4,
                                -1.0, -0.6, -0.4,
                                1.0, 0.6, -0.4,
                                0, 1.2, -0.6,
                                0, -1.2, 0.6
                            ]),
                            3
                        ]}
                    />
                </bufferGeometry>
                <pointsMaterial color="#bf5af2" size={0.06} sizeAttenuation />
            </points>
        </group>
    );
};

export default MangaModel;
