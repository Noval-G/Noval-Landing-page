'use client';

import { motion } from 'framer-motion';
import { Gamepad2, Code, Video, PenTool, Terminal, Cpu } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';

export default function Skills() {
  const { t } = useLanguage();

  const skills = [
    { name: t('skills.unreal'), icon: Gamepad2, level: t('skills.level.adv') },
    { name: t('skills.unity'), icon: Cpu, level: t('skills.level.adv') },
    { name: t('skills.csharp'), icon: Code, level: t('skills.level.int') },
    { name: t('skills.python'), icon: Terminal, level: t('skills.level.int') },
    { name: t('skills.premiere'), icon: Video, level: t('skills.level.exp') },
    { name: t('skills.photoshop'), icon: PenTool, level: t('skills.level.exp') },
    { name: t('skills.prompt'), icon: Terminal, level: t('skills.level.spec') },
    { name: t('skills.qa'), icon: Gamepad2, level: t('skills.level.experienced') },
    { name: t('skills.video'), icon: Video, level: t('skills.level.oma') },
    { name: t('skills.repair'), icon: Cpu, level: t('skills.level.hw') },
  ];

  return (
    <section id="skills" className="py-24 px-6 md:px-12 bg-background">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-12"
        >
          <h2 className="text-3xl font-bold tracking-tight mb-4">{t('skills.title')}</h2>
          <p className="text-muted max-w-2xl">{t('skills.desc')}</p>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
          {skills.map((skill, index) => (
            <motion.div
              key={skill.name}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              className="flex flex-col items-center justify-center p-6 bg-white rounded-2xl shadow-sm hover:shadow-md transition-shadow group border border-transparent hover:border-accent/10"
            >
              <div className="p-4 bg-gray-50 rounded-full mb-4 text-foreground group-hover:text-accent group-hover:bg-accent/10 transition-colors">
                <skill.icon size={28} />
              </div>
              <h3 className="font-semibold text-sm text-center">{skill.name}</h3>
              <span className="text-xs text-muted mt-1">{skill.level}</span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
