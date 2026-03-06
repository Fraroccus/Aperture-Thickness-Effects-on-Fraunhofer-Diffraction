import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Atom } from 'lucide-react';

export const Navbar: React.FC = () => {
  const location = useLocation();

  const navItems = [
    { name: 'Home', path: '/' },
    { name: 'Presentation', path: '/presentation' },
    { name: 'Infographic', path: '/infographic' },
    { name: 'Paper', path: 'https://doi.org/10.1088/2040-8986/ab08cb', external: true },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-lg border-b border-white/5">
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-3 group">
          <div className="p-2 bg-primary/10 rounded-lg group-hover:bg-primary/20 transition-colors">
            <Atom className="w-6 h-6 text-primary" />
          </div>
          <span className="font-display font-bold text-xl tracking-tight text-text group-hover:text-primary transition-colors">
            Optics<span className="text-primary">Lab</span>
          </span>
        </Link>

        <div className="hidden md:flex items-center gap-8">
          {navItems.map((item) => (
            item.external ? (
              <a 
                key={item.name}
                href={item.path}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm font-medium text-text/60 hover:text-primary transition-colors"
              >
                {item.name}
              </a>
            ) : (
              <Link 
                key={item.name}
                to={item.path}
                className={`text-sm font-medium relative py-2 transition-colors ${
                  location.pathname === item.path ? 'text-primary' : 'text-text/60 hover:text-text'
                }`}
              >
                {item.name}
                {location.pathname === item.path && (
                  <motion.div 
                    layoutId="nav-underline"
                    className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary shadow-[0_0_10px_rgba(76,201,240,0.5)]"
                  />
                )}
              </Link>
            )
          ))}
        </div>

        {/* Mobile Menu Placeholder (Optional) */}
        <div className="md:hidden">
          <button className="p-2 text-text/60">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
            </svg>
          </button>
        </div>
      </div>
    </nav>
  );
};
