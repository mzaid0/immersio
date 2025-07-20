"use client";

import { Environment, PerspectiveCamera } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { gsap } from "gsap/gsap-core";
import { useEffect, useRef } from "react";
import * as THREE from "three";
import { Instances, Model } from "../../public/models/sofa"; 

export function Scene({ progress }: { progress: number }) {

    const cameraRef = useRef<THREE.PerspectiveCamera>(null!);

    useFrame(() => {

        cameraRef.current.lookAt(0, 0, 0);
        console.log(cameraRef.current.position)

    });

    useEffect(() => {

        const updateCameraPosition = () => {

            const positions = [
                [1.5, 0.089, 3.35],
                [-1.91, 1.43, 2.06],
                [-0.26, 0.5, 3.64],
            ];

            console.log(positions)

            if (progress >= 1) {
                gsap.to(cameraRef.current.position, {
                    x: -0.26,
                    y: 0.5,
                    z: 3.64,
                    duration: 0.5,
                    ease: "power1.out",
                });

            } else {

                const segmentsPercentage = 1 / 2;
                const segmentIndex = Math.floor(progress / segmentsPercentage);
                const percentage = (progress % segmentsPercentage) / segmentsPercentage;

                const [startX, startY, startZ] = positions[segmentIndex];
                const [endX, endY, endZ] = positions[segmentIndex + 1];

                const x = startX + (endX - startX) * percentage;
                const y = startY + (endY - startY) * percentage;
                const z = startZ + (endZ - startZ) * percentage;

                gsap.to(cameraRef.current.position, {
                    x,
                    y,
                    z,
                    duration: 0.5,
                    ease: "power1.out",
                });
            }
        };

        updateCameraPosition();
    }, [progress]);

    return (
        <>
            <PerspectiveCamera
                ref={cameraRef}
                fov={45}
                near={0.1}
                far={10000}
                makeDefault
                position={[1.5, 0.089, 3.35]}
            />
            <Environment preset="studio" background={false} />
            <ambientLight intensity={1.2} />
            <directionalLight position={[5, 10, 5]} intensity={1.2} />

            <Instances>
                <Model />
            </Instances>
        </>
    );
}
