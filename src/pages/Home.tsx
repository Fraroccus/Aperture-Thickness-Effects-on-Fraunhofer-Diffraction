import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight, ExternalLink, ChevronDown } from 'lucide-react';
import { Tooltip } from '../components/Tooltip';
import { WavefrontDiagram, ThicknessComparisonDiagram } from '../components/Diagrams';
import { DiffractionSimulation } from '../components/DiffractionSimulation';

const Section: React.FC<{ title: string; children: React.ReactNode; id?: string }> = ({ title, children, id }) => (
  <motion.section 
    id={id}
    initial={{ opacity: 0, y: 50 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: "-100px" }}
    className="py-24 max-w-5xl mx-auto px-6"
  >
    <h2 className="text-4xl font-display mb-12 text-primary glow-text border-b border-primary/20 pb-4">{title}</h2>
    <div className="text-lg leading-relaxed text-text/90 space-y-6">
      {children}
    </div>
  </motion.section>
);

export const Home: React.FC = () => {
  return (
    <div className="relative">
      {/* Hero Section */}
      <section className="min-h-screen flex flex-col items-center justify-center pt-32 text-center px-6 relative overflow-hidden">
        <div className="absolute inset-0 z-0 opacity-20">
          <svg className="w-full h-full" viewBox="0 0 1000 1000" preserveAspectRatio="none">
            <path d="M0,500 C200,400 300,600 500,500 C700,400 800,600 1000,500" stroke="#4cc9f0" fill="transparent" strokeWidth="2">
              <animate attributeName="d" values="M0,500 C200,400 300,600 500,500 C700,400 800,600 1000,500; M0,500 C200,600 300,400 500,500 C700,600 800,400 1000,500; M0,500 C200,400 300,600 500,500 C700,400 800,600 1000,500" dur="10s" repeatCount="indefinite" />
            </path>
          </svg>
        </div>
        
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="z-10 max-w-4xl"
        >
          <h1 className="text-4xl md:text-6xl font-display mb-6 text-text leading-tight">
            Aperture Thickness Effects on Fraunhofer Diffraction
          </h1>
          <p className="text-xl md:text-2xl text-secondary mb-8 font-light tracking-wide">
            Understanding how real apertures change the behaviour of light waves.
          </p>
          <div className="max-w-2xl mx-auto text-lg text-text/70 mb-12">
            Light passing through a small opening spreads out, creating a diffraction pattern. 
            Most textbook models assume that apertures are infinitely thin. 
            However, real optical systems have finite thickness, which can significantly modify the resulting diffraction pattern.
          </div>
          <motion.button 
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => document.getElementById('problem')?.scrollIntoView({ behavior: 'smooth' })}
            className="px-8 py-4 bg-primary text-background font-bold rounded-full flex items-center gap-2 mx-auto hover:bg-highlight transition-colors shadow-lg shadow-primary/20"
          >
            Explore Research <ChevronDown className="w-5 h-5" />
          </motion.button>
        </motion.div>
      </section>

      {/* The Problem */}
      <Section title="The Problem" id="problem">
        <p>
          <Tooltip term="Diffraction" definition="The bending of waves around obstacles and the spreading of waves as they pass through small openings." /> is a fundamental wave phenomenon. 
          When light encounters a narrow opening, it spreads into a pattern of bright and dark fringes caused by <Tooltip term="Interference" definition="The phenomenon in which two or more waves superpose to form a resultant wave of greater, lower, or the same amplitude." />.
        </p>
        <p>
          In many introductory models, the aperture is treated as infinitely thin. This simplifies the mathematics and allows diffraction to be described using standard equations.
        </p>
        <p>
          However, in real optical systems, apertures often have finite thickness, meaning the light must travel through a small channel rather than passing instantly through a flat plane.
        </p>
        <div className="p-6 bg-secondary/10 border-l-4 border-highlight rounded-r-xl italic">
          Does aperture thickness affect the diffraction pattern we observe?
        </div>
      </Section>

      {/* Understanding Diffraction */}
      <Section title="Understanding Diffraction">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <p>
              Diffraction occurs when waves encounter an obstacle or opening that is comparable in size to their <Tooltip term="Wavelength" definition="The distance between successive crests of a wave, especially points in a sound wave or electromagnetic wave." />.
            </p>
            <p>
              According to Huygens’ principle, every point on a wavefront acts as a source of secondary wavelets. When light passes through an aperture, these secondary wavelets interfere with each other.
            </p>
            <p>
              For a single slit, the intensity pattern can be approximated by:
            </p>
            <div className="bg-background/50 p-4 rounded-lg font-mono text-primary border border-primary/20 text-center">
              I(θ) ∝ (sin β / β)²
            </div>
            <p className="text-sm text-text/60">
              where β = (π a sinθ) / λ. Here, a = slit width, λ = wavelength, and θ = observation angle.
            </p>
          </div>
          <WavefrontDiagram />
        </div>
      </Section>

      {/* Textbook vs Reality */}
      <Section title="Textbook vs Reality">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="p-8 bg-secondary/10 rounded-2xl border border-secondary/20">
            <h3 className="text-2xl text-primary mb-4">Textbook Model</h3>
            <p className="text-text/80">
              Most physics textbooks assume that apertures are infinitely thin. This assumption simplifies diffraction calculations and leads to clean theoretical patterns.
            </p>
          </div>
          <div className="p-8 bg-highlight/10 rounded-2xl border border-highlight/20">
            <h3 className="text-2xl text-highlight mb-4">Real Optical Systems</h3>
            <p className="text-text/80">
              In reality, apertures have finite thickness. Instead of passing instantly through a flat plane, light travels through a short channel.
            </p>
          </div>
        </div>
        <div className="mt-12">
          <ThicknessComparisonDiagram />
        </div>
        <p className="mt-8">
          This research explored how increasing aperture thickness changes the diffraction pattern, modifying amplitude, shape, and intensity of the maxima.
        </p>
      </Section>

      {/* What This Research Investigated */}
      <Section title="What This Research Investigated">
        <p>
          The study examined how aperture thickness influences far-field diffraction patterns, also known as <Tooltip term="Fraunhofer diffraction" definition="A form of diffraction that occurs when the distance from the aperture to the observation point is very large compared to the size of the aperture." />.
        </p>
        <p>
          Using scalar diffraction theory, the researchers analysed both single slits and circular apertures. They calculated how the amplitude of the diffracted field changes when the aperture thickness increases.
        </p>
        <p>
          The goal was to determine whether thicker apertures significantly alter the diffraction pattern we observe in laboratory settings.
        </p>
      </Section>

      {/* Methodology */}
      <Section title="Methodology">
        <div className="space-y-6">
          <p>
            The researchers applied scalar diffraction theory to model the propagation of light waves through apertures of varying thickness.
          </p>
          <ul className="list-disc list-inside space-y-4 text-text/80 ml-4">
            <li>Analysed Fraunhofer diffraction patterns in the far-field.</li>
            <li>Calculated field amplitude for different aperture sizes and thicknesses.</li>
            <li>Varied angles of incidence to see how geometry interacts with light direction.</li>
          </ul>
          <p>
            By comparing these scenarios, the researchers could determine how aperture thickness influences the observed diffraction pattern.
          </p>
        </div>
      </Section>

      {/* Key Findings */}
      <Section title="Key Findings">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            { title: "Amplitude Decrease", desc: "The maximum amplitude of the diffracted field decreases as aperture thickness increases." },
            { title: "Width Sensitivity", desc: "The effect becomes more pronounced for wider apertures relative to the wavelength." },
            { title: "Waveguide Effect", desc: "Thick apertures effectively act as short waveguides, altering propagation before exiting." }
          ].map((finding, i) => (
            <div key={i} className="p-6 bg-background border border-primary/30 rounded-xl glow-border">
              <h4 className="text-primary font-bold mb-2">{finding.title}</h4>
              <p className="text-sm text-text/70">{finding.desc}</p>
            </div>
          ))}
        </div>
        <p className="mt-8">
          These results demonstrate that the common assumption of infinitely thin apertures can sometimes lead to simplified or incomplete predictions in advanced optical design.
        </p>
      </Section>

      {/* Interactive Simulation */}
      <div className="py-24 max-w-6xl mx-auto px-6">
        <DiffractionSimulation />
      </div>

      {/* Why It Matters */}
      <Section title="Why It Matters">
        <p>
          Understanding diffraction in realistic systems is important in many areas of optics. In these systems, aperture geometry can influence image quality and signal intensity.
        </p>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8">
          {['Microscopes', 'Optical Sensors', 'Laser Systems', 'Imaging Devices'].map((app, i) => (
            <div key={i} className="p-4 bg-secondary/20 rounded-lg text-center border border-secondary/30 text-sm font-semibold">
              {app}
            </div>
          ))}
        </div>
        <p className="mt-8">
          Research like this helps refine our understanding of how light behaves in real optical components, leading to more accurate sensors and better imaging technology.
        </p>
      </Section>

      {/* Next Steps */}
      <Section title="Next Steps">
        <p>
          Future research could explore experimental verification of these predictions, effects at different wavelengths, and behaviour in complex aperture geometries.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 mt-8">
          <Link 
            to="/infographic"
            className="inline-flex items-center gap-2 px-6 py-3 bg-secondary/20 text-secondary font-bold rounded-xl hover:bg-secondary/30 transition-colors border border-secondary/30"
          >
            View Research Infographic <ArrowRight className="w-5 h-5" />
          </Link>
          <Link 
            to="/presentation"
            className="inline-flex items-center gap-2 px-6 py-3 bg-primary/20 text-primary font-bold rounded-xl hover:bg-primary/30 transition-colors border border-primary/30"
          >
            View Full Presentation <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </Section>

      {/* Paper Link */}
      <section className="py-24 bg-secondary/5 text-center">
        <h2 className="text-3xl font-display mb-8">Read the Full Research</h2>
        <motion.a 
          href="https://doi.org/10.1088/2040-8986/ab08cb"
          target="_blank"
          rel="noopener noreferrer"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="inline-flex items-center gap-2 px-10 py-5 bg-primary text-white font-bold rounded-full hover:bg-primary/80 transition-colors shadow-xl shadow-primary/20"
        >
          Read the Full Paper <ExternalLink className="w-5 h-5" />
        </motion.a>
      </section>

      <footer className="py-12 border-t border-white/5 text-center text-text/40 text-sm">
        &copy; 2026 Educational Physics Project &bull; Created for IB Physics HL Students
      </footer>
    </div>
  );
};
