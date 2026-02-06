'use client'

import Image from "next/image";
import { useState, useEffect, useRef } from 'react';

export default function Home() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [activeCard, setActiveCard] = useState<string | null>(null);
  const glfMenuRef = useRef<HTMLSpanElement>(null);
  const glfReservationRef = useRef<HTMLSpanElement>(null);

  const openGloriaFoodMenu = () => {
    glfMenuRef.current?.click();
  };

  const openGloriaFoodReservation = () => {
    glfReservationRef.current?.click();
  };

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
        <div className="relative">
          {/* Main navbar */}
          <div className="h-16 shadow-lg border-b-2 border-[#990000] bg-[#E31837]">
            <div className="max-w-7xl mx-auto px-4 lg:px-8 h-full">
              <div className="flex items-center h-full justify-between lg:justify-start">
                {/* Logo on the left */}
                <div className="flex items-center h-full py-0.5 w-32 lg:w-70">
                  <div className="group bg-white rounded-xl shadow-lg border-4 border-[#990000] h-full aspect-square lg:aspect-[7/3] overflow-hidden transition-all duration-300 hover:shadow-[0_0_20px_rgba(255,255,255,0.8)] hover:border-white hover:scale-105 cursor-pointer p-1">
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

                {/* Action Buttons */}
                <div className="flex items-center justify-end gap-3 w-auto ml-auto">
                  <button
                    onClick={openGloriaFoodReservation}
                    className="px-6 py-2.5 bg-white text-[#E31837] font-bold rounded-lg hover:bg-[#E31837] hover:text-white hover:scale-105 hover:shadow-[0_0_15px_rgba(255,255,255,0.5)] transition-all duration-300 shadow-md border-2 border-white"
                  >
                  Reservierung
                  </button>
                  {/* Hamburger Menu Button - Now visible on desktop too */}
                  <button
                    onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                    className="p-2 bg-white text-[#E31837] rounded-lg hover:bg-[#E31837] hover:text-white hover:scale-105 hover:shadow-[0_0_15px_rgba(255,255,255,0.5)] transition-all duration-300 shadow-md border-2 border-white"
                  >
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      {isMobileMenuOpen ? (
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                      ) : (
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                      )}
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Mobile Menu Dropdown */}
          {isMobileMenuOpen && (
            <div className="lg:hidden absolute top-full left-0 right-0 bg-[#E31837] shadow-2xl border-t-2 border-[#990000] z-40">
              <div className="max-w-7xl mx-auto px-4 py-4">
                <div className="space-y-4">
                  {/* Restaurant Navigation Icons */}
                  <div className="flex items-center justify-center gap-3 pb-3 border-b-2 border-[#990000]">
                    <button
                      onClick={(e) => {
                        e.preventDefault();
                        setIsMobileMenuOpen(false);
                        handleNavClick('toshi-sushi');
                        document.getElementById('toshi-sushi-mobile')?.scrollIntoView({ behavior: 'smooth', block: 'center' });
                      }}
                      className="group relative transition-all"
                    >
                      <span className="relative w-14 h-14 block group-active:scale-95 transition-transform bg-white rounded-full overflow-hidden shadow-lg border-2 border-[#990000]">
                        <Image src="/sushi_nav.png" alt="Sushi" fill className="object-cover" />
                      </span>
                    </button>
                    <button
                      onClick={(e) => {
                        e.preventDefault();
                        setIsMobileMenuOpen(false);
                        handleNavClick('hiro-burger');
                        document.getElementById('hiro-burger-mobile')?.scrollIntoView({ behavior: 'smooth', block: 'center' });
                      }}
                      className="group relative transition-all"
                    >
                      <span className="relative w-14 h-14 block group-active:scale-95 transition-transform bg-white rounded-full overflow-hidden shadow-lg border-2 border-[#990000]">
                        <Image src="/burger_nav.png" alt="Burger" fill className="object-cover" />
                      </span>
                    </button>
                    <button
                      onClick={(e) => {
                        e.preventDefault();
                        setIsMobileMenuOpen(false);
                        handleNavClick('pizza-time');
                        document.getElementById('pizza-time-mobile')?.scrollIntoView({ behavior: 'smooth', block: 'center' });
                      }}
                      className="group relative transition-all"
                    >
                      <span className="relative w-14 h-14 block group-active:scale-95 transition-transform bg-white rounded-full overflow-hidden shadow-lg border-2 border-[#990000]">
                        <Image src="/pizza_nav.png" alt="Pizza" fill className="object-cover" />
                      </span>
                    </button>
                    <button
                      onClick={(e) => {
                        e.preventDefault();
                        setIsMobileMenuOpen(false);
                        handleNavClick('los-tacos');
                        document.getElementById('los-tacos-mobile')?.scrollIntoView({ behavior: 'smooth', block: 'center' });
                      }}
                      className="group relative transition-all"
                    >
                      <span className="relative w-14 h-14 block group-active:scale-95 transition-transform bg-white rounded-full overflow-hidden shadow-lg border-2 border-[#990000]">
                        <Image src="/taco_nav.png" alt="Taco" fill className="object-cover" />
                      </span>
                    </button>
                    <button
                      onClick={(e) => {
                        e.preventDefault();
                        setIsMobileMenuOpen(false);
                        handleNavClick('bowlicious');
                        document.getElementById('bowlicious-mobile')?.scrollIntoView({ behavior: 'smooth', block: 'center' });
                      }}
                      className="group relative transition-all"
                    >
                      <span className="relative w-14 h-14 block group-active:scale-95 transition-transform bg-white rounded-full overflow-hidden shadow-lg border-2 border-[#990000]">
                        <Image src="/bowl_nav.png" alt="Bowl" fill className="object-cover" />
                      </span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Desktop Menu Dropdown */}
          {isMobileMenuOpen && (
            <div className="hidden lg:block absolute top-full left-0 right-0 bg-[#E31837] shadow-2xl border-t-2 border-[#990000] z-40">
              <div className="max-w-7xl mx-auto px-8 py-6">
                <div className="space-y-4">
                  {/* Restaurant Navigation Icons */}
                  <div className="flex items-center justify-center gap-4">
                    <button
                      onClick={(e) => {
                        e.preventDefault();
                        setIsMobileMenuOpen(false);
                        handleNavClick('toshi-sushi');
                        document.getElementById('toshi-sushi')?.scrollIntoView({ behavior: 'smooth', block: 'center' });
                      }}
                      className="group relative transition-all"
                    >
                      <span className="relative w-16 h-16 block group-hover:scale-110 transition-transform bg-white rounded-full overflow-hidden shadow-lg border-2 border-[#990000] group-hover:border-white">
                        <Image src="/sushi_nav.png" alt="Sushi" fill className="object-cover" />
                      </span>
                    </button>
                    <button
                      onClick={(e) => {
                        e.preventDefault();
                        setIsMobileMenuOpen(false);
                        handleNavClick('hiro-burger');
                        document.getElementById('hiro-burger')?.scrollIntoView({ behavior: 'smooth', block: 'center' });
                      }}
                      className="group relative transition-all"
                    >
                      <span className="relative w-16 h-16 block group-hover:scale-110 transition-transform bg-white rounded-full overflow-hidden shadow-lg border-2 border-[#990000] group-hover:border-white">
                        <Image src="/burger_nav.png" alt="Burger" fill className="object-cover" />
                      </span>
                    </button>
                    <button
                      onClick={(e) => {
                        e.preventDefault();
                        setIsMobileMenuOpen(false);
                        handleNavClick('pizza-time');
                        document.getElementById('pizza-time')?.scrollIntoView({ behavior: 'smooth', block: 'center' });
                      }}
                      className="group relative transition-all"
                    >
                      <span className="relative w-16 h-16 block group-hover:scale-110 transition-transform bg-white rounded-full overflow-hidden shadow-lg border-2 border-[#990000] group-hover:border-white">
                        <Image src="/pizza_nav.png" alt="Pizza" fill className="object-cover" />
                      </span>
                    </button>
                    <button
                      onClick={(e) => {
                        e.preventDefault();
                        setIsMobileMenuOpen(false);
                        handleNavClick('los-tacos');
                        document.getElementById('los-tacos')?.scrollIntoView({ behavior: 'smooth', block: 'center' });
                      }}
                      className="group relative transition-all"
                    >
                      <span className="relative w-16 h-16 block group-hover:scale-110 transition-transform bg-white rounded-full overflow-hidden shadow-lg border-2 border-[#990000] group-hover:border-white">
                        <Image src="/taco_nav.png" alt="Taco" fill className="object-cover" />
                      </span>
                    </button>
                    <button
                      onClick={(e) => {
                        e.preventDefault();
                        setIsMobileMenuOpen(false);
                        handleNavClick('bowlicious');
                        document.getElementById('bowlicious')?.scrollIntoView({ behavior: 'smooth', block: 'center' });
                      }}
                      className="group relative transition-all"
                    >
                      <span className="relative w-16 h-16 block group-hover:scale-110 transition-transform bg-white rounded-full overflow-hidden shadow-lg border-2 border-[#990000] group-hover:border-white">
                        <Image src="/bowl_nav.png" alt="Bowl" fill className="object-cover" />
                      </span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative h-screen overflow-hidden pt-16">
        {/* Background Image */}
        <div className="absolute inset-0">
          {/* Mobile Image */}
          <div className="absolute inset-0 lg:hidden">
            <Image
              src="/H_mob.png"
              alt="Delicious Food Background"
              fill
              className="object-cover"
              priority
            />
          </div>
          {/* Desktop Image */}
          <Image
            src="/H_7.png"
            alt="Delicious Food Background"
            fill
            className="object-cover object-[50%_40%] hidden lg:block"
            priority
          />
        </div>

        {/* Hero Text Overlay */}
        <div className="absolute inset-0 flex flex-col items-center justify-center z-10">
          {/* Cinematic gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black/60"></div>
          <div className="absolute inset-0 bg-gradient-to-r from-black/30 via-transparent to-black/30"></div>

          <div className="relative text-center px-6 max-w-6xl mx-auto">
            {/* Decorative top accent */}
            <div className="flex items-center justify-center gap-4 mb-6 md:mb-8">
              <div className="h-[1px] w-12 md:w-20 bg-gradient-to-r from-transparent to-white/60"></div>
              <span className="text-white/80 text-xs md:text-sm tracking-[0.3em] uppercase font-light">Est. 2024</span>
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

            {/* CTA Button */}
            <div className="flex items-center justify-center">
              <button
                onClick={openGloriaFoodReservation}
                className="px-8 py-3.5 bg-white/10 backdrop-blur-sm text-white font-bold rounded-full border border-white/30 hover:bg-white/20 hover:border-white/50 transition-all duration-300 hover:scale-105 tracking-wide"
              >
                Tisch Reservieren
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
      <section id="restaurants" className="relative py-20 scroll-mt-16" style={{ backgroundImage: 'url(/bg.png)', backgroundRepeat: 'repeat', backgroundSize: '400px' }}>
        <div className="relative z-10 max-w-7xl mx-auto px-8">
          {/* Desktop Grid Layout (2-2-1) */}
          <div className="hidden lg:block">
            {/* First Row - 2 Cards */}
            <div className="grid grid-cols-2 gap-6 mb-6">
              {/* Toshi Sushi Card */}
              <div id="toshi-sushi" className="scroll-mt-20">
                <div onClick={openGloriaFoodMenu} className={`block relative h-75 rounded-2xl overflow-hidden shadow-2xl border-4 transition-all duration-700 cursor-pointer ${activeCard === 'toshi-sushi' ? 'shadow-[0_0_60px_rgba(255,255,255,0.8)] border-white scale-[1.02] group' : 'border-white hover:shadow-[0_0_60px_rgba(255,255,255,0.8)] hover:border-white hover:scale-[1.02] group'}`}>
                  <Image
                    src="/toshi_card.png"
                    alt="Toshi Sushi & Asia Küche"
                    fill
                    className={`object-cover object-[50%_38%] transition-all duration-700 ${activeCard === 'toshi-sushi' ? 'scale-110' : 'group-hover:scale-110'}`}
                  />
                </div>
              </div>

              {/* Hiro Burger Card */}
              <div id="hiro-burger" className="scroll-mt-20">
                <div onClick={openGloriaFoodMenu} className={`block relative h-75 rounded-2xl overflow-hidden shadow-2xl border-4 transition-all duration-700 cursor-pointer ${activeCard === 'hiro-burger' ? 'shadow-[0_0_60px_rgba(255,255,255,0.8)] border-white scale-[1.02] group' : 'border-white hover:shadow-[0_0_60px_rgba(255,255,255,0.8)] hover:border-white hover:scale-[1.02] group'}`}>
                  <Image
                    src="/hiro_card.png"
                    alt="Hiro Burger"
                    fill
                    className={`object-cover object-[50%_22%] transition-all duration-700 ${activeCard === 'hiro-burger' ? 'scale-110' : 'group-hover:scale-110'}`}
                  />
                </div>
              </div>
            </div>

            {/* Second Row - 2 Cards */}
            <div className="grid grid-cols-2 gap-6 mb-6">
              {/* Pizza Time Card */}
              <div id="pizza-time" className="scroll-mt-20">
                <div onClick={openGloriaFoodMenu} className={`block relative h-75 rounded-2xl overflow-hidden shadow-2xl border-4 transition-all duration-700 cursor-pointer ${activeCard === 'pizza-time' ? 'shadow-[0_0_60px_rgba(255,255,255,0.8)] border-white scale-[1.02] group' : 'border-white hover:shadow-[0_0_60px_rgba(255,255,255,0.8)] hover:border-white hover:scale-[1.02] group'}`}>
                  <Image
                    src="/pizza_card_1.png"
                    alt="Pizza Time"
                    fill
                    className={`object-cover object-[50%_28%] transition-all duration-700 ${activeCard === 'pizza-time' ? 'scale-110' : 'group-hover:scale-110'}`}
                  />
                </div>
              </div>

              {/* Los Tacos Card */}
              <div id="los-tacos" className="scroll-mt-20">
                <div onClick={openGloriaFoodMenu} className={`block relative h-75 rounded-2xl overflow-hidden shadow-2xl border-4 transition-all duration-700 cursor-pointer ${activeCard === 'los-tacos' ? 'shadow-[0_0_60px_rgba(255,255,255,0.8)] border-white scale-[1.02] group' : 'border-white hover:shadow-[0_0_60px_rgba(255,255,255,0.8)] hover:border-white hover:scale-[1.02] group'}`}>
                  <Image
                    src="/los_card.png"
                    alt="Los Tacos"
                    fill
                    className={`object-cover object-[50%_30%] transition-all duration-700 ${activeCard === 'los-tacos' ? 'scale-110' : 'group-hover:scale-110'}`}
                  />
                </div>
              </div>
            </div>

            {/* Third Row - 2 Cards */}
            <div className="grid grid-cols-2 gap-6 mb-6">
              {/* Bowlicious Card */}
              <div id="bowlicious" className="scroll-mt-20">
                <div onClick={openGloriaFoodMenu} className={`block relative h-75 rounded-2xl overflow-hidden shadow-2xl border-4 transition-all duration-700 cursor-pointer ${activeCard === 'bowlicious' ? 'shadow-[0_0_60px_rgba(255,255,255,0.8)] border-white scale-[1.02] group' : 'border-white hover:shadow-[0_0_60px_rgba(255,255,255,0.8)] hover:border-white hover:scale-[1.02] group'}`}>
                  <Image
                    src="/bowl_card_1.png"
                    alt="Bowlicious"
                    fill
                    className={`object-cover object-[50%_44%] transition-all duration-700 ${activeCard === 'bowlicious' ? 'scale-110' : 'group-hover:scale-110'}`}
                  />
                </div>
              </div>

              {/* Drinks Card */}
              <div id="drinks" className="scroll-mt-20">
                <div onClick={openGloriaFoodMenu} className="block relative h-75 rounded-2xl overflow-hidden shadow-2xl border-4 border-white group hover:shadow-[0_0_60px_rgba(255,255,255,0.8)] hover:border-white transition-all duration-700 hover:scale-[1.02] cursor-pointer">
                  <Image
                    src="/drinks.png"
                    alt="Drinks"
                    fill
                    className="object-cover object-center group-hover:scale-110 transition-all duration-700"
                  />
                </div>
              </div>
            </div>

            {/* Fourth Row - 1 Card Centered */}
            <div className="flex justify-center">
              <div id="desserts" className="scroll-mt-20 w-1/2">
                <div onClick={openGloriaFoodMenu} className="block relative h-75 rounded-2xl overflow-hidden shadow-2xl border-4 border-white group hover:shadow-[0_0_60px_rgba(255,255,255,0.8)] hover:border-white transition-all duration-700 hover:scale-[1.02] cursor-pointer">
                  <Image
                    src="/Desserts.png"
                    alt="Desserts"
                    fill
                    className="object-cover object-center group-hover:scale-110 transition-all duration-700"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Mobile/Tablet Stacked Layout - Rectangular Cards */}
          <div className="lg:hidden space-y-4">
            {/* Toshi Sushi Card */}
            <div id="toshi-sushi-mobile" className="scroll-mt-20">
              <div onClick={openGloriaFoodMenu} className={`block relative h-32 sm:h-36 rounded-xl overflow-hidden border-3 transition-all duration-300 cursor-pointer ${activeCard === 'toshi-sushi' ? 'shadow-[0_0_30px_rgba(255,255,255,0.6)] border-white scale-[1.02] group' : 'shadow-xl border-white active:scale-[0.98] group'}`}>
                <Image
                  src="/toshi_card_mob.png"
                  alt="Toshi Sushi & Asia Küche"
                  fill
                  className={`object-cover transition-transform duration-300 ${activeCard === 'toshi-sushi' ? 'scale-110' : ''}`}
                />
              </div>
            </div>

            {/* Hiro Burger Card */}
            <div id="hiro-burger-mobile" className="scroll-mt-20">
              <div onClick={openGloriaFoodMenu} className={`block relative h-32 sm:h-36 rounded-xl overflow-hidden border-3 transition-all duration-300 cursor-pointer ${activeCard === 'hiro-burger' ? 'shadow-[0_0_30px_rgba(255,255,255,0.6)] border-white scale-[1.02] group' : 'shadow-xl border-white active:scale-[0.98] group'}`}>
                <Image
                  src="/hiro_card_m_2.png"
                  alt="Hiro Burger"
                  fill
                  className={`object-cover transition-transform duration-300 ${activeCard === 'hiro-burger' ? 'scale-110' : ''}`}
                />
              </div>
            </div>

            {/* Pizza Time Card */}
            <div id="pizza-time-mobile" className="scroll-mt-20">
              <div onClick={openGloriaFoodMenu} className={`block relative h-32 sm:h-36 rounded-xl overflow-hidden border-3 transition-all duration-300 cursor-pointer ${activeCard === 'pizza-time' ? 'shadow-[0_0_30px_rgba(255,255,255,0.6)] border-white scale-[1.02] group' : 'shadow-xl border-white active:scale-[0.98] group'}`}>
                <Image
                  src="/pizza_card_mob.png"
                  alt="Pizza Time"
                  fill
                  className={`object-cover transition-transform duration-300 ${activeCard === 'pizza-time' ? 'scale-110' : ''}`}
                />
              </div>
            </div>

            {/* Los Tacos Card */}
            <div id="los-tacos-mobile" className="scroll-mt-20">
              <div onClick={openGloriaFoodMenu} className={`block relative h-32 sm:h-36 rounded-xl overflow-hidden border-3 transition-all duration-300 cursor-pointer ${activeCard === 'los-tacos' ? 'shadow-[0_0_30px_rgba(255,255,255,0.6)] border-white scale-[1.02] group' : 'shadow-xl border-white active:scale-[0.98] group'}`}>
                <Image
                  src="/los_card_mob.png"
                  alt="Los Tacos"
                  fill
                  className={`object-cover transition-transform duration-300 ${activeCard === 'los-tacos' ? 'scale-110' : ''}`}
                />
              </div>
            </div>

            {/* Bowlicious Card */}
            <div id="bowlicious-mobile" className="scroll-mt-20">
              <div onClick={openGloriaFoodMenu} className={`block relative h-32 sm:h-36 rounded-xl overflow-hidden border-3 transition-all duration-300 cursor-pointer ${activeCard === 'bowlicious' ? 'shadow-[0_0_30px_rgba(255,255,255,0.6)] border-white scale-[1.02] group' : 'shadow-xl border-white active:scale-[0.98] group'}`}>
                <Image
                  src="/bowl_card_mob.png"
                  alt="Bowlicious"
                  fill
                  className={`object-cover transition-transform duration-300 ${activeCard === 'bowlicious' ? 'scale-110' : ''}`}
                />
              </div>
            </div>

            {/* Drinks Card */}
            <div id="drinks-mobile" className="scroll-mt-20">
              <div onClick={openGloriaFoodMenu} className="block relative h-32 sm:h-36 rounded-xl overflow-hidden shadow-xl border-3 border-white group active:scale-[0.98] transition-all duration-300 cursor-pointer">
                <Image
                  src="/drinks.png"
                  alt="Drinks"
                  fill
                  className="object-cover object-[50%_35%]"
                />
              </div>
            </div>

            {/* Desserts Card */}
            <div id="desserts-mobile" className="scroll-mt-20">
              <div onClick={openGloriaFoodMenu} className="block relative h-32 sm:h-36 rounded-xl overflow-hidden shadow-xl border-3 border-white group active:scale-[0.98] transition-all duration-300 cursor-pointer">
                <Image
                  src="/Desserts.png"
                  alt="Desserts"
                  fill
                  className="object-cover object-[50%_35%]"
                />
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
                  <button onClick={openGloriaFoodMenu} className="text-gray-400 hover:text-[#CC0000] transition-colors flex items-center gap-2 group">
                    <span className="w-1.5 h-1.5 bg-[#CC0000] rounded-full opacity-0 group-hover:opacity-100 transition-opacity"></span>
                    Toshi Sushi & Asia Kuche
                  </button>
                </li>
                <li>
                  <button onClick={openGloriaFoodMenu} className="text-gray-400 hover:text-[#CC0000] transition-colors flex items-center gap-2 group">
                    <span className="w-1.5 h-1.5 bg-[#CC0000] rounded-full opacity-0 group-hover:opacity-100 transition-opacity"></span>
                    Hiro Burger
                  </button>
                </li>
                <li>
                  <button onClick={openGloriaFoodMenu} className="text-gray-400 hover:text-[#CC0000] transition-colors flex items-center gap-2 group">
                    <span className="w-1.5 h-1.5 bg-[#CC0000] rounded-full opacity-0 group-hover:opacity-100 transition-opacity"></span>
                    Pizza Time
                  </button>
                </li>
                <li>
                  <button onClick={openGloriaFoodMenu} className="text-gray-400 hover:text-[#CC0000] transition-colors flex items-center gap-2 group">
                    <span className="w-1.5 h-1.5 bg-[#CC0000] rounded-full opacity-0 group-hover:opacity-100 transition-opacity"></span>
                    Los Tacos
                  </button>
                </li>
                <li>
                  <button onClick={openGloriaFoodMenu} className="text-gray-400 hover:text-[#CC0000] transition-colors flex items-center gap-2 group">
                    <span className="w-1.5 h-1.5 bg-[#CC0000] rounded-full opacity-0 group-hover:opacity-100 transition-opacity"></span>
                    Bowlicious
                  </button>
                </li>
              </ul>
            </div>

            {/* Contact Info Column */}
            <div>
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
                  <a href="tel:+4930123456789" className="text-gray-400 hover:text-[#CC0000] transition-colors">
                    +49 30 123 456 789
                  </a>
                </li>
                <li className="flex items-center gap-3">
                  <svg className="w-5 h-5 text-[#CC0000] flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                  <a href="mailto:info@hungryclub.de" className="text-gray-400 hover:text-[#CC0000] transition-colors">
                    info@hungryclub.de
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
                    <button onClick={openGloriaFoodMenu} className="text-gray-400 hover:text-[#CC0000] transition-colors text-xs block">
                      Toshi Sushi
                    </button>
                  </li>
                  <li>
                    <button onClick={openGloriaFoodMenu} className="text-gray-400 hover:text-[#CC0000] transition-colors text-xs block">
                      Hiro Burger
                    </button>
                  </li>
                  <li>
                    <button onClick={openGloriaFoodMenu} className="text-gray-400 hover:text-[#CC0000] transition-colors text-xs block">
                      Pizza Time
                    </button>
                  </li>
                  <li>
                    <button onClick={openGloriaFoodMenu} className="text-gray-400 hover:text-[#CC0000] transition-colors text-xs block">
                      Los Tacos
                    </button>
                  </li>
                  <li>
                    <button onClick={openGloriaFoodMenu} className="text-gray-400 hover:text-[#CC0000] transition-colors text-xs block">
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
                    <a href="tel:+4930123456789" className="text-gray-400 hover:text-[#CC0000] transition-colors text-[10px] leading-snug">
                      +49 30 123 456 789
                    </a>
                  </li>
                  <li className="flex items-start gap-1.5">
                    <svg className="w-3.5 h-3.5 text-[#CC0000] mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                    <a href="mailto:info@hungryclub.de" className="text-gray-400 hover:text-[#CC0000] transition-colors text-[10px] leading-snug break-all">
                      info@hungryclub.de
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
              <div className="flex items-center gap-6">
                <a href="#" className="text-gray-500 hover:text-[#CC0000] text-sm transition-colors">
                  Datenschutzrichtlinie
                </a>
                <a href="#" className="text-gray-500 hover:text-[#CC0000] text-sm transition-colors">
                  Nutzungsbedingungen
                </a>
                <a href="#" className="text-gray-500 hover:text-[#CC0000] text-sm transition-colors">
                  Impressum
                </a>
              </div>

              {/* Payment Methods */}
              <div className="flex items-center gap-3">
                <span className="text-gray-500 text-sm">Wir akzeptieren:</span>
                <div className="flex items-center gap-2">
                  <div className="bg-white/10 rounded px-2 py-1">
                    <span className="text-xs font-bold text-gray-400">VISA</span>
                  </div>
                  <div className="bg-white/10 rounded px-2 py-1">
                    <span className="text-xs font-bold text-gray-400">MC</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Decorative glow effect */}
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-96 h-32 bg-[#CC0000]/20 blur-3xl"></div>
      </footer>

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
