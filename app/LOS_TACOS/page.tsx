'use client'

import Image from 'next/image'
import { useRef, useState, useEffect } from 'react'
import ItemModal from '../components/ItemModal'
import CartBanner from '../components/CartBanner'

function LosTacosContent() {
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
        'beliebt',
        'fingerfood',
        'fresh-salads',
        'birria-tacos',
        'french-tacos',
        'taco-burger',
        'burritos',
        'loaded-nachos',
        'desserts',
        'alkoholfreie-getränke',
        'alkoholische-getränke'
      ]

      const categoryNames = [
        'Beliebt',
        'Fingerfood',
        'Fresh Salads',
        'Birria Tacos',
        'French Tacos',
        'Taco-Burger',
        'Burritos',
        'Loaded Nachos',
        'Desserts',
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
    // If clicking "Beliebt", scroll to the very top
    if (sectionId === 'beliebt') {
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

  const beliebteItems = [
    {
      name: 'The Chicken Taco',
      price: '8,90 €',
      description: 'mit Paprika, Mais, karamellisierten Zwiebeln, Hähnchenbrustfilet, Cheddar und hausgemachter Tacosauce',
      image: '/LOS TACOS/The Chicken Taco.webp',
      category: 'French Tacos'
    },
    {
      name: 'Original Birria Tacos (2 Stück)',
      price: '11,90 €',
      description: 'mit Maistortillas, Birria Pulled Beef, Rote Zwiebel-Koriander und Limetten',
      image: '/LOS TACOS/Original Birria Tacos (2 Stück).webp',
      category: 'Birria Tacos'
    },
    {
      name: 'Burritos',
      price: '11,90 €',
      description: 'mit mexikanischem Tomatenreis, Grillgemüse, Tomatenwürfeln, Eisbergsalat, Guacamole, Kidneybohnen, Cheddar und hausgemachter Sauce',
      image: '/LOS TACOS/Burritos.webp',
      category: 'Burritos'
    },
    {
      name: 'O.G. Taco Burger',
      price: '6,90 €',
      description: 'Saftiges Rindfleisch-Patty im knusprigen Taco-Style: gefüllt mit frischem Eisbergsalat, karamellisierte Zwiebeln, Cheddar und Ketchup und American Mustard',
      image: '/LOS TACOS/O.G. Taco Burger.webp',
      category: 'Taco-Burger'
    },
    {
      name: 'Mexican Nachos',
      price: '6,90 €',
      description: 'mit Mexikanischer Tomatensalsa, Guacamole, Sour Cream',
      image: '/LOS TACOS/Mexican Nachos.webp',
      category: 'Loaded Nachos'
    }
  ]

  const fingerfoodItems = [
    {
      name: 'Pommes Frites',
      price: '4,90 €',
      description: 'mit Meersalz',
      image: '/LOS TACOS/Pommes Frites.webp',
      tags: ['Vegan', 'Vegetarisch']
    },
    {
      name: 'Süßkartoffel Pommes frites',
      price: '5,90 €',
      description: '',
      image: '/LOS TACOS/Süßkartoffel Pommes frites.webp',
      tags: ['Vegan', 'Vegetarisch']
    },
    {
      name: 'Gurken Kimchi',
      price: '5,90 €',
      description: 'koreanisches Gurken-Kimchi mit gerösteten Sesam',
      image: '/LOS TACOS/Gurken Kimchi.webp',
      tags: ['Scharf']
    },
    {
      name: 'Chicken Nuggets (8 Stück)',
      price: '6,90 €',
      description: 'knusprig frittierte Hähnchen Nuggets',
      image: '/LOS TACOS/Chicken Nuggets (8 Stück).webp',
      tags: []
    },
    {
      name: 'Onion Rings (7 Stück)',
      price: '5,90 €',
      description: 'panierter Zwiebelringen',
      image: '/LOS TACOS/Onion Rings (7 Stück).webp',
      tags: ['Vegetarisch']
    },
    {
      name: 'Mozzarella Sticks (7 Stück)',
      price: '5,90 €',
      description: 'mit Kräuterpanade',
      image: '/LOS TACOS/Mozzarella Sticks (7 Stück).webp',
      tags: ['Vegetarisch']
    }
  ]

  const freshSaladsItems = [
    {
      name: 'Mexikanischer Salat',
      price: '7,90 €',
      description: 'mit Nachos, Kirschtomaten, Mais, schwarze Bohnen, Kidneybohnen, Avocado, Paprika, Olivenöl, Limettensaft',
      image: '/LOS TACOS/Mexikanischer Salat.webp',
      tags: ['Vegetarisch']
    },
    {
      name: 'Mexikanische Tomatensalsa',
      price: '4,90 €',
      description: '',
      image: '/LOS TACOS/Mexikanische Tomatensalsa.webp',
      tags: ['Vegan', 'Vegetarisch']
    }
  ]

  const birriaTacosItems = [
    {
      name: 'Original Birria Tacos (2 Stück)',
      price: '11,90 €',
      description: 'mit Maistortillas, Birria Pulled Beef, Rote Zwiebel-Koriander und Limetten',
      image: '/LOS TACOS/Original Birria Tacos (2 Stück).webp',
      tags: []
    },
    {
      name: 'Birria Ramen',
      price: '14,90 €',
      description: 'Eine tief aromatische, hausgekochte Birria-Brühe, stundenlang eingekocht wie beim klassischen Ramen. Dazu zartes Birria-Fleisch, knackiges Gemüse und perfekt gegarte Nudeln',
      image: '',
      tags: ['Scharf']
    }
  ]

  const frenchTacosItems = [
    {
      name: 'The Chicken Taco',
      price: '8,90 €',
      description: 'mit Paprika, Mais, karamellisierten Zwiebeln, Hähnchenbrustfilet, Cheddar und hausgemachter Tacosauce',
      image: '/LOS TACOS/The Chicken Taco.webp',
      tags: []
    },
    {
      name: 'Beef Taco',
      price: '8,90 €',
      description: 'mit Paprika, Mais, karamellisierten Zwiebeln, 150g Rindfleisch Patty, Cheddar und hausgemachter Tacosauce',
      image: '/LOS TACOS/Beef Taco.webp',
      tags: []
    },
    {
      name: 'Pulled Pork Taco',
      price: '8,90 €',
      description: 'mit Paprika, Mais, karamellisierten Zwiebeln, Pulled Pork, Barbecue-Limettensauce, Cheddar und hausgemachter Tacosauce',
      image: '/LOS TACOS/Pulled Pork Taco.webp',
      tags: []
    },
    {
      name: 'Falafel Taco',
      price: '8,90 €',
      description: 'mit Paprika, Mais, karamellisierten Zwiebeln, Mozzarella, Falafel, veganem Käse und hausgemachter Tacosauce',
      image: '/LOS TACOS/Falafel Taco.webp',
      tags: ['Vegetarisch']
    }
  ]

  const tacoBurgerItems = [
    {
      name: 'O.G. Taco Burger',
      price: '6,90 €',
      description: 'Saftiges Rindfleisch-Patty im knusprigen Taco-Style: gefüllt mit frischem Eisbergsalat, karamellisierte Zwiebeln, Cheddar und Ketchup und American Mustard',
      image: '/LOS TACOS/O.G. Taco Burger.webp',
      tags: []
    },
    {
      name: 'BBQ-Bacon Taco-Burger',
      price: '6,90 €',
      description: 'Saftiges Rindfleisch-Patty im knusprigen Taco-Style: gefüllt mit frischem Eisbergsalat, karamellisierte Zwiebeln, Cheddar, knusprigen Bacon und BBQ-Sauce',
      image: '/LOS TACOS/BBQ-Bacon Taco-Burger.webp',
      tags: []
    },
    {
      name: 'Chili-Cheese Taco-Burger',
      price: '6,90 €',
      description: 'Saftiges Rindfleisch-Patty im knusprigen Taco-Style: gefüllt mit frischem Eisbergsalat, karamellisierte Zwiebeln, Cheddar, homemade Chili-Chutney, frischen Peperoni und hauseigener Sauce',
      image: '/LOS TACOS/Chili-Cheese Taco-Burger.webp',
      tags: ['Scharf']
    },
    {
      name: 'Trüffel Parmesan Taco-Burger',
      price: '7,90 €',
      description: 'Saftiges Rindfleisch-Patty im knusprigen Taco-Style: gefüllt mit frischem Eisbergsalat, karamellisierte Zwiebeln, Cheddar, gehobeltem Parmesan und Trüffelmayonnaise',
      image: '/LOS TACOS/Trüffel Parmesan Taco-Burger.webp',
      tags: []
    }
  ]

  const burritosItems = [
    {
      name: 'Burritos',
      price: '11,90 €',
      description: 'mit mexikanischem Tomatenreis, Grillgemüse, Tomatenwürfeln, Eisbergsalat, Guacamole, Kidneybohnen, Cheddar und hausgemachter Sauce',
      image: '/LOS TACOS/Burritos.webp',
      tags: []
    }
  ]

  const loadedNachosItems = [
    {
      name: 'Mexican Nachos',
      price: '6,90 €',
      description: 'mit Mexikanischer Tomatensalsa, Guacamole, Sour Cream',
      image: '/LOS TACOS/Mexican Nachos.webp',
      tags: []
    }
  ]

  const dessertsItems = [
    {
      name: 'Hausgemachter Banana Pudding',
      price: '5,90 €',
      description: 'mit frischen Bananenscheiben, luftiger Vanillecreme und Eierkeksschichten, liebevoll geschichtet',
      image: '/LOS TACOS/Hausgemachter Banana Pudding.webp',
      tags: ['Vegetarisch']
    },
    {
      name: 'Hausgemachter Mango Cheesecake',
      price: '5,90 €',
      description: 'mit Butterkeksboden',
      image: '/LOS TACOS/Hausgemachter Mango Cheesecake.webp',
      tags: ['Vegetarisch']
    },
    {
      name: 'Hausgemachte Creme Brulee',
      price: '5,90 €',
      description: '',
      image: '/LOS TACOS/Hausgemachte Creme Brulee.webp',
      tags: ['Vegetarisch']
    }
  ]

  const alkoholfreieGetraenkeItems = [
    {
      name: 'Lycheenektar 0,25l (EINWEG)',
      price: '2,95 €',
      description: '',
      image: '/PIZZA TIME/Lycheenektar 0,25l (EINWEG).webp',
      additionalInfo: 'zzgl. 0,25 € Pfand',
      tags: []
    },
    {
      name: 'Coca-Cola 0,33l (MEHRWEG)',
      price: '3,35 €',
      description: 'koffeinhaltig',
      image: '/PIZZA TIME/Coca-Cola 0,33l (MEHRWEG).webp',
      additionalInfo: 'zzgl. 0,15 € Pfand, 10,15 €/l, 10% vol, Enthält Koffein',
      tags: []
    },
    {
      name: 'Coca-Cola Zero Sugar 0,33l (MEHRWEG)',
      price: '3,35 €',
      description: 'koffeinhaltig',
      image: '/PIZZA TIME/Coca-Cola Zero Sugar 0,33l (MEHRWEG).webp',
      additionalInfo: 'zzgl. 0,15 € Pfand, 10,15 €/l, 10% vol, Enthält Koffein',
      tags: []
    },
    {
      name: 'fritz-kola® 0,33l (MEHRWEG)',
      price: '3,42 €',
      description: 'koffeinhaltig, 25 mg/100 ml',
      image: '/PIZZA TIME/fritz-kola® 0,33l (MEHRWEG).webp',
      additionalInfo: 'zzgl. 0,08 € Pfand, 10,36 €/l, 10% vol, Enthält Koffein',
      tags: []
    },
    {
      name: 'fritz-limo® Zitrone 0,33l (MEHRWEG)',
      price: '3,42 €',
      description: '',
      image: '/PIZZA TIME/fritz-limo® Zitrone 0,33l (MEHRWEG).webp',
      additionalInfo: 'zzgl. 0,08 € Pfand, 10,36 €/l, 10% vol',
      tags: []
    },
    {
      name: 'fritz-limo® Orange 0,33l (MEHRWEG)',
      price: '3,42 €',
      description: '',
      image: '/PIZZA TIME/fritz-limo® Orange 0,33l (MEHRWEG).webp',
      additionalInfo: 'zzgl. 0,08 € Pfand, 10,36 €/l, 10% vol',
      tags: []
    },
    {
      name: 'fritz-limo® Apfel-Kirsch-Holunder 0,33l (MEHRWEG)',
      price: '3,42 €',
      description: '',
      image: '/PIZZA TIME/fritz-limo® Apfel-Kirsch-Holunder 0,33l (MEHRWEG).webp',
      additionalInfo: 'zzgl. 0,08 € Pfand, 10,36 €/l, 10% vol',
      tags: []
    },
    {
      name: 'fritz-spritz® bio-apfelschorle 0,33l (MEHRWEG)',
      price: '3,42 €',
      description: '',
      image: '/PIZZA TIME/fritz-spritz® bio-apfelschorle 0,33l (MEHRWEG).webp',
      additionalInfo: 'zzgl. 0,08 € Pfand, 10,36 €/l, 10% vol',
      tags: []
    },
    {
      name: 'fritz-spritz® Bio-Apfelschorle 0,33l (MEHRWEG)',
      price: '3,42 €',
      description: '',
      image: '/PIZZA TIME/fritz-spritz® Bio-Apfelschorle 0,33l (MEHRWEG).webp',
      additionalInfo: 'zzgl. 0,08 € Pfand, 10,36 €/l, 10% vol',
      tags: []
    },
    {
      name: 'MISCHMASCH® fritz-kola® mit orange 0,33l (MEHRWEG)',
      price: '3,42 €',
      description: '',
      image: '/PIZZA TIME/MISCHMASCH® fritz-kola® mit orange 0,33l (MEHRWEG).webp',
      additionalInfo: 'zzgl. 0,08 € Pfand, 10,36 €/l, 10% vol',
      tags: []
    },
    {
      name: 'Rauch Eistee Pfirsich 0,33l (MEHRWEG)',
      price: '3,35 €',
      description: '',
      image: '/PIZZA TIME/Rauch Eistee Pfirsich 0,33l (MEHRWEG).webp',
      additionalInfo: 'zzgl. 0,25 € Pfand, 10,15 €/l, 10% vol',
      tags: []
    },
    {
      name: 'Rauch Eistee Zitrone 0,33l (MEHRWEG)',
      price: '3,35 €',
      description: '',
      image: '/PIZZA TIME/Rauch Eistee Zitrone 0,33l (MEHRWEG).webp',
      additionalInfo: 'zzgl. 0,25 € Pfand, 10,15 €/l, 10% vol',
      tags: []
    },
    {
      name: 'Rauch Eistee Kirsche 0,33l (MEHRWEG)',
      price: '3,35 €',
      description: '',
      image: '/PIZZA TIME/Rauch Eistee Kirsche 0,33l (MEHRWEG).webp',
      additionalInfo: 'zzgl. 0,25 € Pfand, 10,15 €/l, 10% vol',
      tags: []
    },
    {
      name: 'Rauch Eistee Granatapfel 0,33l (MEHRWEG)',
      price: '3,35 €',
      description: '',
      image: '/PIZZA TIME/Rauch Eistee Granatapfel 0,33l (MEHRWEG).webp',
      additionalInfo: 'zzgl. 0,25 € Pfand, 10,15 €/l, 10% vol',
      tags: []
    },
    {
      name: 'Aqua Morelli Wasser Still 0,25l (MEHRWEG).webp',
      price: '2,85 €',
      description: '',
      image: '/PIZZA TIME/Aqua Morelli Wasser Still 0,25l (MEHRWEG).webp',
      additionalInfo: 'zzgl. Pfand (0,15 €) 0,25l, 11,40 €/1l',
      tags: []
    },
    {
      name: 'Aqua Morelli Mineralwasser Sprudel 0,25l (MEHRWEG).webp',
      price: '2,85 €',
      description: '',
      image: '/PIZZA TIME/Aqua Morelli Mineralwasser Sprudel 0,25l (MEHRWEG).webp',
      additionalInfo: 'zzgl. Pfand (0,15 €) 0,25l, 11,40 €/1l',
      tags: []
    },
    {
      name: 'Becks Blue alkoholfrei 0,33l (MEHRWEG)',
      price: '3,42 €',
      description: 'Alkoholfreies Bier',
      image: '/PIZZA TIME/Becks Blue alkoholfrei 0,33l (MEHRWEG).webp',
      additionalInfo: 'zzgl. 0,08 € Pfand, 10,36 €/l, <0,5% vol',
      tags: []
    },
    {
      name: 'Franziskaner Weissbier alkoholfrei 0,33l (MEHRWEG).webp',
      price: '3,42 €',
      description: '',
      image: '/PIZZA TIME/Franziskaner Weissbier alkoholfrei 0,33l (MEHRWEG).webp',
      additionalInfo: 'zzgl. 0,08 € Pfand, 6,84 €/l, 0,4% vol',
      tags: []
    }
  ]

  const alkoholischeGetraenkeItems = [
    {
      name: 'Corona Extra 0,33l (MEHRWEG)',
      price: '3,72 €',
      description: '',
      image: '/HIRO BURGER/Corona Extra 0,33lAltersbeschränkung.webp',
      additionalInfo: 'zzgl. Pfand (0,08 €), 4,5% vol, 0,33l, 11,27 €/1l',
      tags: []
    },
    {
      name: 'Saigon Premium 0,33l (MEHRWEG)',
      price: '3,72 €',
      description: '',
      image: '/PIZZA TIME/Saigon Premium 0,33l (MEHRWEG).webp',
      additionalInfo: 'zzgl. Pfand (0,08 €), 4,8% vol, 0,33l, 11,27 €/1l',
      tags: []
    },
    {
      name: 'Asahi 0,33l (MEHRWEG)',
      price: '3,72 €',
      description: '',
      image: '/PIZZA TIME/Asahi 0,33l (MEHRWEG).webp',
      additionalInfo: 'zzgl. Pfand (0,08 €), 5,2% vol, 0,33l, 11,27 €/1l',
      tags: []
    },
    {
      name: 'Tsingtao 0,33l (MEHRWEG)',
      price: '3,72 €',
      description: '',
      image: '/PIZZA TIME/Tsingtao 0,33l (MEHRWEG).webp',
      additionalInfo: 'zzgl. Pfand (0,08 €), 4,7% vol, 0,33l, 11,27 €/1l',
      tags: []
    },
    {
      name: 'Kirin Ichiban 0,33l (MEHRWEG)',
      price: '3,72 €',
      description: '',
      image: '/PIZZA TIME/Kirin Ichiban 0,33l (MEHRWEG).webp',
      additionalInfo: 'zzgl. Pfand (0,08 €), 5% vol, 0,33l, 11,27 €/1l',
      tags: []
    }
  ]

  const categories = [
    'Beliebt',
    'Fingerfood',
    'Fresh Salads',
    'Birria Tacos',
    'French Tacos',
    'Taco-Burger',
    'Burritos',
    'Loaded Nachos',
    'Desserts',
    'Alkoholfreie Getränke',
    'Alkoholische Getränke'
  ]

  // Get all items for search
  const allItems = [
    ...beliebteItems.map(item => ({ ...item, section: 'Beliebt' })),
    ...fingerfoodItems.map(item => ({ ...item, section: 'Fingerfood' })),
    ...freshSaladsItems.map(item => ({ ...item, section: 'Fresh Salads' })),
    ...birriaTacosItems.map(item => ({ ...item, section: 'Birria Tacos' })),
    ...frenchTacosItems.map(item => ({ ...item, section: 'French Tacos' })),
    ...tacoBurgerItems.map(item => ({ ...item, section: 'Taco-Burger' })),
    ...burritosItems.map(item => ({ ...item, section: 'Burritos' })),
    ...loadedNachosItems.map(item => ({ ...item, section: 'Loaded Nachos' })),
    ...dessertsItems.map(item => ({ ...item, section: 'Desserts' })),
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
    <div className="min-h-screen" style={{ backgroundImage: 'url("/HIRO BURGER/Hiro_bg.png")', backgroundRepeat: 'repeat', backgroundSize: '200px' }}>
      {/* Header */}
      <header className="bg-white shadow-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          {/* Restaurant Name and Rating - Only show when not scrolled */}
          <div className={`overflow-hidden transition-all duration-300 ${isScrolled ? 'max-h-0 opacity-0' : 'max-h-24 opacity-100'}`}>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-6">
                <a href="/" className="group bg-white rounded-xl shadow-lg border-4 border-[#CC0000] h-16 w-16 overflow-hidden transition-all duration-300 hover:shadow-[0_0_20px_rgba(204,0,0,0.6)] hover:border-[#FF2900] hover:scale-105 cursor-pointer p-1">
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
                  <h1 className="text-3xl font-bold text-gray-900">Los Tacos</h1>
                  <div className="flex items-center gap-2 mt-2">
                    <span className="text-orange-500">★</span>
                    <span className="text-sm font-semibold text-gray-700">4,1 (160+)</span>
                  </div>
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
                placeholder="Suche Los Tacos"
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
                    className="bg-white rounded-lg shadow-sm hover:shadow-md transition-all duration-300 cursor-pointer border-2 border-transparent hover:border-[#CC0000] p-4"
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
                          <span className="text-lg text-orange-500">+</span>
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
            {/* Beliebt Section */}
            <section id="beliebt" className="mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-6 bg-white px-4 py-2 rounded-lg inline-block shadow-sm border-2 border-transparent hover:border-[#CC0000] hover:shadow-md transition-all duration-300 cursor-pointer">Beliebt</h2>

              {/* Scrollable Carousel */}
              <div className="relative">
                {/* Left Arrow */}
                <button
                  onClick={scrollLeft}
                  className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white shadow-lg rounded-full p-3 hover:bg-gray-100 transition-colors -ml-4"
                >
                  <span className="text-2xl text-gray-700">‹</span>
                </button>

                {/* Carousel Container */}
                <div
                  ref={scrollContainerRef}
                  className="flex gap-6 overflow-x-auto scrollbar-hide scroll-smooth"
                  style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
                >
                  {beliebteItems.map((item) => (
                    <div
                      key={item.name}
                      onClick={() => openModal(item)}
                      className="flex-shrink-0 w-72 bg-white rounded-xl shadow-md hover:shadow-lg transition-all duration-300 cursor-pointer border-2 border-transparent hover:border-[#CC0000]"
                    >
                      <div className="p-4">
                        <div className="flex gap-3">
                          {/* Image */}
                          <div className="relative w-24 h-24 flex-shrink-0 bg-orange-50 rounded-lg overflow-hidden">
                            <Image
                              src={item.image}
                              alt={item.name}
                              fill
                              className="object-cover"
                            />
                          </div>

                          {/* Content */}
                          <div className="flex-1 flex flex-col">
                            <div className="text-xs text-red-600 font-semibold mb-0.5">{item.category}</div>
                            <h3 className="font-bold text-gray-900 text-base leading-tight mb-1">{item.name}</h3>
                            <button className="ml-auto mt-auto bg-white border-2 border-gray-300 rounded-full p-1.5 hover:bg-gray-50 transition-colors">
                              <span className="text-lg">+</span>
                            </button>
                          </div>
                        </div>

                        {/* Price and Description */}
                        <div className="mt-3">
                          <div className="font-bold text-gray-900 text-base mb-1">{item.price}</div>
                          <p className="text-xs text-gray-600 line-clamp-2 leading-relaxed">{item.description}</p>
                          <button className="text-xs text-gray-700 hover:text-gray-900 mt-1 underline">
                            Produktinfo
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Right Arrow */}
                <button
                  onClick={scrollRight}
                  className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white shadow-lg rounded-full p-3 hover:bg-gray-100 transition-colors -mr-4"
                >
                  <span className="text-2xl text-gray-700">›</span>
                </button>
              </div>
            </section>

            {/* Fingerfood Section */}
            <section id="fingerfood" className="mb-12">
              <div className="flex items-center justify-between mb-6 bg-white px-4 py-3 rounded-lg shadow-sm border-2 border-transparent hover:border-[#CC0000] hover:shadow-md transition-all duration-300 cursor-pointer">
                <h2 className="text-3xl font-bold text-gray-900">Fingerfood</h2>
                <span className="text-gray-600 font-semibold">6 Artikel</span>
              </div>

              {/* Grid Layout */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {fingerfoodItems.map((item) => (
                  <div
                    key={item.name}
                    onClick={() => openModal(item)}
                    className="bg-white rounded-lg shadow-sm hover:shadow-md transition-all duration-300 cursor-pointer border-2 border-transparent hover:border-[#CC0000] p-4"
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
                            {item.tags.map((tag) => (
                              <span
                                key={tag}
                                className={`px-2.5 py-0.5 rounded-full text-xs font-semibold ${
                                  tag === 'Vegan' || tag === 'Vegetarisch'
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
                          <span className="text-lg text-orange-500">+</span>
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

            {/* Fresh Salads Section */}
            <section id="fresh-salads" className="mb-12">
              <div className="flex items-center justify-between mb-6 bg-white px-4 py-3 rounded-lg shadow-sm border-2 border-transparent hover:border-[#CC0000] hover:shadow-md transition-all duration-300 cursor-pointer">
                <h2 className="text-3xl font-bold text-gray-900">Fresh Salads</h2>
                <span className="text-gray-600 font-semibold">2 Artikel</span>
              </div>

              {/* Grid Layout */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {freshSaladsItems.map((item) => (
                  <div
                    key={item.name}
                    onClick={() => openModal(item)}
                    className="bg-white rounded-lg shadow-sm hover:shadow-md transition-all duration-300 cursor-pointer border-2 border-transparent hover:border-[#CC0000] p-4"
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
                            {item.tags.map((tag) => (
                              <span
                                key={tag}
                                className={`px-2.5 py-0.5 rounded-full text-xs font-semibold ${
                                  tag === 'Vegan' || tag === 'Vegetarisch'
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
                          <span className="text-lg text-orange-500">+</span>
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

            {/* Birria Tacos Section */}
            <section id="birria-tacos" className="mb-12">
              <div className="mb-6 bg-white px-4 py-3 rounded-lg shadow-sm border-2 border-transparent hover:border-[#CC0000] hover:shadow-md transition-all duration-300 cursor-pointer">
                <div className="flex items-center justify-between mb-2">
                  <h2 className="text-3xl font-bold text-gray-900">Birria Tacos</h2>
                  <span className="text-gray-600 font-semibold">2 Artikel</span>
                </div>
                <p className="text-sm text-gray-600">Zartes Rind, voller Geschmack Unsere legendären Birria-Tacos sind ein echter Streetfood-Hit: mit zart geschmortem Rindfleisch, langsam in einer würzigen Chili-Gewürzmarinade gegart, serviert in knusprig angebratenen Maistortillas. Dazu gibt's reichlich geschmolzenen Käse, frische Zwiebeln, Koriander und natürlich den originalen Birria-Dip zum Eintunken - heiß, deftig, unwiderstehlich!</p>
              </div>

              {/* Grid Layout */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {birriaTacosItems.map((item) => (
                  <div
                    key={item.name}
                    onClick={() => openModal(item)}
                    className="bg-white rounded-lg shadow-sm hover:shadow-md transition-all duration-300 cursor-pointer border-2 border-transparent hover:border-[#CC0000] p-4"
                  >
                    {item.image === '' ? (
                      // Special layout for items without images
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <h3 className="font-bold text-gray-900 text-base mb-1">{item.name}</h3>
                          <button className="text-xs text-gray-700 hover:text-gray-900 underline mb-2">
                            Produktinfo
                          </button>
                          <div className="font-bold text-gray-900 text-base mb-2">{item.price}</div>
                          <p className="text-xs text-gray-600 mb-2">{item.description}</p>

                          {/* Tags */}
                          {item.tags.length > 0 && (
                            <div className="flex gap-1.5 flex-wrap">
                              {item.tags.map((tag) => (
                                <span
                                  key={tag}
                                  className={`px-2.5 py-0.5 rounded-full text-xs font-semibold ${
                                    tag === 'Vegan' || tag === 'Vegetarisch'
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
                        <button className="bg-white border-2 border-gray-300 rounded-full p-1.5 hover:bg-gray-50 transition-colors ml-4">
                          <span className="text-lg text-orange-500">+</span>
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
                          <div className="font-bold text-gray-900 text-base mb-2">{item.price}</div>
                          <p className="text-xs text-gray-600 mb-2 line-clamp-2">{item.description}</p>

                          {/* Tags */}
                          {item.tags.length > 0 && (
                            <div className="flex gap-1.5 flex-wrap">
                              {item.tags.map((tag) => (
                                <span
                                  key={tag}
                                  className={`px-2.5 py-0.5 rounded-full text-xs font-semibold ${
                                    tag === 'Vegan' || tag === 'Vegetarisch'
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
                            <span className="text-lg text-orange-500">+</span>
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

            {/* French Tacos Section */}
            <section id="french-tacos" className="mb-12">
              <div className="mb-6 bg-white px-4 py-3 rounded-lg shadow-sm border-2 border-transparent hover:border-[#CC0000] hover:shadow-md transition-all duration-300 cursor-pointer">
                <div className="flex items-center justify-between mb-2">
                  <h2 className="text-3xl font-bold text-gray-900">French Tacos</h2>
                  <span className="text-gray-600 font-semibold">4 Artikel</span>
                </div>
                <p className="text-sm text-gray-600">Alle French Tacos werden mit Pommes frites zubereitet.</p>
              </div>

              {/* Grid Layout */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {frenchTacosItems.map((item) => (
                  <div
                    key={item.name}
                    onClick={() => openModal(item)}
                    className="bg-white rounded-lg shadow-sm hover:shadow-md transition-all duration-300 cursor-pointer border-2 border-transparent hover:border-[#CC0000] p-4"
                  >
                    <div className="flex gap-4 items-start">
                      {/* Left Side - Content */}
                      <div className="flex-1">
                        <h3 className="font-bold text-gray-900 text-base mb-1">{item.name}</h3>
                        <button className="text-xs text-gray-700 hover:text-gray-900 underline mb-2">
                          Produktinfo
                        </button>
                        <div className="font-bold text-gray-900 text-base mb-2">{item.price}</div>
                        <p className="text-xs text-gray-600 mb-2 line-clamp-2">{item.description}</p>

                        {/* Tags */}
                        {item.tags.length > 0 && (
                          <div className="flex gap-1.5 flex-wrap">
                            {item.tags.map((tag) => (
                              <span
                                key={tag}
                                className={`px-2.5 py-0.5 rounded-full text-xs font-semibold ${
                                  tag === 'Vegan' || tag === 'Vegetarisch'
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
                          <span className="text-lg text-orange-500">+</span>
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

            {/* Taco-Burger Section */}
            <section id="taco-burger" className="mb-12">
              <div className="flex items-center justify-between mb-6 bg-white px-4 py-3 rounded-lg shadow-sm border-2 border-transparent hover:border-[#CC0000] hover:shadow-md transition-all duration-300 cursor-pointer">
                <h2 className="text-3xl font-bold text-gray-900">Taco-Burger</h2>
                <span className="text-gray-600 font-semibold">4 Artikel</span>
              </div>

              {/* Grid Layout */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {tacoBurgerItems.map((item) => (
                  <div
                    key={item.name}
                    onClick={() => openModal(item)}
                    className="bg-white rounded-lg shadow-sm hover:shadow-md transition-all duration-300 cursor-pointer border-2 border-transparent hover:border-[#CC0000] p-4"
                  >
                    <div className="flex gap-4 items-start">
                      {/* Left Side - Content */}
                      <div className="flex-1">
                        <h3 className="font-bold text-gray-900 text-base mb-1">{item.name}</h3>
                        <button className="text-xs text-gray-700 hover:text-gray-900 underline mb-2">
                          Produktinfo
                        </button>
                        <div className="font-bold text-gray-900 text-base mb-2">{item.price}</div>
                        <p className="text-xs text-gray-600 mb-2 line-clamp-2">{item.description}</p>

                        {/* Tags */}
                        {item.tags.length > 0 && (
                          <div className="flex gap-1.5 flex-wrap">
                            {item.tags.map((tag) => (
                              <span
                                key={tag}
                                className={`px-2.5 py-0.5 rounded-full text-xs font-semibold ${
                                  tag === 'Vegan' || tag === 'Vegetarisch'
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
                          <span className="text-lg text-orange-500">+</span>
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

            {/* Burritos Section */}
            <section id="burritos" className="mb-12">
              <div className="mb-6 bg-white px-4 py-3 rounded-lg shadow-sm border-2 border-transparent hover:border-[#CC0000] hover:shadow-md transition-all duration-300 cursor-pointer">
                <div className="flex items-center justify-between mb-2">
                  <h2 className="text-3xl font-bold text-gray-900">Burritos</h2>
                  <span className="text-gray-600 font-semibold">1 Artikel</span>
                </div>
                <p className="text-sm text-gray-600">Alle Burritos werden mit einem Protein nach Wahl zubereitet.</p>
              </div>

              {/* Grid Layout */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {burritosItems.map((item) => (
                  <div
                    key={item.name}
                    onClick={() => openModal(item)}
                    className="bg-white rounded-lg shadow-sm hover:shadow-md transition-all duration-300 cursor-pointer border-2 border-transparent hover:border-[#CC0000] p-4"
                  >
                    <div className="flex gap-4 items-start">
                      {/* Left Side - Content */}
                      <div className="flex-1">
                        <h3 className="font-bold text-gray-900 text-base mb-1">{item.name}</h3>
                        <button className="text-xs text-gray-700 hover:text-gray-900 underline mb-2">
                          Produktinfo
                        </button>
                        <div className="font-bold text-gray-900 text-base mb-2">{item.price}</div>
                        <p className="text-xs text-gray-600 mb-2 line-clamp-2">{item.description}</p>

                        {/* Tags */}
                        {item.tags.length > 0 && (
                          <div className="flex gap-1.5 flex-wrap">
                            {item.tags.map((tag) => (
                              <span
                                key={tag}
                                className={`px-2.5 py-0.5 rounded-full text-xs font-semibold ${
                                  tag === 'Vegan' || tag === 'Vegetarisch'
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
                          <span className="text-lg text-orange-500">+</span>
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

            {/* Loaded Nachos Section */}
            <section id="loaded-nachos" className="mb-12">
              <div className="flex items-center justify-between mb-6 bg-white px-4 py-3 rounded-lg shadow-sm border-2 border-transparent hover:border-[#CC0000] hover:shadow-md transition-all duration-300 cursor-pointer">
                <h2 className="text-3xl font-bold text-gray-900">Loaded Nachos</h2>
                <span className="text-gray-600 font-semibold">1 Artikel</span>
              </div>

              {/* Grid Layout */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {loadedNachosItems.map((item) => (
                  <div
                    key={item.name}
                    onClick={() => openModal(item)}
                    className="bg-white rounded-lg shadow-sm hover:shadow-md transition-all duration-300 cursor-pointer border-2 border-transparent hover:border-[#CC0000] p-4"
                  >
                    <div className="flex gap-4 items-start">
                      {/* Left Side - Content */}
                      <div className="flex-1">
                        <h3 className="font-bold text-gray-900 text-base mb-1">{item.name}</h3>
                        <button className="text-xs text-gray-700 hover:text-gray-900 underline mb-2">
                          Produktinfo
                        </button>
                        <div className="font-bold text-gray-900 text-base mb-2">{item.price}</div>
                        <p className="text-xs text-gray-600 mb-2 line-clamp-2">{item.description}</p>

                        {/* Tags */}
                        {item.tags.length > 0 && (
                          <div className="flex gap-1.5 flex-wrap">
                            {item.tags.map((tag) => (
                              <span
                                key={tag}
                                className={`px-2.5 py-0.5 rounded-full text-xs font-semibold ${
                                  tag === 'Vegan' || tag === 'Vegetarisch'
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
                          <span className="text-lg text-orange-500">+</span>
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

            {/* Desserts Section */}
            <section id="desserts" className="mb-12">
              <div className="flex items-center justify-between mb-6 bg-white px-4 py-3 rounded-lg shadow-sm border-2 border-transparent hover:border-[#CC0000] hover:shadow-md transition-all duration-300 cursor-pointer">
                <h2 className="text-3xl font-bold text-gray-900">Desserts</h2>
                <span className="text-gray-600 font-semibold">3 Artikel</span>
              </div>

              {/* Grid Layout */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {dessertsItems.map((item) => (
                  <div
                    key={item.name}
                    onClick={() => openModal(item)}
                    className="bg-white rounded-lg shadow-sm hover:shadow-md transition-all duration-300 cursor-pointer border-2 border-transparent hover:border-[#CC0000] p-4"
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
                            {item.tags.map((tag) => (
                              <span
                                key={tag}
                                className={`px-2.5 py-0.5 rounded-full text-xs font-semibold ${
                                  tag === 'Vegan' || tag === 'Vegetarisch'
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
                          <span className="text-lg text-orange-500">+</span>
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

            {/* Alkoholfreie Getränke Section */}
            <section id="alkoholfreie-getränke" className="mb-12">
              <div className="flex items-center justify-between mb-6 bg-white px-4 py-3 rounded-lg shadow-sm border-2 border-transparent hover:border-[#CC0000] hover:shadow-md transition-all duration-300 cursor-pointer">
                <h2 className="text-3xl font-bold text-gray-900">Alkoholfreie Getränke</h2>
                <span className="text-gray-600 font-semibold">18 Artikel</span>
              </div>

              {/* Grid Layout */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {alkoholfreieGetraenkeItems.map((item) => (
                  <div
                    key={item.name}
                    onClick={() => openModal(item)}
                    className="bg-white rounded-lg shadow-sm hover:shadow-md transition-all duration-300 cursor-pointer border-2 border-transparent hover:border-[#CC0000] p-4"
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
                        {item.additionalInfo && (
                          <p className="text-xs text-gray-500 mb-2">{item.additionalInfo}</p>
                        )}

                        {/* Tags */}
                        {item.tags.length > 0 && (
                          <div className="flex gap-1.5 flex-wrap">
                            {item.tags.map((tag) => (
                              <span
                                key={tag}
                                className={`px-2.5 py-0.5 rounded-full text-xs font-semibold ${
                                  tag === 'Vegan' || tag === 'Vegetarisch'
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
                          <span className="text-lg text-orange-500">+</span>
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

            {/* Alkoholische Getränke Section */}
            <section id="alkoholische-getränke" className="mb-12">
              <div className="flex items-center justify-between mb-6 bg-white px-4 py-3 rounded-lg shadow-sm border-2 border-transparent hover:border-[#CC0000] hover:shadow-md transition-all duration-300 cursor-pointer">
                <h2 className="text-3xl font-bold text-gray-900">Alkoholische Getränke</h2>
                <span className="text-gray-600 font-semibold">5 Artikel</span>
              </div>

              {/* Grid Layout */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {alkoholischeGetraenkeItems.map((item) => (
                  <div
                    key={item.name}
                    onClick={() => openModal(item)}
                    className="bg-white rounded-lg shadow-sm hover:shadow-md transition-all duration-300 cursor-pointer border-2 border-transparent hover:border-[#CC0000] p-4"
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
                        {item.additionalInfo && (
                          <p className="text-xs text-gray-500 mb-2">{item.additionalInfo}</p>
                        )}

                        {/* Tags */}
                        {item.tags.length > 0 && (
                          <div className="flex gap-1.5 flex-wrap">
                            {item.tags.map((tag) => (
                              <span
                                key={tag}
                                className={`px-2.5 py-0.5 rounded-full text-xs font-semibold ${
                                  tag === 'Vegan' || tag === 'Vegetarisch'
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
                          <span className="text-lg text-orange-500">+</span>
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

export default function LosTacosPage() {
  return <LosTacosContent />
}
