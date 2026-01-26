'use client'

import Image from 'next/image'
import { useRef, useState, useEffect } from 'react'
import ItemModal from '../components/ItemModal'
import CartBanner from '../components/CartBanner'

function PizzaTimeContent() {
  const scrollContainerRef = useRef<HTMLDivElement>(null)
  const categoryScrollRef = useRef<HTMLDivElement>(null)
  const [isScrolled, setIsScrolled] = useState(false)
  const [activeCategory, setActiveCategory] = useState('Vorspeisen')
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedItem, setSelectedItem] = useState<any>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [menuItems, setMenuItems] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  const openModal = (item: any) => {
    setSelectedItem(item)
    setIsModalOpen(true)
  }

  const closeModal = () => {
    setIsModalOpen(false)
    setSelectedItem(null)
  }

  // Fetch menu items from database
  useEffect(() => {
    const fetchMenuItems = async () => {
      try {
        const response = await fetch('/api/menu-items?restaurant=PIZZA_TIME&active=true')
        const data = await response.json()

        if (data.success) {
          setMenuItems(data.menuItems)
        }
      } catch (error) {
        console.error('Error fetching menu items:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchMenuItems()
  }, [])

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0)

      // Determine which section is currently in view
      const sections = [
        'vorspeisen',
        'pizza-ca.30-cm',
        'saucen'
      ]

      const categoryNames = [
        'Vorspeisen',
        'Pizza ca.30 cm',
        'Saucen'
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
    return category.toLowerCase().replace(/\s+/g, '-').replace(/&/g, 'and').replace(/ä/g, 'ä').replace(/ö/g, 'ö').replace(/ü/g, 'ü')
  }

  // Organize menu items by section from database
  const vorspeisen = menuItems.filter(item => item.section === 'Vorspeisen')
  const pizzaCa30Items = menuItems.filter(item => item.section === 'Pizza ca.30 cm')
  const saucenItems = menuItems.filter(item => item.section === 'Saucen')

  const categories = [
    'Vorspeisen',
    'Pizza ca.30 cm',
    'Saucen'
  ]

  // Get all items for search (menuItems already have section field)
  const allItems = menuItems

  // Filter items based on search query
  const searchResults = searchQuery.trim()
    ? allItems.filter(item =>
      item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (item.description && item.description.toLowerCase().includes(searchQuery.toLowerCase()))
    )
    : []

  // Show loading state
  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-[#CC0000] mx-auto mb-4"></div>
          <p className="text-gray-600">Loading menu...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen" style={{ backgroundImage: 'url(/bg.png)', backgroundRepeat: 'repeat', backgroundSize: '400px' }}>
      {/* Header */}
      <header className="bg-white shadow-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          {/* Restaurant Name and Rating - Only show when not scrolled */}
          <div className={`overflow-hidden transition-all duration-300 ${isScrolled ? 'max-h-0 opacity-0' : 'max-h-24 opacity-100'}`}>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 md:gap-6">
                <a href="/" className="group bg-white rounded-xl shadow-lg border-4 border-white h-12 w-12 md:h-16 md:w-16 flex-shrink-0 overflow-hidden transition-all duration-300 hover:shadow-[0_0_20px_rgba(255,255,255,0.6)] hover:border-white hover:scale-105 cursor-pointer p-1">
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
                  <h1 className="text-l md:text-3xl font-bold text-gray-900">Pizza Time</h1>
                </div>
              </div>
              <div className="flex items-center gap-1 md:gap-2">
                <a href="/TOSHI_SUSHI" className="group relative transition-all rounded-lg">
                  <span className="relative w-8 h-8 md:w-10 md:h-10 lg:w-12 lg:h-12 block group-hover:scale-110 transition-transform bg-white rounded-full overflow-hidden">
                    <Image
                      src="/sushi_nav.png"
                      alt="Sushi"
                      fill
                      className="object-cover"
                    />
                  </span>
                </a>
                <a href="/HIRO_BURGER" className="group relative transition-all rounded-lg">
                  <span className="relative w-8 h-8 md:w-10 md:h-10 lg:w-12 lg:h-12 block group-hover:scale-110 transition-transform bg-white rounded-full overflow-hidden">
                    <Image
                      src="/burger_nav.png"
                      alt="Burger"
                      fill
                      className="object-cover"
                    />
                  </span>
                </a>
                <a href="/PIZZA_TIME" className="group relative transition-all rounded-lg">
                  <span className="relative w-8 h-8 md:w-10 md:h-10 lg:w-12 lg:h-12 block group-hover:scale-110 transition-transform bg-white rounded-full overflow-hidden">
                    <Image
                      src="/pizza_nav.png"
                      alt="Pizza"
                      fill
                      className="object-cover"
                    />
                  </span>
                </a>
                <a href="/LOS_TACOS" className="group relative transition-all rounded-lg">
                  <span className="relative w-8 h-8 md:w-10 md:h-10 lg:w-12 lg:h-12 block group-hover:scale-110 transition-transform bg-white rounded-full overflow-hidden">
                    <Image
                      src="/taco_nav.png"
                      alt="Taco"
                      fill
                      className="object-cover"
                    />
                  </span>
                </a>
                <a href="/BOWLICIOUS" className="group relative transition-all rounded-lg">
                  <span className="relative w-8 h-8 md:w-10 md:h-10 lg:w-12 lg:h-12 block group-hover:scale-110 transition-transform bg-white rounded-full overflow-hidden">
                    <Image
                      src="/bowl_nav.png"
                      alt="Bowl"
                      fill
                      className="object-cover"
                    />
                  </span>
                </a>
              </div>
            </div>
          </div>

          {/* Search Bar */}
          <div className={`transition-all duration-300 ${isScrolled ? 'mt-0' : 'mt-4'}`}>
            <div className="relative">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-orange-500 text-xl">🔍</span>
              <input
                type="text"
                placeholder="Suche Pizza Time"
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
              {categories.map((category: string) => (
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
                {searchResults.map((item: any, index: number) => (
                  <div
                    key={`${item.section}-${item.name}-${index}`}
                    onClick={() => openModal(item)}
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
                        </div>
                        <p className="text-sm text-gray-600 mb-2">{item.description}</p>
                      </div>

                      {/* Right Side - Image and Button */}
                      <div className="flex flex-col items-end gap-2">
                        <button className="bg-white border-2 border-gray-300 rounded-full p-1.5 hover:bg-gray-50 transition-colors">
                          <span className="text-lg text-[#CC0000]">+</span>
                        </button>
                        {item.image && (
                          <div className="relative w-32 h-32 bg-orange-50 rounded-lg overflow-hidden">
                            <Image
                              src={item.image}
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
            {/* Vorspeisen Section */}
            <section id="vorspeisen" className="mb-12">
              <div className="flex items-center justify-between mb-6 bg-white px-4 py-3 rounded-lg shadow-sm border-2 border-transparent hover:border-white hover:shadow-[0_0_40px_rgba(255,255,255,1)] transition-all duration-300 cursor-pointer">
                <h2 className="text-3xl font-bold text-gray-900">Vorspeisen</h2>
                <span className="text-gray-600 font-semibold">7 Artikel</span>
              </div>

              {/* Grid Layout */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {vorspeisen.map((item: any) => (
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

                        {/* Tags */}
                        {item.tags.length > 0 && (
                          <div className="flex gap-1.5 flex-wrap">
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
                      </div>

                      {/* Right Side - Image and Button */}
                      <div className="flex flex-col items-end gap-2">
                        <button className="bg-white border-2 border-gray-300 rounded-full p-1.5 hover:bg-gray-50 transition-colors">
                          <span className="text-lg text-[#CC0000]">+</span>
                        </button>
                        <div className="relative w-28 h-28 bg-orange-50 rounded-lg overflow-hidden">
                          <Image
                            src={item.image}
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

            {/* Pizza ca.30 cm Section */}
            <section id="pizza-ca.30-cm" className="mb-12">
              <div className="mb-6 bg-white px-4 py-3 rounded-lg shadow-sm border-2 border-transparent hover:border-white hover:shadow-[0_0_40px_rgba(255,255,255,1)] transition-all duration-300 cursor-pointer">
                <div className="flex items-center justify-between mb-2">
                  <h2 className="text-3xl font-bold text-gray-900">Pizza ca.30 cm</h2>
                  <span className="text-gray-600 font-semibold">24 Artikel</span>
                </div>
                <p className="text-sm text-gray-600">Alle Pizzen werden mit Tomatensauce und Mozzarella zubereitet.</p>
              </div>

              {/* Grid Layout */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {pizzaCa30Items.map((item: any) => (
                  <div
                    key={item.name}
                    onClick={() => openModal(item)}
                    className="bg-white rounded-lg shadow-sm hover:shadow-[0_0_40px_rgba(255,255,255,1)] transition-all duration-300 cursor-pointer border-2 border-transparent hover:border-white p-4"
                  >
                    {item.name === 'Pizza Chicken Teriyaki' || item.name === 'Pizza Spinaci' || item.name === 'Pizza Quattro Stagioni' ? (
                      // Special layout for items without images
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <h3 className="font-bold text-gray-900 text-base mb-1">{item.name}</h3>
                          <button className="text-xs text-gray-700 hover:text-gray-900 underline mb-2">
                            Produktinfo
                          </button>
                          <div className="mb-2">
                            <div className="font-bold text-gray-900 text-base">{item.price}</div>
                            {item.originalPrice && (
                              <div className="text-xs text-gray-500 line-through">{item.originalPrice}</div>
                            )}
                          </div>
                          <p className="text-xs text-gray-600 mb-2">{item.description}</p>

                          {/* Tags */}
                          {item.tags && item.tags.length > 0 && (
                            <div className="flex gap-1.5 flex-wrap">
                              {item.tags.map((tag: string) => (
                                <span
                                  key={tag}
                                  className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-yellow-100 text-yellow-800"
                                >
                                  🏷️ {tag}
                                </span>
                              ))}
                            </div>
                          )}
                        </div>
                        <button className="bg-white border-2 border-gray-300 rounded-full p-1.5 hover:bg-gray-50 transition-colors ml-4">
                          <span className="text-lg text-[#CC0000]">+</span>
                        </button>
                      </div>
                    ) : (
                      // Standard layout with image
                      <div className="flex gap-4 items-start">
                        {/* Left Side - Content */}
                        <div className="flex-1">
                          <h3 className="font-bold text-gray-900 text-base mb-1">{item.name}</h3>
                          <button className="text-xs text-gray-700 hover:text-gray-900 underline mb-2">
                            Produktinfo
                          </button>
                          <div className="mb-2">
                            <div className="font-bold text-gray-900 text-base">{item.price}</div>
                            {item.originalPrice && (
                              <div className="text-xs text-gray-500 line-through">{item.originalPrice}</div>
                            )}
                          </div>
                          <p className="text-xs text-gray-600 mb-2 line-clamp-2">{item.description}</p>

                          {/* Tags */}
                          {item.tags && item.tags.length > 0 && (
                            <div className="flex gap-1.5 flex-wrap">
                              {item.tags.map((tag: string) => (
                                <span
                                  key={tag}
                                  className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-yellow-100 text-yellow-800"
                                >
                                  🏷️ {tag}
                                </span>
                              ))}
                            </div>
                          )}
                        </div>

                        {/* Right Side - Image and Button */}
                        <div className="flex flex-col items-end gap-2">
                          <button className="bg-white border-2 border-gray-300 rounded-full p-1.5 hover:bg-gray-50 transition-colors">
                            <span className="text-lg text-[#CC0000]">+</span>
                          </button>
                          <div className="relative w-28 h-28 bg-orange-50 rounded-lg overflow-hidden">
                            <Image
                              src={item.image}
                              alt={item.name}
                              fill
                              className="object-cover"
                            />
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </section>

            {/* Saucen Section */}
            <section id="saucen" className="mb-12">
              <div className="flex items-center justify-between mb-6 bg-white px-4 py-3 rounded-lg shadow-sm border-2 border-transparent hover:border-white hover:shadow-[0_0_40px_rgba(255,255,255,1)] transition-all duration-300 cursor-pointer">
                <h2 className="text-3xl font-bold text-gray-900">Saucen</h2>
                <span className="text-gray-600 font-semibold">9 Artikel</span>
              </div>

              {/* Grid Layout */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {saucenItems.map((item: any) => (
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

                        {/* Tags */}
                        {item.tags.length > 0 && (
                          <div className="flex gap-1.5 flex-wrap">
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
                      </div>

                      {/* Right Side - Image and Button */}
                      <div className="flex flex-col items-end gap-2">
                        <button className="bg-white border-2 border-gray-300 rounded-full p-1.5 hover:bg-gray-50 transition-colors">
                          <span className="text-lg text-[#CC0000]">+</span>
                        </button>
                        <div className="relative w-28 h-28 bg-orange-50 rounded-lg overflow-hidden">
                          <Image
                            src={item.image}
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

export default function PizzaTimePage() {
  return <PizzaTimeContent />
}
