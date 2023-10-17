import React, { useMemo, useRef } from 'react';
import { useFrame, useLoader } from '@react-three/fiber';
import { Center } from '@react-three/drei';
import { SVGLoader } from 'three-stdlib';
import { Group } from 'three';

export default function Edit({ route, ...props }) {
  const group = useRef<Group>(null);
  const data = useLoader(SVGLoader, 'http://localhost:3030/img/logo.svg');

  const shapes = useMemo(() => {
    return data.paths.flatMap((g, index) => {
      return g.toShapes(true).map((shape) => {
        return {
          shape,
          color: g.color,
          index,
        };
      });
    });
  }, [data]);

  useFrame(({ clock }, delta, frame) => {
    const t = clock.getElapsedTime();

    // group.current.rotation.y = Math.sin(t) * (Math.PI / 8)
    // group.current.rotation.x = Math.cos(t) * (Math.PI / 8)
    group.current.rotation.z -= delta / 4;
  });

  return (
    <Center ref={group}>
      <group rotation={[0, 0, Math.PI / 2]}>
        {shapes.map((item) => (
          <Shape key={item.shape.uuid} {...item} />
        ))}
      </group>
    </Center>
  );
}

function Shape({ shape, color }) {
  return (
    <mesh position={[0, 0, 0]} scale={0.01}>
      <meshStandardMaterial attach='material' color={color} roughness={0.5} vertexColors={true} />
      <extrudeGeometry attach='geometry' args={[shape, { depth: 100 }]} />
    </mesh>
  );
}
