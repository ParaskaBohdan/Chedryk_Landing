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
    scene.background = new THREE.Color(isDark ? 0x0f172a : 0xf1f5f9);

    const camera = new THREE.PerspectiveCamera(42, width / height, 0.1, 1000);
    camera.position.set(13, 9, 15);

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
    controls.maxPolarAngle = Math.PI / 2 - 0.05; // Don't clip under ground
    controls.minDistance = 6;
    controls.maxDistance = 35;
    controls.target.set(0, 2, 0);
    controlsRef.current = controls;

    // 4. LIGHTS
    const ambientLight = new THREE.AmbientLight(0xffffff, isDark ? 0.7 : 0.9);
    scene.add(ambientLight);

    const dirLight = new THREE.DirectionalLight(0xfffaed, 1.8);
    dirLight.position.set(15, 25, 12);
    dirLight.castShadow = true;
    dirLight.shadow.mapSize.width = 1024;
    dirLight.shadow.mapSize.height = 1024;
    dirLight.shadow.camera.near = 0.5;
    dirLight.shadow.camera.far = 50;
    scene.add(dirLight);

    const fillLight = new THREE.DirectionalLight(0x38bdf8, 0.4);
    fillLight.position.set(-15, 10, -10);
    scene.add(fillLight);

    // 5. HOUSE MESH GROUP GENERATION
    const houseGroup = new THREE.Group();
    houseGroupRef.current = houseGroup;
    scene.add(houseGroup);

    // Ground Plane
    const groundGeo = new THREE.CylinderGeometry(14, 14, 0.4, 32);
    const groundMat = new THREE.MeshStandardMaterial({
      color: isDark ? 0x1e293b : 0xe2e8f0,
      roughness: 0.8
    });
    const ground = new THREE.Mesh(groundGeo, groundMat);
    ground.position.y = -0.2;
    ground.receiveShadow = true;
    houseGroup.add(ground);

    // Grass Circle Overlay
    const grassGeo = new THREE.CylinderGeometry(11, 11, 0.05, 32);
    const grassMat = new THREE.MeshStandardMaterial({
      color: isDark ? 0x064e3b : 0x86efac,
      roughness: 0.9
    });
    const grass = new THREE.Mesh(grassGeo, grassMat);
    grass.position.y = 0.03;
    grass.receiveShadow = true;
    houseGroup.add(grass);

    // Main House Walls Body
    const wallGeo = new THREE.BoxGeometry(6.5, 4, 5.5);
    const wallMat = new THREE.MeshStandardMaterial({
      color: isDark ? 0xf8fafc : 0xffffff,
      roughness: 0.3
    });
    const walls = new THREE.Mesh(wallGeo, wallMat);
    walls.position.set(0, 2, 0);
    walls.castShadow = true;
    walls.receiveShadow = true;
    houseGroup.add(walls);

    // Windows & Door
    const windowMat = new THREE.MeshStandardMaterial({
      color: 0x1e3a8a,
      roughness: 0.1,
      metalness: 0.8
    });
    const frameMat = new THREE.MeshStandardMaterial({ color: 0x334155 });

    // Front Windows
    [-1.8, 1.8].forEach((x) => {
      const win = new THREE.Mesh(new THREE.BoxGeometry(1.2, 1.4, 0.1), windowMat);
      win.position.set(x, 2.6, 2.78);
      const frame = new THREE.Mesh(new THREE.BoxGeometry(1.3, 1.5, 0.05), frameMat);
      frame.position.set(x, 2.6, 2.76);
      houseGroup.add(win, frame);
    });

    // Front Door
    const door = new THREE.Mesh(new THREE.BoxGeometry(1.2, 2.2, 0.1), new THREE.MeshStandardMaterial({ color: 0x0f172a }));
    door.position.set(0, 1.1, 2.78);
    houseGroup.add(door);

    // 6. BUILD ROOF & SOLAR PANELS
    buildRoofAndPanels(houseGroup, roofType, rowsCount, panelBrand, hasBattery, batteryCapacityKwh, isDark);

    // 7. ANIMATION LOOP
    let reqId;
    const animate = () => {
      reqId = requestAnimationFrame(animate);
      if (controlsRef.current) {
        controlsRef.current.autoRotate = autoRotate;
        controlsRef.current.autoRotateSpeed = 2.0;
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
      controlsRef.current.target.set(0, 2, 0);
      controlsRef.current.object.position.set(13, 9, 15);
      controlsRef.current.update();
    }
  };

  return (
    <div className="w-full h-full relative group">
      {/* Three.js WebGL Container */}
      <div ref={containerRef} className="w-full h-full cursor-grab active:cursor-grabbing" />

      {/* 3D Controls Floating Bar */}
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

// Helper: Procedural 3D Mesh Builder for Roof & Solar Panels
function buildRoofAndPanels(parentGroup, roofType, rowsCount, panelBrand, hasBattery, batteryCapacityKwh, isDark) {
  const panelMat = new THREE.MeshStandardMaterial({
    color: 0x0f2b5c,
    roughness: 0.15,
    metalness: 0.85
  });

  const panelFrameMat = new THREE.MeshStandardMaterial({
    color: 0x94a3b8,
    metalness: 0.9,
    roughness: 0.2
  });

  const railMat = new THREE.MeshStandardMaterial({
    color: 0xf59e0b,
    metalness: 0.8,
    roughness: 0.3
  });

  if (roofType === 'pitched') {
    // 1. PITCHED ROOF MESH (Angle ~30 deg)
    const roofShape = new THREE.Shape();
    roofShape.moveTo(-3.5, 0);
    roofShape.lineTo(0, 2.2);
    roofShape.lineTo(3.5, 0);
    roofShape.closePath();

    const extrudeSettings = { depth: 5.8, bevelEnabled: false };
    const roofGeo = new THREE.ExtrudeGeometry(roofShape, extrudeSettings);
    const roofMat = new THREE.MeshStandardMaterial({
      color: isDark ? 0x334155 : 0x475569,
      roughness: 0.5
    });

    const roof = new THREE.Mesh(roofGeo, roofMat);
    roof.rotation.y = Math.PI / 2;
    roof.position.set(-2.9, 4, -2.9);
    roof.castShadow = true;
    roof.receiveShadow = true;
    parentGroup.add(roof);

    // 2. MOUNTING RAILS ON PITCHED ROOF SLOPE
    const activeRows = Math.min(rowsCount, 3);
    for (let r = 0; r < activeRows; r++) {
      const railZ = 1.2 - r * 1.2;
      const railY = 4.4 + r * 0.55;

      const rail1 = new THREE.Mesh(new THREE.BoxGeometry(5.4, 0.08, 0.08), railMat);
      rail1.rotation.x = -Math.PI / 6;
      rail1.position.set(0, railY, railZ);

      const rail2 = new THREE.Mesh(new THREE.BoxGeometry(5.4, 0.08, 0.08), railMat);
      rail2.rotation.x = -Math.PI / 6;
      rail2.position.set(0, railY + 0.3, railZ - 0.2);

      parentGroup.add(rail1, rail2);

      // 3. SOLAR PANEL MODULES ON RAILS
      const panelCols = 6;
      for (let c = 0; c < panelCols; c++) {
        const px = -2.2 + c * 0.88;
        const panelBox = new THREE.Mesh(new THREE.BoxGeometry(0.8, 0.05, 1.1), panelMat);
        panelBox.rotation.x = -Math.PI / 6;
        panelBox.position.set(px, railY + 0.15, railZ - 0.1);
        panelBox.castShadow = true;

        const borderBox = new THREE.Mesh(new THREE.BoxGeometry(0.84, 0.04, 1.14), panelFrameMat);
        borderBox.rotation.x = -Math.PI / 6;
        borderBox.position.set(px, railY + 0.13, railZ - 0.1);

        parentGroup.add(panelBox, borderBox);
      }
    }
  } else {
    // 1. FLAT ROOF PARAPET MESH
    const flatRoofGeo = new THREE.BoxGeometry(6.6, 0.4, 5.6);
    const flatRoofMat = new THREE.MeshStandardMaterial({ color: isDark ? 0x1e293b : 0xcbd5e1 });
    const flatRoof = new THREE.Mesh(flatRoofGeo, flatRoofMat);
    flatRoof.position.set(0, 4.1, 0);
    flatRoof.castShadow = true;
    flatRoof.receiveShadow = true;
    parentGroup.add(flatRoof);

    // 2. ANGLED BALLAST FRAME RACKS FOR FLAT ROOF (Tilted 15 deg)
    const activeRows = Math.min(rowsCount, 3);
    for (let r = 0; r < activeRows; r++) {
      const rackZ = 1.5 - r * 1.5;
      const panelCols = 5;

      for (let c = 0; c < panelCols; c++) {
        const px = -2.0 + c * 1.0;
        
        // Triangular Stand Bracket
        const standMat = new THREE.MeshStandardMaterial({ color: 0x475569, metalness: 0.8 });
        const stand = new THREE.Mesh(new THREE.BoxGeometry(0.06, 0.4, 0.8), standMat);
        stand.position.set(px, 4.4, rackZ);
        parentGroup.add(stand);

        // Angled Solar Panel
        const panelBox = new THREE.Mesh(new THREE.BoxGeometry(0.9, 0.05, 1.2), panelMat);
        panelBox.rotation.x = -Math.PI / 8;
        panelBox.position.set(px, 4.55, rackZ);
        panelBox.castShadow = true;

        const borderBox = new THREE.Mesh(new THREE.BoxGeometry(0.94, 0.04, 1.24), panelFrameMat);
        borderBox.rotation.x = -Math.PI / 8;
        borderBox.position.set(px, 4.53, rackZ);

        parentGroup.add(panelBox, borderBox);
      }
    }
  }

  // 4. WALL-MOUNTED DEYE INVERTER & LIFEPO4 BATTERY STAND
  const inverterGeo = new THREE.BoxGeometry(0.8, 1.1, 0.3);
  const inverterMat = new THREE.MeshStandardMaterial({ color: 0x0f172a, metalness: 0.9, roughness: 0.2 });
  const inverter = new THREE.Mesh(inverterGeo, inverterMat);
  inverter.position.set(3.4, 2.5, 0);
  inverter.castShadow = true;

  const ledLight = new THREE.Mesh(new THREE.SphereGeometry(0.05, 16, 16), new THREE.MeshBasicMaterial({ color: 0x10b981 }));
  ledLight.position.set(3.56, 2.8, -0.2);

  parentGroup.add(inverter, ledLight);

  if (hasBattery) {
    const batGeo = new THREE.BoxGeometry(0.9, 1.4, 0.45);
    const batMat = new THREE.MeshStandardMaterial({ color: 0x022c22, metalness: 0.8 });
    const battery = new THREE.Mesh(batGeo, batMat);
    battery.position.set(3.4, 0.7, 0);
    battery.castShadow = true;

    const batLed = new THREE.Mesh(new THREE.BoxGeometry(0.05, 0.08, 0.3), new THREE.MeshBasicMaterial({ color: 0xa7f3d0 }));
    batLed.position.set(3.86, 1.1, 0);

    parentGroup.add(battery, batLed);
  }
}
