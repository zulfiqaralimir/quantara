"use client";

import { useEffect, useRef } from "react";

interface Dot {
  x: number;
  y: number;
  vx: number;
  vy: number;
  r: number;
  phase: number;
}

export default function NetworkAnimation() {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d")!;

    /* ── size canvas to parent ── */
    const fit = () => {
      const p = canvas.parentElement!;
      canvas.width  = p.offsetWidth;
      canvas.height = p.offsetHeight;
    };
    fit();
    window.addEventListener("resize", fit);

    /* ── dots ── */
    const N    = 80;
    const LINK = 160; // max link distance px
    const dots: Dot[] = [];

    const spawn = () => {
      dots.length = 0;
      for (let i = 0; i < N; i++) {
        const angle = Math.random() * Math.PI * 2;
        const spd   = 0.8 + Math.random() * 1.4;       // px / frame
        dots.push({
          x:     Math.random() * canvas.width,
          y:     Math.random() * canvas.height,
          vx:    Math.cos(angle) * spd,
          vy:    Math.sin(angle) * spd,
          r:     1.5 + Math.random() * 2,
          phase: Math.random() * Math.PI * 2,
        });
      }
    };
    spawn();

    /* ── mouse ── */
    let mx = -9999, my = -9999;
    const mm = (e: MouseEvent) => {
      const r = canvas.getBoundingClientRect();
      mx = e.clientX - r.left;
      my = e.clientY - r.top;
    };
    const ml = () => { mx = -9999; my = -9999; };
    canvas.addEventListener("mousemove", mm);
    canvas.addEventListener("mouseleave", ml);

    /* ── loop ── */
    let raf = 0;
    let alive = true;
    let tick = 0;

    const loop = () => {
      if (!alive) return;
      tick++;

      const W = canvas.width;
      const H = canvas.height;

      /* clear */
      ctx.clearRect(0, 0, W, H);
      ctx.fillStyle = "#f0f4f8";
      ctx.fillRect(0, 0, W, H);

      /* move */
      for (const d of dots) {
        d.x += d.vx;
        d.y += d.vy;
        d.phase += 0.04;

        /* wrap */
        if (d.x < 0) d.x += W;
        if (d.x > W) d.x -= W;
        if (d.y < 0) d.y += H;
        if (d.y > H) d.y -= H;

        /* mouse repel */
        const ex = d.x - mx, ey = d.y - my;
        const ed = Math.sqrt(ex * ex + ey * ey);
        if (ed < 120 && ed > 0) {
          const f = (120 - ed) / 120 * 0.5;
          d.vx += (ex / ed) * f;
          d.vy += (ey / ed) * f;
        }

        /* speed cap */
        const spd = Math.sqrt(d.vx * d.vx + d.vy * d.vy);
        if (spd > 2.5) { d.vx = d.vx / spd * 2.5; d.vy = d.vy / spd * 2.5; }
        if (spd < 0.5) { d.vx = d.vx / spd * 0.5; d.vy = d.vy / spd * 0.5; }
      }

      /* links */
      for (let i = 0; i < dots.length; i++) {
        for (let j = i + 1; j < dots.length; j++) {
          const a = dots[i], b = dots[j];
          const dx = a.x - b.x, dy = a.y - b.y;
          const d  = Math.sqrt(dx * dx + dy * dy);
          if (d < LINK) {
            const alpha = (1 - d / LINK) * 0.7;
            ctx.beginPath();
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(b.x, b.y);
            ctx.strokeStyle = `rgba(11,31,51,${alpha * 0.5})`;
            ctx.lineWidth   = (1 - d / LINK) * 1.5;
            ctx.stroke();
          }
        }
      }

      /* mouse links */
      if (mx > 0) {
        for (const d of dots) {
          const dx = d.x - mx, dy = d.y - my;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 200) {
            const a = (1 - dist / 200) * 0.9;
            ctx.beginPath();
            ctx.moveTo(mx, my);
            ctx.lineTo(d.x, d.y);
            ctx.strokeStyle = `rgba(255,213,0,${a})`;
            ctx.lineWidth   = (1 - dist / 200) * 2;
            ctx.stroke();
          }
        }
        /* mouse dot */
        ctx.beginPath();
        ctx.arc(mx, my, 5, 0, Math.PI * 2);
        ctx.fillStyle = "rgba(255,213,0,0.9)";
        ctx.fill();
      }

      /* dots */
      for (const d of dots) {
        const glow = 0.55 + 0.45 * Math.sin(d.phase);

        /* glow ring */
        const g = ctx.createRadialGradient(d.x, d.y, 0, d.x, d.y, d.r * 7);
        g.addColorStop(0, `rgba(31,182,166,${0.25 * glow})`);
        g.addColorStop(1,  "rgba(31,182,166,0)");
        ctx.beginPath();
        ctx.arc(d.x, d.y, d.r * 7, 0, Math.PI * 2);
        ctx.fillStyle = g;
        ctx.fill();

        /* core */
        ctx.beginPath();
        ctx.arc(d.x, d.y, d.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(11,31,51,${0.85 + 0.15 * glow})`;
        ctx.fill();
      }

      raf = requestAnimationFrame(loop);
    };

    raf = requestAnimationFrame(loop);

    return () => {
      alive = false;
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", fit);
      canvas.removeEventListener("mousemove", mm);
      canvas.removeEventListener("mouseleave", ml);
    };
  }, []);

  return (
    <canvas
      ref={ref}
      style={{
        position: "absolute",
        inset: 0,
        width: "100%",
        height: "100%",
        display: "block",
      }}
    />
  );
}
