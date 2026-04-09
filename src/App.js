import { useState, useEffect, useRef } from 'react';
import './App.css';

/* ─────────────── CONSTANTS ─────────────── */
const WA_LINK = 'https://wa.me/523349687589?text=Hola%2C%20me%20interesa%20información%20sobre%20terrenos%20en%20aportación%20con%20UDGA%20Capital.';
const PHONE_NUMBER = '33 4968 7589';
const EMAIL = 'inversiones@udgacapital.com';

/* ─────────────── ICONS (inline SVGs) ─────────────── */
const IconPhone = ({ className = "w-6 h-6" }) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24" className={className}>
    <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z" />
  </svg>
);

const IconCheck = ({ className = "w-5 h-5" }) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className={className}>
    <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" />
  </svg>
);

const IconArrowRight = ({ className = "w-5 h-5" }) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className={className}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
  </svg>
);

const IconChevronDown = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
    <path strokeLinecap="round" strokeLinejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
  </svg>
);

const IconBuilding = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-7 h-7">
    <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 21h19.5m-18-18v18m10.5-18v18m6-13.5V21M6.75 6.75h.75m-.75 3h.75m-.75 3h.75m3-6h.75m-.75 3h.75m-.75 3h.75M6.75 21v-3.375c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21M3 3h12m-.75 4.5H21m-3.75 3h.75m-.75 3h.75m-.75 3h.75" />
  </svg>
);

const IconWarehouse = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-7 h-7">
    <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 21v-4.875c0-.621.504-1.125 1.125-1.125h5.25c.621 0 1.125.504 1.125 1.125V21m0 0h4.5V3.545M12.75 21h7.5V10.75M2.25 21h1.5m18 0h-18M2.25 9l4.5-1.636M18.75 3l-1.5.545m0 6.205 3 1m1.5.5-1.5-.5M6.75 7.364V3h-3v18m3-13.636 10.5-3.819" />
  </svg>
);

const IconShoppingBag = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-7 h-7">
    <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 21v-7.5a.75.75 0 0 1 .75-.75h3a.75.75 0 0 1 .75.75V21m-4.5 0H2.36m11.14 0H18m0 0h3.64m-1.39 0V9.349M3.75 21V9.349m0 0a3.001 3.001 0 0 0 3.75-.615A2.993 2.993 0 0 0 9.75 9.75c.896 0 1.7-.393 2.25-1.016a2.993 2.993 0 0 0 2.25 1.016c.896 0 1.7-.393 2.25-1.015a3.001 3.001 0 0 0 3.75.614m-16.5 0a3.004 3.004 0 0 1-.621-4.72l1.189-1.19A1.5 1.5 0 0 1 5.378 3h13.243a1.5 1.5 0 0 1 1.06.44l1.19 1.189a3 3 0 0 1-.621 4.72M6.75 18h3.75a.75.75 0 0 0 .75-.75V13.5a.75.75 0 0 0-.75-.75H6.75a.75.75 0 0 0-.75.75v3.75c0 .414.336.75.75.75Z" />
  </svg>
);

const IconChart = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-7 h-7">
    <path strokeLinecap="round" strokeLinejoin="round" d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 0 1 3 19.875v-6.75ZM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 0 1-1.125-1.125V8.625ZM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 0 1-1.125-1.125V4.125Z" />
  </svg>
);

const IconShield = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-7 h-7">
    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75m-3-7.036A11.959 11.959 0 0 1 3.598 6 11.99 11.99 0 0 0 3 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285Z" />
  </svg>
);

const IconEye = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-7 h-7">
    <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
  </svg>
);

const IconUsers = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-7 h-7">
    <path strokeLinecap="round" strokeLinejoin="round" d="M15 19.128a9.38 9.38 0 0 0 2.625.372 9.337 9.337 0 0 0 4.121-.952 4.125 4.125 0 0 0-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 0 1 8.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0 1 11.964-3.07M12 6.375a3.375 3.375 0 1 1-6.75 0 3.375 3.375 0 0 1 6.75 0Zm8.25 2.25a2.625 2.625 0 1 1-5.25 0 2.625 2.625 0 0 1 5.25 0Z" />
  </svg>
);

const IconStar = ({ className = "w-5 h-5" }) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24" className={className}>
    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
  </svg>
);

const IconMail = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
    <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75" />
  </svg>
);

const IconLocation = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
    <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z" />
  </svg>
);

const IconClock = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
  </svg>
);

const IconX = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
  </svg>
);

/* ─────────────── SCROLL OBSERVER HOOK ─────────────── */
function useInView(options = {}) {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) { setInView(true); observer.disconnect(); }
    }, { threshold: 0.15 });
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return [ref, inView];
}

/* ─────────────── NAVBAR ─────────────── */
function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <nav className={`fixed top-0 w-full z-50 transition-all duration-500 ${scrolled ? 'bg-white/95 backdrop-blur-md shadow-lg' : 'bg-dark-800/90 backdrop-blur-sm'}`}>
      <div className="max-w-7xl mx-auto px-4 md:px-8 flex items-center justify-between h-20">
        {/* Logo */}
        <a href="#inicio" className="flex items-center group">
          <img
            src={scrolled ? "/udga_logo_black.png" : "/udga_logo_white.png"}
            alt="UDGA Capital"
            className="h-16 w-auto transition-all duration-300"
          />
        </a>

        {/* Desktop Nav */}
        <div className="hidden lg:flex items-center gap-8">
          {[
            { href: '#inicio', label: 'Inicio' },
            { href: '#portafolio', label: 'Portafolio' },
            { href: '#proyectos', label: 'Proyectos' },
            { href: '#ventajas', label: 'Ventajas' },
            { href: '#modelo', label: 'Inversión' },
            { href: '#contacto', label: 'Contacto' },
          ].map(link => (
            <a
              key={link.href}
              href={link.href}
              className={`text-sm font-semibold tracking-wide uppercase transition-colors duration-300 hover:text-gold-500 ${scrolled ? 'text-dark-600' : 'text-white/90'}`}
            >
              {link.label}
            </a>
          ))}
          <a href={WA_LINK} target="_blank" rel="noopener noreferrer" className="btn-gold flex items-center gap-2 !px-6 !py-2.5 text-sm">
            <IconPhone className="w-5 h-5" />
            Consultoría
          </a>
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className={`lg:hidden p-2 rounded-lg transition-colors ${scrolled ? 'text-dark-800' : 'text-white'}`}
          aria-label="Menú"
        >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-7 h-7">
            {menuOpen
              ? <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
              : <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
            }
          </svg>
        </button>
      </div>

      {/* Mobile Menu */}
      <div className={`lg:hidden transition-all duration-300 overflow-hidden ${menuOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}`}>
        <div className="bg-white/95 backdrop-blur-md shadow-xl border-t border-gray-100 px-6 py-6 space-y-4">
          {[
            { href: '#inicio', label: 'Inicio' },
            { href: '#portafolio', label: 'Portafolio' },
            { href: '#proyectos', label: 'Proyectos' },
            { href: '#ventajas', label: 'Ventajas' },
            { href: '#modelo', label: 'Inversión' },
            { href: '#contacto', label: 'Contacto' },
          ].map(link => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setMenuOpen(false)}
              className="block text-dark-700 font-semibold text-base hover:text-gold-500 transition-colors"
            >
              {link.label}
            </a>
          ))}
          <a href={WA_LINK} target="_blank" rel="noopener noreferrer" className="btn-gold flex items-center justify-center gap-2 w-full text-center !py-3">
            <IconPhone className="w-5 h-5" />
            Solicitar Consultoría
          </a>
        </div>
      </div>
    </nav>
  );
}

/* ─────────────── HERO ─────────────── */
function Hero() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const slides = [
    { src: '/hero-cityscape.png', alt: 'Terrenos en aportación para desarrollo inmobiliario' },
    { src: '/tower.png', alt: 'Terreno en aportación para desarrollo vertical' },
    { src: '/warehouse.png', alt: 'Terreno en aportación para uso industrial' },
    { src: '/plaza.png', alt: 'Terreno en aportación para plaza comercial' },
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide(prev => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [slides.length]);

  return (
    <section id="inicio" className="relative min-h-screen flex items-center overflow-hidden">
      {/* Background Image Slider */}
      {slides.map((slide, i) => (
        <div
          key={i}
          className={`absolute inset-0 transition-all duration-1000 ${
            i === currentSlide ? 'opacity-100 scale-100' : 'opacity-0 scale-105'
          }`}
        >
          <img
            src={slide.src}
            alt={slide.alt}
            className="w-full h-full object-cover"
          />
        </div>
      ))}
      {/* Dark overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-dark-900/90 via-dark-900/75 to-dark-900/50" />
      {/* Gold accent glow */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-gold-500/[0.06] rounded-full blur-3xl -translate-y-1/2 translate-x-1/4" />

      <div className="relative max-w-7xl mx-auto px-4 md:px-8 pt-28 pb-16">
        <div className="max-w-3xl animate-slide-up">
          <div className="inline-block mb-6 px-4 py-1.5 bg-white/5 border border-white/10 rounded-full">
            <span className="text-gold-400 text-xs sm:text-sm font-semibold tracking-[0.15em] uppercase">Terrenos en Aportación</span>
          </div>

          <h1 className="font-display text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white leading-[1.1] mb-6">
            ¿Tienes un Terreno y{' '}
            <span className="text-gradient-gold">No lo Puedes Vender?</span>
          </h1>

          <p className="text-base md:text-xl text-gray-300 max-w-2xl mb-4 leading-relaxed">
            <strong className="text-white text-lg md:text-2xl">Invierte tu terreno en aportación.</strong>
          </p>
          <p className="text-base md:text-lg text-gray-400 max-w-2xl mb-8 leading-relaxed">
            En UDGA Capital convertimos tu terreno en un proyecto de <strong className="text-white">plaza comercial, residencial, industrial o desarrollo vertical</strong> con aportaciones flexibles del <strong className="text-white">40% al 90%</strong> y retornos de <strong className="text-gold-400">12-22% anual</strong>.
          </p>

          <div className="flex flex-col sm:flex-row items-start gap-3 mb-12">
            <a href={WA_LINK} target="_blank" rel="noopener noreferrer" className="btn-gold flex items-center gap-3 !px-8 !py-4 text-lg animate-pulse-gold">
              <IconPhone className="w-6 h-6" />
              Contáctanos por WhatsApp
            </a>
            <a href="#portafolio" className="btn-outline-gold !border-white/20 !text-white hover:!bg-white/5 hover:!border-gold-500 hover:!text-gold-400 flex items-center gap-2 !px-8 !py-4">
              Ver Proyectos
              <IconChevronDown />
            </a>
          </div>

          {/* Stats Row */}
          <div className="grid grid-cols-3 gap-6 max-w-lg">
            {[
              { num: '20+', label: 'Años de Experiencia' },
              { num: '4', label: 'Tipos de Desarrollo' },
              { num: '40-90%', label: 'Aportación Flexible' },
            ].map((stat, i) => (
              <div key={i} className="text-center">
                <div className="font-display text-3xl md:text-4xl font-bold text-gradient-gold">{stat.num}</div>
                <div className="text-gray-400 text-xs font-semibold uppercase tracking-wider mt-1">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Slide indicators */}
        <div className="absolute bottom-8 right-8 flex gap-2">
          {slides.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrentSlide(i)}
              className={`h-1.5 rounded-full transition-all duration-300 ${
                i === currentSlide ? 'w-10 bg-gold-500' : 'w-4 bg-white/30 hover:bg-white/50'
              }`}
              aria-label={`Imagen ${i + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─────────────── TERRENO CTA BANNER ─────────────── */
function TerrenoBanner() {
  const [ref, inView] = useInView();
  return (
    <section className="relative overflow-hidden bg-gradient-to-r from-dark-900 via-dark-800 to-dark-900 py-16 md:py-20" ref={ref}>
      {/* Gold accent glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-gold-500/[0.06] rounded-full blur-3xl" />
      <div className={`relative max-w-5xl mx-auto px-4 md:px-8 text-center transition-all duration-700 ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
        <div className="inline-block mb-6 px-5 py-2 bg-gold-500/20 border border-gold-500/30 rounded-full">
          <span className="text-gold-400 text-sm font-bold tracking-[0.15em] uppercase">Terrenos en Aportación</span>
        </div>
        <h2 className="font-display text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-[1.15] mb-6">
          ¿Tienes un terreno de cualquier medida <br className="hidden md:block" />
          y <span className="text-gradient-gold">no lo puedes vender</span>?
        </h2>
        <p className="text-lg md:text-xl text-gray-300 max-w-3xl mx-auto mb-4 leading-relaxed">
          No lo dejes parado. <strong className="text-white">Puedes invertirlo en aportación</strong> y obtener rendimientos a través de un desarrollo inmobiliario.
        </p>
        <p className="text-base text-gray-400 max-w-2xl mx-auto mb-10 leading-relaxed">
          Desarrollamos <strong className="text-gold-400">plazas comerciales</strong>, <strong className="text-gold-400">proyectos residenciales</strong>, <strong className="text-gold-400">naves industriales</strong> y <strong className="text-gold-400">desarrollo vertical</strong> sobre tu terreno.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <a
            href={WA_LINK}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-gold flex items-center gap-3 !px-10 !py-4 text-lg animate-pulse-gold"
          >
            <IconPhone className="w-6 h-6" />
            Escríbenos por WhatsApp
          </a>
          <a href={`tel:+523349687589`} className="flex items-center gap-2 text-gray-300 hover:text-gold-400 transition-colors text-lg font-semibold">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 0 0 2.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 0 1-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 0 0-1.091-.852H4.5A2.25 2.25 0 0 0 2.25 4.5v2.25Z" />
            </svg>
            {PHONE_NUMBER}
          </a>
        </div>
      </div>
    </section>
  );
}

/* ─────────────── PORTFOLIO SECTION ─────────────── */
function PortfolioSection() {
  const [ref, inView] = useInView();
  const projects = [
    {
      icon: <IconShoppingBag />,
      title: 'Terreno en Aportación para Plaza Comercial',
      description: '¿Tienes un terreno en zona de alto tráfico? Conviértelo en una plaza comercial rentable. Desarrollamos centros retail de 20,000 a 100,000 m² con ocupación del 95%+.',
      aportacion: '40% - 90%',
      roi: '14-20% anual',
      image: '/plaza.png',
      tag: 'Comercial',
    },
    {
      icon: <IconBuilding />,
      title: 'Terreno en Aportación para Desarrollo Vertical',
      description: '¿Tu terreno está en zona urbana de alto valor? Aporta tu terreno para torres residenciales o corporativas de 15 a 35 pisos con amenidades premium.',
      aportacion: '40% - 90%',
      roi: '15-22% anual',
      image: '/tower.png',
      tag: 'Residencial / Vertical',
    },
    {
      icon: <IconWarehouse />,
      title: 'Terreno en Aportación para Nave Industrial',
      description: '¿Tienes un terreno en corredor logístico? Transfórmalo en bodegas o naves industriales de clase mundial. Proyectos de 5,000 a 50,000 m² en ubicaciones estratégicas.',
      aportacion: '40% - 90%',
      roi: '12-18% anual',
      image: '/warehouse.png',
      tag: 'Industrial',
    },
  ];

  return (
    <section id="portafolio" className="section-padding bg-white" ref={ref}>
      <div className="max-w-7xl mx-auto">
        <div className={`text-center mb-16 transition-all duration-700 ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <span className="text-gold-500 text-sm font-semibold tracking-[0.2em] uppercase">Terrenos en Aportación</span>
          <h2 className="font-display text-3xl md:text-5xl font-bold text-dark-800 mt-3 mb-5">
            ¿Para Qué Tipo de Desarrollo?
          </h2>
          <div className="gold-divider mx-auto" />
          <p className="text-gray-500 mt-6 max-w-2xl mx-auto">
            Tu terreno puede convertirse en un proyecto de alto rendimiento. Elige el tipo de desarrollo que mejor se adapte a tu propiedad.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {projects.map((project, i) => (
            <div
              key={i}
              className={`group relative overflow-hidden rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-500 bg-white border border-gray-100 ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
              style={{ transitionDelay: `${i * 200}ms` }}
            >
              {/* Image */}
              <div className="relative h-56 overflow-hidden">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-dark-900/60 to-transparent" />
                <div className="absolute top-4 left-4 px-3 py-1 bg-gold-500/20 backdrop-blur-sm border border-gold-500/30 rounded-full">
                  <span className="text-gold-400 text-xs font-semibold">{project.tag}</span>
                </div>
                <div className="absolute top-4 right-4 w-12 h-12 rounded-full bg-gold-500/20 backdrop-blur-sm flex items-center justify-center text-gold-400">
                  {project.icon}
                </div>
              </div>

              {/* Content */}
              <div className="p-6 md:p-8">
                <h3 className="font-display text-xl font-bold text-dark-800 mb-3 leading-tight">
                  {project.title}
                </h3>
                <p className="text-gray-600 text-sm leading-relaxed mb-6">
                  {project.description}
                </p>

                {/* Metrics */}
                <div className="grid grid-cols-2 gap-4 mb-6">
                  <div className="bg-gray-50 rounded-xl p-3 text-center border border-gray-100">
                    <p className="text-xs text-gray-500 font-semibold uppercase tracking-wider mb-1">Aportación</p>
                    <p className="text-dark-800 font-bold text-sm">{project.aportacion}</p>
                  </div>
                  <div className="bg-gold-50 rounded-xl p-3 text-center border border-gold-100">
                    <p className="text-xs text-gold-600 font-semibold uppercase tracking-wider mb-1">ROI Proyectado</p>
                    <p className="text-gold-700 font-bold text-sm">{project.roi}</p>
                  </div>
                </div>

                <a
                  href={WA_LINK}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-[#25D366] font-semibold hover:text-[#1da851] transition-colors group/link text-sm"
                >
                  <IconPhone className="w-4 h-4" />
                  Consultar por WhatsApp
                  <span className="group-hover/link:translate-x-1 transition-transform"><IconArrowRight className="w-4 h-4" /></span>
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─────────────── COMPLETED PROJECTS ─────────────── */
function CompletedProjects() {
  const [ref, inView] = useInView();
  const projects = [
    {
      name: 'Complejo Logístico Guadalajara',
      type: 'Bodegas',
      image: '/warehouse.png',
      area: '45,000 m²',
      inversion: '$12.5M',
      roi: '16% anual',
    },
    {
      name: 'Plaza Comercial Punto Real',
      type: 'Plaza Comercial',
      image: '/plaza.png',
      area: '65,000 m²',
      inversion: '$28.3M',
      roi: '18% anual',
    },
    {
      name: 'Torre Mixta Residencial-Corporativa',
      type: 'Desarrollo Vertical',
      image: '/tower.png',
      area: '32,500 m²',
      inversion: '$45.7M',
      roi: '20% anual',
    },
    {
      name: 'Coto Residencial Altavista',
      type: 'Coto de Casas',
      image: '/coto.png',
      area: '18 hectáreas',
      inversion: '$35.2M',
      roi: '17% anual',
    },
  ];

  return (
    <section id="proyectos" className="section-padding bg-dark-800 relative overflow-hidden" ref={ref}>
      {/* Background decorations */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-gold-500/5 rounded-full blur-3xl" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-gold-500/5 rounded-full blur-3xl" />

      <div className="relative max-w-7xl mx-auto">
        <div className={`text-center mb-16 transition-all duration-700 ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <span className="text-gold-500 text-sm font-semibold tracking-[0.2em] uppercase">Terrenos que ya Fueron Aportados</span>
          <h2 className="font-display text-3xl md:text-5xl font-bold text-white mt-3 mb-5">
            Proyectos Realizados en Aportación
          </h2>
          <div className="gold-divider mx-auto" />
          <p className="text-gray-400 mt-6 max-w-2xl mx-auto">
            Terrenos que propietarios como tú decidieron invertir en aportación y hoy generan rendimientos
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6 lg:gap-8">
          {projects.map((project, i) => (
            <div
              key={i}
              className={`group relative overflow-hidden rounded-2xl transition-all duration-500 ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
              style={{ transitionDelay: `${i * 150}ms` }}
            >
              {/* Image */}
              <div className="relative h-72 md:h-80 overflow-hidden">
                <img
                  src={project.image}
                  alt={project.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-dark-900/90 via-dark-900/40 to-transparent" />
                
                {/* Type badge */}
                <div className="absolute top-4 left-4 px-3 py-1 bg-gold-500/20 backdrop-blur-sm border border-gold-500/30 rounded-full">
                  <span className="text-gold-400 text-xs font-semibold">{project.type}</span>
                </div>
              </div>

              {/* Content overlay */}
              <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8">
                <h3 className="font-display text-xl md:text-2xl font-bold text-white mb-4">
                  {project.name}
                </h3>
                
                {/* Stats */}
                <div className="grid grid-cols-3 gap-3">
                  {[
                    { label: 'ÁREA', value: project.area },
                    { label: 'INVERSIÓN', value: project.inversion },
                    { label: 'ROI', value: project.roi },
                  ].map((stat, j) => (
                    <div key={j} className="bg-white/10 backdrop-blur-sm rounded-xl p-3 text-center border border-white/10">
                      <p className="text-gray-400 text-[10px] font-semibold uppercase tracking-wider">{stat.label}</p>
                      <p className="text-white font-bold text-sm mt-0.5">{stat.value}</p>
                    </div>
                  ))}
                </div>

                <a
                  href={WA_LINK}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-gold-400 font-semibold hover:text-gold-300 transition-colors mt-4 text-sm group/link"
                >
                  Solicitar Detalles
                  <span className="group-hover/link:translate-x-1 transition-transform"><IconArrowRight className="w-4 h-4" /></span>
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─────────────── COMPETITIVE ADVANTAGE ─────────────── */
function AdvantageSection() {
  const [ref, inView] = useInView();
  
  const udgaFeatures = [
    { title: 'Aportación Flexible 40-90%', desc: 'Adapta tu inversión a tu capacidad y perfil de riesgo' },
    { title: 'Control Participativo', desc: 'Voto en decisiones clave y acceso a junta directiva' },
    { title: 'Retornos Competitivos', desc: '12-22% anual según tipo de proyecto y aportación' },
    { title: 'Transparencia Total', desc: 'Reportes mensuales, auditorías independientes y portal digital' },
  ];

  const traditionalFeatures = [
    { title: 'Aportación Fija', desc: 'Opciones limitadas y rígidas sin flexibilidad' },
    { title: 'Control Limitado', desc: 'Decisiones centralizadas sin participación' },
    { title: 'Retornos Estándar', desc: '8-12% anual con márgenes predeterminados' },
    { title: 'Poca Transparencia', desc: 'Reportes anuales y acceso limitado a información' },
  ];

  return (
    <section id="ventajas" className="section-padding bg-gradient-to-b from-gray-50 to-white" ref={ref}>
      <div className="max-w-7xl mx-auto">
        <div className={`text-center mb-16 transition-all duration-700 ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <span className="text-gold-500 text-sm font-semibold tracking-[0.2em] uppercase">Ventaja Competitiva</span>
          <h2 className="font-display text-3xl md:text-5xl font-bold text-dark-800 mt-3 mb-5">
            ¿Por Qué Aportar tu Terreno con UDGA?
          </h2>
          <div className="gold-divider mx-auto" />
          <p className="text-gray-500 mt-6 max-w-2xl mx-auto">
            En lugar de dejar tu terreno sin producir, conviértelo en un desarrollo rentable con nuestro modelo de aportación
          </p>
        </div>

        <div className={`grid md:grid-cols-2 gap-8 transition-all duration-700 ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`} style={{ transitionDelay: '200ms' }}>
          {/* UDGA Column */}
          <div className="bg-white rounded-3xl border-2 border-gold-500 p-8 md:p-10 shadow-xl relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-gold-500/10 rounded-full blur-2xl -translate-y-1/2 translate-x-1/2" />
            <div className="relative">
              <div className="flex items-center gap-3 mb-8">
                <div className="w-12 h-12 rounded-full bg-gold-500/20 flex items-center justify-center text-gold-600">
                  <IconCheck className="w-7 h-7" />
                </div>
                <div>
                  <h3 className="font-display text-2xl font-bold text-dark-800">UDGA Capital</h3>
                </div>
              </div>
              <div className="space-y-5">
                {udgaFeatures.map((f, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <span className="flex-shrink-0 w-6 h-6 rounded-full bg-gold-500/20 flex items-center justify-center text-gold-600 mt-0.5">
                      <IconCheck className="w-4 h-4" />
                    </span>
                    <div>
                      <h4 className="font-semibold text-dark-800 text-sm">{f.title}</h4>
                      <p className="text-gray-500 text-xs leading-relaxed mt-0.5">{f.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Traditional Column */}
          <div className="bg-gray-50 rounded-3xl border border-gray-200 p-8 md:p-10">
            <div className="flex items-center gap-3 mb-8">
              <div className="w-12 h-12 rounded-full bg-gray-200 flex items-center justify-center text-gray-400">
                <IconX />
              </div>
              <div>
                <h3 className="font-display text-2xl font-bold text-gray-400">Mercado Tradicional</h3>
              </div>
            </div>
            <div className="space-y-5">
              {traditionalFeatures.map((f, i) => (
                <div key={i} className="flex items-start gap-3">
                  <span className="flex-shrink-0 w-6 h-6 rounded-full bg-gray-200 flex items-center justify-center text-gray-400 mt-0.5">
                    <IconX />
                  </span>
                  <div>
                    <h4 className="font-semibold text-gray-500 text-sm">{f.title}</h4>
                    <p className="text-gray-400 text-xs leading-relaxed mt-0.5">{f.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ─────────────── INVESTMENT MODEL ─────────────── */
function InvestmentModel() {
  const [ref, inView] = useInView();
  const [selectedTier, setSelectedTier] = useState(1);

  const tiers = [
    {
      pct: '40%',
      label: 'Aportación Mínima',
      desc: 'Ideal para inversores que buscan diversificar con menor capital. Retorno esperado: 12-14% anual.',
      profile: 'CONSERVADOR',
      popular: false,
    },
    {
      pct: '65%',
      label: 'Aportación Equilibrada',
      desc: 'Balance perfecto entre control, rentabilidad y riesgo. Retorno esperado: 15-18% anual.',
      profile: 'MODERADO',
      popular: true,
    },
    {
      pct: '90%',
      label: 'Aportación Máxima',
      desc: 'Para inversores con capital disponible y visión de largo plazo. Retorno esperado: 18-22% anual.',
      profile: 'AGRESIVO',
      popular: false,
    },
  ];

  const steps = [
    {
      num: '01',
      title: 'Evaluación Integral',
      desc: 'Análisis exhaustivo de viabilidad técnica, financiera y de mercado. Valuación profesional y proyecciones conservadoras de rentabilidad.',
    },
    {
      num: '02',
      title: 'Estructura Personalizada',
      desc: 'Definición de aportación (40-90%), términos de inversión y calendario de retornos según perfil de riesgo del inversionista.',
    },
    {
      num: '03',
      title: 'Ejecución Transparente',
      desc: 'Reportes mensuales detallados, auditorías independientes y acceso a portal digital para seguimiento en tiempo real del proyecto.',
    },
    {
      num: '04',
      title: 'Retornos Garantizados',
      desc: 'Distribución de ganancias conforme a acuerdos, con opciones de reinversión o salida del proyecto según términos pactados.',
    },
  ];

  return (
    <section id="modelo" className="section-padding bg-dark-800 relative overflow-hidden" ref={ref}>
      <div className="absolute top-0 left-0 w-96 h-96 bg-gold-500/5 rounded-full blur-3xl" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-gold-500/5 rounded-full blur-3xl" />

      <div className="relative max-w-7xl mx-auto">
        <div className={`text-center mb-16 transition-all duration-700 ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <span className="text-gold-500 text-sm font-semibold tracking-[0.2em] uppercase">Modelo de Aportación de Terrenos</span>
          <h2 className="font-display text-3xl md:text-5xl font-bold text-white mt-3 mb-5">
            ¿Cómo Funciona la Aportación?
          </h2>
          <div className="gold-divider mx-auto" />
          <p className="text-gray-400 mt-6 max-w-2xl mx-auto">
            Tu terreno se convierte en tu inversión. Elige el porcentaje de aportación que se ajuste a tu situación.
          </p>
        </div>

        {/* Tier Cards */}
        <div className={`grid md:grid-cols-3 gap-6 mb-20 transition-all duration-700 ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`} style={{ transitionDelay: '200ms' }}>
          {tiers.map((tier, i) => (
            <button
              key={i}
              onClick={() => setSelectedTier(i)}
              className={`relative text-left rounded-2xl p-6 md:p-8 transition-all duration-300 border-2 ${
                selectedTier === i
                  ? 'bg-white/10 border-gold-500 shadow-xl shadow-gold-500/10'
                  : 'bg-white/5 border-white/10 hover:border-white/20'
              }`}
            >
              {tier.popular && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 bg-gold-500 rounded-full">
                  <span className="text-white text-xs font-bold uppercase tracking-wider">Más Popular</span>
                </div>
              )}
              <div className={`font-display text-5xl md:text-6xl font-bold mb-4 ${selectedTier === i ? 'text-gradient-gold' : 'text-white'}`}>
                {tier.pct}
              </div>
              <h3 className="font-display text-lg font-bold text-white mb-2">{tier.label}</h3>
              <p className="text-gray-400 text-sm leading-relaxed mb-4">{tier.desc}</p>
              <div className={`inline-block px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider ${
                selectedTier === i 
                  ? 'bg-gold-500/20 text-gold-400 border border-gold-500/30'
                  : 'bg-white/5 text-gray-500 border border-white/10'
              }`}>
                Perfil: {tier.profile}
              </div>
            </button>
          ))}
        </div>

        {/* Process Steps */}
        <div className={`transition-all duration-700 ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`} style={{ transitionDelay: '400ms' }}>
          <h3 className="font-display text-2xl md:text-3xl font-bold text-white text-center mb-12">
            Proceso de Inversión
          </h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {steps.map((step, i) => (
              <div key={i} className="flex flex-col items-start group">
                <div className="flex-shrink-0 w-16 h-16 rounded-2xl bg-gradient-to-br from-gold-500 to-gold-700 flex items-center justify-center text-white font-display text-xl font-bold shadow-lg shadow-gold-500/20 group-hover:scale-110 transition-transform duration-300 mb-5">
                  {step.num}
                </div>
                <h4 className="font-display text-lg font-bold text-white mb-2">{step.title}</h4>
                <p className="text-gray-400 text-sm leading-relaxed">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ─────────────── TESTIMONIALS ─────────────── */
function Testimonials() {
  const [ref, inView] = useInView();
  const testimonials = [
    {
      name: 'Lic. Carlos Mendoza',
      role: 'Empresario, Guadalajara',
      aportacion: '65%',
      text: 'Invertí con UDGA Capital en un proyecto de bodegas. La flexibilidad de aportación y el retorno del 16% anual superó mis expectativas. Equipo muy profesional.',
    },
    {
      name: 'Ing. Patricia Gómez',
      role: 'Directora Financiera, Empresa Multinacional',
      aportacion: '40%',
      text: 'Como inversora institucional, valoro la transparencia y reportes mensuales de UDGA. El proyecto de desarrollo vertical entregó a tiempo y con márgenes superiores.',
    },
    {
      name: 'Dr. Roberto Sánchez',
      role: 'Inversionista Privado, Jalisco',
      aportacion: '90%',
      text: 'Participé con aportación máxima en plaza comercial. El control sobre decisiones y los retornos del 19% anual hacen que sea mi socio preferido en inmobiliario.',
    },
  ];

  return (
    <section className="section-padding bg-gradient-to-b from-white to-gray-50" ref={ref}>
      <div className="max-w-7xl mx-auto">
        <div className={`text-center mb-16 transition-all duration-700 ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <span className="text-gold-500 text-sm font-semibold tracking-[0.2em] uppercase">Casos de Éxito</span>
          <h2 className="font-display text-3xl md:text-5xl font-bold text-dark-800 mt-3 mb-5">
            Lo Que Dicen Nuestros Inversores
          </h2>
          <div className="gold-divider mx-auto" />
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((t, i) => (
            <div
              key={i}
              className={`bg-white rounded-2xl p-8 shadow-xl border border-gray-100 hover:shadow-2xl transition-all duration-500 ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
              style={{ transitionDelay: `${i * 150}ms` }}
            >
              {/* Stars */}
              <div className="flex gap-1 mb-5">
                {[...Array(5)].map((_, j) => (
                  <IconStar key={j} className="w-5 h-5 text-gold-500" />
                ))}
              </div>

              <p className="text-gray-600 leading-relaxed mb-6 text-sm italic">
                "{t.text}"
              </p>

              <div className="border-t border-gray-100 pt-5">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-gold-500 to-gold-700 flex items-center justify-center text-white font-bold text-lg">
                    {t.name.charAt(0)}
                  </div>
                  <div>
                    <h4 className="font-semibold text-dark-800 text-sm">{t.name}</h4>
                    <p className="text-gray-500 text-xs">{t.role}</p>
                  </div>
                </div>
                <div className="mt-3 inline-block px-3 py-1 bg-gold-50 border border-gold-200 rounded-full">
                  <span className="text-gold-700 text-xs font-semibold">Aportación: {t.aportacion}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─────────────── CONTACT SECTION ─────────────── */
function ContactSection() {
  const [ref, inView] = useInView();
  const [formData, setFormData] = useState({
    nombre: '',
    email: '',
    telefono: '',
    interes: '',
    mensaje: '',
  });

  const handleChange = (e) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Build WhatsApp message from form data
    const msg = `Hola, me interesa información sobre terrenos en aportación con UDGA Capital.%0A%0ANombre: ${formData.nombre}%0AEmail: ${formData.email}%0ATeléfono: ${formData.telefono}%0AInterés: ${formData.interes}%0AMensaje: ${formData.mensaje}`;
    window.open(`https://wa.me/523349687589?text=${msg}`, '_blank');
  };

  return (
    <section id="contacto" className="section-padding bg-white" ref={ref}>
      <div className="max-w-7xl mx-auto">
        <div className={`text-center mb-16 transition-all duration-700 ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <span className="text-gold-500 text-sm font-semibold tracking-[0.2em] uppercase">Próximo Paso</span>
          <h2 className="font-display text-3xl md:text-5xl font-bold text-dark-800 mt-3 mb-5">
            Aporta tu Terreno Hoy
          </h2>
          <div className="gold-divider mx-auto" />
          <p className="text-gray-500 mt-6 max-w-2xl mx-auto">
            Completa el formulario o escríbenos directo por <strong className="text-[#25D366]">WhatsApp</strong> para una consultoría personalizada
          </p>
        </div>

        <div className={`grid lg:grid-cols-5 gap-12 transition-all duration-700 ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`} style={{ transitionDelay: '200ms' }}>
          {/* Contact Info */}
          <div className="lg:col-span-2 space-y-6">
            {/* WhatsApp CTA - prominente */}
            <a
              href={WA_LINK}
              target="_blank"
              rel="noopener noreferrer"
              className="block bg-[#25D366]/10 border-2 border-[#25D366]/30 rounded-2xl p-6 hover:bg-[#25D366]/20 transition-all duration-300 group"
            >
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 rounded-2xl bg-[#25D366] flex items-center justify-center text-white flex-shrink-0 group-hover:scale-110 transition-transform">
                  <IconPhone className="w-8 h-8" />
                </div>
                <div>
                  <h3 className="font-bold text-dark-800 text-lg">WhatsApp — Respuesta Inmediata</h3>
                  <p className="text-[#25D366] font-bold text-xl">{PHONE_NUMBER}</p>
                  <p className="text-gray-500 text-sm mt-0.5">Escríbenos ahora y recibe asesoría personalizada</p>
                </div>
              </div>
            </a>

            <div className="flex items-start gap-4">
              <div className="w-14 h-14 rounded-2xl bg-gold-500/10 flex items-center justify-center text-gold-600 flex-shrink-0">
                <IconMail />
              </div>
              <div>
                <h3 className="font-semibold text-dark-800 mb-1">Email</h3>
                <p className="text-gold-600 font-semibold">{EMAIL}</p>
                <p className="text-gray-500 text-sm mt-0.5">Respuesta en 24 horas</p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="w-14 h-14 rounded-2xl bg-gold-500/10 flex items-center justify-center text-gold-600 flex-shrink-0">
                <IconLocation />
              </div>
              <div>
                <h3 className="font-semibold text-dark-800 mb-1">Oficina Principal</h3>
                <p className="text-gold-600 font-semibold">Guadalajara, Jalisco</p>
                <p className="text-gray-500 text-sm mt-0.5">Zona Metropolitana</p>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="lg:col-span-3">
            <div className="bg-gray-50 rounded-3xl p-8 md:p-10 border border-gray-100">
              <h3 className="font-display text-xl font-bold text-dark-800 mb-6">Solicita Información Personalizada</h3>
              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid md:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-sm font-semibold text-dark-700 mb-1.5">Nombre Completo</label>
                    <input
                      type="text"
                      name="nombre"
                      value={formData.nombre}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-white text-dark-800 text-sm focus:outline-none focus:border-gold-500 focus:ring-2 focus:ring-gold-500/20 transition-all"
                      placeholder="Tu nombre"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-dark-700 mb-1.5">Email</label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-white text-dark-800 text-sm focus:outline-none focus:border-gold-500 focus:ring-2 focus:ring-gold-500/20 transition-all"
                      placeholder="tu@email.com"
                    />
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-sm font-semibold text-dark-700 mb-1.5">Teléfono</label>
                    <input
                      type="tel"
                      name="telefono"
                      value={formData.telefono}
                      onChange={handleChange}
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-white text-dark-800 text-sm focus:outline-none focus:border-gold-500 focus:ring-2 focus:ring-gold-500/20 transition-all"
                      placeholder="+52 (   )    -    "
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-dark-700 mb-1.5">Tipo de Desarrollo para tu Terreno</label>
                    <select
                      name="interes"
                      value={formData.interes}
                      onChange={handleChange}
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-white text-dark-800 text-sm focus:outline-none focus:border-gold-500 focus:ring-2 focus:ring-gold-500/20 transition-all appearance-none"
                    >
                      <option value="">Seleccionar...</option>
                      <option value="comercial">Plaza Comercial</option>
                      <option value="residencial">Residencial</option>
                      <option value="industrial">Industrial / Bodegas</option>
                      <option value="vertical">Desarrollo Vertical</option>
                      <option value="otro">Otro / No sé aún</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-dark-700 mb-1.5">Mensaje</label>
                  <textarea
                    name="mensaje"
                    value={formData.mensaje}
                    onChange={handleChange}
                    rows="4"
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-white text-dark-800 text-sm focus:outline-none focus:border-gold-500 focus:ring-2 focus:ring-gold-500/20 transition-all resize-none"
                    placeholder="Describe tu terreno: ubicación, medidas, situación actual..."
                  ></textarea>
                </div>

                <button type="submit" className="w-full flex items-center justify-center gap-3 !py-4 text-lg font-bold rounded-xl text-white transition-all duration-300 shadow-lg hover:shadow-xl hover:-translate-y-0.5" style={{ backgroundColor: '#25D366' }}>
                  <IconPhone className="w-6 h-6" />
                  Enviar por WhatsApp
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ─────────────── FOOTER ─────────────── */
function Footer() {
  return (
    <footer className="bg-dark-900 text-gray-400 border-t border-white/5">
      <div className="max-w-7xl mx-auto px-4 md:px-8 py-16">
        <div className="grid md:grid-cols-4 gap-10 md:gap-8">
          {/* Brand */}
          <div className="md:col-span-2">
            <div className="flex items-center mb-3">
              <img src="/udga_logo_white.png" alt="UDGA Capital" className="h-14 w-auto" />
            </div>
            <p className="text-gray-500 leading-relaxed max-w-md mt-4">
              Especialistas en terrenos en aportación. 20+ años transformando terrenos improductivos en desarrollos inmobiliarios rentables.
            </p>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-white font-semibold text-sm uppercase tracking-wider mb-4">Servicios</h4>
            <ul className="space-y-2 text-sm">
              {['Plaza Comercial', 'Residencial', 'Industrial', 'Desarrollo Vertical'].map((s, i) => (
                <li key={i}>
                  <a href="#portafolio" className="hover:text-gold-500 transition-colors">{s}</a>
                </li>
              ))}
            </ul>
            <h4 className="text-white font-semibold text-sm uppercase tracking-wider mb-4 mt-6">Empresa</h4>
            <ul className="space-y-2 text-sm">
              {[
                { label: 'Sobre Nosotros', href: '#ventajas' },
                { label: 'Proyectos', href: '#proyectos' },
                { label: 'Equipo', href: '#ventajas' },
              ].map((s, i) => (
                <li key={i}>
                  <a href={s.href} className="hover:text-gold-500 transition-colors">{s.label}</a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-white font-semibold text-sm uppercase tracking-wider mb-4">Contacto</h4>
            <ul className="space-y-3 text-sm">
              <li className="flex items-center gap-2">
                <IconPhone className="w-5 h-5" />
                <a href={WA_LINK} target="_blank" rel="noopener noreferrer" className="hover:text-gold-500 transition-colors">
                  {PHONE_NUMBER}
                </a>
              </li>
              <li className="flex items-center gap-2">
                <IconMail />
                <span>{EMAIL}</span>
              </li>
              <li className="flex items-center gap-2">
                <IconLocation />
                <span>Guadalajara, Jalisco</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-white/5 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-gray-600 text-sm">
            © 2026 UDGA Capital. Todos los derechos reservados.
          </p>
          <div className="flex items-center gap-6 text-gray-600 text-xs">
            <a href="#inicio" className="hover:text-gold-500 transition-colors">Privacidad</a>
            <a href="#inicio" className="hover:text-gold-500 transition-colors">Términos</a>
            <a href="#inicio" className="hover:text-gold-500 transition-colors">Aviso Legal</a>
          </div>
        </div>
      </div>
    </footer>
  );
}

/* ─────────────── FLOATING WHATSAPP BUTTON ─────────────── */
function FloatingWhatsApp() {
  return (
    <a
      href={WA_LINK}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-50 flex items-center gap-3 group"
      aria-label="WhatsApp"
    >
      {/* Label */}
      <span className="hidden sm:block bg-white text-dark-800 font-bold text-sm px-4 py-2.5 rounded-full shadow-xl border border-gray-100 group-hover:scale-105 transition-transform">
        ¿Tienes un terreno? 💬
      </span>
      {/* Button */}
      <div
        className="w-16 h-16 rounded-full bg-[#25D366] text-white flex items-center justify-center shadow-2xl hover:scale-110 transition-all duration-300 animate-bounce-slow"
        style={{ boxShadow: '0 4px 20px rgba(37, 211, 102, 0.4)' }}
      >
        <IconPhone className="w-7 h-7" />
      </div>
    </a>
  );
}

/* ─────────────── APP ─────────────── */
function App() {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <Hero />
      <TerrenoBanner />
      <PortfolioSection />
      <CompletedProjects />
      <AdvantageSection />
      <InvestmentModel />
      <Testimonials />
      <ContactSection />
      <Footer />
      <FloatingWhatsApp />
    </div>
  );
}

export default App;
