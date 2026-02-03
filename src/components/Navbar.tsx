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
      {/* Logo Area */}
      <div className="flex items-center gap-6">
        <Link href="/" className="text-xl font-bold tracking-tight text-foreground">
          Noval
        </Link>
        
        {/* Mode Switcher */}
        <div 
          onClick={toggleMode}
          className="hidden sm:flex relative h-9 w-[180px] bg-muted/10 rounded-full p-1 cursor-pointer border border-border/40 hover:bg-muted/15 transition-colors"
        >
          <motion.div
            className="absolute h-7 w-[86px] bg-white rounded-full shadow-sm"
            animate={{ x: mode === 'studio' ? 0 : 88 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
          />
          <div className="relative z-10 flex w-full text-[10px] font-bold uppercase tracking-wider">
            <div className={`flex-1 flex items-center justify-center gap-1.5 transition-colors duration-300 ${mode === 'studio' ? 'text-accent' : 'text-muted'}`}>
              <Briefcase size={12} />
              {t('mode.studio')}
            </div>
            <div className={`flex-1 flex items-center justify-center gap-1.5 transition-colors duration-300 ${mode === 'sanctuary' ? 'text-accent' : 'text-muted'}`}>
              <Sparkles size={12} />
              {t('mode.sanctuary')}
            </div>
          </div>
        </div>

        {/* Language Toggle */}
        <button 
          onClick={toggleLanguage}
          className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 bg-muted/5 hover:bg-muted/10 border border-border/40 rounded-full text-[10px] font-bold uppercase tracking-widest text-muted hover:text-foreground transition-all"
        >
          <Languages size={12} className="text-accent" />
          {language === 'en' ? '繁中' : 'EN'}
        </button>
      </div>

      {/* Desktop Menu */}
      <div className="hidden md:flex gap-10">
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

      {/* Contact Area */}
      <div className="flex items-center gap-4">
        {/* Mobile Switcher & Lang */}
        <div className="flex sm:hidden items-center gap-2">
          <button 
            onClick={toggleLanguage}
            className="p-2 bg-muted/10 rounded-full text-muted"
          >
            <span className="text-[10px] font-bold">{language === 'en' ? '繁' : 'EN'}</span>
          </button>
          <button 
            onClick={toggleMode}
            className="p-2 bg-muted/10 rounded-full text-accent"
          >
            {mode === 'studio' ? <Briefcase size={20} /> : <Sparkles size={20} />}
          </button>
        </div>
        
        <Link 
          href="#contact" 
          className="px-5 py-2 bg-foreground text-background text-xs font-bold rounded-full hover:scale-105 active:scale-95 transition-all shadow-sm"
        >
          {t('nav.talk')}
        </Link>
      </div>
    </motion.nav>
  );
}