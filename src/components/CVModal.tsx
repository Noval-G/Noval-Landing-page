'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { X, Printer, Mail, Phone, Award, Briefcase, GraduationCap, Zap, Code, Camera, Layout } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';

interface CVModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function CVModal({ isOpen, onClose }: CVModalProps) {
  const { t, language } = useLanguage();

  const handlePrint = () => {
    window.print();
  };

  const skillGroups = [
    { label: 'Engine', icon: <Code size={10} />, items: ['UE5 (C++/BP)', 'Unity (C#)'] },
    { label: 'Media', icon: <Camera size={10} />, items: ['Adobe PR / PS', 'Shooting'] },
    { label: 'Tech', icon: <Zap size={10} />, items: ['AI Prompt', 'Game QA'] }
  ];

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/80 backdrop-blur-md z-[100] no-print"
          />

          {/* Modal Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.98, y: 30 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.98, y: 30 }}
            className="fixed inset-0 z-[101] flex items-center justify-center p-2 pointer-events-none no-print"
          >
            <div className="bg-white w-full max-w-6xl h-full max-h-[95vh] rounded-[2rem] shadow-2xl overflow-hidden flex flex-col pointer-events-auto border border-white/20">
              
              {/* Premium Toolbar */}
              <div className="px-8 py-4 bg-zinc-900 flex justify-between items-center text-white">
                <div className="flex items-center gap-3">
                   <div className="w-2 h-2 bg-accent rounded-full animate-pulse" />
                   <span className="text-xs font-bold tracking-[0.3em] uppercase opacity-70">
                     {language === 'zh' ? '專業履歷預覽' : 'Professional Resume Preview'}
                   </span>
                </div>
                <div className="flex items-center gap-4">
                  <button 
                    onClick={handlePrint}
                    className="flex items-center gap-2 px-5 py-2 bg-accent text-white rounded-full text-sm font-bold hover:brightness-110 transition-all active:scale-95 shadow-lg shadow-accent/20"
                  >
                    <Printer size={16} />
                    {language === 'zh' ? '列印 / 存為 PDF' : 'Print / Save PDF'}
                  </button>
                  <button 
                    onClick={onClose}
                    className="p-2 bg-white/10 text-white rounded-full hover:bg-white/20 transition-all"
                  >
                    <X size={20} />
                  </button>
                </div>
              </div>

              {/* CV Content Area */}
              <div className="flex-1 overflow-y-auto p-4 md:p-12 bg-zinc-100 flex justify-center custom-scrollbar">
                
                {/* The RE-DESIGNED A4 (Masterpiece Version) */}
                <div id="cv-content" className="bg-white w-[210mm] min-h-[297mm] shadow-2xl p-[15mm] md:p-[20mm] text-gray-800 flex flex-col gap-8 origin-top scale-[0.5] sm:scale-[0.75] md:scale-[0.9] lg:scale-100 transition-transform box-border overflow-hidden">
                  
                  {/* Header: Centered & Clean */}
                  <header className="text-center border-b-2 border-gray-50 pb-8">
                    <h1 className="text-5xl font-black tracking-tighter text-gray-900 mb-2">IEONG HOI LONG</h1>
                    <div className="flex justify-center items-center gap-4 text-accent font-bold mb-6">
                      <span className="text-xl">NOVAL</span>
                      <div className="w-1.5 h-1.5 bg-gray-200 rounded-full" />
                      <span className="text-sm uppercase tracking-[0.3em] text-gray-400 font-black">{t('hero.badge')}</span>
                    </div>
                    
                    <div className="flex justify-center gap-10 text-[12px] font-bold text-gray-600">
                      <span className="flex items-center gap-2 px-4 py-1.5 bg-zinc-50 rounded-full border border-zinc-100"><Mail size={14} className="text-accent" /> sofreeai@gmail.com</span>
                      <span className="flex items-center gap-2 px-4 py-1.5 bg-zinc-50 rounded-full border border-zinc-100"><Phone size={14} className="text-accent" /> +853 63939694</span>
                    </div>
                  </header>

                  <div className="grid grid-cols-12 gap-10 flex-1">
                    
                    {/* Main Column (Left 8) */}
                    <div className="col-span-8 space-y-10 pr-2">
                      
                      {/* Work Experience */}
                      <section>
                        <h3 className="text-[11px] font-black uppercase tracking-[0.3em] text-gray-300 mb-6 flex items-center gap-3">
                           <Briefcase size={16} className="text-accent" /> {language === 'zh' ? '工作經歷' : 'Professional Experience'}
                        </h3>
                        <div className="relative pl-8 border-l-4 border-zinc-50">
                           <div className="absolute -left-[10px] top-0 w-4 h-4 bg-white border-4 border-accent rounded-full shadow-sm" />
                           <div className="flex justify-between items-start mb-2">
                             <h4 className="text-xl font-black text-gray-900 leading-tight">{t('timeline.work.mlsa')}</h4>
                             <span className="text-[10px] font-black bg-zinc-900 text-white px-2 py-1 rounded uppercase tracking-widest">2025 — 2026</span>
                           </div>
                           <p className="text-[12px] font-bold text-accent uppercase mb-4 tracking-widest">{t('timeline.work.assistant')}</p>
                           <p className="text-[12px] leading-[1.8] text-gray-600 font-medium">{t('timeline.work.mlsa.desc')}</p>
                        </div>
                      </section>

                      {/* Selected Projects */}
                      <section>
                        <h3 className="text-[11px] font-black uppercase tracking-[0.3em] text-gray-300 mb-6 flex items-center gap-3">
                           <Layout size={16} className="text-accent" /> {language === 'zh' ? '精選專案' : 'Selected Projects'}
                        </h3>
                        <div className="grid grid-cols-1 gap-5">
                           <div className="group bg-zinc-50 p-6 rounded-[2rem] border border-zinc-100 relative overflow-hidden transition-all hover:bg-zinc-100/50">
                              <h4 className="text-[14px] font-black text-gray-900 mb-2 uppercase tracking-tight">XenoVersus | UE5 Solo Development</h4>
                              <p className="text-[11px] leading-[1.8] text-gray-500 font-medium italic">
                                {language === 'zh' ? '獨自開發的動作冒險遊戲，深度整合 C++ 與藍圖系統，展現完整的技術研發實力與敘事建構能力。' : 'Solo-developed UE5 project integrating C++ and Blueprints, demonstrating advanced technical proficiency and narrative architecture.'}
                              </p>
                           </div>
                           <div className="group bg-zinc-50 p-6 rounded-[2rem] border border-zinc-100 relative overflow-hidden transition-all hover:bg-zinc-100/50">
                              <h4 className="text-[14px] font-black text-gray-900 mb-2 uppercase tracking-tight">Cinematic Video Portfolio</h4>
                              <p className="text-[11px] leading-[1.8] text-gray-500 font-medium italic">
                                {language === 'zh' ? '融合設計美學與情感敘事，主導多項高視覺衝擊力動態影像製作，致力於感動人心的視覺呈現。' : 'Blending design aesthetics with emotional storytelling, leading various high-impact video productions focused on evocative visual experiences.'}
                              </p>
                           </div>
                        </div>
                      </section>

                      {/* Awards */}
                      <section>
                        <h3 className="text-[11px] font-black uppercase tracking-[0.3em] text-gray-300 mb-6 flex items-center gap-3">
                           <Award size={16} className="text-accent" /> {language === 'zh' ? '榮譽肯定' : 'Awards & Recognition'}
                        </h3>
                        <div className="grid grid-cols-2 gap-x-8 gap-y-6 pl-2">
                           {[
                             { year: '2024', title: t('timeline.award.senior'), sub: t('timeline.award.academic') },
                             { year: '2023', title: t('timeline.award.wirforce'), sub: 'Team Captain - Gundam Evolution' },
                             { year: '2023', title: t('timeline.award.bronze'), sub: 'Project Competition' },
                             { year: '2019', title: 'School Journalist Plan', sub: 'Best Journalistic Value' }
                           ].map((award, i) => (
                             <div key={i} className="flex gap-3">
                               <span className="text-[10px] font-black text-accent mt-1">{award.year}</span>
                               <div>
                                 <p className="text-[11px] font-black text-gray-900 leading-tight">{award.title}</p>
                                 <p className="text-[9px] text-gray-400 font-bold uppercase tracking-tighter">{award.sub}</p>
                               </div>
                             </div>
                           ))}
                        </div>
                      </section>
                    </div>

                    {/* Sidebar Column (Right 4) - The Styled Column */}
                    <div className="col-span-4 bg-zinc-50/80 rounded-[2.5rem] p-8 space-y-12 border border-zinc-100 flex flex-col">
                      
                      {/* Summary */}
                      <section>
                        <h3 className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-400 mb-5 flex items-center gap-2">
                           <Zap size={14} className="text-accent" /> {language === 'zh' ? '個人簡介' : 'Profile'}
                        </h3>
                        <p className="text-[11px] leading-[1.8] text-gray-600 font-bold italic">
                          "{t('about.desc')}"
                        </p>
                      </section>

                      {/* Education */}
                      <section>
                        <h3 className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-400 mb-5 flex items-center gap-2">
                           <GraduationCap size={14} className="text-accent" /> {language === 'zh' ? '教育背景' : 'Education'}
                        </h3>
                        <div className="space-y-1">
                           <p className="text-[10px] font-black text-accent tracking-widest">2020 — 2024</p>
                           <h4 className="text-[13px] font-black text-gray-900 leading-tight">{t('timeline.edu.uni')}</h4>
                           <p className="text-[11px] font-bold text-gray-500">{t('timeline.edu.major')}</p>
                        </div>
                      </section>

                      {/* Fixed Expertise: Compact & No Overflow */}
                      <section>
                        <h3 className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-400 mb-5">{language === 'zh' ? '專業技能' : 'Expertise'}</h3>
                        <div className="space-y-5">
                           {skillGroups.map((group, i) => (
                             <div key={i}>
                               <div className="flex items-center gap-2 text-accent mb-2">
                                 {group.icon}
                                 <span className="text-[9px] font-black uppercase tracking-widest">{group.label}</span>
                               </div>
                               <div className="flex flex-wrap gap-1.5">
                                 {group.items.map((item) => (
                                   <span key={item} className="bg-white px-2 py-1 rounded-lg text-[8px] font-bold text-gray-600 border border-zinc-200 whitespace-nowrap">
                                     {item}
                                   </span>
                                 ))}
                               </div>
                             </div>
                           ))}
                        </div>
                      </section>

                      {/* Languages */}
                      <section>
                        <h3 className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-400 mb-5">{language === 'zh' ? '語言能力' : 'Languages'}</h3>
                        <div className="space-y-3">
                           {[
                             { name: 'Cantonese', lv: 'Native' },
                             { name: 'Mandarin', lv: 'Native' },
                             { name: 'English', lv: 'Fluent' }
                           ].map((lang) => (
                             <div key={lang.name} className="flex justify-between items-center font-bold text-[11px]">
                               <span className="text-gray-700">{lang.name}</span>
                               <span className="text-accent text-[9px] uppercase">{lang.lv}</span>
                             </div>
                           ))}
                        </div>
                      </section>

                      {/* QR Code Section - Cleaned Up */}
                      <section className="mt-auto pt-10 border-t border-zinc-200 flex flex-col items-center gap-4">
                         <div className="bg-white p-3 rounded-2xl border border-zinc-200 shadow-sm">
                            <img 
                              src="https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=https://noval-g.github.io/Noval-Landing-page/" 
                              alt="Portfolio QR Code"
                              className="w-20 h-20 grayscale hover:grayscale-0 transition-all opacity-80"
                            />
                         </div>
                         <p className="text-[8px] font-black text-gray-300 uppercase tracking-[0.4em] text-center leading-relaxed">
                           Scan to view<br />Digital Portfolio
                         </p>
                      </section>
                    </div>
                  </div>

                  {/* Footer */}
                  <footer className="mt-auto pt-8 border-t border-gray-50 flex justify-between items-center opacity-30">
                    <p className="text-[8px] font-black tracking-[0.5em] uppercase">IEONG HOI LONG NOVAL</p>
                    <p className="text-[8px] font-black tracking-[0.2em] uppercase italic text-accent">Personal Digital CV Version</p>
                  </footer>
                </div>

              </div>
            </div>
          </motion.div>

          <style jsx global>{`
            @media print {
              .no-print { display: none !important; }
              body { background: white !important; margin: 0 !important; }
              #cv-content {
                box-shadow: none !important;
                width: 210mm !important;
                height: 297mm !important;
                transform: none !important;
                position: absolute !important;
                left: 0 !important;
                top: 0 !important;
              }
            }
            .custom-scrollbar::-webkit-scrollbar { width: 8px; }
            .custom-scrollbar::-webkit-scrollbar-thumb { background: rgba(0,0,0,0.1); border-radius: 10px; }
          `}</style>
        </>
      )}
    </AnimatePresence>
  );
}
