'use client';

import { motion, useMotionValue, useSpring } from 'framer-motion';
import { useEffect, useState } from 'react';

const TypewriterText = ({ text, delay = 0, className = "" }: { text: string, delay?: number, className?: string }) => {
  // Split text into characters
  const characters = Array.from(text);
  
  return (
    <motion.span
      className={className}
      initial="hidden"
      animate="visible"
      variants={{
        hidden: { opacity: 1 },
        visible: {
          opacity: 1,
          transition: {
            staggerChildren: 0.08, // Typing speed
            delayChildren: delay,
          }
        }
      }}
    >
      {characters.map((char, index) => (
        <motion.span
          key={index}
          variants={{
            hidden: { opacity: 0, display: "none" }, // Use display none to prevent taking up space? No, standard typewriter keeps space usually or flows. 
                                                     // Actually for "typing" usually we want cursor behavior, but opacity fade-in per char is smoother for "Apple" style.
            visible: { opacity: 1, display: "inline" }
          }}
        >
          {char === " " ? "\u00A0" : char}
        </motion.span>
      ))}
    </motion.span>
  );
};

export default function Hero() {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const [isMounted, setIsMounted] = useState(false);

  // Spring physics for smooth follow effect
  const springConfig = { damping: 20, stiffness: 100 };
  const springX = useSpring(mouseX, springConfig);
  const springY = useSpring(mouseY, springConfig);

  useEffect(() => {
    setIsMounted(true);
    // Initialize glow in center
    if (typeof window !== 'undefined') {
        mouseX.set(window.innerWidth / 2 - 250);
        mouseY.set(window.innerHeight / 2 - 250);
    }

    const handleMouseMove = (e: globalThis.MouseEvent) => {
      // Offset by half the glow size (500px / 2 = 250px) to center it
      mouseX.set(e.clientX - 250);
      mouseY.set(e.clientY - 250);
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [mouseX, mouseY]);

  return (
    <section className="relative min-h-screen flex flex-col justify-center items-start px-6 md:px-12 pt-20 overflow-hidden bg-transparent">
      
      {/* Interactive Glow Follower - Made Stronger */}
      {isMounted && (
        <motion.div 
          className="fixed top-0 left-0 w-[500px] h-[500px] bg-accent/40 rounded-full blur-[100px] z-0 pointer-events-none mix-blend-multiply dark:mix-blend-screen"
          style={{
            x: springX,
            y: springY,
            background: 'radial-gradient(circle, rgba(41,151,255,0.4) 0%, rgba(41,151,255,0) 70%)'
          }}
        />
      )}
      
      {/* Static Background Decor - Extra ambience */}
      <div className="absolute top-[-10%] right-[-5%] w-[600px] h-[600px] bg-purple-300/20 rounded-full blur-[120px] -z-20" />
      
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
        className="max-w-4xl relative z-10"
      >
        <span className="inline-block px-4 py-1.5 mb-6 text-xs font-bold tracking-widest uppercase bg-white/80 backdrop-blur-sm border border-border/60 rounded-full text-accent shadow-sm">
          Game Designer & Multimedia Artist
        </span>
        
        <h1 className="text-5xl md:text-8xl font-black tracking-tighter text-foreground mb-8 leading-[0.95]">
          Crafting <br />
          <TypewriterText text="Digital Worlds." delay={1.0} className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-indigo-600" />
        </h1>
        
        <p className="text-xl md:text-2xl text-muted max-w-xl mb-12 leading-relaxed font-light">
          Hi, I'm <strong className="text-foreground">Noval</strong>. <br/>
          I blend code, art, and storytelling to create immersive interactive experiences.
        </p>

        <div className="flex flex-col sm:flex-row gap-4">
          <a 
            href="#collection" 
            className="px-8 py-4 bg-foreground text-background font-bold rounded-full hover:shadow-lg hover:shadow-black/20 hover:-translate-y-1 transition-all active:scale-95 text-center"
          >
            Explore Work
          </a>
          <a 
            href="#contact" 
            className="px-8 py-4 bg-white/50 backdrop-blur-sm border border-border text-foreground font-bold rounded-full hover:bg-white transition-all active:scale-95 shadow-sm text-center group"
          >
            Contact Me <span className="inline-block transition-transform group-hover:translate-x-1">→</span>
          </a>
        </div>
      </motion.div>
    </section>
  );
}
