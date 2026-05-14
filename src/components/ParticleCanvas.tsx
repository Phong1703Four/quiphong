"use client";
import { useEffect, useRef } from "react";

export default function ParticleCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d")!;
    let animId: number;
    let w = (canvas.width = window.innerWidth);
    let h = (canvas.height = window.innerHeight);

    const colors = ["rgba(79,70,229,", "rgba(6,182,212,", "rgba(139,92,246,", "rgba(245,158,11,"];

    class P {
      x: number; y: number; size: number; speedY: number; speedX: number;
      opacity: number; color: string;
      constructor() {
        this.x = Math.random() * w;
        this.y = Math.random() * h + h;
        this.size = Math.random() * 2.5 + 0.5;
        this.speedY = -(Math.random() * 0.6 + 0.15);
        this.speedX = (Math.random() - 0.5) * 0.3;
        this.opacity = Math.random() * 0.5 + 0.1;
        this.color = colors[Math.floor(Math.random() * colors.length)];
      }
      update() {
        const dx = mouseRef.current.x - this.x;
        const dy = mouseRef.current.y - this.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 100) {
          const force = (100 - dist) / 100;
          this.speedX -= (dx / dist) * force * 0.3;
          this.speedY -= (dy / dist) * force * 0.3;
        } else {
          this.speedX *= 0.98;
          this.speedY += (-(Math.random() * 0.6 + 0.15) - this.speedY) * 0.02;
        }
        this.y += this.speedY;
        this.x += this.speedX;
        if (this.y < -10 || this.x < -10 || this.x > w + 10) {
          this.x = Math.random() * w;
          this.y = h + 10;
        }
      }
      draw() {
        ctx.fillStyle = `${this.color}${this.opacity})`;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
      }
    }

    const particles: P[] = [];
    for (let i = 0; i < Math.min(80, Math.floor(w / 15)); i++) {
      const p = new P();
      p.y = Math.random() * h;
      particles.push(p);
    }

    function animate() {
      ctx.clearRect(0, 0, w, h);
      particles.forEach((p) => { p.update(); p.draw(); });
      animId = requestAnimationFrame(animate);
    }
    animate();

    const onResize = () => { w = canvas.width = window.innerWidth; h = canvas.height = window.innerHeight; };
    const onMouse = (e: MouseEvent) => { mouseRef.current = { x: e.clientX, y: e.clientY }; };
    window.addEventListener("resize", onResize);
    window.addEventListener("mousemove", onMouse);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", onResize);
      window.removeEventListener("mousemove", onMouse);
    };
  }, []);

  return <canvas ref={canvasRef} className="fixed inset-0 z-0 pointer-events-none" />;
}
