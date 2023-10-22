import * as THREE from 'three';
import { extend, useFrame, useThree } from '@react-three/fiber';
import vertexShader from '@/shaders/ball/vertex.glsl';
import fragmentShader from '@/shaders/ball/fragment.glsl';
import { UnrealBloomPass } from 'three-stdlib';
import { Effects } from '@react-three/drei';
import { useEffect, useMemo, useRef } from 'react';
import { useControls } from 'leva';

export default function Ball({ route, ...props }) {
  const ref = useRef<THREE.Mesh<THREE.PlaneGeometry, THREE.ShaderMaterial>>(null);

  useFrame(({ clock }) => {
    ref.current.material.uniforms.uTime.value = clock.elapsedTime;
  });

  return (
    <mesh {...props} ref={ref}>
      <planeGeometry args={[2, 2]} />
      <shaderMaterial
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        side={THREE.DoubleSide}
        uniforms={{
          uTime: { value: 0 },
        }}
      />
    </mesh>
  );
}
