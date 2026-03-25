"use client";

import { useEffect, useRef } from "react";

type Vec2 = { x: number; y: number };

export default function GoldenRibbon() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const rafRef    = useRef<number>(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const dpr = window.devicePixelRatio || 1;

    const resize = () => {
      const p = canvas.parentElement;
      if (!p || p.clientWidth === 0 || p.clientHeight === 0) return;
      canvas.width  = p.clientWidth  * dpr;
      canvas.height = p.clientHeight * dpr;
    };
    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(canvas.parentElement!);

    let t     = 0;
    let alive = true;

    const draw = () => {
      if (!alive) return;

      const W = canvas.width;
      const H = canvas.height;

      if (W === 0 || H === 0) {
        resize();
        rafRef.current = requestAnimationFrame(draw);
        return;
      }

      ctx.clearRect(0, 0, W, H);

      // ── Traveling wave ─────────────────────────────────────────────
      // sin(x·k − t·speed) scrolls the wave from left → right as t grows.
      // Two overlapping waves give organic KKR billow shape.
      t += 0.018;

      const STEPS = 180;

      // Spine: ribbon centre-line using a traveling wave
      const spine: Vec2[] = [];
      for (let i = 0; i <= STEPS; i++) {
        const frac = i / STEPS;
        const x    = (frac - 0.02) * W * 1.04; // slightly over-bleed edges

        const y =
          H * 0.50
          + Math.sin(frac * Math.PI * 2.8 - t * 1.6)        * H * 0.155
          + Math.sin(frac * Math.PI * 1.3 - t * 1.0 + 1.2)  * H * 0.075;

        spine.push({ x, y });
      }

      // ── Normals & per-segment widths ───────────────────────────────
      type Seg = Vec2 & { nx: number; ny: number; hw: number; frac: number };
      const segs: Seg[] = [];

      for (let i = 0; i <= STEPS; i++) {
        const prev = spine[Math.max(0, i - 1)];
        const next = spine[Math.min(STEPS, i + 1)];
        const tx   = next.x - prev.x;
        const ty   = next.y - prev.y;
        const len  = Math.sqrt(tx * tx + ty * ty) || 1;
        const nx   = -ty / len;
        const ny   =  tx / len;

        const frac = i / STEPS;

        // Twist point at ~38% — ribbon pinches to near zero
        // Wide billows on either side (15% and 70%)
        const billow1 = Math.exp(-((frac - 0.15) ** 2) / 0.018) * H * 0.20;
        const billow2 = Math.exp(-((frac - 0.70) ** 2) / 0.032) * H * 0.25;
        const pinch   = Math.exp(-((frac - 0.38) ** 2) / 0.008) * H * 0.24;
        const breath  = Math.sin(frac * Math.PI * 4 - t * 1.2) * H * 0.018;

        const hw = Math.max(H * 0.018, H * 0.065 + billow1 + billow2 - pinch + breath);

        segs.push({ x: spine[i].x, y: spine[i].y, nx, ny, hw, frac });
      }

      // Edge fade (left 4%, right 4%)
      const ea = (frac: number) =>
        Math.min(frac / 0.04, 1) * Math.min((1 - frac) / 0.04, 1);

      // ── Colors ────────────────────────────────────────────────────
      const SHADOW   = { r: 150, g:  90, b:   0 };
      const YELLOW   = { r: 255, g: 213, b:   0 };
      const SPECULAR = { r: 255, g: 255, b: 215 };

      // ── Shading layers (top → bottom of ribbon cross-section) ─────
      const LAYERS = 14;

      for (let layer = 0; layer < LAYERS; layer++) {
        const lf0 = layer       / (LAYERS - 1);
        const lf1 = (layer + 1) / (LAYERS - 1);

        ctx.beginPath();
        for (let i = 0; i <= STEPS; i++) {
          const s   = segs[i];
          const off = lf0 * 2 - 1;
          const px  = s.x + s.nx * s.hw * off;
          const py  = s.y + s.ny * s.hw * off;
          if (i === 0) ctx.moveTo(px, py);
          else         ctx.lineTo(px, py);
        }
        for (let i = STEPS; i >= 0; i--) {
          const s   = segs[i];
          const off = lf1 * 2 - 1;
          ctx.lineTo(s.x + s.nx * s.hw * off, s.y + s.ny * s.hw * off);
        }
        ctx.closePath();

        // Light from upper-left: top edge brighter
        const topness = 1 - lf0;
        const shimmer = Math.sin(t * 1.6 + lf0 * Math.PI * 2.5) * 0.09;
        const bright  = Math.max(0, Math.min(1, topness * 0.85 + shimmer + 0.08));

        let r: number, g: number, b: number;
        if (bright > 0.70) {
          const bf = (bright - 0.70) / 0.30;
          r = Math.round(YELLOW.r   + (SPECULAR.r - YELLOW.r)   * bf);
          g = Math.round(YELLOW.g   + (SPECULAR.g - YELLOW.g)   * bf);
          b = Math.round(YELLOW.b   + (SPECULAR.b - YELLOW.b)   * bf);
        } else {
          const bf = bright / 0.70;
          r = Math.round(SHADOW.r + (YELLOW.r - SHADOW.r) * bf);
          g = Math.round(SHADOW.g + (YELLOW.g - SHADOW.g) * bf);
          b = Math.round(SHADOW.b + (YELLOW.b - SHADOW.b) * bf);
        }

        const avgEA = segs.reduce((acc, s) => acc + ea(s.frac), 0) / (STEPS + 1);
        ctx.fillStyle = `rgba(${r},${g},${b},${avgEA * 0.97})`;
        ctx.fill();
      }

      // ── Fiber strand lines ─────────────────────────────────────────
      // These scroll with the wave, reinforcing the flow illusion
      const FIBERS = 72;

      for (let f = 0; f < FIBERS; f++) {
        const ff   = f / (FIBERS - 1);
        const foff = ff * 2 - 1; // −1 (top edge) … +1 (bottom edge)

        ctx.beginPath();
        let penDown = false;

        for (let i = 0; i <= STEPS; i++) {
          const s     = segs[i];
          const alpha = ea(s.frac);
          if (alpha < 0.02) { penDown = false; continue; }

          // Fan-out at twist + entry spray
          const twistFan = Math.exp(-((s.frac - 0.38) ** 2) / 0.014) * 0.40 * foff;
          const entryFan = Math.max(0, 1 - s.frac / 0.10) * 0.30 * foff;

          // Wobble scrolls with wave (uses same phase as spine wave)
          const wobble =
            Math.sin(s.frac * Math.PI * 5 - t * 1.6 + ff * 2.5) * 0.030 +
            Math.sin(s.frac * Math.PI * 9 - t * 1.0 + ff * 1.2) * 0.012;

          const adjOff = foff + wobble + twistFan + entryFan;
          const px     = s.x + s.nx * s.hw * adjOff;
          const py     = s.y + s.ny * s.hw * adjOff;

          if (!penDown) { ctx.moveTo(px, py); penDown = true; }
          else           ctx.lineTo(px, py);
        }

        const edgeness  = Math.abs(foff);
        const fiberAlpha = Math.max(0.07, 0.32 - edgeness * 0.16);
        const lightness  = 1 - foff * 0.30;

        ctx.strokeStyle = `rgba(255,${Math.round(215 * lightness)},${Math.round(15 * lightness)},${fiberAlpha})`;
        ctx.lineWidth   = 0.55 * dpr;
        ctx.stroke();
      }

      // ── Specular streak (scrolls with wave) ───────────────────────
      ctx.beginPath();
      let specDown = false;
      for (let i = 0; i <= STEPS; i++) {
        const s = segs[i];
        if (ea(s.frac) < 0.02) { specDown = false; continue; }
        const skOff = -0.30 + Math.sin(s.frac * Math.PI * 2 - t * 1.6 + 0.5) * 0.14;
        const px    = s.x + s.nx * s.hw * skOff;
        const py    = s.y + s.ny * s.hw * skOff;
        if (!specDown) { ctx.moveTo(px, py); specDown = true; }
        else            ctx.lineTo(px, py);
      }
      ctx.strokeStyle = `rgba(255,255,220,${0.50 * (0.5 + 0.5 * Math.sin(t * 0.8))})`;
      ctx.lineWidth   = 2.5 * dpr;
      ctx.stroke();

      rafRef.current = requestAnimationFrame(draw);
    };

    rafRef.current = requestAnimationFrame(draw);

    return () => {
      alive = false;
      cancelAnimationFrame(rafRef.current);
      ro.disconnect();
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: "absolute",
        top: 0, left: 0,
        width: "100%", height: "100%",
        display: "block",
      }}
      aria-hidden="true"
    />
  );
}
