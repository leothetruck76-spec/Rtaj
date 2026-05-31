/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronLeft, ChevronRight, Eye, Sparkles, MessageCircle, X } from 'lucide-react';

interface GalleryItem {
  id: string;
  title: string;
  description: string;
  category: 'hair' | 'nails' | 'spa';
  image: string;
}

interface OurWorkGalleryProps {
  lang: 'en' | 'ar';
  t: any; // translation block
}

export default function OurWorkGallery({ lang, t }: OurWorkGalleryProps) {
  const isRTL = lang === 'ar';
  const galleryData = t.gallery;

  const [activeCategory, setActiveCategory] = useState<'all' | 'hair' | 'nails' | 'spa'>('all');
  const [selectedItem, setSelectedItem] = useState<GalleryItem | null>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const [showLeftArrow, setShowLeftArrow] = useState(false);
  const [showRightArrow, setShowRightArrow] = useState(true);
  const [scrollProgress, setScrollProgress] = useState(0);

  // Filter items based on active tab
  const filteredItems = activeCategory === 'all'
    ? galleryData.items
    : galleryData.items.filter((item: GalleryItem) => item.category === activeCategory);

  // Monitor scroll state for arrow visibility and progress indicators
  const updateScrollState = () => {
    if (scrollRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
      
      // Calculate scroll progress percentage
      const maxScroll = scrollWidth - clientWidth;
      if (maxScroll > 0) {
        // Absolute value of scrollLeft is used to accommodate RTL scroll systems
        const currentProgress = Math.abs(scrollLeft) / maxScroll;
        setScrollProgress(currentProgress);
        
        if (isRTL) {
          // Negative or right-bounded coordinates represent scroll boundary in RTL
          setShowLeftArrow(scrollLeft < 0);
          setShowRightArrow(Math.abs(scrollLeft) < maxScroll - 5);
        } else {
          setShowLeftArrow(scrollLeft > 5);
          setShowRightArrow(scrollLeft < maxScroll - 5);
        }
      } else {
        setScrollProgress(0);
        setShowLeftArrow(false);
        setShowRightArrow(false);
      }
    }
  };

  useEffect(() => {
    const scrollContainer = scrollRef.current;
    if (scrollContainer) {
      scrollContainer.addEventListener('scroll', updateScrollState);
      // Run once on load and when active category changes
      setTimeout(updateScrollState, 100);
    }
    return () => {
      if (scrollContainer) {
        scrollContainer.removeEventListener('scroll', updateScrollState);
      }
    };
  }, [activeCategory, isRTL]);

  // Handle slide movement with smooth button triggers
  const handleScroll = (direction: 'next' | 'prev') => {
    if (scrollRef.current) {
      const { clientWidth } = scrollRef.current;
      const scrollAmount = clientWidth * 0.75; // Scroll 75% of viewport width per click
      
      // Adapt scroll direction to match RTL standard coordinates
      const multiplier = direction === 'next' ? (isRTL ? -1 : 1) : (isRTL ? 1 : -1);
      
      scrollRef.current.scrollBy({
        left: scrollAmount * multiplier,
        behavior: 'smooth'
      });
    }
  };

  return (
    <section id="gallery" className="py-24 bg-brand-secondary/40 relative overflow-hidden">
      {/* Visual Accent Blurs */}
      <div className="absolute top-1/4 right-[10%] w-72 h-72 bg-brand-accent/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 left-[5%] w-96 h-96 bg-brand-primary/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        {/* Header Title Block */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div className="max-w-xl">
            <div className="flex items-center gap-2 text-brand-accent mb-3">
              <Sparkles size={18} className="animate-pulse" />
              <span className="text-xs uppercase tracking-[0.3em] font-semibold">
                {lang === 'en' ? 'Our Gallery' : 'معرض أعمالنا'}
              </span>
            </div>
            <h2 className="text-4xl md:text-5xl font-serif text-brand-primary leading-tight">
              {galleryData.title}
            </h2>
            <p className="text-base md:text-lg text-gray-500 font-light mt-3">
              {galleryData.subtitle}
            </p>
          </div>

          {/* Navigation Button Controls */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => handleScroll('prev')}
              disabled={isRTL ? !showRightArrow : !showLeftArrow}
              className={`w-12 h-12 rounded-full border border-brand-primary/10 flex items-center justify-center transition-all ${
                (isRTL ? showRightArrow : showLeftArrow)
                  ? 'bg-white text-brand-primary hover:border-brand-accent hover:text-brand-accent shadow-md shadow-brand-primary/5 cursor-pointer'
                  : 'bg-white/50 text-brand-primary/30 cursor-not-allowed opacity-50'
              }`}
              title={lang === 'en' ? 'Previous' : 'السابق'}
            >
              <ChevronLeft size={20} className={isRTL ? 'rotate-180' : ''} />
            </button>
            <button
              onClick={() => handleScroll('next')}
              disabled={isRTL ? !showLeftArrow : !showRightArrow}
              className={`w-12 h-12 rounded-full border border-brand-primary/10 flex items-center justify-center transition-all ${
                (isRTL ? showLeftArrow : showRightArrow)
                  ? 'bg-white text-brand-primary hover:border-brand-accent hover:text-brand-accent shadow-md shadow-brand-primary/5 cursor-pointer'
                  : 'bg-white/50 text-brand-primary/30 cursor-not-allowed opacity-50'
              }`}
              title={lang === 'en' ? 'Next' : 'التالي'}
            >
              <ChevronRight size={20} className={isRTL ? 'rotate-180' : ''} />
            </button>
          </div>
        </div>

        {/* Category Filters */}
        <div className="flex justify-start gap-3 overflow-x-auto pb-4 mb-10 scrollbar-none touch-pan-x">
          {(['all', 'hair', 'nails', 'spa'] as const).map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-6 py-2.5 rounded-full text-xs md:text-sm font-medium tracking-wide transition-all whitespace-nowrap cursor-pointer ${
                activeCategory === cat
                  ? 'bg-brand-primary text-white shadow-md'
                  : 'bg-white border border-brand-primary/5 text-brand-primary/80 hover:bg-brand-secondary/50'
              }`}
            >
              {galleryData.categories[cat]}
            </button>
          ))}
        </div>

        {/* Swipeable Carousel Track Container */}
        <div className="relative group/carousel">
          <div
            ref={scrollRef}
            className="flex gap-6 overflow-x-auto overflow-y-hidden snap-x snap-mandatory scroll-smooth scrollbar-none pb-8 cursor-grab active:cursor-grabbing touch-pan-x"
            style={{
              scrollbarWidth: 'none',
              msOverflowStyle: 'none',
              WebkitOverflowScrolling: 'touch'
            }}
          >
            {filteredItems.map((item: GalleryItem, index: number) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
                className="w-[280px] sm:w-[350px] md:w-[400px] shrink-0 snap-start snap-always"
              >
                <div 
                  onClick={() => setSelectedItem(item)}
                  className="aspect-[4/5] rounded-[2rem] overflow-hidden bg-white border border-brand-primary/5 shadow-md relative group/card cursor-pointer"
                >
                  {/* Masterpiece Image */}
                  <img
                    referrerPolicy="no-referrer"
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-cover transition-all duration-700 ease-out group-hover/card:scale-110"
                    loading="lazy"
                  />
                  
                  {/* Ambient Bottom Gradient Layer */}
                  <div className="absolute inset-0 bg-gradient-to-t from-brand-primary/95 via-brand-primary/30 to-transparent opacity-90 group-hover/card:via-brand-primary/40 transition-all duration-300" />
                  
                  {/* Category Pill Tag */}
                  <div className={`absolute top-6 ${isRTL ? 'left-6' : 'right-6'} z-10`}>
                    <span className="bg-white/95 backdrop-blur-md text-brand-primary text-[10px] uppercase tracking-widest font-bold px-3 py-1.5 rounded-full shadow-sm">
                      {galleryData.categories[item.category]}
                    </span>
                  </div>

                  {/* High Quality Work Information Overlay */}
                  <div className="absolute bottom-6 left-6 right-6 text-white flex flex-col justify-end">
                    <h3 className="text-xl md:text-2xl font-serif mb-2 line-clamp-1 group-hover/card:text-brand-accent transition-colors">
                      {item.title}
                    </h3>
                    <p className="text-xs md:text-sm text-white/70 font-light line-clamp-2 leading-relaxed">
                      {item.description}
                    </p>
                    
                    {/* Hover Glow Visual Indicator */}
                    <div className="flex items-center gap-2 text-brand-accent text-xs font-semibold uppercase tracking-widest mt-4 opacity-0 transform translate-y-3 group-hover/card:opacity-100 group-hover/card:translate-y-0 transition-all duration-300">
                      <Eye size={14} />
                      <span>{lang === 'en' ? 'View Details' : 'عرض التفاصيل'}</span>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Dynamic Slide Index Progress Bar */}
        <div className="max-w-md mx-auto mt-6">
          <div className="h-1 bg-brand-primary/5 rounded-full overflow-hidden">
            <div 
              className="h-full bg-brand-accent rounded-full transition-all duration-300"
              style={{ 
                width: `${Math.max(10, scrollProgress * 100)}%`,
                marginLeft: isRTL ? 'auto' : '0',
                marginRight: isRTL ? '0' : 'auto'
              }}
            />
          </div>
          <div className="flex justify-between items-center text-[10px] text-gray-400 mt-2 font-mono uppercase tracking-widest" dir="ltr">
            <span>01</span>
            <span>{filteredItems.length < 10 ? `0${filteredItems.length}` : filteredItems.length}</span>
          </div>
        </div>
      </div>

      {/* Exquisite Lightbox Detail Modal */}
      <AnimatePresence>
        {selectedItem && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-brand-primary/95 backdrop-blur-md flex items-center justify-center p-4"
          >
            {/* Modal Closer Mask Click */}
            <div className="absolute inset-0 cursor-zoom-out" onClick={() => setSelectedItem(null)} />

            <motion.div
              initial={{ scale: 0.95, y: 15 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 15 }}
              transition={{ type: "spring", density: 0.9, duration: 0.35 }}
              className="bg-brand-secondary text-brand-primary max-w-4xl w-full rounded-[2.5rem] overflow-hidden shadow-2xl relative z-10 grid grid-cols-1 md:grid-cols-12 max-h-[90vh]"
            >
              {/* Close Button */}
              <button
                onClick={() => setSelectedItem(null)}
                className={`absolute top-6 ${isRTL ? 'left-6' : 'right-6'} z-30 w-11 h-11 rounded-full bg-black/60 text-white flex items-center justify-center hover:bg-black transition-colors shadow-lg cursor-pointer`}
                title={lang === 'en' ? 'Close' : 'إغلاق'}
              >
                <X size={20} />
              </button>

              {/* Photo Area */}
              <div className="md:col-span-7 h-[300px] md:h-[600px] relative">
                <img
                  referrerPolicy="no-referrer"
                  src={selectedItem.image}
                  alt={selectedItem.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent md:hidden" />
              </div>

              {/* Detail Content Block */}
              <div className="md:col-span-5 p-8 md:p-12 flex flex-col justify-between overflow-y-auto">
                <div className="space-y-6">
                  {/* Badge */}
                  <div>
                    <span className="bg-brand-primary/5 border border-brand-primary/10 text-brand-accent text-[11px] uppercase tracking-[0.25em] font-bold px-3 py-1.5 rounded-full inline-block">
                      {galleryData.categories[selectedItem.category]}
                    </span>
                  </div>

                  {/* Title & Description */}
                  <div className="space-y-3">
                    <h3 className="text-2xl md:text-3xl font-serif font-black tracking-tight text-brand-primary">
                      {selectedItem.title}
                    </h3>
                    <p className="text-sm text-gray-600 font-light leading-relaxed">
                      {selectedItem.description}
                    </p>
                  </div>

                  {/* Value/Benefits Highlights */}
                  <div className="pt-4 border-t border-brand-primary/5 space-y-3">
                    <h4 className="text-xs uppercase tracking-widest font-bold text-brand-primary">
                      {lang === 'en' ? 'Included In Treatment' : 'الخدمة تشمل'}
                    </h4>
                    <ul className="grid grid-cols-1 gap-2 text-xs text-gray-500 font-light">
                      <li className="flex items-center gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-brand-accent shrink-0" />
                        <span>{lang === 'en' ? 'Complementary Premium Oil Massages' : 'مساج زيت فاخر مجاني'}</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-brand-accent shrink-0" />
                        <span>{lang === 'en' ? 'Expert Consultation with Style Artists' : 'استشارة احترافية مع خبراء التسرييحات'}</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-brand-accent shrink-0" />
                        <span>{lang === 'en' ? 'Luxury Botanical Organic Therapy' : 'علاجات نباتية عضوية فاخرة'}</span>
                      </li>
                    </ul>
                  </div>
                </div>

                {/* Direct Action Reserve Panel */}
                <div className="pt-8 md:pt-0 mt-8">
                  <a
                    href={`https://wa.me/971504030102?text=${encodeURIComponent(
                      lang === 'en'
                        ? `Hello Mood Salon, I am in love with your masterpiece "${selectedItem.title}" (${selectedItem.category}). I would like to book a lookup/treatment session for this style.`
                        : `مرحباً صالون موود، لقد أُعجبتُ جداً بأعمالكم الفنية لـ "${selectedItem.title}" (${selectedItem.category}). أود حجز جلسة استشارية/تصميم لهذه التسريحة الفاخرة.`
                    )}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full bg-brand-primary text-white font-bold py-4 rounded-2xl hover:bg-brand-accent transition-all shadow-xl shadow-brand-primary/10 flex items-center justify-center gap-3 cursor-pointer"
                  >
                    <MessageCircle size={18} fill="currentColor" />
                    <span>{lang === 'en' ? 'Book This Style' : 'احجزي هذا المظهر الآن'}</span>
                  </a>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
