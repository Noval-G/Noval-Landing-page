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
    'hero.badge': 'Game Design • Creative Technology',
    'hero.title': 'Harmonizing Logic  and Lens.',
    'hero.subtitle': 'Hi, I\'m Noval. I build interactive experiences across game design, AI systems, and media production, turning complex ideas into clear, playable, and well-executed outcomes.',
    'hero.explore': 'Explore Work',
    'hero.contact': 'Contact Me',
    'hero.cv': 'Quick View CV',
    // About
    'about.badge': 'About Me',
    'about.title': 'A coordinator who blends art with technology.',
    'about.title.part1': 'A coordinator who ',
    'about.title.part2': 'blends art with technology.',
    'about.desc': 'I am a Digital Multimedia Art & Game Design graduate from Shih Hsin University with hands-on experience in game development, AI-driven interaction, multimedia production, and digital operations. I work comfortably between creative direction and technical execution, and I am at my best when turning ambiguous ideas into structured, deliverable results.',
    'about.trait.learner': 'Adaptive Learner',
    'about.trait.learner.desc': 'Quickly absorbs new tools, pipelines, and production requirements across different creative and technical contexts.',
    'about.trait.team': 'Cross-functional Coordinator',
    'about.trait.team.desc': 'Bridges creative, technical, and operational needs to keep multidisciplinary work aligned and moving.',
    'about.lang.cantonese': 'Cantonese',
    'about.lang.mandarin': 'Mandarin',
    'about.lang.english': 'English',
    'about.lang.native': 'Native',
    'about.lang.fluent': 'Fluent',
    'about.languages': 'Languages',
    // Skills
    'skills.title': 'Technical Proficiency',
    'skills.desc': 'A cross-disciplinary toolkit spanning game engines, programming, multimedia production, AI workflow design, and technical support.',
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
    'collection.desc': 'Selected work across game design, AI-driven systems, multimedia design, and video production.',
    'collection.viewLive': 'View Project',
    'collection.detailsOnRequest': 'Project details available on request',
    'collection.overview': 'Overview',
    'collection.process': 'The Process',
    'collection.clickPlay': 'Click to play preview',
    // Items
    'collection.item.game.title': 'Game Design Journey',
    'collection.item.game.category': 'Game',
    'collection.item.game.desc': 'From team-based Unity development to solo UE5 production and systems execution.',
    'collection.item.game.content': 'My game development path began with a three-month Unity team project and later evolved into "XenoVersus," a solo Unreal Engine 5 project. Through that progression, I built experience in gameplay implementation, technical iteration, and translating design intent into a playable system by working across both engine logic and production constraints.',
    'collection.item.wirforce.title': 'WirForce Fight',
    'collection.item.wirforce.category': 'Competition',
    'collection.item.wirforce.desc': 'Gundam Evolution (FPS) Champion Captain',
    'collection.item.design.title': 'Design Portfolio',
    'collection.item.design.category': 'Design',
    'collection.item.design.desc': 'Visual communication, brand sensibility, and presentation craft that support interactive work.',
    'collection.item.design.content': 'My design work informs how I structure information, shape atmosphere, and deliver a polished visual impression. Rather than treating design as a separate discipline, I use it to strengthen storytelling, presentation quality, and the overall coherence of interactive and multimedia projects.',
    'collection.item.code.title': 'Programming Portfolio',
    'collection.item.code.category': 'Programming',
    'collection.item.code.desc': 'An AI-driven social deduction project that reinterprets Werewolf as a solo-capable interactive experience.',
    'collection.item.code.content': 'Line or Lie is one of my representative programming projects, centered on reimagining Werewolf through AI-driven interaction. The goal was to preserve the tension of social deduction while allowing a single player to begin a session at any time. In this project, I focused on game flow, conversational progression, role behavior, and match pacing so that the AI would function not as a simple text responder, but as an active participant in suspicion, misdirection, and shifting table dynamics. It reflects how I use programming to connect rule systems, interactive narrative, and psychological atmosphere into a cohesive and distinctive gameplay experience.',
    'collection.item.video.title': 'Video Portfolio',
    'collection.item.video.category': 'Video',
    'collection.item.video.desc': 'Story-driven video work focused on pacing, mood, and polished execution.',
    'collection.item.video.content': 'My video work combines visual planning, shooting, editing, and emotional pacing to produce clear and engaging narratives. It reflects my ability to manage both creative expression and production execution, especially in projects where atmosphere and presentation quality matter.',
    // Timeline
    'timeline.title': 'Journey',
    'timeline.desc': 'Education, work experience, and selected recognition.',
    'timeline.edu.tag': 'EDU',
    'timeline.work.tag': 'WORK',
    'timeline.award.tag': 'AWARD',
    'timeline.edu.uni': 'Shih Hsin University',
    'timeline.edu.major': "Digital MultiMedia Art's Game Design",
    'timeline.edu.desc': 'Focused on interactive media, game mechanics, and digital storytelling. Learned foundational skills in Unity, Unreal Engine, and C#.',
    'timeline.work.mlsa': 'Macau Live',
    'timeline.work.assistant': 'Digital Media Operations Assistant',
    'timeline.work.mlsa.desc': 'Supported digital content operations, social media execution, creative asset production, and live-stream technical coordination in a fast-paced media environment.',
    'timeline.award.senior': 'Senior Project - Special Award',
    'timeline.award.academic': 'Academic Excellence',
    'timeline.award.senior.desc': 'Recognized for outstanding creativity and technical implementation in the final year capstone project.',
    'timeline.award.bronze': 'Special Project - Bronze Award',
    'timeline.award.comp': 'Project Competition',
    'timeline.award.bronze.desc': 'Awarded Bronze for innovative design and execution in the special project category.',
    'timeline.award.wirforce': 'WirForce Fight - Champion',
    'timeline.award.gaming': 'Gundam Evolution (FPS Competition)',
    'timeline.award.wirforce.desc': 'Served as Team Captain, leading the squad to victory and securing the championship in the Gundam Evolution tournament.',
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
    'contact.title': 'Open to game, creative tech, and media opportunities',
    'resume.role': 'Game Design • Creative Technology',
    'resume.summary': 'Digital Multimedia Art & Game Design graduate with hands-on experience in game development, AI-driven interaction, multimedia production, and digital operations. Strong at bridging creative intent and technical execution, with a focus on structured delivery, adaptive learning, and cross-functional collaboration.',
    'resume.experience.period': '2025.01 — 2026.03',
    'resume.experience.desc': 'Supported digital content operations, social media execution, content production, and live-stream technical coordination while working across fast-moving creative and operational needs.',
    'resume.project.lineorlie.title': 'Line or Lie | AI Social Deduction Project',
    'resume.project.lineorlie.desc': 'Designed an AI-driven Werewolf experience that enables solo play through dynamic role behavior, conversational progression, and deduction-focused pacing.',
    'resume.project.xeno.title': 'XenoVersus | UE5 Solo Project',
    'resume.project.xeno.desc': 'Built a solo Unreal Engine 5 project integrating C++ and Blueprints, demonstrating end-to-end ownership across gameplay implementation and technical iteration.',
    'resume.education.note': 'Focused on interactive media, game systems, and multimedia production.',
    'contact.email': 'Email Me',
    'contact.call': 'Call or Message',
    'contact.call.note': 'A quick WhatsApp message before calling is preferred.',
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
    'hero.badge': '遊戲設計・創意科技',
    'hero.title': '策動邏輯與光影  粹鍊創意質感',
    'hero.subtitle': '我是 Noval，專注於遊戲設計、AI 系統互動與影像製作，擅長把複雜想法整理成清楚、可執行且具完成度的互動成果。',
    'hero.explore': '閱覽作品',
    'hero.contact': '聯絡我',
    'hero.cv': '快速查看履歷',
    // About
    'about.badge': '關於我',
    'about.title': '融合藝術與科技的協調者',
    'about.title.part1': '一位融合',
    'about.title.part2': '藝術與科技的協調者。',
    'about.desc': '我畢業於世新大學數位多媒體設計學系（遊戲設計組），具備遊戲開發、AI 驅動互動、影像製作與數位營運的實作經驗。我能在創意方向與技術執行之間切換，擅長把模糊想法整理成有結構、可落地的成果。',
    'about.trait.learner': '高適應學習力',
    'about.trait.learner.desc': '能快速吸收新工具、流程與製作要求，並在不同工作情境中迅速上手。',
    'about.trait.team': '跨域協調能力',
    'about.trait.team.desc': '能串接創意、技術與營運需求，讓跨領域合作更聚焦且順暢。',
    'about.lang.cantonese': '粵語',
    'about.lang.mandarin': '國語',
    'about.lang.english': '英語',
    'about.lang.native': '母語',
    'about.lang.fluent': '流利',
    'about.languages': '語言能力',
    // Skills
    'skills.title': '技術專長',
    'skills.desc': '涵蓋遊戲引擎、程式設計、影像製作、AI 工作流與技術支援的跨域工具組合。',
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
    'collection.desc': '涵蓋遊戲設計、AI 驅動系統、多媒體設計與影像製作的代表性作品。',
    'collection.viewLive': '查看專案',
    'collection.detailsOnRequest': '專案細節可於聯絡時提供',
    'collection.overview': '專案總覽',
    'collection.process': '製作過程',
    'collection.clickPlay': '點擊預覽影片',
    // Items
    'collection.item.game.title': '遊戲開發旅程',
    'collection.item.game.category': '遊戲開發',
    'collection.item.game.desc': '從 Unity 團隊開發到 UE5 個人製作，累積遊戲系統與技術實作能力。',
    'collection.item.game.content': '我的遊戲開發歷程始於 Unity 團隊專案，之後延伸至畢業製作《XenoVersus》這個 Unreal Engine 5 個人專案。這段過程讓我累積了玩法實作、技術迭代，以及在引擎限制與製作條件中把設計構想轉化為可玩系統的能力。',
    'collection.item.wirforce.title': 'WirForce Fight - 冠軍',
    'collection.item.wirforce.category': '電競賽事',
    'collection.item.wirforce.desc': 'Gundam Evolution (FPS) 奪冠隊伍隊長',
    'collection.item.design.title': '設計作品集',
    'collection.item.design.category': '平面設計',
    'collection.item.design.desc': '以視覺溝通、品牌感與呈現品質，支撐互動與多媒體作品的整體完成度。',
    'collection.item.design.content': '我的設計能力不只用於單一視覺產出，更用來強化資訊結構、氛圍營造與整體呈現品質。對我而言，設計是串接敘事、互動與展示效果的重要基礎，而不是獨立存在的附屬元素。',
    'collection.item.code.title': '程式設計作品',
    'collection.item.code.category': '程式設計',
    'collection.item.code.desc': '以 AI 驅動互動重構狼人殺，將社交推理轉化為可單人展開的遊戲體驗。',
    'collection.item.code.content': '《Line or Lie》是我具有代表性的程式設計專案之一，核心目標是以 AI 角色互動重新詮釋狼人殺，保留社交推理的緊張感，同時讓玩家在不需湊齊人數的情況下也能隨時開局。我在這個專案中著重於遊戲流程、對話推進、角色反應與整體節奏設計，讓 AI 不只是文字回應工具，而是能參與懷疑、誤導與局勢變化的遊戲角色。這個作品體現了我如何透過程式設計，把規則系統、互動敘事與心理戰氛圍整合成具有辨識度的完整體驗。',
    'collection.item.video.title': '影像作品集',
    'collection.item.video.category': '影像製作',
    'collection.item.video.desc': '著重節奏、情緒與完成度的敘事型影像製作。',
    'collection.item.video.content': '我的影像作品結合前期規劃、拍攝、剪輯與情緒節奏控制，目標是在視覺表達與製作執行之間取得平衡。這些作品反映了我在敘事、氣氛與呈現品質上的敏感度，以及把想法落實成成品的能力。',
    // Timeline
    'timeline.title': '旅程',
    'timeline.desc': '教育背景、工作經驗與代表性榮譽。',
    'timeline.edu.tag': '學歷',
    'timeline.work.tag': '工作經歷',
    'timeline.award.tag': '獎項',
    'timeline.edu.uni': '世新大學',
    'timeline.edu.major': '數位多媒體設計學系 遊戲設計組',
    'timeline.edu.desc': '專注於互動媒體、遊戲機制與數位敘事。建立了 Unity、Unreal Engine 與 C# 的紮實基礎。',
    'timeline.work.mlsa': '澳門直播協會',
    'timeline.work.assistant': '新媒體營運助理',
    'timeline.work.mlsa.desc': '在高節奏媒體環境中支援新媒體內容營運、社群執行、素材製作與直播技術協調。',
    'timeline.award.senior': '畢業製作 - 特別獎',
    'timeline.award.academic': '學術卓越',
    'timeline.award.senior.desc': '在畢業專題製作中，因卓越的創意與技術實作能力獲得肯定。',
    'timeline.award.bronze': '專案實作 - 銅獎',
    'timeline.award.comp': '專案競賽',
    'timeline.award.bronze.desc': '在專案類別中因創新的設計與執行力獲得銅獎。',
    'timeline.award.wirforce': 'WirForce Fight - 冠軍',
    'timeline.award.gaming': 'Gundam Evolution (FPS 電競賽事)',
    'timeline.award.wirforce.desc': '擔任隊伍隊長並統籌戰術，帶領選手在 Gundam Evolution 項目中奪得全場冠軍。',
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
    'contact.title': '開放遊戲、創意科技與媒體相關職務機會',
    'resume.role': '遊戲設計・創意科技',
    'resume.summary': '具備遊戲開發、AI 驅動互動、影像製作與數位營運實作經驗的數位多媒體與遊戲設計背景人才。擅長在創意方向與技術執行之間建立連結，重視結構化交付、快速學習與跨部門協作。',
    'resume.experience.period': '2025.01 — 2026.03',
    'resume.experience.desc': '在快速變動的內容與營運需求下，支援新媒體內容營運、社群執行、內容製作與直播技術協調。',
    'resume.project.lineorlie.title': 'Line or Lie｜AI 社交推理專案',
    'resume.project.lineorlie.desc': '設計 AI 驅動的狼人殺互動體驗，透過角色行為、對話推進與推理節奏設計，讓玩家可單人展開完整對局。',
    'resume.project.xeno.title': 'XenoVersus｜UE5 個人專案',
    'resume.project.xeno.desc': '以 Unreal Engine 5 結合 C++ 與藍圖獨立完成遊戲專案，展現從玩法實作到技術迭代的端到端掌握能力。',
    'resume.education.note': '專注於互動媒體、遊戲系統與多媒體製作。',
    'contact.email': 'Email 給我',
    'contact.call': '聯絡或致電給我',
    'contact.call.note': '（建議先 WhatsApp 聯繫，以便我最快回覆您）',
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
