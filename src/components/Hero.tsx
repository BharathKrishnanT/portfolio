
import { useEffect, useRef } from 'react';
import * as THREE from 'three';

export default function Hero() {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (!canvasRef.current || !containerRef.current) return;

        const canvas = canvasRef.current;
        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
        camera.position.z = 5;

        const renderer = new THREE.WebGLRenderer({ canvas: canvas, alpha: true });
        renderer.setSize(window.innerWidth, window.innerHeight);

        const geometry = new THREE.IcosahedronGeometry(2, 3);
        const material = new THREE.PointsMaterial({ 
            color: 0x4A5568, 
            size: 0.015, 
            transparent: true, 
            blending: THREE.AdditiveBlending, 
            depthWrite: false 
        });
        const points = new THREE.Points(geometry, material);
        scene.add(points);

        const onWindowResize = () => {
            camera.aspect = window.innerWidth / window.innerHeight;
            camera.updateProjectionMatrix();
            renderer.setSize(window.innerWidth, window.innerHeight);
        };

        const onMouseMove = (event: MouseEvent) => {
            const mouseX = (event.clientX / window.innerWidth) * 2 - 1;
            const mouseY = -(event.clientY / window.innerHeight) * 2 + 1;
            if (points) {
                points.rotation.x = mouseY * 0.05;
                points.rotation.y = mouseX * 0.05;
            }
        };

        window.addEventListener('resize', onWindowResize, false);
        // Attach mouse move to window or hero section
        window.addEventListener('mousemove', onMouseMove, false);

        let animationId: number;
        const animate = () => {
            animationId = requestAnimationFrame(animate);
            if (points) {
                points.rotation.x += 0.0001;
                points.rotation.y += 0.0002;
            }
            renderer.render(scene, camera);
        };

        animate();

        return () => {
            window.removeEventListener('resize', onWindowResize);
            window.removeEventListener('mousemove', onMouseMove);
            cancelAnimationFrame(animationId);
            renderer.dispose();
            geometry.dispose();
            material.dispose();
        };
    }, []);

    return (
        <canvas ref={canvasRef} className="absolute top-0 left-0 w-full h-full z-0 pointer-events-none" />
    );
}
