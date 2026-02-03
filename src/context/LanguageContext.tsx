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
    // Nav
    'nav.about': 'About',
    'nav.skills': 'Skills',
    'nav.collection': 'Collection',
    'nav.timeline': 'Timeline',
    'nav.talk': "Let's Talk",
    // Mode
    'mode.studio': 'Studio',
    'mode.sanctuary': 'Sanctuary',
    // Hero
    'hero.badge': 'Game Designer & Multimedia Artist',
    'hero.title': 'Crafting Digital Worlds.',
    'hero.subtitle': "Hi, I'm Noval. I blend code, art, and storytelling to create immersive interactive experiences.",
    'hero.explore': 'Explore Work',
    'hero.contact': 'Contact Me',
    // About
    'about.badge': 'About Me',
    'about.title': 'A coordinator who blends art with technology.',
    'about.title.part1': 'A coordinator who ',
    'about.title.part2': 'blends art with technology.',
    'about.desc': 'I am a Digital Multimedia Art & Game Design graduate from Shih Hsin University. My journey is driven by the passion to create interactive experiences that are not just playable, but emotionally resonant. I excel in multitasking and thrive in high-paced environments.',
    'about.trait.learner': 'Quick Learner',
    'about.trait.learner.desc': 'Exceptional ability to master new technologies and design tools in record time.',
    'about.trait.team': 'Team Coordinator',
    'about.trait.team.desc': 'Highly efficient at collaborating and coordinating within multidisciplinary teams.',
    'about.lang.cantonese': 'Cantonese',
    'about.lang.mandarin': 'Mandarin',
    'about.lang.english': 'English',
    'about.lang.native': 'Native',
    'about.lang.fluent': 'Fluent',
    'about.languages': 'Languages',
    // Skills
    'skills.title': 'Technical Proficiency',
    'skills.desc': 'Tools and technologies I use to bring ideas to life.',
    'skills.unreal': 'Unreal Engine',
    'skills.unity': 'Unity',
    'skills.csharp': 'C#',
    'skills.python': 'Python',
    'skills.premiere': 'Adobe Premiere',
    'skills.photoshop': 'Adobe Photoshop',
    'skills.prompt': 'Prompt Engineering',
    'skills.qa': 'Game QA/Testing',
    'skills.video': 'Video Shooting',
    'skills.repair': 'Computer Repair',
    'skills.level.adv': 'Advanced',
    'skills.level.int': 'Intermediate',
    'skills.level.exp': 'Expert',
    'skills.level.spec': 'Specialist',
    'skills.level.experienced': 'Experienced',
    'skills.level.oma': 'One Man Army',
    'skills.level.hw': 'Hardware',
    // Collection
    'collection.title': 'Selected Collection',
    'collection.desc': 'A curated selection of my work in game design, multimedia art, and video production.',
    'collection.viewLive': 'View Live Project',
    'collection.overview': 'Overview',
    'collection.process': 'The Process',
    'collection.clickPlay': 'Click to play preview',
    // Timeline
    'timeline.title': 'Journey',
    'timeline.desc': 'Education and recognition along the way.',
    'timeline.edu.tag': 'EDU',
    'timeline.award.tag': 'AWARD',
    'timeline.edu.uni': 'Shih Hsin University',
    'timeline.edu.major': "Digital MultiMedia Art's Game Design",
    'timeline.edu.desc': 'Focused on interactive media, game mechanics, and digital storytelling. Learned foundational skills in Unity, Unreal Engine, and C#.',
    'timeline.award.senior': 'Senior Project - Special Award',
    'timeline.award.academic': 'Academic Excellence',
    'timeline.award.senior.desc': 'Recognized for outstanding creativity and technical implementation in the final year capstone project.',
    'timeline.award.bronze': 'Special Project - Bronze Award',
    'timeline.award.comp': 'Project Competition',
    'timeline.award.bronze.desc': 'Awarded Bronze for innovative design and execution in the special project category.',
    'timeline.award.wirforce': 'WirForce Fight - Champion',
    'timeline.award.gaming': 'Competitive Gaming / Development',
    'timeline.award.wirforce.desc': 'Achieved the Champion title at WirForce Fight, demonstrating superior strategy and skill.',
    'timeline.award.hyped': 'Hyped Design Competition - First Place',
    'timeline.award.design': 'Design Excellence',
    'timeline.award.hyped.desc': 'Won First Place for exceptional graphic and conceptual design work.',
    'timeline.award.plano': 'Plano de Jornalista na Escola',
    'timeline.award.plano.sub': 'Premio de Melhor Valor Jornalistico',
    'timeline.award.plano.desc': 'Awarded "Best Journalistic Value" in the School Journalist Plan.',
    'timeline.award.macao': 'Macao Theatre Sports - Champion',
    'timeline.award.perf': 'Performance Art',
    'timeline.award.macao.desc': 'Champion in Theatre Sports, highlighting improvisation and teamwork abilities.',
    // Contact
    'contact.title': "Let's Create Something Amazing",
    'contact.email': 'Email Me',
    'contact.call': 'Call Me',
    'contact.copy': 'Copy Email',
    'contact.copied': 'Copied!',
    'contact.rights': 'All rights reserved.'
  },
  zh: {
    // Nav
    'nav.about': '關於我',
    'nav.skills': '專業技能',
    'nav.collection': '作品集',
    'nav.timeline': '經歷',
    'nav.talk': '聯絡我',
    // Mode
    'mode.studio': '工作模式',
    'mode.sanctuary': '心靈棲所',
    // Hero
    'hero.badge': '遊戲設計師 ＆ 多媒體藝術家',
    'hero.title': '虛實交織，演繹數位幻境。',
    'hero.subtitle': '你好，我是 Noval。我將程式、藝術與敘事融合，打造沉浸式的互動體驗。',
    'hero.explore': '探索作品',
    'hero.contact': '聯絡我',
    // About
    'about.badge': '關於我',
    'about.title': '融合藝術與科技的協調者',
    'about.title.part1': '一位融合',
    'about.title.part2': '藝術與科技的協調者。',
    'about.desc': '我畢業於世新大學數位多媒體設計學系（遊戲設計組）。我的創作旅程源於對創造互動體驗的熱情——不僅是可玩的遊戲，更是能引起情感共鳴的作品。我擅長多工處理，並能在快節奏的環境中茁壯成長。',
    'about.trait.learner': '快速學習者',
    'about.trait.learner.desc': '具備在極短時間內掌握新技術與設計工具的卓越能力。',
    'about.trait.team': '團隊協調者',
    'about.trait.team.desc': '在跨領域團隊中展現高效的溝通協作與統籌能力。',
    'about.lang.cantonese': '粵語',
    'about.lang.mandarin': '國語',
    'about.lang.english': '英語',
    'about.lang.native': '母語',
    'about.lang.fluent': '流利',
    'about.languages': '語言能力',
    // Skills
    'skills.title': '技術專長',
    'skills.desc': '我用來將創意轉化為現實的工具與技術。',
    'skills.unreal': 'Unreal Engine',
    'skills.unity': 'Unity',
    'skills.csharp': 'C#',
    'skills.python': 'Python',
    'skills.premiere': 'Adobe Premiere',
    'skills.photoshop': 'Adobe Photoshop',
    'skills.prompt': 'AI 提示工程',
    'skills.qa': '遊戲 QA 測試',
    'skills.video': '動態攝影',
    'skills.repair': '電腦硬體維修',
    'skills.level.adv': '進階',
    'skills.level.int': '中等',
    'skills.level.exp': '專家',
    'skills.level.spec': '專精',
    'skills.level.experienced': '豐富經驗',
    'skills.level.oma': '獨立作業',
    'skills.level.hw': '硬體',
    // Collection
    'collection.title': '精選作品',
    'collection.desc': '在遊戲設計、多媒體藝術與影像製作領域的精選創作。',
    'collection.viewLive': '查看專案',
    'collection.overview': '專案總覽',
    'collection.process': '製作過程',
    'collection.clickPlay': '點擊預覽影片',
    // Timeline
    'timeline.title': '旅程',
    'timeline.desc': '教育背景與榮譽肯定。',
    'timeline.edu.tag': '學歷',
    'timeline.award.tag': '獎項',
    'timeline.edu.uni': '世新大學',
    'timeline.edu.major': '數位多媒體設計學系 遊戲設計組',
    'timeline.edu.desc': '專注於互動媒體、遊戲機制與數位敘事。建立了 Unity、Unreal Engine 與 C# 的紮實基礎。',
    'timeline.award.senior': '畢業製作 - 特別獎',
    'timeline.award.academic': '學術卓越',
    'timeline.award.senior.desc': '在畢業專題製作中，因卓越的創意與技術實作能力獲得肯定。',
    'timeline.award.bronze': '專案實作 - 銅獎',
    'timeline.award.comp': '專案競賽',
    'timeline.award.bronze.desc': '在專案類別中因創新的設計與執行力獲得銅獎。',
    'timeline.award.wirforce': 'WirForce Fight - 冠軍',
    'timeline.award.gaming': '競技電競 / 開發',
    'timeline.award.wirforce.desc': '在 WirForce Fight 中奪得冠軍頭銜，展現了卓越的策略與技巧。',
    'timeline.award.hyped': 'Hyped 設計競賽 - 第一名',
    'timeline.award.design': '設計卓越',
    'timeline.award.hyped.desc': '憑藉出色的平面與概念設計作品獲得第一名。',
    'timeline.award.plano': '校園記者計畫',
    'timeline.award.plano.sub': '最佳新聞價值獎',
    'timeline.award.plano.desc': '在校園記者計畫中榮獲「最佳新聞價值」獎項。',
    'timeline.award.macao': '澳門劇場運動 - 冠軍',
    'timeline.award.perf': '表演藝術',
    'timeline.award.macao.desc': '在劇場運動比賽中奪冠，展現即興表演與團隊合作能力。',
    // Contact
    'contact.title': '一起創造驚豔的作品',
    'contact.email': 'Email 給我',
    'contact.call': '致電給我',
    'contact.copy': '複製 Email',
    'contact.copied': '已複製！',
    'contact.rights': '保留所有權利。'
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
