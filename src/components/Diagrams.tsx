import React, { useEffect, useRef } from 'react';

export const WavefrontDiagram: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let offset = 0;

    const render = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      const apertureX = canvas.width / 2;
      const apertureSize = 40;
      const waveSpacing = 30;
      
      // Draw Aperture walls
      ctx.strokeStyle = '#e6edf3';
      ctx.lineWidth = 4;
      ctx.beginPath();
      ctx.moveTo(apertureX, 0);
      ctx.lineTo(apertureX, (canvas.height - apertureSize) / 2);
      ctx.moveTo(apertureX, (canvas.height + apertureSize) / 2);
      ctx.lineTo(apertureX, canvas.height);
      ctx.stroke();

      // Draw incoming parallel wavefronts
      ctx.strokeStyle = '#ebd1d6';
      ctx.lineWidth = 2;
      ctx.setLineDash([]);
      for (let x = offset % waveSpacing; x < apertureX; x += waveSpacing) {
        ctx.beginPath();
        ctx.moveTo(x, 20);
        ctx.lineTo(x, canvas.height - 20);
        ctx.stroke();
      }

      // Draw spreading waves
      for (let x = apertureX + (offset % waveSpacing); x < canvas.width; x += waveSpacing) {
        const radius = x - apertureX;
        ctx.beginPath();
        ctx.arc(apertureX, canvas.height / 2, radius, -Math.PI / 2.5, Math.PI / 2.5);
        ctx.stroke();
      }

      offset += 1;
      animationFrameId = requestAnimationFrame(render);
    };

    render();
    return () => cancelAnimationFrame(animationFrameId);
  }, []);

  return (
    <div className="bg-background/50 p-4 rounded-xl border border-primary/20 glow-border">
      <canvas ref={canvasRef} width={400} height={200} className="w-full h-auto" />
      <p className="text-center text-xs mt-2 text-text/60 italic">Diagram 1: Wavefront passing through aperture</p>
    </div>
  );
};

export const ThicknessComparisonDiagram: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let offset = 0;

    const render = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      const midY = canvas.height / 2;
      const slitWidth = 30;
      const waveSpacing = 20;

      // Thin Aperture (Left)
      const thinX = 100;
      ctx.strokeStyle = '#e6edf3';
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(thinX, 20); ctx.lineTo(thinX, midY - slitWidth/2);
      ctx.moveTo(thinX, midY + slitWidth/2); ctx.lineTo(thinX, midY + 80);
      ctx.stroke();
      
      ctx.strokeStyle = '#ebd1d6';
      for (let r = (offset % waveSpacing); r < 80; r += waveSpacing) {
        ctx.beginPath();
        ctx.arc(thinX, midY, r, -Math.PI/3, Math.PI/3);
        ctx.stroke();
      }

      // Thick Aperture (Right)
      const thickX = 300;
      const thickness = 40;
      ctx.strokeStyle = '#e6edf3';
      ctx.beginPath();
      ctx.rect(thickX - thickness/2, 20, thickness, midY - slitWidth/2 - 20);
      ctx.rect(thickX - thickness/2, midY + slitWidth/2, thickness, 80 - (midY + slitWidth/2));
      ctx.stroke();

      ctx.strokeStyle = '#c4a4a9';
      for (let r = (offset % waveSpacing); r < 80; r += waveSpacing) {
        // Constrained waves inside and spreading outside
        if (r < thickness/2) {
           ctx.beginPath();
           ctx.moveTo(thickX - thickness/2 + r, midY - slitWidth/2 + 5);
           ctx.lineTo(thickX - thickness/2 + r, midY + slitWidth/2 - 5);
           ctx.stroke();
        } else {
           ctx.beginPath();
           ctx.arc(thickX + thickness/2, midY, r - thickness/2, -Math.PI/4, Math.PI/4);
           ctx.stroke();
        }
      }

      ctx.fillStyle = '#e6edf3';
      ctx.font = '10px sans-serif';
      ctx.fillText('Thin', thinX - 10, 15);
      ctx.fillText('Thick', thickX - 15, 15);

      offset += 0.8;
      animationFrameId = requestAnimationFrame(render);
    };

    render();
    return () => cancelAnimationFrame(animationFrameId);
  }, []);

  return (
    <div className="bg-background/50 p-4 rounded-xl border border-primary/20 glow-border">
      <canvas ref={canvasRef} width={400} height={150} className="w-full h-auto" />
      <p className="text-center text-xs mt-2 text-text/60 italic">Diagram 2: Thin vs Thick aperture propagation</p>
    </div>
  );
};
