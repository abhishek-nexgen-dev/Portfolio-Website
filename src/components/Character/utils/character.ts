import * as THREE from "three";
import { DRACOLoader, GLTF, GLTFLoader } from "three-stdlib";
import { setCharTimeline, setAllTimeline } from "../../utils/GsapScroll";
import { decryptFile } from "./decrypt";

const setCharacter = (
  renderer: THREE.WebGLRenderer,
  scene: THREE.Scene,
  camera: THREE.PerspectiveCamera
) => {
  const loader = new GLTFLoader();
  const dracoLoader = new DRACOLoader();
  dracoLoader.setDecoderPath("/draco/");
  loader.setDRACOLoader(dracoLoader);

  const loadCharacter = async (): Promise<GLTF | null> => {
    let encryptedBlob: ArrayBuffer;
    try {
      encryptedBlob = await decryptFile("/models/character.enc", "Character3D#@");
    } catch (err) {
      console.error(err);
      throw err;
    }
    const blobUrl = URL.createObjectURL(new Blob([encryptedBlob]));
    return new Promise<GLTF>((resolve, reject) => {
      loader.load(
        blobUrl,
        (gltf) => {
          const character: THREE.Object3D = gltf.scene;
          renderer.compileAsync(character, camera, scene)
            .then(() => {
              character.traverse((child: THREE.Object3D) => {
                const mesh = child as THREE.Mesh;
                if (mesh.isMesh) {
                  mesh.castShadow = true;
                  mesh.receiveShadow = true;
                  mesh.frustumCulled = true;
                }
              });
              resolve(gltf);
              setCharTimeline(character, camera);
              setAllTimeline();
              const footR = character.getObjectByName("footR");
              if (footR) footR.position.y = 3.36;
              const footL = character.getObjectByName("footL");
              if (footL) footL.position.y = 3.36;
              dracoLoader.dispose();
            })
            .catch(reject);
        },
        undefined,
        (error) => {
          console.error("Error loading GLTF model:", error);
          reject(error);
        }
      );
    });
  };

  return { loadCharacter };
};

export default setCharacter;
