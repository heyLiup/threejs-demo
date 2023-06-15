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
    renderer.shadowMap.enabled = true;
    // renderer.toneMapping = THREE.ACESFilmicToneMapping;
    // renderer.toneMappingExposure = 0.1; //曝光程度
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000);
    const clock = new THREE.Clock();
    const controls = new OrbitControls(camera, renderer.domElement);

    camera.position.z = 50;

    // const ambientLight = new THREE.AmbientLight(0xffffff);
    // scene.add(ambientLight);

    const pointLight = new THREE.DirectionalLight("#ffffff", 1);
    pointLight.castShadow = true;
    pointLight.position.set(0, 0, 50);
    scene.add(pointLight);

    const geometry = new THREE.PlaneGeometry(20, 20);
    const planeMaterial = new THREE.MeshStandardMaterial();
    const plane = new THREE.Mesh(geometry, planeMaterial);
    plane.receiveShadow = true;
    plane.position.set(0, 0, -10);
    scene.add(plane);

    const axesHelper = new THREE.AxesHelper(5);
    // scene.add(axesHelper);

    const textureLoader = new THREE.TextureLoader();
    const colorMap = textureLoader.load("LeePerrySmith/Map-COL.jpg");
    const normalMap = textureLoader.load(
      "LeePerrySmith/Infinite-Level_02_Tangent_SmoothUV.jpg"
    );
    const material = new THREE.MeshStandardMaterial({
      map: colorMap,
      normalMap: normalMap,
    });

    const loader = new GLTFLoader();
    loader.load("LeePerrySmith/LeePerrySmith.glb", (glb) => {
      let mesh = glb.scene.children[0];
      mesh.material = material;
      mesh.castShadow = true;
      scene.add(glb.scene);
    });

    const customUtime = {
      uTime: {
        value: 0,
      },
    };

    material.onBeforeCompile = (shader) => {
      console.log(shader.vertexShader);

      // 传递时间
      shader.uniforms.uTime = customUtime.uTime;

      shader.vertexShader = shader.vertexShader.replace(
        "#include <common>",
        `
      #include <common>
      mat2 rotate2d(float _angle){
        return mat2(cos(_angle),-sin(_angle),
                    sin(_angle),cos(_angle));
      }
      uniform float uTime;
      `
      );
      shader.vertexShader = shader.vertexShader.replace(
        "#include <begin_vertex>",
        `
      #include <begin_vertex>
      float angle = sin(transformed.y + uTime) * 0.5;
      mat2 rotateMatrix = rotate2d(angle);
      transformed.xz = rotateMatrix * transformed.xz;
      `
      );
    };

    const animate = function () {
      const elapsedTime = clock.getElapsedTime();
      customUtime.uTime.value = elapsedTime;
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
