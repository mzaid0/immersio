type GLTFResult = GLTF & {
    nodes: {
        Mesh_0_Material_0_0: THREE.Mesh;
    };
    materials: {
        Material_0: THREE.MeshStandardMaterial;
    };
};


type MergedResult = {
    MeshMaterial: React.FC<ReactJSX.IntrinsicElements["mesh"]>;
};