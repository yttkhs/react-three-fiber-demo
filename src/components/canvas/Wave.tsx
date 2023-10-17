import { useMemo, useState } from 'react';
import { useRouter } from 'next/router';
import { useCursor } from '@react-three/drei';
import * as THREE from 'three';
import vertexShader from '@/shaders/wave/vertex.glsl';
import fragmentShader from '@/shaders/wave/fragment.glsl';

export default function Wave({ route, ...props }) {
  const router = useRouter();
  const [hovered, hover] = useState(false);
  useCursor(hovered);

  const geometry = new THREE.PlaneGeometry(2, 2, 32, 32);

  const randoms = useMemo(() => {
    const count = geometry.attributes.position.count;
    const randoms = new Float32Array(count);

    for (let i = 0; i < count; i++) {
      randoms[i] = Math.random();
    }

    return randoms;
  }, [geometry.attributes.position.count]);

  geometry.setAttribute('aRandom', new THREE.BufferAttribute(randoms, 1));

  return (
    <mesh
      onClick={() => router.push(route)}
      onPointerOver={() => hover(true)}
      onPointerOut={() => hover(false)}
      {...props}>
      <bufferGeometry attach='geometry' {...geometry} />
      <rawShaderMaterial
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        side={THREE.DoubleSide}
        transparent
      />
    </mesh>
  );
}
