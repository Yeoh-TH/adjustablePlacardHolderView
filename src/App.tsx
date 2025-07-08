import { useRef, useEffect } from 'react'
import * as THREE from "three"
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import './App.css'

function App() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (!canvasRef.current) return;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    camera.position.z = 5;

    const renderer = new THREE.WebGLRenderer({ canvas: canvasRef.current, antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);

    const controls = new OrbitControls(camera, renderer.domElement);
    controls.target.set(0, 5, 0);
    controls.update();

    const light = new THREE.DirectionalLight(0xffffff, 1);
    const light2 = new THREE.DirectionalLight(0xffffff, 1);
    light.position.set(-5, -1, 5);
    light2.position.set(5, 1, -5);
    // const lightHelper = new THREE.DirectionalLightHelper(light2, 5);
    scene.add(light2);
    // scene.add(lightHelper);
    scene.add(light);

    const loader = new GLTFLoader();
    loader.load(
      '/placardHolderAdjust.glb',
      (gltf) => {
        scene.add(gltf.scene);
      },
      undefined,
      (error) => {
        console.error(error);
      }
    );

    function animate() {
      renderer.render(scene, camera);
      requestAnimationFrame(animate);
    }
    animate();

    // Cleanup on unmount
    return () => {
      renderer.dispose();
      // Optionally remove event listeners, etc.
    };
  }, []);

  return (
    <>
      <canvas id="three-canvas" style={{ position: "absolute", top: "0", left: "0" }} ref={canvasRef}></canvas>
    </>
  );
}

export default App