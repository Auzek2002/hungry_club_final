'use client'

import Image from 'next/image'
import { useRef, useState, useEffect } from 'react'
import ItemModal from '../components/ItemModal'
import CartBanner from '../components/CartBanner'

function HiroBurgerContent() {
  const scrollContainerRef = useRef<HTMLDivElement>(null)
  const categoryScrollRef = useRef<HTMLDivElement>(null)
  const [isScrolled, setIsScrolled] = useState(false)
  const [activeCategory, setActiveCategory] = useState('Beliebt')
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedItem, setSelectedItem] = useState<any>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)

  const openModal = (item: any) => {
    setSelectedItem(item)
    setIsModalOpen(true)
  }

  const closeModal = () => {
    setIsModalOpen(false)
    setSelectedItem(null)
  }

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0)

      // Determine which section is currently in view
      const sections = [
        'alkoholfreie-getränke',
        'alkoholische-getränke'
      ]

      const categoryNames = [
        'Alkoholfreie Getränke',
        'Alkoholische Getränke'
      ]

      for (let i = sections.length - 1; i >= 0; i--) {
        const section = document.getElementById(sections[i])
        if (section) {
          const rect = section.getBoundingClientRect()
          // Check if section is in view (accounting for header)
          if (rect.top <= 250) {
            const newCategory = categoryNames[i]
            if (newCategory !== activeCategory) {
              setActiveCategory(newCategory)
              scrollCategoryIntoView(newCategory)
            }
            break
          }
        }
      }
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [activeCategory])

  const scrollLeft = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: -400, behavior: 'smooth' })
    }
  }

  const scrollRight = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: 400, behavior: 'smooth' })
    }
  }

  const scrollCategoryLeft = () => {
    if (categoryScrollRef.current) {
      categoryScrollRef.current.scrollBy({ left: -200, behavior: 'smooth' })
    }
  }

  const scrollCategoryRight = () => {
    if (categoryScrollRef.current) {
      categoryScrollRef.current.scrollBy({ left: 200, behavior: 'smooth' })
    }
  }

  const scrollCategoryIntoView = (categoryName: string) => {
    if (categoryScrollRef.current) {
      // Find the button element for this category
      const buttons = categoryScrollRef.current.querySelectorAll('button')
      const targetButton = Array.from(buttons).find(
        button => button.textContent?.trim() === categoryName
      )

      if (targetButton) {
        // Get the container and button positions
        const container = categoryScrollRef.current
        const buttonRect = targetButton.getBoundingClientRect()
        const containerRect = container.getBoundingClientRect()

        // Calculate the scroll position to center the button
        const buttonRelativeLeft = buttonRect.left - containerRect.left
        const scrollOffset = buttonRelativeLeft - (containerRect.width / 2) + (buttonRect.width / 2)

        container.scrollBy({
          left: scrollOffset,
          behavior: 'smooth'
        })
      }
    }
  }

  const scrollToSection = (sectionId: string) => {
    // If clicking "alkoholfreie-getränke", scroll to the very top
    if (sectionId === 'alkoholfreie-getränke') {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      })
      return
    }

    const element = document.getElementById(sectionId)
    if (element) {
      // Calculate dynamic header height
      const header = document.querySelector('header')
      const headerHeight = header ? header.offsetHeight : 180
      const extraPadding = 20 // Extra space to ensure heading is visible
      const headerOffset = headerHeight + extraPadding

      const elementPosition = element.getBoundingClientRect().top
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      })
    }
  }

  // Helper function to convert category names to section IDs
  const getCategoryId = (category: string): string => {
    return category.toLowerCase().replace(/\s+/g, '-').replace(/&/g, 'and')
  }


  const alkoholischeGetraenkeItems = [
    {
      name: 'Corona Extra 0,33l',
      price: '3,80 €',
      description: '4,5% vol, 0,33l, 11,52 €/1l',
      image: '/HIRO BURGER/Corona Extra 0,33lAltersbeschränkung.webp',
      tags: []
    },
    {
      name: 'Saigon Premium',
      price: '3,80 €',
      description: '8% vol, 0,33l, 11,52 €/1l',
      image: '/HIRO BURGER/Saigon Premium.webp',
      tags: []
    },
    {
      name: 'Asahi',
      price: '3,80 €',
      description: '8% vol, 0,33l, 11,52 €/1l',
      image: '/HIRO BURGER/Asahi.webp',
      tags: []
    },
    {
      name: 'Tsingtao',
      price: '3,80 €',
      description: '8% vol, 0,33l, 11,52 €/1l',
      image: '/HIRO BURGER/Tsingtao.webp',
      tags: []
    },
    {
      name: 'Kirin Ichiban',
      price: '3,80 €',
      description: '8% vol, 0,33l, 11,52 €/1l',
      image: '/HIRO BURGER/Kirin Ichiban.webp',
      tags: []
    }
  ]

  const alkoholfreieGetraenkeItems = [
    {
      name: 'Lycheenektar 0.25l',
      price: '3,20 €',
      description: '0,25l, 12,80 €/1l',
      image: '/HIRO BURGER/Lycheenektar 0.25l.webp',
      tags: []
    },
    {
      name: 'Aloe Vera 0.5l',
      price: '4,00 €',
      description: '0,5l, 8,00 €/1l',
      image: '/HIRO BURGER/Aloe Vera 0.5l.webp',
      tags: []
    },
    {
      name: 'Mango Lassi 0.4l',
      price: '4,90 €',
      description: 'Ein cremiges Joghurtgetränk',
      additionalInfo: '0,4l, 12,25 €/1l',
      image: '/HIRO BURGER/Mango Lassi 0.4l.webp',
      tags: []
    },
    {
      name: 'Coca-Cola 0,33l (MEHRWEG)',
      price: '3,35 €',
      description: 'Coca-Cola steht für einzigartigen Geschmack, Erfrischung und Momente voller Lebensfreude. Die 0,33l Glas-Mehrwegflasche ist unsere Ikone für perfekten Trinkgenuss seit 1886.',
      additionalInfo: 'zzgl. Pfand (0,15 €), 0,33l, 10,15 €/1l, Enthält Koffein (10mg/100ml)',
      image: '/HIRO BURGER/Coca-Cola 0,33l (MEHRWEG).webp',
      tags: []
    },
    {
      name: 'Coca-Cola Zero Sugar 0,33l (MEHRWEG)',
      price: '3,35 €',
      description: 'Keine Kalorien. Null Zucker. Für alle Coke Liebhaber, die beim Geschmack keinen Kompromiss eingehen wollen.',
      additionalInfo: 'zzgl. Pfand (0,15 €), 0,33l, 10,15 €/1l, Enthält Koffein (10mg/100ml)',
      image: '/HIRO BURGER/Coca-Cola Zero Sugar 0,33l (MEHRWEG).webp',
      tags: []
    },
    {
      name: 'Fritz-Kola 0,33l',
      price: '3,42 €',
      description: 'Unser Original: Die bessere Alternative mit einzigartigem Cola-Geschmack und viel Koffein.',
      additionalInfo: 'zzgl. Pfand (0,08 €), 0,33l, 10,36 €/1l, Enthält Koffein (25mg/100ml)',
      image: '/HIRO BURGER/Fritz-Kola 0,33l.webp',
      tags: []
    },
    {
      name: 'Fritz-Limo Orange 0,33l',
      price: '3,42 €',
      description: 'Da scheint die Sonne aus dem Glas: Unsere Orangen-Limonade kommt dank mitmischender Zitrone und Mandarine auf intensive 17% Fruchtanteil.',
      additionalInfo: 'zzgl. Pfand (0,08 €), 0,33l, 10,36 €/1l',
      image: '/HIRO BURGER/Fritz-Limo Orange 0,33l.webp',
      tags: []
    },
    {
      name: 'Fritz-Limo Zitrone 0,33l',
      price: '3,42 €',
      description: 'Wenn dir Zitronen das Leben geben, dann ist es Fritz-Limo. Mit vielen Zitronen für einen hohen Fruchtanteil.',
      additionalInfo: 'zzgl. Pfand (0,08 €), 0,33l, 10,36 €/1l',
      image: '/HIRO BURGER/Fritz-Limo Zitrone 0,33l.webp',
      tags: []
    },
    {
      name: 'Fritz-Limo Honigmelone 0,33l',
      price: '3,42 €',
      description: 'Schmeckt unvergleichlich - denn wer macht aus Honigmelone schon Limonade? Die Antwort überrascht wohl nicht.',
      additionalInfo: 'zzgl. Pfand (0,08 €), 0,33l, 10,36 €/1l',
      image: '/HIRO BURGER/Fritz-Limo Honigmelone 0,33l.webp',
      tags: []
    },
    {
      name: 'Fritz-Limo Apfel-Kirsch-Holunder 0,33l',
      price: '3,42 €',
      description: 'Die gibt dir \'nen Obstkorb: 23% Frucht von Äpfeln, Kirschen und Holunderbeeren - sauer-süß-herb. Keine Wünsche offen.',
      additionalInfo: 'zzgl. Pfand (0,08 €), 0,33l, 10,36 €/1l',
      image: '/HIRO BURGER/Fritz-Limo Apfel-Kirsch-Holunder 0,33l.webp',
      tags: []
    },
    {
      name: 'Fritz-Spritz Bio-Apfelschorle 0,33l',
      price: '3,42 €',
      description: 'Die erste naturtrübe Apfelschorle auf dem Markt macht immer noch alles richtig: 66% Bio-Direktsaft für einen Geschmack, als wäre er geradewegs in die Flasche geerntet.',
      additionalInfo: 'zzgl. Pfand (0,08 €), 0,33l, 10,36 €/1l',
      image: '/HIRO BURGER/Fritz-Spritz Bio-Apfelschorle 0,33l.webp',
      tags: []
    },
    {
      name: 'Fritz Mischmasch 0,33l',
      price: '3,42 €',
      description: 'Die Spezi des Nordens, mit Inhalten des Südens: Das perfekte Mischverhältnis aus Cola und viel Frucht.',
      additionalInfo: 'zzgl. Pfand (0,08 €), 0,33l, 10,36 €/1l, Enthält Koffein (6mg/100ml)',
      image: '/HIRO BURGER/Fritz Mischmasch 0,33l.webp',
      tags: []
    },
    {
      name: 'Rauch Eistee Pfirsich 0,33l',
      price: '3,35 €',
      description: 'zzgl. Pfand (0,15 €), 0,33l, 10,15 €/1l',
      image: '/HIRO BURGER/Rauch Eistee Pfirsich 0,33l.webp',
      tags: []
    },
    {
      name: 'Rauch Eistee Granatapfel 0,33l',
      price: '3,35 €',
      description: 'zzgl. Pfand (0,15 €), 0,33l, 10,15 €/1l',
      image: '/HIRO BURGER/Rauch Eistee Granatapfel 0,33l.webp',
      tags: []
    },
    {
      name: 'Rauch Eistee Zitrone 0,33l',
      price: '3,35 €',
      description: 'zzgl. Pfand (0,15 €), 0,33l, 10,15 €/1l',
      image: '/HIRO BURGER/Rauch Eistee Zitrone 0,33l.webp',
      tags: []
    },
    {
      name: 'Rauch Eistee Kirsche 0,33l',
      price: '3,35 €',
      description: 'zzgl. Pfand (0,15 €), 0,33l, 10,15 €/1l',
      image: '/HIRO BURGER/Rauch Eistee Kirsche 0,33l.webp',
      tags: []
    },
    {
      name: 'Aqua Morelli Wasser Still 0,25l',
      price: '2,85 €',
      description: 'zzgl. Pfand (0,15 €), 0,25l, 11,40 €/1l',
      image: '/HIRO BURGER/Aqua Morelli Wasser Still 0,25l.webp',
      tags: []
    },
    {
      name: 'Aqua Morelli Mineralwasser Sprudel 0,25l',
      price: '2,85 €',
      description: 'zzgl. Pfand (0,15 €), 0,25l, 11,40 €/1l',
      image: '/HIRO BURGER/Aqua Morelli Mineralwasser Sprudel 0,25l.webp',
      tags: []
    },
    {
      name: 'Becks Blue',
      price: '3,50 €',
      description: 'alkoholfrei',
      additionalInfo: '0,33l, 10,61 €/1l',
      image: '/HIRO BURGER/Becks Blue.webp',
      tags: []
    },
    {
      name: 'Franziskaner Weissbier',
      price: '3,50 €',
      description: 'alkoholfreie',
      additionalInfo: '0,33l, 10,61 €/1l',
      image: '/HIRO BURGER/Franziskaner Weissbier.webp',
      tags: []
    }
  ]


  const categories = [
    'Alkoholfreie Getränke',
    'Alkoholische Getränke'
  ]

  // Get all items for search
  const allItems = [
    ...alkoholfreieGetraenkeItems.map(item => ({ ...item, section: 'Alkoholfreie Getränke' })),
    ...alkoholischeGetraenkeItems.map(item => ({ ...item, section: 'Alkoholische Getränke' }))
  ]

  // Filter items based on search query
  const searchResults = searchQuery.trim()
    ? allItems.filter(item =>
      item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (item.description && item.description.toLowerCase().includes(searchQuery.toLowerCase()))
    )
    : []

  return (
    <div className="min-h-screen" style={{ backgroundImage: 'url(/bg.png)', backgroundRepeat: 'repeat', backgroundSize: '400px' }}>
      {/* Header */}
      <header className="bg-white shadow-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          {/* Restaurant Name and Rating - Only show when not scrolled */}
          <div className={`overflow-hidden transition-all duration-300 ${isScrolled ? 'max-h-0 opacity-0' : 'max-h-24 opacity-100'}`}>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-6">
                <a href="/" className="group bg-white rounded-xl shadow-lg border-4 border-white h-16 w-16 overflow-hidden transition-all duration-300 hover:shadow-[0_0_20px_rgba(255,255,255,0.6)] hover:border-white hover:scale-105 cursor-pointer p-1">
                  <div className="relative w-full h-full">
                    <Image
                      src="/logo_4k.png"
                      alt="Hungry Club Logo"
                      fill
                      className="object-cover transition-transform group-hover:scale-110 rounded-md"
                      priority
                    />
                  </div>
                </a>
                <div>
                  <h1 className="text-3xl font-bold text-gray-900">Getränke</h1>
                </div>
              </div>
            </div>
          </div>

          {/* Search Bar */}
          <div className={`transition-all duration-300 ${isScrolled ? 'mt-0' : 'mt-4'}`}>
            <div className="relative">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-orange-500 text-xl">🔍</span>
              <input
                type="text"
                placeholder="Suche Getränke"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-12 py-3 border-2 border-gray-300 rounded-full focus:outline-none focus:border-orange-500 transition-colors"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                >
                  <span className="text-xl">✕</span>
                </button>
              )}
            </div>
          </div>

          {/* Category Tabs */}
          <div className={`relative transition-all duration-300 ${isScrolled ? 'mt-4' : 'mt-6'}`}>
            {/* Left Arrow */}
            <button
              onClick={scrollCategoryLeft}
              className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white shadow-lg rounded-full w-8 h-8 flex items-center justify-center hover:bg-gray-100 transition-colors"
            >
              <span className="text-xl text-gray-700">‹</span>
            </button>

            {/* Category Container */}
            <div
              ref={categoryScrollRef}
              className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-hide scroll-smooth px-10"
              style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
            >
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => scrollToSection(getCategoryId(category))}
                  className={`px-6 py-2 rounded-full font-semibold whitespace-nowrap transition-colors ${activeCategory === category
                    ? 'bg-gray-900 text-white'
                    : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-300'
                    }`}
                >
                  {category}
                </button>
              ))}

            </div>

            {/* Right Arrow */}
            <button
              onClick={scrollCategoryRight}
              className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white shadow-lg rounded-full w-8 h-8 flex items-center justify-center hover:bg-gray-100 transition-colors"
            >
              <span className="text-xl text-gray-700">›</span>
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Search Results */}
        {searchQuery.trim() ? (
          <div className="mb-12">
            <div className="mb-6">
              <h2 className="text-2xl font-bold text-gray-900">Suchergebnisse für "{searchQuery}"</h2>
              <p className="text-gray-600 mt-2">{searchResults.length} Artikel gefunden</p>
            </div>

            {searchResults.length > 0 ? (
              <div className="space-y-4">
                {searchResults.map((item, index) => (
                  <div
                    key={`${item.section}-${item.name}-${index}`}
                    className="bg-white rounded-lg shadow-sm hover:shadow-[0_0_40px_rgba(255,255,255,1)] transition-all duration-300 cursor-pointer border-2 border-transparent hover:border-white p-4"
                  >
                    <div className="flex gap-4 items-start">
                      {/* Left Side - Content */}
                      <div className="flex-1">
                        <div className="text-sm text-red-600 font-semibold mb-1">{item.section}</div>
                        <h3 className="font-bold text-gray-900 text-base mb-1">{item.name}</h3>
                        <button className="text-xs text-gray-700 hover:text-gray-900 underline mb-2">
                          Produktinfo
                        </button>
                        <div className="mb-2">
                          <div className="font-bold text-gray-900 text-base">{item.price}</div>
                          {'originalPrice' in item && item.originalPrice ? (
                            <div className="text-xs text-gray-500 line-through">{String(item.originalPrice)}</div>
                          ) : null}
                        </div>
                        <p className="text-sm text-gray-600 mb-2">{item.description}</p>
                        {'additionalInfo' in item && item.additionalInfo ? (
                          <p className="text-xs text-gray-500 mt-1">{String(item.additionalInfo)}</p>
                        ) : null}

                        {/* Tags */}
                        {'tags' in item && item.tags && item.tags.length > 0 && (
                          <div className="flex gap-1.5 flex-wrap mt-2">
                            {item.tags.map((tag: string) => (
                              <span
                                key={tag}
                                className={`px-2.5 py-0.5 rounded-full text-xs font-semibold ${tag === 'Vegan' || tag === 'Vegetarisch'
                                  ? 'bg-green-100 text-green-800'
                                  : tag === 'Scharf'
                                    ? 'bg-red-100 text-red-800'
                                    : 'bg-gray-100 text-gray-800'
                                  }`}
                              >
                                {tag === 'Vegan' && '🌱 '}
                                {tag === 'Vegetarisch' && '🥬 '}
                                {tag === 'Scharf' && '🌶️ '}
                                {tag}
                              </span>
                            ))}
                          </div>
                        )}
                        {item.section === 'Alkoholische Getränke' && (
                          <span className="inline-block px-2 py-0.5 bg-gray-900 text-white text-xs font-semibold rounded mt-2">
                            18+
                          </span>
                        )}
                      </div>

                      {/* Right Side - Image and Button */}
                      <div className="flex flex-col items-end gap-2">
                        <button className="bg-white border-2 border-gray-300 rounded-full p-1.5 hover:bg-gray-50 transition-colors">
                          <span className="text-lg text-[#CC0000]">+</span>
                        </button>
                        {item.image && (
                          <div className="relative w-32 h-32 bg-orange-50 rounded-lg overflow-hidden">
                            <Image
                              src={encodeURI(item.image)}
                              alt={item.name}
                              fill
                              className="object-cover"
                            />
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <p className="text-gray-500 text-lg">Keine Ergebnisse gefunden</p>
              </div>
            )}
          </div>
        ) : (
          <>
            {/* Alkoholfreie Getränke Section */}
            <section id="alkoholfreie-getränke" className="mb-12">
              <div className="flex items-center justify-between mb-6 bg-white px-4 py-3 rounded-lg shadow-sm border-2 border-transparent hover:border-white hover:shadow-[0_0_40px_rgba(255,255,255,1)] transition-all duration-300 cursor-pointer">
                <h2 className="text-3xl font-bold text-gray-900">Alkoholfreie Getränke</h2>
                <span className="text-gray-600 font-semibold">21 Artikel</span>
              </div>

              {/* Grid Layout */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {alkoholfreieGetraenkeItems.map((item) => (
                  <div
                    key={item.name}
                    onClick={() => openModal(item)}
                    className="bg-white rounded-lg shadow-sm hover:shadow-[0_0_40px_rgba(255,255,255,1)] transition-all duration-300 cursor-pointer border-2 border-transparent hover:border-white p-4"
                  >
                    <div className="flex gap-4 items-start">
                      {/* Left Side - Content */}
                      <div className="flex-1">
                        <h3 className="font-bold text-gray-900 text-base mb-1">{item.name}</h3>
                        <button className="text-xs text-gray-700 hover:text-gray-900 underline mb-2">
                          Produktinfo
                        </button>
                        <div className="font-bold text-gray-900 text-base mb-2">{item.price}</div>
                        {item.description && (
                          <p className="text-xs text-gray-600 mb-2 line-clamp-2">{item.description}</p>
                        )}
                        {'additionalInfo' in item && item.additionalInfo ? (
                          <p className="text-xs text-gray-500 mt-1">{String(item.additionalInfo)}</p>
                        ) : null}
                      </div>

                      {/* Right Side - Image and Button */}
                      <div className="flex flex-col items-end gap-2">
                        <button className="bg-white border-2 border-gray-300 rounded-full p-1.5 hover:bg-gray-50 transition-colors">
                          <span className="text-lg text-[#CC0000]">+</span>
                        </button>
                        <div className="relative w-28 h-28 bg-orange-50 rounded-lg overflow-hidden">
                          <Image
                            src={encodeURI(item.image)}
                            alt={item.name}
                            fill
                            className="object-cover"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* Alkoholische Getränke Section */}
            <section id="alkoholische-getränke" className="mb-12">
              <div className="flex items-center justify-between mb-6 bg-white px-4 py-3 rounded-lg shadow-sm border-2 border-transparent hover:border-white hover:shadow-[0_0_40px_rgba(255,255,255,1)] transition-all duration-300 cursor-pointer">
                <h2 className="text-3xl font-bold text-gray-900">Alkoholische Getränke</h2>
                <span className="text-gray-600 font-semibold">5 Artikel</span>
              </div>

              {/* Grid Layout */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {alkoholischeGetraenkeItems.map((item) => (
                  <div
                    key={item.name}
                    onClick={() => openModal(item)}
                    className="bg-white rounded-lg shadow-sm hover:shadow-[0_0_40px_rgba(255,255,255,1)] transition-all duration-300 cursor-pointer border-2 border-transparent hover:border-white p-4"
                  >
                    <div className="flex gap-4 items-start">
                      {/* Left Side - Content */}
                      <div className="flex-1">
                        <h3 className="font-bold text-gray-900 text-base mb-1">{item.name}</h3>
                        <button className="text-xs text-gray-700 hover:text-gray-900 underline mb-2">
                          Produktinfo
                        </button>
                        <span className="inline-block px-2 py-0.5 bg-gray-900 text-white text-xs font-semibold rounded mb-2">
                          18+
                        </span>
                        <div className="font-bold text-gray-900 text-base mb-2">{item.price}</div>
                        <p className="text-xs text-gray-600">{item.description}</p>
                      </div>

                      {/* Right Side - Image and Button */}
                      <div className="flex flex-col items-end gap-2">
                        <button className="bg-white border-2 border-gray-300 rounded-full p-1.5 hover:bg-gray-50 transition-colors">
                          <span className="text-lg text-[#CC0000]">+</span>
                        </button>
                        <div className="relative w-28 h-28 bg-orange-50 rounded-lg overflow-hidden">
                          <Image
                            src={encodeURI(item.image)}
                            alt={item.name}
                            fill
                            className="object-cover"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          </>
        )}
      </main>

      <style jsx global>{`
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
      `}</style>

      {/* Item Modal */}
      {selectedItem && (
        <ItemModal
          isOpen={isModalOpen}
          onClose={closeModal}
          item={selectedItem}
        />
      )}

      {/* Cart Banner */}
      <CartBanner />
    </div>
  )
}

export default function HiroBurgerPage() {
  return <HiroBurgerContent />
}
