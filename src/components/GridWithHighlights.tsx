import { useEffect, useRef } from "react";

export default function GridWithHighlights() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const chosenCellsRef = useRef<string[]>([]); // store highlighted cells

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const cellSize = 100;

    const generateHighlights = (cols: number, rows: number) => {
      const chosen = new Set<string>();
      while (chosen.size < 6) {
        const cell = `${Math.floor(Math.random() * cols)},${Math.floor(
          Math.random() * rows
        )}`;
        chosen.add(cell);
      }
      chosenCellsRef.current = Array.from(chosen);
    };

    const draw = () => {
      const { width, height } = canvas;
      ctx.clearRect(0, 0, width, height);

      // detect theme
      const isDark =
        document.documentElement.classList.contains("dark") ||
        window.matchMedia("(prefers-color-scheme: dark)").matches;

      const gridColor = isDark ? "rgba(255,255,255,0.05)" : "rgba(0,0,0,0.05)";
      const highlightColor = isDark
        ? "rgba(255,100,200,0.25)"
        : "rgba(200,50,150,0.25)";
      const borderColor = isDark
        ? "rgba(255,100,200,0.5)"
        : "rgba(200,50,150,0.5)";

      ctx.strokeStyle = gridColor;
      ctx.lineWidth = 1;

      // grid
      for (let x = 0; x < width; x += cellSize) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, height);
        ctx.stroke();
      }
      for (let y = 0; y < height; y += cellSize) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(width, y);
        ctx.stroke();
      }

      // highlights
      chosenCellsRef.current.forEach((cell) => {
        const [col, row] = cell.split(",").map(Number);
        const x = col * cellSize;
        const y = row * cellSize;

        ctx.fillStyle = highlightColor;
        ctx.fillRect(x, y, cellSize, cellSize);

        ctx.strokeStyle = borderColor;
        ctx.strokeRect(x, y, cellSize, cellSize);
      });
    };

    const resizeCanvas = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;

      const cols = Math.floor(canvas.width / cellSize);
      const rows = Math.floor(canvas.height / cellSize);

      if (chosenCellsRef.current.length === 0) {
        // only generate once
        generateHighlights(cols, rows);
      }

      draw();
    };

    // observe parent size
    const resizeObserver = new ResizeObserver(resizeCanvas);
    resizeObserver.observe(canvas);

    resizeCanvas();

    return () => resizeObserver.disconnect();
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="w-full h-full"
      style={{ display: "block" }}
    />
  );
}
