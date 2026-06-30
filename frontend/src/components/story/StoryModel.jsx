import { useRef } from "react";
import { useFrame } from "@react-three/fiber";

const StoryModel = () => {
    const groupRef = useRef();
    const coreRef = useRef();
    const ring1Ref = useRef();
    const ring2Ref = useRef();

    const isMobile = window.innerWidth < 768;

    useFrame(({ clock }) => {
        const t = clock.getElapsedTime();

        // Slow overall rotation and floating movement
        if (groupRef.current) {
            groupRef.current.position.y = (isMobile ? -0.8 : -0.2) + Math.sin(t * 1.2) * 0.06;
            groupRef.current.rotation.y = t * 0.15;
        }

        // Fast core rotation
        if (coreRef.current) {
            coreRef.current.rotation.y = -t * 0.8;
            coreRef.current.rotation.x = Math.sin(t * 1.5) * 0.3;
        }

        // Ring animations
        if (ring1Ref.current) {
            ring1Ref.current.rotation.z = t * 0.4;
            ring1Ref.current.rotation.x = Math.sin(t) * 0.5;
        }
        if (ring2Ref.current) {
            ring2Ref.current.rotation.z = -t * 0.3;
            ring2Ref.current.rotation.y = Math.cos(t) * 0.5;
        }
    });

    return (
        <group ref={groupRef} scale={isMobile ? 0.65 : 1.1} position={isMobile ? [0, -0.8, 0] : [1.1, -0.2, 0]}>
            {/* Central glowing crystal/prism */}
            <mesh ref={coreRef}>
                <octahedronGeometry args={[0.7, 0]} />
                <meshStandardMaterial
                    color="#ff6b6b"
                    emissive="#ff3333"
                    emissiveIntensity={1.5}
                    roughness={0.1}
                    metalness={0.9}
                    flatShading
                />
            </mesh>

            {/* Glowing Ring 1 (Inner) */}
            <mesh ref={ring1Ref} rotation={[Math.PI / 4, 0, 0]}>
                <torusGeometry args={[1.2, 0.04, 8, 48]} />
                <meshBasicMaterial color="#ff8e53" wireframe />
            </mesh>

            {/* Glowing Ring 2 (Outer) */}
            <mesh ref={ring2Ref} rotation={[0, Math.PI / 3, 0]}>
                <torusGeometry args={[1.6, 0.03, 8, 64]} />
                <meshBasicMaterial color="#ff4e50" wireframe />
            </mesh>

            {/* Star constellation/ideas particles */}
            <points>
                <bufferGeometry>
                    <bufferAttribute
                        attach="attributes-position"
                        args={[
                            new Float32Array([
                                -2.0, 0.5, 0.5,
                                2.0, -0.5, -0.5,
                                -1.0, 1.8, 1.0,
                                1.0, -1.8, 1.0,
                                -1.5, -1.0, -1.0,
                                1.5, 1.0, -1.0,
                                0, 2.0, -1.2,
                                0, -2.0, 1.2,
                                -0.5, -1.5, 1.8,
                                0.5, 1.5, -1.8,
                                -2.5, 0, -1.0,
                                2.5, 0, 1.0
                            ]),
                            3
                        ]}
                    />
                </bufferGeometry>
                <pointsMaterial color="#ff6b6b" size={0.08} sizeAttenuation />
            </points>
        </group>
    );
};

export default StoryModel;
