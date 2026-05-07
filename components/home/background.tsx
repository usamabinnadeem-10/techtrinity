"use client";

import { useEffect, useRef } from "react";

type Orb = {
  x: number;
  y: number;
  r: number;
  vx: number;
  vy: number;
  rgb: string;
};

const ORB_SEEDS: Array<{
  rx: number;
  ry: number;
  r: number;
  vx: number;
  vy: number;
  rgb: string;
}> = [
  { rx: 0.15, ry: 0.25, r: 420, vx: 0.18, vy: 0.12, rgb: "184,255,87" },
  { rx: 0.8, ry: 0.6, r: 500, vx: -0.14, vy: 0.16, rgb: "100,60,220" },
  { rx: 0.5, ry: 0.9, r: 380, vx: 0.1, vy: -0.18, rgb: "60,30,160" },
];

export function AmbientBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    let width = window.innerWidth;
    let height = window.innerHeight;

    const orbs: Orb[] = ORB_SEEDS.map((seed) => ({
      x: width * seed.rx,
      y: height * seed.ry,
      r: seed.r,
      vx: seed.vx,
      vy: seed.vy,
      rgb: seed.rgb,
    }));

    const resize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width;
      canvas.height = height;
    };
    resize();

    const drawFrame = () => {
      ctx.clearRect(0, 0, width, height);
      orbs.forEach((orb) => {
        const gradient = ctx.createRadialGradient(
          orb.x,
          orb.y,
          0,
          orb.x,
          orb.y,
          orb.r,
        );
        gradient.addColorStop(0, `rgba(${orb.rgb},0.075)`);
        gradient.addColorStop(1, "rgba(0,0,0,0)");
        ctx.beginPath();
        ctx.arc(orb.x, orb.y, orb.r, 0, Math.PI * 2);
        ctx.fillStyle = gradient;
        ctx.fill();
      });
    };

    if (reduceMotion) {
      drawFrame();
      window.addEventListener("resize", () => {
        resize();
        drawFrame();
      });
      return;
    }

    let frameId = 0;
    const tick = () => {
      orbs.forEach((orb) => {
        orb.x += orb.vx;
        orb.y += orb.vy;
        if (orb.x < -orb.r) orb.x = width + orb.r;
        if (orb.x > width + orb.r) orb.x = -orb.r;
        if (orb.y < -orb.r) orb.y = height + orb.r;
        if (orb.y > height + orb.r) orb.y = -orb.r;
      });
      drawFrame();
      frameId = requestAnimationFrame(tick);
    };
    frameId = requestAnimationFrame(tick);

    const onResize = () => resize();
    window.addEventListener("resize", onResize, { passive: true });

    return () => {
      cancelAnimationFrame(frameId);
      window.removeEventListener("resize", onResize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 -z-10 h-full w-full"
    />
  );
}
