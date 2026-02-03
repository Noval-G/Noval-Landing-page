'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';

type Language = 'en' | 'zh';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const translations: Record<Language, Record<string, string>> = {
  en: {
    'nav.about': 'About',
    'nav.skills': 'Skills',
    'nav.collection': 'Collection',
    'nav.timeline': 'Timeline',
    'nav.talk': "Let's Talk",
    'hero.badge': 'Game Designer & Multimedia Artist',
    'hero.title': 'Crafting Digital Worlds.',
    'hero.subtitle': "Hi, I'm Noval. I blend code, art, and storytelling to create immersive interactive experiences.",
    'hero.explore': 'Explore Work',
    'hero.contact': 'Contact Me',
    'mode.studio': 'Studio',
    'mode.sanctuary': 'Sanctuary'
  },
  zh: {
    'nav.about': '關於我',
    'nav.skills': '專業技能',
    'nav.collection': '作品集',
    'nav.timeline': '經歷',
    'nav.talk': '聯絡我',
    'hero.badge': '遊戲設計師 ＆ 多媒體藝術家',
    'hero.title': '構築數位世界。',
    'hero.subtitle': '你好，我是 Noval。我將程式、藝術與敘事融合，打造沉浸式的互動體驗。',
    'hero.explore': '探索作品',
    'hero.contact': '聯絡我',
    'mode.studio': '工作模式',
    'mode.sanctuary': '心靈棲所'
  }
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguage] = useState<Language>('en');

  useEffect(() => {
    const savedLang = localStorage.getItem('language') as Language;
    if (savedLang) setLanguage(savedLang);
  }, []);

  const handleSetLanguage = (lang: Language) => {
    setLanguage(lang);
    localStorage.setItem('language', lang);
  };

  const t = (key: string) => {
    return translations[language][key] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage: handleSetLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}
