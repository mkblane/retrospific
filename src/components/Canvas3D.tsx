'use client';

import { Canvas } from '@react-three/fiber';
import { OrbitControls, PerspectiveCamera } from '@react-three/drei';
import { Suspense } from 'react';
import { Shape } from './Shape';

interface Canvas3DProps {
  shapes: Array<{
    id: string;
    type: 'box' | 'sphere' | 'cylinder' | 'cone';
    position: [number, number, number];
    color: string;
  }>;
}

export const Canvas3D = ({ shapes }: Canvas3DProps) => {
  return (
    <div className="canvas-container">
      <Canvas>
        <Suspense fallback={null}>
          <PerspectiveCamera makeDefault position={[5, 5, 5]} />
          <OrbitControls enableDamping />
          <ambientLight intensity={0.5} />
          <directionalLight position={[10, 10, 5]} intensity={1} />
          <gridHelper args={[20, 20]} />
          <axesHelper args={[5]} />
          {shapes.map((shape) => (
            <Shape
              key={shape.id}
              position={shape.position}
              color={shape.color}
              type={shape.type}
            />
          ))}
        </Suspense>
      </Canvas>
    </div>
  );
}; 