'use client'

import Image from "next/image";
import { useState } from 'react';

export default function Home() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50">
        <div className="relative">
          {/* Main navbar */}
          <div className="bg-white h-16 shadow-lg border-b-2 border-gray-100">
            <div className="max-w-7xl mx-auto px-8 h-full">
              <div className="flex items-center h-full">
                {/* Logo on the left */}
                <div className="flex items-center h-full py-0.5 w-40">
                  <div className="group bg-white rounded-xl shadow-lg border-4 border-[#CC0000] h-full aspect-square overflow-hidden transition-all duration-300 hover:shadow-[0_0_20px_rgba(204,0,0,0.6)] hover:border-[#FF2900] hover:scale-105 cursor-pointer p-1">
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

                {/* Navigation links centered */}
                <div className="flex items-center justify-center gap-1 flex-1">
                  <a href="#toshi-sushi" className="group relative px-6 py-2.5 text-gray-700 hover:text-[#FF2900] transition-all font-semibold whitespace-nowrap rounded-lg hover:bg-red-50 hidden lg:block">
                    <span className="flex items-center gap-2">
                      <span className="relative w-12 h-12 group-hover:scale-110 transition-transform bg-white rounded-full p-1">
                        <Image
                          src="/sushi_nav.png"
                          alt="Sushi"
                          fill
                          className="object-contain"
                        />
                      </span>
                    </span>
                    <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#FF2900] group-hover:w-full transition-all duration-300"></span>
                    {/* Tooltip */}
                    <span className="absolute top-full mt-2 left-1/2 -translate-x-1/2 bg-[#CC0000] text-white px-3 py-2 rounded-lg text-sm font-bold whitespace-nowrap opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 shadow-lg border-2 border-white z-50">
                      TOSHI SUSHI & ASIA KÜCHE
                      <span className="absolute -top-1 left-1/2 -translate-x-1/2 w-2 h-2 bg-[#CC0000] rotate-45 border-t-2 border-l-2 border-white"></span>
                    </span>
                  </a>

                  <a href="#hiro-burger" className="group relative px-6 py-2.5 text-gray-700 hover:text-[#FF2900] transition-all font-semibold whitespace-nowrap rounded-lg hover:bg-red-50 hidden lg:block">
                    <span className="flex items-center gap-2">
                      <span className="relative w-12 h-12 group-hover:scale-110 transition-transform bg-white rounded-full p-1">
                        <Image
                          src="/burger_nav.png"
                          alt="Burger"
                          fill
                          className="object-contain"
                        />
                      </span>
                    </span>
                    <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#FF2900] group-hover:w-full transition-all duration-300"></span>
                    {/* Tooltip */}
                    <span className="absolute top-full mt-2 left-1/2 -translate-x-1/2 bg-[#CC0000] text-white px-3 py-2 rounded-lg text-sm font-bold whitespace-nowrap opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 shadow-lg border-2 border-white z-50">
                      HIRO BURGER
                      <span className="absolute -top-1 left-1/2 -translate-x-1/2 w-2 h-2 bg-[#CC0000] rotate-45 border-t-2 border-l-2 border-white"></span>
                    </span>
                  </a>

                  <a href="#pizza-time" className="group relative px-6 py-2.5 text-gray-700 hover:text-[#FF2900] transition-all font-semibold whitespace-nowrap rounded-lg hover:bg-red-50 hidden lg:block">
                    <span className="flex items-center gap-2">
                      <span className="relative w-12 h-12 group-hover:scale-110 transition-transform bg-white rounded-full p-1">
                        <Image
                          src="/pizza_nav.png"
                          alt="Pizza"
                          fill
                          className="object-contain"
                        />
                      </span>
                    </span>
                    <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#FF2900] group-hover:w-full transition-all duration-300"></span>
                    {/* Tooltip */}
                    <span className="absolute top-full mt-2 left-1/2 -translate-x-1/2 bg-[#CC0000] text-white px-3 py-2 rounded-lg text-sm font-bold whitespace-nowrap opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 shadow-lg border-2 border-white z-50">
                      PIZZA TIME
                      <span className="absolute -top-1 left-1/2 -translate-x-1/2 w-2 h-2 bg-[#CC0000] rotate-45 border-t-2 border-l-2 border-white"></span>
                    </span>
                  </a>

                  <a href="#los-tacos" className="group relative px-6 py-2.5 text-gray-700 hover:text-[#FF2900] transition-all font-semibold whitespace-nowrap rounded-lg hover:bg-red-50 hidden lg:block">
                    <span className="flex items-center gap-2">
                      <span className="relative w-12 h-12 group-hover:scale-110 transition-transform bg-white rounded-full p-1">
                        <Image
                          src="/taco_nav.png"
                          alt="Taco"
                          fill
                          className="object-contain"
                        />
                      </span>
                    </span>
                    <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#FF2900] group-hover:w-full transition-all duration-300"></span>
                    {/* Tooltip */}
                    <span className="absolute top-full mt-2 left-1/2 -translate-x-1/2 bg-[#CC0000] text-white px-3 py-2 rounded-lg text-sm font-bold whitespace-nowrap opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 shadow-lg border-2 border-white z-50">
                      LOS TACOS
                      <span className="absolute -top-1 left-1/2 -translate-x-1/2 w-2 h-2 bg-[#CC0000] rotate-45 border-t-2 border-l-2 border-white"></span>
                    </span>
                  </a>

                  <a href="#bowlicious" className="group relative px-6 py-2.5 text-gray-700 hover:text-[#FF2900] transition-all font-semibold whitespace-nowrap rounded-lg hover:bg-red-50 hidden lg:block">
                    <span className="flex items-center gap-2">
                      <span className="relative w-12 h-12 group-hover:scale-110 transition-transform bg-white rounded-full p-1">
                        <Image
                          src="/bowl_nav.png"
                          alt="Bowl"
                          fill
                          className="object-contain"
                        />
                      </span>
                    </span>
                    <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#FF2900] group-hover:w-full transition-all duration-300"></span>
                    {/* Tooltip */}
                    <span className="absolute top-full mt-2 left-1/2 -translate-x-1/2 bg-[#CC0000] text-white px-3 py-2 rounded-lg text-sm font-bold whitespace-nowrap opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 shadow-lg border-2 border-white z-50">
                      BOWLICIOUS
                      <span className="absolute -top-1 left-1/2 -translate-x-1/2 w-2 h-2 bg-[#CC0000] rotate-45 border-t-2 border-l-2 border-white"></span>
                    </span>
                  </a>
                </div>

                {/* Action Buttons */}
                <div className="hidden lg:flex items-center justify-end gap-3 w-auto">
                  <a href="#about" className="px-6 py-2.5 bg-[#CC0000] text-white font-bold rounded-lg hover:bg-white hover:text-[#CC0000] transition-all duration-300 shadow-md hover:shadow-lg border-2 border-[#CC0000]">
                    About Us
                  </a>
                  <a href="/cart" className="p-3 bg-white text-[#CC0000] font-bold rounded-lg hover:bg-[#CC0000] hover:text-white transition-all duration-300 shadow-md hover:shadow-lg border-2 border-[#CC0000] flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z" />
                    </svg>
                  </a>
                </div>

                {/* Mobile Menu Button */}
                <button
                  onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                  className="lg:hidden p-2 text-gray-700 hover:text-[#FF2900] transition-colors"
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

          {/* Mobile Menu Dropdown */}
          {isMobileMenuOpen && (
            <div className="lg:hidden absolute top-full left-0 right-0 bg-white shadow-2xl border-t-2 border-gray-100 z-40 max-h-[80vh] overflow-y-auto">
              <div className="max-w-7xl mx-auto px-4 py-4">
                <div className="space-y-3">
                  {/* Restaurant Links */}
                  <a
                    href="#toshi-sushi-mobile"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="flex items-center gap-3 p-3 rounded-lg hover:bg-red-50 transition-colors group"
                  >
                    <div className="relative w-10 h-10 bg-white rounded-lg border-2 border-[#CC0000] p-1 shadow-md group-hover:scale-110 transition-transform flex-shrink-0">
                      <Image
                        src="/sushi_nav.png"
                        alt="Sushi"
                        fill
                        className="object-contain"
                      />
                    </div>
                    <span className="font-bold text-sm text-gray-700 group-hover:text-[#FF2900]">
                      TOSHI SUSHI & ASIA KÜCHE
                    </span>
                  </a>

                  <a
                    href="#hiro-burger-mobile"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="flex items-center gap-3 p-3 rounded-lg hover:bg-red-50 transition-colors group"
                  >
                    <div className="relative w-10 h-10 bg-white rounded-lg border-2 border-[#CC0000] p-1 shadow-md group-hover:scale-110 transition-transform flex-shrink-0">
                      <Image
                        src="/burger_nav.png"
                        alt="Burger"
                        fill
                        className="object-contain"
                      />
                    </div>
                    <span className="font-bold text-sm text-gray-700 group-hover:text-[#FF2900]">
                      HIRO BURGER
                    </span>
                  </a>

                  <a
                    href="#pizza-time-mobile"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="flex items-center gap-3 p-3 rounded-lg hover:bg-red-50 transition-colors group"
                  >
                    <div className="relative w-10 h-10 bg-white rounded-lg border-2 border-[#CC0000] p-1 shadow-md group-hover:scale-110 transition-transform flex-shrink-0">
                      <Image
                        src="/pizza_nav.png"
                        alt="Pizza"
                        fill
                        className="object-contain"
                      />
                    </div>
                    <span className="font-bold text-sm text-gray-700 group-hover:text-[#FF2900]">
                      PIZZA TIME
                    </span>
                  </a>

                  <a
                    href="#los-tacos-mobile"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="flex items-center gap-3 p-3 rounded-lg hover:bg-red-50 transition-colors group"
                  >
                    <div className="relative w-10 h-10 bg-white rounded-lg border-2 border-[#CC0000] p-1 shadow-md group-hover:scale-110 transition-transform flex-shrink-0">
                      <Image
                        src="/taco_nav.png"
                        alt="Taco"
                        fill
                        className="object-contain"
                      />
                    </div>
                    <span className="font-bold text-sm text-gray-700 group-hover:text-[#FF2900]">
                      LOS TACOS
                    </span>
                  </a>

                  <a
                    href="#bowlicious-mobile"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="flex items-center gap-3 p-3 rounded-lg hover:bg-red-50 transition-colors group"
                  >
                    <div className="relative w-10 h-10 bg-white rounded-lg border-2 border-[#CC0000] p-1 shadow-md group-hover:scale-110 transition-transform flex-shrink-0">
                      <Image
                        src="/bowl_nav.png"
                        alt="Bowl"
                        fill
                        className="object-contain"
                      />
                    </div>
                    <span className="font-bold text-sm text-gray-700 group-hover:text-[#FF2900]">
                      BOWLICIOUS
                    </span>
                  </a>

                  {/* Divider */}
                  <div className="border-t border-gray-200 my-2"></div>

                  {/* Action Buttons */}
                  <div className="flex flex-col gap-2 pb-2">
                    <a
                      href="#about"
                      onClick={() => setIsMobileMenuOpen(false)}
                      className="w-full py-2.5 bg-[#CC0000] text-white font-bold rounded-lg hover:bg-[#FF2900] transition-colors text-center shadow-md text-sm"
                    >
                      About Us
                    </a>
                    <a
                      href="/cart"
                      onClick={() => setIsMobileMenuOpen(false)}
                      className="w-full py-2.5 bg-white text-[#CC0000] font-bold rounded-lg border-2 border-[#CC0000] hover:bg-[#CC0000] hover:text-white transition-colors text-center shadow-md flex items-center justify-center gap-2 text-sm"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z" />
                      </svg>
                      View Cart
                    </a>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden pt-16">
        {/* Background Image with Overlay */}
        <div className="absolute inset-0 z-0">
          <Image
            src="/food-4k-bg.png"
            alt="Delicious Food Background"
            fill
            className="object-cover"
            priority
          />
          {/* Dark overlay for better text readability */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/50 to-black/70"></div>
        </div>

        {/* Hero Content */}
        <div className="relative z-10 text-center px-6">
          {/* Main Heading */}
          <h1 className="font-[family-name:var(--font-archivo-black)] text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl text-white leading-tight tracking-tight">
            Welcome to{" "}
            <span className="text-[#CC0000] drop-shadow-2xl">
              Hungry Club
            </span>
          </h1>
        </div>
      </section>

      {/* Restaurant Cards Section */}
      <section className="relative py-20" style={{ backgroundImage: 'url(/card_bg.png)', backgroundRepeat: 'repeat', backgroundSize: '400px' }}>
        <div className="relative z-10 max-w-7xl mx-auto px-8">
          {/* Desktop Grid Layout (2-2-1) */}
          <div className="hidden lg:block">
            {/* First Row - 2 Cards */}
            <div className="grid grid-cols-2 gap-6 mb-6">
              {/* Toshi Sushi Card */}
              <div id="toshi-sushi" className="scroll-mt-20">
                <a href="/TOSHI_SUSHI" className="block relative h-72 rounded-2xl overflow-hidden shadow-2xl border-4 border-[#CC0000] group hover:shadow-[0_0_60px_rgba(204,0,0,0.8)] hover:border-[#FF2900] transition-all duration-700 hover:scale-[1.02] cursor-pointer">
                  <Image
                    src="/TOSHI SUSHI & ASIA KÜCHE.jpeg"
                    alt="Toshi Sushi & Asia Küche"
                    fill
                    className="object-cover group-hover:scale-110 transition-all duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent group-hover:from-[#CC0000]/90 transition-all duration-700"></div>
                  <div className="absolute inset-0 p-6 flex flex-col justify-end">
                    <div className="flex items-center gap-4">
                      <div className="relative w-20 h-20 flex-shrink-0 bg-white rounded-2xl border-3 border-[#CC0000] p-2 group-hover:scale-110 transition-all duration-700 shadow-xl">
                        <Image
                          src="/sushi_card.png"
                          alt="Toshi Sushi Logo"
                          fill
                          className="object-contain"
                        />
                      </div>
                      <h2 className="font-[family-name:var(--font-archivo-black)] text-2xl xl:text-3xl text-white tracking-tight drop-shadow-2xl group-hover:text-[#FFE5E5] transition-all duration-700">
                        TOSHI SUSHI &<br />ASIA KÜCHE
                      </h2>
                    </div>
                  </div>
                </a>
              </div>

              {/* Hiro Burger Card */}
              <div id="hiro-burger" className="scroll-mt-20">
                <a href="/HIRO_BURGER" className="block relative h-72 rounded-2xl overflow-hidden shadow-2xl border-4 border-[#CC0000] group hover:shadow-[0_0_60px_rgba(204,0,0,0.8)] hover:border-[#FF2900] transition-all duration-700 hover:scale-[1.02] cursor-pointer">
                  <Image
                    src="/HIRO BURGER.png"
                    alt="Hiro Burger"
                    fill
                    className="object-cover object-[50%_60%] group-hover:scale-110 transition-all duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent group-hover:from-[#CC0000]/90 transition-all duration-700"></div>
                  <div className="absolute inset-0 p-6 flex flex-col justify-end">
                    <div className="flex items-center gap-4">
                      <div className="relative w-20 h-20 flex-shrink-0 bg-white rounded-2xl border-3 border-[#CC0000] p-2 group-hover:scale-110 transition-all duration-700 shadow-xl">
                        <Image
                          src="/burger_card.png"
                          alt="Hiro Burger Logo"
                          fill
                          className="object-contain"
                        />
                      </div>
                      <h2 className="font-[family-name:var(--font-archivo-black)] text-2xl xl:text-3xl text-white tracking-tight drop-shadow-2xl group-hover:text-[#FFE5E5] transition-all duration-700">
                        HIRO BURGER
                      </h2>
                    </div>
                  </div>
                </a>
              </div>
            </div>

            {/* Second Row - 2 Cards */}
            <div className="grid grid-cols-2 gap-6 mb-6">
              {/* Pizza Time Card */}
              <div id="pizza-time" className="scroll-mt-20">
                <a href="/PIZZA_TIME" className="block relative h-72 rounded-2xl overflow-hidden shadow-2xl border-4 border-[#CC0000] group hover:shadow-[0_0_60px_rgba(204,0,0,0.8)] hover:border-[#FF2900] transition-all duration-700 hover:scale-[1.02] cursor-pointer">
                  <Image
                    src="/PIZZA TIME.jpeg"
                    alt="Pizza Time"
                    fill
                    className="object-cover group-hover:scale-110 transition-all duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent group-hover:from-[#CC0000]/90 transition-all duration-700"></div>
                  <div className="absolute inset-0 p-6 flex flex-col justify-end">
                    <div className="flex items-center gap-4">
                      <div className="relative w-20 h-20 flex-shrink-0 bg-white rounded-2xl border-3 border-[#CC0000] p-2 group-hover:scale-110 transition-all duration-700 shadow-xl">
                        <Image
                          src="/pizza_card.png"
                          alt="Pizza Time Logo"
                          fill
                          className="object-contain"
                        />
                      </div>
                      <h2 className="font-[family-name:var(--font-archivo-black)] text-2xl xl:text-3xl text-white tracking-tight drop-shadow-2xl group-hover:text-[#FFE5E5] transition-all duration-700">
                        PIZZA TIME
                      </h2>
                    </div>
                  </div>
                </a>
              </div>

              {/* Los Tacos Card */}
              <div id="los-tacos" className="scroll-mt-20">
                <a href="/LOS_TACOS" className="block relative h-72 rounded-2xl overflow-hidden shadow-2xl border-4 border-[#CC0000] group hover:shadow-[0_0_60px_rgba(204,0,0,0.8)] hover:border-[#FF2900] transition-all duration-700 hover:scale-[1.02] cursor-pointer">
                  <Image
                    src="/LOS TACOS.jpeg"
                    alt="Los Tacos"
                    fill
                    className="object-cover group-hover:scale-110 transition-all duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent group-hover:from-[#CC0000]/90 transition-all duration-700"></div>
                  <div className="absolute inset-0 p-6 flex flex-col justify-end">
                    <div className="flex items-center gap-4">
                      <div className="relative w-20 h-20 flex-shrink-0 bg-white rounded-2xl border-3 border-[#CC0000] p-2 group-hover:scale-110 transition-all duration-700 shadow-xl">
                        <Image
                          src="/taco_card.png"
                          alt="Los Tacos Logo"
                          fill
                          className="object-contain"
                        />
                      </div>
                      <h2 className="font-[family-name:var(--font-archivo-black)] text-2xl xl:text-3xl text-white tracking-tight drop-shadow-2xl group-hover:text-[#FFE5E5] transition-all duration-700">
                        LOS TACOS
                      </h2>
                    </div>
                  </div>
                </a>
              </div>
            </div>

            {/* Third Row - 1 Card Centered */}
            <div className="flex justify-center">
              <div id="bowlicious" className="scroll-mt-20 w-1/2">
                <a href="/BOWLICIOUS" className="block relative h-72 rounded-2xl overflow-hidden shadow-2xl border-4 border-[#CC0000] group hover:shadow-[0_0_60px_rgba(204,0,0,0.8)] hover:border-[#FF2900] transition-all duration-700 hover:scale-[1.02] cursor-pointer">
                  <Image
                    src="/BOWLICIOUS.jpeg"
                    alt="Bowlicious"
                    fill
                    className="object-cover group-hover:scale-110 transition-all duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent group-hover:from-[#CC0000]/90 transition-all duration-700"></div>
                  <div className="absolute inset-0 p-6 flex flex-col justify-end">
                    <div className="flex items-center gap-4">
                      <div className="relative w-20 h-20 flex-shrink-0 bg-white rounded-2xl border-3 border-[#CC0000] p-2 group-hover:scale-110 transition-all duration-700 shadow-xl">
                        <Image
                          src="/bowl_card.png"
                          alt="Bowlicious Logo"
                          fill
                          className="object-contain"
                        />
                      </div>
                      <h2 className="font-[family-name:var(--font-archivo-black)] text-2xl xl:text-3xl text-white tracking-tight drop-shadow-2xl group-hover:text-[#FFE5E5] transition-all duration-700">
                        BOWLICIOUS
                      </h2>
                    </div>
                  </div>
                </a>
              </div>
            </div>
          </div>

          {/* Mobile/Tablet Stacked Layout - Rectangular Cards */}
          <div className="lg:hidden space-y-4">
            {/* Toshi Sushi Card */}
            <div id="toshi-sushi-mobile" className="scroll-mt-20">
              <a href="/TOSHI_SUSHI" className="block relative h-32 sm:h-36 rounded-xl overflow-hidden shadow-xl border-3 border-[#CC0000] group active:scale-[0.98] transition-all duration-300 cursor-pointer">
                <Image
                  src="/TOSHI SUSHI & ASIA KÜCHE.jpeg"
                  alt="Toshi Sushi & Asia Küche"
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/60 to-black/40"></div>
                <div className="absolute inset-0 p-4 flex items-center">
                  <div className="relative w-14 h-14 sm:w-16 sm:h-16 flex-shrink-0 bg-white rounded-xl border-2 border-[#CC0000] p-1.5 shadow-lg mr-4">
                    <Image
                      src="/sushi_card.png"
                      alt="Toshi Sushi Logo"
                      fill
                      className="object-contain"
                    />
                  </div>
                  <h2 className="font-[family-name:var(--font-archivo-black)] text-lg sm:text-xl text-white tracking-tight drop-shadow-lg">
                    TOSHI SUSHI &<br />ASIA KÜCHE
                  </h2>
                </div>
              </a>
            </div>

            {/* Hiro Burger Card */}
            <div id="hiro-burger-mobile" className="scroll-mt-20">
              <a href="/HIRO_BURGER" className="block relative h-32 sm:h-36 rounded-xl overflow-hidden shadow-xl border-3 border-[#CC0000] group active:scale-[0.98] transition-all duration-300 cursor-pointer">
                <Image
                  src="/HIRO BURGER.png"
                  alt="Hiro Burger"
                  fill
                  className="object-cover object-[50%_60%]"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/60 to-black/40"></div>
                <div className="absolute inset-0 p-4 flex items-center">
                  <div className="relative w-14 h-14 sm:w-16 sm:h-16 flex-shrink-0 bg-white rounded-xl border-2 border-[#CC0000] p-1.5 shadow-lg mr-4">
                    <Image
                      src="/burger_card.png"
                      alt="Hiro Burger Logo"
                      fill
                      className="object-contain"
                    />
                  </div>
                  <h2 className="font-[family-name:var(--font-archivo-black)] text-lg sm:text-xl text-white tracking-tight drop-shadow-lg">
                    HIRO BURGER
                  </h2>
                </div>
              </a>
            </div>

            {/* Pizza Time Card */}
            <div id="pizza-time-mobile" className="scroll-mt-20">
              <a href="/PIZZA_TIME" className="block relative h-32 sm:h-36 rounded-xl overflow-hidden shadow-xl border-3 border-[#CC0000] group active:scale-[0.98] transition-all duration-300 cursor-pointer">
                <Image
                  src="/PIZZA TIME.jpeg"
                  alt="Pizza Time"
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/60 to-black/40"></div>
                <div className="absolute inset-0 p-4 flex items-center">
                  <div className="relative w-14 h-14 sm:w-16 sm:h-16 flex-shrink-0 bg-white rounded-xl border-2 border-[#CC0000] p-1.5 shadow-lg mr-4">
                    <Image
                      src="/pizza_card.png"
                      alt="Pizza Time Logo"
                      fill
                      className="object-contain"
                    />
                  </div>
                  <h2 className="font-[family-name:var(--font-archivo-black)] text-lg sm:text-xl text-white tracking-tight drop-shadow-lg">
                    PIZZA TIME
                  </h2>
                </div>
              </a>
            </div>

            {/* Los Tacos Card */}
            <div id="los-tacos-mobile" className="scroll-mt-20">
              <a href="/LOS_TACOS" className="block relative h-32 sm:h-36 rounded-xl overflow-hidden shadow-xl border-3 border-[#CC0000] group active:scale-[0.98] transition-all duration-300 cursor-pointer">
                <Image
                  src="/LOS TACOS.jpeg"
                  alt="Los Tacos"
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/60 to-black/40"></div>
                <div className="absolute inset-0 p-4 flex items-center">
                  <div className="relative w-14 h-14 sm:w-16 sm:h-16 flex-shrink-0 bg-white rounded-xl border-2 border-[#CC0000] p-1.5 shadow-lg mr-4">
                    <Image
                      src="/taco_card.png"
                      alt="Los Tacos Logo"
                      fill
                      className="object-contain"
                    />
                  </div>
                  <h2 className="font-[family-name:var(--font-archivo-black)] text-lg sm:text-xl text-white tracking-tight drop-shadow-lg">
                    LOS TACOS
                  </h2>
                </div>
              </a>
            </div>

            {/* Bowlicious Card */}
            <div id="bowlicious-mobile" className="scroll-mt-20">
              <a href="/BOWLICIOUS" className="block relative h-32 sm:h-36 rounded-xl overflow-hidden shadow-xl border-3 border-[#CC0000] group active:scale-[0.98] transition-all duration-300 cursor-pointer">
                <Image
                  src="/BOWLICIOUS.jpeg"
                  alt="Bowlicious"
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/60 to-black/40"></div>
                <div className="absolute inset-0 p-4 flex items-center">
                  <div className="relative w-14 h-14 sm:w-16 sm:h-16 flex-shrink-0 bg-white rounded-xl border-2 border-[#CC0000] p-1.5 shadow-lg mr-4">
                    <Image
                      src="/bowl_card.png"
                      alt="Bowlicious Logo"
                      fill
                      className="object-contain"
                    />
                  </div>
                  <h2 className="font-[family-name:var(--font-archivo-black)] text-lg sm:text-xl text-white tracking-tight drop-shadow-lg">
                    BOWLICIOUS
                  </h2>
                </div>
              </a>
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

        <div className="relative z-10 max-w-7xl mx-auto px-8 py-16">
          {/* Main Footer Content */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">

            {/* Brand Column */}
            <div className="lg:col-span-1">
              <div className="flex items-center gap-4 mb-6">
                <div className="relative w-16 h-16 bg-white rounded-xl border-4 border-[#CC0000] p-1 shadow-lg">
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
                Your ultimate destination for diverse culinary experiences. From sushi to burgers, pizza to tacos - we bring the world&apos;s flavors to your doorstep.
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
                Our Restaurants
                <span className="absolute -bottom-2 left-0 w-12 h-0.5 bg-[#CC0000]"></span>
              </h4>
              <ul className="space-y-3">
                <li>
                  <a href="/TOSHI_SUSHI" className="text-gray-400 hover:text-[#CC0000] transition-colors flex items-center gap-2 group">
                    <span className="w-1.5 h-1.5 bg-[#CC0000] rounded-full opacity-0 group-hover:opacity-100 transition-opacity"></span>
                    Toshi Sushi & Asia Kuche
                  </a>
                </li>
                <li>
                  <a href="/HIRO_BURGER" className="text-gray-400 hover:text-[#CC0000] transition-colors flex items-center gap-2 group">
                    <span className="w-1.5 h-1.5 bg-[#CC0000] rounded-full opacity-0 group-hover:opacity-100 transition-opacity"></span>
                    Hiro Burger
                  </a>
                </li>
                <li>
                  <a href="/PIZZA_TIME" className="text-gray-400 hover:text-[#CC0000] transition-colors flex items-center gap-2 group">
                    <span className="w-1.5 h-1.5 bg-[#CC0000] rounded-full opacity-0 group-hover:opacity-100 transition-opacity"></span>
                    Pizza Time
                  </a>
                </li>
                <li>
                  <a href="/LOS_TACOS" className="text-gray-400 hover:text-[#CC0000] transition-colors flex items-center gap-2 group">
                    <span className="w-1.5 h-1.5 bg-[#CC0000] rounded-full opacity-0 group-hover:opacity-100 transition-opacity"></span>
                    Los Tacos
                  </a>
                </li>
                <li>
                  <a href="/BOWLICIOUS" className="text-gray-400 hover:text-[#CC0000] transition-colors flex items-center gap-2 group">
                    <span className="w-1.5 h-1.5 bg-[#CC0000] rounded-full opacity-0 group-hover:opacity-100 transition-opacity"></span>
                    Bowlicious
                  </a>
                </li>
              </ul>
            </div>

            {/* Contact Info Column */}
            <div>
              <h4 className="font-bold text-lg mb-6 text-white relative inline-block">
                Contact Us
                <span className="absolute -bottom-2 left-0 w-12 h-0.5 bg-[#CC0000]"></span>
              </h4>
              <ul className="space-y-4">
                <li className="flex items-start gap-3">
                  <svg className="w-5 h-5 text-[#CC0000] mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  <span className="text-gray-400">
                    Musterstraße 123<br />
                    12345 Berlin, Germany
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
                Opening Hours
                <span className="absolute -bottom-2 left-0 w-12 h-0.5 bg-[#CC0000]"></span>
              </h4>
              <ul className="space-y-3">
                <li className="flex justify-between text-gray-400">
                  <span>Monday - Thursday</span>
                  <span className="text-white">11:00 - 22:00</span>
                </li>
                <li className="flex justify-between text-gray-400">
                  <span>Friday - Saturday</span>
                  <span className="text-white">11:00 - 23:00</span>
                </li>
                <li className="flex justify-between text-gray-400">
                  <span>Sunday</span>
                  <span className="text-white">12:00 - 21:00</span>
                </li>
              </ul>
              {/* Order Now Button */}
              <a href="/cart" className="mt-6 inline-flex items-center gap-2 bg-[#CC0000] hover:bg-[#FF2900] text-white font-bold py-3 px-6 rounded-full transition-all duration-300 shadow-lg hover:shadow-[0_0_20px_rgba(204,0,0,0.5)] hover:scale-105">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
                Order Now
              </a>
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
                  Privacy Policy
                </a>
                <a href="#" className="text-gray-500 hover:text-[#CC0000] text-sm transition-colors">
                  Terms of Service
                </a>
                <a href="#" className="text-gray-500 hover:text-[#CC0000] text-sm transition-colors">
                  Impressum
                </a>
              </div>

              {/* Payment Methods */}
              <div className="flex items-center gap-3">
                <span className="text-gray-500 text-sm">We accept:</span>
                <div className="flex items-center gap-2">
                  <div className="bg-white/10 rounded px-2 py-1">
                    <span className="text-xs font-bold text-gray-400">VISA</span>
                  </div>
                  <div className="bg-white/10 rounded px-2 py-1">
                    <span className="text-xs font-bold text-gray-400">MC</span>
                  </div>
                  <div className="bg-white/10 rounded px-2 py-1">
                    <span className="text-xs font-bold text-gray-400">PayPal</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Decorative glow effect */}
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-96 h-32 bg-[#CC0000]/20 blur-3xl"></div>
      </footer>
    </div>
  );
}
