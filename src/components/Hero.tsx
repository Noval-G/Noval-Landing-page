'use client';

import { motion, useMotionValue, useSpring } from 'framer-motion';
import { useEffect, useState } from 'react';
import { useLanguage } from '@/context/LanguageContext';

const TypewriterText = ({ text, delay = 0, className = "" }: { text: string, delay?: number, className?: string }) => {
  // Split text into characters
  const characters = Array.from(text);
  
  return (
    <motion.span
      className={className}
      initial="hidden"
      animate="visible"
      key={text} // Re-animate when text changes
      variants={{
        hidden: { opacity: 1 },
        visible: {
          opacity: 1,
          transition: {
            staggerChildren: 0.05, // Typing speed
            delayChildren: delay,
          }
        }
      }}
    >
      {characters.map((char, index) => (
        <motion.span
          key={index}
          variants={{
            hidden: { opacity: 0, display: "none" },
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
  const { t } = useLanguage();

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
      
      {/* Static Background Decor - Extra ambience */}
      <div className="absolute top-[-10%] right-[-5%] w-[600px] h-[600px] bg-purple-300/20 rounded-full blur-[120px] -z-20" />
      
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
        className="max-w-4xl relative z-10"
      >
        <span className="inline-block px-4 py-1.5 mb-6 text-[10px] md:text-xs font-bold tracking-widest uppercase bg-white/80 backdrop-blur-sm border border-border/60 rounded-full text-accent shadow-sm">
          {t('hero.badge')}
        </span>
        
        <h1 className="text-5xl md:text-8xl font-black tracking-tighter text-foreground mb-8 leading-[0.95]">
          <TypewriterText text={t('hero.title')} delay={0.5} className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-indigo-600" />
        </h1>
        
        <p className="text-xl md:text-2xl text-muted max-w-xl mb-12 leading-relaxed font-light">
          {t('hero.subtitle')}
        </p>

        <div className="flex flex-col sm:flex-row gap-4">
          <a 
            href="#collection" 
            className="px-8 py-4 bg-foreground text-background font-bold rounded-full hover:shadow-lg hover:shadow-black/20 hover:-translate-y-1 transition-all active:scale-95 text-center"
          >
            {t('hero.explore')}
          </a>
          <a 
            href="#contact" 
            className="px-8 py-4 bg-white/50 backdrop-blur-sm border border-border text-foreground font-bold rounded-full hover:bg-white transition-all active:scale-95 shadow-sm text-center group"
          >
            {t('hero.contact')} <span className="inline-block transition-transform group-hover:translate-x-1">→</span>
          </a>
        </div>
      </motion.div>
    </section>
  );
}
