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
    const content = document.getElementById('cv-content');
    if (!content) return;

    // Create hidden iframe
    const iframe = document.createElement('iframe');
    iframe.style.position = 'fixed';
    iframe.style.right = '0';
    iframe.style.bottom = '0';
    iframe.style.width = '0';
    iframe.style.height = '0';
    iframe.style.border = '0';
    document.body.appendChild(iframe);

    const doc = iframe.contentWindow?.document;
    if (!doc) return;

    // Clone all head elements to maintain fonts and Tailwind styles
    const headHTML = document.head.innerHTML;

    doc.write(`
      <!DOCTYPE html>
      <html class="${document.documentElement.className}">
        <head>
          ${headHTML}
          <style>
            @page { size: A4; margin: 0; }
            body { 
              margin: 0 !important; 
              padding: 0 !important; 
              background: white !important; 
              -webkit-print-color-adjust: exact !important; 
              print-color-adjust: exact !important;
            }
            .print-container {
              width: 210mm !important;
              height: 297mm !important;
              padding: 0 !important;
              margin: 0 !important;
              background: white !important;
              display: flex !important;
              flex-direction: column !important;
            }
            /* Reset the scaling wrapper inside print */
            .scale-wrapper {
              transform: none !important;
              scale: 1 !important;
              width: 100% !important;
              height: 100% !important;
            }
            #cv-content {
              width: 210mm !important;
              height: 297mm !important;
              box-shadow: none !important;
              margin: 0 !important;
              transform: none !important;
            }
          </style>
        </head>
        <body class="${document.body.className}">
          <div class="print-container">
            ${content.parentElement?.innerHTML || content.innerHTML}
          </div>
          <script>
            document.fonts.ready.then(() => {
              setTimeout(() => {
                window.print();
                setTimeout(() => {
                  window.frameElement.remove();
                }, 500);
              }, 1000);
            });
          </script>
        </body>
      </html>
    `);
    doc.close();
  };

  const expertiseItems = [
    'UE5 (C++/BP)', 'Unity (C#)', 'Adobe PR / PS', 
    'Shooting', 'AI Prompt', 'Game QA', 'Hardware'
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
            id="resume-modal-root"
            initial={{ opacity: 0, scale: 0.98, y: 30 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.98, y: 30 }}
            className="fixed inset-0 z-[101] flex items-center justify-center p-2 md:p-6 pointer-events-none no-print overflow-hidden"
          >
            <div className="bg-white w-full max-w-6xl h-full max-h-[96vh] rounded-[2.5rem] shadow-2xl overflow-hidden flex flex-col pointer-events-auto border border-white/20">
              
              {/* Toolbar */}
              <div className="px-8 py-4 bg-zinc-900 flex justify-between items-center text-white shrink-0">
                <div className="flex items-center gap-3 font-bold uppercase tracking-widest text-[10px] md:text-xs opacity-70">
                   <div className="w-2 h-2 bg-accent rounded-full animate-pulse" />
                   {language === 'zh' ? '簡歷預覽' : 'Resume Preview'}
                </div>
                <div className="flex items-center gap-4">
                  <button onClick={handlePrint} className="flex items-center gap-2 px-5 py-2 bg-accent text-white rounded-full text-xs md:text-sm font-bold shadow-lg shadow-accent/20 transition-all hover:scale-105 active:scale-95">
                    <Printer size={16} /> {language === 'zh' ? '列印 / 存為 PDF' : 'Print / Save PDF'}
                  </button>
                  <button onClick={onClose} className="p-2 bg-white/10 text-white rounded-full hover:bg-white/20 transition-all"><X size={20} /></button>
                </div>
              </div>

              {/* CV Content Area */}
              <div className="flex-1 overflow-auto p-4 md:p-12 bg-zinc-100 flex justify-center items-start custom-scrollbar">
                
                {/* 
                  IMPORTANT: This wrapper handles SCREEN scaling.
                  The 'print:!block print:!p-0 print:!m-0' ensures that during print, 
                  this wrapper doesn't apply any layout constraints or transforms.
                */}
                <div className="scale-[0.4] sm:scale-[0.6] md:scale-[0.85] lg:scale-100 origin-top transition-transform print:!transform-none print:!block print:!static">
                  {/* The STRICT A4 CONTAINER - This ID must be unique and will be targeted by print CSS */}
                  <div 
                    id="cv-content" 
                    className="bg-white w-[210mm] min-w-[210mm] h-[297mm] min-h-[297mm] p-0 text-gray-800 flex flex-col shadow-2xl box-border overflow-hidden print:!shadow-none print:!m-0 print:!p-0"
                  >
                    
                    {/* Header */}
                    <header className="bg-zinc-50 border-b border-zinc-200 px-[20mm] py-12 text-center relative shrink-0">
                      <div className="absolute top-0 left-0 w-2 h-full bg-accent" />
                      <h1 className="text-5xl font-black tracking-tighter text-gray-900 mb-2 uppercase">IEONG HOI LONG</h1>
                      <div className="flex justify-center items-center gap-4 text-accent font-bold mb-8">
                        <span className="text-2xl">NOVAL</span>
                        <div className="w-1.5 h-1.5 bg-zinc-300 rounded-full" />
                        <span className="text-sm uppercase tracking-[0.3em] text-gray-400 font-black">{t('hero.badge')}</span>
                      </div>
                      <div className="flex justify-center gap-10 text-[12px] font-black text-gray-600">
                        <span className="flex items-center gap-2"><Mail size={14} className="text-accent" /> sofreeai@gmail.com</span>
                        <span className="flex items-center gap-2"><Phone size={14} className="text-accent" /> +853 63939694</span>
                      </div>
                    </header>

                    <div className="grid grid-cols-12 flex-1 overflow-hidden">
                      <div className="col-span-7 px-[15mm] py-10 space-y-10 border-r border-zinc-100">
                        <section>
                          <h3 className="text-[10px] font-black uppercase tracking-[0.3em] text-accent mb-4 flex items-center gap-3">
                             <Zap size={14} /> {language === 'zh' ? '個人簡介' : 'Profile Summary'}
                          </h3>
                          <div className="bg-zinc-50 p-5 rounded-2xl border-l-2 border-accent/20">
                            <p className="text-[12px] leading-[1.7] text-gray-700 font-medium italic">
                              "{t('about.desc')}"
                            </p>
                          </div>
                        </section>

                        <section>
                          <h3 className="text-[10px] font-black uppercase tracking-[0.3em] text-gray-300 mb-6 flex items-center gap-3">
                             <Briefcase size={16} className="text-accent" /> {language === 'zh' ? '工作經歷' : 'Experience'}
                          </h3>
                          <div className="relative pl-6 border-l-2 border-zinc-100">
                             <div className="absolute -left-[31px] top-0 w-3 h-3 bg-white border-2 border-accent rounded-full shadow-sm" />
                             <div className="flex justify-between items-start mb-1">
                               <h4 className="text-lg font-black text-gray-900 leading-tight">{t('timeline.work.mlsa')}</h4>
                               <span className="text-[9px] font-black text-gray-400">2025 — 2026</span>
                             </div>
                             <p className="text-[11px] font-bold text-accent uppercase tracking-widest mb-3">{t('timeline.work.assistant')}</p>
                             <p className="text-[11px] leading-[1.7] text-gray-500 font-medium">{t('timeline.work.mlsa.desc')}</p>
                          </div>
                        </section>

                        <section>
                          <h3 className="text-[10px] font-black uppercase tracking-[0.3em] text-gray-300 mb-6 flex items-center gap-3">
                             <Layout size={16} className="text-accent" /> {language === 'zh' ? '精選專案' : 'Selected Projects'}
                          </h3>
                          <div className="space-y-5">
                             <div className="pl-6 border-l-2 border-zinc-100 relative">
                                <div className="absolute -left-[7px] top-1.5 w-1.5 h-1.5 bg-gray-200 rounded-full" />
                                <h4 className="text-[13px] font-black text-gray-900 mb-1.5 uppercase tracking-tight">XenoVersus | UE5 Solo Project</h4>
                                <p className="text-[11px] leading-[1.7] text-gray-500 font-medium italic">{language === 'zh' ? '獨自使用 Unreal Engine 5 開發，整合 C++ 與藍圖系統，展現技術研發實力。' : 'Solo-developed UE5 project integrating C++ and Blueprints, showing technical R&D skills.'}</p>
                             </div>
                             <div className="pl-6 border-l-2 border-zinc-100 relative">
                                <div className="absolute -left-[7px] top-1.5 w-1.5 h-1.5 bg-gray-200 rounded-full" />
                                <h4 className="text-[13px] font-black text-gray-900 mb-1.5 uppercase tracking-tight">Cinematic Video Portfolio</h4>
                                <p className="text-[11px] leading-[1.7] text-gray-500 font-medium italic">{language === 'zh' ? '主導多項高視覺衝擊力影片製作，致力於感動人心的視覺呈現。' : 'Leading high-impact video productions focused on evocative visual experiences.'}</p>
                             </div>
                          </div>
                        </section>
                      </div>

                      <div className="col-span-5 px-[10mm] py-10 space-y-10 flex flex-col">
                        <section>
                          <h3 className="text-[10px] font-black uppercase tracking-[0.3em] text-gray-300 mb-5 flex items-center gap-2">
                             <GraduationCap size={14} className="text-accent" /> {language === 'zh' ? '教育背景' : 'Education'}
                        </h3>
                        <div className="space-y-1">
                           <p className="text-[9px] font-black text-accent tracking-widest uppercase">2020 — 2024</p>
                           <h4 className="text-[13px] font-black text-gray-900 leading-tight">{t('timeline.edu.uni')}</h4>
                           <p className="text-[11px] font-bold text-gray-500">{t('timeline.edu.major')}</p>
                        </div>
                      </section>

                      <section>
                        <h3 className="text-[10px] font-black uppercase tracking-[0.3em] text-gray-300 mb-5 flex items-center gap-2">
                           <Award size={14} className="text-accent" /> {language === 'zh' ? '榮譽肯定' : 'Awards'}
                        </h3>
                        <div className="space-y-4">
                           {[{ year: '2024', title: t('timeline.award.senior') }, { year: '2023', title: t('timeline.award.wirforce') }, { year: '2023', title: t('timeline.award.bronze') }].map((award, i) => (
                             <div key={i} className="flex gap-3">
                               <span className="text-[9px] font-black text-accent mt-0.5">{award.year}</span>
                               <p className="text-[11px] font-bold text-gray-700 leading-tight">{award.title}</p>
                             </div>
                           ))}
                        </div>
                      </section>

                      <section>
                        <h3 className="text-[10px] font-black uppercase tracking-[0.3em] text-gray-300 mb-5 flex items-center gap-2">
                           <Code size={14} className="text-accent" /> {language === 'zh' ? '專業技能' : 'Expertise'}
                        </h3>
                        <div className="flex flex-wrap gap-1.5">
                           {expertiseItems.map((item) => (
                             <span key={item} className="bg-zinc-50 px-2 py-1 rounded-lg text-[9px] font-black text-gray-600 border border-zinc-200 whitespace-nowrap">
                               {item}
                             </span>
                           ))}
                        </div>
                      </section>

                      <section>
                        <h3 className="text-[10px] font-black uppercase tracking-[0.3em] text-gray-300 mb-5">{language === 'zh' ? '語言能力' : 'Languages'}</h3>
                        <div className="space-y-2.5">
                           {[{ name: 'Cantonese', lv: 'Native' }, { name: 'Mandarin', lv: 'Native' }, { name: 'English', lv: 'Fluent' }].map((lang) => (
                             <div key={lang.name} className="flex justify-between items-center text-[11px] font-bold">
                               <span className="text-gray-700">{lang.name}</span>
                               <span className="text-accent text-[9px] uppercase">{lang.lv}</span>
                             </div>
                           ))}
                        </div>
                      </section>

                      <section className="mt-auto pt-8 border-t border-zinc-100 flex flex-col items-center gap-3">
                         <div className="p-2 bg-white rounded-2xl border border-zinc-100 shadow-sm">
                            <img src="https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=https://noval-g.github.io/Noval-Landing-page/" alt="QR" className="w-16 h-16 grayscale opacity-60" />
                         </div>
                         <p className="text-[7px] font-black text-gray-300 uppercase tracking-[0.4em] text-center">Scan Portfolio</p>
                      </section>
                    </div>
                  </div>

                    {/* Clean Brand Footer */}
                    <footer className="bg-zinc-900 px-10 py-4 flex justify-between items-center text-white/30 shrink-0">
                      <p className="text-[7px] font-bold tracking-[0.5em] uppercase">IEONG HOI LONG NOVAL</p>
                      <p className="text-[7px] font-bold tracking-[0.2em] uppercase italic">Crafting Logic & Art</p>
                    </footer>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
