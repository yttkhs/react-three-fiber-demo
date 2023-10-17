import * as THREE from 'three';
import { extend, useFrame, useThree } from '@react-three/fiber';
import vertexShader from '@/shaders/torus/vertex.glsl';
import fragmentShader from '@/shaders/torus/fragment.glsl';
import { UnrealBloomPass } from 'three-stdlib';
import { Effects } from '@react-three/drei';
import { useEffect, useMemo, useRef } from 'react';
import { useControls } from 'leva';

extend({ UnrealBloomPass });

export default function Torus({ route, ...props }) {
  const { size, controls } = useThree();
  const aspect = useMemo(() => {
    return new THREE.Vector2(size.width, size.height);
  }, [size]);

  const torus = useRef<THREE.Mesh<THREE.TorusGeometry, THREE.ShaderMaterial>>(null);

  const { displace, spread, noise } = useControls({
    displace: { value: 2, min: 0, max: 2, step: 0.1 },
    spread: { value: 1.2, min: 0, max: 2, step: 0.1 },
    noise: { value: 16, min: 10, max: 25, step: 0.1 },
  });

  useFrame(({ clock }) => {
    const elapsedTime = clock.getElapsedTime();

    torus.current.material.uniforms.uTime.value = elapsedTime;
    torus.current.rotation.z = Math.sin(elapsedTime) / 4 + elapsedTime / 20 + 5;
  });

  return (
    <>
      <mesh ref={torus} {...props}>
        <torusGeometry args={[1, 0.3, 1000, 1000]} />
        <shaderMaterial
          vertexShader={vertexShader}
          fragmentShader={fragmentShader}
          side={THREE.DoubleSide}
          uniforms={{
            uTime: { value: 0 },
            uResolution: { value: new THREE.Vector2() },
            uDisplace: { value: displace },
            uSpread: { value: spread },
            uNoise: { value: noise },
          }}
          transparent
        />
      </mesh>
      <Effects disableGamma>
        {/* @ts-ignore */}
        <unrealBloomPass args={[aspect, 2.4, 0.0001, 0.01]} />
      </Effects>
    </>
  );
}
