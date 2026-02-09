'use client';

import { motion, useMotionValue, useSpring } from 'framer-motion';
import { useEffect, useState } from 'react';
import { useLanguage } from '@/context/LanguageContext';

const TypewriterText = ({ text, delay = 0, className = "" }: { text: string, delay?: number, className?: string }) => {
  const characters = Array.from(text);
  return (
    <motion.span
      className={className}
      initial="hidden"
      animate="visible"
      key={text}
      variants={{
        hidden: { opacity: 1 },
        visible: {
          opacity: 1,
          transition: { staggerChildren: 0.05, delayChildren: delay }
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
  const { t } = useLanguage();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <section className="relative min-h-screen flex flex-col justify-center px-6 md:px-12 pt-20 overflow-hidden bg-background transition-colors duration-700">
      
      {/* Cinematic Grain Overlay */}
      <div className="absolute inset-0 z-0 pointer-events-none opacity-[0.03]" 
           style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 400 400\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'noiseFilter\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.9\' numOctaves=\'3\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23noiseFilter)\'/%3E%3C/svg%3E")' }} 
      />

      {/* Dynamic Aurora Background (Visual Impact) */}
      <div className="absolute top-[-20%] right-[-10%] w-[80vw] h-[80vw] md:w-[50vw] md:h-[50vw] rounded-full blur-[100px] opacity-60 animate-pulse-slow mix-blend-multiply dark:mix-blend-screen transition-all duration-1000"
           style={{ 
             background: 'radial-gradient(circle, var(--accent) 0%, transparent 70%)',
             transform: 'translate3d(0, 0, 0)'
           }} 
      />
      <div className="absolute bottom-[-10%] left-[-10%] w-[60vw] h-[60vw] md:w-[40vw] md:h-[40vw] rounded-full blur-[80px] opacity-40 animate-pulse-slower mix-blend-multiply dark:mix-blend-screen transition-all duration-1000 delay-700"
           style={{ 
             background: 'radial-gradient(circle, var(--accent) 0%, transparent 70%)',
             filter: 'hue-rotate(45deg)'
           }} 
      />

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
        className="max-w-6xl relative z-10"
      >
        <span className="inline-block px-4 py-1.5 mb-8 text-[10px] md:text-xs font-bold tracking-[0.2em] uppercase bg-foreground/5 backdrop-blur-md border border-foreground/10 rounded-full text-foreground/80 shadow-sm">
          {t('hero.badge')}
        </span>
        
        <h1 className={`text-5xl md:text-7xl lg:text-8xl font-bold text-foreground mb-10 leading-[1.25] ${useLanguage().language === 'zh' ? 'tracking-normal font-semibold' : 'tracking-tight font-black'}`}>
          {t('hero.title').split('  ').map((line, i) => (
            <span key={i} className={`block ${i > 0 ? 'md:ml-[15%] opacity-90' : ''}`}>
              <TypewriterText text={line} delay={0.3 + i * 0.5} />
            </span>
          ))}
        </h1>
        
        <p className="text-xl md:text-2xl text-muted max-w-2xl mb-12 leading-[1.7] font-light">
          {t('hero.subtitle')}
        </p>

        <div className="flex flex-col sm:flex-row gap-5">
          <a 
            href="#collection" 
            className="px-10 py-5 bg-foreground text-background font-bold rounded-full text-lg hover:shadow-xl hover:shadow-accent/20 hover:-translate-y-1 transition-all active:scale-95 text-center"
          >
            {t('hero.explore')}
          </a>
          <a 
            href="#contact" 
            className="px-10 py-5 bg-transparent border border-foreground/20 text-foreground font-bold rounded-full text-lg hover:bg-foreground/5 transition-all active:scale-95 text-center group backdrop-blur-sm"
          >
            {t('hero.contact')} <span className="inline-block transition-transform group-hover:translate-x-1">→</span>
          </a>
        </div>
      </motion.div>
    </section>
  );
}
