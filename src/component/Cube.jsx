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
  const currentPointRef = useRef(null);
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
    // controls.enableDamping = true;
    // controls.autoRotate = true;
    // controls.autoRotateSpeed = 0.5;
    // controls.maxPolarAngle = (Math.PI / 4) * 3;
    // controls.minPolarAngle = (Math.PI / 4) * 3;
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

    let material;
    let point;
    let geometry;

    function createPoint() {
      console.log("createPoint");
      geometry = new THREE.BufferGeometry();
      const geometryPostionArray = new Float32Array(3);
      geometryPostionArray[0] = 0;
      geometryPostionArray[1] = 0;
      geometryPostionArray[2] = 0;
      geometry.setAttribute(
        "position",
        new THREE.BufferAttribute(geometryPostionArray, 3)
      );
      material = new THREE.ShaderMaterial({
        vertexShader: basicvertex,
        fragmentShader: basicfragment,
        side: THREE.DoubleSide,
        uniforms: {
          uPosition: {
            value: new THREE.Vector3(
              20 * Math.random(),
              100 * Math.random(),
              -20
            ),
          },
          utime: {
            value: 0,
          },
        },
        transparent: true,
        depthWrite: false,
      });

      point = new THREE.Points(geometry, material);
      currentPointRef.current = point;
      scene.add(point);
    }

    document.addEventListener("click", () => {
      if (!currentPointRef.current) {
        clock.start();
        createPoint();
      }
    });

    const axesHelper = new THREE.AxesHelper(5);
    scene.add(axesHelper);

    function clear() {
      scene.remove(currentPointRef.current);
      geometry.dispose();
      material.dispose();
      point.clear();
    }
    const animate = function () {
      const elapsedTime = clock.getElapsedTime();
      if (elapsedTime < 1 && material) {
        material.uniforms.utime.value = elapsedTime;
      } else if (elapsedTime > 1 && material) {
        clear();
        clock.stop();
        currentPointRef.current = null;
      }
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
