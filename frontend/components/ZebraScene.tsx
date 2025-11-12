'use client';

import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Float } from '@react-three/drei';
import * as THREE from 'three';

function Zebra() {
    const meshRef = useRef<THREE.Mesh>(null);

    useFrame((state) => {
        if (meshRef.current) {
            meshRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.3) * 0.2;
            meshRef.current.position.y = Math.sin(state.clock.elapsedTime * 0.5) * 0.1;
        }
    });

    return (
        <Float speed={1.5} rotationIntensity={0.5} floatIntensity={0.5}>
            <mesh ref={meshRef} position={[2, 0, -2]} scale={1.5}>
                {/* Zebra Body */}
                <group>
                    {/* Body */}
                    <mesh position={[0, 0, 0]} rotation={[0, -0.3, 0]}>
                        <boxGeometry args={[1.2, 1, 2]} />
                        <meshStandardMaterial color="#ffffff" />
                    </mesh>

                    {/* Stripes */}
                    {[...Array(8)].map((_, i) => (
                        <mesh
                            key={i}
                            position={[0, 0, -0.8 + i * 0.25]}
                            rotation={[0, -0.3, 0]}
                        >
                            <boxGeometry args={[1.22, 1.02, 0.15]} />
                            <meshStandardMaterial color="#000000" />
                        </mesh>
                    ))}

                    {/* Head */}
                    <mesh position={[0.3, 0.5, 1.2]} rotation={[0, -0.3, 0]}>
                        <boxGeometry args={[0.6, 0.7, 0.8]} />
                        <meshStandardMaterial color="#ffffff" />
                    </mesh>

                    {/* Head Stripes */}
                    {[...Array(3)].map((_, i) => (
                        <mesh
                            key={`head-${i}`}
                            position={[0.3, 0.5, 0.9 + i * 0.2]}
                            rotation={[0, -0.3, 0]}
                        >
                            <boxGeometry args={[0.62, 0.72, 0.12]} />
                            <meshStandardMaterial color="#000000" />
                        </mesh>
                    ))}

                    {/* Ears */}
                    <mesh position={[0.1, 1, 1.3]} rotation={[0.3, -0.3, 0.2]}>
                        <coneGeometry args={[0.15, 0.3, 4]} />
                        <meshStandardMaterial color="#ff00ff" />
                    </mesh>
                    <mesh position={[0.5, 1, 1.3]} rotation={[0.3, -0.3, -0.2]}>
                        <coneGeometry args={[0.15, 0.3, 4]} />
                        <meshStandardMaterial color="#ff00ff" />
                    </mesh>

                    {/* Horn (unicorn style) */}
                    <mesh position={[0.3, 1.2, 1.4]} rotation={[0.2, 0, 0]}>
                        <coneGeometry args={[0.08, 0.6, 8]} />
                        <meshStandardMaterial
                            color="#ff00ff"
                            emissive="#ff00ff"
                            emissiveIntensity={0.3}
                        />
                    </mesh>

                    {/* Legs */}
                    {[[0.4, -0.9, 0.6], [-0.4, -0.9, 0.6], [0.4, -0.9, -0.6], [-0.4, -0.9, -0.6]].map((pos, i) => (
                        <mesh key={`leg-${i}`} position={pos as [number, number, number]}>
                            <cylinderGeometry args={[0.15, 0.15, 1, 8]} />
                            <meshStandardMaterial color="#ffffff" />
                        </mesh>
                    ))}

                    {/* Tail */}
                    <mesh position={[-0.5, 0, -1.2]} rotation={[0.5, 0.3, 0]}>
                        <cylinderGeometry args={[0.05, 0.08, 0.8, 8]} />
                        <meshStandardMaterial color="#000000" />
                    </mesh>
                </group>
            </mesh>
        </Float>
    );
}

function FloatingCube({ position, color, scale = 1 }: { position: [number, number, number], color: string, scale?: number }) {
    const meshRef = useRef<THREE.Mesh>(null);

    useFrame((state) => {
        if (meshRef.current) {
            meshRef.current.rotation.x = state.clock.elapsedTime * 0.3;
            meshRef.current.rotation.y = state.clock.elapsedTime * 0.5;
            meshRef.current.position.y = position[1] + Math.sin(state.clock.elapsedTime + position[0]) * 0.2;
        }
    });

    return (
        <mesh ref={meshRef} position={position} scale={scale}>
            <boxGeometry args={[1, 1, 1]} />
            <meshStandardMaterial
                color={color}
                emissive={color}
                emissiveIntensity={0.2}
                metalness={0.3}
                roughness={0.4}
            />
        </mesh>
    );
}

export default function ZebraScene() {
    return (
        <>
            <ambientLight intensity={0.5} />
            <directionalLight position={[10, 10, 5]} intensity={1} />
            <directionalLight position={[-10, -10, -5]} intensity={0.3} color="#ff00ff" />
            <pointLight position={[0, 5, 0]} intensity={0.5} color="#00d4ff" />

            <Zebra />

            {/* Floating decorative cubes */}
            <FloatingCube position={[-3, 2, -3]} color="#ff00ff" scale={0.5} />
            <FloatingCube position={[3, -2, -4]} color="#00d4ff" scale={0.4} />
            <FloatingCube position={[-2, -1, -2]} color="#ff00ff" scale={0.3} />
            <FloatingCube position={[4, 1, -5]} color="#00d4ff" scale={0.35} />
        </>
    );
}
