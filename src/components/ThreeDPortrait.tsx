"use client";

import { useEffect, useRef, useState } from "react";
import * as THREE from "three";

export default function ThreeDPortrait() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // 1. Scene, Camera, Renderer Setup
    const width = container.clientWidth;
    const height = container.clientHeight;

    const scene = new THREE.Scene();
    
    // Perspective camera with narrow FOV for a cinematic portrait look
    const camera = new THREE.PerspectiveCamera(40, width / height, 0.1, 100);
    camera.position.z = 12;

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(width, height);
    renderer.shadowMap.enabled = true;
    container.appendChild(renderer.domElement);

    // 2. Lighting Setup
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.4);
    scene.add(ambientLight);

    // Direct soft light from top-right
    const dirLight = new THREE.DirectionalLight(0xffffff, 0.8);
    dirLight.position.set(5, 5, 4);
    scene.add(dirLight);

    // Cyan spot light for edge lighting
    const cyanLight = new THREE.PointLight(0x00f0ff, 2.5, 15);
    cyanLight.position.set(-4, -2, 2);
    scene.add(cyanLight);

    // Purple spot light for opposing edge lighting
    const purpleLight = new THREE.PointLight(0xbd00ff, 2.5, 15);
    purpleLight.position.set(4, 3, 2);
    scene.add(purpleLight);

    // 3. Load Portrait Texture & Adjust Aspect Ratio
    const textureLoader = new THREE.TextureLoader();
    const texture = textureLoader.load("/thilagan_portrait.jpg", (tex) => {
      // Texture is loaded, apply cover-fit aspect ratio cropping
      const imgAspect = tex.image.width / tex.image.height;
      if (imgAspect > 1) {
        tex.repeat.set(1 / imgAspect, 1);
        tex.offset.set((1 - 1 / imgAspect) / 2, 0);
      } else {
        tex.repeat.set(1, imgAspect);
        tex.offset.set(0, (1 - imgAspect) / 2);
      }
      tex.needsUpdate = true;
      setLoading(false);
    });

    // 4. Portrait & Neon Ring Group
    const portraitGroup = new THREE.Group();

    // Circle Portrait Mesh
    const circleGeo = new THREE.CircleGeometry(2.2, 128);
    // Double-sided standard material so light acts on it cinematically
    const circleMat = new THREE.MeshStandardMaterial({
      map: texture,
      side: THREE.DoubleSide,
      roughness: 0.35,
      metalness: 0.15,
    });
    const circleMesh = new THREE.Mesh(circleGeo, circleMat);
    portraitGroup.add(circleMesh);

    // Outer Neon Ring
    const torusGeo = new THREE.TorusGeometry(2.25, 0.05, 16, 120);
    const torusMat = new THREE.MeshBasicMaterial({
      color: 0x00f0ff,
      transparent: true,
      opacity: 0.85,
    });
    const torusMesh = new THREE.Mesh(torusGeo, torusMat);
    portraitGroup.add(torusMesh);

    // Inner subtle secondary ring
    const innerTorusGeo = new THREE.TorusGeometry(2.18, 0.015, 8, 100);
    const innerTorusMat = new THREE.MeshBasicMaterial({
      color: 0xbd00ff,
      transparent: true,
      opacity: 0.5,
    });
    const innerTorusMesh = new THREE.Mesh(innerTorusGeo, innerTorusMat);
    portraitGroup.add(innerTorusMesh);

    scene.add(portraitGroup);

    // 5. Particle System Background
    const particleCount = 120;
    const particlesGeo = new THREE.BufferGeometry();
    const positions = new Float32Array(particleCount * 3);
    const particleSpeeds = new Float32Array(particleCount);
    const particleColors = new Float32Array(particleCount * 3);

    const cyanColor = new THREE.Color(0x00f0ff);
    const purpleColor = new THREE.Color(0xbd00ff);

    for (let i = 0; i < particleCount; i++) {
      // Spread coordinates behind portrait
      positions[i * 3] = (Math.random() - 0.5) * 12;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 12;
      positions[i * 3 + 2] = -2 - Math.random() * 5;

      particleSpeeds[i] = 0.005 + Math.random() * 0.015;

      // Interpolate colors between cyan and purple
      const mixRatio = Math.random();
      const mixedColor = new THREE.Color().lerpColors(cyanColor, purpleColor, mixRatio);
      particleColors[i * 3] = mixedColor.r;
      particleColors[i * 3 + 1] = mixedColor.g;
      particleColors[i * 3 + 2] = mixedColor.b;
    }

    particlesGeo.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    particlesGeo.setAttribute("color", new THREE.BufferAttribute(particleColors, 3));

    const particlesMat = new THREE.PointsMaterial({
      size: 0.05,
      vertexColors: true,
      transparent: true,
      opacity: 0.6,
      blending: THREE.AdditiveBlending,
    });

    const particleSystem = new THREE.Points(particlesGeo, particlesMat);
    scene.add(particleSystem);

    // 6. Interactive Mouse Parallax
    let targetMouseX = 0;
    let targetMouseY = 0;
    let currentMouseX = 0;
    let currentMouseY = 0;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;
      // Convert to normalized ratio and scale
      targetMouseX = (x / (rect.width / 2)) * 0.35;
      targetMouseY = (y / (rect.height / 2)) * 0.35;
    };

    window.addEventListener("mousemove", handleMouseMove);

    // 7. Handle Window Resize
    const handleResize = () => {
      if (!container) return;
      const w = container.clientWidth;
      const h = container.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };

    window.addEventListener("resize", handleResize);

    // 8. Animation Loop
    const clock = new THREE.Clock();

    let animationFrameId: number;

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);

      const time = clock.getElapsedTime();

      // Soft Floating Oscillation (X and Y axes)
      portraitGroup.position.y = Math.sin(time * 1.2) * 0.12;
      portraitGroup.position.x = Math.cos(time * 0.8) * 0.05;

      // Dynamic Shifting Color for the outer Neon Ring
      const colorCyanVal = new THREE.Color(0x00f0ff);
      const colorPurpleVal = new THREE.Color(0xbd00ff);
      // Oscillate ring color between cyan and purple
      const factor = (Math.sin(time * 1.5) + 1) / 2;
      torusMat.color.lerpColors(colorCyanVal, colorPurpleVal, factor);

      // Smooth mouse rotation interpolations (easing)
      currentMouseX += (targetMouseX - currentMouseX) * 0.08;
      currentMouseY += (targetMouseY - currentMouseY) * 0.08;

      // Apply base floating rotation + mouse parallax rotation
      portraitGroup.rotation.y = Math.sin(time * 0.4) * 0.08 + currentMouseX;
      portraitGroup.rotation.x = Math.cos(time * 0.3) * 0.04 + currentMouseY;

      // Animate background particles (floating upwards and rotating scene slightly)
      particleSystem.rotation.y = time * 0.02;
      
      const posArr = particlesGeo.attributes.position.array as Float32Array;
      for (let i = 0; i < particleCount; i++) {
        posArr[i * 3 + 1] += particleSpeeds[i]; // Move upwards
        if (posArr[i * 3 + 1] > 6) {
          posArr[i * 3 + 1] = -6; // Reset position to bottom
        }
      }
      particlesGeo.attributes.position.needsUpdate = true;

      // Render Scene
      renderer.render(scene, camera);
    };

    animate();

    // 9. Cleanup Routine
    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("resize", handleResize);
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
      // Dispose materials & geometries
      circleGeo.dispose();
      circleMat.dispose();
      torusGeo.dispose();
      torusMat.dispose();
      innerTorusGeo.dispose();
      innerTorusMat.dispose();
      particlesGeo.dispose();
      particlesMat.dispose();
      texture.dispose();
    };
  }, []);

  return (
    <div className="relative w-full h-full min-h-[350px] md:min-h-[450px] flex items-center justify-center">
      {/* Decorative Blur Background Blobs */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-cyan-500/10 rounded-full blur-[80px] -z-10 animate-pulse pointer-events-none" />
      <div className="absolute top-1/3 left-1/3 -translate-x-1/2 -translate-y-1/2 w-72 h-72 bg-purple-500/10 rounded-full blur-[100px] -z-10 pointer-events-none" style={{ animationDelay: "2s" }} />

      {/* Loading state indicator */}
      {loading && (
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-12 h-12 rounded-full border-2 border-purple-500/20 border-t-purple-500 animate-spin" />
        </div>
      )}

      {/* Canvas Mount Container */}
      <div
        ref={containerRef}
        className="w-full h-full relative transition-opacity duration-700"
        style={{ opacity: loading ? 0 : 1 }}
      />
    </div>
  );
}
