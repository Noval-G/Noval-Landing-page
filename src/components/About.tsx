'use client';

import { motion } from 'framer-motion';
import { Languages, Zap, Users } from 'lucide-react';

const traits = [
  {
    icon: Zap,
    title: "Quick Learner",
    text: "Exceptional ability to master new technologies and design tools in record time."
  },
  {
    icon: Users,
    title: "Team Coordinator",
    text: "Highly efficient at collaborating and coordinating within multidisciplinary teams."
  }
];

const languages = [
  { name: "Cantonese", level: "Native" },
  { name: "Mandarin", level: "Native" },
  { name: "English", level: "Fluent" }
];

export default function About() {
  return (
    <section id="about" className="py-24 px-6 md:px-12 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          
          {/* Left: Text Content */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-sm font-bold tracking-widest uppercase text-accent mb-4">About Me</h2>
            <h3 className="text-4xl md:text-5xl font-bold mb-8 leading-tight">
              A coordinator who <span className="text-muted">blends art with technology.</span>
            </h3>
            <p className="text-lg text-muted mb-10 leading-relaxed">
              I am a Digital Multimedia Art & Game Design graduate from Shih Hsin University. 
              My journey is driven by the passion to create interactive experiences that are not just playable, 
              but emotionally resonant. I excel in multitasking and thrive in high-paced environments.
            </p>

            <div className="space-y-6">
              {traits.map((trait) => (
                <div key={trait.title} className="flex gap-4">
                  <div className="flex-shrink-0 w-12 h-12 bg-accent/5 rounded-2xl flex items-center justify-center text-accent">
                    <trait.icon size={24} />
                  </div>
                  <div>
                    <h4 className="font-bold text-foreground">{trait.title}</h4>
                    <p className="text-muted text-sm">{trait.text}</p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Right: Languages & Visual */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative p-8 bg-background rounded-[2.5rem] border border-border"
          >
            <div className="flex items-center gap-3 mb-8">
              <Languages className="text-accent" />
              <h4 className="text-xl font-bold">Languages</h4>
            </div>
            
            <div className="space-y-6">
              {languages.map((lang) => (
                <div key={lang.name}>
                  <div className="flex justify-between mb-2">
                    <span className="font-medium">{lang.name}</span>
                    <span className="text-accent text-sm font-bold">{lang.level}</span>
                  </div>
                  <div className="h-2 w-full bg-gray-100 rounded-full overflow-hidden">
                    <motion.div 
                      initial={{ width: 0 }}
                      whileInView={{ width: "100%" }}
                      viewport={{ once: true }}
                      transition={{ duration: 1, delay: 0.5 }}
                      className="h-full bg-accent rounded-full" 
                    />
                  </div>
                </div>
              ))}
            </div>

            {/* Decorative Element */}
            <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-accent/10 rounded-full blur-2xl -z-10" />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
