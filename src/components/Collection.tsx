'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Play, Maximize2 } from 'lucide-react';
import Image from 'next/image';
import { useLanguage } from '@/context/LanguageContext';

// Type definition for a Portfolio Item
type Item = {
  id: string;
  title: string;
  category: string;
  description: string;
  size: 'small' | 'medium' | 'large'; // small: 1x1, medium: 2x1, large: 2x2
  imageUrl: string; // Placeholder image URL
  content?: string; // Placeholder for detailed content
  link?: string;
  videoEmbedUrl?: string;
};

const items: Item[] = [
  {
    id: '1',
    title: 'Game Design Journey',
    category: 'Game',
    description: 'From 2D Unity Action to 3D UE5 Solo Development',
    size: 'large',
    imageUrl: '/Noval-Landing-page/GameCover.jpg',
    content: 'My journey began with a 3-month team project using Unity to create a 2D side-scrolling action game featuring a unique "Charge QTE Magic" system. This evolved into my final senior project, "XenoVersus"—a solo-developed Unreal Engine 5 experience. Despite the challenges of 4 months spent bridging C++ and Blueprints, and the shift from battle-mode to adventure, this project represents my most precious growth and technical breakthrough.',
    videoEmbedUrl: 'https://www.youtube.com/embed/cGez3Bq_BcI?si=_0YXgkP-RPerzAQy&autoplay=1',
  },
  {
    id: '2',
    title: 'WirForce Fight',
    category: 'Competition',
    description: 'Gundam Evolution (FPS) Champion Captain',
    size: 'medium',
    imageUrl: 'https://placehold.co/800x400/eab308/white?text=WirForce',
  },
  {
    id: '3',
    title: 'Design Portfolio',
    category: 'Design',
    description: 'Selected Graphic and Conceptual Design Work',
    size: 'small',
    imageUrl: 'https://placehold.co/400x400/16a34a/white?text=Design',
  },
  {
    id: '5',
    title: 'Video Portfolio',
    category: 'Video',
    description: 'Cinematic storytelling and digital content production',
    size: 'medium',
    imageUrl: 'https://placehold.co/800x400/dc2626/white?text=Video',
    link: 'https://drive.google.com/drive/folders/1YQmfHgKgnowriEh3iKXD4TwJYp3CdIiD?usp=sharing',
  },
];

export default function Collection() {
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const { t } = useLanguage();

  const handleClose = () => {
    setSelectedId(null);
    setIsPlaying(false);
  };

  return (
    <section id="collection" className="py-24 px-6 md:px-12 bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="mb-16">
          <h2 className="text-3xl font-bold tracking-tight mb-4">{t('collection.title')}</h2>
          <p className="text-muted max-w-2xl">{t('collection.desc')}</p>
        </div>

        {/* Grid Layout */}
        <motion.div 
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          variants={{
            hidden: { opacity: 0 },
            show: {
              opacity: 1,
              transition: {
                staggerChildren: 0.1
              }
            }
          }}
          className="grid grid-cols-1 md:grid-cols-4 auto-rows-[350px] gap-6"
        >
          {items.map((item) => (
            <motion.div
              key={item.id}
              layoutId={`card-${item.id}`}
              variants={{
                hidden: { opacity: 0, y: 20 },
                show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] } }
              }}
              onClick={() => setSelectedId(item.id)}
              className={`relative cursor-pointer group rounded-[2.5rem] overflow-hidden shadow-sm hover:shadow-xl transition-all duration-500 ${
                item.id === '1' ? 'md:col-span-4 md:row-span-1' :
                item.size === 'medium' ? 'md:col-span-2 md:row-span-1' :
                'md:col-span-1 md:row-span-1'
              }`}
            >
              {/* Background Image */}
              <div className="absolute inset-0">
                <Image 
                  src={item.imageUrl} 
                  alt={item.title}
                  fill
                  className={`object-cover transition-all duration-700 group-hover:scale-105 ${item.id === '1' ? 'blur-[2px] brightness-75' : ''}`}
                />
                <div className="absolute inset-0 bg-black/20 group-hover:bg-black/0 transition-colors duration-500" />
              </div>

              {/* Special Overlay for Game Design */}
              {item.id === '1' && (
                <div className="absolute inset-0 flex items-center justify-center z-10 pointer-events-none">
                  <h2 className="text-5xl md:text-7xl font-black text-white tracking-tighter opacity-90 group-hover:scale-110 transition-transform duration-700 drop-shadow-2xl">
                    GAME DESIGN
                  </h2>
                </div>
              )}

              {/* Content Overlay */}
              <div className="absolute inset-0 p-8 flex flex-col justify-end bg-gradient-to-t from-black/80 via-black/20 to-transparent text-white opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-10">
                <p className="text-xs font-bold tracking-widest uppercase text-white/70 mb-2">{item.category}</p>
                <h3 className="text-2xl font-bold">{item.title}</h3>
                <div className="absolute top-6 right-6 bg-white/20 backdrop-blur-xl p-3 rounded-full scale-0 group-hover:scale-100 transition-transform duration-500">
                  <Maximize2 size={18} color="white" />
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Expanded View (Modal) */}
        <AnimatePresence>
          {selectedId && (
            <>
              {/* Backdrop */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={handleClose}
                className="fixed inset-0 bg-black/60 backdrop-blur-md z-50"
              />

              {/* Modal Card */}
              <div className="fixed inset-0 grid place-items-center z-[60] pointer-events-none p-4 md:p-12">
                <motion.div
                  layoutId={`card-${selectedId}`}
                  className="w-full max-w-[1440px] max-h-[85vh] bg-white rounded-[4rem] shadow-2xl overflow-hidden flex flex-col pointer-events-auto"
                >
                  {/* Close Button */}
                  <button
                    onClick={(e) => { e.stopPropagation(); handleClose(); }}
                    className="absolute top-8 right-8 z-[70] bg-black/50 hover:bg-black/70 text-white backdrop-blur-xl p-3 rounded-full transition-all active:scale-90"
                  >
                    <X size={24} />
                  </button>

                  {/* Modal Content */}
                  <div className="flex-1 overflow-y-auto custom-scrollbar">
                    {(() => {
                      const item = items.find((i) => i.id === selectedId)!;
                      return (
                        <div className="flex flex-col lg:flex-row min-h-full">
                          {/* Image/Video Preview Area */}
                          <div className="w-full lg:w-3/5 aspect-video lg:aspect-auto bg-black relative">
                             {item.videoEmbedUrl && isPlaying ? (
                               <iframe 
                                 src={item.videoEmbedUrl} 
                                 title={item.title}
                                 className="absolute inset-0 w-full h-full border-0"
                                 allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
                                 referrerPolicy="strict-origin-when-cross-origin" 
                                 allowFullScreen
                               />
                             ) : (
                               <>
                                 <Image 
                                   src={item.imageUrl} 
                                   alt={item.title}
                                   fill
                                   className="object-cover opacity-80"
                                 />
                                 <div className="absolute inset-0 flex items-center justify-center z-10">
                                   <div 
                                     onClick={() => setIsPlaying(true)}
                                     className="w-20 h-20 bg-white/20 backdrop-blur-2xl rounded-full flex items-center justify-center cursor-pointer hover:scale-110 transition-transform border border-white/30"
                                   >
                                     <Play size={32} className="text-white ml-1" />
                                   </div>
                                 </div>
                                 <p className="absolute bottom-8 left-0 right-0 text-center text-white/60 font-medium z-10">{t('collection.clickPlay')}</p>
                               </>
                             )}
                          </div>
                          
                          {/* Rich Text Info Area */}
                          <div className="w-full lg:w-2/5 p-10 md:p-16 bg-white flex flex-col">
                            <div className="mb-auto">
                              <span className="text-sm font-bold tracking-widest uppercase text-accent mb-4 block">{item.category}</span>
                              <h2 className="text-4xl font-bold mb-6 leading-tight">{item.title}</h2>
                              
                              <div className="space-y-8">
                                <div>
                                  <h4 className="text-xs font-bold uppercase text-muted tracking-widest mb-2">{t('collection.overview')}</h4>
                                  <p className="text-muted leading-relaxed">
                                    {item.description}
                                  </p>
                                </div>

                                <div>
                                  <h4 className="text-xs font-bold uppercase text-muted tracking-widest mb-2">{t('collection.process')}</h4>
                                  <p className="text-sm text-muted leading-relaxed">
                                      {item.content || "This project involved extensive research into user psychology and interactive game mechanics, resulting in an award-winning experience."}
                                  </p>
                                </div>
                                
                                <div className="pt-8 border-t border-border">
                                   <a 
                                     href={item.link || "#"} 
                                     target={item.link ? "_blank" : "_self"}
                                     rel="noopener noreferrer"
                                     className="w-full py-4 bg-foreground text-background rounded-2xl font-bold hover:opacity-90 transition-opacity active:scale-[0.98] inline-flex items-center justify-center"
                                   >
                                     {t('collection.viewLive')}
                                   </a>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      );
                    })()}
                  </div>
                </motion.div>
              </div>
            </>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}