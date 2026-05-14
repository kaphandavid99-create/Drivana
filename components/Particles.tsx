"use client";

import { useEffect, useRef } from 'react';
import * as THREE from 'three';

interface ParticlesProps {
  className?: string;
}

export default function Particles({ className = "" }: ParticlesProps) {
  const mountRef = useRef<HTMLDivElement>(null);
  const sceneRef = useRef<THREE.Scene | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const frameRef = useRef<number | null>(null);

  useEffect(() => {
    if (!mountRef.current) return;

    const width = mountRef.current.clientWidth;
    const height = mountRef.current.clientHeight;

    // Scene setup
    const scene = new THREE.Scene();
    sceneRef.current = scene;

    // Camera setup
    const camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000);
    camera.position.z = 5;

    // Renderer setup
    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(window.devicePixelRatio);
    rendererRef.current = renderer;
    mountRef.current.appendChild(renderer.domElement);

    // Create particles
    const particlesGeometry = new THREE.BufferGeometry();
    const particlesCount = 200;
    const posArray = new Float32Array(particlesCount * 3);
    const velocities = new Float32Array(particlesCount * 3);
    const originalPositions = new Float32Array(particlesCount * 3);

    for (let i = 0; i < particlesCount * 3; i++) {
      const value = (Math.random() - 0.5) * 10;
      posArray[i] = value;
      originalPositions[i] = value;
      velocities[i] = (Math.random() - 0.5) * 0.02;
    }

    particlesGeometry.setAttribute('position', new THREE.BufferAttribute(posArray, 3));

    // Particle material
    const particlesMaterial = new THREE.PointsMaterial({
      size: 0.03,
      color: 0xffffff,
      transparent: true,
      opacity: 0.9,
      blending: THREE.AdditiveBlending,
    });

    // Particle mesh
    const particlesMesh = new THREE.Points(particlesGeometry, particlesMaterial);
    scene.add(particlesMesh);

    // Animation
    const clock = new THREE.Clock();

    const animate = () => {
      const elapsedTime = clock.getElapsedTime();
      
      // Rotate particles slowly
      particlesMesh.rotation.y = elapsedTime * 0.05;
      particlesMesh.rotation.x = elapsedTime * 0.02;

      // Dynamic particle movement
      const positions = particlesMesh.geometry.attributes.position.array as Float32Array;
      for (let i = 0; i < positions.length; i += 3) {
        // Wave motion
        const waveX = Math.sin(elapsedTime * 0.5 + i * 0.1) * 0.02;
        const waveY = Math.cos(elapsedTime * 0.3 + i * 0.1) * 0.02;
        const waveZ = Math.sin(elapsedTime * 0.4 + i * 0.1) * 0.02;
        
        // Orbital motion around original position
        const orbitRadius = 0.5;
        const orbitSpeed = elapsedTime * 0.2 + i * 0.01;
        const orbitX = Math.cos(orbitSpeed) * orbitRadius * 0.1;
        const orbitZ = Math.sin(orbitSpeed) * orbitRadius * 0.1;
        
        // Combine movements
        positions[i] = originalPositions[i] + waveX + orbitX;
        positions[i + 1] = originalPositions[i + 1] + waveY + Math.sin(elapsedTime + i) * 0.3;
        positions[i + 2] = originalPositions[i + 2] + waveZ + orbitZ;
        
        // Add some random drift
        positions[i] += Math.sin(elapsedTime * 0.1 + i) * 0.1;
        positions[i + 1] += Math.cos(elapsedTime * 0.1 + i) * 0.1;
        positions[i + 2] += Math.sin(elapsedTime * 0.1 + i) * 0.1;
      }
      particlesMesh.geometry.attributes.position.needsUpdate = true;

      renderer.render(scene, camera);
      frameRef.current = requestAnimationFrame(animate);
    };

    animate();

    // Handle resize
    const handleResize = () => {
      if (!mountRef.current) return;
      const newWidth = mountRef.current.clientWidth;
      const newHeight = mountRef.current.clientHeight;
      
      camera.aspect = newWidth / newHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(newWidth, newHeight);
    };

    window.addEventListener('resize', handleResize);

    // Cleanup
    return () => {
      window.removeEventListener('resize', handleResize);
      if (frameRef.current) {
        cancelAnimationFrame(frameRef.current);
      }
      if (mountRef.current && renderer.domElement) {
        mountRef.current.removeChild(renderer.domElement);
      }
      renderer.dispose();
      particlesGeometry.dispose();
      particlesMaterial.dispose();
    };
  }, []);

  return <div ref={mountRef} className={className} />;
}
