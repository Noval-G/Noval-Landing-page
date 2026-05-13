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
    'about.title': 'A technical problem-solver who bridges systems and production.',
    'about.title.part1': 'A technical problem-solver who ',
    'about.title.part2': 'bridges systems and production.',
    'about.desc': 'I am a Digital Multimedia Art & Game Design graduate whose work naturally lives between live production, interactive systems, and technical execution. From stabilizing livestream setups and troubleshooting hardware to building full-stack AI projects, I am consistently drawn to the part of creative work where systems must stay reliable under pressure. I learn quickly, adapt with ease, and take satisfaction in turning complexity into something steady, usable, and well resolved.',
    'about.trait.learner': 'Fast Technical Learner',
    'about.trait.learner.desc': 'Quickly picks up unfamiliar tools, production pipelines, and system workflows, then turns them into reliable execution.',
    'about.trait.team': 'Adaptive Troubleshooter',
    'about.trait.team.desc': 'Diagnoses hardware, software, and workflow issues in fast-paced production environments and restores stable operation.',
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
    'collection.desc': 'Selected work across IT-fluent production support, AI-driven systems, solo game development, and multimedia execution.',
    'collection.viewLive': 'View Project',
    'collection.detailsOnRequest': 'Project details available on request',
    'collection.overview': 'Overview',
    'collection.process': 'The Process',
    'collection.clickPlay': 'Click to play preview',
    // Items
    'collection.item.game.title': 'Game Design Journey',
    'collection.item.game.category': 'Game',
    'collection.item.game.desc': 'A solo UE5 project uniting scene construction, movement systems, combat logic, and visual effects in one production.',
    'collection.item.game.content': 'XenoVersus was independently built from the ground up in Unreal Engine 5. I was responsible for scene construction, camera transitions, character setup, Niagara effects, damage calculation logic, level-state logic, and a parkour movement system. More than a student project, it became a clear demonstration of how I approach technical ownership: by bringing visual presentation, gameplay structure, and systems logic into a single coherent experience.',
    'collection.item.wirforce.title': 'WirForce Fight',
    'collection.item.wirforce.category': 'Competition',
    'collection.item.wirforce.desc': 'Gundam Evolution (FPS) Champion Captain',
    'collection.item.design.title': 'Design Portfolio',
    'collection.item.design.category': 'Design',
    'collection.item.design.desc': 'Visual communication, brand sensibility, and presentation craft that support interactive work.',
    'collection.item.design.content': 'My design work informs how I structure information, shape atmosphere, and deliver a polished visual impression. Rather than treating design as a separate discipline, I use it to strengthen storytelling, presentation quality, and the overall coherence of interactive and multimedia projects.',
    'collection.item.code.title': 'Programming Portfolio',
    'collection.item.code.category': 'Programming',
    'collection.item.code.desc': 'A solo full-stack AI social deduction project built across frontend, backend, real-time sync, and model integration.',
    'collection.item.code.content': 'Line or Lie is a project I designed and developed end to end around a single question: how can Werewolf-style deduction feel alive in a solo AI-driven format? It is built with TypeScript, React + Vite, Zustand, Socket.IO, Node.js, and Express, with DeepSeek powering role interaction and dialogue. Shared types keep data aligned across the stack. Among my projects, this is the clearest expression of my ability to combine interface design, networking, game logic, and AI behavior into a product that feels both technical and playable.',
    'collection.item.video.title': 'Video Portfolio',
    'collection.item.video.category': 'Video',
    'collection.item.video.desc': 'Story-driven video work focused on pacing, mood, and polished execution.',
    'collection.item.video.content': 'My video work combines visual planning, shooting, editing, and emotional pacing to produce clear and engaging narratives. It reflects my ability to manage both creative expression and production execution, especially in projects where atmosphere and presentation quality matter.',
    // Timeline
    'timeline.title': 'Journey',
    'timeline.desc': 'Education, technical work experience, and selected recognition.',
    'timeline.edu.tag': 'EDU',
    'timeline.work.tag': 'WORK',
    'timeline.award.tag': 'AWARD',
    'timeline.edu.uni': 'Shih Hsin University',
    'timeline.edu.major': "Digital MultiMedia Art's Game Design",
    'timeline.edu.desc': 'Focused on interactive media, game mechanics, and digital storytelling. Learned foundational skills in Unity, Unreal Engine, and C#.',
    'timeline.work.mlsa': 'Macau Live',
    'timeline.work.assistant': 'Digital Media Operations Assistant',
    'timeline.work.mlsa.desc': 'Supported the livestream program "Boss Take Your Seat" across guest coordination, teaser production, pre-show equipment setup, OBS control, and live comment monitoring. Also contributed to CTM livestreams and "Journey Across the Miles", including field shoots in Portugal, Xinjiang, and Quanzhou, while handling system bugs, hardware troubleshooting, and upgrade planning to keep production workflows stable.',
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
    'contact.title': 'Open to work where systems, people, and execution must move as one',
    'resume.role': 'Technical Integration • Creative Systems',
    'resume.summary': 'Cross-disciplinary technical generalist with hands-on experience in livestream setup, OBS control, hardware troubleshooting, system bug resolution, computer repair and upgrade planning, video production, and full-stack interactive project development. My strength lies in keeping hardware, software, and execution aligned, especially in environments where calm problem-solving and fast adaptation directly affect delivery quality.',
    'resume.experience.period': '2025.01 — 2026.03',
    'resume.experience.desc': 'Handled guest coordination, teaser filming and editing, and pre-show equipment setup for "Boss Take Your Seat", while operating OBS and live comment monitoring during broadcasts. Also supported CTM livestreams and "Journey Across the Miles" through field shooting, backstage editing, system bug handling, hardware troubleshooting, and upgrade planning.',
    'resume.project.lineorlie.title': 'Line or Lie | AI Social Deduction Project',
    'resume.project.lineorlie.desc': 'Designed and built a solo full-stack AI Werewolf project using TypeScript, React + Vite, Zustand, Socket.IO, Node.js, Express, shared types, and DeepSeek API integration.',
    'resume.project.xeno.title': 'XenoVersus | UE5 Solo Project',
    'resume.project.xeno.desc': 'Built a solo UE5 project spanning scene assembly, camera transitions, character setup, Niagara effects, damage logic, level logic, and parkour systems.',
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
    'about.title': '能串接系統與製作流程的技術型問題解決者',
    'about.title.part1': '一位能串接',
    'about.title.part2': '系統與製作流程的技術型問題解決者。',
    'about.desc': '我畢業於世新大學數位多媒體設計學系（遊戲設計組），一路走來的工作與創作，常常落在直播現場、互動系統與技術執行的交界。從穩定直播流程、排解硬體與系統問題，到獨立完成 AI 與遊戲專案，我始終很著迷於那些必須在壓力之下仍然維持穩定的技術細節。我學得快，也習慣在混亂中把問題梳理清楚，讓系統、內容與現場節奏重新回到正軌。',
    'about.trait.learner': '強學習型技術者',
    'about.trait.learner.desc': '能快速掌握陌生工具、工作流程與系統操作，並轉化為可重複執行的技術能力。',
    'about.trait.team': '高適應排錯能力',
    'about.trait.team.desc': '面對直播、系統或製作流程中的硬體與軟體問題，能迅速判斷原因並恢復穩定運作。',
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
    'collection.desc': '涵蓋 IT 技術支援、AI 驅動系統、遊戲開發與多媒體執行的代表性作品。',
    'collection.viewLive': '查看專案',
    'collection.detailsOnRequest': '專案細節可於聯絡時提供',
    'collection.overview': '專案總覽',
    'collection.process': '製作過程',
    'collection.clickPlay': '點擊預覽影片',
    // Items
    'collection.item.game.title': '遊戲開發旅程',
    'collection.item.game.category': '遊戲開發',
    'collection.item.game.desc': '一人完成的 UE5 專案，將場景搭建、移動系統、戰鬥邏輯與視覺效果整合在同一套體驗中。',
    'collection.item.game.content': '《XenoVersus》是我獨立從 0 完成的 Unreal Engine 5 專案。我實際負責場景搭建、攝影轉場、人物模型處理、Niagara 特效、傷害計算邏輯、遊戲關卡判斷邏輯，以及跑酷系統搭建。對我而言，它不只是畢業作品，更像是一個能完整體現我如何把視覺呈現、玩法節奏與技術邏輯收束成同一個遊戲體驗的代表作。',
    'collection.item.wirforce.title': 'WirForce Fight - 冠軍',
    'collection.item.wirforce.category': '電競賽事',
    'collection.item.wirforce.desc': 'Gundam Evolution (FPS) 奪冠隊伍隊長',
    'collection.item.design.title': '設計作品集',
    'collection.item.design.category': '平面設計',
    'collection.item.design.desc': '以視覺溝通、品牌感與呈現品質，支撐互動與多媒體作品的整體完成度。',
    'collection.item.design.content': '我的設計能力不只用於單一視覺產出，更用來強化資訊結構、氛圍營造與整體呈現品質。對我而言，設計是串接敘事、互動與展示效果的重要基礎，而不是獨立存在的附屬元素。',
    'collection.item.code.title': '程式設計作品',
    'collection.item.code.category': '程式設計',
    'collection.item.code.desc': '由我一人設計與開發的全端 AI 狼人殺，橫跨前端、後端、即時同步與模型互動。',
    'collection.item.code.content': '《Line or Lie》是由我個人一手設計與開發的 AI 狼人殺專案。這個 project 以 TypeScript 為主要語言，前端使用 React + Vite 建構互動介面，並以 Zustand 管理狀態；即時對戰與遊戲同步透過 Socket.IO 實作，後端則以 Node.js + Express 負責遊戲流程、規則控制與連線管理。AI 對話與角色互動整合 DeepSeek API，並透過 shared 共用型別維持前後端資料一致。若要說哪個作品最能體現我的多技術整合能力，這個專案應該是最直接也最完整的一個例子。',
    'collection.item.video.title': '影像作品集',
    'collection.item.video.category': '影像製作',
    'collection.item.video.desc': '著重節奏、情緒與完成度的敘事型影像製作。',
    'collection.item.video.content': '我的影像作品結合前期規劃、拍攝、剪輯與情緒節奏控制，目標是在視覺表達與製作執行之間取得平衡。這些作品反映了我在敘事、氣氛與呈現品質上的敏感度，以及把想法落實成成品的能力。',
    // Timeline
    'timeline.title': '旅程',
    'timeline.desc': '教育背景、技術工作經驗與代表性榮譽。',
    'timeline.edu.tag': '學歷',
    'timeline.work.tag': '工作經歷',
    'timeline.award.tag': '獎項',
    'timeline.edu.uni': '世新大學',
    'timeline.edu.major': '數位多媒體設計學系 遊戲設計組',
    'timeline.edu.desc': '專注於互動媒體、遊戲機制與數位敘事。建立了 Unity、Unreal Engine 與 C# 的紮實基礎。',
    'timeline.work.mlsa': '澳門直播協會',
    'timeline.work.assistant': '新媒體營運助理',
    'timeline.work.mlsa.desc': '支援《老細埋位》來賓聯絡、預熱短片拍攝剪輯、直播前器材架設，以及直播中的 OBS 操作與留言監看；同時參與澳門 CTM 直播與《濠行千里》拍攝，處理系統 bug、硬體排錯與升級規劃，讓現場與製作流程維持穩定運作。',
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
    'contact.title': '期待投入那些同時需要技術穩定、現場判斷與內容溫度的工作',
    'resume.role': '技術整合・創意系統',
    'resume.summary': '我是一位跨域的技術整合型工作者，具備直播系統架設、OBS 中控、硬體排錯、系統 bug 處理、電腦維修與升級規劃、影像製作，以及互動專案全端開發經驗。比起單一工具本身，我更在意的是如何讓硬體、軟體與現場流程彼此咬合，讓事情在高壓之下依然穩定、清晰而可靠，並最終轉化成可被信任的執行成果。',
    'resume.experience.period': '2025.01 — 2026.03',
    'resume.experience.desc': '負責《老細埋位》來賓聯絡、預熱短片拍攝剪輯與直播前器材架設，直播時操作 OBS 與留言監看；亦支援澳門 CTM 直播及《濠行千里》拍攝，處理系統 bug、硬體排錯與升級規劃，確保直播與拍攝流程穩定推進。',
    'resume.project.lineorlie.title': 'Line or Lie｜AI 社交推理專案',
    'resume.project.lineorlie.desc': '由我一人完成的全端 AI 狼人殺，整合 TypeScript、React + Vite、Zustand、Socket.IO、Node.js、Express、shared types 與 DeepSeek API。',
    'resume.project.xeno.title': 'XenoVersus｜UE5 個人專案',
    'resume.project.xeno.desc': '獨立完成 UE5 專案，涵蓋場景搭建、攝影轉場、人物模型、Niagara 特效、傷害邏輯、關卡判斷與跑酷系統。',
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
