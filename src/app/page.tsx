'use client';

import { useState } from 'react';
import { Canvas3D } from '@/components/Canvas3D';
import { PerformanceTest } from '@/components/PerformanceTest';

export default function Home() {
  const [shapes, setShapes] = useState<Array<{
    id: string;
    type: 'box' | 'sphere' | 'cylinder' | 'cone';
    position: [number, number, number];
    color: string;
  }>>([]);

  const [selectedColor, setSelectedColor] = useState('#6366f1');

  const addShape = (type: 'box' | 'sphere' | 'cylinder' | 'cone') => {
    const randomPosition: [number, number, number] = [
      Math.random() * 4 - 2,
      Math.random() * 4 - 2,
      Math.random() * 4 - 2,
    ];

    setShapes([
      ...shapes,
      {
        id: Math.random().toString(36).substr(2, 9),
        type,
        position: randomPosition,
        color: selectedColor,
      },
    ]);
  };

  return (
    <main className="min-h-screen">
      <Canvas3D shapes={shapes} />
      
      <div className="controls-panel">
        <button
          className="shape-button"
          onClick={() => addShape('box')}
        >
          Add Cube
        </button>
        <button
          className="shape-button"
          onClick={() => addShape('sphere')}
        >
          Add Sphere
        </button>
        <button
          className="shape-button"
          onClick={() => addShape('cylinder')}
        >
          Add Cylinder
        </button>
        <button
          className="shape-button"
          onClick={() => addShape('cone')}
        >
          Add Cone
        </button>
        <input
          type="color"
          value={selectedColor}
          onChange={(e) => setSelectedColor(e.target.value)}
          className="color-picker"
        />
      </div>

      <PerformanceTest />
    </main>
  );
}
