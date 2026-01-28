'use client';

import { motion } from 'framer-motion';

const education = [
  {
    year: '2020 - 2024',
    title: 'Shih Hsin University',
    subtitle: "Digital MultiMedia Art's Game Design",
    description: 'Focused on interactive media, game mechanics, and digital storytelling. Learned foundational skills in Unity, Unreal Engine, and C#.'
  }
];

const awards = [
  { 
    year: '2023 - 2024', 
    title: 'Senior Project - Special Award', 
    subtitle: 'Academic Excellence',
    description: 'Recognized for outstanding creativity and technical implementation in the final year capstone project.'
  },
  { 
    year: '2022 - 2023', 
    title: 'Special Project - Bronze Award', 
    subtitle: 'Project Competition',
    description: 'Awarded Bronze for innovative design and execution in the special project category.'
  },
  { 
    year: '2022 - 2023', 
    title: 'WirForce Fight - Champion', 
    subtitle: 'Competitive Gaming / Development',
    description: 'Achieved the Champion title at WirForce Fight, demonstrating superior strategy and skill.'
  },
  { 
    year: '2018 - 2019', 
    title: 'Hyped Design Competition - First Place', 
    subtitle: 'Design Excellence',
    description: 'Won First Place for exceptional graphic and conceptual design work.'
  },
  { 
    year: '2018 - 2019', 
    title: 'Plano de Jornalista na Escola', 
    subtitle: 'Premio de Melhor Valor Jornalistico',
    description: 'Awarded "Best Journalistic Value" in the School Journalist Plan.'
  },
  { 
    year: '2017 - 2018', 
    title: 'Macao Theatre Sports - Champion', 
    subtitle: 'Performance Art',
    description: 'Champion in Theatre Sports, highlighting improvisation and teamwork abilities.'
  },
];

export default function Timeline() {
  return (
    <section id="timeline" className="py-24 px-6 md:px-12 bg-white">
      <div className="max-w-4xl mx-auto">
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-16 text-center"
        >
          <h2 className="text-3xl font-bold tracking-tight mb-4">Journey</h2>
          <p className="text-muted">Education and recognition along the way.</p>
        </motion.div>

        <div className="relative border-l border-border ml-3 md:ml-6 space-y-12">
          {/* Education */}
          <div className="mb-12">
            <span className="absolute -left-3 bg-accent text-white px-2 py-1 text-xs font-bold rounded-md">EDU</span>
            {education.map((edu, index) => (
               <div key={index} className="ml-8 md:ml-12 relative">
                  <span className="absolute -left-[45px] md:-left-[61px] top-1 w-4 h-4 rounded-full bg-white border-4 border-accent" />
                  <span className="text-sm font-semibold text-accent mb-1 block">{edu.year}</span>
                  <h3 className="text-xl font-bold text-foreground">{edu.title}</h3>
                  <p className="text-muted font-medium mb-2">{edu.subtitle}</p>
                  <p className="text-muted/80 leading-relaxed max-w-lg">{edu.description}</p>
               </div>
            ))}
          </div>

          {/* Awards */}
          <div>
             <span className="absolute -left-3 bg-foreground text-white px-2 py-1 text-xs font-bold rounded-md">AWARD</span>
             {awards.map((award, index) => (
                <div key={index} className="ml-8 md:ml-12 mb-8 relative last:mb-0">
                   <span className="absolute -left-[45px] md:-left-[61px] top-1 w-4 h-4 rounded-full bg-white border-4 border-foreground" />
                   <span className="text-sm font-semibold text-muted mb-1 block">{award.year}</span>
                   <h3 className="text-lg font-bold text-foreground">{award.title}</h3>
                   <p className="text-sm text-muted">{award.subtitle}</p>
                </div>
             ))}
          </div>
        </div>
      </div>
    </section>
  );
}
