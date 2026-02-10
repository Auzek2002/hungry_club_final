'use client'

import Image from "next/image";
import Script from "next/script";
import { useState, useEffect, useRef } from 'react';

export default function Home() {
  const [isMobile, setIsMobile] = useState(false);
  const [activeCard, setActiveCard] = useState<string | null>(null);
  const [isOrderModalOpen, setIsOrderModalOpen] = useState(false);
  const [lieferandoUrl, setLieferandoUrl] = useState('');
  const [highlightedCard, setHighlightedCard] = useState<string | null>(null);
  const [activeLegalModal, setActiveLegalModal] = useState<'datenschutz' | 'nutzung' | 'impressum' | null>(null);
  const glfMenuRef = useRef<HTMLSpanElement>(null);
  const glfReservationRef = useRef<HTMLSpanElement>(null);

  const openGloriaFoodMenu = () => {
    glfMenuRef.current?.click();
  };

  const handleCardClick = (url: string) => {
    setLieferandoUrl(url);
    setIsOrderModalOpen(true);
  };

  const openGloriaFoodReservation = () => {
    glfReservationRef.current?.click();
  };

  const scrollToAndHighlight = (elementId: string) => {
    const el = document.getElementById(elementId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'center' });
      const duration = window.innerWidth < 1024 ? 5000 : 3000;
      setTimeout(() => {
        setHighlightedCard(elementId);
        setTimeout(() => setHighlightedCard(null), duration);
      }, 600);
    }
  };

  // Lock body scroll when modal is open
  useEffect(() => {
    if (isOrderModalOpen || activeLegalModal) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [isOrderModalOpen, activeLegalModal]);

  useEffect(() => {
    // Check if it's mobile on mount
    setIsMobile(window.innerWidth < 1024);

    const handleResize = () => {
      setIsMobile(window.innerWidth < 1024);
    };

    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  // Handle navigation click to activate card hover effect
  const handleNavClick = (cardId: string) => {
    setActiveCard(cardId);
    // Remove the active state after 2 seconds
    setTimeout(() => {
      setActiveCard(null);
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50">
        {/* Premium navbar */}
        <div className="relative h-16 lg:h-[72px] bg-gradient-to-b from-[#E31837] via-[#D41530] to-[#C01228] shadow-[0_4px_30px_rgba(153,0,0,0.4)]">
          {/* Subtle top highlight line */}
          <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />
          {/* Bottom border glow */}
          <div className="absolute bottom-0 left-0 right-0 h-px bg-[#990000]" />
          <div className="absolute -bottom-px left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#FF4D6A]/30 to-transparent" />

          <div className="max-w-7xl mx-auto px-3 lg:px-8 h-full">
            <div className="flex items-center h-full justify-between">
              {/* Logo on the left */}
              <div className="flex items-center h-full py-1 lg:py-1.5">
                <div className="group bg-white rounded-xl shadow-[0_2px_15px_rgba(0,0,0,0.2)] border-2 border-white/80 h-full aspect-square lg:aspect-[7/3] overflow-hidden transition-all duration-300 hover:shadow-[0_0_25px_rgba(255,255,255,0.6)] hover:scale-105 cursor-pointer p-1">
                  <div className="relative w-full h-full">
                    <Image
                      src="/logo_4k.png"
                      alt="Hungry Club Logo"
                      fill
                      className="object-cover transition-transform group-hover:scale-110 rounded-md"
                      priority
                    />
                  </div>
                </div>
              </div>

              {/* Navigation Buttons */}
              <div className="flex items-center gap-1.5 lg:gap-2.5">
                <button
                  onClick={() => scrollToAndHighlight('about-card')}
                  className="nav-btn-shine whitespace-nowrap px-2.5 py-1.5 lg:px-5 lg:py-2 text-[10px] lg:text-sm font-black tracking-wide text-[#E31837] hover:text-white bg-white hover:bg-[#E31837] rounded-lg lg:rounded-xl shadow-[0_2px_10px_rgba(0,0,0,0.15)] hover:shadow-[0_4px_20px_rgba(255,255,255,0.3)] border border-white/80 hover:border-white transition-all duration-300 hover:scale-105"
                >
                  Über Uns
                </button>
                <button
                  onClick={() => scrollToAndHighlight('contact-card')}
                  className="nav-btn-shine whitespace-nowrap px-2.5 py-1.5 lg:px-5 lg:py-2 text-[10px] lg:text-sm font-black tracking-wide text-[#E31837] hover:text-white bg-white hover:bg-[#E31837] rounded-lg lg:rounded-xl shadow-[0_2px_10px_rgba(0,0,0,0.15)] hover:shadow-[0_4px_20px_rgba(255,255,255,0.3)] border border-white/80 hover:border-white transition-all duration-300 hover:scale-105"
                >
                  Kontakt
                </button>
                <button
                  onClick={openGloriaFoodReservation}
                  className="nav-btn-shine whitespace-nowrap px-2.5 py-1.5 lg:px-5 lg:py-2 text-[10px] lg:text-sm font-black tracking-wide text-[#E31837] hover:text-white bg-white hover:bg-[#E31837] rounded-lg lg:rounded-xl shadow-[0_2px_10px_rgba(0,0,0,0.15)] hover:shadow-[0_4px_20px_rgba(255,255,255,0.3)] border border-white/80 hover:border-white transition-all duration-300 hover:scale-105"
                >
                  Reservierung
                </button>
              </div>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative h-screen overflow-hidden pt-16 lg:pt-[72px]">
        {/* Background Image */}
        <div className="absolute inset-0">
          {/* Mobile Image */}
          <div className="absolute inset-0 lg:hidden">
            <Image
              src="/H_mob_3.png"
              alt="Delicious Food Background"
              fill
              className="object-cover"
              priority
            />
          </div>
          {/* Desktop Image */}
          <Image
            src="/H_8.png"
            alt="Delicious Food Background"
            fill
            className="object-cover object-[50%_5%] hidden lg:block"
            priority
          />
        </div>

        {/* Hero Text Overlay */}
        <div className="absolute inset-0 flex flex-col items-center justify-center z-10">
          {/* Cinematic gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black/60"></div>
          <div className="absolute inset-0 bg-gradient-to-r from-black/30 via-transparent to-black/30"></div>

          <div className="relative text-center px-4 md:px-6 max-w-6xl mx-auto w-full">
            {/* Decorative top accent */}
            <div className="flex items-center justify-center gap-4 mb-6 md:mb-8">
              <div className="h-[1px] w-12 md:w-20 bg-gradient-to-r from-transparent to-white/60"></div>
              <span className="text-white/80 text-xs md:text-sm tracking-[0.3em] uppercase font-light">Est. 2026</span>
              <div className="h-[1px] w-12 md:w-20 bg-gradient-to-l from-transparent to-white/60"></div>
            </div>

            {/* Main Punchline */}
            <h1
              className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl text-white mb-2 md:mb-3 tracking-tight leading-[0.9]"
              style={{ fontFamily: 'var(--font-anton)', textShadow: '0 4px 30px rgba(0,0,0,0.5)' }}
            >
              DEIN HUNGER.
            </h1>
            <h1
              className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl text-[#CC0000] mb-8 md:mb-10 tracking-tight leading-[0.9]"
              style={{ fontFamily: 'var(--font-anton)', textShadow: '0 4px 30px rgba(0,0,0,0.4), 0 0 60px rgba(204,0,0,0.3)' }}
            >
              UNSER AUFTRAG.
            </h1>

            {/* Subtext with decorative lines */}
            <div className="flex items-center justify-center gap-4 md:gap-6 mb-8 md:mb-10">
              <div className="h-[1px] w-8 md:w-16 bg-white/40"></div>
              <p className="text-base sm:text-lg md:text-xl text-white/90 tracking-[0.15em] uppercase font-light">
                Willkommen im Club der Hungrigen
              </p>
              <div className="h-[1px] w-8 md:w-16 bg-white/40"></div>
            </div>

            {/* CTA Buttons */}
            <div className="flex items-center justify-center gap-3 md:gap-5">
              <button
                onClick={openGloriaFoodReservation}
                className="hero-btn-primary whitespace-nowrap px-4 py-2 md:px-10 md:py-4 text-xs md:text-lg bg-white/10 backdrop-blur-md text-white font-bold rounded-full border-2 border-white/40 hover:bg-white/25 hover:border-white/80 hover:scale-110 hover:shadow-[0_0_40px_rgba(255,255,255,0.3)] transition-all duration-500 tracking-wider uppercase"
              >
                Tisch Reservieren
              </button>
              <button
                onClick={() => document.getElementById('restaurants')?.scrollIntoView({ behavior: 'smooth' })}
                className="hero-btn-secondary whitespace-nowrap px-4 py-2 md:px-10 md:py-4 text-xs md:text-lg bg-gradient-to-r from-[#E31837] via-[#CC0000] to-[#E31837] text-white font-bold rounded-full border-2 border-white/40 hover:border-white/80 hover:scale-110 hover:shadow-[0_0_40px_rgba(227,24,55,0.7)] transition-all duration-500 tracking-wider uppercase"
              >
                Online Bestellen
              </button>
            </div>

            {/* Scroll indicator */}
            <button
              onClick={() => document.getElementById('restaurants')?.scrollIntoView({ behavior: 'smooth' })}
              className="absolute left-1/2 -translate-x-1/2 bottom-[-80px] md:bottom-[-100px] flex flex-col items-center gap-2 opacity-60 hover:opacity-100 transition-opacity cursor-pointer"
            >
              <span className="text-white/70 text-xs tracking-widest uppercase">Entdecken</span>
              <div className="w-[1px] h-8 bg-gradient-to-b from-white/70 to-transparent"></div>
            </button>
          </div>
        </div>
      </section>

      {/* Restaurant Cards Section */}
      <section id="restaurants" className="relative py-20 scroll-mt-20" style={{ backgroundImage: 'url(/bg.png)', backgroundRepeat: 'repeat', backgroundSize: '400px' }}>
        <div className="relative z-10 max-w-7xl mx-auto px-8">
          {/* Section Heading */}
          <div className="text-center mb-12 md:mb-16">
            <h2
              className="text-4xl md:text-5xl lg:text-6xl text-white mb-4 tracking-tight"
              style={{ fontFamily: 'var(--font-anton)', textShadow: '0 4px 30px rgba(0,0,0,0.8), 0 0 60px rgba(255,255,255,0.3)' }}
            >
              Alle Küchen auf einen Blick.
            </h2>
            <p className="text-lg sm:text-xl md:text-2xl text-white font-semibold tracking-wide mt-2">
              Jetzt Menü ansehen & direkt online bestellen.
            </p>
            <div className="flex items-center justify-center gap-4 mt-4">
              <div className="h-[2px] w-16 md:w-24 bg-gradient-to-r from-transparent to-white"></div>
              <div className="h-[2px] w-16 md:w-24 bg-gradient-to-l from-transparent to-white"></div>
            </div>
          </div>

          {/* Desktop Grid Layout (2-2-1) */}
          <div className="hidden lg:block">
            {/* First Row - 2 Cards */}
            <div className="grid grid-cols-2 gap-6 mb-6">
              {/* Toshi Sushi Card */}
              <div id="toshi-sushi" className="scroll-mt-20">
                <div onClick={() => handleCardClick('https://www.lieferando.de/speisekarte/toshi-sushi-asia-kuche')} className={`block relative h-75 rounded-2xl overflow-hidden shadow-2xl border-4 transition-all duration-700 cursor-pointer ${activeCard === 'toshi-sushi' ? 'shadow-[0_0_60px_rgba(255,255,255,0.8)] border-white scale-[1.02] group' : 'border-white hover:shadow-[0_0_60px_rgba(255,255,255,0.8)] hover:border-white hover:scale-[1.02] group'}`}>
                  <Image
                    src="/toshi_card.png"
                    alt="Toshi Sushi & Asia Küche"
                    fill
                    className={`object-cover object-[50%_38%] transition-all duration-700 ${activeCard === 'toshi-sushi' ? 'scale-110' : 'group-hover:scale-110'}`}
                  />
                </div>
                <button
                  onClick={openGloriaFoodMenu}
                  className="w-full mt-4 px-6 py-3 bg-white text-[#E31837] font-bold rounded-xl hover:bg-[#E31837] hover:text-white hover:scale-[1.02] transition-all duration-300 shadow-[0_4px_20px_rgba(0,0,0,0.4)] hover:shadow-[0_6px_30px_rgba(227,24,55,0.6)] border-4 border-white uppercase tracking-wide"
                  style={{ fontFamily: 'var(--font-anton)' }}
                >
                  Entdecken Sie das Menu
                </button>
              </div>

              {/* Hiro Burger Card */}
              <div id="hiro-burger" className="scroll-mt-20">
                <div onClick={() => handleCardClick('https://www.lieferando.de/speisekarte/hiro-burger')} className={`block relative h-75 rounded-2xl overflow-hidden shadow-2xl border-4 transition-all duration-700 cursor-pointer ${activeCard === 'hiro-burger' ? 'shadow-[0_0_60px_rgba(255,255,255,0.8)] border-white scale-[1.02] group' : 'border-white hover:shadow-[0_0_60px_rgba(255,255,255,0.8)] hover:border-white hover:scale-[1.02] group'}`}>
                  <Image
                    src="/hiro_card.png"
                    alt="Hiro Burger"
                    fill
                    className={`object-cover object-[50%_22%] transition-all duration-700 ${activeCard === 'hiro-burger' ? 'scale-110' : 'group-hover:scale-110'}`}
                  />
                </div>
                <button
                  onClick={openGloriaFoodMenu}
                  className="w-full mt-4 px-6 py-3 bg-white text-[#E31837] font-bold rounded-xl hover:bg-[#E31837] hover:text-white hover:scale-[1.02] transition-all duration-300 shadow-[0_4px_20px_rgba(0,0,0,0.4)] hover:shadow-[0_6px_30px_rgba(227,24,55,0.6)] border-4 border-white uppercase tracking-wide"
                  style={{ fontFamily: 'var(--font-anton)' }}
                >
                  Entdecken Sie das Menu
                </button>
              </div>
            </div>

            {/* Second Row - 2 Cards */}
            <div className="grid grid-cols-2 gap-6 mb-6">
              {/* Pizza Time Card */}
              <div id="pizza-time" className="scroll-mt-20">
                <div onClick={() => handleCardClick('https://www.lieferando.de/speisekarte/chatime-dresden')} className={`block relative h-75 rounded-2xl overflow-hidden shadow-2xl border-4 transition-all duration-700 cursor-pointer ${activeCard === 'pizza-time' ? 'shadow-[0_0_60px_rgba(255,255,255,0.8)] border-white scale-[1.02] group' : 'border-white hover:shadow-[0_0_60px_rgba(255,255,255,0.8)] hover:border-white hover:scale-[1.02] group'}`}>
                  <Image
                    src="/pizza_card_1.png"
                    alt="Pizza Time"
                    fill
                    className={`object-cover object-[50%_28%] transition-all duration-700 ${activeCard === 'pizza-time' ? 'scale-110' : 'group-hover:scale-110'}`}
                  />
                </div>
                <button
                  onClick={openGloriaFoodMenu}
                  className="w-full mt-4 px-6 py-3 bg-white text-[#E31837] font-bold rounded-xl hover:bg-[#E31837] hover:text-white hover:scale-[1.02] transition-all duration-300 shadow-[0_4px_20px_rgba(0,0,0,0.4)] hover:shadow-[0_6px_30px_rgba(227,24,55,0.6)] border-4 border-white uppercase tracking-wide"
                  style={{ fontFamily: 'var(--font-anton)' }}
                >
                  Entdecken Sie das Menu
                </button>
              </div>

              {/* Los Tacos Card */}
              <div id="los-tacos" className="scroll-mt-20">
                <div onClick={() => handleCardClick('https://www.lieferando.de/speisekarte/los-tacos-elisabethstrasse')} className={`block relative h-75 rounded-2xl overflow-hidden shadow-2xl border-4 transition-all duration-700 cursor-pointer ${activeCard === 'los-tacos' ? 'shadow-[0_0_60px_rgba(255,255,255,0.8)] border-white scale-[1.02] group' : 'border-white hover:shadow-[0_0_60px_rgba(255,255,255,0.8)] hover:border-white hover:scale-[1.02] group'}`}>
                  <Image
                    src="/los_card.png"
                    alt="Los Tacos"
                    fill
                    className={`object-cover object-[50%_30%] transition-all duration-700 ${activeCard === 'los-tacos' ? 'scale-110' : 'group-hover:scale-110'}`}
                  />
                </div>
                <button
                  onClick={openGloriaFoodMenu}
                  className="w-full mt-4 px-6 py-3 bg-white text-[#E31837] font-bold rounded-xl hover:bg-[#E31837] hover:text-white hover:scale-[1.02] transition-all duration-300 shadow-[0_4px_20px_rgba(0,0,0,0.4)] hover:shadow-[0_6px_30px_rgba(227,24,55,0.6)] border-4 border-white uppercase tracking-wide"
                  style={{ fontFamily: 'var(--font-anton)' }}
                >
                  Entdecken Sie das Menu
                </button>
              </div>
            </div>

            {/* Third Row - 1 Card Centered */}
            <div className="flex justify-center">
              <div id="bowlicious" className="scroll-mt-20 w-1/2">
                <div onClick={() => handleCardClick('https://www.lieferando.de/speisekarte/bowlicious-freital')} className={`block relative h-75 rounded-2xl overflow-hidden shadow-2xl border-4 transition-all duration-700 cursor-pointer ${activeCard === 'bowlicious' ? 'shadow-[0_0_60px_rgba(255,255,255,0.8)] border-white scale-[1.02] group' : 'border-white hover:shadow-[0_0_60px_rgba(255,255,255,0.8)] hover:border-white hover:scale-[1.02] group'}`}>
                  <Image
                    src="/bowl_card_1.png"
                    alt="Bowlicious"
                    fill
                    className={`object-cover object-[50%_44%] transition-all duration-700 ${activeCard === 'bowlicious' ? 'scale-110' : 'group-hover:scale-110'}`}
                  />
                </div>
                <button
                  onClick={openGloriaFoodMenu}
                  className="w-full mt-4 px-6 py-3 bg-white text-[#E31837] font-bold rounded-xl hover:bg-[#E31837] hover:text-white hover:scale-[1.02] transition-all duration-300 shadow-[0_4px_20px_rgba(0,0,0,0.4)] hover:shadow-[0_6px_30px_rgba(227,24,55,0.6)] border-4 border-white uppercase tracking-wide"
                  style={{ fontFamily: 'var(--font-anton)' }}
                >
                  Entdecken Sie das Menu
                </button>
              </div>
            </div>
          </div>

          {/* Mobile Award-Winning Layout */}
          <div className="lg:hidden space-y-5">
            {/* Toshi Sushi Card */}
            <div id="toshi-sushi-mobile" className="scroll-mt-20 group">
              <div className="relative overflow-hidden rounded-2xl">
                <div className="absolute -inset-1 bg-gradient-to-r from-white/50 via-white/30 to-white/50 rounded-2xl blur-md opacity-0 group-active:opacity-100 transition-opacity duration-300"></div>
                <div className="relative">
                  <div onClick={() => handleCardClick('https://www.lieferando.de/speisekarte/toshi-sushi-asia-kuche')} className={`block relative aspect-[16/9] rounded-2xl overflow-hidden shadow-2xl border-4 transition-all duration-500 cursor-pointer ${activeCard === 'toshi-sushi' ? 'shadow-[0_0_40px_rgba(255,255,255,0.8)] border-white scale-[1.02]' : 'border-white active:scale-[0.98]'}`}>
                    <Image
                      src="/toshi_card.png"
                      alt="Toshi Sushi & Asia Küche"
                      fill
                      className={`object-cover object-[50%_38%] transition-transform duration-700 ${activeCard === 'toshi-sushi' ? 'scale-110' : 'group-active:scale-105'}`}
                    />
                  </div>
                  <button
                    onClick={openGloriaFoodMenu}
                    className="w-full mt-3 px-6 py-3 bg-white text-[#E31837] font-bold rounded-xl hover:bg-[#E31837] hover:text-white active:scale-95 transition-all duration-300 shadow-[0_4px_20px_rgba(0,0,0,0.4)] border-4 border-white uppercase tracking-wide text-sm sm:text-base"
                    style={{ fontFamily: 'var(--font-anton)' }}
                  >
                   Entdecken Sie das Menu
                  </button>
                </div>
              </div>
            </div>

            {/* Hiro Burger Card */}
            <div id="hiro-burger-mobile" className="scroll-mt-20 group">
              <div className="relative overflow-hidden rounded-2xl">
                <div className="absolute -inset-1 bg-gradient-to-r from-white/50 via-white/30 to-white/50 rounded-2xl blur-md opacity-0 group-active:opacity-100 transition-opacity duration-300"></div>
                <div className="relative">
                  <div onClick={() => handleCardClick('https://www.lieferando.de/speisekarte/hiro-burger')} className={`block relative aspect-[16/9] rounded-2xl overflow-hidden shadow-2xl border-4 transition-all duration-500 cursor-pointer ${activeCard === 'hiro-burger' ? 'shadow-[0_0_40px_rgba(255,255,255,0.8)] border-white scale-[1.02]' : 'border-white active:scale-[0.98]'}`}>
                    <Image
                      src="/hiro_card.png"
                      alt="Hiro Burger"
                      fill
                      className={`object-cover object-[50%_22%] transition-transform duration-700 ${activeCard === 'hiro-burger' ? 'scale-110' : 'group-active:scale-105'}`}
                    />
                  </div>
                  <button
                    onClick={openGloriaFoodMenu}
                    className="w-full mt-3 px-6 py-3 bg-white text-[#E31837] font-bold rounded-xl hover:bg-[#E31837] hover:text-white active:scale-95 transition-all duration-300 shadow-[0_4px_20px_rgba(0,0,0,0.4)] border-4 border-white uppercase tracking-wide text-sm sm:text-base"
                    style={{ fontFamily: 'var(--font-anton)' }}
                  >
                    Entdecken Sie das Menu
                  </button>
                </div>
              </div>
            </div>

            {/* Pizza Time Card */}
            <div id="pizza-time-mobile" className="scroll-mt-20 group">
              <div className="relative overflow-hidden rounded-2xl">
                <div className="absolute -inset-1 bg-gradient-to-r from-white/50 via-white/30 to-white/50 rounded-2xl blur-md opacity-0 group-active:opacity-100 transition-opacity duration-300"></div>
                <div className="relative">
                  <div onClick={() => handleCardClick('https://www.lieferando.de/speisekarte/chatime-dresden')} className={`block relative aspect-[16/9] rounded-2xl overflow-hidden shadow-2xl border-4 transition-all duration-500 cursor-pointer ${activeCard === 'pizza-time' ? 'shadow-[0_0_40px_rgba(255,255,255,0.8)] border-white scale-[1.02]' : 'border-white active:scale-[0.98]'}`}>
                    <Image
                      src="/pizza_card_1.png"
                      alt="Pizza Time"
                      fill
                      className={`object-cover object-[50%_28%] transition-transform duration-700 ${activeCard === 'pizza-time' ? 'scale-110' : 'group-active:scale-105'}`}
                    />
                  </div>
                  <button
                    onClick={openGloriaFoodMenu}
                    className="w-full mt-3 px-6 py-3 bg-white text-[#E31837] font-bold rounded-xl hover:bg-[#E31837] hover:text-white active:scale-95 transition-all duration-300 shadow-[0_4px_20px_rgba(0,0,0,0.4)] border-4 border-white uppercase tracking-wide text-sm sm:text-base"
                    style={{ fontFamily: 'var(--font-anton)' }}
                  >
                    Entdecken Sie das Menu
                  </button>
                </div>
              </div>
            </div>

            {/* Los Tacos Card */}
            <div id="los-tacos-mobile" className="scroll-mt-20 group">
              <div className="relative overflow-hidden rounded-2xl">
                <div className="absolute -inset-1 bg-gradient-to-r from-white/50 via-white/30 to-white/50 rounded-2xl blur-md opacity-0 group-active:opacity-100 transition-opacity duration-300"></div>
                <div className="relative">
                  <div onClick={() => handleCardClick('https://www.lieferando.de/speisekarte/los-tacos-elisabethstrasse')} className={`block relative aspect-[16/9] rounded-2xl overflow-hidden shadow-2xl border-4 transition-all duration-500 cursor-pointer ${activeCard === 'los-tacos' ? 'shadow-[0_0_40px_rgba(255,255,255,0.8)] border-white scale-[1.02]' : 'border-white active:scale-[0.98]'}`}>
                    <Image
                      src="/los_card.png"
                      alt="Los Tacos"
                      fill
                      className={`object-cover object-[50%_30%] transition-transform duration-700 ${activeCard === 'los-tacos' ? 'scale-110' : 'group-active:scale-105'}`}
                    />
                  </div>
                  <button
                    onClick={openGloriaFoodMenu}
                    className="w-full mt-3 px-6 py-3 bg-white text-[#E31837] font-bold rounded-xl hover:bg-[#E31837] hover:text-white active:scale-95 transition-all duration-300 shadow-[0_4px_20px_rgba(0,0,0,0.4)] border-4 border-white uppercase tracking-wide text-sm sm:text-base"
                    style={{ fontFamily: 'var(--font-anton)' }}
                  >
                    Entdecken Sie das Menu
                  </button>
                </div>
              </div>
            </div>

            {/* Bowlicious Card */}
            <div id="bowlicious-mobile" className="scroll-mt-20 group">
              <div className="relative overflow-hidden rounded-2xl">
                <div className="absolute -inset-1 bg-gradient-to-r from-white/50 via-white/30 to-white/50 rounded-2xl blur-md opacity-0 group-active:opacity-100 transition-opacity duration-300"></div>
                <div className="relative">
                  <div onClick={() => handleCardClick('https://www.lieferando.de/speisekarte/bowlicious-freital')} className={`block relative aspect-[16/9] rounded-2xl overflow-hidden shadow-2xl border-4 transition-all duration-500 cursor-pointer ${activeCard === 'bowlicious' ? 'shadow-[0_0_40px_rgba(255,255,255,0.8)] border-white scale-[1.02]' : 'border-white active:scale-[0.98]'}`}>
                    <Image
                      src="/bowl_card_1.png"
                      alt="Bowlicious"
                      fill
                      className={`object-cover object-[50%_44%] transition-transform duration-700 ${activeCard === 'bowlicious' ? 'scale-110' : 'group-active:scale-105'}`}
                    />
                  </div>
                  <button
                    onClick={openGloriaFoodMenu}
                    className="w-full mt-3 px-6 py-3 bg-white text-[#E31837] font-bold rounded-xl hover:bg-[#E31837] hover:text-white active:scale-95 transition-all duration-300 shadow-[0_4px_20px_rgba(0,0,0,0.4)] border-4 border-white uppercase tracking-wide text-sm sm:text-base"
                    style={{ fontFamily: 'var(--font-anton)' }}
                  >
                    Entdecken Sie das Menu
                  </button>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Food Gallery Carousel */}
      <section className="relative py-20 overflow-hidden bg-gradient-to-b from-gray-900 via-black to-gray-900">
        {/* Decorative top border */}
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-[#E31837] to-transparent"></div>

        <div className="relative z-10">
          {/* Section Heading */}
          <div className="text-center mb-12">
            <h2
              className="text-4xl md:text-5xl lg:text-6xl text-white mb-4 tracking-tight"
              style={{ fontFamily: 'var(--font-anton)', textShadow: '0 4px 30px rgba(0,0,0,0.8), 0 0 60px rgba(255,255,255,0.3)' }}
            >
              UNSERE BESTSELLER
            </h2>
            <div className="flex items-center justify-center gap-4">
              <div className="h-[2px] w-16 md:w-24 bg-gradient-to-r from-transparent to-white"></div>
              <div className="h-[2px] w-16 md:w-24 bg-gradient-to-l from-transparent to-white"></div>
            </div>
          </div>

          {/* Infinite Scroll Carousel */}
          <div className="relative overflow-hidden w-full">
            <div className="flex gap-3 md:gap-4 lg:gap-6 animate-scroll w-max">
              {/* First set of images */}
                <div className="relative w-[250px] h-[200px] md:w-[350px] md:h-[260px] lg:w-[400px] lg:h-[300px] flex-shrink-0 rounded-xl md:rounded-2xl overflow-hidden shadow-2xl border-2 md:border-4 border-white transition-transform duration-300">
                  <Image src="/TOSHI SUSHI/Alaska Roll.webp" alt="Alaska Roll" fill className="object-cover" />
                </div>
                <div className="relative w-[250px] h-[200px] md:w-[350px] md:h-[260px] lg:w-[400px] lg:h-[300px] flex-shrink-0 rounded-xl md:rounded-2xl overflow-hidden shadow-2xl border-2 md:border-4 border-white transition-transform duration-300">
                  <Image src="/PIZZA TIME/Pizza BBQ-Chicken.webp" alt="Banana Pudding" fill className="object-cover" />
                </div>
                <div className="relative w-[250px] h-[200px] md:w-[350px] md:h-[260px] lg:w-[400px] lg:h-[300px] flex-shrink-0 rounded-xl md:rounded-2xl overflow-hidden shadow-2xl border-2 md:border-4 border-white transition-transform duration-300">
                  <Image src="/LOS TACOS/O.G. Taco Burger.webp" alt="Best Red Curry in Town" fill className="object-cover" />
                </div>
                <div className="relative w-[250px] h-[200px] md:w-[350px] md:h-[260px] lg:w-[400px] lg:h-[300px] flex-shrink-0 rounded-xl md:rounded-2xl overflow-hidden shadow-2xl border-2 md:border-4 border-white transition-transform duration-300">
                  <Image src="/HIRO BURGER/The Hiro Smash.webp" alt="Big Boss" fill className="object-cover" />
                </div>
                <div className="relative w-[250px] h-[200px] md:w-[350px] md:h-[260px] lg:w-[400px] lg:h-[300px] flex-shrink-0 rounded-xl md:rounded-2xl overflow-hidden shadow-2xl border-2 md:border-4 border-white transition-transform duration-300">
                  <Image src="/BOWLICIOUS/Baked Shrimp Bowl.webp" alt="Big Buddha" fill className="object-cover" />
                </div>
                <div className="relative w-[250px] h-[200px] md:w-[350px] md:h-[260px] lg:w-[400px] lg:h-[300px] flex-shrink-0 rounded-xl md:rounded-2xl overflow-hidden shadow-2xl border-2 md:border-4 border-white transition-transform duration-300">
                  <Image src="/TOSHI SUSHI/Big Gunkan.webp" alt="Big Gunkan" fill className="object-cover" />
                </div>
                <div className="relative w-[250px] h-[200px] md:w-[350px] md:h-[260px] lg:w-[400px] lg:h-[300px] flex-shrink-0 rounded-xl md:rounded-2xl overflow-hidden shadow-2xl border-2 md:border-4 border-white transition-transform duration-300">
                  <Image src="/TOSHI SUSHI/Big Ocean.webp" alt="Big Ocean" fill className="object-cover" />
                </div>
                <div className="relative w-[250px] h-[200px] md:w-[350px] md:h-[260px] lg:w-[400px] lg:h-[300px] flex-shrink-0 rounded-xl md:rounded-2xl overflow-hidden shadow-2xl border-2 md:border-4 border-white transition-transform duration-300">
                  <Image src="/PIZZA TIME/Pizza Hiro.webp" alt="Bun Bo Nam Bo Tofu" fill className="object-cover" />
                </div>
                <div className="relative w-[250px] h-[200px] md:w-[350px] md:h-[260px] lg:w-[400px] lg:h-[300px] flex-shrink-0 rounded-xl md:rounded-2xl overflow-hidden shadow-2xl border-2 md:border-4 border-white transition-transform duration-300">
                  <Image src="/HIRO BURGER/Double Smashburger.webp" alt="Bun Bo Nam Bo" fill className="object-cover" />
                </div>
                <div className="relative w-[250px] h-[200px] md:w-[350px] md:h-[260px] lg:w-[400px] lg:h-[300px] flex-shrink-0 rounded-xl md:rounded-2xl overflow-hidden shadow-2xl border-2 md:border-4 border-white transition-transform duration-300">
                  <Image src="/TOSHI SUSHI/Bun Cha Nuong.webp" alt="Bun Cha Nuong" fill className="object-cover" />
                </div>
              {/* Duplicate set for infinite loop effect */}
                <div className="relative w-[250px] h-[200px] md:w-[350px] md:h-[260px] lg:w-[400px] lg:h-[300px] flex-shrink-0 rounded-xl md:rounded-2xl overflow-hidden shadow-2xl border-2 md:border-4 border-white transition-transform duration-300">
                  <Image src="/TOSHI SUSHI/Alaska Roll.webp" alt="Alaska Roll" fill className="object-cover" />
                </div>
                <div className="relative w-[250px] h-[200px] md:w-[350px] md:h-[260px] lg:w-[400px] lg:h-[300px] flex-shrink-0 rounded-xl md:rounded-2xl overflow-hidden shadow-2xl border-2 md:border-4 border-white transition-transform duration-300">
                  <Image src="/TOSHI SUSHI/Banana Pudding.webp" alt="Banana Pudding" fill className="object-cover" />
                </div>
                <div className="relative w-[250px] h-[200px] md:w-[350px] md:h-[260px] lg:w-[400px] lg:h-[300px] flex-shrink-0 rounded-xl md:rounded-2xl overflow-hidden shadow-2xl border-2 md:border-4 border-white transition-transform duration-300">
                  <Image src="/TOSHI SUSHI/Best Red Curry in Town.webp" alt="Best Red Curry in Town" fill className="object-cover" />
                </div>
                <div className="relative w-[250px] h-[200px] md:w-[350px] md:h-[260px] lg:w-[400px] lg:h-[300px] flex-shrink-0 rounded-xl md:rounded-2xl overflow-hidden shadow-2xl border-2 md:border-4 border-white transition-transform duration-300">
                  <Image src="/TOSHI SUSHI/Big Boss.webp" alt="Big Boss" fill className="object-cover" />
                </div>
                <div className="relative w-[250px] h-[200px] md:w-[350px] md:h-[260px] lg:w-[400px] lg:h-[300px] flex-shrink-0 rounded-xl md:rounded-2xl overflow-hidden shadow-2xl border-2 md:border-4 border-white transition-transform duration-300">
                  <Image src="/TOSHI SUSHI/Big Buddha.webp" alt="Big Buddha" fill className="object-cover" />
                </div>
                <div className="relative w-[250px] h-[200px] md:w-[350px] md:h-[260px] lg:w-[400px] lg:h-[300px] flex-shrink-0 rounded-xl md:rounded-2xl overflow-hidden shadow-2xl border-2 md:border-4 border-white transition-transform duration-300">
                  <Image src="/TOSHI SUSHI/Big Gunkan.webp" alt="Big Gunkan" fill className="object-cover" />
                </div>
                <div className="relative w-[250px] h-[200px] md:w-[350px] md:h-[260px] lg:w-[400px] lg:h-[300px] flex-shrink-0 rounded-xl md:rounded-2xl overflow-hidden shadow-2xl border-2 md:border-4 border-white transition-transform duration-300">
                  <Image src="/TOSHI SUSHI/Big Ocean.webp" alt="Big Ocean" fill className="object-cover" />
                </div>
                <div className="relative w-[250px] h-[200px] md:w-[350px] md:h-[260px] lg:w-[400px] lg:h-[300px] flex-shrink-0 rounded-xl md:rounded-2xl overflow-hidden shadow-2xl border-2 md:border-4 border-white transition-transform duration-300">
                  <Image src="/TOSHI SUSHI/Bun Bo Nam Bo Tofu (vegetarisch).webp" alt="Bun Bo Nam Bo Tofu" fill className="object-cover" />
                </div>
                <div className="relative w-[250px] h-[200px] md:w-[350px] md:h-[260px] lg:w-[400px] lg:h-[300px] flex-shrink-0 rounded-xl md:rounded-2xl overflow-hidden shadow-2xl border-2 md:border-4 border-white transition-transform duration-300">
                  <Image src="/TOSHI SUSHI/Bun Bo Nam Bo.webp" alt="Bun Bo Nam Bo" fill className="object-cover" />
                </div>
                <div className="relative w-[250px] h-[200px] md:w-[350px] md:h-[260px] lg:w-[400px] lg:h-[300px] flex-shrink-0 rounded-xl md:rounded-2xl overflow-hidden shadow-2xl border-2 md:border-4 border-white transition-transform duration-300">
                  <Image src="/TOSHI SUSHI/Bun Cha Nuong.webp" alt="Bun Cha Nuong" fill className="object-cover" />
                </div>
              {/* Third set for seamless loop */}
                <div className="relative w-[250px] h-[200px] md:w-[350px] md:h-[260px] lg:w-[400px] lg:h-[300px] flex-shrink-0 rounded-xl md:rounded-2xl overflow-hidden shadow-2xl border-2 md:border-4 border-white transition-transform duration-300">
                  <Image src="/TOSHI SUSHI/Alaska Roll.webp" alt="Alaska Roll" fill className="object-cover" />
                </div>
                <div className="relative w-[250px] h-[200px] md:w-[350px] md:h-[260px] lg:w-[400px] lg:h-[300px] flex-shrink-0 rounded-xl md:rounded-2xl overflow-hidden shadow-2xl border-2 md:border-4 border-white transition-transform duration-300">
                  <Image src="/TOSHI SUSHI/Banana Pudding.webp" alt="Banana Pudding" fill className="object-cover" />
                </div>
                <div className="relative w-[250px] h-[200px] md:w-[350px] md:h-[260px] lg:w-[400px] lg:h-[300px] flex-shrink-0 rounded-xl md:rounded-2xl overflow-hidden shadow-2xl border-2 md:border-4 border-white transition-transform duration-300">
                  <Image src="/TOSHI SUSHI/Best Red Curry in Town.webp" alt="Best Red Curry in Town" fill className="object-cover" />
                </div>
                <div className="relative w-[250px] h-[200px] md:w-[350px] md:h-[260px] lg:w-[400px] lg:h-[300px] flex-shrink-0 rounded-xl md:rounded-2xl overflow-hidden shadow-2xl border-2 md:border-4 border-white transition-transform duration-300">
                  <Image src="/TOSHI SUSHI/Big Boss.webp" alt="Big Boss" fill className="object-cover" />
                </div>
                <div className="relative w-[250px] h-[200px] md:w-[350px] md:h-[260px] lg:w-[400px] lg:h-[300px] flex-shrink-0 rounded-xl md:rounded-2xl overflow-hidden shadow-2xl border-2 md:border-4 border-white transition-transform duration-300">
                  <Image src="/TOSHI SUSHI/Big Buddha.webp" alt="Big Buddha" fill className="object-cover" />
                </div>
                <div className="relative w-[250px] h-[200px] md:w-[350px] md:h-[260px] lg:w-[400px] lg:h-[300px] flex-shrink-0 rounded-xl md:rounded-2xl overflow-hidden shadow-2xl border-2 md:border-4 border-white transition-transform duration-300">
                  <Image src="/TOSHI SUSHI/Big Gunkan.webp" alt="Big Gunkan" fill className="object-cover" />
                </div>
                <div className="relative w-[250px] h-[200px] md:w-[350px] md:h-[260px] lg:w-[400px] lg:h-[300px] flex-shrink-0 rounded-xl md:rounded-2xl overflow-hidden shadow-2xl border-2 md:border-4 border-white transition-transform duration-300">
                  <Image src="/TOSHI SUSHI/Big Ocean.webp" alt="Big Ocean" fill className="object-cover" />
                </div>
                <div className="relative w-[250px] h-[200px] md:w-[350px] md:h-[260px] lg:w-[400px] lg:h-[300px] flex-shrink-0 rounded-xl md:rounded-2xl overflow-hidden shadow-2xl border-2 md:border-4 border-white transition-transform duration-300">
                  <Image src="/TOSHI SUSHI/Bun Bo Nam Bo Tofu (vegetarisch).webp" alt="Bun Bo Nam Bo Tofu" fill className="object-cover" />
                </div>
                <div className="relative w-[250px] h-[200px] md:w-[350px] md:h-[260px] lg:w-[400px] lg:h-[300px] flex-shrink-0 rounded-xl md:rounded-2xl overflow-hidden shadow-2xl border-2 md:border-4 border-white transition-transform duration-300">
                  <Image src="/TOSHI SUSHI/Bun Bo Nam Bo.webp" alt="Bun Bo Nam Bo" fill className="object-cover" />
                </div>
                <div className="relative w-[250px] h-[200px] md:w-[350px] md:h-[260px] lg:w-[400px] lg:h-[300px] flex-shrink-0 rounded-xl md:rounded-2xl overflow-hidden shadow-2xl border-2 md:border-4 border-white transition-transform duration-300">
                  <Image src="/TOSHI SUSHI/Bun Cha Nuong.webp" alt="Bun Cha Nuong" fill className="object-cover" />
                </div>
            </div>
          </div>
        </div>
      </section>

      {/* Restaurant Info & Location Section */}
      <section className="relative py-20 bg-white overflow-hidden">
        {/* Decorative top border */}
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-[#E31837] to-transparent"></div>

        <div className="max-w-7xl mx-auto px-6 md:px-8">
          {/* Section Heading */}
          <div className="text-center mb-16">
            <h2
              className="text-4xl md:text-5xl lg:text-6xl text-[#E31837] mb-4 tracking-tight"
              style={{ fontFamily: 'var(--font-anton)', textShadow: '0 2px 20px rgba(227, 24, 55, 0.2)' }}
            >
              HIER FINDEST DU UNS
            </h2>
            <div className="flex items-center justify-center gap-4">
              <div className="h-[2px] w-16 md:w-24 bg-gradient-to-r from-transparent to-[#E31837]"></div>
              <div className="h-[2px] w-16 md:w-24 bg-gradient-to-l from-transparent to-[#E31837]"></div>
            </div>
          </div>

          {/* Content Grid */}
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-start">
            {/* Left Column - Info */}
            <div className="space-y-8 order-2 lg:order-1">
              {/* About */}
              <div
                id="about-card"
                className={`info-card info-card-red bg-gradient-to-br from-gray-50 to-white p-8 rounded-2xl shadow-xl border-2 border-[#E31837]/20 hover:border-[#E31837]/30 scroll-mt-24 ${highlightedCard === 'about-card' ? 'card-highlighted' : ''}`}
              >
                <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4" style={{ fontFamily: 'var(--font-anton)' }}>
                  ÜBER UNS
                </h3>
                <p className="text-gray-700 leading-relaxed mb-4">
                  Hungry Club vereint verschiedene Küchen unter einem Dach – mit einem klaren Anspruch an Qualität, Frische und echten Geschmack.
                </p>
                <p className="text-gray-700 leading-relaxed">
                  Burger, Sushi, Bowls, Tacos, Pizza und Pasta werden bei uns mit Sorgfalt und hochwertigen Zutaten zubereitet. Vielfalt auf hohem Niveau – damit jeder genau das findet, worauf er Lust hat.<br/> <br/>Gutes Essen bringt Menschen zusammen. <br/>Hungry Club – Vielfalt, die man schmeckt.
                </p>
              </div>

              {/* Opening Hours */}
              <div className="info-card info-card-white bg-gradient-to-br from-[#E31837] to-[#CC0000] p-8 rounded-2xl shadow-xl border-2 border-white hover:border-white/80">
                <h3 className="text-2xl md:text-3xl font-bold text-white mb-6" style={{ fontFamily: 'var(--font-anton)' }}>
                  ÖFFNUNGSZEITEN
                </h3>
                <div className="space-y-3">
                  <div className="flex justify-between items-center text-white pb-3">
                    <span className="font-semibold">Montag - Sonntag</span>
                    <span className="font-light">11:30 - 21:00</span>
                  </div>
                </div>
              </div>

              {/* Transportation */}
              <div className="info-card info-card-red bg-gradient-to-br from-gray-50 to-white p-8 rounded-2xl shadow-xl border-2 border-[#E31837]/20 hover:border-[#E31837]/30">
                <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6" style={{ fontFamily: 'var(--font-anton)' }}>
                  ANFAHRT
                </h3>
                <div className="space-y-4">
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-full bg-[#E31837] flex items-center justify-center flex-shrink-0 mt-1">
                      <span className="text-white font-bold text-lg">🚇</span>
                    </div>
                    <div>
                      <p className="font-semibold text-gray-900 mb-1">Öffentliche Verkehrsmittel</p>
                      <p className="text-gray-600 text-sm leading-relaxed">
                        Bushaltestelle Wehrstraße direkt am Standort.<br/>
                        Mit der S-Bahn vom Dresden Hauptbahnhof nur 2 Stationen bis Bahnhof Freital-Deuben, von dort ca. 5 Minuten zu Fuß.
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-full bg-[#E31837] flex items-center justify-center flex-shrink-0 mt-1">
                      <span className="text-white font-bold text-lg">🚗</span>
                    </div>
                    <div>
                      <p className="font-semibold text-gray-900 mb-1">Mit dem Auto</p>
                      <p className="text-gray-600 text-sm leading-relaxed">
                        Parkplätze direkt neben dem Laden vorhanden.
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-full bg-[#E31837] flex items-center justify-center flex-shrink-0 mt-1">
                      <span className="text-white font-bold text-lg">🚴</span>
                    </div>
                    <div>
                      <p className="font-semibold text-gray-900 mb-1">Mit dem Fahrrad</p>
                      <p className="text-gray-600 text-sm leading-relaxed">
                        Fahrradabstellplätze direkt vor Ort verfügbar.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column - Map */}
            <div className="lg:sticky lg:top-24 order-1 lg:order-2">
              <div className="bg-gradient-to-br from-gray-50 to-white p-4 rounded-2xl shadow-xl border-2 border-[#E31837]/20">
                <div className="aspect-[4/3] rounded-xl overflow-hidden shadow-lg">
                  <iframe
                    src="https://maps.google.com/maps?q=Dresdner+Straße+220,+Freital+01705&t=&z=15&ie=UTF8&iwloc=&output=embed"
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    allowFullScreen={true}
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    className="w-full h-full"
                  ></iframe>
                </div>
                <div className="mt-6 text-center">
                  <p className="text-gray-900 font-semibold text-lg mb-2">Hungry Club</p>
                  <p className="text-gray-600 mb-1">Dresdner Straße 220</p>
                  <p className="text-gray-600 mb-4">01705 Freital</p>
                  <a
                    href="https://www.google.com/maps/dir/?api=1&destination=Dresdner+Straße+220,+Freital+01705"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-block px-6 py-3 bg-[#E31837] text-white font-bold rounded-full hover:bg-[#CC0000] hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl"
                  >
                    Route planen
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Instagram Section */}
      <section className="relative bg-gradient-to-b from-[#0a0a0a] via-[#1a1a1a] to-[#0a0a0a] text-white py-20 lg:py-32 overflow-hidden">
        {/* Animated gradient orbs */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-1/4 -left-32 w-96 h-96 bg-[#E31837] rounded-full mix-blend-multiply filter blur-[128px] opacity-10 animate-blob"></div>
          <div className="absolute top-1/3 -right-32 w-96 h-96 bg-[#CC0000] rounded-full mix-blend-multiply filter blur-[128px] opacity-10 animate-blob animation-delay-2000"></div>
          <div className="absolute bottom-1/4 left-1/2 transform -translate-x-1/2 w-96 h-96 bg-[#E31837] rounded-full mix-blend-multiply filter blur-[128px] opacity-10 animate-blob animation-delay-4000"></div>
        </div>

        {/* Grid pattern overlay */}
        <div className="absolute inset-0" style={{
          backgroundImage: `linear-gradient(rgba(227, 24, 55, 0.03) 1px, transparent 1px),
                           linear-gradient(90deg, rgba(227, 24, 55, 0.03) 1px, transparent 1px)`,
          backgroundSize: '50px 50px'
        }}></div>

        {/* Top decorative line */}
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#E31837] to-transparent opacity-50"></div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Section Title */}
          <div className="text-center mb-16 lg:mb-20">
            <div className="flex items-center justify-center gap-4 md:gap-6 mb-6">
              <div className="h-[1px] w-12 md:w-20 bg-gradient-to-r from-transparent to-[#E31837]"></div>
              <div className="relative">
                <div className="absolute inset-0 blur-xl bg-[#E31837] opacity-20"></div>
                <svg className="w-8 h-8 md:w-10 md:h-10 relative z-10" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                </svg>
              </div>
              <div className="h-[1px] w-12 md:w-20 bg-gradient-to-l from-transparent to-[#E31837]"></div>
            </div>
            <h2
              className="text-4xl md:text-5xl lg:text-6xl text-white mb-6 tracking-tight"
              style={{ fontFamily: 'var(--font-anton)', textShadow: '0 4px 30px rgba(227, 24, 55, 0.4), 0 0 60px rgba(227, 24, 55, 0.2)' }}
            >
              FOLGE UNS AUF INSTAGRAM
            </h2>
            <a
              href="https://www.instagram.com/hungryclub.de?igsh=OGJsOXRuaWU3Y2ls"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block px-8 py-4 bg-gradient-to-r from-[#E31837] to-[#CC0000] text-white font-bold text-lg rounded-full hover:from-[#CC0000] hover:to-[#990000] hover:scale-105 transition-all duration-300 shadow-[0_0_30px_rgba(227,24,55,0.5)] hover:shadow-[0_0_50px_rgba(227,24,55,0.8)]"
            >
              @hungryclub.de
            </a>
          </div>

          {/* Instagram Content - Post on Left, Text on Right */}
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-start">
            {/* Left Column - Instagram Post */}
            <div className="flex justify-center lg:justify-start">
              <div className="w-full max-w-[540px] relative group">
              {/* Glow effect */}
              <div className="absolute -inset-4 bg-gradient-to-r from-[#E31837]/20 via-[#CC0000]/20 to-[#E31837]/20 rounded-3xl blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>

              {/* Border wrapper */}
              <div className="relative bg-gradient-to-br from-[#E31837]/10 via-transparent to-[#CC0000]/10 p-[2px] rounded-2xl">
                <div className="bg-[#0a0a0a] rounded-2xl p-3 md:p-4">
              <blockquote
                className="instagram-media"
                data-instgrm-permalink="https://www.instagram.com/reel/DUTR5Y-ArE3/?utm_source=ig_embed&utm_campaign=loading"
                data-instgrm-version="14"
                style={{
                  background: '#FFF',
                  border: 0,
                  borderRadius: '3px',
                  boxShadow: '0 0 1px 0 rgba(0,0,0,0.5),0 1px 10px 0 rgba(0,0,0,0.15)',
                  margin: '1px',
                  maxWidth: '540px',
                  minWidth: '326px',
                  padding: 0,
                  width: '99.375%'
                }}
              >
                <div style={{ padding: '16px' }}>
                  <a
                    href="https://www.instagram.com/reel/DUTR5Y-ArE3/?utm_source=ig_embed&utm_campaign=loading"
                    style={{
                      background: '#FFFFFF',
                      lineHeight: 0,
                      padding: '0 0',
                      textAlign: 'center',
                      textDecoration: 'none',
                      width: '100%'
                    }}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                      <div style={{ backgroundColor: '#F4F4F4', borderRadius: '50%', flexGrow: 0, height: '40px', marginRight: '14px', width: '40px' }}></div>
                      <div style={{ display: 'flex', flexDirection: 'column', flexGrow: 1, justifyContent: 'center' }}>
                        <div style={{ backgroundColor: '#F4F4F4', borderRadius: '4px', flexGrow: 0, height: '14px', marginBottom: '6px', width: '100px' }}></div>
                        <div style={{ backgroundColor: '#F4F4F4', borderRadius: '4px', flexGrow: 0, height: '14px', width: '60px' }}></div>
                      </div>
                    </div>
                    <div style={{ padding: '19% 0' }}></div>
                    <div style={{ display: 'block', height: '50px', margin: '0 auto 12px', width: '50px' }}>
                      <svg width="50px" height="50px" viewBox="0 0 60 60" version="1.1" xmlns="https://www.w3.org/2000/svg" xmlnsXlink="https://www.w3.org/1999/xlink">
                        <g stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
                          <g transform="translate(-511.000000, -20.000000)" fill="#000000">
                            <g>
                              <path d="M556.869,30.41 C554.814,30.41 553.148,32.076 553.148,34.131 C553.148,36.186 554.814,37.852 556.869,37.852 C558.924,37.852 560.59,36.186 560.59,34.131 C560.59,32.076 558.924,30.41 556.869,30.41 M541,60.657 C535.114,60.657 530.342,55.887 530.342,50 C530.342,44.114 535.114,39.342 541,39.342 C546.887,39.342 551.658,44.114 551.658,50 C551.658,55.887 546.887,60.657 541,60.657 M541,33.886 C532.1,33.886 524.886,41.1 524.886,50 C524.886,58.899 532.1,66.113 541,66.113 C549.9,66.113 557.115,58.899 557.115,50 C557.115,41.1 549.9,33.886 541,33.886 M565.378,62.101 C565.244,65.022 564.756,66.606 564.346,67.663 C563.803,69.06 563.154,70.057 562.106,71.106 C561.058,72.155 560.06,72.803 558.662,73.347 C557.607,73.757 556.021,74.244 553.102,74.378 C549.944,74.521 548.997,74.552 541,74.552 C533.003,74.552 532.056,74.521 528.898,74.378 C525.979,74.244 524.393,73.757 523.338,73.347 C521.94,72.803 520.942,72.155 519.894,71.106 C518.846,70.057 518.197,69.06 517.654,67.663 C517.244,66.606 516.755,65.022 516.623,62.101 C516.479,58.943 516.448,57.996 516.448,50 C516.448,42.003 516.479,41.056 516.623,37.899 C516.755,34.978 517.244,33.391 517.654,32.338 C518.197,30.938 518.846,29.942 519.894,28.894 C520.942,27.846 521.94,27.196 523.338,26.654 C524.393,26.244 525.979,25.756 528.898,25.623 C532.057,25.479 533.004,25.448 541,25.448 C548.997,25.448 549.943,25.479 553.102,25.623 C556.021,25.756 557.607,26.244 558.662,26.654 C560.06,27.196 561.058,27.846 562.106,28.894 C563.154,29.942 563.803,30.938 564.346,32.338 C564.756,33.391 565.244,34.978 565.378,37.899 C565.522,41.056 565.552,42.003 565.552,50 C565.552,57.996 565.522,58.943 565.378,62.101 M570.82,37.631 C570.674,34.438 570.167,32.258 569.425,30.349 C568.659,28.377 567.633,26.702 565.965,25.035 C564.297,23.368 562.623,22.342 560.652,21.575 C558.743,20.834 556.562,20.326 553.369,20.18 C550.169,20.033 549.148,20 541,20 C532.853,20 531.831,20.033 528.631,20.18 C525.438,20.326 523.257,20.834 521.349,21.575 C519.376,22.342 517.703,23.368 516.035,25.035 C514.368,26.702 513.342,28.377 512.574,30.349 C511.834,32.258 511.326,34.438 511.181,37.631 C511.035,40.831 511,41.851 511,50 C511,58.147 511.035,59.17 511.181,62.369 C511.326,65.562 511.834,67.743 512.574,69.651 C513.342,71.625 514.368,73.296 516.035,74.965 C517.703,76.634 519.376,77.658 521.349,78.425 C523.257,79.167 525.438,79.673 528.631,79.82 C531.831,79.965 532.853,80.001 541,80.001 C549.148,80.001 550.169,79.965 553.369,79.82 C556.562,79.673 558.743,79.167 560.652,78.425 C562.623,77.658 564.297,76.634 565.965,74.965 C567.633,73.296 568.659,71.625 569.425,69.651 C570.167,67.743 570.674,65.562 570.82,62.369 C570.966,59.17 571,58.147 571,50 C571,41.851 570.966,40.831 570.82,37.631"></path>
                            </g>
                          </g>
                        </g>
                      </svg>
                    </div>
                    <div style={{ paddingTop: '8px' }}>
                      <div style={{ color: '#3897f0', fontFamily: 'Arial,sans-serif', fontSize: '14px', fontStyle: 'normal', fontWeight: 550, lineHeight: '18px' }}>
                        View this post on Instagram
                      </div>
                    </div>
                    <div style={{ padding: '12.5% 0' }}></div>
                    <div style={{ display: 'flex', flexDirection: 'row', marginBottom: '14px', alignItems: 'center' }}>
                      <div>
                        <div style={{ backgroundColor: '#F4F4F4', borderRadius: '50%', height: '12.5px', width: '12.5px', transform: 'translateX(0px) translateY(7px)' }}></div>
                        <div style={{ backgroundColor: '#F4F4F4', height: '12.5px', transform: 'rotate(-45deg) translateX(3px) translateY(1px)', width: '12.5px', flexGrow: 0, marginRight: '14px', marginLeft: '2px' }}></div>
                        <div style={{ backgroundColor: '#F4F4F4', borderRadius: '50%', height: '12.5px', width: '12.5px', transform: 'translateX(9px) translateY(-18px)' }}></div>
                      </div>
                      <div style={{ marginLeft: '8px' }}>
                        <div style={{ backgroundColor: '#F4F4F4', borderRadius: '50%', flexGrow: 0, height: '20px', width: '20px' }}></div>
                        <div style={{ width: 0, height: 0, borderTop: '2px solid transparent', borderLeft: '6px solid #f4f4f4', borderBottom: '2px solid transparent', transform: 'translateX(16px) translateY(-4px) rotate(30deg)' }}></div>
                      </div>
                      <div style={{ marginLeft: 'auto' }}>
                        <div style={{ width: '0px', borderTop: '8px solid #F4F4F4', borderRight: '8px solid transparent', transform: 'translateY(16px)' }}></div>
                        <div style={{ backgroundColor: '#F4F4F4', flexGrow: 0, height: '12px', width: '16px', transform: 'translateY(-4px)' }}></div>
                        <div style={{ width: 0, height: 0, borderTop: '8px solid #F4F4F4', borderLeft: '8px solid transparent', transform: 'translateY(-4px) translateX(8px)' }}></div>
                      </div>
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column', flexGrow: 1, justifyContent: 'center', marginBottom: '24px' }}>
                      <div style={{ backgroundColor: '#F4F4F4', borderRadius: '4px', flexGrow: 0, height: '14px', marginBottom: '6px', width: '224px' }}></div>
                      <div style={{ backgroundColor: '#F4F4F4', borderRadius: '4px', flexGrow: 0, height: '14px', width: '144px' }}></div>
                    </div>
                  </a>
                  <p style={{ color: '#c9c8cd', fontFamily: 'Arial,sans-serif', fontSize: '14px', lineHeight: '17px', marginBottom: 0, marginTop: '8px', overflow: 'hidden', padding: '8px 0 7px', textAlign: 'center', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                    <a
                      href="https://www.instagram.com/reel/DUTR5Y-ArE3/?utm_source=ig_embed&utm_campaign=loading"
                      style={{ color: '#c9c8cd', fontFamily: 'Arial,sans-serif', fontSize: '14px', fontStyle: 'normal', fontWeight: 'normal', lineHeight: '17px', textDecoration: 'none' }}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      A post shared by HUNGRY CLUB (@hungryclub.de)
                    </a>
                  </p>
                </div>
              </blockquote>
              <Script
                async
                src="//www.instagram.com/embed.js"
                strategy="lazyOnload"
              />
                </div>
              </div>
              </div>
            </div>

            {/* Right Column - Text Content + Contact Card */}
            <div className="text-white space-y-6">
              <div className="hidden lg:block space-y-6">
              <h3
                className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 transition-all duration-300 hover:text-[#E31837] hover:scale-105 cursor-default"
                style={{ fontFamily: 'var(--font-anton)', textShadow: '0 2px 20px rgba(255, 255, 255, 0.1)' }}
              >
                ERLEBE KULINARISCHE VIELFALT
              </h3>

              <p className="text-lg md:text-xl text-gray-300 leading-relaxed transition-all duration-300 hover:text-white hover:translate-x-2 cursor-default">
                Tauche ein in unsere Welt voller Geschmackserlebnisse und entdecke täglich neue Kreationen.
              </p>

              <div className="space-y-4">
                <div className="flex items-start gap-4 group">
                  <div className="flex-shrink-0 w-2 h-2 mt-2 bg-[#E31837] rounded-full group-hover:scale-150 transition-transform duration-300"></div>
                  <p className="text-base md:text-lg text-gray-400 group-hover:text-white group-hover:translate-x-2 transition-all duration-300 cursor-default">
                    <span className="font-bold text-white">Authentisch</span> – Jedes Gericht wird mit Leidenschaft und Sorgfalt zubereitet
                  </p>
                </div>

                <div className="flex items-start gap-4 group">
                  <div className="flex-shrink-0 w-2 h-2 mt-2 bg-[#E31837] rounded-full group-hover:scale-150 transition-transform duration-300"></div>
                  <p className="text-base md:text-lg text-gray-400 group-hover:text-white group-hover:translate-x-2 transition-all duration-300 cursor-default">
                    <span className="font-bold text-white">Frisch</span> – Hochwertige Zutaten für den perfekten Genuss
                  </p>
                </div>

                <div className="flex items-start gap-4 group">
                  <div className="flex-shrink-0 w-2 h-2 mt-2 bg-[#E31837] rounded-full group-hover:scale-150 transition-transform duration-300"></div>
                  <p className="text-base md:text-lg text-gray-400 group-hover:text-white group-hover:translate-x-2 transition-all duration-300 cursor-default">
                    <span className="font-bold text-white">Vielfältig</span> – Von Sushi bis Burger – für jeden Geschmack etwas dabei
                  </p>
                </div>
              </div>

              <div className="pt-6">
                <p className="text-xl md:text-2xl font-bold text-white transition-all duration-300 hover:text-[#E31837] hover:scale-105 cursor-default">
                  Folge uns für exklusive Updates! 🔥
                </p>
              </div>
              </div>

              {/* Contact Card */}
              <div id="contact-card" className="mt-8 group relative scroll-mt-24 max-w-sm mx-auto lg:max-w-none lg:mx-0">
                {/* Ambient glow */}
                <div className={`absolute -inset-2 bg-gradient-to-r from-[#E31837]/25 via-[#CC0000]/15 to-[#E31837]/25 rounded-3xl blur-2xl group-hover:from-[#E31837]/40 group-hover:via-[#CC0000]/30 group-hover:to-[#E31837]/40 transition-all duration-700 ${highlightedCard === 'contact-card' ? 'from-[#E31837]/50 via-[#CC0000]/40 to-[#E31837]/50 blur-3xl' : ''}`}></div>

                {/* Gradient border */}
                <div className={`relative p-[1.5px] rounded-2xl bg-gradient-to-br from-[#E31837] via-[#E31837]/40 to-[#CC0000] group-hover:via-[#E31837]/70 transition-all duration-500 ${highlightedCard === 'contact-card' ? 'via-[#E31837]/80' : ''}`}>
                  <div className={`bg-[#141414] rounded-[14px] p-6 group-hover:-translate-y-0.5 transition-all duration-500 ${highlightedCard === 'contact-card' ? '-translate-y-1 shadow-[0_20px_60px_rgba(227,24,55,0.3)]' : ''}`}>
                    {/* Header */}
                    <div className="flex items-center gap-3 mb-5">
                      <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-[#E31837] to-[#CC0000] flex items-center justify-center shadow-[0_4px_20px_rgba(227,24,55,0.5)] group-hover:shadow-[0_4px_30px_rgba(227,24,55,0.7)] group-hover:scale-110 transition-all duration-500">
                        <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                        </svg>
                      </div>
                      <h4
                        className="text-xl font-bold text-white tracking-wide"
                        style={{ fontFamily: 'var(--font-anton)' }}
                      >
                        KONTAKTIERE UNS
                      </h4>
                    </div>

                    {/* Phone */}
                    <a
                      href="tel:015204542276"
                      className="flex items-center gap-4 py-3.5 px-4 -mx-1 rounded-xl hover:bg-white/[0.08] transition-all duration-300 group/phone"
                    >
                      <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center group-hover/phone:bg-[#E31837] transition-all duration-300 shadow-sm">
                        <svg className="w-[18px] h-[18px] text-[#E31837] group-hover/phone:text-white transition-colors duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                        </svg>
                      </div>
                      <div>
                        <p className="text-[11px] text-[#E31837]/70 uppercase tracking-wider font-bold mb-0.5">Telefon</p>
                        <p className="text-sm text-white font-semibold group-hover/phone:text-white transition-colors duration-300">015204542276</p>
                      </div>
                      <svg className="w-4 h-4 text-white/20 ml-auto group-hover/phone:text-[#E31837] group-hover/phone:translate-x-1 transition-all duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </a>

                    {/* Divider */}
                    <div className="mx-4 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent"></div>

                    {/* Email */}
                    <a
                      href="mailto:info@hungry-club.com"
                      className="flex items-center gap-4 py-3.5 px-4 -mx-1 rounded-xl hover:bg-white/[0.08] transition-all duration-300 group/email"
                    >
                      <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center group-hover/email:bg-[#E31837] transition-all duration-300 shadow-sm">
                        <svg className="w-[18px] h-[18px] text-[#E31837] group-hover/email:text-white transition-colors duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207" />
                        </svg>
                      </div>
                      <div>
                        <p className="text-[11px] text-[#E31837]/70 uppercase tracking-wider font-bold mb-0.5">E-Mail</p>
                        <p className="text-sm text-white font-semibold group-hover/email:text-white transition-colors duration-300">info@hungry-club.com</p>
                      </div>
                      <svg className="w-4 h-4 text-white/20 ml-auto group-hover/email:text-[#E31837] group-hover/email:translate-x-1 transition-all duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer id="about" className="relative bg-gradient-to-b from-gray-900 to-black text-white overflow-hidden">
        {/* Decorative top border */}
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-[#CC0000] to-transparent"></div>

        {/* Background pattern */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute inset-0" style={{ backgroundImage: 'url(/card_bg.png)', backgroundRepeat: 'repeat', backgroundSize: '200px' }}></div>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
          {/* Main Footer Content - Desktop (lg screens and up) */}
          <div className="hidden lg:grid lg:grid-cols-4 gap-12 mb-12">

            {/* Brand Column */}
            <div className="lg:col-span-1">
              <div className="flex items-center gap-4 mb-6">
                <div className="relative w-16 h-16 bg-white rounded-xl border-4 border-white p-1 shadow-lg">
                  <Image
                    src="/logo_4k.png"
                    alt="Hungry Club Logo"
                    fill
                    className="object-cover rounded-md"
                  />
                </div>
                <h3 className="font-[family-name:var(--font-archivo-black)] text-2xl text-white">
                  HUNGRY<span className="text-[#CC0000]">CLUB</span>
                </h3>
              </div>
              <p className="text-gray-400 leading-relaxed mb-6">
                Ihr ultimatives Ziel für vielfältige kulinarische Erlebnisse. Von Sushi über Burger und Pizza bis hin zu Tacos – wir bringen die Aromen der Welt direkt zu Ihnen nach Hause.
              </p>
              {/* Social Icons */}
              <div className="flex gap-4">
                <a href="https://www.instagram.com/hungryclub.de?igsh=OGJsOXRuaWU3Y2ls" className="group w-10 h-10 bg-white/10 rounded-full flex items-center justify-center hover:bg-[#CC0000] transition-all duration-300">
                  <svg className="w-5 h-5 text-gray-400 group-hover:text-white transition-colors" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                  </svg>
                </a>
              </div>
            </div>

            {/* Our Restaurants Column */}
            <div>
              <h4 className="font-bold text-lg mb-6 text-white relative inline-block">
                Unsere Restaurants
                <span className="absolute -bottom-2 left-0 w-12 h-0.5 bg-[#CC0000]"></span>
              </h4>
              <ul className="space-y-3">
                <li>
                  <button onClick={() => handleCardClick('https://www.lieferando.de/speisekarte/toshi-sushi-asia-kuche')} className="text-gray-400 hover:text-[#CC0000] transition-colors flex items-center gap-2 group">
                    <span className="w-1.5 h-1.5 bg-[#CC0000] rounded-full opacity-0 group-hover:opacity-100 transition-opacity"></span>
                    Toshi Sushi & Asia Kuche
                  </button>
                </li>
                <li>
                  <button onClick={() => handleCardClick('https://www.lieferando.de/speisekarte/hiro-burger')} className="text-gray-400 hover:text-[#CC0000] transition-colors flex items-center gap-2 group">
                    <span className="w-1.5 h-1.5 bg-[#CC0000] rounded-full opacity-0 group-hover:opacity-100 transition-opacity"></span>
                    Hiro Burger
                  </button>
                </li>
                <li>
                  <button onClick={() => handleCardClick('https://www.lieferando.de/speisekarte/chatime-dresden')} className="text-gray-400 hover:text-[#CC0000] transition-colors flex items-center gap-2 group">
                    <span className="w-1.5 h-1.5 bg-[#CC0000] rounded-full opacity-0 group-hover:opacity-100 transition-opacity"></span>
                    Pizza Time
                  </button>
                </li>
                <li>
                  <button onClick={() => handleCardClick('https://www.lieferando.de/speisekarte/los-tacos-elisabethstrasse')} className="text-gray-400 hover:text-[#CC0000] transition-colors flex items-center gap-2 group">
                    <span className="w-1.5 h-1.5 bg-[#CC0000] rounded-full opacity-0 group-hover:opacity-100 transition-opacity"></span>
                    Los Tacos
                  </button>
                </li>
                <li>
                  <button onClick={() => handleCardClick('https://www.lieferando.de/speisekarte/bowlicious-freital')} className="text-gray-400 hover:text-[#CC0000] transition-colors flex items-center gap-2 group">
                    <span className="w-1.5 h-1.5 bg-[#CC0000] rounded-full opacity-0 group-hover:opacity-100 transition-opacity"></span>
                    Bowlicious
                  </button>
                </li>
              </ul>
            </div>

            {/* Contact Info Column */}
            <div id="contact" className="scroll-mt-20">
              <h4 className="font-bold text-lg mb-6 text-white relative inline-block">
                Kontaktieren Sie uns
                <span className="absolute -bottom-2 left-0 w-12 h-0.5 bg-[#CC0000]"></span>
              </h4>
              <ul className="space-y-4">
                <li className="flex items-start gap-3">
                  <svg className="w-5 h-5 text-[#CC0000] mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  <span className="text-gray-400">
                    Dresdner Straße 220, Freital 01705
                  </span>
                </li>
                <li className="flex items-center gap-3">
                  <svg className="w-5 h-5 text-[#CC0000] flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                  <a href="tel:015204542276" className="text-gray-400 hover:text-[#CC0000] transition-colors">
                    015204542276
                  </a>
                </li>
                <li className="flex items-center gap-3">
                  <svg className="w-5 h-5 text-[#CC0000] flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                  <a href="mailto:info@hungry-club.com" className="text-gray-400 hover:text-[#CC0000] transition-colors">
                    info@hungry-club.com
                  </a>
                </li>
              </ul>
            </div>

            {/* Opening Hours Column */}
            <div>
              <h4 className="font-bold text-lg mb-6 text-white relative inline-block">
                Öffnungszeiten
                <span className="absolute -bottom-2 left-0 w-12 h-0.5 bg-[#CC0000]"></span>
              </h4>
              <ul className="space-y-3">
                <li className="flex justify-between text-gray-400">
                  <span>Montag - Sonntag</span>
                  <span className="text-white">11:30 - 21:00</span>
                </li>
              </ul>
            </div>
          </div>

          {/* Mobile Footer Content - Compact Layout (Below lg screens) */}
          <div className="lg:hidden mb-8">
            {/* First Row: Logo + Our Restaurants */}
            <div className="grid grid-cols-2 gap-4 mb-8">
              {/* Brand Column - Compact */}
              <div className="flex flex-col">
                <div className="flex flex-col items-start gap-3 mb-3">
                  <div className="relative w-14 h-14 bg-white rounded-lg border-3 border-white p-1 shadow-lg flex-shrink-0">
                    <Image
                      src="/logo_4k.png"
                      alt="Hungry Club Logo"
                      fill
                      className="object-cover rounded-md"
                    />
                  </div>
                  <h3 className="font-[family-name:var(--font-archivo-black)] text-base leading-tight text-white">
                    HUNGRY<span className="text-[#CC0000]">CLUB</span>
                  </h3>
                </div>
                {/* Social Icons */}
                <div className="flex gap-2">
                  <a href="https://www.instagram.com/hungryclub.de?igsh=OGJsOXRuaWU3Y2xs" className="group w-8 h-8 bg-white/10 rounded-full flex items-center justify-center hover:bg-[#CC0000] transition-all duration-300">
                    <svg className="w-4 h-4 text-gray-400 group-hover:text-white transition-colors" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                    </svg>
                  </a>
                </div>
              </div>

              {/* Our Restaurants Column - Compact */}
              <div>
                <h4 className="font-bold text-sm mb-3 text-white relative inline-block">
                  Unsere Restaurants
                  <span className="absolute -bottom-1 left-0 w-8 h-0.5 bg-[#CC0000]"></span>
                </h4>
                <ul className="space-y-1.5">
                  <li>
                    <button onClick={() => handleCardClick('https://www.lieferando.de/speisekarte/toshi-sushi-asia-kuche')} className="text-gray-400 hover:text-[#CC0000] transition-colors text-xs block">
                      Toshi Sushi
                    </button>
                  </li>
                  <li>
                    <button onClick={() => handleCardClick('https://www.lieferando.de/speisekarte/hiro-burger')} className="text-gray-400 hover:text-[#CC0000] transition-colors text-xs block">
                      Hiro Burger
                    </button>
                  </li>
                  <li>
                    <button onClick={() => handleCardClick('https://www.lieferando.de/speisekarte/chatime-dresden')} className="text-gray-400 hover:text-[#CC0000] transition-colors text-xs block">
                      Pizza Time
                    </button>
                  </li>
                  <li>
                    <button onClick={() => handleCardClick('https://www.lieferando.de/speisekarte/los-tacos-elisabethstrasse')} className="text-gray-400 hover:text-[#CC0000] transition-colors text-xs block">
                      Los Tacos
                    </button>
                  </li>
                  <li>
                    <button onClick={() => handleCardClick('https://www.lieferando.de/speisekarte/bowlicious-mac-cheese-bowls-and-poke-bowls')} className="text-gray-400 hover:text-[#CC0000] transition-colors text-xs block">
                      Bowlicious
                    </button>
                  </li>
                </ul>
              </div>
            </div>

            {/* Second Row: Opening Hours + Contact Us */}
            <div className="grid grid-cols-2 gap-4 mb-6">
              {/* Opening Hours Column - Compact */}
              <div>
                <h4 className="font-bold text-sm mb-3 text-white relative inline-block">
                  Öffnungszeiten
                  <span className="absolute -bottom-1 left-0 w-8 h-0.5 bg-[#CC0000]"></span>
                </h4>
                <ul className="space-y-1.5">
                  <li className="text-gray-400 text-[10px]">
                    <span className="block leading-tight">Montag - Sonntag</span>
                    <span className="text-white font-bold text-xs">11:30 - 21:00</span>
                  </li>
                </ul>
              </div>

              {/* Contact Info Column - Compact */}
              <div>
                <h4 className="font-bold text-sm mb-3 text-white relative inline-block">
                  Kontaktieren Sie uns
                  <span className="absolute -bottom-1 left-0 w-8 h-0.5 bg-[#CC0000]"></span>
                </h4>
                <ul className="space-y-2">
                  <li className="flex items-start gap-1.5">
                    <svg className="w-3.5 h-3.5 text-[#CC0000] mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    <span className="text-gray-400 text-[10px] leading-snug">
                      Dresdner Straße 220, Freital 01705
                    </span>
                  </li>
                  <li className="flex items-start gap-1.5">
                    <svg className="w-3.5 h-3.5 text-[#CC0000] mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                    <a href="tel:015204542276" className="text-gray-400 hover:text-[#CC0000] transition-colors text-[10px] leading-snug">
                      015204542276
                    </a>
                  </li>
                  <li className="flex items-start gap-1.5">
                    <svg className="w-3.5 h-3.5 text-[#CC0000] mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                    <a href="mailto:info@hungry-club.com" className="text-gray-400 hover:text-[#CC0000] transition-colors text-[10px] leading-snug break-all">
                      info@hungry-club.com
                    </a>
                  </li>
                </ul>
              </div>
            </div>

          </div>

          {/* Divider */}
          <div className="border-t border-gray-800 pt-8">
            <div className="flex flex-col md:flex-row items-center justify-between gap-4">
              {/* Copyright */}
              <p className="text-gray-500 text-sm">
                &copy; {new Date().getFullYear()} Hungry Club. All rights reserved.
              </p>

              {/* Legal Links */}
              <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-6">
                <button onClick={() => setActiveLegalModal('datenschutz')} className="text-gray-500 hover:text-[#CC0000] text-xs sm:text-sm transition-colors">
                  Datenschutzrichtlinie
                </button>
                <button onClick={() => setActiveLegalModal('nutzung')} className="text-gray-500 hover:text-[#CC0000] text-xs sm:text-sm transition-colors">
                  Nutzungsbedingungen
                </button>
                <button onClick={() => setActiveLegalModal('impressum')} className="text-gray-500 hover:text-[#CC0000] text-xs sm:text-sm transition-colors">
                  Impressum
                </button>
              </div>

              {/* Payment Methods */}
              <div className="flex items-center gap-3">
                <span className="text-gray-500 text-sm">Wir akzeptieren:</span>
                <div className="flex items-center gap-1.5 sm:gap-2">
                      {/* Apple Pay */}
                      <div className="w-10 h-7 bg-white rounded-md flex items-center justify-center border border-gray-200 hover:border-gray-300 hover:shadow-sm transition-all" title="Apple Pay">
                        <svg className="h-4" viewBox="0 0 165.521 105.965" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M150.698 0H14.823c-.566 0-1.133 0-1.698.003-.477.004-.953.009-1.43.022-1.039.028-2.087.09-3.113.274a10.51 10.51 0 0 0-2.958.975 9.897 9.897 0 0 0-4.35 4.35 10.59 10.59 0 0 0-.975 2.96C.113 9.611.052 10.658.024 11.696a70.22 70.22 0 0 0-.022 1.43C0 13.69 0 14.256 0 14.823v76.318c0 .567 0 1.132.002 1.699.003.476.009.953.022 1.43.028 1.036.09 2.084.274 3.11a10.46 10.46 0 0 0 .975 2.96 9.897 9.897 0 0 0 4.35 4.35c.953.49 1.943.796 2.958.975 1.026.183 2.074.246 3.113.274.477.011.953.017 1.43.019.565.004 1.132.004 1.698.004h135.875c.565 0 1.132 0 1.697-.004.476-.002.954-.008 1.431-.019 1.037-.028 2.085-.09 3.113-.274a10.512 10.512 0 0 0 2.958-.975 9.901 9.901 0 0 0 4.353-4.35 10.653 10.653 0 0 0 .972-2.96c.184-1.026.246-2.074.274-3.11.013-.477.017-.954.022-1.43 0-.567 0-1.132 0-1.699V14.824c0-.567 0-1.133 0-1.699a63.067 63.067 0 0 0-.022-1.429c-.028-1.038-.09-2.085-.274-3.112a10.544 10.544 0 0 0-.972-2.96 9.901 9.901 0 0 0-4.353-4.35 10.52 10.52 0 0 0-2.958-.974C155.344.092 154.296.03 153.259 0c-.477-.013-.955-.019-1.431-.022C151.83 0 151.263 0 150.698 0z" fill="#000"/>
                          <path d="M150.698 3.532l1.672.003c.452.003.905.008 1.36.02.793.022 1.719.063 2.583.227.7.13 1.258.344 1.782.622a6.468 6.468 0 0 1 2.453 2.453c.28.53.494 1.075.623 1.782.163.856.205 1.772.226 2.583.013.453.018.906.02 1.36.004.564.004 1.13.004 1.694v76.318c0 .564 0 1.13-.004 1.693-.002.455-.007.908-.02 1.36-.021.812-.063 1.727-.226 2.586-.13.705-.343 1.25-.623 1.78a6.468 6.468 0 0 1-2.453 2.453c-.524.277-1.08.489-1.782.621-.864.164-1.79.206-2.583.227-.455.012-.908.018-1.36.02-.565.004-1.13.004-1.697.004H14.801c-.002 0-.003 0-.005 0-.564 0-1.128 0-1.694-.004-.45-.002-.905-.008-1.358-.02-.795-.021-1.72-.063-2.584-.227-.702-.132-1.258-.344-1.782-.621a6.197 6.197 0 0 1-1.35-.904 6.247 6.247 0 0 1-1.104-1.548c-.278-.53-.494-1.076-.623-1.78-.163-.86-.205-1.775-.226-2.587a62.94 62.94 0 0 1-.02-1.36c-.003-.563-.003-1.128-.003-1.693V14.276c0-.564 0-1.13.003-1.694.002-.454.008-.907.02-1.36.021-.811.063-1.726.226-2.583.129-.706.345-1.252.623-1.782A6.282 6.282 0 0 1 6.028 4.404c.417-.36.862-.667 1.35-.904.524-.278 1.08-.492 1.782-.622.864-.164 1.79-.205 2.584-.227.453-.012.907-.017 1.358-.02.567-.003 1.132-.003 1.698-.003h135.874" fill="#FFF"/>
                          <path d="M43.508 35.77c1.404-1.755 2.356-4.112 2.105-6.52-2.054.102-4.56 1.355-6.012 3.112-1.303 1.504-2.456 3.96-2.156 6.266 2.306.2 4.61-1.152 6.063-2.858" fill="#000"/>
                          <path d="M45.587 39.079c-3.35-.2-6.196 1.9-7.795 1.9-1.6 0-4.049-1.8-6.698-1.751-3.449.05-6.648 2-8.398 5.1-3.6 6.2-1 15.375 2.549 20.426 1.7 2.5 3.749 5.25 6.448 5.15 2.55-.1 3.549-1.65 6.648-1.65 3.1 0 4 1.65 6.698 1.6 2.8-.05 4.549-2.5 6.248-5 1.95-2.85 2.747-5.6 2.797-5.75-.05-.05-5.397-2.1-5.447-8.25-.05-5.15 4.198-7.6 4.398-7.75-2.399-3.55-6.148-3.95-7.448-4.025" fill="#000"/>
                          <path d="M78.471 32.443c7.178 0 12.153 4.95 12.153 12.078 0 7.178-5.075 12.127-12.353 12.127h-7.929v12.602h-5.65V32.443h13.779zm-7.93 19.457h6.584c4.999 0 7.855-2.678 7.855-7.33 0-4.65-2.856-7.303-7.829-7.303H70.54v14.633z" fill="#000"/>
                          <path d="M92.764 59.238c0-4.7 3.606-7.58 10.012-7.955l7.38-.425v-2.08c0-2.98-2.004-4.776-5.35-4.776-3.176 0-5.18 1.546-5.656 3.95h-5.175c.275-4.926 4.38-8.676 11.056-8.676 6.5 0 10.681 3.45 10.681 8.826v18.498h-5.225v-4.425h-.125c-1.526 2.88-4.876 4.725-8.35 4.725-5.2 0-9.248-3.225-9.248-7.662zm17.392-2.28v-2.13l-6.634.4c-3.3.225-5.175 1.726-5.175 4.08 0 2.404 1.95 3.98 4.926 3.98 3.876 0 6.883-2.654 6.883-6.33z" fill="#000"/>
                          <path d="M120.975 79.652v-4.4c.4.1 1.3.1 1.65.1 2.35 0 3.65-1 4.425-3.55l.475-1.525-9.95-27.527h5.925l7.078 22.477h.1l7.078-22.477h5.775l-10.326 28.978c-2.375 6.675-5.075 8.824-10.776 8.824-.35 0-1.3-.05-1.454-.1z" fill="#000"/>
                        </svg>
                      </div>
                      {/* Google Pay */}
                      <div className="w-10 h-7 bg-white rounded-md flex items-center justify-center border border-gray-200 hover:border-gray-300 hover:shadow-sm transition-all" title="Google Pay">
                        <svg className="h-4" viewBox="0 0 150 60" xmlns="http://www.w3.org/2000/svg">
                          <path d="M71.154 28.874V45h-4.48V10.2h11.862c2.878 0 5.378.978 7.498 2.934 2.17 1.956 3.256 4.356 3.256 7.2s-1.086 5.27-3.256 7.25c-2.094 1.958-4.594 2.936-7.498 2.936H71.154v.354zm0-14.782v10.936h7.468c1.69 0 3.104-.58 4.24-1.742 1.162-1.16 1.742-2.57 1.742-4.226 0-1.632-.58-3.03-1.742-4.194-1.136-1.186-2.55-1.774-4.24-1.774h-7.468z" fill="#3C4043"/>
                          <path d="M98.834 19.32c3.282 0 5.87.886 7.768 2.66 1.898 1.772 2.846 4.198 2.846 7.276v14.744h-4.288v-3.322h-.192c-1.836 2.734-4.276 4.102-7.318 4.102-2.594 0-4.768-.77-6.52-2.31-1.752-1.542-2.628-3.492-2.628-5.852 0-2.474.936-4.44 2.808-5.904 1.872-1.462 4.374-2.194 7.504-2.194 2.672 0 4.872.49 6.602 1.468v-1.03c0-1.75-.68-3.234-2.042-4.45-1.362-1.218-2.946-1.826-4.754-1.826-2.75 0-4.926 1.16-6.528 3.48l-3.948-2.49c2.362-3.434 5.862-5.152 10.498-5.152h-.808zm-5.822 19.396c0 1.318.546 2.416 1.638 3.292 1.094.878 2.37 1.316 3.832 1.316 2.078 0 3.93-.778 5.556-2.334 1.626-1.556 2.438-3.386 2.438-5.49-1.394-1.12-3.332-1.682-5.818-1.682-1.81 0-3.326.452-4.544 1.354-1.22.904-1.83 2-1.83 3.286l.728.258z" fill="#3C4043"/>
                          <path d="M130.994 20.1l-14.898 34.28h-4.618l5.534-12.07L108.246 20.1h4.862l6.376 15.392h.074L125.89 20.1h5.104z" fill="#3C4043"/>
                          <path d="M53.918 25.422a24.844 24.844 0 0 0-.354-4.222H30.66v7.976h13.06c-.564 3.028-2.268 5.592-4.832 7.31v6.076h7.824c4.578-4.216 7.214-10.43 7.214-17.14h-.008z" fill="#4285F4"/>
                          <path d="M30.66 48.926c6.54 0 12.022-2.168 16.03-5.88l-7.824-6.076c-2.168 1.454-4.942 2.314-8.198 2.314-6.308 0-11.648-4.26-13.548-9.986H9.062v6.274c3.984 7.916 12.178 13.354 21.598 13.354z" fill="#34A853"/>
                          <path d="M17.112 29.298a11.6 11.6 0 0 1-.604-3.698c0-1.284.22-2.53.604-3.698v-6.274H9.062A19.498 19.498 0 0 0 6.99 25.6c0 3.146.752 6.126 2.072 8.772l8.05-5.074z" fill="#FBBC04"/>
                          <path d="M30.66 11.916c3.556 0 6.748 1.224 9.26 3.626l6.946-6.946C42.656 4.752 37.174 2.274 30.66 2.274c-9.42 0-17.614 5.438-21.598 13.354l8.05 6.274c1.9-5.726 7.24-9.986 13.548-9.986z" fill="#EA4335"/>
                        </svg>
                      </div>
                      {/* PayPal */}
                      <div className="w-10 h-7 bg-white rounded-md flex items-center justify-center border border-gray-200 hover:border-gray-300 hover:shadow-sm transition-all" title="PayPal">
                        <svg className="h-4" viewBox="0 0 124 33" xmlns="http://www.w3.org/2000/svg">
                          <path d="M46.211 6.749h-6.839a.95.95 0 0 0-.939.802l-2.766 17.537a.57.57 0 0 0 .564.658h3.265a.95.95 0 0 0 .939-.803l.746-4.73a.95.95 0 0 1 .938-.803h2.165c4.505 0 7.105-2.18 7.784-6.5.306-1.89.013-3.375-.872-4.415-.972-1.142-2.696-1.746-4.985-1.746zM47 13.154c-.374 2.454-2.249 2.454-4.062 2.454h-1.032l.724-4.583a.57.57 0 0 1 .563-.481h.473c1.235 0 2.4 0 3.002.704.359.42.468 1.044.331 1.906z" fill="#253B80"/>
                          <path d="M66.654 13.075h-3.275a.57.57 0 0 0-.563.481l-.145.916-.229-.332c-.709-1.029-2.29-1.373-3.868-1.373-3.619 0-6.71 2.741-7.312 6.586-.313 1.918.132 3.752 1.22 5.031.998 1.176 2.426 1.666 4.125 1.666 2.916 0 4.533-1.875 4.533-1.875l-.146.91a.57.57 0 0 0 .562.66h2.95a.95.95 0 0 0 .939-.803l1.77-11.209a.568.568 0 0 0-.561-.658zm-4.565 6.374c-.316 1.871-1.801 3.127-3.695 3.127-.951 0-1.711-.305-2.199-.883-.484-.574-.668-1.391-.514-2.301.295-1.855 1.805-3.152 3.67-3.152.93 0 1.686.309 2.184.892.499.589.697 1.411.554 2.317z" fill="#253B80"/>
                          <path d="M84.096 13.075h-3.291a.954.954 0 0 0-.787.417l-4.539 6.686-1.924-6.425a.953.953 0 0 0-.912-.678h-3.234a.57.57 0 0 0-.541.754l3.625 10.638-3.408 4.811a.57.57 0 0 0 .465.9h3.287a.949.949 0 0 0 .781-.408l10.946-15.8a.57.57 0 0 0-.468-.895z" fill="#253B80"/>
                          <path d="M94.992 6.749h-6.84a.95.95 0 0 0-.938.802l-2.766 17.537a.569.569 0 0 0 .562.658h3.51a.665.665 0 0 0 .656-.562l.785-4.971a.95.95 0 0 1 .938-.803h2.164c4.506 0 7.105-2.18 7.785-6.5.307-1.89.012-3.375-.873-4.415-.971-1.142-2.694-1.746-4.983-1.746zm.789 6.405c-.373 2.454-2.248 2.454-4.062 2.454h-1.031l.725-4.583a.568.568 0 0 1 .562-.481h.473c1.234 0 2.4 0 3.002.704.359.42.468 1.044.331 1.906z" fill="#179BD7"/>
                          <path d="M115.434 13.075h-3.273a.567.567 0 0 0-.562.481l-.145.916-.23-.332c-.709-1.029-2.289-1.373-3.867-1.373-3.619 0-6.709 2.741-7.311 6.586-.312 1.918.131 3.752 1.219 5.031 1 1.176 2.426 1.666 4.125 1.666 2.916 0 4.533-1.875 4.533-1.875l-.146.91a.57.57 0 0 0 .564.66h2.949a.95.95 0 0 0 .938-.803l1.771-11.209a.571.571 0 0 0-.565-.658zm-4.565 6.374c-.314 1.871-1.801 3.127-3.695 3.127-.949 0-1.711-.305-2.199-.883-.484-.574-.666-1.391-.514-2.301.297-1.855 1.805-3.152 3.67-3.152.93 0 1.686.309 2.184.892.501.589.699 1.411.554 2.317z" fill="#179BD7"/>
                          <path d="M119.295 7.23l-2.807 17.858a.569.569 0 0 0 .562.658h2.822a.949.949 0 0 0 .939-.803l2.768-17.536a.57.57 0 0 0-.562-.658h-3.16a.571.571 0 0 0-.562.481z" fill="#179BD7"/>
                          <path d="M7.266 29.154l.523-3.322-1.165-.027H1.061L4.927 1.292a.316.316 0 0 1 .312-.268h9.38c3.114 0 5.263.648 6.385 1.927.526.6.861 1.227 1.023 1.917.17.724.173 1.589.007 2.644l-.012.077v.676l.526.298a3.69 3.69 0 0 1 1.065.812c.45.513.741 1.165.864 1.938.127.795.085 1.741-.123 2.812-.24 1.232-.628 2.305-1.152 3.183a6.547 6.547 0 0 1-1.825 2c-.696.494-1.523.869-2.458 1.109-.906.236-1.939.355-3.072.355h-.73a2.21 2.21 0 0 0-2.183 1.866l-.055.299-0.924 5.855-.042.215c-.011.068-.03.102-.058.125a.155.155 0 0 1-.096.035H7.266z" fill="#253B80"/>
                          <path d="M23.048 7.667c-.028.179-.06.362-.096.55-1.237 6.351-5.469 8.545-10.874 8.545H9.326c-.661 0-1.218.48-1.321 1.132L6.596 26.83l-.399 2.533a.704.704 0 0 0 .695.814h4.881c.578 0 1.069-.42 1.16-.99l.048-.248.919-5.832.059-.32c.09-.572.582-.992 1.16-.992h.73c4.729 0 8.431-1.92 9.513-7.476.452-2.321.218-4.259-.978-5.622a4.667 4.667 0 0 0-1.336-1.03z" fill="#179BD7"/>
                          <path d="M21.754 7.151a9.757 9.757 0 0 0-1.203-.267 15.284 15.284 0 0 0-2.426-.177H11.59a1.165 1.165 0 0 0-1.152.99L9.38 13.545l-.031.199a1.34 1.34 0 0 1 1.321-1.132h2.752c5.405 0 9.637-2.195 10.874-8.545.037-.188.068-.371.096-.55a6.303 6.303 0 0 0-2.638-1.366z" fill="#222D65"/>
                          <path d="M10.438 8.697a1.166 1.166 0 0 1 1.152-.99h6.535c.774 0 1.496.05 2.16.177a9.757 9.757 0 0 1 1.47.353c.365.128.695.28.988.454a6.965 6.965 0 0 0-1.335-5.73C19.846 1.072 17.178 0 13.958 0H4.587A1.34 1.34 0 0 0 3.266 1.13L.011 25.804a.806.806 0 0 0 .795.932h5.791l1.454-9.225 2.387-8.814z" fill="#253B80"/>
                        </svg>
                      </div>
                      {/* Klarna */}
                      <div className="w-10 h-7 bg-[#FFB3C7] rounded-lg flex items-center justify-center border border-[#FFB3C7] hover:border-[#ff9ab5] hover:shadow-sm transition-all" title="Klarna">
                        <span className="text-[8px] font-black text-black leading-none tracking-tight">Klarna.</span>
                      </div>
                      {/* Visa / Mastercard (Credit Card) */}
                      <div className="w-10 h-7 bg-white rounded-md flex items-center justify-center border border-gray-200 hover:border-gray-300 hover:shadow-sm transition-all" title="Kreditkarte">
                        <svg className="h-4" viewBox="0 0 48 30" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <circle cx="18" cy="15" r="12" fill="#EB001B"/>
                          <circle cx="30" cy="15" r="12" fill="#F79E1B"/>
                          <path d="M24 5.15C26.516 7.15 28.086 10.29 28.086 13.8c0 3.51-1.57 6.65-4.086 8.65C21.484 20.45 19.914 17.31 19.914 13.8c0-3.51 1.57-6.65 4.086-8.65z" fill="#FF5F00"/>
                        </svg>
                      </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Decorative glow effect */}
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-96 h-32 bg-[#CC0000]/20 blur-3xl"></div>
      </footer>

      {/* Order Choice Modal */}
      {isOrderModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center px-6 sm:px-4 py-4">
          {/* Backdrop — deep red tint to match brand */}
          <div
            className="absolute inset-0 bg-[#1a0000]/85 backdrop-blur-xl animate-[fadeIn_0.25s_ease-out]"
            onClick={() => setIsOrderModalOpen(false)}
          />

          {/* Floating ambient glows */}
          <div className="absolute z-[1] w-80 h-80 bg-[#CC0000]/15 rounded-full blur-[140px] animate-[pulse_3s_ease-in-out_infinite]" />
          <div className="absolute z-[1] w-60 h-60 bg-[#E31837]/10 rounded-full blur-[100px] translate-x-36 -translate-y-24 animate-[pulse_4s_ease-in-out_infinite_1s]" />

          {/* Modal Content */}
          <div className="relative z-10 w-full max-w-md animate-[scaleIn_0.35s_cubic-bezier(0.16,1,0.3,1)]">
            {/* Outer red glow ring */}
            <div className="absolute -inset-px rounded-[28px] bg-gradient-to-b from-[#CC0000]/40 via-[#CC0000]/15 to-[#990000]/10 shadow-[0_0_60px_rgba(204,0,0,0.15)]" />

            {/* Main container */}
            <div className="relative rounded-[27px] overflow-hidden shadow-[0_30px_80px_rgba(153,0,0,0.3)]">
              {/* White premium background */}
              <div className="absolute inset-0 bg-white" />

              {/* Red header band */}
              <div className="relative h-28 overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-[#E31837] via-[#CC0000] to-[#990000]" />
                {/* Subtle pattern overlay */}
                <div className="absolute inset-0 opacity-[0.06]" style={{ backgroundImage: 'url(/bg.png)', backgroundSize: '200px' }} />
                {/* Animated shimmer */}
                <div className="absolute inset-0 overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/[0.08] to-transparent animate-[shimmer_3s_ease-in-out_infinite]" />
                </div>
                {/* Decorative circles */}
                <div className="absolute -top-10 -right-10 w-40 h-40 rounded-full bg-white/[0.05]" />
                <div className="absolute -bottom-16 -left-8 w-48 h-48 rounded-full bg-white/[0.04]" />

                {/* Close button */}
                <button
                  onClick={() => setIsOrderModalOpen(false)}
                  className="absolute top-4 right-4 z-20 w-8 h-8 rounded-full bg-white/10 border border-white/20 hover:bg-white/20 hover:border-white/30 flex items-center justify-center transition-all duration-300 hover:rotate-90 hover:scale-110"
                >
                  <svg className="w-3.5 h-3.5 text-white/70" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>

                {/* Title inside header */}
                <div className="relative z-10 flex flex-col items-center justify-center h-full">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="h-px w-8 bg-white/30" />
                    <div className="w-1.5 h-1.5 rounded-full bg-white/60 shadow-[0_0_8px_rgba(255,255,255,0.4)]" />
                    <div className="h-px w-8 bg-white/30" />
                  </div>
                  <h2
                    className="text-2xl sm:text-[28px] font-black text-white tracking-tight leading-tight text-center"
                    style={{ fontFamily: 'var(--font-archivo-black)', textShadow: '0 2px 20px rgba(0,0,0,0.3)' }}
                  >
                    Wo möchtest du bestellen?
                  </h2>
                </div>
              </div>

              {/* Content area */}
              <div className="relative bg-white px-5 sm:px-8 pt-7 pb-7">
                {/* Cards */}
                <div className="space-y-3">
                  {/* Lieferando Card */}
                  <a
                    href={lieferandoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => setIsOrderModalOpen(false)}
                    className="group relative flex items-center gap-4 sm:gap-5 p-4 sm:p-[18px] rounded-2xl border-2 border-gray-100 bg-gray-50/50 hover:bg-white hover:border-[#FF8000]/40 hover:shadow-[0_8px_40px_rgba(255,128,0,0.12)] transition-all duration-500 hover:-translate-y-0.5 cursor-pointer"
                  >
                    <div className="flex-shrink-0 w-14 h-14 rounded-2xl overflow-hidden shadow-[0_6px_20px_rgba(255,128,0,0.3)] group-hover:shadow-[0_8px_28px_rgba(255,128,0,0.45)] group-hover:scale-110 transition-all duration-500">
                      <Image src="/lieferando_logo.jpeg" alt="Lieferando" width={56} height={56} className="w-full h-full object-cover" />
                    </div>
                    <div className="flex-1 text-left">
                      <h3 className="font-bold text-base sm:text-lg text-gray-900 group-hover:text-[#FF8000] transition-colors duration-300">Lieferando</h3>
                      <p className="text-[13px] text-gray-400 group-hover:text-gray-500 transition-colors">Über Lieferando bestellen</p>
                    </div>
                    <div className="w-9 h-9 rounded-xl bg-gray-100 group-hover:bg-[#FF8000]/10 flex items-center justify-center transition-all duration-500">
                      <svg className="w-4 h-4 text-gray-300 group-hover:text-[#FF8000] group-hover:translate-x-0.5 transition-all duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
                      </svg>
                    </div>
                  </a>

                  {/* Divider */}
                  <div className="flex items-center gap-4 px-4 py-0.5">
                    <div className="flex-1 h-px bg-gradient-to-r from-transparent via-gray-200 to-transparent" />
                    <span className="text-[10px] font-bold text-gray-300 uppercase tracking-[0.25em]">oder</span>
                    <div className="flex-1 h-px bg-gradient-to-r from-transparent via-gray-200 to-transparent" />
                  </div>

                  {/* Our Website Card — highlighted */}
                  <button
                    onClick={() => {
                      setIsOrderModalOpen(false);
                      openGloriaFoodMenu();
                    }}
                    className="group relative w-full flex items-center gap-4 sm:gap-5 p-4 sm:p-[18px] rounded-2xl border-2 border-[#CC0000]/15 bg-gradient-to-r from-[#CC0000]/[0.04] to-transparent hover:border-[#CC0000]/35 hover:from-[#CC0000]/[0.08] hover:shadow-[0_8px_40px_rgba(204,0,0,0.1)] transition-all duration-500 hover:-translate-y-0.5 cursor-pointer text-left"
                  >
                    {/* Discount Badge */}
                    <div className="absolute -top-2.5 right-5 flex items-center gap-1.5 bg-gradient-to-r from-[#CC0000] to-[#E31837] text-white text-[10px] font-black uppercase tracking-wider pl-2.5 pr-3 py-1.5 rounded-full shadow-[0_4px_20px_rgba(204,0,0,0.4)] animate-[badgePulse_2s_ease-in-out_infinite]">
                      <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M5 2a2 2 0 00-2 2v14l3.5-2 3.5 2 3.5-2 3.5 2V4a2 2 0 00-2-2H5zm4.707 3.707a1 1 0 00-1.414-1.414l-3 3a1 1 0 000 1.414l3 3a1 1 0 001.414-1.414L8.414 9H10a3 3 0 013 3v1a1 1 0 102 0v-1a5 5 0 00-5-5H8.414l1.293-1.293z" clipRule="evenodd" />
                      </svg>
                      10% Rabatt
                    </div>
                    <div className="flex-shrink-0 w-14 h-14 rounded-2xl bg-gradient-to-br from-[#E31837] to-[#990000] flex items-center justify-center shadow-[0_6px_20px_rgba(204,0,0,0.3)] group-hover:shadow-[0_8px_28px_rgba(204,0,0,0.45)] group-hover:scale-110 transition-all duration-500">
                      <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                      </svg>
                    </div>
                    <div className="flex-1">
                      <h3 className="font-bold text-base sm:text-lg text-gray-900 group-hover:text-[#CC0000] transition-colors duration-300">Unsere Website</h3>
                      <p className="text-[13px] text-gray-400 group-hover:text-gray-500 transition-colors">Direkt bei uns bestellen & sparen</p>
                    </div>
                    <div className="w-9 h-9 rounded-xl bg-[#CC0000]/[0.06] group-hover:bg-[#CC0000]/[0.12] flex items-center justify-center transition-all duration-500">
                      <svg className="w-4 h-4 text-[#CC0000]/30 group-hover:text-[#CC0000] group-hover:translate-x-0.5 transition-all duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
                      </svg>
                    </div>
                  </button>

                  {/* Multi-restaurant note */}
                  <div className="flex items-start gap-3 px-4 py-3.5 bg-gradient-to-r from-[#CC0000]/[0.08] to-[#E31837]/[0.04] rounded-xl border border-[#CC0000]/20 shadow-[0_2px_12px_rgba(204,0,0,0.06)]">
                    <div className="flex-shrink-0 w-7 h-7 rounded-lg bg-gradient-to-br from-[#E31837] to-[#CC0000] flex items-center justify-center shadow-[0_2px_8px_rgba(204,0,0,0.3)]">
                      <svg className="w-3.5 h-3.5 text-white" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <p className="text-xs sm:text-[13px] text-gray-600 leading-relaxed">
                      <span className="font-black text-[#CC0000]">Tipp:</span> Bei Direktbestellung kannst du aus <span className="font-bold text-[#CC0000]">allen Restaurants gleichzeitig</span> bestellen!
                    </p>
                  </div>

                  {/* Payment methods for direct order */}
                  <div className="flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-3 pt-2 pb-1 border-t border-gray-100">
                    <span className="text-[10px] sm:text-[11px] text-gray-600 font-black uppercase tracking-wider">Zahlungsarten:</span>
                    <div className="flex items-center gap-1.5 sm:gap-2">
                      {/* Apple Pay */}
                      <div className="w-10 h-7 bg-white rounded-md flex items-center justify-center border border-gray-200 hover:border-gray-300 hover:shadow-sm transition-all" title="Apple Pay">
                        <svg className="h-4" viewBox="0 0 165.521 105.965" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M150.698 0H14.823c-.566 0-1.133 0-1.698.003-.477.004-.953.009-1.43.022-1.039.028-2.087.09-3.113.274a10.51 10.51 0 0 0-2.958.975 9.897 9.897 0 0 0-4.35 4.35 10.59 10.59 0 0 0-.975 2.96C.113 9.611.052 10.658.024 11.696a70.22 70.22 0 0 0-.022 1.43C0 13.69 0 14.256 0 14.823v76.318c0 .567 0 1.132.002 1.699.003.476.009.953.022 1.43.028 1.036.09 2.084.274 3.11a10.46 10.46 0 0 0 .975 2.96 9.897 9.897 0 0 0 4.35 4.35c.953.49 1.943.796 2.958.975 1.026.183 2.074.246 3.113.274.477.011.953.017 1.43.019.565.004 1.132.004 1.698.004h135.875c.565 0 1.132 0 1.697-.004.476-.002.954-.008 1.431-.019 1.037-.028 2.085-.09 3.113-.274a10.512 10.512 0 0 0 2.958-.975 9.901 9.901 0 0 0 4.353-4.35 10.653 10.653 0 0 0 .972-2.96c.184-1.026.246-2.074.274-3.11.013-.477.017-.954.022-1.43 0-.567 0-1.132 0-1.699V14.824c0-.567 0-1.133 0-1.699a63.067 63.067 0 0 0-.022-1.429c-.028-1.038-.09-2.085-.274-3.112a10.544 10.544 0 0 0-.972-2.96 9.901 9.901 0 0 0-4.353-4.35 10.52 10.52 0 0 0-2.958-.974C155.344.092 154.296.03 153.259 0c-.477-.013-.955-.019-1.431-.022C151.83 0 151.263 0 150.698 0z" fill="#000"/>
                          <path d="M150.698 3.532l1.672.003c.452.003.905.008 1.36.02.793.022 1.719.063 2.583.227.7.13 1.258.344 1.782.622a6.468 6.468 0 0 1 2.453 2.453c.28.53.494 1.075.623 1.782.163.856.205 1.772.226 2.583.013.453.018.906.02 1.36.004.564.004 1.13.004 1.694v76.318c0 .564 0 1.13-.004 1.693-.002.455-.007.908-.02 1.36-.021.812-.063 1.727-.226 2.586-.13.705-.343 1.25-.623 1.78a6.468 6.468 0 0 1-2.453 2.453c-.524.277-1.08.489-1.782.621-.864.164-1.79.206-2.583.227-.455.012-.908.018-1.36.02-.565.004-1.13.004-1.697.004H14.801c-.002 0-.003 0-.005 0-.564 0-1.128 0-1.694-.004-.45-.002-.905-.008-1.358-.02-.795-.021-1.72-.063-2.584-.227-.702-.132-1.258-.344-1.782-.621a6.197 6.197 0 0 1-1.35-.904 6.247 6.247 0 0 1-1.104-1.548c-.278-.53-.494-1.076-.623-1.78-.163-.86-.205-1.775-.226-2.587a62.94 62.94 0 0 1-.02-1.36c-.003-.563-.003-1.128-.003-1.693V14.276c0-.564 0-1.13.003-1.694.002-.454.008-.907.02-1.36.021-.811.063-1.726.226-2.583.129-.706.345-1.252.623-1.782A6.282 6.282 0 0 1 6.028 4.404c.417-.36.862-.667 1.35-.904.524-.278 1.08-.492 1.782-.622.864-.164 1.79-.205 2.584-.227.453-.012.907-.017 1.358-.02.567-.003 1.132-.003 1.698-.003h135.874" fill="#FFF"/>
                          <path d="M43.508 35.77c1.404-1.755 2.356-4.112 2.105-6.52-2.054.102-4.56 1.355-6.012 3.112-1.303 1.504-2.456 3.96-2.156 6.266 2.306.2 4.61-1.152 6.063-2.858" fill="#000"/>
                          <path d="M45.587 39.079c-3.35-.2-6.196 1.9-7.795 1.9-1.6 0-4.049-1.8-6.698-1.751-3.449.05-6.648 2-8.398 5.1-3.6 6.2-1 15.375 2.549 20.426 1.7 2.5 3.749 5.25 6.448 5.15 2.55-.1 3.549-1.65 6.648-1.65 3.1 0 4 1.65 6.698 1.6 2.8-.05 4.549-2.5 6.248-5 1.95-2.85 2.747-5.6 2.797-5.75-.05-.05-5.397-2.1-5.447-8.25-.05-5.15 4.198-7.6 4.398-7.75-2.399-3.55-6.148-3.95-7.448-4.025" fill="#000"/>
                          <path d="M78.471 32.443c7.178 0 12.153 4.95 12.153 12.078 0 7.178-5.075 12.127-12.353 12.127h-7.929v12.602h-5.65V32.443h13.779zm-7.93 19.457h6.584c4.999 0 7.855-2.678 7.855-7.33 0-4.65-2.856-7.303-7.829-7.303H70.54v14.633z" fill="#000"/>
                          <path d="M92.764 59.238c0-4.7 3.606-7.58 10.012-7.955l7.38-.425v-2.08c0-2.98-2.004-4.776-5.35-4.776-3.176 0-5.18 1.546-5.656 3.95h-5.175c.275-4.926 4.38-8.676 11.056-8.676 6.5 0 10.681 3.45 10.681 8.826v18.498h-5.225v-4.425h-.125c-1.526 2.88-4.876 4.725-8.35 4.725-5.2 0-9.248-3.225-9.248-7.662zm17.392-2.28v-2.13l-6.634.4c-3.3.225-5.175 1.726-5.175 4.08 0 2.404 1.95 3.98 4.926 3.98 3.876 0 6.883-2.654 6.883-6.33z" fill="#000"/>
                          <path d="M120.975 79.652v-4.4c.4.1 1.3.1 1.65.1 2.35 0 3.65-1 4.425-3.55l.475-1.525-9.95-27.527h5.925l7.078 22.477h.1l7.078-22.477h5.775l-10.326 28.978c-2.375 6.675-5.075 8.824-10.776 8.824-.35 0-1.3-.05-1.454-.1z" fill="#000"/>
                        </svg>
                      </div>
                      {/* Google Pay */}
                      <div className="w-10 h-7 bg-white rounded-md flex items-center justify-center border border-gray-200 hover:border-gray-300 hover:shadow-sm transition-all" title="Google Pay">
                        <svg className="h-4" viewBox="0 0 150 60" xmlns="http://www.w3.org/2000/svg">
                          <path d="M71.154 28.874V45h-4.48V10.2h11.862c2.878 0 5.378.978 7.498 2.934 2.17 1.956 3.256 4.356 3.256 7.2s-1.086 5.27-3.256 7.25c-2.094 1.958-4.594 2.936-7.498 2.936H71.154v.354zm0-14.782v10.936h7.468c1.69 0 3.104-.58 4.24-1.742 1.162-1.16 1.742-2.57 1.742-4.226 0-1.632-.58-3.03-1.742-4.194-1.136-1.186-2.55-1.774-4.24-1.774h-7.468z" fill="#3C4043"/>
                          <path d="M98.834 19.32c3.282 0 5.87.886 7.768 2.66 1.898 1.772 2.846 4.198 2.846 7.276v14.744h-4.288v-3.322h-.192c-1.836 2.734-4.276 4.102-7.318 4.102-2.594 0-4.768-.77-6.52-2.31-1.752-1.542-2.628-3.492-2.628-5.852 0-2.474.936-4.44 2.808-5.904 1.872-1.462 4.374-2.194 7.504-2.194 2.672 0 4.872.49 6.602 1.468v-1.03c0-1.75-.68-3.234-2.042-4.45-1.362-1.218-2.946-1.826-4.754-1.826-2.75 0-4.926 1.16-6.528 3.48l-3.948-2.49c2.362-3.434 5.862-5.152 10.498-5.152h-.808zm-5.822 19.396c0 1.318.546 2.416 1.638 3.292 1.094.878 2.37 1.316 3.832 1.316 2.078 0 3.93-.778 5.556-2.334 1.626-1.556 2.438-3.386 2.438-5.49-1.394-1.12-3.332-1.682-5.818-1.682-1.81 0-3.326.452-4.544 1.354-1.22.904-1.83 2-1.83 3.286l.728.258z" fill="#3C4043"/>
                          <path d="M130.994 20.1l-14.898 34.28h-4.618l5.534-12.07L108.246 20.1h4.862l6.376 15.392h.074L125.89 20.1h5.104z" fill="#3C4043"/>
                          <path d="M53.918 25.422a24.844 24.844 0 0 0-.354-4.222H30.66v7.976h13.06c-.564 3.028-2.268 5.592-4.832 7.31v6.076h7.824c4.578-4.216 7.214-10.43 7.214-17.14h-.008z" fill="#4285F4"/>
                          <path d="M30.66 48.926c6.54 0 12.022-2.168 16.03-5.88l-7.824-6.076c-2.168 1.454-4.942 2.314-8.198 2.314-6.308 0-11.648-4.26-13.548-9.986H9.062v6.274c3.984 7.916 12.178 13.354 21.598 13.354z" fill="#34A853"/>
                          <path d="M17.112 29.298a11.6 11.6 0 0 1-.604-3.698c0-1.284.22-2.53.604-3.698v-6.274H9.062A19.498 19.498 0 0 0 6.99 25.6c0 3.146.752 6.126 2.072 8.772l8.05-5.074z" fill="#FBBC04"/>
                          <path d="M30.66 11.916c3.556 0 6.748 1.224 9.26 3.626l6.946-6.946C42.656 4.752 37.174 2.274 30.66 2.274c-9.42 0-17.614 5.438-21.598 13.354l8.05 6.274c1.9-5.726 7.24-9.986 13.548-9.986z" fill="#EA4335"/>
                        </svg>
                      </div>
                      {/* PayPal */}
                      <div className="w-10 h-7 bg-white rounded-md flex items-center justify-center border border-gray-200 hover:border-gray-300 hover:shadow-sm transition-all" title="PayPal">
                        <svg className="h-4" viewBox="0 0 124 33" xmlns="http://www.w3.org/2000/svg">
                          <path d="M46.211 6.749h-6.839a.95.95 0 0 0-.939.802l-2.766 17.537a.57.57 0 0 0 .564.658h3.265a.95.95 0 0 0 .939-.803l.746-4.73a.95.95 0 0 1 .938-.803h2.165c4.505 0 7.105-2.18 7.784-6.5.306-1.89.013-3.375-.872-4.415-.972-1.142-2.696-1.746-4.985-1.746zM47 13.154c-.374 2.454-2.249 2.454-4.062 2.454h-1.032l.724-4.583a.57.57 0 0 1 .563-.481h.473c1.235 0 2.4 0 3.002.704.359.42.468 1.044.331 1.906z" fill="#253B80"/>
                          <path d="M66.654 13.075h-3.275a.57.57 0 0 0-.563.481l-.145.916-.229-.332c-.709-1.029-2.29-1.373-3.868-1.373-3.619 0-6.71 2.741-7.312 6.586-.313 1.918.132 3.752 1.22 5.031.998 1.176 2.426 1.666 4.125 1.666 2.916 0 4.533-1.875 4.533-1.875l-.146.91a.57.57 0 0 0 .562.66h2.95a.95.95 0 0 0 .939-.803l1.77-11.209a.568.568 0 0 0-.561-.658zm-4.565 6.374c-.316 1.871-1.801 3.127-3.695 3.127-.951 0-1.711-.305-2.199-.883-.484-.574-.668-1.391-.514-2.301.295-1.855 1.805-3.152 3.67-3.152.93 0 1.686.309 2.184.892.499.589.697 1.411.554 2.317z" fill="#253B80"/>
                          <path d="M84.096 13.075h-3.291a.954.954 0 0 0-.787.417l-4.539 6.686-1.924-6.425a.953.953 0 0 0-.912-.678h-3.234a.57.57 0 0 0-.541.754l3.625 10.638-3.408 4.811a.57.57 0 0 0 .465.9h3.287a.949.949 0 0 0 .781-.408l10.946-15.8a.57.57 0 0 0-.468-.895z" fill="#253B80"/>
                          <path d="M94.992 6.749h-6.84a.95.95 0 0 0-.938.802l-2.766 17.537a.569.569 0 0 0 .562.658h3.51a.665.665 0 0 0 .656-.562l.785-4.971a.95.95 0 0 1 .938-.803h2.164c4.506 0 7.105-2.18 7.785-6.5.307-1.89.012-3.375-.873-4.415-.971-1.142-2.694-1.746-4.983-1.746zm.789 6.405c-.373 2.454-2.248 2.454-4.062 2.454h-1.031l.725-4.583a.568.568 0 0 1 .562-.481h.473c1.234 0 2.4 0 3.002.704.359.42.468 1.044.331 1.906z" fill="#179BD7"/>
                          <path d="M115.434 13.075h-3.273a.567.567 0 0 0-.562.481l-.145.916-.23-.332c-.709-1.029-2.289-1.373-3.867-1.373-3.619 0-6.709 2.741-7.311 6.586-.312 1.918.131 3.752 1.219 5.031 1 1.176 2.426 1.666 4.125 1.666 2.916 0 4.533-1.875 4.533-1.875l-.146.91a.57.57 0 0 0 .564.66h2.949a.95.95 0 0 0 .938-.803l1.771-11.209a.571.571 0 0 0-.565-.658zm-4.565 6.374c-.314 1.871-1.801 3.127-3.695 3.127-.949 0-1.711-.305-2.199-.883-.484-.574-.666-1.391-.514-2.301.297-1.855 1.805-3.152 3.67-3.152.93 0 1.686.309 2.184.892.501.589.699 1.411.554 2.317z" fill="#179BD7"/>
                          <path d="M119.295 7.23l-2.807 17.858a.569.569 0 0 0 .562.658h2.822a.949.949 0 0 0 .939-.803l2.768-17.536a.57.57 0 0 0-.562-.658h-3.16a.571.571 0 0 0-.562.481z" fill="#179BD7"/>
                          <path d="M7.266 29.154l.523-3.322-1.165-.027H1.061L4.927 1.292a.316.316 0 0 1 .312-.268h9.38c3.114 0 5.263.648 6.385 1.927.526.6.861 1.227 1.023 1.917.17.724.173 1.589.007 2.644l-.012.077v.676l.526.298a3.69 3.69 0 0 1 1.065.812c.45.513.741 1.165.864 1.938.127.795.085 1.741-.123 2.812-.24 1.232-.628 2.305-1.152 3.183a6.547 6.547 0 0 1-1.825 2c-.696.494-1.523.869-2.458 1.109-.906.236-1.939.355-3.072.355h-.73a2.21 2.21 0 0 0-2.183 1.866l-.055.299-0.924 5.855-.042.215c-.011.068-.03.102-.058.125a.155.155 0 0 1-.096.035H7.266z" fill="#253B80"/>
                          <path d="M23.048 7.667c-.028.179-.06.362-.096.55-1.237 6.351-5.469 8.545-10.874 8.545H9.326c-.661 0-1.218.48-1.321 1.132L6.596 26.83l-.399 2.533a.704.704 0 0 0 .695.814h4.881c.578 0 1.069-.42 1.16-.99l.048-.248.919-5.832.059-.32c.09-.572.582-.992 1.16-.992h.73c4.729 0 8.431-1.92 9.513-7.476.452-2.321.218-4.259-.978-5.622a4.667 4.667 0 0 0-1.336-1.03z" fill="#179BD7"/>
                          <path d="M21.754 7.151a9.757 9.757 0 0 0-1.203-.267 15.284 15.284 0 0 0-2.426-.177H11.59a1.165 1.165 0 0 0-1.152.99L9.38 13.545l-.031.199a1.34 1.34 0 0 1 1.321-1.132h2.752c5.405 0 9.637-2.195 10.874-8.545.037-.188.068-.371.096-.55a6.303 6.303 0 0 0-2.638-1.366z" fill="#222D65"/>
                          <path d="M10.438 8.697a1.166 1.166 0 0 1 1.152-.99h6.535c.774 0 1.496.05 2.16.177a9.757 9.757 0 0 1 1.47.353c.365.128.695.28.988.454a6.965 6.965 0 0 0-1.335-5.73C19.846 1.072 17.178 0 13.958 0H4.587A1.34 1.34 0 0 0 3.266 1.13L.011 25.804a.806.806 0 0 0 .795.932h5.791l1.454-9.225 2.387-8.814z" fill="#253B80"/>
                        </svg>
                      </div>
                      {/* Klarna */}
                      <div className="w-10 h-7 bg-[#FFB3C7] rounded-lg flex items-center justify-center border border-[#FFB3C7] hover:border-[#ff9ab5] hover:shadow-sm transition-all" title="Klarna">
                        <span className="text-[8px] font-black text-black leading-none tracking-tight">Klarna.</span>
                      </div>
                      {/* Visa / Mastercard (Credit Card) */}
                      <div className="w-10 h-7 bg-white rounded-md flex items-center justify-center border border-gray-200 hover:border-gray-300 hover:shadow-sm transition-all" title="Kreditkarte">
                        <svg className="h-4" viewBox="0 0 48 30" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <circle cx="18" cy="15" r="12" fill="#EB001B"/>
                          <circle cx="30" cy="15" r="12" fill="#F79E1B"/>
                          <path d="M24 5.15C26.516 7.15 28.086 10.29 28.086 13.8c0 3.51-1.57 6.65-4.086 8.65C21.484 20.45 19.914 17.31 19.914 13.8c0-3.51 1.57-6.65 4.086-8.65z" fill="#FF5F00"/>
                        </svg>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Bottom branding accent */}
                <div className="mt-6 flex items-center justify-center gap-2">
                  <div className="h-px w-12 bg-gradient-to-r from-transparent to-[#CC0000]/10" />
                  <div className="w-1.5 h-1.5 rounded-full bg-[#CC0000]/20" />
                  <div className="h-px w-12 bg-gradient-to-l from-transparent to-[#CC0000]/10" />
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Legal Modal */}
      {activeLegalModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center px-4 py-4">
          <div
            className="absolute inset-0 bg-black/70 backdrop-blur-sm"
            onClick={() => setActiveLegalModal(null)}
          />
          <div className="relative z-10 w-full max-w-2xl max-h-[85vh] bg-white rounded-2xl shadow-2xl flex flex-col overflow-hidden animate-[scaleIn_0.3s_cubic-bezier(0.16,1,0.3,1)]">
            {/* Header */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200 bg-gray-50/80 flex-shrink-0">
              <h2 className="text-lg sm:text-xl font-bold text-gray-900">
                {activeLegalModal === 'datenschutz' && 'Datenschutzrichtlinie'}
                {activeLegalModal === 'nutzung' && 'Allgemeine Geschäftsbedingungen'}
                {activeLegalModal === 'impressum' && 'Impressum'}
              </h2>
              <button
                onClick={() => setActiveLegalModal(null)}
                className="w-8 h-8 rounded-full bg-gray-200 hover:bg-[#CC0000] hover:text-white flex items-center justify-center transition-all duration-300 text-gray-500"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* Content */}
            <div className="overflow-y-auto px-6 py-5 text-sm text-gray-700 leading-relaxed space-y-4">
              {activeLegalModal === 'datenschutz' && (
                <>
                  <p className="text-xs text-gray-400">Zuletzt aktualisiert: 06.02.2026</p>

                  <h3 className="font-bold text-gray-900 text-base">1. Verantwortlicher</h3>
                  <p>Verantwortlicher im Sinne der Datenschutz-Grundverordnung (DSGVO) ist:<br/>
                  Hungry Club<br/>
                  Toshi Sushi & Asia Küche, Dresden 01324, Germany<br/>
                  Telefon: +49 1520 4542276<br/>
                  Website: hungry-club-final.vercel.app</p>

                  <h3 className="font-bold text-gray-900 text-base">2. Erhebung und Speicherung personenbezogener Daten</h3>
                  <p>Beim Besuch unserer Website werden automatisch Informationen allgemeiner Natur erfasst (Server-Logfiles). Diese umfassen den verwendeten Internetbrowser, das Betriebssystem, den Domainnamen Ihres Internet-Service-Providers, Ihre IP-Adresse und Ähnliches. Es handelt sich dabei um Informationen, die keine Rückschlüsse auf Ihre Person zulassen. Diese Daten werden gemäß Art. 6 Abs. 1 lit. f DSGVO auf Grundlage unseres berechtigten Interesses an der Verbesserung der Stabilität und Funktionalität unserer Website verarbeitet.</p>

                  <h3 className="font-bold text-gray-900 text-base">3. Bestelldaten</h3>
                  <p>Bei einer Bestellung über unsere Website erheben wir folgende Daten: Name, Lieferadresse, E-Mail-Adresse, Telefonnummer und Zahlungsinformationen. Die Verarbeitung dieser Daten erfolgt zur Vertragserfüllung gemäß Art. 6 Abs. 1 lit. b DSGVO. Eine Weitergabe an Dritte erfolgt nur, soweit dies zur Vertragserfüllung erforderlich ist (z.B. Lieferdienst, Zahlungsdienstleister).</p>

                  <h3 className="font-bold text-gray-900 text-base">4. Cookies</h3>
                  <p>Unsere Website verwendet Cookies. Dabei handelt es sich um kleine Textdateien, die auf Ihrem Endgerät gespeichert werden. Einige Cookies sind technisch notwendig (Art. 6 Abs. 1 lit. f DSGVO), andere werden nur mit Ihrer Einwilligung gesetzt (Art. 6 Abs. 1 lit. a DSGVO). Sie können die Speicherung von Cookies in Ihren Browser-Einstellungen verhindern.</p>

                  <h3 className="font-bold text-gray-900 text-base">5. Ihre Rechte</h3>
                  <p>Sie haben gemäß DSGVO folgende Rechte:</p>
                  <ul className="list-disc pl-5 space-y-1">
                    <li>Auskunftsrecht (Art. 15 DSGVO)</li>
                    <li>Recht auf Berichtigung (Art. 16 DSGVO)</li>
                    <li>Recht auf Löschung (Art. 17 DSGVO)</li>
                    <li>Recht auf Einschränkung der Verarbeitung (Art. 18 DSGVO)</li>
                    <li>Recht auf Datenübertragbarkeit (Art. 20 DSGVO)</li>
                    <li>Widerspruchsrecht (Art. 21 DSGVO)</li>
                    <li>Recht auf Widerruf erteilter Einwilligungen (Art. 7 Abs. 3 DSGVO)</li>
                    <li>Beschwerderecht bei einer Aufsichtsbehörde (Art. 77 DSGVO)</li>
                  </ul>

                  <h3 className="font-bold text-gray-900 text-base">6. Speicherdauer</h3>
                  <p>Personenbezogene Daten werden nur so lange gespeichert, wie dies für die Erfüllung des jeweiligen Zwecks erforderlich ist oder gesetzliche Aufbewahrungsfristen bestehen (z.B. handels- und steuerrechtliche Aufbewahrungsfristen von 6 bis 10 Jahren gemäß § 257 HGB, § 147 AO).</p>

                  <h3 className="font-bold text-gray-900 text-base">7. Zahlungsdienstleister</h3>
                  <p>Zur Abwicklung von Zahlungen nutzen wir externe Zahlungsdienstleister. Dabei werden die zur Zahlungsabwicklung erforderlichen Daten an den jeweiligen Dienstleister übermittelt (Art. 6 Abs. 1 lit. b DSGVO). Wir nutzen unter anderem: Apple Pay, Google Pay, PayPal, Klarna und Kreditkartenanbieter (Visa, Mastercard).</p>

                  <h3 className="font-bold text-gray-900 text-base">8. SSL-/TLS-Verschlüsselung</h3>
                  <p>Diese Seite nutzt aus Sicherheitsgründen eine SSL-/TLS-Verschlüsselung. Eine verschlüsselte Verbindung erkennen Sie daran, dass die Adresszeile des Browsers von &quot;http://&quot; auf &quot;https://&quot; wechselt und an dem Schloss-Symbol in Ihrer Browserzeile.</p>

                  <p className="text-xs text-gray-400 pt-2">© 2026 Hungry Club. Alle Rechte vorbehalten.</p>
                </>
              )}

              {activeLegalModal === 'nutzung' && (
                <>
                  <p className="text-xs text-gray-400">Zuletzt aktualisiert: 06.02.2026</p>

                  <p>Diese Allgemeinen Geschäftsbedingungen gelten für Online-Bestellungen von:</p>
                  <p><strong>Hungry Club</strong><br/>
                  Website: hungry-club-final.vercel.app<br/>
                  Adresse: Toshi Sushi & Asia Küche, Dresden 01324, Germany<br/>
                  Telefon: +49 1520 4542276</p>

                  <p>Bitte lesen Sie diese Nutzungsbedingungen (die &quot;Vereinbarung&quot;) sorgfältig durch. Ihre Nutzung der Website stellt Ihre Zustimmung zu dieser Vereinbarung dar.</p>

                  <p>Diese Vereinbarung besteht zwischen Ihnen und Hungry Club (&quot;Restaurant&quot; oder &quot;wir&quot; oder &quot;uns&quot;) bezüglich Ihrer Nutzung der Website des Restaurants, die sich derzeit unter hungry-club-final.vercel.app befindet (zusammen mit allen darin verfügbaren Materialien und Diensten sowie Nachfolgeseiten, die &quot;Website&quot;).</p>

                  <p>Durch die Nutzung der Website bestätigen Sie, dass Sie volljährig sind, um diese Vereinbarung einzugehen.</p>

                  <h3 className="font-bold text-gray-900 text-base">Änderungen</h3>
                  <p>Wir können diese Vereinbarung von Zeit zu Zeit ändern, indem wir Sie über solche Änderungen auf angemessene Weise informieren, einschließlich der Veröffentlichung einer überarbeiteten Vereinbarung auf der Website. Ihre weitere Nutzung der Website nach solchen Änderungen stellt Ihre Annahme dieser Änderungen dar.</p>

                  <h3 className="font-bold text-gray-900 text-base">Über die Website übermittelte Informationen</h3>
                  <p>Ihre Übermittlung von Informationen über die Website unterliegt der Datenschutzrichtlinie des Restaurants. Sie erklären und gewährleisten, dass alle Informationen, die Sie im Zusammenhang mit der Website angeben, korrekt und vollständig sind und bleiben.</p>

                  <h3 className="font-bold text-gray-900 text-base">Verhaltensregeln</h3>
                  <p>Im Zusammenhang mit der Website dürfen Sie nicht:</p>
                  <ul className="list-disc pl-5 space-y-1">
                    <li>Materialien veröffentlichen, die bedrohlich, belästigend, erniedrigend, hasserfüllt oder einschüchternd sind</li>
                    <li>Viren, Trojaner oder andere schädliche Software verbreiten</li>
                    <li>Die Website für betrügerische oder rechtswidrige Zwecke nutzen</li>
                    <li>Informationen über andere Nutzer sammeln</li>
                    <li>Den Betrieb der Website stören oder beeinträchtigen</li>
                    <li>Inhalte der Website ohne ausdrückliche Genehmigung reproduzieren, modifizieren oder verbreiten</li>
                  </ul>

                  <h3 className="font-bold text-gray-900 text-base">Produkte</h3>
                  <p>Die Website kann Auflistungen, Beschreibungen und Bilder von Speisen, Getränken und anderen Waren oder Dienstleistungen zur Verfügung stellen. Wir übernehmen keine Gewähr für die Vollständigkeit, Richtigkeit oder Aktualität solcher Informationen, einschließlich Nährwertangaben, Zutatenlisten oder Allergeninformationen. Bilder dienen nur zur Veranschaulichung. Bei Lebensmittelallergien oder besonderen Ernährungsbedürfnissen kontaktieren Sie uns bitte direkt vor der Bestellung.</p>

                  <h3 className="font-bold text-gray-900 text-base">Bestellungen und Lieferungen</h3>
                  <p>Bei einer Bestellung können Sie aufgefordert werden, relevante Informationen wie Kreditkartennummer, Rechnungsadresse und Lieferadresse anzugeben. Sie erklären und gewährleisten, dass Sie berechtigt sind, die angegebene Zahlungsmethode zu nutzen. Das Restaurant behält sich das Recht vor, die verfügbare Menge zu begrenzen, Bestellungen abzulehnen und Aktionsbedingungen festzulegen. Lieferzeiten können nicht garantiert werden und können durch Wetter- oder Verkehrsbedingungen beeinflusst werden.</p>

                  <h3 className="font-bold text-gray-900 text-base">Haftungsausschluss</h3>
                  <p>Im größtmöglichen gesetzlich zulässigen Umfang wird die Website und alle Produkte &quot;wie besehen&quot; und &quot;wie verfügbar&quot; ohne jegliche ausdrückliche oder stillschweigende Gewährleistung zur Verfügung gestellt. Das Restaurant haftet nicht für indirekte, zufällige, Folge- oder Strafschäden jeglicher Art.</p>

                  <h3 className="font-bold text-gray-900 text-base">Anwendbares Recht und Gerichtsstand</h3>
                  <p>Diese Vereinbarung unterliegt dem Recht der Bundesrepublik Deutschland. Gerichtsstand ist Dresden, Deutschland.</p>

                  <h3 className="font-bold text-gray-900 text-base">Kündigung</h3>
                  <p>Diese Vereinbarung ist wirksam bis zu ihrer Kündigung. Das Restaurant kann Ihre Nutzung der Website jederzeit und ohne vorherige Ankündigung kündigen oder aussetzen.</p>

                  <p className="text-xs text-gray-400 pt-2">© 2026 Hungry Club. Alle Rechte vorbehalten.</p>
                </>
              )}

              {activeLegalModal === 'impressum' && (
                <>
                  <h3 className="font-bold text-gray-900 text-base">Angaben gemäß § 5 TMG</h3>
                  <p>Hungry Club<br/>
                  Toshi Sushi & Asia Küche<br/>
                  01324 Dresden<br/>
                  Deutschland</p>

                  <h3 className="font-bold text-gray-900 text-base">Kontakt</h3>
                  <p>Telefon: +49 1520 4542276<br/>
                  Website: hungry-club-final.vercel.app</p>

                  <h3 className="font-bold text-gray-900 text-base">Verantwortlich für den Inhalt nach § 55 Abs. 2 RStV</h3>
                  <p>Hungry Club<br/>
                  Toshi Sushi & Asia Küche<br/>
                  01324 Dresden<br/>
                  Deutschland</p>

                  <h3 className="font-bold text-gray-900 text-base">EU-Streitschlichtung</h3>
                  <p>Die Europäische Kommission stellt eine Plattform zur Online-Streitbeilegung (OS) bereit: <a href="https://ec.europa.eu/consumers/odr/" target="_blank" rel="noopener noreferrer" className="text-[#CC0000] hover:underline">https://ec.europa.eu/consumers/odr/</a></p>

                  <h3 className="font-bold text-gray-900 text-base">Verbraucherstreitbeilegung / Universalschlichtungsstelle</h3>
                  <p>Wir sind nicht bereit oder verpflichtet, an Streitbeilegungsverfahren vor einer Verbraucherschlichtungsstelle teilzunehmen.</p>

                  <h3 className="font-bold text-gray-900 text-base">Haftung für Inhalte</h3>
                  <p>Als Diensteanbieter sind wir gemäß § 7 Abs.1 TMG für eigene Inhalte auf diesen Seiten nach den allgemeinen Gesetzen verantwortlich. Nach §§ 8 bis 10 TMG sind wir als Diensteanbieter jedoch nicht verpflichtet, übermittelte oder gespeicherte fremde Informationen zu überwachen oder nach Umständen zu forschen, die auf eine rechtswidrige Tätigkeit hinweisen.</p>
                  <p>Verpflichtungen zur Entfernung oder Sperrung der Nutzung von Informationen nach den allgemeinen Gesetzen bleiben hiervon unberührt. Eine diesbezügliche Haftung ist jedoch erst ab dem Zeitpunkt der Kenntnis einer konkreten Rechtsverletzung möglich. Bei Bekanntwerden von entsprechenden Rechtsverletzungen werden wir diese Inhalte umgehend entfernen.</p>

                  <h3 className="font-bold text-gray-900 text-base">Haftung für Links</h3>
                  <p>Unser Angebot enthält Links zu externen Websites Dritter, auf deren Inhalte wir keinen Einfluss haben. Deshalb können wir für diese fremden Inhalte auch keine Gewähr übernehmen. Für die Inhalte der verlinkten Seiten ist stets der jeweilige Anbieter oder Betreiber der Seiten verantwortlich.</p>

                  <h3 className="font-bold text-gray-900 text-base">Urheberrecht</h3>
                  <p>Die durch die Seitenbetreiber erstellten Inhalte und Werke auf diesen Seiten unterliegen dem deutschen Urheberrecht. Die Vervielfältigung, Bearbeitung, Verbreitung und jede Art der Verwertung außerhalb der Grenzen des Urheberrechtes bedürfen der schriftlichen Zustimmung des jeweiligen Autors bzw. Erstellers. Downloads und Kopien dieser Seite sind nur für den privaten, nicht kommerziellen Gebrauch gestattet.</p>

                  <p className="text-xs text-gray-400 pt-2">© 2026 Hungry Club. Alle Rechte vorbehalten.</p>
                </>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Hidden GloriaFood trigger elements - positioned off-screen so the embedder script can process them */}
      <div style={{ position: 'absolute', left: '-9999px', top: '-9999px', opacity: 0, pointerEvents: 'none' }}>
        <span
          ref={glfMenuRef}
          className="glf-button"
          data-glf-cuid="2dce760b-1737-455f-9336-6b3ba61e8c4a"
          data-glf-ruid="e7559eb6-5b6d-4767-b01d-bc4495e8ca97"
        >See MENU &amp; Order</span>
        <span
          ref={glfReservationRef}
          className="glf-button reservation"
          data-glf-cuid="2dce760b-1737-455f-9336-6b3ba61e8c4a"
          data-glf-ruid="e7559eb6-5b6d-4767-b01d-bc4495e8ca97"
          data-glf-reservation="true"
        >Table Reservation</span>
      </div>
    </div>
  );
}
