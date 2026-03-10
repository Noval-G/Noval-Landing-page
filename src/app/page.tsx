'use client';

import { useState } from 'react';
import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import About from '@/components/About';
import Skills from '@/components/Skills';
import Timeline from '@/components/Timeline';
import Collection from '@/components/Collection';
import Contact from '@/components/Contact';
import CVModal from '@/components/CVModal';

export default function Home() {
  const [isCVOpen, setIsCVOpen] = useState(false);

  return (
    <main className="relative bg-background text-foreground min-h-screen">
      <Navbar />
      <Hero onOpenCV={() => setIsCVOpen(true)} />
      <About />
      <Skills />
      <Collection />
      <Timeline />
      <Contact onOpenCV={() => setIsCVOpen(true)} />
      
      {/* 全網頁唯一的簡歷實例 */}
      <CVModal isOpen={isCVOpen} onClose={() => setIsCVOpen(false)} />
    </main>
  );
}
