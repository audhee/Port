import { useEffect, useRef } from 'react';
import * as THREE from 'three';

export default function NeuralBackground() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const isMobile = window.innerWidth < 768;
    const nodeCount = isMobile ? 45 : 100;
    const maxDistance = isMobile ? 3.0 : 3.8;

    // ── Three.js Scene & Camera ───────────────────────────────────────────────
    const scene = new THREE.Scene();

    const rect = container.getBoundingClientRect();
    const width = rect.width || window.innerWidth;
    const height = rect.height || 650;

    const camera = new THREE.PerspectiveCamera(55, width / height, 0.1, 100);
    camera.position.z = 8;

    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true,
      powerPreference: 'high-performance',
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.appendChild(renderer.domElement);

    // ── Colors ────────────────────────────────────────────────────────────────
    // Accent glow: #8ca888 (140, 168, 136)
    // Line secondary: #4e6046 (78, 96, 70)
    const baseLineColor = { r: 78 / 255, g: 96 / 255, b: 70 / 255 };

    // ── Create Glowing Node Canvas Texture ────────────────────────────────────
    const createGlowTexture = () => {
      const canvas = document.createElement('canvas');
      canvas.width = 128;
      canvas.height = 128;
      const ctx = canvas.getContext('2d');
      if (ctx) {
        const gradient = ctx.createRadialGradient(64, 64, 0, 64, 64, 64);
        gradient.addColorStop(0, 'rgba(255, 255, 255, 1)');       // Bright core
        gradient.addColorStop(0.15, 'rgba(180, 210, 175, 0.95)'); // Inner intense accent
        gradient.addColorStop(0.4, 'rgba(140, 168, 136, 0.55)');  // Outer glow
        gradient.addColorStop(0.7, 'rgba(140, 168, 136, 0.15)');  // Soft halo
        gradient.addColorStop(1, 'rgba(140, 168, 136, 0)');       // Transparent edge
        ctx.fillStyle = gradient;
        ctx.fillRect(0, 0, 128, 128);
      }
      return new THREE.CanvasTexture(canvas);
    };

    const glowTexture = createGlowTexture();

    // ── Generate 3D Nodes Data across Z-Depths ─────────────────────────────────
    interface NodeData {
      basePosition: THREE.Vector3;
      position: THREE.Vector3;
      velocity: THREE.Vector3;
      sineFreq: THREE.Vector3;
      sineAmp: THREE.Vector3;
      phase: THREE.Vector3;
      depthFactor: number; // 0.3 (far) to 1.2 (near)
      size: number;
    }

    const nodes: NodeData[] = [];
    const positions = new Float32Array(nodeCount * 3);
    const colors = new Float32Array(nodeCount * 3);
    const sizes = new Float32Array(nodeCount);

    const spreadX = isMobile ? 8 : 14;
    const spreadY = isMobile ? 6 : 9;
    const minZ = -5;
    const maxZ = 3;

    for (let i = 0; i < nodeCount; i++) {
      const z = minZ + Math.random() * (maxZ - minZ);
      // Normalized depth factor: 0 (far) to 1 (near)
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
        position: pos.clone(),
        velocity: vel,
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

      positions[i * 3] = pos.x;
      positions[i * 3 + 1] = pos.y;
      positions[i * 3 + 2] = pos.z;

      // Color intensity based on depth (far nodes dimmer, near nodes brighter)
      const r = 0.5 + depthNorm * 0.5;
      const g = 0.65 + depthNorm * 0.35;
      const b = 0.5 + depthNorm * 0.5;
      colors[i * 3] = r;
      colors[i * 3 + 1] = g;
      colors[i * 3 + 2] = b;

      sizes[i] = nodes[i].size;
    }

    // ── Points Object with Custom Shader Material for Depth Sizes ──────────────
    const pointsGeometry = new THREE.BufferGeometry();
    pointsGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    pointsGeometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));

    const pointsMaterial = new THREE.PointsMaterial({
      size: isMobile ? 0.45 : 0.6,
      map: glowTexture,
      vertexColors: true,
      transparent: true,
      opacity: 0.85,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
    });

    const pointCloud = new THREE.Points(pointsGeometry, pointsMaterial);
    scene.add(pointCloud);

    // ── Dynamic Distance-Faded Connecting Lines Object ────────────────────────
    const maxLineSegments = (nodeCount * (nodeCount - 1)) / 2;
    const linePositions = new Float32Array(maxLineSegments * 6);
    const lineColors = new Float32Array(maxLineSegments * 6);

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
      transparent: true,
      opacity: 0.7,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });

    const linesMesh = new THREE.LineSegments(lineGeometry, lineMaterial);
    scene.add(linesMesh);

    // ── Interactive Elastic Mouse Parallax State ──────────────────────────────
    const mouse = {
      x: 0,
      y: 0,
      targetX: 0,
      targetY: 0,
      velX: 0,
      velY: 0,
    };

    const handleMouseMove = (e: MouseEvent) => {
      const r = container.getBoundingClientRect();
      const relativeX = e.clientX - r.left;
      const relativeY = e.clientY - r.top;
      mouse.targetX = (relativeX / r.width - 0.5) * 2;
      mouse.targetY = -(relativeY / r.height - 0.5) * 2;
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });

    // ── Resize Handler ────────────────────────────────────────────────────────
    const handleResize = () => {
      if (!container) return;
      const r = container.getBoundingClientRect();
      const w = r.width || window.innerWidth;
      const h = r.height || 650;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };

    window.addEventListener('resize', handleResize);

    // ── Animation Loop ────────────────────────────────────────────────────────
    let animationFrameId: number;
    let clock = new THREE.Clock();

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      const elapsedTime = clock.getElapsedTime();

      // Elastic spring physics for mouse parallax
      const springK = 0.08;
      const damping = 0.82;
      const forceX = (mouse.targetX - mouse.x) * springK;
      const forceY = (mouse.targetY - mouse.y) * springK;

      mouse.velX = (mouse.velX + forceX) * damping;
      mouse.velY = (mouse.velY + forceY) * damping;
      mouse.x += mouse.velX;
      mouse.y += mouse.velY;

      // Camera parallax with smooth rotation
      camera.position.x = mouse.x * 0.75;
      camera.position.y = mouse.y * 0.55;
      camera.lookAt(0, 0, 0);

      // Update Node positions with Sine-wave organic floating motion & Parallax
      const posAttr = pointsGeometry.attributes.position as THREE.BufferAttribute;
      const posArray = posAttr.array as Float32Array;

      for (let i = 0; i < nodeCount; i++) {
        const node = nodes[i];

        // Organic multi-frequency sine wave floating
        const floatX =
          Math.sin(elapsedTime * node.sineFreq.x + node.phase.x) * node.sineAmp.x;
        const floatY =
          Math.cos(elapsedTime * node.sineFreq.y + node.phase.y) * node.sineAmp.y;
        const floatZ =
          Math.sin(elapsedTime * node.sineFreq.z + node.phase.z) * node.sineAmp.z;

        // Base velocity drift
        node.basePosition.add(node.velocity);

        // Boundary reflection/bounce
        if (Math.abs(node.basePosition.x) > spreadX * 0.55) node.velocity.x *= -1;
        if (Math.abs(node.basePosition.y) > spreadY * 0.55) node.velocity.y *= -1;
        if (node.basePosition.z < minZ - 1 || node.basePosition.z > maxZ + 1)
          node.velocity.z *= -1;

        // Combine base position, organic sine floating, and depth-dependent parallax offset
        const parallaxFactor = node.depthFactor * 0.45;
        node.position.x = node.basePosition.x + floatX + mouse.x * parallaxFactor;
        node.position.y = node.basePosition.y + floatY + mouse.y * parallaxFactor;
        node.position.z = node.basePosition.z + floatZ;

        posArray[i * 3] = node.position.x;
        posArray[i * 3 + 1] = node.position.y;
        posArray[i * 3 + 2] = node.position.z;
      }
      posAttr.needsUpdate = true;

      // Update Connecting Lines with Distance-Based Smooth Opacity Fade
      let vertexIndex = 0;
      const linePosAttr = lineGeometry.attributes.position as THREE.BufferAttribute;
      const linePosArray = linePosAttr.array as Float32Array;
      const lineColAttr = lineGeometry.attributes.color as THREE.BufferAttribute;
      const lineColArray = lineColAttr.array as Float32Array;

      for (let i = 0; i < nodeCount; i++) {
        for (let j = i + 1; j < nodeCount; j++) {
          const dist = nodes[i].position.distanceTo(nodes[j].position);

          if (dist < maxDistance) {
            // Distance fade factor: 1 when zero dist, 0 at maxDistance
            const fade = Math.pow(1 - dist / maxDistance, 1.5);
            // Combined depth brightness
            const avgDepth = (nodes[i].depthFactor + nodes[j].depthFactor) * 0.5;
            const lineBrightness = fade * avgDepth * 0.55;

            // Vertex 1
            linePosArray[vertexIndex] = nodes[i].position.x;
            linePosArray[vertexIndex + 1] = nodes[i].position.y;
            linePosArray[vertexIndex + 2] = nodes[i].position.z;
            lineColArray[vertexIndex] = baseLineColor.r * lineBrightness;
            lineColArray[vertexIndex + 1] = baseLineColor.g * lineBrightness;
            lineColArray[vertexIndex + 2] = baseLineColor.b * lineBrightness;

            // Vertex 2
            linePosArray[vertexIndex + 3] = nodes[j].position.x;
            linePosArray[vertexIndex + 4] = nodes[j].position.y;
            linePosArray[vertexIndex + 5] = nodes[j].position.z;
            lineColArray[vertexIndex + 3] = baseLineColor.r * lineBrightness;
            lineColArray[vertexIndex + 4] = baseLineColor.g * lineBrightness;
            lineColArray[vertexIndex + 5] = baseLineColor.b * lineBrightness;

            vertexIndex += 6;
          }
        }
      }

      lineGeometry.setDrawRange(0, vertexIndex / 3);
      linePosAttr.needsUpdate = true;
      lineColAttr.needsUpdate = true;

      renderer.render(scene, camera);
    };

    animate();

    // ── Cleanup ───────────────────────────────────────────────────────────────
    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);

      if (container && renderer.domElement) {
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
      {/* Soft radial ambient accent glow behind the central text */}
      <div className="absolute left-1/2 top-1/2 h-[550px] w-[750px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(ellipse_at_center,rgba(140,168,136,0.14)_0%,rgba(140,168,136,0.04)_45%,transparent_75%)] blur-2xl pointer-events-none" />

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

      {/* Vignette overlay for clear central text focus */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_30%,rgba(7,7,5,0.75)_100%)] pointer-events-none" />

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
