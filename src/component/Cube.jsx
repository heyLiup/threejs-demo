import React, { useRef, useLayoutEffect } from "react";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";
import basicvertex from "./glsl/vertex.glsl";
import basicfragment from "./glsl/fragment.glsl";

import * as THREE from "three";

const CubeGrid = () => {
  const canvasRef = useRef();
  const firstRef = useRef(false);
  console.log(basicfragment);
  const init = () => {
    let width = canvasRef.current.clientWidth;
    let height = canvasRef.current.clientHeight;
    const renderer = new THREE.WebGLRenderer();
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000);
    const clock = new THREE.Clock();
    const controls = new OrbitControls(camera, renderer.domElement);
    camera.position.z = 30;

    const ambientLight = new THREE.AmbientLight(0xffffff);
    scene.add(ambientLight);

    const pointLight = new THREE.PointLight(0xffffff, 1);
    pointLight.position.set(50, 50, 50);
    scene.add(pointLight);
    const textureLoader = new THREE.TextureLoader();
    const texture = textureLoader.load("china.png");
    const axesHelper = new THREE.AxesHelper(5);
    scene.add(axesHelper);

    const geometry = new THREE.PlaneGeometry(1, 1, 100, 100);
    const material = new THREE.RawShaderMaterial({
      vertexShader: basicvertex,
      fragmentShader: basicfragment,
      side: THREE.DoubleSide,
      transparent: true,
      uniforms: {
        utime: {
          value: 0,
        },
        uTexture: {
          value: texture,
        },
      },
    });
    const plane = new THREE.Mesh(geometry, material);
    scene.add(plane);

    const animate = function () {
      const elapsedTime = clock.getElapsedTime();
      material.uniforms.utime.value = elapsedTime;
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
