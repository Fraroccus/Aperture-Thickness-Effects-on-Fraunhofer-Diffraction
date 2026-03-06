import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface TooltipProps {
  term: string;
  definition: string;
}

export const Tooltip: React.FC<TooltipProps> = ({ term, definition }) => {
  const [isVisible, setIsVisible] = useState(false);

  return (
    <span 
      className="relative inline-block cursor-help text-primary font-semibold border-b border-dashed border-primary/50 hover:border-primary transition-colors"
      onMouseEnter={() => setIsVisible(true)}
      onMouseLeave={() => setIsVisible(false)}
    >
      {term}
      <AnimatePresence>
        {isVisible && (
          <motion.span
            initial={{ opacity: 0, y: 10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.95 }}
            className="absolute z-50 bottom-full left-1/2 -translate-x-1/2 mb-2 w-64 p-3 bg-secondary/90 backdrop-blur-md border border-primary/30 rounded-lg shadow-xl text-sm font-normal text-white pointer-events-none"
          >
            {definition}
            <span className="absolute top-full left-1/2 -translate-x-1/2 border-8 border-transparent border-t-secondary/90" />
          </motion.span>
        )}
      </AnimatePresence>
    </span>
  );
};
