import React, { useState, useMemo } from 'react';
import { motion } from 'framer-motion';

export const DiffractionSimulation: React.FC = () => {
  const [width, setWidth] = useState(20); // a
  const [thickness, setThickness] = useState(5); // t
  const [wavelength, setWavelength] = useState(500); // lambda (nm)

  const pattern = useMemo(() => {
    const points = 200;
    const data = [];
    const k_attenuation = 0.05;
    
    // Normalized parameters for visualization
    const a = width / 10;
    const L = wavelength / 100;
    const t = thickness / 5;

    for (let i = -points; i <= points; i++) {
      const theta = (i / points) * Math.PI / 4; // -45 to 45 degrees
      const beta = (Math.PI * a * Math.sin(theta)) / (L || 0.1);
      
      let intensity = 1;
      if (Math.abs(beta) > 0.0001) {
        intensity = Math.pow(Math.sin(beta) / beta, 2);
      }
      
      // Apply thickness attenuation
      const attenuation = Math.exp(-k_attenuation * t);
      intensity *= attenuation;

      data.push({ x: i, intensity });
    }
    return data;
  }, [width, thickness, wavelength]);

  return (
    <div className="bg-background/80 backdrop-blur-md p-8 rounded-2xl border border-primary/30 shadow-2xl">
      <h3 className="text-2xl font-display mb-6 text-primary glow-text">Interactive Diffraction Simulation</h3>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* Controls */}
        <div className="space-y-8">
          <div className="space-y-4">
            <div className="flex justify-between text-sm">
              <label className="text-text/80">Aperture Width (a)</label>
              <span className="text-primary font-mono">{width} μm</span>
            </div>
            <input 
              type="range" min="5" max="100" value={width} 
              onChange={(e) => setWidth(Number(e.target.value))}
              className="w-full h-2 bg-secondary/30 rounded-lg appearance-none cursor-pointer accent-primary"
            />
          </div>

          <div className="space-y-4">
            <div className="flex justify-between text-sm">
              <label className="text-text/80">Aperture Thickness (t)</label>
              <span className="text-highlight font-mono">{thickness} μm</span>
            </div>
            <input 
              type="range" min="0" max="50" value={thickness} 
              onChange={(e) => setThickness(Number(e.target.value))}
              className="w-full h-2 bg-secondary/30 rounded-lg appearance-none cursor-pointer accent-highlight"
            />
          </div>

          <div className="space-y-4">
            <div className="flex justify-between text-sm">
              <label className="text-text/80">Wavelength (λ)</label>
              <span className="text-primary font-mono">{wavelength} nm</span>
            </div>
            <input 
              type="range" min="380" max="750" value={wavelength} 
              onChange={(e) => setWavelength(Number(e.target.value))}
              className="w-full h-2 bg-secondary/30 rounded-lg appearance-none cursor-pointer accent-primary"
            />
          </div>

          <div className="p-4 bg-secondary/20 rounded-lg border border-secondary/30 text-sm text-text/70 italic">
            Note: This model uses a sinc-based intensity approximation with an exponential attenuation factor to visualize the effect of finite aperture thickness.
          </div>
        </div>

        {/* Visualization */}
        <div className="flex flex-col items-center justify-center">
          <div className="relative w-full h-48 bg-black rounded-lg overflow-hidden border border-primary/20 flex items-center justify-center">
            {/* Diffraction Pattern Visualization */}
            <div className="absolute inset-0 flex items-center justify-center">
              {pattern.map((p, i) => (
                <div 
                  key={i}
                  className="h-full"
                  style={{
                    width: '1px',
                    backgroundColor: `rgba(235, 209, 214, ${p.intensity})`,
                    boxShadow: p.intensity > 0.5 ? `0 0 10px rgba(235, 209, 214, ${p.intensity * 0.5})` : 'none'
                  }}
                />
              ))}
            </div>
            <div className="absolute bottom-2 right-2 text-[10px] text-text/40 uppercase tracking-widest">Intensity Pattern</div>
          </div>

      <div className="w-full mt-8 h-32 flex items-end gap-[1px]">
        {pattern.filter((_, i) => i % 4 === 0).map((p, i) => (
          <motion.div 
            key={i}
            initial={false}
            animate={{ height: `${p.intensity * 100}%` }}
            className="flex-1 bg-secondary/40 rounded-t-sm"
          />
        ))}
      </div>
          <div className="text-xs text-text/40 mt-2">Intensity Profile Graph</div>
        </div>
      </div>
    </div>
  );
};
