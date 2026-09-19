import { useEffect, useRef } from 'react';
import * as THREE from 'three';

export default function NeuralBackground() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // ── Device tier detection ──────────────────────────────────────────────
    const w = window.innerWidth;
    const isMobile  = w < 768;
    const isTablet  = w >= 768 && w < 1024;

    const nodeCount   = isMobile ? 30 : isTablet ? 50 : 75;
    const maxDistance = isMobile ? 2.6 : isTablet ? 3.2 : 3.8;
    const pixelRatio  = isMobile
      ? Math.min(window.devicePixelRatio, 1.25)
      : isTablet
      ? Math.min(window.devicePixelRatio, 1.5)
      : Math.min(window.devicePixelRatio, 1.75);

    // ── Three.js Scene & Camera ───────────────────────────────────────────────
    const scene = new THREE.Scene();

    const rect  = container.getBoundingClientRect();
    const width  = rect.width  || window.innerWidth;
    const height = rect.height || 650;

    let containerRect = {
      left: rect.left,
      top: rect.top,
      width: width,
      height: height,
    };

    const camera = new THREE.PerspectiveCamera(55, width / height, 0.1, 100);
    camera.position.z = 8;

    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: !isMobile,               // skip AA on mobile — big GPU win
      powerPreference: isMobile ? 'low-power' : 'high-performance',
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(pixelRatio);
    container.appendChild(renderer.domElement);

    // ── Colors ────────────────────────────────────────────────────────────────
    const baseLineColor = { r: 72 / 255, g: 86 / 255, b: 94 / 255 };

    // ── Create Glowing Node Canvas Texture ────────────────────────────────────
    const createGlowTexture = () => {
      const canvas = document.createElement('canvas');
      canvas.width  = isMobile ? 64 : 128;
      canvas.height = isMobile ? 64 : 128;
      const size = canvas.width;
      const half = size / 2;
      const ctx  = canvas.getContext('2d');
      if (ctx) {
        const gradient = ctx.createRadialGradient(half, half, 0, half, half, half);
        gradient.addColorStop(0,    'rgba(255, 255, 255, 1)');
        gradient.addColorStop(0.15, 'rgba(180, 197, 186, 0.95)');
        gradient.addColorStop(0.4,  'rgba(180, 197, 186, 0.55)');
        gradient.addColorStop(0.7,  'rgba(116, 128, 149, 0.15)');
        gradient.addColorStop(1,    'rgba(116, 128, 149, 0)');
        ctx.fillStyle = gradient;
        ctx.fillRect(0, 0, size, size);
      }
      return new THREE.CanvasTexture(canvas);
    };

    const glowTexture = createGlowTexture();

    // ── Generate 3D Nodes Data across Z-Depths ─────────────────────────────────
    interface NodeData {
      basePosition: THREE.Vector3;
      position:     THREE.Vector3;
      velocity:     THREE.Vector3;
      sineFreq:     THREE.Vector3;
      sineAmp:      THREE.Vector3;
      phase:        THREE.Vector3;
      depthFactor:  number;
      size:         number;
    }

    const nodes: NodeData[] = [];
    const positions = new Float32Array(nodeCount * 3);
    const colors    = new Float32Array(nodeCount * 3);
    const sizes     = new Float32Array(nodeCount);

    const spreadX = isMobile ? 8 : 14;
    const spreadY = isMobile ? 6 : 9;
    const minZ    = -5;
    const maxZ    =  3;

    for (let i = 0; i < nodeCount; i++) {
      const z         = minZ + Math.random() * (maxZ - minZ);
      const depthNorm = (z - minZ) / (maxZ - minZ);
      const depthFactor = 0.35 + depthNorm * 0.85;

      const pos = new THREE.Vector3(
        (Math.random() - 0.5) * spreadX,
        (Math.random() - 0.5) * spreadY,
        z
      );
      const vel = new THREE.Vector3(
        (Math.random() - 0.5) * 0.002,
        (Math.random() - 0.5) * 0.002,
        (Math.random() - 0.5) * 0.001
      );

      nodes.push({
        basePosition: pos.clone(),
        position:     pos.clone(),
        velocity:     vel,
        sineFreq: new THREE.Vector3(
          0.3 + Math.random() * 0.5,
          0.3 + Math.random() * 0.5,
          0.2 + Math.random() * 0.4
        ),
        sineAmp: new THREE.Vector3(
          0.25 + Math.random() * 0.35,
          0.25 + Math.random() * 0.35,
          0.15 + Math.random() * 0.25
        ),
        phase: new THREE.Vector3(
          Math.random() * Math.PI * 2,
          Math.random() * Math.PI * 2,
          Math.random() * Math.PI * 2
        ),
        depthFactor,
        size: isMobile ? 0.3 + depthNorm * 0.3 : 0.4 + depthNorm * 0.45,
      });

      positions[i * 3]     = pos.x;
      positions[i * 3 + 1] = pos.y;
      positions[i * 3 + 2] = pos.z;

      colors[i * 3]     = 0.45 + depthNorm * 0.55;
      colors[i * 3 + 1] = 0.48 + depthNorm * 0.52;
      colors[i * 3 + 2] = 0.52 + depthNorm * 0.48;

      sizes[i] = nodes[i].size;
    }

    // ── Points Object ──────────────────────────────────────────────────────
    const pointsGeometry = new THREE.BufferGeometry();
    pointsGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    pointsGeometry.setAttribute('color',    new THREE.BufferAttribute(colors, 3));

    const pointsMaterial = new THREE.PointsMaterial({
      size:         isMobile ? 0.45 : 0.6,
      map:          glowTexture,
      vertexColors: true,
      transparent:  true,
      opacity:      0.85,
      depthWrite:   false,
      blending:     THREE.AdditiveBlending,
    });

    const pointCloud = new THREE.Points(pointsGeometry, pointsMaterial);
    scene.add(pointCloud);

    // ── Dynamic Distance-Faded Connecting Lines ────────────────────────────
    const maxLineSegments = (nodeCount * (nodeCount - 1)) / 2;
    const linePositions   = new Float32Array(maxLineSegments * 6);
    const lineColors      = new Float32Array(maxLineSegments * 6);

    const lineGeometry = new THREE.BufferGeometry();
    lineGeometry.setAttribute(
      'position',
      new THREE.BufferAttribute(linePositions, 3).setUsage(THREE.DynamicDrawUsage)
    );
    lineGeometry.setAttribute(
      'color',
      new THREE.BufferAttribute(lineColors, 3).setUsage(THREE.DynamicDrawUsage)
    );

    const lineMaterial = new THREE.LineBasicMaterial({
      vertexColors: true,
      transparent:  true,
      opacity:      0.7,
      blending:     THREE.AdditiveBlending,
      depthWrite:   false,
    });

    const linesMesh = new THREE.LineSegments(lineGeometry, lineMaterial);
    scene.add(linesMesh);

    // ── Interactive Elastic Mouse Parallax State ──────────────────────────
    const mouse = { x: 0, y: 0, targetX: 0, targetY: 0, velX: 0, velY: 0 };

    const handleMouseMove = (e: MouseEvent) => {
      // Use cached containerRect to avoid layout recalculation (getBoundingClientRect reflow)
      mouse.targetX = ((e.clientX - containerRect.left) / containerRect.width - 0.5) * 2;
      mouse.targetY = -((e.clientY - containerRect.top) / containerRect.height - 0.5) * 2;
    };

    // Only attach mouse listener on hover-capable devices (not mobile/touch)
    const canHover = !isMobile && window.matchMedia('(hover: hover) and (pointer: fine)').matches;
    if (canHover) {
      window.addEventListener('mousemove', handleMouseMove, { passive: true });
    }

    // ── Resize Handler ────────────────────────────────────────────────────
    const handleResize = () => {
      if (!container) return;
      const r = container.getBoundingClientRect();
      const rw = r.width  || window.innerWidth;
      const rh = r.height || 650;
      containerRect = { left: r.left, top: r.top, width: rw, height: rh };
      camera.aspect = rw / rh;
      camera.updateProjectionMatrix();
      renderer.setSize(rw, rh);
    };

    window.addEventListener('resize', handleResize, { passive: true });

    // ── Animation Loop with True Off-Screen Pausing ────────────────────────
    let isRunning = false;
    let animationFrameId: number = 0;
    const clock = new THREE.Clock();

    // Pre-compute maxDistance² for the cheap AABB pre-check
    const maxDistSq = maxDistance * maxDistance;

    const animate = () => {
      if (!isRunning) return;
      animationFrameId = requestAnimationFrame(animate);

      const elapsedTime = clock.getElapsedTime();

      // Elastic spring physics for mouse parallax (only if hover capable)
      if (canHover) {
        const springK  = 0.08;
        const damping  = 0.82;
        mouse.velX = (mouse.velX + (mouse.targetX - mouse.x) * springK) * damping;
        mouse.velY = (mouse.velY + (mouse.targetY - mouse.y) * springK) * damping;
        mouse.x   += mouse.velX;
        mouse.y   += mouse.velY;

        camera.position.x = mouse.x * 0.75;
        camera.position.y = mouse.y * 0.55;
        camera.lookAt(0, 0, 0);
      }

      // Update Node positions
      const posAttr  = pointsGeometry.attributes.position as THREE.BufferAttribute;
      const posArray = posAttr.array as Float32Array;

      for (let i = 0; i < nodeCount; i++) {
        const node = nodes[i];

        const floatX = Math.sin(elapsedTime * node.sineFreq.x + node.phase.x) * node.sineAmp.x;
        const floatY = Math.cos(elapsedTime * node.sineFreq.y + node.phase.y) * node.sineAmp.y;
        const floatZ = Math.sin(elapsedTime * node.sineFreq.z + node.phase.z) * node.sineAmp.z;

        node.basePosition.add(node.velocity);

        if (Math.abs(node.basePosition.x) > spreadX * 0.55) node.velocity.x *= -1;
        if (Math.abs(node.basePosition.y) > spreadY * 0.55) node.velocity.y *= -1;
        if (node.basePosition.z < minZ - 1 || node.basePosition.z > maxZ + 1) node.velocity.z *= -1;

        const parallaxFactor = canHover ? node.depthFactor * 0.45 : 0;
        node.position.x = node.basePosition.x + floatX + mouse.x * parallaxFactor;
        node.position.y = node.basePosition.y + floatY + mouse.y * parallaxFactor;
        node.position.z = node.basePosition.z + floatZ;

        posArray[i * 3]     = node.position.x;
        posArray[i * 3 + 1] = node.position.y;
        posArray[i * 3 + 2] = node.position.z;
      }
      posAttr.needsUpdate = true;

      // Update Connecting Lines with fast 1D axis rejection & cached properties
      let vertexIndex  = 0;
      const linePosAttr  = lineGeometry.attributes.position as THREE.BufferAttribute;
      const linePosArray = linePosAttr.array as Float32Array;
      const lineColAttr  = lineGeometry.attributes.color as THREE.BufferAttribute;
      const lineColArray = lineColAttr.array as Float32Array;

      for (let i = 0; i < nodeCount; i++) {
        const ni = nodes[i];
        const nix = ni.position.x;
        const niy = ni.position.y;
        const niz = ni.position.z;

        for (let j = i + 1; j < nodeCount; j++) {
          const nj = nodes[j];

          // 1D Axis-aligned distance rejection before any multiplications
          const dx = nix - nj.position.x;
          if (dx > maxDistance || dx < -maxDistance) continue;
          const dy = niy - nj.position.y;
          if (dy > maxDistance || dy < -maxDistance) continue;
          const dz = niz - nj.position.z;
          if (dz > maxDistance || dz < -maxDistance) continue;

          const distSq = dx * dx + dy * dy + dz * dz;
          if (distSq >= maxDistSq) continue;

          const dist = Math.sqrt(distSq);
          const ratio = 1 - dist / maxDistance;
          // ratio * Math.sqrt(ratio) is identical to Math.pow(ratio, 1.5) but 4x faster
          const fade = ratio * Math.sqrt(ratio);
          const avgDepth = (ni.depthFactor + nj.depthFactor) * 0.5;
          const lineBrightness = fade * avgDepth * 0.55;

          const rVal = baseLineColor.r * lineBrightness;
          const gVal = baseLineColor.g * lineBrightness;
          const bVal = baseLineColor.b * lineBrightness;

          linePosArray[vertexIndex]     = nix;
          linePosArray[vertexIndex + 1] = niy;
          linePosArray[vertexIndex + 2] = niz;
          lineColArray[vertexIndex]     = rVal;
          lineColArray[vertexIndex + 1] = gVal;
          lineColArray[vertexIndex + 2] = bVal;

          linePosArray[vertexIndex + 3] = nj.position.x;
          linePosArray[vertexIndex + 4] = nj.position.y;
          linePosArray[vertexIndex + 5] = nj.position.z;
          lineColArray[vertexIndex + 3] = rVal;
          lineColArray[vertexIndex + 4] = gVal;
          lineColArray[vertexIndex + 5] = bVal;

          vertexIndex += 6;
        }
      }

      lineGeometry.setDrawRange(0, vertexIndex / 3);
      linePosAttr.needsUpdate = true;
      lineColAttr.needsUpdate  = true;

      renderer.render(scene, camera);
    };

    const startLoop = () => {
      if (!isRunning) {
        isRunning = true;
        clock.start();
        animationFrameId = requestAnimationFrame(animate);
      }
    };

    const stopLoop = () => {
      if (isRunning) {
        isRunning = false;
        cancelAnimationFrame(animationFrameId);
      }
    };

    // ── IntersectionObserver — complete pause when off-screen ──────────
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          startLoop();
        } else {
          stopLoop();
        }
      },
      { threshold: 0, rootMargin: '50px' }
    );
    observer.observe(container);

    // Initial start
    startLoop();

    // ── Cleanup ───────────────────────────────────────────────────────────
    return () => {
      stopLoop();
      observer.disconnect();
      if (canHover) {
        window.removeEventListener('mousemove', handleMouseMove);
      }
      window.removeEventListener('resize', handleResize);

      if (container && renderer.domElement.parentNode === container) {
        container.removeChild(renderer.domElement);
      }

      pointsGeometry.dispose();
      pointsMaterial.dispose();
      lineGeometry.dispose();
      lineMaterial.dispose();
      glowTexture.dispose();
      renderer.dispose();
    };
  }, []);

  return (
    <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden">
      {/* Soft radial ambient accent glow */}
      <div className="absolute left-1/2 top-1/2 h-[550px] w-[750px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(ellipse_at_center,rgba(180,197,186,0.14)_0%,rgba(116,128,149,0.04)_45%,transparent_75%)] blur-2xl pointer-events-none" />

      {/* 3D Canvas container with soft edge mask */}
      <div
        ref={containerRef}
        className="absolute inset-0 h-full w-full opacity-95"
        style={{
          maskImage:
            'radial-gradient(ellipse 90% 80% at 50% 50%, black 45%, transparent 100%)',
          WebkitMaskImage:
            'radial-gradient(ellipse 90% 80% at 50% 50%, black 45%, transparent 100%)',
        }}
      />

      {/* Vignette overlay */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_30%,rgba(14,18,15,0.75)_100%)] pointer-events-none" />

      {/* Grain / Noise texture overlay */}
      <div
        className="absolute inset-0 opacity-[0.03] mix-blend-overlay pointer-events-none"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
        }}
      />
    </div>
  );
}
