/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Phone, 
  MapPin, 
  MessageCircle, 
  Instagram, 
  Facebook, 
  Globe, 
  ChevronRight, 
  Star,
  Menu,
  X,
  Scissors,
  Sparkles,
  Heart,
  Check,
  Calendar,
  Clock
} from 'lucide-react';
import { translations } from './translations';

// Service Category mapping for icons
const categoryIcons: Record<string, any> = {
  hair: Scissors,
  nails: Sparkles,
  spa: Heart
};

// Image assets (using the paths from generate_image)
// Note: We'll use placeholder-like paths that will be resolved to the actual generated artifacts
const images = {
  hero: "https://images.unsplash.com/photo-1560066984-138dadb4c035?q=80&w=1974&auto=format&fit=crop", // Fallback if local not found yet
  heroLocal: "/src/assets/images/mood_salon_interior_1780142243246.png",
  hair: "/src/assets/images/mood_hair_service_1779213786337.png",
  nail: "/src/assets/images/mood_nail_service_1779213809909.png",
  spa: "/src/assets/images/mood_spa_service_1779213827227.png"
};

export default function App() {
  const [lang, setLang] = useState<'en' | 'ar'>('en');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<'hair' | 'nails' | 'spa'>('hair');
  const [bookingSuccess, setBookingSuccess] = useState<any | null>(null);
  
  const t = translations[lang];
  const isRTL = lang === 'ar';

  const toggleLanguage = () => {
    setLang(prev => prev === 'en' ? 'ar' : 'en');
  };

  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isMenuOpen]);

  const navItems = [
    { name: t.nav.services, href: "#services" },
    { name: t.nav.booking, href: "#booking" },
    { name: t.nav.location, href: "#location" },
  ];

  return (
    <div className={`min-h-screen ${isRTL ? 'arabic' : ''}`} dir={isRTL ? 'rtl' : 'ltr'}>
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-brand-secondary/80 backdrop-blur-md border-b border-brand-primary/10">
        <nav className="max-w-7xl mx-auto px-6 h-20 flex justify-between items-center">
          <div className="flex items-center gap-8">
            <a href="/" className="text-2xl font-serif font-bold tracking-tighter hover:text-brand-accent transition-colors">
              MOOD <span className="font-light italic text-brand-accent">Beauty Salon</span>
            </a>
            
            {/* Desktop Nav */}
            <div className="hidden md:flex gap-6">
              {navItems.map((item) => (
                <a key={item.name} href={item.href} className="text-sm font-medium hover:text-brand-accent transition-colors">
                  {item.name}
                </a>
              ))}
            </div>
          </div>

          <div className="flex items-center gap-4">
            <button 
              onClick={toggleLanguage}
              className="px-3 py-1 text-sm border border-brand-primary/20 rounded-full hover:bg-brand-primary hover:text-white transition-all flex items-center gap-2"
            >
              <Globe size={14} />
              {t.nav.language}
            </button>
            <a 
              href={`tel:${t.contact.phone.replace(/\s/g, '')}`}
              className="hidden lg:flex items-center gap-2 text-sm font-medium bg-brand-primary text-white px-5 py-2 rounded-full hover:bg-brand-accent transition-all"
            >
              <Phone size={16} />
              {t.contact.phone}
            </a>
            <button className="md:hidden" onClick={() => setIsMenuOpen(true)}>
              <Menu size={24} />
            </button>
          </div>
        </nav>
      </header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, x: isRTL ? -300 : 300 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: isRTL ? -300 : 300 }}
            className="fixed inset-0 z-[60] bg-brand-secondary flex flex-col p-8"
          >
            <div className="flex justify-end">
              <button onClick={() => setIsMenuOpen(false)}>
                <X size={32} />
              </button>
            </div>
            <div className="flex flex-col gap-8 mt-20 text-center">
              {navItems.map((item) => (
                <a 
                  key={item.name} 
                  href={item.href} 
                  className="text-3xl font-serif"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.name}
                </a>
              ))}
              <a 
                href={`tel:${t.contact.phone.replace(/\s/g, '')}`}
                className="text-xl font-medium mt-8 text-brand-accent"
              >
                {t.contact.phone}
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <main className="pt-20">
        {/* Hero Section */}
        <section className="relative h-[85vh] flex items-center overflow-hidden">
          <div className="absolute inset-0 z-0">
            <div className="absolute inset-0 bg-brand-primary/40 z-10" />
            <img 
              referrerPolicy="no-referrer"
              src={images.heroLocal} 
              alt="Salon Hero" 
              className="w-full h-full object-cover"
              onError={(e) => {
                e.currentTarget.src = images.hero;
              }}
            />
          </div>
          <div className="max-w-7xl mx-auto px-6 relative z-20 text-white">
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="max-w-2xl"
            >
              <h1 className="text-6xl md:text-8xl font-serif mb-6 leading-tight">
                {t.hero.title}
              </h1>
              <p className="text-xl md:text-2xl font-light mb-10 opacity-90 leading-relaxed">
                {t.hero.subtitle}
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <a 
                  href="https://wa.me/971504030102" 
                  className="bg-brand-accent text-brand-primary font-bold px-10 py-5 rounded-full inline-flex items-center justify-center gap-3 hover:bg-white transition-all shadow-xl shadow-brand-accent/20"
                >
                  <MessageCircle size={20} />
                  {t.hero.bookNow}
                </a>
              </div>
            </motion.div>
          </div>
          
          <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-50">
            <span className="text-xs uppercase tracking-widest text-white">Scroll</span>
            <div className="w-px h-12 bg-white/50" />
          </div>
        </section>

        {/* Services Section */}
        <section id="services" className="py-24 bg-white overflow-hidden">
          <div className="max-w-7xl mx-auto px-6">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-serif mb-4">{t.services.title}</h2>
              <p className="text-lg text-gray-500 max-w-xl mx-auto font-light">{t.services.subtitle}</p>
            </div>

            {/* Category Tabs */}
            <div className="flex justify-center gap-4 mb-16 overflow-x-auto pb-4">
              {(Object.keys(t.services.categories) as Array<keyof typeof t.services.categories>).map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveTab(cat as any)}
                  className={`px-8 py-3 rounded-full text-sm font-medium transition-all whitespace-nowrap ${
                    activeTab === cat 
                      ? 'bg-brand-primary text-white shadow-lg' 
                      : 'bg-brand-secondary text-brand-primary hover:bg-brand-secondary/80'
                  }`}
                >
                  {t.services.categories[cat]}
                </button>
              ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
              <div className="order-2 lg:order-1">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeTab}
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -15 }}
                    transition={{ duration: 0.25 }}
                    className="grid grid-cols-1 sm:grid-cols-2 gap-6"
                  >
                    {t.services.items
                      .filter(item => item.category === activeTab)
                      .map((item) => {
                        const Icon = categoryIcons[item.category];
                        return (
                          <div
                            key={item.id}
                            className="p-6 border border-brand-secondary bg-white rounded-2xl hover:border-brand-accent hover:shadow-xl hover:shadow-brand-accent/5 transition-all group flex flex-col justify-between min-h-[140px]"
                          >
                            <div>
                              <div className="w-12 h-12 bg-brand-secondary rounded-xl flex items-center justify-center mb-4 text-brand-accent group-hover:bg-brand-accent group-hover:text-white transition-colors">
                                <Icon size={20} />
                              </div>
                              <h3 className="text-lg font-serif font-medium mb-1">{item.title}</h3>
                            </div>
                            <div className="flex justify-end mt-2">
                              <ChevronRight 
                                size={16} 
                                className={`text-brand-accent transition-transform ${isRTL ? 'rotate-180 group-hover:-translate-x-1' : 'group-hover:translate-x-1'}`} 
                              />
                            </div>
                          </div>
                        );
                      })}
                  </motion.div>
                </AnimatePresence>
              </div>

              <div className="lg:sticky lg:top-32 order-1 lg:order-2">
                <div className="aspect-[4/5] rounded-3xl overflow-hidden shadow-2xl relative group">
                  <motion.img 
                    key={activeTab}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    src={activeTab === 'hair' ? images.hair : activeTab === 'nails' ? images.nail : images.spa} 
                    alt={activeTab}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    onError={(e) => {
                      e.currentTarget.src = images.hero;
                    }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-brand-primary/60 to-transparent" />
                  <div className="absolute bottom-8 left-8 right-8 text-white">
                    <p className="text-xs uppercase tracking-[0.3em] mb-2 opacity-80">{t.services.subtitle}</p>
                    <h3 className="text-3xl font-serif">{t.services.categories[activeTab]}</h3>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Testimonials */}
        <section className="py-24 bg-brand-secondary relative overflow-hidden">
          <div className="max-w-7xl mx-auto px-6 relative z-10">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-serif mb-4">{t.testimonials.title}</h2>
              <div className="flex justify-center gap-1 text-brand-accent">
                {[...Array(5)].map((_, i) => <Star key={i} size={20} fill="currentColor" />)}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {t.testimonials.reviews.map((rev, i) => (
                <div key={rev.name} className="bg-white p-8 rounded-3xl shadow-sm border border-brand-primary/5 hover:shadow-lg transition-all">
                  <div className="flex gap-1 text-brand-accent mb-4">
                    {[...Array(rev.rating)].map((_, i) => <Star key={i} size={14} fill="currentColor" />)}
                  </div>
                  <p className="text-brand-primary/80 italic mb-6 leading-relaxed">"{rev.comment}"</p>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-brand-accent/20 flex items-center justify-center font-bold text-brand-accent">
                      {rev.name[0]}
                    </div>
                    <span className="font-medium text-sm">{rev.name}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="absolute top-0 right-0 w-64 h-64 bg-brand-accent/10 rounded-full blur-3xl -mr-32 -mt-32" />
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-brand-accent/10 rounded-full blur-3xl -ml-32 -mb-32" />
        </section>

        {/* Appointment Form Section */}
        <section id="booking" className="py-24 bg-white">
          <div className="max-w-3xl mx-auto px-6">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-serif mb-4">{t.booking.title}</h2>
              <p className="text-lg text-gray-500 font-light">{t.booking.subtitle}</p>
            </div>

            <AnimatePresence mode="wait">
              {!bookingSuccess ? (
                <motion.form 
                  key="booking-form"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  onSubmit={(e) => {
                    e.preventDefault();
                    const formData = new FormData(e.currentTarget);
                    const name = formData.get('name') as string;
                    const phone = formData.get('phone') as string;
                    const service = formData.get('service') as string;
                    const date = formData.get('date') as string;
                    const time = formData.get('time') as string;
                    
                    setBookingSuccess({ name, phone, service, date, time });
                  }}
                  className="bg-brand-secondary/30 p-8 md:p-12 rounded-[2.5rem] border border-brand-primary/5 space-y-6 animate-fade-in"
                >
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-sm font-medium opacity-70 px-1">{t.booking.name}</label>
                      <input 
                        required
                        name="name"
                        type="text" 
                        placeholder={t.booking.placeholderName}
                        className="w-full bg-white border border-brand-primary/10 rounded-2xl px-6 py-4 focus:ring-2 focus:ring-brand-accent focus:border-brand-accent transition-all outline-none"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium opacity-70 px-1">{t.booking.phone}</label>
                      <input 
                        required
                        name="phone"
                        type="tel" 
                        placeholder={t.booking.placeholderPhone}
                        className="w-full bg-white border border-brand-primary/10 rounded-2xl px-6 py-4 focus:ring-2 focus:ring-brand-accent focus:border-brand-accent transition-all outline-none"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium opacity-70 px-1">{t.booking.service}</label>
                    <div className="relative">
                      <select 
                        required
                        name="service"
                        className="w-full bg-white border border-brand-primary/10 rounded-2xl px-6 py-4 pr-12 text-left focus:ring-2 focus:ring-brand-accent focus:border-brand-accent transition-all outline-none appearance-none"
                      >
                        {t.services.items.map(item => (
                          <option key={item.id} value={item.title}>{item.title}</option>
                        ))}
                      </select>
                      <div className={`absolute top-1/2 -translate-y-1/2 pointer-events-none text-brand-primary/50 ${isRTL ? 'left-6' : 'right-6'}`}>
                        <ChevronRight className="rotate-90" size={18} />
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-sm font-medium opacity-70 px-1">{t.booking.date}</label>
                      <input 
                        required
                        name="date"
                        type="date" 
                        className="w-full bg-white border border-brand-primary/10 rounded-2xl px-6 py-4 focus:ring-2 focus:ring-brand-accent focus:border-brand-accent transition-all outline-none"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium opacity-70 px-1">{t.booking.time}</label>
                      <input 
                        required
                        name="time"
                        type="time" 
                        className="w-full bg-white border border-brand-primary/10 rounded-2xl px-6 py-4 focus:ring-2 focus:ring-brand-accent focus:border-brand-accent transition-all outline-none"
                      />
                    </div>
                  </div>

                  <button 
                    type="submit"
                    className="w-full bg-brand-primary text-white font-bold py-5 rounded-2xl hover:bg-brand-accent transition-all shadow-xl shadow-brand-primary/10 mt-4 flex items-center justify-center gap-3 cursor-pointer"
                  >
                    <MessageCircle size={20} />
                    {t.booking.submit}
                  </button>
                </motion.form>
              ) : (
                <motion.div 
                  key="booking-success"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  className="bg-brand-secondary/40 p-8 md:p-12 rounded-[2.5rem] border-2 border-brand-accent/30 text-center space-y-6 shadow-xl shadow-brand-accent/5 max-w-xl mx-auto"
                >
                  <div className="w-16 h-16 bg-brand-accent/20 text-brand-accent rounded-full flex items-center justify-center mx-auto mb-6">
                    <Check size={32} />
                  </div>
                  
                  <h3 className="text-2xl md:text-3xl font-serif font-bold text-brand-primary">
                    {lang === 'en' ? 'Appointment Initialized!' : 'تم تأكيد طلب الحجز!'}
                  </h3>
                  
                  <p className="text-gray-600 font-light max-w-sm mx-auto">
                    {t.booking.success}
                  </p>

                  <div className="bg-white/80 border border-brand-primary/5 rounded-2xl p-6 text-left space-y-3 font-sans max-w-md mx-auto" dir={isRTL ? 'rtl' : 'ltr'}>
                    <div className="flex justify-between items-center text-sm border-b border-brand-primary/5 pb-2">
                      <span className="opacity-50">{lang === 'en' ? 'Guest:' : 'الضيف:'}</span>
                      <span className="font-semibold text-brand-primary">{bookingSuccess.name}</span>
                    </div>
                    <div className="flex justify-between items-center text-sm border-b border-brand-primary/5 pb-2">
                      <span className="opacity-50">{lang === 'en' ? 'Service:' : 'الخدمة:'}</span>
                      <span className="font-semibold text-brand-primary">{bookingSuccess.service}</span>
                    </div>
                    <div className="flex justify-between items-center text-sm border-b border-brand-primary/5 pb-2">
                      <span className="opacity-50">{lang === 'en' ? 'Date:' : 'التاريخ:'}</span>
                      <span className="font-semibold text-brand-primary flex items-center gap-1">
                        <Calendar size={14} className="text-brand-accent" />
                        {bookingSuccess.date}
                      </span>
                    </div>
                    <div className="flex justify-between items-center text-sm">
                      <span className="opacity-50">{lang === 'en' ? 'Time:' : 'الوقت:'}</span>
                      <span className="font-semibold text-brand-primary flex items-center gap-1">
                        <Clock size={14} className="text-brand-accent" />
                        {bookingSuccess.time}
                      </span>
                    </div>
                  </div>

                  <div className="pt-4 space-y-4">
                    <a 
                      href={`https://wa.me/971504030102?text=${encodeURIComponent(
                        `Hello Mood Beauty Salon, I would like to confirm my appointment booking:\n\n👤 Name: ${bookingSuccess.name}\n📞 Phone: ${bookingSuccess.phone}\n💇‍♀️ Service: ${bookingSuccess.service}\n📅 Date: ${bookingSuccess.date}\n⏰ Time: ${bookingSuccess.time}`
                      )}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full bg-[#25D366] text-white font-bold py-5 rounded-2xl hover:bg-[#20ba59] transition-all shadow-xl shadow-[#25D366]/20 flex items-center justify-center gap-3 cursor-pointer"
                    >
                      <MessageCircle size={22} fill="currentColor" />
                      {lang === 'en' ? 'Open WhatsApp to Confirm' : 'افتح واتساب للتأكيد الآن'}
                    </a>

                    <button 
                      onClick={() => setBookingSuccess(null)}
                      className="text-sm font-medium text-brand-primary/60 hover:text-brand-accent underline transition-colors cursor-pointer"
                    >
                      {lang === 'en' ? 'Edit details / Book another slot' : 'تعديل التفاصيل / حجز موعد آخر'}
                    </button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </section>

        {/* Location & Contact Section */}
        <section id="location" className="py-24 bg-white">
          <div className="max-w-7xl mx-auto px-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              <div>
                <h2 className="text-4xl md:text-6xl font-serif mb-8">{t.contact.title}</h2>
                <div className="space-y-8">
                  <div className="flex gap-6 items-start group">
                    <div className="w-14 h-14 bg-brand-secondary rounded-2xl flex items-center justify-center text-brand-accent group-hover:bg-brand-accent group-hover:text-white transition-all shrink-0">
                      <MapPin size={24} />
                    </div>
                    <div>
                      <h4 className="text-xs uppercase tracking-widest text-brand-accent font-bold mb-2">Address</h4>
                      <p className="text-xl font-light leading-relaxed max-w-sm">{t.contact.address}</p>
                    </div>
                  </div>
                  
                  <div className="flex gap-6 items-start group">
                    <div className="w-14 h-14 bg-brand-secondary rounded-2xl flex items-center justify-center text-brand-accent group-hover:bg-brand-accent group-hover:text-white transition-all shrink-0">
                      <Phone size={24} />
                    </div>
                    <div>
                      <h4 className="text-xs uppercase tracking-widest text-brand-accent font-bold mb-2">Phone</h4>
                      <p className="text-2xl font-serif">{t.contact.phone}</p>
                    </div>
                  </div>

                  <div className="pt-8 flex flex-wrap gap-4">
                    <a 
                      href="https://maps.app.goo.gl/C8bkRmerRwTiJRPFA" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="bg-brand-primary text-white px-8 py-4 rounded-full flex items-center gap-3 hover:bg-brand-accent transition-all shadow-xl"
                    >
                      <MapPin size={18} />
                      {t.contact.directions}
                    </a>
                    <a 
                      href="https://wa.me/971504030102" 
                      className="bg-[#25D366] text-white px-8 py-4 rounded-full flex items-center gap-3 hover:scale-105 transition-all shadow-xl"
                    >
                      <MessageCircle size={18} />
                      {t.contact.whatsapp}
                    </a>
                  </div>
                </div>
              </div>
              
              <div className="h-[500px] rounded-[2.5rem] overflow-hidden border-8 border-brand-secondary shadow-2xl relative">
                {/* Embed Map If Possible, otherwise use Image + Link */}
                <iframe 
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3609.5258953155737!2d55.33777777777778!3d25.191388888888887!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3e5f67389ea1a04d%3A0x63354c414674720!2sResidences%2C%20North%20Podium!5e0!3m2!1sen!2sae!4v1716123456789!5m2!1sen!2sae" 
                  className="w-full h-full border-0" 
                  allowFullScreen={true} 
                  loading="lazy" 
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Salon Location"
                ></iframe>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-brand-primary text-white py-16">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16 border-b border-white/10 pb-16">
            <div className="md:col-span-2">
              <a href="/" className="text-3xl font-serif font-bold tracking-tighter mb-6 block">
                MOOD <span className="font-light italic text-brand-accent">Beauty Salon</span>
              </a>
              <p className="opacity-60 max-w-sm mb-8 leading-relaxed">
                Dubai's premier destination for luxury beauty treatments at Dubai Creek Harbour. Experience the ultimate mood of relaxation and beauty.
              </p>
              <div className="flex gap-4">
                <a href="#" className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center hover:bg-white hover:text-brand-primary transition-all">
                  <Instagram size={18} />
                </a>
                <a href="#" className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center hover:bg-white hover:text-brand-primary transition-all">
                  <Facebook size={18} />
                </a>
              </div>
            </div>
            
            <div>
              <h4 className="font-serif text-xl mb-6">Quick Links</h4>
              <ul className="space-y-4 opacity-60">
                {navItems.map(item => (
                  <li key={item.name}><a href={item.href} className="hover:text-brand-accent transition-colors">{item.name}</a></li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="font-serif text-xl mb-6">Contact</h4>
              <ul className="space-y-4 opacity-60">
                <li>{t.contact.phone}</li>
                <li>Dubai Creek Harbour</li>
              </ul>
            </div>
          </div>
          
          <div className="flex flex-col md:flex-row justify-between items-center gap-6 text-sm opacity-40">
            <p>&copy; 2024 Mood Beauty Salon Dubai. All rights reserved.</p>
            <div className="flex gap-8">
              <a href="#">Privacy Policy</a>
              <a href="#">Terms of Service</a>
            </div>
          </div>
        </div>
      </footer>

      {/* Floating WhatsApp Button */}
      <a 
        href="https://wa.me/971504030102"
        target="_blank"
        rel="noopener noreferrer"
        className={`fixed bottom-8 ${isRTL ? 'left-8' : 'right-8'} z-50 bg-[#25D366] text-white p-4 rounded-full shadow-2xl hover:scale-110 transition-all group overflow-hidden flex items-center gap-2`}
      >
        <span className="max-w-0 group-hover:max-w-xs transition-all duration-500 font-medium overflow-hidden whitespace-nowrap">
          {t.contact.whatsapp}
        </span>
        <MessageCircle size={28} />
      </a>
    </div>
  );
}
