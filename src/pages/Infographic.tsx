import React, { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { ZoomIn, ZoomOut, RefreshCw, Move } from 'lucide-react';

export const Infographic: React.FC = () => {
  const [scale, setScale] = useState(1);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleZoom = (delta: number) => {
    setScale(prev => Math.min(Math.max(0.5, prev + delta), 3));
  };

  const handleReset = () => {
    setScale(1);
    setPosition({ x: 0, y: 0 });
  };

  const handleMouseDown = () => setIsDragging(true);
  const handleMouseUp = () => setIsDragging(false);
  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return;
    setPosition(prev => ({
      x: prev.x + e.movementX,
      y: prev.y + e.movementY
    }));
  };

  return (
    <div className="min-h-screen pt-24 px-6 flex flex-col items-center">
      <div className="max-w-4xl text-center mb-12">
        <h2 className="text-4xl font-display text-primary glow-text mb-4">Research Infographic</h2>
        <p className="text-text/60 italic">Interactive visualization of the diffraction study. Use the controls to zoom and drag to pan.</p>
      </div>

      <div className="relative w-full max-w-6xl aspect-[21/9] bg-secondary/5 border border-primary/20 rounded-3xl overflow-hidden cursor-grab active:cursor-grabbing shadow-2xl">
        {/* Controls Overlay */}
        <div className="absolute top-6 right-6 z-20 flex flex-col gap-3">
          <button onClick={() => handleZoom(0.2)} className="p-3 bg-background/80 backdrop-blur-md border border-primary/30 rounded-xl hover:bg-primary/20 transition-colors"><ZoomIn className="w-5 h-5" /></button>
          <button onClick={() => handleZoom(-0.2)} className="p-3 bg-background/80 backdrop-blur-md border border-primary/30 rounded-xl hover:bg-primary/20 transition-colors"><ZoomOut className="w-5 h-5" /></button>
          <button onClick={handleReset} className="p-3 bg-background/80 backdrop-blur-md border border-primary/30 rounded-xl hover:bg-primary/20 transition-colors"><RefreshCw className="w-5 h-5" /></button>
        </div>

        <div className="absolute bottom-6 left-6 z-20 flex items-center gap-2 px-4 py-2 bg-background/80 backdrop-blur-md border border-primary/30 rounded-full text-xs font-mono text-primary">
          <Move className="w-4 h-4" /> DRAG TO PAN • {Math.round(scale * 100)}% ZOOM
        </div>

        {/* Infographic Content */}
        <motion.div 
          ref={containerRef}
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseUp}
          animate={{ x: position.x, y: position.y, scale }}
          transition={{ type: 'spring', damping: 25, stiffness: 150 }}
          className="w-full h-full flex items-center justify-center p-20 select-none"
        >
          {/* 
            INSTRUCTIONS FOR USER:
            1. Right-click the infographic image in our chat and "Save image as..."
            2. Save it as "infographic.png".
            3. Upload this file to the 'public' folder in your project.
            4. The website will then automatically display your correct infographic below.
          */}
          <img 
            src="/infographic.png" 
            alt="Research Infographic"
            className="max-w-full max-h-full object-contain rounded-xl shadow-2xl border border-primary/20"
            onError={(e) => {
              // Fallback if image is not found
              const target = e.target as HTMLImageElement;
              target.src = "https://picsum.photos/seed/physics-placeholder/1200/600";
              target.title = "Please upload infographic.png to the public folder";
            }}
            referrerPolicy="no-referrer"
          />
        </motion.div>
      </div>
    </div>
  );
};
