'use client';

import { motion } from 'framer-motion';
import { useLanguage } from '@/context/LanguageContext';

export default function Timeline() {
  const { t } = useLanguage();

  const education = [
    {
      year: '2020 - 2024',
      title: t('timeline.edu.uni'),
      subtitle: t('timeline.edu.major'),
      description: t('timeline.edu.desc')
    }
  ];

  const awards = [
    { 
      year: '2023 - 2024', 
      title: t('timeline.award.senior'), 
      subtitle: t('timeline.award.academic'),
      description: t('timeline.award.senior.desc')
    },
    { 
      year: '2022 - 2023', 
      title: t('timeline.award.bronze'), 
      subtitle: t('timeline.award.comp'),
      description: t('timeline.award.bronze.desc')
    },
    { 
      year: '2022 - 2023', 
      title: t('timeline.award.wirforce'), 
      subtitle: t('timeline.award.gaming'),
      description: t('timeline.award.wirforce.desc')
    },
    { 
      year: '2018 - 2019', 
      title: t('timeline.award.hyped'), 
      subtitle: t('timeline.award.design'),
      description: t('timeline.award.hyped.desc')
    },
    { 
      year: '2018 - 2019', 
      title: t('timeline.award.plano'), 
      subtitle: t('timeline.award.plano.sub'),
      description: t('timeline.award.plano.desc')
    },
    { 
      year: '2017 - 2018', 
      title: t('timeline.award.macao'), 
      subtitle: t('timeline.award.perf'),
      description: t('timeline.award.macao.desc')
    },
  ];

  return (
    <section id="timeline" className="py-24 px-6 md:px-12 bg-white">
      <div className="max-w-4xl mx-auto">
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-16 text-center"
        >
          <h2 className="text-3xl font-bold tracking-tight mb-4">{t('timeline.title')}</h2>
          <p className="text-muted">{t('timeline.desc')}</p>
        </motion.div>

        <div className="relative border-l border-border ml-3 md:ml-6 space-y-12">
          {/* Education */}
          <div className="mb-12">
            <span className="absolute -left-3 bg-accent text-white px-2 py-1 text-xs font-bold rounded-md">{t('timeline.edu.tag')}</span>
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
             <span className="absolute -left-3 bg-foreground text-white px-2 py-1 text-xs font-bold rounded-md">{t('timeline.award.tag')}</span>
             {awards.map((award, index) => (
                <div key={index} className="ml-8 md:ml-12 mb-8 relative last:mb-0">
                   <span className="absolute -left-[45px] md:-left-[61px] top-1 w-4 h-4 rounded-full bg-white border-4 border-foreground" />
                   <span className="text-sm font-semibold text-muted mb-1 block">{award.year}</span>
                   <h3 className="text-lg font-bold text-foreground">{award.title}</h3>
                   <p className="text-sm text-muted">{award.subtitle}</p>
                   <p className="text-xs text-muted/80 mt-1">{award.description}</p>
                </div>
             ))}
          </div>
        </div>
      </div>
    </section>
  );
}
