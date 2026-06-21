import { useRef, useMemo } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { DoubleSide, PlaneGeometry } from 'three';

function pseudoRandom(seed) {
  const value = Math.sin(seed * 12.9898 + 78.233) * 43758.5453;
  return value - Math.floor(value);
}

function getQualityProfile() {
  if (typeof window === 'undefined') {
    return {
      isReduced: false,
      antialias: true,
      dpr: [1, 1.5],
      beamSegments: 32,
      gridSegments: 30,
      particlesPrimary: 320,
      particlesSecondary: 110,
      particleSizePrimary: 0.14,
      particleSizeSecondary: 0.26,
    };
  }

  const isMobile = window.matchMedia('(max-width: 768px)').matches;
  const isCoarsePointer = window.matchMedia('(pointer: coarse)').matches;
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const lowConcurrency = typeof navigator !== 'undefined' && navigator.hardwareConcurrency && navigator.hardwareConcurrency <= 6;
  const lowMemory = typeof navigator !== 'undefined' && 'deviceMemory' in navigator && navigator.deviceMemory <= 4;
  const isConstrained = isMobile || isCoarsePointer || lowConcurrency || lowMemory;

  if (prefersReducedMotion) {
    return {
      isReduced: true,
      antialias: false,
      dpr: [1, 1],
      beamSegments: 12,
      gridSegments: 10,
      particlesPrimary: 90,
      particlesSecondary: 45,
      particleSizePrimary: 0.16,
      particleSizeSecondary: 0.22,
    };
  }

  if (isConstrained) {
    return {
      isReduced: false,
      antialias: false,
      dpr: [1, 1.25],
      beamSegments: 18,
      gridSegments: 16,
      particlesPrimary: 200,
      particlesSecondary: 80,
      particleSizePrimary: 0.14,
      particleSizeSecondary: 0.24,
    };
  }

  return {
    isReduced: false,
    antialias: true,
    dpr: [1, 1.5],
    beamSegments: 32,
    gridSegments: 30,
    particlesPrimary: 320,
    particlesSecondary: 110,
    particleSizePrimary: 0.14,
    particleSizeSecondary: 0.26,
  };
}

function AuroraBeams({ segments = 32 }) {
  const meshRef = useRef();
  const materialRef = useRef();
  const { mouse } = useThree();

  const geometry = useMemo(() => {
    const geo = new PlaneGeometry(120, 60, segments, segments);
    const pos = geo.attributes.position;
    for (let i = 0; i < pos.count; i++) {
      pos.setZ(i, (pseudoRandom(i + 1) - 0.5) * 4);
    }
    return geo;
  }, [segments]);

  useFrame(({ clock }) => {
    if (materialRef.current) {
      materialRef.current.uniforms.uTime.value = clock.getElapsedTime();
    }
    if (meshRef.current) {
      meshRef.current.rotation.y += (mouse.x * 0.05 - meshRef.current.rotation.y) * 0.02;
    }
  });

  const shader = useMemo(() => ({
    uniforms: { uTime: { value: 0 } },
    vertexShader: `
      uniform float uTime;
      varying vec2 vUv;
      void main() {
        vUv = uv;
        vec3 pos = position;
        pos.z += sin(pos.x * 0.05 + uTime * 0.3) * 3.0 + cos(pos.y * 0.08 + uTime * 0.2) * 2.0;
        gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
      }
    `,
    fragmentShader: `
      uniform float uTime;
      varying vec2 vUv;
      void main() {
        float r = sin(vUv.x * 3.14 + uTime * 0.5) * 0.5 + 0.5;
        float g = sin(vUv.y * 3.14 + uTime * 0.3 + 1.0) * 0.5 + 0.5;
        float alpha = r * g * 0.12;
        gl_FragColor = vec4(0.72, 0.99, 0.29, alpha);
      }
    `,
    transparent: true,
    side: DoubleSide,
    depthWrite: false,
  }), []);

  return (
    <mesh ref={meshRef} position={[0, 0, -20]} rotation={[0.3, 0, 0]}>
      <primitive object={geometry} />
      <shaderMaterial ref={materialRef} attach="material" {...shader} />
    </mesh>
  );
}

function AnimatedGrid({ segments = 30 }) {
  const meshRef = useRef();
  const { mouse } = useThree();

  useFrame(({ clock }) => {
    if (meshRef.current) {
      const t = clock.getElapsedTime();
      meshRef.current.rotation.z = t * 0.1;
      meshRef.current.position.y = Math.sin(t * 0.5) * 0.5;
      meshRef.current.rotation.y += (mouse.x * 0.05 - meshRef.current.rotation.y) * 0.05;
      meshRef.current.rotation.x = Math.PI / 2.5 + mouse.y * 0.02;
    }
  });
  return (
    <mesh ref={meshRef} rotation={[Math.PI / 2.5, 0, 0]}>
      <planeGeometry args={[60, 60, segments, segments]} />
      <meshBasicMaterial color="#b8fd4b" wireframe opacity={0.3} transparent />
    </mesh>
  );
}

function AnimatedParticles({ count = 400, size = 0.15, slow = false }) {
  const pointsRef = useRef();
  const { mouse } = useThree();
  
  const positions = useMemo(() => {
    const arr = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      arr[i * 3] = (pseudoRandom(i * 3 + 1) - 0.5) * 60;
      arr[i * 3 + 1] = (pseudoRandom(i * 3 + 2) - 0.5) * 60;
      arr[i * 3 + 2] = (pseudoRandom(i * 3 + 3) - 0.5) * 30;
    }
    return arr;
  }, [count]);

  const origins = useMemo(() => positions.slice(), [positions]);
  const speed = slow ? 0.2 : 0.5;
  useFrame(({ clock, mouse }) => {
    if (!pointsRef.current) return;
    const t = clock.getElapsedTime() * speed;
    const pos = pointsRef.current.geometry.attributes.position;
    const buffer = pos.array;
    for (let i = 0; i < count; i++) {
      buffer[i * 3] = origins[i * 3] + Math.sin(t + i) * 0.1;
      buffer[i * 3 + 1] = origins[i * 3 + 1] + Math.cos(t * 0.8 + i) * 0.1;
      buffer[i * 3 + 2] = origins[i * 3 + 2] + Math.sin(t * 0.6 + i * 0.5) * 0.1;
    }
    pos.needsUpdate = true;
    
    // Smoothly drift particles based on mouse
    pointsRef.current.rotation.y += (mouse.x * (slow ? 0.05 : 0.1) - pointsRef.current.rotation.y) * 0.02;
    pointsRef.current.rotation.x += (mouse.y * (slow ? 0.02 : 0.05) - pointsRef.current.rotation.x) * 0.02;
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial color="#b8fd4b" size={size} opacity={slow ? 0.3 : 0.6} transparent />
    </points>
  );
}

function MouseLight() {
  const lightRef = useRef();
  const { mouse, viewport } = useThree();
  
  useFrame(() => {
    if (lightRef.current) {
      const x = (mouse.x * viewport.width) / 2;
      const y = (mouse.y * viewport.height) / 2;
      lightRef.current.position.x += (x - lightRef.current.position.x) * 0.05;
      lightRef.current.position.y += (y - lightRef.current.position.y) * 0.05;
    }
  });
  
  return <pointLight ref={lightRef} color="#b8fd4b" intensity={2} distance={20} position={[0, 0, 5]} />;
}

export function HeroCanvas({ isActive = true }) {
  const quality = useMemo(() => getQualityProfile(), []);

  if (quality.isReduced) {
    return null;
  }

  return (
    <Canvas
      dpr={quality.dpr}
      frameloop={isActive ? 'always' : 'never'}
      camera={{ position: [0, 0, 50], fov: 75 }}
      style={{ background: 'transparent' }}
      gl={{ alpha: true, antialias: quality.antialias, powerPreference: 'high-performance' }}
    >
      <fog attach="fog" args={['#0e0e0e', 40, 120]} />
      <ambientLight intensity={0.3} />
      <pointLight position={[0, 10, 20]} color="#b8fd4b" intensity={1.5} />
      <MouseLight />
      <AuroraBeams segments={quality.beamSegments} />
      <AnimatedGrid segments={quality.gridSegments} />
      <AnimatedParticles count={quality.particlesPrimary} size={quality.particleSizePrimary} slow={false} />
      <AnimatedParticles count={quality.particlesSecondary} size={quality.particleSizeSecondary} slow={true} />
    </Canvas>
  );
}
