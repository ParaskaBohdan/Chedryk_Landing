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

    const camera = new THREE.PerspectiveCamera(38, width / height, 0.1, 1000);
    camera.position.set(13.5, 9.5, 14.5);

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
    controls.target.set(0, 2.3, 0);
    controlsRef.current = controls;

    // 4. LIGHTS
    const ambientLight = new THREE.AmbientLight(0xffffff, isDark ? 0.7 : 0.9);
    scene.add(ambientLight);

    const sunLight = new THREE.DirectionalLight(0xfff8ee, 2.2);
    sunLight.position.set(16, 28, 14);
    sunLight.castShadow = true;
    sunLight.shadow.mapSize.width = 2048;
    sunLight.shadow.mapSize.height = 2048;
    sunLight.shadow.camera.near = 0.5;
    sunLight.shadow.camera.far = 60;
    sunLight.shadow.bias = -0.0005;
    scene.add(sunLight);

    const skyLight = new THREE.HemisphereLight(0x38bdf8, 0x0f172a, 0.45);
    scene.add(skyLight);

    // 5. HOUSE MESH GROUP (REPLICATING PINTEREST REFERENCE HOUSE)
    const houseGroup = new THREE.Group();
    houseGroupRef.current = houseGroup;
    scene.add(houseGroup);

    // Square Isometric Pedestal Base (White rim + Green lawn top)
    const pedestalBaseGeo = new THREE.BoxGeometry(11.4, 0.35, 11.4);
    const pedestalBaseMat = new THREE.MeshStandardMaterial({ color: isDark ? 0x1e293b : 0xe2e8f0, roughness: 0.6 });
    const pedestalBase = new THREE.Mesh(pedestalBaseGeo, pedestalBaseMat);
    pedestalBase.position.y = -0.18;
    pedestalBase.receiveShadow = true;
    houseGroup.add(pedestalBase);

    const lawnGeo = new THREE.BoxGeometry(10.8, 0.05, 10.8);
    const lawnMat = new THREE.MeshStandardMaterial({ color: isDark ? 0x064e3b : 0x4ade80, roughness: 0.85 });
    const lawn = new THREE.Mesh(lawnGeo, lawnMat);
    lawn.position.y = 0.02;
    lawn.receiveShadow = true;
    houseGroup.add(lawn);

    // Landscaping Shrubs & Small Trees around the base
    const treeMat = new THREE.MeshStandardMaterial({ color: 0x15803d, roughness: 0.8 });
    const trunkMat = new THREE.MeshStandardMaterial({ color: 0x78350f });
    
    [
      { x: -4.2, z: 3.8, r: 0.6 },
      { x: -3.8, z: -3.6, r: 0.5 },
      { x: 4.2, z: -3.8, r: 0.55 },
      { x: -1.2, z: 4.2, r: 0.4 },
      { x: 1.8, z: 4.2, r: 0.45 }
    ].forEach((t) => {
      const foliage = new THREE.Mesh(new THREE.DodecahedronGeometry(t.r, 1), treeMat);
      foliage.position.set(t.x, 0.6 + t.r, t.z);
      foliage.castShadow = true;
      
      const trunk = new THREE.Mesh(new THREE.CylinderGeometry(0.08, 0.1, 0.6), trunkMat);
      trunk.position.set(t.x, 0.3, t.z);
      
      houseGroup.add(foliage, trunk);
    });

    // 1st Floor Body (Pure White Walls)
    const wallMat = new THREE.MeshStandardMaterial({ color: 0xf8fafc, roughness: 0.25 });
    const firstFloor = new THREE.Mesh(new THREE.BoxGeometry(5.6, 2.2, 4.8), wallMat);
    firstFloor.position.set(0, 1.1, 0);
    firstFloor.castShadow = true;
    firstFloor.receiveShadow = true;
    houseGroup.add(firstFloor);

    // Side Garage / Porch Extension Body (Right side)
    const sideExtension = new THREE.Mesh(new THREE.BoxGeometry(2.0, 1.8, 4.0), wallMat);
    sideExtension.position.set(3.4, 0.9, -0.4);
    sideExtension.castShadow = true;
    sideExtension.receiveShadow = true;
    houseGroup.add(sideExtension);

    // Side Extension Sloped Roof
    const sideRoofGeo = new THREE.BufferGeometry();
    const sVertices = new Float32Array([
      2.4, 1.8,  1.6,
      4.4, 1.8,  1.6,
      2.4, 2.7, -2.4,
      2.4, 1.8,  1.6,
      2.4, 2.7, -2.4,
      4.4, 1.8, -2.4,
    ]);
    sideRoofGeo.setAttribute('position', new THREE.BufferAttribute(sVertices, 3));
    sideRoofGeo.computeVertexNormals();
    const darkRoofMat = new THREE.MeshStandardMaterial({ color: 0x1e293b, roughness: 0.3 });
    const sideRoof = new THREE.Mesh(sideRoofGeo, darkRoofMat);
    sideRoof.castShadow = true;
    houseGroup.add(sideRoof);

    // 2nd Floor Body (White Walls)
    const secondFloor = new THREE.Mesh(new THREE.BoxGeometry(5.6, 2.0, 4.2), wallMat);
    secondFloor.position.set(0, 3.2, -0.3);
    secondFloor.castShadow = true;
    secondFloor.receiveShadow = true;
    houseGroup.add(secondFloor);

    // Second Floor Front Balcony Deck & Metal Railing
    const balconyDeck = new THREE.Mesh(new THREE.BoxGeometry(4.2, 0.12, 1.2), new THREE.MeshStandardMaterial({ color: 0x334155 }));
    balconyDeck.position.set(-0.7, 2.2, 2.1);
    balconyDeck.castShadow = true;
    houseGroup.add(balconyDeck);

    // Railing Frame
    const railLineMat = new THREE.MeshStandardMaterial({ color: 0x0f172a, metalness: 0.8 });
    const topRail = new THREE.Mesh(new THREE.BoxGeometry(4.2, 0.05, 0.05), railLineMat);
    topRail.position.set(-0.7, 2.8, 2.68);
    houseGroup.add(topRail);

    [-2.7, -0.7, 1.3].forEach((rx) => {
      const post = new THREE.Mesh(new THREE.BoxGeometry(0.04, 0.6, 0.04), railLineMat);
      post.position.set(rx, 2.5, 2.68);
      houseGroup.add(post);
    });

    // Dark Panoramic Glass Windows
    const glassMat = new THREE.MeshStandardMaterial({ color: 0x0369a1, roughness: 0.1, metalness: 0.9 });
    const frameMat = new THREE.MeshStandardMaterial({ color: 0x1e293b });

    // 1st Floor Sliding Glass Doors
    [-1.2, 1.0].forEach((wx) => {
      const gWin = new THREE.Mesh(new THREE.BoxGeometry(1.6, 1.6, 0.08), glassMat);
      gWin.position.set(wx, 1.0, 2.42);
      const gFrame = new THREE.Mesh(new THREE.BoxGeometry(1.7, 1.7, 0.04), frameMat);
      gFrame.position.set(wx, 1.0, 2.4);
      houseGroup.add(gWin, gFrame);
    });

    // 2nd Floor Balcony Glass Doors
    const bWin = new THREE.Mesh(new THREE.BoxGeometry(1.4, 1.4, 0.08), glassMat);
    bWin.position.set(-0.7, 3.0, 1.82);
    const bFrame = new THREE.Mesh(new THREE.BoxGeometry(1.5, 1.5, 0.04), frameMat);
    bFrame.position.set(-0.7, 3.0, 1.8);
    houseGroup.add(bWin, bFrame);

    // 6. BUILD PERFECTLY MATCHED PITCHED / FLAT ROOF WITH SOLAR PANELS
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
      controlsRef.current.target.set(0, 2.3, 0);
      controlsRef.current.object.position.set(13.5, 9.5, 14.5);
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

// Helper: Procedural Roof & Solar Panel Builder
function buildRoofAndPanels(parentGroup, roofType, rowsCount, panelBrand, hasBattery, batteryCapacityKwh, isDark) {
  const panelMat = new THREE.MeshStandardMaterial({ color: 0x0f2b5c, roughness: 0.12, metalness: 0.88 });
  const panelFrameMat = new THREE.MeshStandardMaterial({ color: 0xcbd5e1, metalness: 0.95, roughness: 0.15 });
  const railMat = new THREE.MeshStandardMaterial({ color: 0xf59e0b, metalness: 0.85, roughness: 0.2 });
  const darkRoofMat = new THREE.MeshStandardMaterial({ color: 0x1e293b, roughness: 0.35 });

  if (roofType === 'pitched') {
    // SYMMETRIC DARK SEAM PITCHED ROOF ON 2ND FLOOR
    const roofGeo = new THREE.BufferGeometry();
    const halfW = 3.2;
    const frontZ = 2.0;
    const backZ = -2.6;
    const yBase = 4.2;
    const yApex = 5.9;

    const vertices = new Float32Array([
      // Front Slope
      -halfW, yBase,  frontZ,
       halfW, yBase,  frontZ,
       halfW, yApex, -0.3,
      -halfW, yBase,  frontZ,
       halfW, yApex, -0.3,
      -halfW, yApex, -0.3,

      // Back Slope
      -halfW, yBase,  backZ,
      -halfW, yApex, -0.3,
       halfW, yApex, -0.3,
      -halfW, yBase,  backZ,
       halfW, yApex, -0.3,
       halfW, yBase,  backZ,
    ]);

    roofGeo.setAttribute('position', new THREE.BufferAttribute(vertices, 3));
    roofGeo.computeVertexNormals();

    const roof = new THREE.Mesh(roofGeo, darkRoofMat);
    roof.castShadow = true;
    roof.receiveShadow = true;
    parentGroup.add(roof);

    // Front Roof Slope Angle = Math.atan2(1.7, 2.3) = ~36 deg
    const slopeAngle = Math.atan2(1.7, 2.3);
    const activeRows = Math.min(rowsCount, 3);

    for (let r = 0; r < activeRows; r++) {
      const slopeDist = 0.5 + r * 0.9;
      const py = yBase + Math.sin(slopeAngle) * slopeDist + 0.08;
      const pz = frontZ - Math.cos(slopeAngle) * slopeDist;

      // Rails
      const rail1 = new THREE.Mesh(new THREE.BoxGeometry(5.4, 0.06, 0.06), railMat);
      rail1.rotation.x = slopeAngle;
      rail1.position.set(0, py - 0.03, pz + 0.05);

      const rail2 = new THREE.Mesh(new THREE.BoxGeometry(5.4, 0.06, 0.06), railMat);
      rail2.rotation.x = slopeAngle;
      rail2.position.set(0, py + 0.15, pz - 0.2);

      parentGroup.add(rail1, rail2);

      // Solar Panels
      const panelCols = 5;
      for (let c = 0; c < panelCols; c++) {
        const px = -2.0 + c * 1.0;

        const panelBox = new THREE.Mesh(new THREE.BoxGeometry(0.9, 0.04, 0.8), panelMat);
        panelBox.rotation.x = slopeAngle;
        panelBox.position.set(px, py + 0.06, pz);
        panelBox.castShadow = true;

        const borderBox = new THREE.Mesh(new THREE.BoxGeometry(0.94, 0.03, 0.84), panelFrameMat);
        borderBox.rotation.x = slopeAngle;
        borderBox.position.set(px, py + 0.04, pz);

        parentGroup.add(panelBox, borderBox);
      }
    }

  } else {
    // FLAT ROOF DECK WITH PARAPET BORDER
    const flatRoofDeck = new THREE.Mesh(
      new THREE.BoxGeometry(6.0, 0.3, 4.8),
      new THREE.MeshStandardMaterial({ color: isDark ? 0x1e293b : 0x64748b, roughness: 0.6 })
    );
    flatRoofDeck.position.set(0, 4.35, -0.3);
    flatRoofDeck.castShadow = true;
    flatRoofDeck.receiveShadow = true;
    parentGroup.add(flatRoofDeck);

    const activeRows = Math.min(rowsCount, 3);
    const tiltAngle = Math.PI / 12; // 15 deg

    for (let r = 0; r < activeRows; r++) {
      const rackZ = 1.0 - r * 1.2;
      const panelCols = 5;

      for (let c = 0; c < panelCols; c++) {
        const px = -2.0 + c * 1.0;
        
        const standMat = new THREE.MeshStandardMaterial({ color: 0xf59e0b, metalness: 0.8, roughness: 0.2 });
        const stand = new THREE.Mesh(new THREE.BoxGeometry(0.06, 0.35, 0.7), standMat);
        stand.position.set(px, 4.65, rackZ);
        parentGroup.add(stand);

        const panelBox = new THREE.Mesh(new THREE.BoxGeometry(0.9, 0.04, 1.0), panelMat);
        panelBox.rotation.x = -tiltAngle;
        panelBox.position.set(px, 4.85, rackZ);
        panelBox.castShadow = true;

        const borderBox = new THREE.Mesh(new THREE.BoxGeometry(0.94, 0.03, 1.04), panelFrameMat);
        borderBox.rotation.x = -tiltAngle;
        borderBox.position.set(px, 4.83, rackZ);

        parentGroup.add(panelBox, borderBox);
      }
    }
  }

  // WALL-MOUNTED DEYE INVERTER & LIFEPO4 BATTERY STAND
  const inverterGeo = new THREE.BoxGeometry(0.3, 1.1, 0.75);
  const inverterMat = new THREE.MeshStandardMaterial({ color: 0x0f172a, metalness: 0.9, roughness: 0.2 });
  const inverter = new THREE.Mesh(inverterGeo, inverterMat);
  inverter.position.set(2.95, 1.8, 0.5);
  inverter.castShadow = true;

  const ledLight = new THREE.Mesh(new THREE.SphereGeometry(0.04, 16, 16), new THREE.MeshBasicMaterial({ color: 0x10b981 }));
  ledLight.position.set(3.12, 2.1, 0.7);

  parentGroup.add(inverter, ledLight);

  if (hasBattery) {
    const batGeo = new THREE.BoxGeometry(0.45, 1.3, 0.85);
    const batMat = new THREE.MeshStandardMaterial({ color: 0x022c22, metalness: 0.8 });
    const battery = new THREE.Mesh(batGeo, batMat);
    battery.position.set(3.02, 0.65, 0.5);
    battery.castShadow = true;

    const batLed = new THREE.Mesh(new THREE.BoxGeometry(0.05, 0.08, 0.3), new THREE.MeshBasicMaterial({ color: 0xa7f3d0 }));
    batLed.position.set(3.26, 1.0, 0.5);

    parentGroup.add(battery, batLed);
  }
}
