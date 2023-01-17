import React, { useMemo } from 'react'
import { useLoader } from '@react-three/fiber'
import { Center } from '@react-three/drei'
import { SVGLoader } from 'three-stdlib'

export default function Edit({ route, ...props }) {
  const data = useLoader(SVGLoader, 'http://localhost:3030/img/logo.svg')

  const shapes = useMemo(() => {
    return data.paths.flatMap((g, index) => {
      return g.toShapes(true).map((shape) => {
        return {
          shape,
          color: g.color,
          index,
        }
      })
    })
  }, [data])

  return (
    <Center>
      <group rotation={[0, 0, Math.PI / 2]}>
        {shapes.map((item) => (
          <Shape key={item.shape.uuid} {...item} />
        ))}
      </group>
    </Center>
  )
}

function Shape({ shape, color }) {
  return (
    <mesh position={[0, 0, 0]} scale={0.01}>
      <meshPhongMaterial attach='material' color={color} />
      <extrudeGeometry attach='geometry' args={[shape, { depth: 100 }]} />
    </mesh>
  )
}
