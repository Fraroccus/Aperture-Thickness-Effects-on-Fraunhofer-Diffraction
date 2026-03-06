import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Maximize2, Minimize2, ChevronLeft, ChevronRight } from 'lucide-react';

export const Presentation: React.FC = () => {
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = [
    { title: "Introduction", content: "The Effect of Aperture Thickness on Diffraction Patterns." },
    { title: "The Problem", content: "Textbook models assume infinitely thin apertures. Real apertures have thickness." },
    { title: "Theory", content: "Scalar diffraction theory applied to finite thickness channels." },
    { title: "Key Findings", content: "Amplitude decreases as thickness increases. Waveguide effects occur." },
    { title: "Conclusion", content: "Geometry matters in high-precision optical systems." }
  ];

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen();
      setIsFullscreen(true);
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen();
        setIsFullscreen(false);
      }
    }
  };

  return (
    <div className={`min-h-screen pt-24 px-6 flex flex-col items-center justify-center ${isFullscreen ? 'bg-black p-0' : ''}`}>
      <motion.div 
        layout
        className={`relative w-full max-w-6xl aspect-video bg-secondary/5 border border-primary/30 rounded-2xl shadow-2xl overflow-hidden ${isFullscreen ? 'max-w-none h-screen rounded-none border-none' : ''}`}
      >
        <iframe 
          src="https://gamma.app/embed/3yv78ypzusohqbo" 
          width="100%" 
          height="100%" 
          style={{ border: 'none' }}
          allow="fullscreen"
          title="Aperture Thickness Effects on Fraunhofer Diffraction"
        />

        {/* Fullscreen Toggle Overlay */}
        <div className="absolute bottom-6 right-6 z-20">
          <button 
            onClick={toggleFullscreen}
            className="p-3 bg-background/80 backdrop-blur-md border border-primary/30 hover:bg-primary/20 rounded-full transition-colors shadow-lg"
            title={isFullscreen ? "Exit Fullscreen" : "Enter Fullscreen"}
          >
            {isFullscreen ? <Minimize2 className="w-6 h-6" /> : <Maximize2 className="w-6 h-6" />}
          </button>
        </div>
      </motion.div>
      
      {!isFullscreen && (
        <div className="mt-12 text-center max-w-2xl text-text/60">
          <p>This presentation explores the research findings in detail. Use the button in the bottom right to enter fullscreen mode.</p>
        </div>
      )}
    </div>
  );
};
