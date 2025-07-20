"use client";

import { Merged, useGLTF } from "@react-three/drei";
import {
    createContext,
    JSX as ReactJSX,
    ReactNode,
    useContext,
    useMemo,
} from "react";

const SofaContext = createContext<MergedResult | null>(null);

export function Instances({ children, ...props }: { children: ReactNode }) {

    const { nodes } = useGLTF("/models/sofa.glb") as unknown as GLTFResult;

    const meshes = useMemo(() => {
        return {
            MeshMaterial: nodes.Mesh_0_Material_0_0,
        };
    }, [nodes]);

    return (

        <Merged meshes={meshes} {...props}>
            {(merged) => (
                <SofaContext.Provider value={merged as unknown as MergedResult}>
                    {children}
                </SofaContext.Provider>
            )}
        </Merged>
    );
}

export function Model(props: ReactJSX.IntrinsicElements["group"]) {

    const instances = useContext(SofaContext);

    if (!instances) {
        console.error("SofaContext is null");
        return null;
    }

    return (
        <group {...props} dispose={null}>
            <group name="Sketchfab_Scene">
                <group
                    name="Sketchfab_model"
                    rotation={[-Math.PI / 2, 0, 0]}
                    scale={1.14942527}
                >
                    <group
                        name="494d51508a984078875f3e1a61e74c40fbx"
                        rotation={[Math.PI / 2, 0, 0]}
                        scale={0.01}
                    >
                        <group name="RootNode">
                            <group
                                name="Mesh_0"
                                rotation={[-Math.PI / 2, 0, 0]}
                                scale={100}
                            >
                                <instances.MeshMaterial name="Mesh_0_Material_0_0" />
                            </group>
                        </group>
                    </group>
                </group>
            </group>
        </group>
    );
}

useGLTF.preload("/models/sofa.glb");
