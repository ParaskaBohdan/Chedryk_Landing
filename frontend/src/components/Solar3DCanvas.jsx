import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { RotateCcw, ZoomIn, Eye } from 'lucide-react';

export default function Solar3DCanvas({
  roofType = 'pitched', // 'pitched' | 'flat'
  roofMaterial = 'metal_tile',
  rowsCount = 2, // 1 | 2 | 3 | 4
  panelBrand = 'jinko',
  panelCount = 24,
  totalKw = 14,
  inverterPowerKw = 15,
  hasBattery = true,
  batteryCapacityKwh = 10,
  theme = 'dark'
}) {
  const containerRef = useRef(null);
  const controlsRef = useRef(null);
  const sceneRef = useRef(null);
  const houseGroupRef = useRef(null);
  const isDark = theme === 'dark';

  const [autoRotate, setAutoRotate] = useState(false);

  useEffect(() => {
    if (!containerRef.current) return;

    const width = containerRef.current.clientWidth;
    const height = containerRef.current.clientHeight;

    // 1. SCENE & CAMERA
    const scene = new THREE.Scene();
    sceneRef.current = scene;
    scene.background = new THREE.Color(isDark ? 0x090d16 : 0xf8fafc);

    const camera = new THREE.PerspectiveCamera(40, width / height, 0.1, 1000);
    camera.position.set(13, 8.5, 14);

    // 2. RENDERER
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;

    containerRef.current.appendChild(renderer.domElement);

    // 3. ORBIT CONTROLS
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.05;
    controls.maxPolarAngle = Math.PI / 2 - 0.04;
    controls.minDistance = 6;
    controls.maxDistance = 35;
    controls.target.set(0, 2.2, 0);
    controlsRef.current = controls;

    // 4. LIGHTS & SUNSHINE
    const ambientLight = new THREE.AmbientLight(0xffffff, isDark ? 0.65 : 0.85);
    scene.add(ambientLight);

    const sunLight = new THREE.DirectionalLight(0xfff5ea, 2.0);
    sunLight.position.set(16, 26, 14);
    sunLight.castShadow = true;
    sunLight.shadow.mapSize.width = 2048;
    sunLight.shadow.mapSize.height = 2048;
    sunLight.shadow.camera.near = 0.5;
    sunLight.shadow.camera.far = 60;
    sunLight.shadow.bias = -0.0005;
    scene.add(sunLight);

    const skyLight = new THREE.HemisphereLight(0x38bdf8, 0x0f172a, 0.5);
    scene.add(skyLight);

    // 5. HOUSE MESH GROUP GENERATION
    const houseGroup = new THREE.Group();
    houseGroupRef.current = houseGroup;
    scene.add(houseGroup);

    // Base Circular Lawn Ground
    const lawnGeo = new THREE.CylinderGeometry(13, 13, 0.3, 48);
    const lawnMat = new THREE.MeshStandardMaterial({
      color: isDark ? 0x064e3b : 0x4ade80,
      roughness: 0.85
    });
    const lawn = new THREE.Mesh(lawnGeo, lawnMat);
    lawn.position.y = -0.15;
    lawn.receiveShadow = true;
    houseGroup.add(lawn);

    // Wooden Patio Terrace Deck in front of House
    const patioGeo = new THREE.BoxGeometry(8.0, 0.1, 3.0);
    const patioMat = new THREE.MeshStandardMaterial({ color: 0x78350f, roughness: 0.4 });
    const patio = new THREE.Mesh(patioGeo, patioMat);
    patio.position.set(0, 0.05, 3.8);
    patio.receiveShadow = true;
    houseGroup.add(patio);

    // Concrete House Plinth / Base
    const plinthGeo = new THREE.BoxGeometry(6.8, 0.4, 5.4);
    const plinthMat = new THREE.MeshStandardMaterial({ color: 0x334155, roughness: 0.7 });
    const plinth = new THREE.Mesh(plinthGeo, plinthMat);
    plinth.position.set(0, 0.2, 0);
    plinth.castShadow = true;
    plinth.receiveShadow = true;
    houseGroup.add(plinth);

    // Main Architectural House Body Walls
    const wallGeo = new THREE.BoxGeometry(6.6, 3.4, 5.2);
    const wallMat = new THREE.MeshStandardMaterial({
      color: isDark ? 0xf1f5f9 : 0xffffff,
      roughness: 0.25
    });
    const walls = new THREE.Mesh(wallGeo, wallMat);
    walls.position.set(0, 2.1, 0);
    walls.castShadow = true;
    walls.receiveShadow = true;
    houseGroup.add(walls);

    // Warm Wood Accent Wall Panel (Front Facade)
    const woodAccentGeo = new THREE.BoxGeometry(3.0, 3.4, 0.1);
    const woodAccentMat = new THREE.MeshStandardMaterial({ color: 0xb45309, roughness: 0.4 });
    const woodAccent = new THREE.Mesh(woodAccentGeo, woodAccentMat);
    woodAccent.position.set(-1.6, 2.1, 2.62);
    houseGroup.add(woodAccent);

    // Modern Glass Windows & Entrance Sliding Door
    const glassMat = new THREE.MeshStandardMaterial({
      color: 0x0284c7,
      roughness: 0.1,
      metalness: 0.9
    });
    const frameMat = new THREE.MeshStandardMaterial({ color: 0x0f172a });

    // Panoramic Living Room Window
    const panWin = new THREE.Mesh(new THREE.BoxGeometry(2.4, 2.2, 0.1), glassMat);
    panWin.position.set(-1.6, 1.8, 2.66);
    const panFrame = new THREE.Mesh(new THREE.BoxGeometry(2.5, 2.3, 0.05), frameMat);
    panFrame.position.set(-1.6, 1.8, 2.64);
    houseGroup.add(panWin, panFrame);

    // Upper Floor Windows
    [1.5, 2.4].forEach((x) => {
      const win = new THREE.Mesh(new THREE.BoxGeometry(1.0, 1.3, 0.1), glassMat);
      win.position.set(x, 2.4, 2.66);
      const frame = new THREE.Mesh(new THREE.BoxGeometry(1.1, 1.4, 0.05), frameMat);
      frame.position.set(x, 2.4, 2.64);
      houseGroup.add(win, frame);
    });

    // Entrance Porch Canopy
    const door = new THREE.Mesh(new THREE.BoxGeometry(1.1, 2.1, 0.1), new THREE.MeshStandardMaterial({ color: 0x1e293b }));
    door.position.set(0.6, 1.45, 2.66);
    houseGroup.add(door);

    // 6. BUILD PERFECTLY ALIGNED ROOF & SOLAR PANELS
    buildRoofAndPanels(houseGroup, roofType, rowsCount, panelBrand, hasBattery, batteryCapacityKwh, isDark);

    // 7. ANIMATION LOOP
    let reqId;
    const animate = () => {
      reqId = requestAnimationFrame(animate);
      if (controlsRef.current) {
        controlsRef.current.autoRotate = autoRotate;
        controlsRef.current.autoRotateSpeed = 1.8;
        controlsRef.current.update();
      }
      renderer.render(scene, camera);
    };
    animate();

    // Resize Handler
    const handleResize = () => {
      if (!containerRef.current) return;
      const w = containerRef.current.clientWidth;
      const h = containerRef.current.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(reqId);
      if (renderer.domElement && containerRef.current) {
        containerRef.current.removeChild(renderer.domElement);
      }
      renderer.dispose();
    };
  }, [roofType, rowsCount, panelBrand, hasBattery, batteryCapacityKwh, isDark]);

  // Reset Camera View
  const handleResetCamera = () => {
    if (controlsRef.current) {
      controlsRef.current.target.set(0, 2.2, 0);
      controlsRef.current.object.position.set(13, 8.5, 14);
      controlsRef.current.update();
    }
  };

  return (
    <div className="w-full h-full relative group">
      {/* Three.js WebGL Canvas */}
      <div ref={containerRef} className="w-full h-full cursor-grab active:cursor-grabbing" />

      {/* 3D Floating Control Bar */}
      <div className="absolute top-3 right-3 flex items-center gap-2 z-20">
        <button
          type="button"
          onClick={() => setAutoRotate(!autoRotate)}
          className={`px-3 py-1.5 rounded-xl border text-xs font-bold transition-all flex items-center gap-1.5 backdrop-blur-md ${
            autoRotate 
              ? 'bg-amber-500 border-amber-400 text-slate-950 shadow-md' 
              : 'bg-slate-950/80 border-slate-700 text-slate-300 hover:text-white'
          }`}
        >
          <RotateCcw className={`w-3.5 h-3.5 ${autoRotate ? 'animate-spin' : ''}`} />
          <span>360° {autoRotate ? 'Вимкнути' : 'Авто-обертання'}</span>
        </button>

        <button
          type="button"
          onClick={handleResetCamera}
          title="Скинути ракурс"
          className="p-2 rounded-xl border border-slate-700 bg-slate-950/80 text-slate-300 hover:text-white backdrop-blur-md"
        >
          <ZoomIn className="w-4 h-4" />
        </button>
      </div>

      {/* Touch Help Overlay */}
      <div className="absolute bottom-3 left-3 pointer-events-none text-[11px] font-semibold px-3 py-1.5 rounded-xl border border-slate-700/60 bg-slate-950/75 text-slate-300 backdrop-blur-md flex items-center gap-1.5">
        <Eye className="w-3.5 h-3.5 text-amber-400" />
        <span>Крутіть мишкою/пальцем на 360°</span>
      </div>
    </div>
  );
}

// Helper: Perfectly Centered & Aligned Roof & Solar Panels 3D Generator
function buildRoofAndPanels(parentGroup, roofType, rowsCount, panelBrand, hasBattery, batteryCapacityKwh, isDark) {
  const panelMat = new THREE.MeshStandardMaterial({
    color: 0x0a2540,
    roughness: 0.1,
    metalness: 0.9
  });

  const panelFrameMat = new THREE.MeshStandardMaterial({
    color: 0xcbd5e1,
    metalness: 0.95,
    roughness: 0.15
  });

  const railMat = new THREE.MeshStandardMaterial({
    color: 0xf59e0b,
    metalness: 0.85,
    roughness: 0.2
  });

  if (roofType === 'pitched') {
    // 1. PERFECTLY SYMMETRIC PITCHED GABLE ROOF GEOMETRY
    // Base dimensions: Width X = 7.2 (overhang 0.3 left/right), Depth Z = 5.8 (overhang 0.3 front/back), Height Y = 2.0 (apex at Y=5.8)
    const roofGeo = new THREE.BufferGeometry();
    const halfW = 3.6;
    const halfD = 2.9;
    const yBase = 3.8;
    const yApex = 5.7;

    // Centered vertices for symmetric pitched gable roof
    const vertices = new Float32Array([
      // Front Roof Slope (Facing Z = +2.9)
      -halfW, yBase,  halfD, // 0: Front-Left
       halfW, yBase,  halfD, // 1: Front-Right
       halfW, yApex,  0.0,   // 2: Apex-Right
      -halfW, yBase,  halfD, // 0
       halfW, yApex,  0.0,   // 2
      -halfW, yApex,  0.0,   // 3: Apex-Left

      // Back Roof Slope (Facing Z = -2.9)
      -halfW, yBase, -halfD, // 4: Back-Left
      -halfW, yApex,  0.0,   // 3: Apex-Left
       halfW, yApex,  0.0,   // 2: Apex-Right
      -halfW, yBase, -halfD, // 4
       halfW, yApex,  0.0,   // 2
       halfW, yBase, -halfD, // 5: Back-Right

      // Left Gable Triangle
      -halfW, yBase,  halfD,
      -halfW, yApex,  0.0,
      -halfW, yBase, -halfD,

      // Right Gable Triangle
       halfW, yBase,  halfD,
       halfW, yBase, -halfD,
       halfW, yApex,  0.0,
    ]);

    roofGeo.setAttribute('position', new THREE.BufferAttribute(vertices, 3));
    roofGeo.computeVertexNormals();

    const roofMat = new THREE.MeshStandardMaterial({
      color: isDark ? 0x1e293b : 0x334155,
      roughness: 0.45
    });

    const roof = new THREE.Mesh(roofGeo, roofMat);
    roof.castShadow = true;
    roof.receiveShadow = true;
    parentGroup.add(roof);

    // Dark Eaves Trim Bar along Apex Ridge
    const ridgeTrim = new THREE.Mesh(new THREE.BoxGeometry(7.24, 0.1, 0.1), new THREE.MeshStandardMaterial({ color: 0x0f172a }));
    ridgeTrim.position.set(0, yApex + 0.05, 0);
    parentGroup.add(ridgeTrim);

    // 2. MOUNTING RAILS & SOLAR PANELS ON FRONT SLOPE
    // Front Slope Angle = Math.atan2(1.9, 2.9) = ~33.2 deg
    const slopeAngle = Math.atan2(1.9, 2.9);
    const activeRows = Math.min(rowsCount, 3);

    for (let r = 0; r < activeRows; r++) {
      // Position along Z-slope from eaves to ridge
      const slopeDist = 0.6 + r * 0.95; // distance up slope
      const py = yBase + Math.sin(slopeAngle) * slopeDist + 0.08;
      const pz = halfD - Math.cos(slopeAngle) * slopeDist;

      // Rails
      const rail1 = new THREE.Mesh(new THREE.BoxGeometry(6.0, 0.06, 0.06), railMat);
      rail1.rotation.x = slopeAngle;
      rail1.position.set(0, py - 0.03, pz + 0.05);

      const rail2 = new THREE.Mesh(new THREE.BoxGeometry(6.0, 0.06, 0.06), railMat);
      rail2.rotation.x = slopeAngle;
      rail2.position.set(0, py + 0.15, pz - 0.2);

      parentGroup.add(rail1, rail2);

      // Solar Panels
      const panelCols = 6;
      for (let c = 0; c < panelCols; c++) {
        const px = -2.5 + c * 1.0;

        const panelBox = new THREE.Mesh(new THREE.BoxGeometry(0.9, 0.04, 0.85), panelMat);
        panelBox.rotation.x = slopeAngle;
        panelBox.position.set(px, py + 0.06, pz);
        panelBox.castShadow = true;

        const borderBox = new THREE.Mesh(new THREE.BoxGeometry(0.94, 0.03, 0.89), panelFrameMat);
        borderBox.rotation.x = slopeAngle;
        borderBox.position.set(px, py + 0.04, pz);

        parentGroup.add(panelBox, borderBox);
      }
    }

  } else {
    // 1. FLAT ROOF DECK WITH PARAPET BORDER
    const flatRoofDeck = new THREE.Mesh(
      new THREE.BoxGeometry(6.8, 0.3, 5.4),
      new THREE.MeshStandardMaterial({ color: isDark ? 0x1e293b : 0x64748b, roughness: 0.6 })
    );
    flatRoofDeck.position.set(0, 3.95, 0);
    flatRoofDeck.castShadow = true;
    flatRoofDeck.receiveShadow = true;
    parentGroup.add(flatRoofDeck);

    // Parapet Rim Border
    const parapetMat = new THREE.MeshStandardMaterial({ color: 0x334155 });
    const pFront = new THREE.Mesh(new THREE.BoxGeometry(6.8, 0.3, 0.2), parapetMat);
    pFront.position.set(0, 4.25, 2.6);
    const pBack = new THREE.Mesh(new THREE.BoxGeometry(6.8, 0.3, 0.2), parapetMat);
    pBack.position.set(0, 4.25, -2.6);
    const pLeft = new THREE.Mesh(new THREE.BoxGeometry(0.2, 0.3, 5.4), parapetMat);
    pLeft.position.set(-3.3, 4.25, 0);
    const pRight = new THREE.Mesh(new THREE.BoxGeometry(0.2, 0.3, 5.4), parapetMat);
    pRight.position.set(3.3, 4.25, 0);

    parentGroup.add(pFront, pBack, pLeft, pRight);

    // 2. ANGLED BALLAST FRAME RACKS FOR FLAT ROOF (Tilted 15 deg)
    const activeRows = Math.min(rowsCount, 3);
    const tiltAngle = Math.PI / 12; // 15 deg

    for (let r = 0; r < activeRows; r++) {
      const rackZ = 1.4 - r * 1.4;
      const panelCols = 5;

      for (let c = 0; c < panelCols; c++) {
        const px = -2.0 + c * 1.0;
        
        // Aluminum Support Bracket
        const standMat = new THREE.MeshStandardMaterial({ color: 0xf59e0b, metalness: 0.8, roughness: 0.2 });
        const stand = new THREE.Mesh(new THREE.BoxGeometry(0.06, 0.35, 0.7), standMat);
        stand.position.set(px, 4.25, rackZ);
        parentGroup.add(stand);

        // Angled Solar Panel
        const panelBox = new THREE.Mesh(new THREE.BoxGeometry(0.9, 0.04, 1.1), panelMat);
        panelBox.rotation.x = -tiltAngle;
        panelBox.position.set(px, 4.45, rackZ);
        panelBox.castShadow = true;

        const borderBox = new THREE.Mesh(new THREE.BoxGeometry(0.94, 0.03, 1.14), panelFrameMat);
        borderBox.rotation.x = -tiltAngle;
        borderBox.position.set(px, 4.43, rackZ);

        parentGroup.add(panelBox, borderBox);
      }
    }
  }

  // 4. WALL-MOUNTED DEYE INVERTER & LIFEPO4 BATTERY STAND (Right Wall)
  const inverterGeo = new THREE.BoxGeometry(0.3, 1.1, 0.75);
  const inverterMat = new THREE.MeshStandardMaterial({ color: 0x0f172a, metalness: 0.9, roughness: 0.2 });
  const inverter = new THREE.Mesh(inverterGeo, inverterMat);
  inverter.position.set(3.45, 2.5, 0.5);
  inverter.castShadow = true;

  const ledLight = new THREE.Mesh(new THREE.SphereGeometry(0.04, 16, 16), new THREE.MeshBasicMaterial({ color: 0x10b981 }));
  ledLight.position.set(3.62, 2.8, 0.7);

  parentGroup.add(inverter, ledLight);

  if (hasBattery) {
    const batGeo = new THREE.BoxGeometry(0.45, 1.4, 0.85);
    const batMat = new THREE.MeshStandardMaterial({ color: 0x022c22, metalness: 0.8 });
    const battery = new THREE.Mesh(batGeo, batMat);
    battery.position.set(3.52, 0.7, 0.5);
    battery.castShadow = true;

    const batLed = new THREE.Mesh(new THREE.BoxGeometry(0.05, 0.08, 0.3), new THREE.MeshBasicMaterial({ color: 0xa7f3d0 }));
    batLed.position.set(3.76, 1.1, 0.5);

    parentGroup.add(battery, batLed);
  }
}
