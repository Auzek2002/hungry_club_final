import Image from "next/image";

export default function Home() {
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

                {/* About Us Button */}
                <div className="hidden lg:flex items-center justify-end w-40">
                  <a href="#about" className="px-6 py-2.5 bg-[#CC0000] text-white font-bold rounded-lg hover:bg-white hover:text-[#CC0000] transition-all duration-300 shadow-md hover:shadow-lg border-2 border-[#CC0000]">
                    About Us
                  </a>
                </div>

                {/* Mobile Menu Button */}
                <button className="lg:hidden p-2 text-gray-700 hover:text-[#FF2900] transition-colors">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                  </svg>
                </button>
              </div>
            </div>
          </div>
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
          <h1 className="font-[family-name:var(--font-archivo-black)] text-8xl md:text-7xl lg:text-8xl text-white leading-tight tracking-tight">
            Welcome to{" "}
            <span className="text-[#FF2900] drop-shadow-2xl">
              Hungry Club
            </span>
          </h1>
        </div>
      </section>

      {/* Restaurant Cards Section */}
      <section className="relative py-20" style={{ backgroundImage: 'url(/card_bg.png)', backgroundRepeat: 'repeat', backgroundSize: '400px' }}>
        <div className="relative z-10 max-w-7xl mx-auto px-8">
          {/* Toshi Sushi Card */}
          <div id="toshi-sushi" className="mb-16 scroll-mt-20">
            <div className="relative h-96 rounded-2xl overflow-hidden shadow-2xl border-4 border-[#CC0000] group hover:shadow-[0_0_60px_rgba(204,0,0,0.8)] hover:border-[#FF2900] transition-all duration-700 hover:scale-[1.02] cursor-pointer">
              <Image
                src="/TOSHI SUSHI & ASIA KÜCHE.avif"
                alt="Toshi Sushi & Asia Küche"
                fill
                className="object-cover group-hover:scale-125 group-hover:rotate-2 transition-all duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-transparent group-hover:from-[#CC0000]/90 group-hover:via-black/60 transition-all duration-700"></div>
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/0 to-transparent group-hover:via-white/10 group-hover:translate-x-full transition-all duration-1000"></div>
              <div className="absolute inset-0 p-8 flex items-center justify-between">
                <div className="relative w-64 h-64 flex-shrink-0 bg-white rounded-3xl border-4 border-[#CC0000] p-4 group-hover:scale-110 group-hover:rotate-6 transition-all duration-700 shadow-2xl">
                  <div className="relative w-full h-full">
                    <Image
                      src="/sushi_card.png"
                      alt="Toshi Sushi Logo"
                      fill
                      className="object-contain group-hover:drop-shadow-[0_0_30px_rgba(255,255,255,0.8)]"
                    />
                  </div>
                </div>
                <h2 className="font-[family-name:var(--font-archivo-black)] text-6xl text-white tracking-tight drop-shadow-2xl text-right group-hover:text-[#FFE5E5] group-hover:scale-105 group-hover:-translate-y-2 transition-all duration-700">
                  TOSHI SUSHI &<br />ASIA KÜCHE
                </h2>
              </div>
            </div>
          </div>

          {/* Hiro Burger Card */}
          <div id="hiro-burger" className="mb-16 scroll-mt-20">
            <a href="/HIRO BURGER" className="block relative h-96 rounded-2xl overflow-hidden shadow-2xl border-4 border-[#CC0000] group hover:shadow-[0_0_60px_rgba(204,0,0,0.8)] hover:border-[#FF2900] transition-all duration-700 hover:scale-[1.02] cursor-pointer">
              <Image
                src="/HIRO BURGER.avif"
                alt="Hiro Burger"
                fill
                className="object-cover group-hover:scale-125 group-hover:rotate-2 transition-all duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-transparent group-hover:from-[#CC0000]/90 group-hover:via-black/60 transition-all duration-700"></div>
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/0 to-transparent group-hover:via-white/10 group-hover:translate-x-full transition-all duration-1000"></div>
              <div className="absolute inset-0 p-8 flex items-center justify-between">
                <div className="relative w-64 h-64 flex-shrink-0 bg-white rounded-3xl border-4 border-[#CC0000] p-4 group-hover:scale-110 group-hover:rotate-6 transition-all duration-700 shadow-2xl">
                  <div className="relative w-full h-full">
                    <Image
                      src="/burger_card.png"
                      alt="Hiro Burger Logo"
                      fill
                      className="object-contain group-hover:drop-shadow-[0_0_30px_rgba(255,255,255,0.8)]"
                    />
                  </div>
                </div>
                <h2 className="font-[family-name:var(--font-archivo-black)] text-6xl text-white tracking-tight drop-shadow-2xl text-right group-hover:text-[#FFE5E5] group-hover:scale-105 group-hover:-translate-y-2 transition-all duration-700">
                  HIRO BURGER
                </h2>
              </div>
            </a>
          </div>

          {/* Pizza Time Card */}
          <div id="pizza-time" className="mb-16 scroll-mt-20">
            <div className="relative h-96 rounded-2xl overflow-hidden shadow-2xl border-4 border-[#CC0000] group hover:shadow-[0_0_60px_rgba(204,0,0,0.8)] hover:border-[#FF2900] transition-all duration-700 hover:scale-[1.02] cursor-pointer">
              <Image
                src="/PIZZA TIME.avif"
                alt="Pizza Time"
                fill
                className="object-cover group-hover:scale-125 group-hover:rotate-2 transition-all duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-transparent group-hover:from-[#CC0000]/90 group-hover:via-black/60 transition-all duration-700"></div>
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/0 to-transparent group-hover:via-white/10 group-hover:translate-x-full transition-all duration-1000"></div>
              <div className="absolute inset-0 p-8 flex items-center justify-between">
                <div className="relative w-64 h-64 flex-shrink-0 bg-white rounded-3xl border-4 border-[#CC0000] p-4 group-hover:scale-110 group-hover:rotate-6 transition-all duration-700 shadow-2xl">
                  <div className="relative w-full h-full">
                    <Image
                      src="/pizza_card.png"
                      alt="Pizza Time Logo"
                      fill
                      className="object-contain group-hover:drop-shadow-[0_0_30px_rgba(255,255,255,0.8)]"
                    />
                  </div>
                </div>
                <h2 className="font-[family-name:var(--font-archivo-black)] text-6xl text-white tracking-tight drop-shadow-2xl text-right group-hover:text-[#FFE5E5] group-hover:scale-105 group-hover:-translate-y-2 transition-all duration-700">
                  PIZZA TIME
                </h2>
              </div>
            </div>
          </div>

          {/* Los Tacos Card */}
          <div id="los-tacos" className="mb-16 scroll-mt-20">
            <div className="relative h-96 rounded-2xl overflow-hidden shadow-2xl border-4 border-[#CC0000] group hover:shadow-[0_0_60px_rgba(204,0,0,0.8)] hover:border-[#FF2900] transition-all duration-700 hover:scale-[1.02] cursor-pointer">
              <Image
                src="/LOS TACOS.avif"
                alt="Los Tacos"
                fill
                className="object-cover group-hover:scale-125 group-hover:rotate-2 transition-all duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-transparent group-hover:from-[#CC0000]/90 group-hover:via-black/60 transition-all duration-700"></div>
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/0 to-transparent group-hover:via-white/10 group-hover:translate-x-full transition-all duration-1000"></div>
              <div className="absolute inset-0 p-8 flex items-center justify-between">
                <div className="relative w-64 h-64 flex-shrink-0 bg-white rounded-3xl border-4 border-[#CC0000] p-4 group-hover:scale-110 group-hover:rotate-6 transition-all duration-700 shadow-2xl">
                  <div className="relative w-full h-full">
                    <Image
                      src="/taco_card.png"
                      alt="Los Tacos Logo"
                      fill
                      className="object-contain group-hover:drop-shadow-[0_0_30px_rgba(255,255,255,0.8)]"
                    />
                  </div>
                </div>
                <h2 className="font-[family-name:var(--font-archivo-black)] text-6xl text-white tracking-tight drop-shadow-2xl text-right group-hover:text-[#FFE5E5] group-hover:scale-105 group-hover:-translate-y-2 transition-all duration-700">
                  LOS TACOS
                </h2>
              </div>
            </div>
          </div>

          {/* Bowlicious Card */}
          <div id="bowlicious" className="mb-16 scroll-mt-20">
            <div className="relative h-96 rounded-2xl overflow-hidden shadow-2xl border-4 border-[#CC0000] group hover:shadow-[0_0_60px_rgba(204,0,0,0.8)] hover:border-[#FF2900] transition-all duration-700 hover:scale-[1.02] cursor-pointer">
              <Image
                src="/BOWLICIOUS.avif"
                alt="Bowlicious"
                fill
                className="object-cover group-hover:scale-125 group-hover:rotate-2 transition-all duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-transparent group-hover:from-[#CC0000]/90 group-hover:via-black/60 transition-all duration-700"></div>
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/0 to-transparent group-hover:via-white/10 group-hover:translate-x-full transition-all duration-1000"></div>
              <div className="absolute inset-0 p-8 flex items-center justify-between">
                <div className="relative w-64 h-64 flex-shrink-0 bg-white rounded-3xl border-4 border-[#CC0000] p-4 group-hover:scale-110 group-hover:rotate-6 transition-all duration-700 shadow-2xl">
                  <div className="relative w-full h-full">
                    <Image
                      src="/bowl_card.png"
                      alt="Bowlicious Logo"
                      fill
                      className="object-contain group-hover:drop-shadow-[0_0_30px_rgba(255,255,255,0.8)]"
                    />
                  </div>
                </div>
                <h2 className="font-[family-name:var(--font-archivo-black)] text-6xl text-white tracking-tight drop-shadow-2xl text-right group-hover:text-[#FFE5E5] group-hover:scale-105 group-hover:-translate-y-2 transition-all duration-700">
                  BOWLICIOUS
                </h2>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
