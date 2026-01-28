'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { useEffect, useState } from 'react';
import Link from 'next/link';

const navItems = [
  { name: 'About', href: '#about' },
  { name: 'Skills', href: '#skills' },
  { name: 'Collection', href: '#collection' },
  { name: 'Timeline', href: '#timeline' },
];

export default function Navbar() {
  const { scrollY } = useScroll();
  const [isScrolled, setIsScrolled] = useState(false);

  // Apple-style navbar transition: background appears after scrolling a bit
  const backgroundColor = useTransform(
    scrollY,
    [0, 50],
    ['rgba(255, 255, 255, 0)', 'rgba(255, 255, 255, 0.8)']
  );
  
  const borderBottom = useTransform(
    scrollY,
    [0, 50],
    ['rgba(0, 0, 0, 0)', 'rgba(0, 0, 0, 0.05)']
  );

  useEffect(() => {
    return scrollY.onChange((latest) => {
      setIsScrolled(latest > 50);
    });
  }, [scrollY]);

  return (
    <motion.nav 
      style={{ backgroundColor, borderBottom, backdropFilter: isScrolled ? 'blur(20px)' : 'none' }}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
      className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 py-4 md:px-12 transition-all duration-300"
    >
      {/* Logo */}
      <Link href="/" className="text-xl font-bold tracking-tight text-foreground">
        Noval
      </Link>

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

      {/* Contact Button */}
      <Link 
        href="#contact" 
        className="px-5 py-2 bg-foreground text-background text-xs font-bold rounded-full hover:scale-105 active:scale-95 transition-all"
      >
        Let's Talk
      </Link>
    </motion.nav>
  );
}