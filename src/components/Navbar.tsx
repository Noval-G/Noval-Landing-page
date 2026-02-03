'use client';

import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { useEffect, useState } from 'react';
import { Sparkles, Briefcase, Languages } from 'lucide-react';
import Link from 'next/link';
import { useLanguage } from '@/context/LanguageContext';

export default function Navbar() {
  const { scrollY } = useScroll();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mode, setMode] = useState<'studio' | 'sanctuary'>('studio');
  const { language, setLanguage, t } = useLanguage();

  const navItems = [
    { name: t('nav.about'), href: '#about' },
    { name: t('nav.skills'), href: '#skills' },
    { name: t('nav.collection'), href: '#collection' },
    { name: t('nav.timeline'), href: '#timeline' },
  ];

  useEffect(() => {
    const savedMode = localStorage.getItem('theme-mode') as 'studio' | 'sanctuary';
    if (savedMode) {
      setMode(savedMode);
      document.documentElement.setAttribute('data-theme', savedMode);
    }
    
    return scrollY.onChange((latest) => {
      setIsScrolled(latest > 50);
    });
  }, [scrollY]);

  const toggleMode = () => {
    const newMode = mode === 'studio' ? 'sanctuary' : 'studio';
    setMode(newMode);
    document.documentElement.setAttribute('data-theme', newMode);
    localStorage.setItem('theme-mode', newMode);
  };

  const toggleLanguage = () => {
    setLanguage(language === 'en' ? 'zh' : 'en');
  };

  return (
    <motion.nav 
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
      className={`fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 py-4 md:px-12 transition-all duration-500 ${
        isScrolled ? 'bg-background/70 backdrop-blur-xl border-b border-border/40 py-3' : 'bg-transparent'
      }`}
    >
      {/* Logo Area (Left) */}
      <Link href="/" className="text-xl font-bold tracking-tight text-foreground">
        Noval
      </Link>

      {/* Desktop Menu (Center) */}
      <div className="hidden md:flex gap-10 absolute left-1/2 -translate-x-1/2">
        {navItems.map((item) => (
          <Link 
            key={item.name} 
            href={item.href}
            className="text-sm font-semibold text-muted hover:text-foreground transition-colors relative group"
          >
            {item.name}
            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-accent transition-all group-hover:w-full" />
          </Link>
        ))}
      </div>

      {/* Controls Area (Right) */}
      <div className="flex items-center gap-3">
        
        {/* Compact Mode Switcher (Icons Only) */}
        <div 
          onClick={toggleMode}
          className="relative h-8 w-14 bg-muted/10 rounded-full p-1 cursor-pointer border border-border/40 hover:bg-muted/15 transition-colors flex items-center"
        >
          <motion.div
            className="absolute h-6 w-6 bg-white rounded-full shadow-sm"
            animate={{ x: mode === 'studio' ? 0 : 24 }}
            transition={{ type: "spring", stiffness: 400, damping: 30 }}
          />
          <div className="relative z-10 flex w-full justify-between px-1.5 text-muted pointer-events-none">
             <Briefcase size={12} className={mode === 'studio' ? 'text-accent' : 'opacity-50'} />
             <Sparkles size={12} className={mode === 'sanctuary' ? 'text-accent' : 'opacity-50'} />
          </div>
        </div>

        {/* Language Toggle */}
        <button 
          onClick={toggleLanguage}
          className="flex items-center justify-center w-8 h-8 bg-muted/5 hover:bg-muted/10 border border-border/40 rounded-full text-[10px] font-bold uppercase text-muted hover:text-foreground transition-all"
        >
          {language === 'en' ? '繁' : 'EN'}
        </button>
        
        {/* Let's Talk Button */}
        <Link 
          href="#contact" 
          className="hidden sm:inline-flex px-5 py-2 bg-foreground text-background text-xs font-bold rounded-full hover:scale-105 active:scale-95 transition-all shadow-sm"
        >
          {t('nav.talk')}
        </Link>
      </div>
    </motion.nav>
  );
}