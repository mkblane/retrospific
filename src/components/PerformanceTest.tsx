'use client';

import { useEffect, useState } from 'react';
import * as THREE from 'three';

interface PerformanceMetrics {
  fps: number;
  webglSupport: boolean;
  webgl2Support: boolean;
  maxTextureSize: number;
  devicePixelRatio: number;
  memoryInfo?: {
    totalJSHeapSize: number;
    usedJSHeapSize: number;
    jsHeapSizeLimit: number;
  };
}

export const PerformanceTest = () => {
  const [metrics, setMetrics] = useState<PerformanceMetrics | null>(null);
  const [isRunning, setIsRunning] = useState(false);
  const [testProgress, setTestProgress] = useState(0);

  const runPerformanceTest = async () => {
    setIsRunning(true);
    setTestProgress(0);

    // Check WebGL support
    const canvas = document.createElement('canvas');
    const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
    const gl2 = canvas.getContext('webgl2');
    
    setTestProgress(20);

    // Test FPS with a simple Three.js scene
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, 1, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ canvas });
    const geometry = new THREE.BoxGeometry();
    const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
    const cube = new THREE.Mesh(geometry, material);
    
    scene.add(cube);
    camera.position.z = 5;
    
    let frameCount = 0;
    let startTime = performance.now();
    
    setTestProgress(40);

    // Run the test for 2 seconds
    const animate = () => {
      cube.rotation.x += 0.01;
      cube.rotation.y += 0.01;
      renderer.render(scene, camera);
      frameCount++;
      
      if (performance.now() - startTime < 2000) {
        requestAnimationFrame(animate);
      } else {
        const fps = Math.round((frameCount * 1000) / (performance.now() - startTime));
        setTestProgress(80);
        
        // Get memory info if available
        const memoryInfo = (performance as any).memory;
        
        setMetrics({
          fps,
          webglSupport: !!gl,
          webgl2Support: !!gl2,
          maxTextureSize: gl?.getParameter(gl.MAX_TEXTURE_SIZE) || 0,
          devicePixelRatio: window.devicePixelRatio,
          ...(memoryInfo && { memoryInfo }),
        });
        
        setTestProgress(100);
        setIsRunning(false);
      }
    };

    animate();
  };

  const getPerformanceGrade = () => {
    if (!metrics) return null;
    
    if (metrics.fps >= 55 && metrics.webgl2Support) {
      return { grade: 'Excellent', color: 'text-green-400' };
    } else if (metrics.fps >= 30 && metrics.webglSupport) {
      return { grade: 'Good', color: 'text-yellow-400' };
    } else {
      return { grade: 'Limited', color: 'text-red-400' };
    }
  };

  return (
    <div className="fixed bottom-24 right-4 p-4 bg-background/90 backdrop-blur-sm rounded-lg border border-white/10 w-80">
      <h2 className="text-lg font-bold mb-4">Hardware Compatibility</h2>
      
      {!isRunning && !metrics && (
        <button
          onClick={runPerformanceTest}
          className="w-full py-2 px-4 bg-indigo-600 hover:bg-indigo-700 rounded-lg transition-colors"
        >
          Run Performance Test
        </button>
      )}

      {isRunning && (
        <div className="space-y-2">
          <div className="h-2 bg-gray-700 rounded-full overflow-hidden">
            <div 
              className="h-full bg-indigo-600 transition-all duration-300"
              style={{ width: `${testProgress}%` }}
            />
          </div>
          <p className="text-sm text-center">Testing your hardware...</p>
        </div>
      )}

      {metrics && !isRunning && (
        <div className="space-y-3">
          <div className="flex justify-between items-center">
            <span>Performance Grade:</span>
            <span className={`font-bold ${getPerformanceGrade()?.color}`}>
              {getPerformanceGrade()?.grade}
            </span>
          </div>
          
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span>Frame Rate:</span>
              <span className="font-mono">{metrics.fps} FPS</span>
            </div>
            <div className="flex justify-between">
              <span>WebGL 2.0:</span>
              <span className={metrics.webgl2Support ? 'text-green-400' : 'text-red-400'}>
                {metrics.webgl2Support ? '✓' : '✗'}
              </span>
            </div>
            <div className="flex justify-between">
              <span>Display Scaling:</span>
              <span className="font-mono">{metrics.devicePixelRatio}x</span>
            </div>
          </div>

          <button
            onClick={runPerformanceTest}
            className="w-full py-1.5 px-3 bg-white/5 hover:bg-white/10 rounded-lg transition-colors text-sm"
          >
            Run Test Again
          </button>
        </div>
      )}
    </div>
  );
}; 