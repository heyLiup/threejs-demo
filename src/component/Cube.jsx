import React, { useRef, useLayoutEffect } from "react";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";
import { RGBELoader } from "three/examples/jsm/loaders/RGBELoader";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import basicvertex from "./glsl/vertex.glsl";
import basicfragment from "./glsl/fragment.glsl";
import gsap from "gsap";
import * as THREE from "three";

const CubeGrid = () => {
  const canvasRef = useRef();
  const firstRef = useRef(false);
  const init = () => {
    let width = canvasRef.current.clientWidth;
    let height = canvasRef.current.clientHeight;
    const renderer = new THREE.WebGLRenderer();
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 0.1; //曝光程度
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000);
    const clock = new THREE.Clock();
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.autoRotate = true;
    controls.autoRotateSpeed = 0.5;
    controls.maxPolarAngle = (Math.PI / 4) * 3;
    controls.minPolarAngle = (Math.PI / 4) * 3;
    camera.position.z = 100;

    const ambientLight = new THREE.AmbientLight(0xffffff);
    scene.add(ambientLight);

    const pointLight = new THREE.PointLight(0xffffff, 1);
    pointLight.position.set(50, 50, 50);
    scene.add(pointLight);
    const textureLoader = new RGBELoader();
    textureLoader.loadAsync("assets/bg.hdr").then((texture) => {
      texture.mapping = THREE.EquirectangularReflectionMapping; // 设置纹理映射
      scene.background = texture;
      scene.environment = texture;
    });
    const material = new THREE.ShaderMaterial({
      vertexShader: basicvertex,
      fragmentShader: basicfragment,
      side: THREE.DoubleSide,
    });
    const gltfLoader = new GLTFLoader();
    let lightBox = null;
    gltfLoader.loadAsync("assets/flight.glb").then((flight) => {
      console.log(flight);
      lightBox = flight.scene.children[0];
      lightBox.material = material;

      for (let i = 0; i < 100; i++) {
        let temp = flight.scene.clone(true);
        temp.position.set(
          (Math.random() - 0.5) * 300,
          Math.random() * 100 + 10,
          (Math.random() - 0.5) * 300
        );
        gsap.to(temp.rotation, {
          y: 2 * Math.PI,
          duration: Math.random() * 30,
          repeat: -1,
        });
        scene.add(temp);
      }
    });

    const axesHelper = new THREE.AxesHelper(5);
    // scene.add(axesHelper);

    const animate = function () {
      // const elapsedTime = clock.getElapsedTime();
      // material.uniforms.utime.value = elapsedTime;
      requestAnimationFrame(animate);
      controls.update();
      renderer.render(scene, camera);
    };

    renderer.setSize(width, height);
    canvasRef.current.appendChild(renderer.domElement);

    animate();
  };
  useLayoutEffect(() => {
    if (!firstRef.current) {
      firstRef.current = true;
      init();
    }
  }, []);

  return (
    <div
      ref={canvasRef}
      style={{ height: "100%", width: "100%", display: "inline-block" }}
    />
  );
};

export default CubeGrid;
