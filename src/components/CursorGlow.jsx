import { useEffect, useRef } from "react";

export default function CursorGlow() {
  const trailRef = useRef([]);
  const frameRef = useRef(null);
  const canvasRef = useRef(null);
  const mouseRef = useRef({ x: -200, y: -200 });

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    const onMove = (e) => {
      mouseRef.current = { x: e.clientX, y: e.clientY };
      trailRef.current.push({ x: e.clientX, y: e.clientY, t: Date.now() });
      if (trailRef.current.length > 28) trailRef.current.shift();
    };
    window.addEventListener("mousemove", onMove);

    const draw = () => {
      const { x, y } = mouseRef.current;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const now = Date.now();
      const trail = trailRef.current.filter((p) => now - p.t < 400);
      trailRef.current = trail;

      trail.forEach((p, i) => {
        const age = (now - p.t) / 400;
        const alpha = (1 - age) * 0.6 * (i / trail.length);
        const radius = (1 - age) * 8 + 2;
        const grad = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, radius * 3);
        grad.addColorStop(0, `rgba(99,179,237,${alpha})`);
        grad.addColorStop(0.5, `rgba(139,92,246,${alpha * 0.5})`);
        grad.addColorStop(1, "rgba(0,0,0,0)");
        ctx.beginPath();
        ctx.arc(p.x, p.y, radius * 3, 0, Math.PI * 2);
        ctx.fillStyle = grad;
        ctx.fill();
      });

      const grad2 = ctx.createRadialGradient(x, y, 0, x, y, 18);
      grad2.addColorStop(0, "rgba(147,197,253,0.9)");
      grad2.addColorStop(0.3, "rgba(99,179,237,0.5)");
      grad2.addColorStop(1, "rgba(0,0,0,0)");
      ctx.beginPath();
      ctx.arc(x, y, 18, 0, Math.PI * 2);
      ctx.fillStyle = grad2;
      ctx.fill();

      frameRef.current = requestAnimationFrame(draw);
    };
    draw();

    return () => {
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", onMove);
      cancelAnimationFrame(frameRef.current);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: "fixed", top: 0, left: 0,
        pointerEvents: "none", zIndex: 9999,
        mixBlendMode: "screen",
      }}
    />
  );
}
