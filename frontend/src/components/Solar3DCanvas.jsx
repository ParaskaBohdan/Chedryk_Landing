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
  theme = 'dark',
  mountType = 'roof'
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
    const ambientLight = new THREE.AmbientLight(0xffffff, isDark ? 0.75 : 0.95);
    scene.add(ambientLight);

    const sunLight = new THREE.DirectionalLight(0xfff8ee, 2.4);
    sunLight.position.set(14, 26, 16);
    sunLight.castShadow = true;
    sunLight.shadow.mapSize.width = 2048;
    sunLight.shadow.mapSize.height = 2048;
    sunLight.shadow.camera.near = 0.5;
    sunLight.shadow.camera.far = 60;
    sunLight.shadow.bias = -0.0003;
    scene.add(sunLight);

    const skyLight = new THREE.HemisphereLight(0x38bdf8, 0x0f172a, 0.5);
    scene.add(skyLight);

    // 5. UNIFIED HOUSE MESH GROUP (SEALED, GAPS-FREE ARCHITECTURE)
    const houseGroup = new THREE.Group();
    houseGroupRef.current = houseGroup;
    scene.add(houseGroup);

    // Apply terrain slope rotation if ground mount and southern slope (pitched) is selected
    if (mountType === 'ground' && roofType === 'pitched') {
      houseGroup.rotation.x = 0.18; // ~10 degrees slope towards the front/sun
    }

    // Ground Base & Lawn
    const baseMat = new THREE.MeshStandardMaterial({ color: isDark ? 0x1e293b : 0xe2e8f0, roughness: 0.6 });
    const pedestalBase = new THREE.Mesh(new THREE.BoxGeometry(11.6, 0.35, 11.6), baseMat);
    pedestalBase.position.y = -0.18;
    pedestalBase.receiveShadow = true;
    houseGroup.add(pedestalBase);

    const lawnMat = new THREE.MeshStandardMaterial({ color: isDark ? 0x064e3b : 0x4ade80, roughness: 0.85 });
    const lawn = new THREE.Mesh(new THREE.BoxGeometry(11.0, 0.05, 11.0), lawnMat);
    lawn.position.y = 0.02;
    lawn.receiveShadow = true;
    houseGroup.add(lawn);

    // Landscaping Trees & Shrubs
    const treeMat = new THREE.MeshStandardMaterial({ color: 0x15803d, roughness: 0.8 });
    const trunkMat = new THREE.MeshStandardMaterial({ color: 0x78350f });
    [
      { x: -4.4, z: 3.8, r: 0.65 },
      { x: -4.0, z: -3.8, r: 0.55 },
      { x: 4.4, z: -3.8, r: 0.6 },
      { x: -1.2, z: 4.4, r: 0.4 },
      { x: 1.8, z: 4.4, r: 0.45 }
    ].forEach((t) => {
      const foliage = new THREE.Mesh(new THREE.DodecahedronGeometry(t.r, 1), treeMat);
      foliage.position.set(t.x, 0.6 + t.r, t.z);
      foliage.castShadow = true;
      
      const trunk = new THREE.Mesh(new THREE.CylinderGeometry(0.08, 0.1, 0.6), trunkMat);
      trunk.position.set(t.x, 0.3, t.z);
      houseGroup.add(foliage, trunk);
    });

    if (mountType !== 'ground') {
      // Materials
      const wallMat = new THREE.MeshStandardMaterial({ color: 0xf8fafc, roughness: 0.25 });
      const darkTrimMat = new THREE.MeshStandardMaterial({ color: 0x1e293b, roughness: 0.3 });
      const glassMat = new THREE.MeshStandardMaterial({ color: 0x0284c7, roughness: 0.08, metalness: 0.92 });
      const frameMat = new THREE.MeshStandardMaterial({ color: 0x0f172a, roughness: 0.4 });

      // 1st Floor Main Body (5.6m x 2.2m x 4.8m)
      const firstFloor = new THREE.Mesh(new THREE.BoxGeometry(5.6, 2.2, 4.8), wallMat);
      firstFloor.position.set(0, 1.1, 0);
      firstFloor.castShadow = true;
      firstFloor.receiveShadow = true;
      houseGroup.add(firstFloor);

      // Side Extension / Garage Body (2.2m x 1.8m x 4.0m)
      const sideExtension = new THREE.Mesh(new THREE.BoxGeometry(2.2, 1.8, 4.0), wallMat);
      sideExtension.position.set(3.4, 0.9, 0);
      sideExtension.castShadow = true;
      sideExtension.receiveShadow = true;
      houseGroup.add(sideExtension);

      // Side Extension Cap Roof
      const sideCap = new THREE.Mesh(new THREE.BoxGeometry(2.3, 0.12, 4.1), darkTrimMat);
      sideCap.position.set(3.4, 1.84, 0);
      sideCap.castShadow = true;
      houseGroup.add(sideCap);

      // 2nd Floor Main Body (5.6m x 2.0m x 4.4m)
      const secondFloor = new THREE.Mesh(new THREE.BoxGeometry(5.6, 2.0, 4.4), wallMat);
      secondFloor.position.set(0, 3.2, 0);
      secondFloor.castShadow = true;
      secondFloor.receiveShadow = true;
      houseGroup.add(secondFloor);

      // 2nd Floor Front Balcony Deck & Metal Railing
      const balconyDeck = new THREE.Mesh(new THREE.BoxGeometry(4.2, 0.12, 1.0), darkTrimMat);
      balconyDeck.position.set(-0.7, 2.2, 2.7);
      balconyDeck.castShadow = true;
      houseGroup.add(balconyDeck);

      // Balcony Railings (Front + Left & Right Sides)
      const railMat = new THREE.MeshStandardMaterial({ color: 0x0f172a, metalness: 0.8 });
      
      // Front Top Rail
      const topRail = new THREE.Mesh(new THREE.BoxGeometry(4.2, 0.05, 0.05), railMat);
      topRail.position.set(-0.7, 2.8, 3.18);
      
      // Left Side Top Rail
      const leftSideRail = new THREE.Mesh(new THREE.BoxGeometry(0.05, 0.05, 0.98), railMat);
      leftSideRail.position.set(-2.78, 2.8, 2.69);

      // Right Side Top Rail
      const rightSideRail = new THREE.Mesh(new THREE.BoxGeometry(0.05, 0.05, 0.98), railMat);
      rightSideRail.position.set(1.38, 2.8, 2.69);

      houseGroup.add(topRail, leftSideRail, rightSideRail);

      // Vertical Posts (Front & Wall Posts)
      [-2.78, -0.7, 1.38].forEach((rx) => {
        const postFront = new THREE.Mesh(new THREE.BoxGeometry(0.04, 0.6, 0.04), railMat);
        postFront.position.set(rx, 2.5, 3.18);
        
        if (rx !== -0.7) {
          const postWall = new THREE.Mesh(new THREE.BoxGeometry(0.04, 0.6, 0.04), railMat);
          postWall.position.set(rx, 2.5, 2.22);
          houseGroup.add(postWall);
        }
        
        houseGroup.add(postFront);
      });

      // WINDOWS & DOORS WITH DETAILED FRAME MULLIONS & SILLS
      const sillMat = new THREE.MeshStandardMaterial({ color: 0x334155, roughness: 0.3 });

      const createWindow = (w, h, x, y, z, isWallRotated = false) => {
        const winGroup = new THREE.Group();
        
        const outerFrame = new THREE.Mesh(
          isWallRotated ? new THREE.BoxGeometry(0.04, h + 0.1, w + 0.1) : new THREE.BoxGeometry(w + 0.1, h + 0.1, 0.04),
          frameMat
        );
        outerFrame.position.set(x, y, isWallRotated ? z : z - 0.01);
        
        const glass = new THREE.Mesh(
          isWallRotated ? new THREE.BoxGeometry(0.06, h, w) : new THREE.BoxGeometry(w, h, 0.06),
          glassMat
        );
        glass.position.set(x, y, z);
        
        const vMullion = new THREE.Mesh(
          isWallRotated ? new THREE.BoxGeometry(0.08, h, 0.03) : new THREE.BoxGeometry(0.03, h, 0.08),
          frameMat
        );
        vMullion.position.set(x, y, z);

        const hMullion = new THREE.Mesh(
          isWallRotated ? new THREE.BoxGeometry(0.08, 0.03, w) : new THREE.BoxGeometry(w, 0.03, 0.08),
          frameMat
        );
        hMullion.position.set(x, y + h * 0.15, z);

        const sill = new THREE.Mesh(
          isWallRotated ? new THREE.BoxGeometry(0.12, 0.04, w + 0.14) : new THREE.BoxGeometry(w + 0.14, 0.04, 0.12),
          sillMat
        );
        sill.position.set(x, y - h / 2 - 0.02, isWallRotated ? z : z + 0.03);

        winGroup.add(outerFrame, glass, vMullion, hMullion, sill);
        return winGroup;
      };

      // 1st Floor Main Entrance Door
      const door = new THREE.Mesh(new THREE.BoxGeometry(0.9, 1.7, 0.06), new THREE.MeshStandardMaterial({ color: 0x334155, roughness: 0.4 }));
      door.position.set(1.4, 0.85, 2.41);
      const doorHandle = new THREE.Mesh(new THREE.BoxGeometry(0.04, 0.2, 0.08), new THREE.MeshStandardMaterial({ color: 0xf59e0b, metalness: 0.9 }));
      doorHandle.position.set(1.1, 0.85, 2.45);
      houseGroup.add(door, doorHandle);

      // 1st Floor Main Detailed Window (Left Side)
      houseGroup.add(createWindow(1.6, 1.3, -1.4, 1.1, 2.41));

      // 2nd Floor Balcony Glass Exit Door (Left Side of Balcony)
      const bDoorGroup = new THREE.Group();
      const bDoorFrame = new THREE.Mesh(new THREE.BoxGeometry(1.1, 1.8, 0.04), frameMat);
      bDoorFrame.position.set(-1.6, 3.1, 2.2);
      const bDoorGlass = new THREE.Mesh(new THREE.BoxGeometry(1.0, 1.7, 0.06), glassMat);
      bDoorGlass.position.set(-1.6, 3.1, 2.21);
      const bDoorMullion = new THREE.Mesh(new THREE.BoxGeometry(0.04, 1.7, 0.08), frameMat);
      bDoorMullion.position.set(-1.6, 3.1, 2.21);
      const bDoorHandle = new THREE.Mesh(new THREE.BoxGeometry(0.04, 0.2, 0.08), new THREE.MeshStandardMaterial({ color: 0xf59e0b, metalness: 0.9 }));
      bDoorHandle.position.set(-1.18, 3.0, 2.25);
      bDoorGroup.add(bDoorFrame, bDoorGlass, bDoorMullion, bDoorHandle);
      houseGroup.add(bDoorGroup);

      // 2nd Floor Balcony Window (Right Side of Balcony)
      houseGroup.add(createWindow(1.3, 1.2, 0.3, 3.1, 2.21));

      // Extension Window (Front)
      houseGroup.add(createWindow(1.2, 0.9, 3.4, 1.0, 2.01));

      // 2nd Floor Side Window (Right Wall)
      houseGroup.add(createWindow(1.4, 1.0, 2.81, 3.1, 0, true));
    }

    // 6. BUILD PERFECTLY MATCHED PITCHED / FLAT ROOF WITH SOLAR PANELS
    buildRoofAndPanels(houseGroup, roofType, rowsCount, panelBrand, hasBattery, batteryCapacityKwh, isDark, mountType);

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
  }, [roofType, rowsCount, panelBrand, hasBattery, batteryCapacityKwh, isDark, mountType]);

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
function buildRoofAndPanels(parentGroup, roofType, rowsCount, panelBrand, hasBattery, batteryCapacityKwh, isDark, mountType) {
  const panelMat = new THREE.MeshStandardMaterial({ color: 0x0b1d3a, roughness: 0.12, metalness: 0.88 });
  const panelFrameMat = new THREE.MeshStandardMaterial({ color: 0xf8fafc, metalness: 0.98, roughness: 0.08 });
  const railMat = new THREE.MeshStandardMaterial({ color: 0xd97706, metalness: 0.85, roughness: 0.2 });
  const darkRoofMat = new THREE.MeshStandardMaterial({ color: 0x1e293b, roughness: 0.35 });
  const wallMat = new THREE.MeshStandardMaterial({ color: 0xf8fafc, roughness: 0.25 });

  const activeRows = Math.min(rowsCount, 3); // 1, 2, or 3 rows

  if (mountType === 'ground') {
    // 3. GROUND MOUNTED SOLAR RACK
    const tiltAngle = Math.PI / 6; // 30 deg optimal tilt for ground mount
    const rackZPositions = 
      activeRows === 1 ? [0.0] :
      activeRows === 2 ? [1.8, -1.8] :
      [2.5, 0.0, -2.5];

    rackZPositions.forEach((rackZ) => {
      const panelCols = 5;
      
      // Draw structural support frames under this row
      const standMat = new THREE.MeshStandardMaterial({ color: 0x475569, metalness: 0.9, roughness: 0.2 });
      
      // Draw left, center, right vertical columns & diagonal struts
      [-1.8, 0.0, 1.8].forEach((legX) => {
        // Back taller post
        const backLeg = new THREE.Mesh(new THREE.CylinderGeometry(0.04, 0.04, 1.2), standMat);
        backLeg.position.set(legX, 0.6, rackZ - 0.45);
        backLeg.castShadow = true;

        // Front shorter post
        const frontLeg = new THREE.Mesh(new THREE.CylinderGeometry(0.04, 0.04, 0.6), standMat);
        frontLeg.position.set(legX, 0.3, rackZ + 0.45);
        frontLeg.castShadow = true;

        // Diagonal beam connecting them
        const beam = new THREE.Mesh(new THREE.BoxGeometry(0.04, 0.04, 1.1), standMat);
        beam.rotation.x = Math.PI / 6;
        beam.position.set(legX, 0.8, rackZ);
        beam.castShadow = true;

        parentGroup.add(backLeg, frontLeg, beam);
      });

      // Horizontal rails for panels
      const rail1 = new THREE.Mesh(new THREE.BoxGeometry(4.8, 0.03, 0.03), standMat);
      rail1.position.set(0, 0.9, rackZ - 0.25);
      const rail2 = new THREE.Mesh(new THREE.BoxGeometry(4.8, 0.03, 0.03), standMat);
      rail2.position.set(0, 0.6, rackZ + 0.25);
      parentGroup.add(rail1, rail2);

      // Render the panels
      for (let c = 0; c < panelCols; c++) {
        const px = -1.8 + c * 0.9;

        // Solar panel tilted at 30 deg
        const panelBox = new THREE.Mesh(new THREE.BoxGeometry(0.82, 0.045, 0.95), panelMat);
        panelBox.rotation.x = tiltAngle;
        panelBox.position.set(px, 0.85, rackZ);
        panelBox.castShadow = true;

        const borderBox = new THREE.Mesh(new THREE.BoxGeometry(0.86, 0.035, 0.99), panelFrameMat);
        borderBox.rotation.x = tiltAngle;
        borderBox.position.set(px, 0.84, rackZ);

        parentGroup.add(panelBox, borderBox);
      }
    });

    // Draw Ground-mounted Inverter and Battery shelter on separate concrete pad next to the racks
    const padMat = new THREE.MeshStandardMaterial({ color: 0x475569, roughness: 0.7 });
    const concretePad = new THREE.Mesh(new THREE.BoxGeometry(1.2, 0.1, 1.2), padMat);
    concretePad.position.set(4.0, 0.05, 2.0);
    concretePad.receiveShadow = true;
    parentGroup.add(concretePad);

    // Inverter on structural stand
    const standMat = new THREE.MeshStandardMaterial({ color: 0x334155, metalness: 0.9 });
    const invStand = new THREE.Mesh(new THREE.BoxGeometry(0.8, 1.4, 0.1), standMat);
    invStand.position.set(4.0, 0.75, 2.0);
    invStand.castShadow = true;
    parentGroup.add(invStand);

    const inverterGeo = new THREE.BoxGeometry(0.3, 0.8, 0.5);
    const inverterMat = new THREE.MeshStandardMaterial({ color: 0x0f172a, metalness: 0.9, roughness: 0.2 });
    const inverter = new THREE.Mesh(inverterGeo, inverterMat);
    inverter.position.set(4.0, 1.1, 2.1);
    inverter.castShadow = true;

    const ledLight = new THREE.Mesh(new THREE.SphereGeometry(0.03, 16, 16), new THREE.MeshBasicMaterial({ color: 0x10b981 }));
    ledLight.position.set(4.12, 1.3, 2.37);
    parentGroup.add(inverter, ledLight);

    if (hasBattery) {
      const batGeo = new THREE.BoxGeometry(0.45, 0.8, 0.6);
      const batMat = new THREE.MeshStandardMaterial({ color: 0x022c22, metalness: 0.8 });
      const battery = new THREE.Mesh(batGeo, batMat);
      battery.position.set(4.0, 0.45, 2.15);
      battery.castShadow = true;

      const batLed = new THREE.Mesh(new THREE.BoxGeometry(0.04, 0.06, 0.2), new THREE.MeshBasicMaterial({ color: 0xa7f3d0 }));
      batLed.position.set(4.24, 0.6, 2.15);
      parentGroup.add(battery, batLed);
    }
    return;
  }

  if (roofType === 'pitched') {
    // 1. SYMMETRIC SEALED PITCHED GABLE ROOF ON 2ND FLOOR
    const halfW = 2.9;
    const frontZ = 2.3;
    const backZ = -2.3;
    const yBase = 4.2;
    const yApex = 5.6;

    // Roof Slopes (Front & Back)
    const roofGeo = new THREE.BufferGeometry();
    const vertices = new Float32Array([
      // Front Slope
      -halfW, yBase,  frontZ,
       halfW, yBase,  frontZ,
       halfW, yApex,  0.0,
      -halfW, yBase,  frontZ,
       halfW, yApex,  0.0,
      -halfW, yApex,  0.0,

      // Back Slope
      -halfW, yBase,  backZ,
      -halfW, yApex,  0.0,
       halfW, yApex,  0.0,
      -halfW, yBase,  backZ,
       halfW, yApex,  0.0,
       halfW, yBase,  backZ,
    ]);

    roofGeo.setAttribute('position', new THREE.BufferAttribute(vertices, 3));
    roofGeo.computeVertexNormals();

    const roof = new THREE.Mesh(roofGeo, darkRoofMat);
    roof.castShadow = true;
    roof.receiveShadow = true;
    parentGroup.add(roof);

    // Triangular Gable End Walls (Left & Right) to completely seal the gaps!
    const leftGableGeo = new THREE.BufferGeometry();
    const lVerts = new Float32Array([
      -halfW + 0.1, yBase,  frontZ,
      -halfW + 0.1, yApex,  0.0,
      -halfW + 0.1, yBase,  backZ,
    ]);
    leftGableGeo.setAttribute('position', new THREE.BufferAttribute(lVerts, 3));
    leftGableGeo.computeVertexNormals();
    const leftGable = new THREE.Mesh(leftGableGeo, wallMat);
    leftGable.castShadow = true;

    const rightGableGeo = new THREE.BufferGeometry();
    const rVerts = new Float32Array([
      halfW - 0.1, yBase,  frontZ,
      halfW - 0.1, yBase,  backZ,
      halfW - 0.1, yApex,  0.0,
    ]);
    rightGableGeo.setAttribute('position', new THREE.BufferAttribute(rVerts, 3));
    rightGableGeo.computeVertexNormals();
    const rightGable = new THREE.Mesh(rightGableGeo, wallMat);
    rightGable.castShadow = true;

    parentGroup.add(leftGable, rightGable);

    // Front Roof Slope Angle = Math.atan2(1.4, 2.3) = ~31.3 deg
    const slopeAngle = Math.atan2(1.4, 2.3);

    // Dynamic Row Positions & Panel Dimensions along slope (Tight Array Stacking)
    const pitchActiveRows = Math.min(rowsCount, 4);

    const rowPositions = 
      pitchActiveRows === 1 ? [1.1] :
      pitchActiveRows === 2 ? [0.75, 1.43] :
      pitchActiveRows === 3 ? [0.55, 1.23, 1.91] :
      [0.25, 0.93, 1.61, 2.29];

    const panelZLength = 0.63;
    const borderZLength = 0.67;

    rowPositions.forEach((slopeDist) => {
      const py = yBase + Math.sin(slopeAngle) * slopeDist + 0.06;
      const pz = frontZ - Math.cos(slopeAngle) * slopeDist;

      // Rails under panel row
      const rail1 = new THREE.Mesh(new THREE.BoxGeometry(4.6, 0.04, 0.04), railMat);
      rail1.rotation.x = slopeAngle;
      rail1.position.set(0, py - 0.02, pz + 0.04);

      const rail2 = new THREE.Mesh(new THREE.BoxGeometry(4.6, 0.04, 0.04), railMat);
      rail2.rotation.x = slopeAngle;
      rail2.position.set(0, py + 0.08, pz - 0.14);

      parentGroup.add(rail1, rail2);

      // Solar Panels
      const panelCols = 5;
      for (let c = 0; c < panelCols; c++) {
        const px = -1.82 + c * 0.91;

        const panelBox = new THREE.Mesh(new THREE.BoxGeometry(0.85, 0.045, panelZLength), panelMat);
        panelBox.rotation.x = slopeAngle;
        panelBox.position.set(px, py + 0.045, pz);
        panelBox.castShadow = true;

        const borderBox = new THREE.Mesh(new THREE.BoxGeometry(0.89, 0.035, borderZLength), panelFrameMat);
        borderBox.rotation.x = slopeAngle;
        borderBox.position.set(px, py + 0.035, pz);

        parentGroup.add(panelBox, borderBox);
      }
    });

  } else {
    // 2. FLAT ROOF DECK WITH PARAPET BORDER (IDENTICAL BASE HOUSE)
    const deckMat = new THREE.MeshStandardMaterial({ color: isDark ? 0x1e293b : 0x475569, roughness: 0.6 });
    const flatRoofDeck = new THREE.Mesh(new THREE.BoxGeometry(5.8, 0.2, 4.6), deckMat);
    flatRoofDeck.position.set(0, 4.3, 0);
    flatRoofDeck.castShadow = true;
    flatRoofDeck.receiveShadow = true;
    parentGroup.add(flatRoofDeck);

    // Parapet Borders (Front, Back, Left, Right)
    const parapetMat = new THREE.MeshStandardMaterial({ color: 0xf8fafc, roughness: 0.25 });
    const frontPar = new THREE.Mesh(new THREE.BoxGeometry(5.8, 0.25, 0.15), parapetMat);
    frontPar.position.set(0, 4.525, 2.225);
    
    const backPar = new THREE.Mesh(new THREE.BoxGeometry(5.8, 0.25, 0.15), parapetMat);
    backPar.position.set(0, 4.525, -2.225);
    
    const leftPar = new THREE.Mesh(new THREE.BoxGeometry(0.15, 0.25, 4.3), parapetMat);
    leftPar.position.set(-2.825, 4.525, 0);
    
    const rightPar = new THREE.Mesh(new THREE.BoxGeometry(0.15, 0.25, 4.3), parapetMat);
    rightPar.position.set(2.825, 4.525, 0);

    parentGroup.add(frontPar, backPar, leftPar, rightPar);

    // 15 deg Tilt Angle towards FRONT / SUN (+Z direction)
    const tiltAngle = Math.PI / 12;

    const rowPositionsZ = 
      activeRows === 1 ? [0.0] :
      activeRows === 2 ? [0.8, -0.8] :
      [1.1, 0.0, -1.1];

    rowPositionsZ.forEach((rackZ) => {
      const panelCols = 5;

      for (let c = 0; c < panelCols; c++) {
        const px = -1.8 + c * 0.9;
        
        // Steel Triangular Ballast Stand Feet facing FRONT (+Z)
        const standMat = new THREE.MeshStandardMaterial({ color: 0x334155, metalness: 0.9, roughness: 0.3 });
        const stand = new THREE.Mesh(new THREE.BoxGeometry(0.05, 0.20, 0.58), standMat);
        stand.position.set(px, 4.48, rackZ);
        parentGroup.add(stand);

        // Solar Panel Box Tilted FORWARD towards Front/Sun (+tiltAngle)
        const panelBox = new THREE.Mesh(new THREE.BoxGeometry(0.82, 0.04, 0.8), panelMat);
        panelBox.rotation.x = tiltAngle;
        panelBox.position.set(px, 4.72, rackZ);
        panelBox.castShadow = true;

        const borderBox = new THREE.Mesh(new THREE.BoxGeometry(0.86, 0.03, 0.84), panelFrameMat);
        borderBox.rotation.x = tiltAngle;
        borderBox.position.set(px, 4.70, rackZ);

        parentGroup.add(panelBox, borderBox);
      }
    });
  }

  // WALL-MOUNTED DEYE INVERTER & LIFEPO4 BATTERY STAND
  const inverterGeo = new THREE.BoxGeometry(0.3, 1.1, 0.75);
  const inverterMat = new THREE.MeshStandardMaterial({ color: 0x0f172a, metalness: 0.9, roughness: 0.2 });
  const inverter = new THREE.Mesh(inverterGeo, inverterMat);
  inverter.position.set(2.35, 1.8, 0.5);
  inverter.castShadow = true;

  const ledLight = new THREE.Mesh(new THREE.SphereGeometry(0.04, 16, 16), new THREE.MeshBasicMaterial({ color: 0x10b981 }));
  ledLight.position.set(2.52, 2.1, 0.7);

  parentGroup.add(inverter, ledLight);

  if (hasBattery) {
    const batGeo = new THREE.BoxGeometry(0.45, 1.3, 0.85);
    const batMat = new THREE.MeshStandardMaterial({ color: 0x022c22, metalness: 0.8 });
    const battery = new THREE.Mesh(batGeo, batMat);
    battery.position.set(2.42, 0.65, 0.5);
    battery.castShadow = true;

    const batLed = new THREE.Mesh(new THREE.BoxGeometry(0.05, 0.08, 0.3), new THREE.MeshBasicMaterial({ color: 0xa7f3d0 }));
    batLed.position.set(2.66, 1.0, 0.5);

    parentGroup.add(battery, batLed);
  }
}
