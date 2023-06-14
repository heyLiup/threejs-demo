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

    camera.position.z = 50;

    const ambientLight = new THREE.AmbientLight(0xffffff);
    scene.add(ambientLight);

    const pointLight = new THREE.PointLight(0xffffff, 1);
    pointLight.position.set(50, 50, 50);
    scene.add(pointLight);

    const axesHelper = new THREE.AxesHelper(5);
    scene.add(axesHelper);

    let material;
    let point;
    let geometry;

    function createPoint() {
      let R = 10;
      let deg = 180;
      let count = 1000;
      let offset = 1;
      let color = new THREE.Color("#ff0000");
      let outColor = new THREE.Color("#00ff00");
      geometry = new THREE.BufferGeometry();
      const geometryPostionArray = new Float32Array(count * 3);
      const geometryColorArray = new Float32Array(count * 3);
      const geometryRandomArray = new Float32Array(count);

      for (let i = 1; i < count; i++) {
        let random = Math.random();
        // if (Math.random() > 0.4) {
        //   if (random > 0.4) {
        //     random = 1 - random;
        //   }
        // }

        let calcDeg = ((deg * random) / 180) * Math.PI;

        geometryPostionArray[i * 3 + 0] =
          R * Math.cos(calcDeg) + (Math.random() - 0.5) * offset;
        geometryPostionArray[i * 3 + 1] = (Math.random() - 0.5) * offset;
        geometryPostionArray[i * 3 + 2] =
          R * Math.sin(calcDeg) + (Math.random() - 0.5) * offset;

        const mixColor = color.clone().lerp(outColor, i / count);
        geometryColorArray[i * 3 + 0] = mixColor.r;
        geometryColorArray[i * 3 + 1] = mixColor.g;
        geometryColorArray[i * 3 + 2] = mixColor.b;

        geometryRandomArray[i] = Math.random();
      }

      geometry.setAttribute(
        "position",
        new THREE.BufferAttribute(geometryPostionArray, 3)
      );
      geometry.setAttribute(
        "color",
        new THREE.BufferAttribute(geometryColorArray, 3)
      );

      geometry.setAttribute(
        "random",
        new THREE.BufferAttribute(geometryRandomArray, 1)
      );
      material = new THREE.ShaderMaterial({
        vertexShader: basicvertex,
        vertexColors: true,
        fragmentShader: basicfragment,
        side: THREE.DoubleSide,
        blending: THREE.AdditiveBlending,
        uniforms: {
          utime: {
            value: 0,
          },
        },
        transparent: true,
        depthWrite: false,
      });

      point = new THREE.Points(geometry, material);
      scene.add(point);
    }

    createPoint();

    const animate = function () {
      const elapsedTime = clock.getElapsedTime();
      material.uniforms.utime.value = elapsedTime;
      // geometry.rotateY(-Math.PI / 100);
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
