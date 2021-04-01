//
// (c) 2021 Alien Labs.
//

import React, { useEffect, useRef, useState } from 'react';
import useResizeAware from 'react-resize-aware';
import * as THREE from 'three';
import { Camera } from 'three';

import { makeStyles } from '@material-ui/styles';

import { THREEx } from '../lib/THREEx';

const config = {
  mesh: {
    // https://threejs.org/docs/#api/en/core/Object3D.lookAt
    orientation: [0.4, 1.2, .5],
    scale: {
      x: 3.5,
      y: 3,
      z: 0.2
    },
    multiplyScalar: 20
  },
  camera: {
    fov: 25,
    position: {
      z: 15,
      y: 2
    }
  },
  // https://threejs.org/docs/#api/en/scenes/Fog
  fog: {
    near: 0,
    far: 50
  },
  rotation: {
    z: 0.02
  },
  colors: {
    // background: 0xCCCCCC,
    // line: 0x333333
    background: '#000000',
    line: 'darkgreen'
  }
};

const useStyles = makeStyles({
  root: {
    display: 'flex',
    flex: 1
  }
});

// https://codepen.io/marctannous/pen/RNGjmz
// https://threejs.org/examples/?q=ocean#webgl_shaders_ocean2

export const Waves = () => {
  const classes = useStyles();
  const [resizeListener, size] = useResizeAware();
  const [camera, setCamera] = useState<Camera>();
  const [renderer] = useState(() => new THREE.WebGLRenderer({ antialias: true }));
  const div = useRef<HTMLDivElement>();

  // Resize.
  useEffect(() => {
    const { width, height } = size;
    if (!width || !height) {
      return;
    }

    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setClearColor(config.colors.background, 1);

    // Camera.
    // https://threejs.org/docs/#api/en/cameras/PerspectiveCamera
    // Object.assign(camera.position, config.camera.position);
    const camera = new THREE.PerspectiveCamera(config.camera.fov, window.innerWidth / window.innerHeight);
    Object.assign(camera.position, config.camera.position);
    setCamera(camera);
  }, [size]);

  // Init.
  useEffect(() => {
    if (!camera) {
      return;
    }

    // Append.
    div.current.appendChild(renderer.domElement);

    // Mesh.
    const heightMap = THREEx.Terrain.allocateHeightMap(256, 256);
    THREEx.Terrain.simplexHeightMap(heightMap);

    const geometry = THREEx.Terrain.heightMapToPlaneGeometry(heightMap);
    THREEx.Terrain.heightMapToVertexColor(heightMap, geometry);

    const material = new THREE.MeshBasicMaterial({ wireframe: true, color: config.colors.line });
    const mesh = new THREE.Mesh(geometry, material);
    mesh.lookAt(new THREE.Vector3(...config.mesh.orientation));
    Object.assign(mesh.scale, config.mesh.scale);
    mesh.scale.multiplyScalar(config.mesh.multiplyScalar);

    // Scene.
    const scene = new THREE.Scene();
    scene.fog = new THREE.Fog(config.colors.background, config.fog.near, config.fog.far);
    scene.add(mesh);

    // Camera motion.
    const onRenderFcts: any[] = [];
    onRenderFcts.push((delta: number) => { mesh.rotation.z += config.rotation.z * delta; });
    onRenderFcts.push(() => { renderer.render(scene, camera); });

    // Animation.
    let lastTime: number = null;
    let frame = requestAnimationFrame(function animate (now) {
      frame = requestAnimationFrame(animate);
      lastTime = lastTime || now - 1000 / 60;
      const deltaMsec = Math.min(200, now - lastTime);
      lastTime = now;
      onRenderFcts.forEach((onRenderFct) => {
        onRenderFct(deltaMsec / 1000, now / 1000);
      });
    });

    return () => {
      cancelAnimationFrame(frame);
    };
  }, [camera]);

  return (
    <div ref={div} className={classes.root}>
      {resizeListener}
    </div>
  );
};

export default Waves;

