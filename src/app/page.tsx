import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import About from '@/components/About';
import Skills from '@/components/Skills';
import Timeline from '@/components/Timeline';
import Collection from '@/components/Collection';
import Contact from '@/components/Contact';

export default function Home() {
  return (
    <main className="relative bg-background text-foreground min-h-screen">
      <Navbar />
      <Hero />
      <About />
      <Skills />
      <Collection />
      <Timeline />
      <Contact />
    </main>
  );
}
