'use client'

import Image from 'next/image'
import { useRef, useState, useEffect } from 'react'
import ItemModal from '../components/ItemModal'
import CartBanner from '../components/CartBanner'

function BowliciousContent() {
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
        'vorspeisen',
        'mac-and-cheese-bowls',
        'salate',
        'mix-your-own-bowl',
        'frischetheke-s-favourite-bowls',
        'sashimi',
        'saucen'
      ]

      const categoryNames = [
        'Beliebt',
        'Vorspeisen',
        'Mac & Cheese Bowls',
        'Salate',
        'Mix Your Own Bowl',
        "Frischetheke's Favourite Bowls",
        'Sashimi',
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
    return category.toLowerCase().replace(/\s+/g, '-').replace(/&/g, 'and').replace(/'/g, '-')
  }

  const beliebteItems = [
    {
      name: 'Favourite Mac & Cheese Bowl',
      price: '11,90 €',
      description: 'cremige, käsige Mac & Cheese Bowl mit Crispy Chicken, Coleslaw, hausgemachte Sauce und mit Röstzwiebeln verfeinert',
      image: '/BOWLICIOUS/Favourite Mac & Cheese Bowl.webp',
      category: 'Mac & Cheese Bowls'
    },
    {
      name: 'Yakitori Chicken Bowl',
      price: '12,90 €',
      description: 'mit Yakitori Hähnchen, Gurken, Mais, Paprika, Avocado, Tomaten-Salsa, Röstzwiebeln, Erdnüssen, Lauchzwiebeln, Sesam',
      image: '/BOWLICIOUS/Yakitori Chicken Bowl.webp',
      category: "Frischetheke's Favourite Bowls"
    },
    {
      name: 'Lachs Bowl',
      price: '12,90 €',
      description: 'mit Lachs, Gurken, Edamame, Avocado, Tomaten-Salsa, Mais, Tobiko, Lauchzwiebeln, Sesam, Sushi-Ingwer und wasabi-Nüsse',
      image: '/BOWLICIOUS/Lachs Bowl.webp',
      category: "Frischetheke's Favourite Bowls"
    },
    {
      name: 'Gebackene Gyoza (4 Stück)',
      price: '5,90 €',
      description: 'japanische gebackene Teigtaschen gefüllt mit Hähnchentartar und Gemüse',
      image: '/BOWLICIOUS/Gebackene Gyoza (4 Stück).webp',
      category: 'Vorspeisen'
    },
    {
      name: 'Vegetarische Mini-Frühlingsrollen (8 Stück)',
      price: '5,90 €',
      description: 'gefüllt mit Gemüse',
      image: '/BOWLICIOUS/Vegetarische Mini-Frühlingsrollen (8 Stück).webp',
      category: 'Vorspeisen'
    }
  ]

  const vorspeisen = [
    {
      name: 'Vegetarische Mini-Frühlingsrollen (8 Stück)',
      price: '5,90 €',
      description: 'gefüllt mit Gemüse',
      image: '/BOWLICIOUS/Vegetarische Mini-Frühlingsrollen (8 Stück).webp',
      tags: ['Vegetarisch']
    },
    {
      name: 'knusprige Frühlingsrollen (3 Stück)',
      price: '6,90 €',
      description: 'hausgemachte knusprige Frühlingsrollen gefüllt mit Hackfleisch, Glasnudeln, Morcheln, frischem Gemüse und Sweet-Chillisauce',
      image: '/BOWLICIOUS/knusprige Frühlingsrollen (3 Stück).webp',
      tags: []
    },
    {
      name: 'Gebackene Wantan (4 Stück)',
      price: '5,90 €',
      description: 'hausgemachte knusprige Teigtaschen gefüllt mit Hackfleisch, Garnelentartar, frischen Kräutern und Sweet-Chilisauce',
      image: '/BOWLICIOUS/Gebackene Wantan (4 Stück).webp',
      tags: []
    },
    {
      name: 'Gebackene Garnelen (4 Stück)',
      price: '7,90 €',
      description: 'knusprige Großgarnelen in Pankomehl, serviert mit Sweet-Chilisauce',
      image: '/BOWLICIOUS/Gebackene Garnelen (4 Stück).webp',
      tags: []
    },
    {
      name: 'Gebackene Gyoza (4 Stück)',
      price: '5,90 €',
      description: 'japanische gebackene Teigtaschen gefüllt mit Hähnchentartar und Gemüse',
      image: '/BOWLICIOUS/Gebackene Gyoza (4 Stück).webp',
      tags: []
    },
    {
      name: 'Vegetarische Gyoza (4 Stück)',
      price: '5,90 €',
      description: 'japanische gebackene Teigtaschen gefüllt mit Spinat und Gemüse',
      image: '/BOWLICIOUS/Vegetarische Gyoza (4 Stück).webp',
      tags: ['Vegetarisch']
    },
    {
      name: 'Sommerrollen mit Garnelen (2 Stück)',
      price: '6,90 €',
      description: 'mit Reisnudeln, frischem Salat, Nom, Gurken und Koriander, umwickelt von Reispapier, serviert mit hausgemachter Hoisin-Sauce',
      image: '/BOWLICIOUS/Sommerrollen mit Garnelen (2 Stück).webp',
      tags: []
    },
    {
      name: 'Sommerrollen mit Tofu (2 Stück)',
      price: '5,90 €',
      description: 'mit Reisnudeln, frischem Salat, Nom, Gurken und Koriander, umwickelt von Reispapier, serviert mit hausgemachter Hoisin-Sauce',
      image: '/BOWLICIOUS/Sommerrollen mit Tofu (2 Stück).webp',
      tags: ['Vegetarisch']
    },
    {
      name: 'Sommerrollen mit Gemüse (2 Stück)',
      price: '5,90 €',
      description: 'mit Reisnudeln, frischem Salat, Nom, Gurken und Koriander, umwickelt von Reispapier, serviert mit hausgemachter Hoisin-Sauce',
      image: '/BOWLICIOUS/Sommerrollen mit Gemüse (2 Stück).webp',
      tags: ['Vegetarisch']
    },
    {
      name: 'Yakitori Hähnchenspieße (3 Stück)',
      price: '5,90 €',
      description: 'japanische Hähnchenspieße umhüllt von Yakitori-Sauce',
      image: '/BOWLICIOUS/Yakitori Hähnchenspieße (3 Stück).webp',
      tags: []
    },
    {
      name: 'Edamame',
      price: '5,90 €',
      description: 'japanische blanchierte Sojabohnen mit Meersalz',
      image: '/BOWLICIOUS/Edamame.webp',
      tags: ['Vegan', 'Vegetarisch']
    },
    {
      name: 'Wakame Salat',
      price: '5,90 €',
      description: 'japanischer Seetangsalat verfeinert mit geröstetem Sesam',
      image: '/BOWLICIOUS/Wakame Salat.webp',
      tags: ['Vegan', 'Vegetarisch']
    },
    {
      name: 'Miso Suppe',
      price: '4,90 €',
      description: 'mit Tofu, Meeresalgen und fermentierte Sojabohnenpaste',
      image: '/BOWLICIOUS/Miso Suppe.webp',
      tags: ['Vegan', 'Vegetarisch']
    },
    {
      name: 'Coleslaw',
      price: '5,90 €',
      description: 'Frischer Krautsalat aus feinem Weißkohl und Karotten, abgerundet mit einem cremigen Dressing',
      image: '/BOWLICIOUS/Coleslaw.webp',
      tags: []
    },
    {
      name: 'Pommes Frites',
      price: '4,90 €',
      description: 'mit Meersalz verfeinert',
      image: '/BOWLICIOUS/Pommes Frites.webp',
      tags: ['Vegan', 'Vegetarisch']
    },
    {
      name: 'Süßkartoffel-Pommes',
      price: '6,90 €',
      description: '',
      image: '/BOWLICIOUS/Süßkartoffel-Pommes.webp',
      tags: ['Vegan', 'Vegetarisch']
    },
    {
      name: 'Ha Kao',
      price: '5,90 €',
      description: 'gedämpfte Teigtaschen gefüllt mit Garnelentartar',
      image: '/BOWLICIOUS/Ha Kao.webp',
      tags: []
    },
    {
      name: 'Gurken-Kimchi',
      price: '5,90 €',
      description: 'koreanisches Gurken-Kimchi mit gerösteten Sesam',
      image: '/BOWLICIOUS/Gurken-Kimchi.webp',
      tags: ['Scharf', 'Vegan', 'Vegetarisch']
    }
  ]

  const macAndCheeseBowlsItems = [
    {
      name: 'Mac & Cheese (Klein)',
      price: '6,90 €',
      description: '',
      image: '/BOWLICIOUS/Mac & Cheese (Klein).webp',
      tags: ['Vegetarisch']
    },
    {
      name: 'Mac & Cheese (Groß)',
      price: '8,90 €',
      description: '',
      image: '/BOWLICIOUS/Mac & Cheese (Groß).webp',
      tags: ['Vegetarisch']
    },
    {
      name: 'Favourite Mac & Cheese Bowl',
      price: '11,90 €',
      description: 'cremige, käsige Mac & Cheese Bowl mit Crispy Chicken, Coleslaw, hausgemachte Sauce und mit Röstzwiebeln verfeinert',
      image: '/BOWLICIOUS/Favourite Mac & Cheese Bowl.webp',
      tags: []
    }
  ]

  const salateItems = [
    {
      name: 'Gemischter Salat',
      price: '7,90 €',
      description: 'mit Salat-Mix, Gurken, Kirschtomaten, Zwiebeln, Mais, Rucola, Möhren und hausgemachtem Dressing',
      image: '/BOWLICIOUS/Gemischter Salat.webp',
      tags: ['Vegetarisch'],
      customizationOptions: {
        title: "Dein Sonderwunsch:",
        required: false,
        multiple: true,
        options: [
          { label: "ohne Dressing", price: 0 }
        ]
      }
    },
    {
      name: 'Griechischer Bauernsalat',
      price: '8,90 €',
      description: 'mit Gurken, Tomaten, roten Zwiebeln, Oliven, würzigem Feta, Oregano und hausgemachtem Dressing',
      image: '/BOWLICIOUS/Griechischer Bauernsalat.webp',
      tags: ['Vegetarisch'],
      customizationOptions: {
        title: "Dein Sonderwunsch:",
        required: false,
        multiple: true,
        options: [
          { label: "ohne Dressing", price: 0 }
        ]
      }
    },
    {
      name: 'Caesar Salad',
      price: '9,90 €',
      description: 'mit Römersalat, Croutons, Hähnchenbrustfilet, Parmesan, Olivenöl, Oregano und hausgemachtem Caesar-Dressing',
      image: '/BOWLICIOUS/Caesar Salad.webp',
      tags: [],
      customizationOptions: {
        title: "Dein Sonderwunsch:",
        required: false,
        multiple: true,
        options: [
          { label: "ohne Dressing", price: 0 }
        ]
      }
    }
  ]

  const frischethekeFavouriteBowlsItems = [
    {
      name: 'Lachs Bowl',
      price: '12,90 €',
      description: 'mit Lachs, Gurken, Edamame, Avocado, Tomaten-Salsa, Mais, Tobiko, Lauchzwiebeln, Sesam, Sushi-Ingwer und wasabi-Nüsse',
      image: '/BOWLICIOUS/Lachs Bowl.webp',
      tags: [],
      customizationOptions: [
        {
          title: "Deine Base:",
          required: true,
          multiple: false,
          options: [
            { label: "mit Couscous", price: 0 },
            { label: "mit Jasminreis", price: 0 },
            { label: "mit Salat-Mix", price: 0 },
            { label: "mit Sushireis", price: 0 }
          ]
        },
        {
          title: "Deine Extras - Proteine:",
          required: false,
          multiple: true,
          options: [
            { label: "mit Lachs", price: 2.90 },
            { label: "mit Tofu", price: 1.90 },
            { label: "mit Räucherlachs", price: 2.90 },
            { label: "mit Thunfisch", price: 3.90 },
            { label: "mit Crispy Chicken", price: 2.90 },
            { label: "mit Ei, gekocht", price: 1.90 },
            { label: "mit Teriyaki Hähnchen", price: 2.90 },
            { label: "mit Black Tiger Shrimps", price: 2.90 },
            { label: "mit Ebi Tempura Garnelen", price: 3.90 },
            { label: "mit Falafel", price: 2.90 },
            { label: "mit Ente, knusprig", price: 5.90 }
          ]
        },
        {
          title: "Deine Extras - Mix Ins:",
          required: false,
          multiple: true,
          options: [
            { label: "mit Edamame", price: 0.80 },
            { label: "mit Zwiebeln, rot", price: 0.80 },
            { label: "mit Tomaten-Salsa", price: 1.50 },
            { label: "mit Tamago Omelette", price: 0.80 },
            { label: "mit Paprika", price: 0.80 },
            { label: "mit Nam Salat, vietnamesisch", price: 0.80 },
            { label: "mit Mozzarella-Kugel", price: 0.80 },
            { label: "mit Salat-Mix", price: 0.80 },
            { label: "mit Broccoli", price: 0.80 },
            { label: "mit Zucchini", price: 0.80 },
            { label: "mit Surimi", price: 1.50 },
            { label: "mit Kirschtomaten", price: 0.80 },
            { label: "mit Rotkohl", price: 0.80 },
            { label: "mit Rote Beete", price: 0.80 },
            { label: "mit Mais", price: 0.80 },
            { label: "mit Avocado", price: 1.50 },
            { label: "mit Champignons, gebraten", price: 0.80 },
            { label: "mit Spargel, mit", price: 0.80 },
            { label: "mit Wakame Salat", price: 1.50 },
            { label: "mit Sojasprossen", price: 0.80 },
            { label: "mit Mango", price: 0.80 },
            { label: "mit Gurken", price: 0.80 },
            { label: "mit Guacamole", price: 1.50 }
          ]
        },
        {
          title: "Deine Extras - Toppings:",
          required: false,
          multiple: true,
          options: [
            { label: "mit Mozzarella", price: 0.50 },
            { label: "mit Erdnüssen", price: 0.40 },
            { label: "mit Röstzwiebeln", price: 0.40 },
            { label: "mit Sesam", price: 0.40 },
            { label: "mit Kokos-Chips", price: 0.50 },
            { label: "mit Radieschen", price: 0.40 },
            { label: "mit Tobiko (Fischrogen)", price: 0.40 },
            { label: "mit Sushi-Ingwer", price: 0.40 },
            { label: "mit Peperoni", price: 0.40 },
            { label: "mit Lauchzwiebeln", price: 0.40 },
            { label: "mit Cashewnüssen", price: 0.50 },
            { label: "mit Parmesan", price: 0.90 },
            { label: "mit Koriander", price: 0.40 },
            { label: "mit Wasabinüssen", price: 0.50 },
            { label: "mit Seealgen-Streifen", price: 0.40 },
            { label: "mit Mandeln", price: 0.40 }
          ]
        },
        {
          title: "Deine 1. Sauce:",
          required: true,
          multiple: false,
          options: [
            { label: "Teriyakisauce", price: 0 },
            { label: "Hausgemachte Bowlsauce", price: 0 },
            { label: "Erdnusssauce", price: 0 },
            { label: "Sesamsauce", price: 0 },
            { label: "Chili-Honey-Mayonnaise", price: 0 },
            { label: "Trüffel-Mayonnaise", price: 0 },
            { label: "Koreansauce", price: 0 },
            { label: "ohne Sauce", price: 0 }
          ]
        },
        {
          title: "Deine 2. Sauce:",
          required: true,
          multiple: false,
          options: [
            { label: "ohne weitere Sauce", price: 0 },
            { label: "Koreansauce", price: 0 },
            { label: "Chili-Honey-Mayonnaise", price: 0 },
            { label: "Sesamsauce", price: 0 },
            { label: "Teriyakisauce", price: 0 },
            { label: "Erdnusssauce", price: 0 },
            { label: "Trüffel-Mayonnaise", price: 0 },
            { label: "Hausgemachte Bowlsauce", price: 0 }
          ]
        }
      ]
    },
    {
      name: 'Tuna Bowl',
      price: '13,90 €',
      description: 'mit Thunfisch, Wakame Salat, Gurken, Edamame, Tomaten-Salsa, Avocado, Tobiko, Lauchzwiebeln, Sesam, Sushi-Ingwer',
      image: '/BOWLICIOUS/Tuna Bowl.webp',
      tags: [],
      customizationOptions: [
        {
          title: "Deine Base:",
          required: true,
          multiple: false,
          options: [
            { label: "mit Couscous", price: 0 },
            { label: "mit Jasminreis", price: 0 },
            { label: "mit Salat-Mix", price: 0 },
            { label: "mit Sushireis", price: 0 }
          ]
        },
        {
          title: "Deine Extras - Proteine:",
          required: false,
          multiple: true,
          options: [
            { label: "mit Lachs", price: 2.90 },
            { label: "mit Tofu", price: 1.90 },
            { label: "mit Räucherlachs", price: 2.90 },
            { label: "mit Thunfisch", price: 3.90 },
            { label: "mit Crispy Chicken", price: 2.90 },
            { label: "mit Ei, gekocht", price: 1.90 },
            { label: "mit Teriyaki Hähnchen", price: 2.90 },
            { label: "mit Black Tiger Shrimps", price: 2.90 },
            { label: "mit Ebi Tempura Garnelen", price: 3.90 },
            { label: "mit Falafel", price: 2.90 },
            { label: "mit Ente, knusprig", price: 5.90 }
          ]
        },
        {
          title: "Deine Extras - Mix Ins:",
          required: false,
          multiple: true,
          options: [
            { label: "mit Edamame", price: 0.80 },
            { label: "mit Zwiebeln, rot", price: 0.80 },
            { label: "mit Tomaten-Salsa", price: 1.50 },
            { label: "mit Tamago Omelette", price: 0.80 },
            { label: "mit Paprika", price: 0.80 },
            { label: "mit Nam Salat, vietnamesisch", price: 0.80 },
            { label: "mit Mozzarella-Kugel", price: 0.80 },
            { label: "mit Salat-Mix", price: 0.80 },
            { label: "mit Broccoli", price: 0.80 },
            { label: "mit Zucchini", price: 0.80 },
            { label: "mit Surimi", price: 1.50 },
            { label: "mit Kirschtomaten", price: 0.80 },
            { label: "mit Rotkohl", price: 0.80 },
            { label: "mit Rote Beete", price: 0.80 },
            { label: "mit Mais", price: 0.80 },
            { label: "mit Avocado", price: 1.50 },
            { label: "mit Champignons, gebraten", price: 0.80 },
            { label: "mit Spargel, mit", price: 0.80 },
            { label: "mit Wakame Salat", price: 1.50 },
            { label: "mit Sojasprossen", price: 0.80 },
            { label: "mit Mango", price: 0.80 },
            { label: "mit Gurken", price: 0.80 },
            { label: "mit Guacamole", price: 1.50 }
          ]
        },
        {
          title: "Deine Extras - Toppings:",
          required: false,
          multiple: true,
          options: [
            { label: "mit Mozzarella", price: 0.50 },
            { label: "mit Erdnüssen", price: 0.40 },
            { label: "mit Röstzwiebeln", price: 0.40 },
            { label: "mit Sesam", price: 0.40 },
            { label: "mit Kokos-Chips", price: 0.50 },
            { label: "mit Radieschen", price: 0.40 },
            { label: "mit Tobiko (Fischrogen)", price: 0.40 },
            { label: "mit Sushi-Ingwer", price: 0.40 },
            { label: "mit Peperoni", price: 0.40 },
            { label: "mit Lauchzwiebeln", price: 0.40 },
            { label: "mit Cashewnüssen", price: 0.50 },
            { label: "mit Parmesan", price: 0.90 },
            { label: "mit Koriander", price: 0.40 },
            { label: "mit Wasabinüssen", price: 0.50 },
            { label: "mit Seealgen-Streifen", price: 0.40 },
            { label: "mit Mandeln", price: 0.40 }
          ]
        },
        {
          title: "Deine 1. Sauce:",
          required: true,
          multiple: false,
          options: [
            { label: "Teriyakisauce", price: 0 },
            { label: "Hausgemachte Bowlsauce", price: 0 },
            { label: "Erdnusssauce", price: 0 },
            { label: "Sesamsauce", price: 0 },
            { label: "Chili-Honey-Mayonnaise", price: 0 },
            { label: "Trüffel-Mayonnaise", price: 0 },
            { label: "Koreansauce", price: 0 },
            { label: "ohne Sauce", price: 0 }
          ]
        },
        {
          title: "Deine 2. Sauce:",
          required: true,
          multiple: false,
          options: [
            { label: "ohne weitere Sauce", price: 0 },
            { label: "Koreansauce", price: 0 },
            { label: "Chili-Honey-Mayonnaise", price: 0 },
            { label: "Sesamsauce", price: 0 },
            { label: "Teriyakisauce", price: 0 },
            { label: "Erdnusssauce", price: 0 },
            { label: "Trüffel-Mayonnaise", price: 0 },
            { label: "Hausgemachte Bowlsauce", price: 0 }
          ]
        }
      ]
    },
    {
      name: 'Yakitori Chicken Bowl',
      price: '12,90 €',
      description: 'mit Yakitori Hähnchen, Gurken, Mais, Paprika, Avocado, Tomaten-Salsa, Röstzwiebeln, Erdnüssen, Lauchzwiebeln, Sesam',
      image: '/BOWLICIOUS/Yakitori Chicken Bowl.webp',
      tags: [],
      customizationOptions: [
        {
          title: "Deine Base:",
          required: true,
          multiple: false,
          options: [
            { label: "mit Couscous", price: 0 },
            { label: "mit Jasminreis", price: 0 },
            { label: "mit Salat-Mix", price: 0 },
            { label: "mit Sushireis", price: 0 }
          ]
        },
        {
          title: "Deine Extras - Proteine:",
          required: false,
          multiple: true,
          options: [
            { label: "mit Lachs", price: 2.90 },
            { label: "mit Tofu", price: 1.90 },
            { label: "mit Räucherlachs", price: 2.90 },
            { label: "mit Thunfisch", price: 3.90 },
            { label: "mit Crispy Chicken", price: 2.90 },
            { label: "mit Ei, gekocht", price: 1.90 },
            { label: "mit Teriyaki Hähnchen", price: 2.90 },
            { label: "mit Black Tiger Shrimps", price: 2.90 },
            { label: "mit Ebi Tempura Garnelen", price: 3.90 },
            { label: "mit Falafel", price: 2.90 },
            { label: "mit Ente, knusprig", price: 5.90 }
          ]
        },
        {
          title: "Deine Extras - Mix Ins:",
          required: false,
          multiple: true,
          options: [
            { label: "mit Edamame", price: 0.80 },
            { label: "mit Zwiebeln, rot", price: 0.80 },
            { label: "mit Tomaten-Salsa", price: 1.50 },
            { label: "mit Tamago Omelette", price: 0.80 },
            { label: "mit Paprika", price: 0.80 },
            { label: "mit Nam Salat, vietnamesisch", price: 0.80 },
            { label: "mit Mozzarella-Kugel", price: 0.80 },
            { label: "mit Salat-Mix", price: 0.80 },
            { label: "mit Broccoli", price: 0.80 },
            { label: "mit Zucchini", price: 0.80 },
            { label: "mit Surimi", price: 1.50 },
            { label: "mit Kirschtomaten", price: 0.80 },
            { label: "mit Rotkohl", price: 0.80 },
            { label: "mit Rote Beete", price: 0.80 },
            { label: "mit Mais", price: 0.80 },
            { label: "mit Avocado", price: 1.50 },
            { label: "mit Champignons, gebraten", price: 0.80 },
            { label: "mit Spargel, mit", price: 0.80 },
            { label: "mit Wakame Salat", price: 1.50 },
            { label: "mit Sojasprossen", price: 0.80 },
            { label: "mit Mango", price: 0.80 },
            { label: "mit Gurken", price: 0.80 },
            { label: "mit Guacamole", price: 1.50 }
          ]
        },
        {
          title: "Deine Extras - Toppings:",
          required: false,
          multiple: true,
          options: [
            { label: "mit Mozzarella", price: 0.50 },
            { label: "mit Erdnüssen", price: 0.40 },
            { label: "mit Röstzwiebeln", price: 0.40 },
            { label: "mit Sesam", price: 0.40 },
            { label: "mit Kokos-Chips", price: 0.50 },
            { label: "mit Radieschen", price: 0.40 },
            { label: "mit Tobiko (Fischrogen)", price: 0.40 },
            { label: "mit Sushi-Ingwer", price: 0.40 },
            { label: "mit Peperoni", price: 0.40 },
            { label: "mit Lauchzwiebeln", price: 0.40 },
            { label: "mit Cashewnüssen", price: 0.50 },
            { label: "mit Parmesan", price: 0.90 },
            { label: "mit Koriander", price: 0.40 },
            { label: "mit Wasabinüssen", price: 0.50 },
            { label: "mit Seealgen-Streifen", price: 0.40 },
            { label: "mit Mandeln", price: 0.40 }
          ]
        },
        {
          title: "Deine 1. Sauce:",
          required: true,
          multiple: false,
          options: [
            { label: "Teriyakisauce", price: 0 },
            { label: "Hausgemachte Bowlsauce", price: 0 },
            { label: "Erdnusssauce", price: 0 },
            { label: "Sesamsauce", price: 0 },
            { label: "Chili-Honey-Mayonnaise", price: 0 },
            { label: "Trüffel-Mayonnaise", price: 0 },
            { label: "Koreansauce", price: 0 },
            { label: "ohne Sauce", price: 0 }
          ]
        },
        {
          title: "Deine 2. Sauce:",
          required: true,
          multiple: false,
          options: [
            { label: "ohne weitere Sauce", price: 0 },
            { label: "Koreansauce", price: 0 },
            { label: "Chili-Honey-Mayonnaise", price: 0 },
            { label: "Sesamsauce", price: 0 },
            { label: "Teriyakisauce", price: 0 },
            { label: "Erdnusssauce", price: 0 },
            { label: "Trüffel-Mayonnaise", price: 0 },
            { label: "Hausgemachte Bowlsauce", price: 0 }
          ]
        }
      ]
    },
    {
      name: 'Veggie Tofu Bowl',
      price: '12,90 €',
      description: 'mit Tofu, Blattspinat, Broccoli, Mais, gebratenen Champignons, Gurken, Tomaten-Salsa, Guacamole, Sesam, Erdnüssen',
      image: '/BOWLICIOUS/Veggie Tofu Bowl.webp',
      tags: ['Vegetarisch'],
      customizationOptions: [
        {
          title: "Deine Base:",
          required: true,
          multiple: false,
          options: [
            { label: "mit Couscous", price: 0 },
            { label: "mit Jasminreis", price: 0 },
            { label: "mit Salat-Mix", price: 0 },
            { label: "mit Sushireis", price: 0 }
          ]
        },
        {
          title: "Deine Extras - Proteine:",
          required: false,
          multiple: true,
          options: [
            { label: "mit Lachs", price: 2.90 },
            { label: "mit Tofu", price: 1.90 },
            { label: "mit Räucherlachs", price: 2.90 },
            { label: "mit Thunfisch", price: 3.90 },
            { label: "mit Crispy Chicken", price: 2.90 },
            { label: "mit Ei, gekocht", price: 1.90 },
            { label: "mit Teriyaki Hähnchen", price: 2.90 },
            { label: "mit Black Tiger Shrimps", price: 2.90 },
            { label: "mit Ebi Tempura Garnelen", price: 3.90 },
            { label: "mit Falafel", price: 2.90 },
            { label: "mit Ente, knusprig", price: 5.90 }
          ]
        },
        {
          title: "Deine Extras - Mix Ins:",
          required: false,
          multiple: true,
          options: [
            { label: "mit Edamame", price: 0.80 },
            { label: "mit Zwiebeln, rot", price: 0.80 },
            { label: "mit Tomaten-Salsa", price: 1.50 },
            { label: "mit Tamago Omelette", price: 0.80 },
            { label: "mit Paprika", price: 0.80 },
            { label: "mit Nam Salat, vietnamesisch", price: 0.80 },
            { label: "mit Mozzarella-Kugel", price: 0.80 },
            { label: "mit Salat-Mix", price: 0.80 },
            { label: "mit Broccoli", price: 0.80 },
            { label: "mit Zucchini", price: 0.80 },
            { label: "mit Surimi", price: 1.50 },
            { label: "mit Kirschtomaten", price: 0.80 },
            { label: "mit Rotkohl", price: 0.80 },
            { label: "mit Rote Beete", price: 0.80 },
            { label: "mit Mais", price: 0.80 },
            { label: "mit Avocado", price: 1.50 },
            { label: "mit Champignons, gebraten", price: 0.80 },
            { label: "mit Spargel, mit", price: 0.80 },
            { label: "mit Wakame Salat", price: 1.50 },
            { label: "mit Sojasprossen", price: 0.80 },
            { label: "mit Mango", price: 0.80 },
            { label: "mit Gurken", price: 0.80 },
            { label: "mit Guacamole", price: 1.50 }
          ]
        },
        {
          title: "Deine Extras - Toppings:",
          required: false,
          multiple: true,
          options: [
            { label: "mit Mozzarella", price: 0.50 },
            { label: "mit Erdnüssen", price: 0.40 },
            { label: "mit Röstzwiebeln", price: 0.40 },
            { label: "mit Sesam", price: 0.40 },
            { label: "mit Kokos-Chips", price: 0.50 },
            { label: "mit Radieschen", price: 0.40 },
            { label: "mit Tobiko (Fischrogen)", price: 0.40 },
            { label: "mit Sushi-Ingwer", price: 0.40 },
            { label: "mit Peperoni", price: 0.40 },
            { label: "mit Lauchzwiebeln", price: 0.40 },
            { label: "mit Cashewnüssen", price: 0.50 },
            { label: "mit Parmesan", price: 0.90 },
            { label: "mit Koriander", price: 0.40 },
            { label: "mit Wasabinüssen", price: 0.50 },
            { label: "mit Seealgen-Streifen", price: 0.40 },
            { label: "mit Mandeln", price: 0.40 }
          ]
        },
        {
          title: "Deine 1. Sauce:",
          required: true,
          multiple: false,
          options: [
            { label: "Teriyakisauce", price: 0 },
            { label: "Hausgemachte Bowlsauce", price: 0 },
            { label: "Erdnusssauce", price: 0 },
            { label: "Sesamsauce", price: 0 },
            { label: "Chili-Honey-Mayonnaise", price: 0 },
            { label: "Trüffel-Mayonnaise", price: 0 },
            { label: "Koreansauce", price: 0 },
            { label: "ohne Sauce", price: 0 }
          ]
        },
        {
          title: "Deine 2. Sauce:",
          required: true,
          multiple: false,
          options: [
            { label: "ohne weitere Sauce", price: 0 },
            { label: "Koreansauce", price: 0 },
            { label: "Chili-Honey-Mayonnaise", price: 0 },
            { label: "Sesamsauce", price: 0 },
            { label: "Teriyakisauce", price: 0 },
            { label: "Erdnusssauce", price: 0 },
            { label: "Trüffel-Mayonnaise", price: 0 },
            { label: "Hausgemachte Bowlsauce", price: 0 }
          ]
        }
      ]
    },
    {
      name: 'Baked Shrimp Bowl',
      price: '14,90 €',
      description: 'mit Ebi Tempura Garnelen, Gurken, Avocado, Edamame, Tomaten-Salsa, Rote Beete, Omelette, Lauchzwiebeln, Sesam, Erdnüssen, Koriander',
      image: '/BOWLICIOUS/Baked Shrimp Bowl.webp',
      tags: [],
      customizationOptions: [
        {
          title: "Deine Base:",
          required: true,
          multiple: false,
          options: [
            { label: "mit Couscous", price: 0 },
            { label: "mit Jasminreis", price: 0 },
            { label: "mit Salat-Mix", price: 0 },
            { label: "mit Sushireis", price: 0 }
          ]
        },
        {
          title: "Deine Extras - Proteine:",
          required: false,
          multiple: true,
          options: [
            { label: "mit Lachs", price: 2.90 },
            { label: "mit Tofu", price: 1.90 },
            { label: "mit Räucherlachs", price: 2.90 },
            { label: "mit Thunfisch", price: 3.90 },
            { label: "mit Crispy Chicken", price: 2.90 },
            { label: "mit Ei, gekocht", price: 1.90 },
            { label: "mit Teriyaki Hähnchen", price: 2.90 },
            { label: "mit Black Tiger Shrimps", price: 2.90 },
            { label: "mit Ebi Tempura Garnelen", price: 3.90 },
            { label: "mit Falafel", price: 2.90 },
            { label: "mit Ente, knusprig", price: 5.90 }
          ]
        },
        {
          title: "Deine Extras - Mix Ins:",
          required: false,
          multiple: true,
          options: [
            { label: "mit Edamame", price: 0.80 },
            { label: "mit Zwiebeln, rot", price: 0.80 },
            { label: "mit Tomaten-Salsa", price: 1.50 },
            { label: "mit Tamago Omelette", price: 0.80 },
            { label: "mit Paprika", price: 0.80 },
            { label: "mit Nam Salat, vietnamesisch", price: 0.80 },
            { label: "mit Mozzarella-Kugel", price: 0.80 },
            { label: "mit Salat-Mix", price: 0.80 },
            { label: "mit Broccoli", price: 0.80 },
            { label: "mit Zucchini", price: 0.80 },
            { label: "mit Surimi", price: 1.50 },
            { label: "mit Kirschtomaten", price: 0.80 },
            { label: "mit Rotkohl", price: 0.80 },
            { label: "mit Rote Beete", price: 0.80 },
            { label: "mit Mais", price: 0.80 },
            { label: "mit Avocado", price: 1.50 },
            { label: "mit Champignons, gebraten", price: 0.80 },
            { label: "mit Spargel, mit", price: 0.80 },
            { label: "mit Wakame Salat", price: 1.50 },
            { label: "mit Sojasprossen", price: 0.80 },
            { label: "mit Mango", price: 0.80 },
            { label: "mit Gurken", price: 0.80 },
            { label: "mit Guacamole", price: 1.50 }
          ]
        },
        {
          title: "Deine Extras - Toppings:",
          required: false,
          multiple: true,
          options: [
            { label: "mit Mozzarella", price: 0.50 },
            { label: "mit Erdnüssen", price: 0.40 },
            { label: "mit Röstzwiebeln", price: 0.40 },
            { label: "mit Sesam", price: 0.40 },
            { label: "mit Kokos-Chips", price: 0.50 },
            { label: "mit Radieschen", price: 0.40 },
            { label: "mit Tobiko (Fischrogen)", price: 0.40 },
            { label: "mit Sushi-Ingwer", price: 0.40 },
            { label: "mit Peperoni", price: 0.40 },
            { label: "mit Lauchzwiebeln", price: 0.40 },
            { label: "mit Cashewnüssen", price: 0.50 },
            { label: "mit Parmesan", price: 0.90 },
            { label: "mit Koriander", price: 0.40 },
            { label: "mit Wasabinüssen", price: 0.50 },
            { label: "mit Seealgen-Streifen", price: 0.40 },
            { label: "mit Mandeln", price: 0.40 }
          ]
        },
        {
          title: "Deine 1. Sauce:",
          required: true,
          multiple: false,
          options: [
            { label: "Teriyakisauce", price: 0 },
            { label: "Hausgemachte Bowlsauce", price: 0 },
            { label: "Erdnusssauce", price: 0 },
            { label: "Sesamsauce", price: 0 },
            { label: "Chili-Honey-Mayonnaise", price: 0 },
            { label: "Trüffel-Mayonnaise", price: 0 },
            { label: "Koreansauce", price: 0 },
            { label: "ohne Sauce", price: 0 }
          ]
        },
        {
          title: "Deine 2. Sauce:",
          required: true,
          multiple: false,
          options: [
            { label: "ohne weitere Sauce", price: 0 },
            { label: "Koreansauce", price: 0 },
            { label: "Chili-Honey-Mayonnaise", price: 0 },
            { label: "Sesamsauce", price: 0 },
            { label: "Teriyakisauce", price: 0 },
            { label: "Erdnusssauce", price: 0 },
            { label: "Trüffel-Mayonnaise", price: 0 },
            { label: "Hausgemachte Bowlsauce", price: 0 }
          ]
        }
      ]
    },
    {
      name: 'Falafel Bowl',
      price: '12,90 €',
      description: 'mit Falafel, Tomaten-Salsa, Gurken, Avocado, Paprika, Edamame, Rote Beete, Cashewnüsse, Sesam, Koriander',
      image: '/BOWLICIOUS/Falafel Bowl.webp',
      tags: ['Vegetarisch'],
      customizationOptions: [
        {
          title: "Deine Base:",
          required: true,
          multiple: false,
          options: [
            { label: "mit Couscous", price: 0 },
            { label: "mit Jasminreis", price: 0 },
            { label: "mit Salat-Mix", price: 0 },
            { label: "mit Sushireis", price: 0 }
          ]
        },
        {
          title: "Deine Extras - Proteine:",
          required: false,
          multiple: true,
          options: [
            { label: "mit Lachs", price: 2.90 },
            { label: "mit Tofu", price: 1.90 },
            { label: "mit Räucherlachs", price: 2.90 },
            { label: "mit Thunfisch", price: 3.90 },
            { label: "mit Crispy Chicken", price: 2.90 },
            { label: "mit Ei, gekocht", price: 1.90 },
            { label: "mit Teriyaki Hähnchen", price: 2.90 },
            { label: "mit Black Tiger Shrimps", price: 2.90 },
            { label: "mit Ebi Tempura Garnelen", price: 3.90 },
            { label: "mit Falafel", price: 2.90 },
            { label: "mit Ente, knusprig", price: 5.90 }
          ]
        },
        {
          title: "Deine Extras - Mix Ins:",
          required: false,
          multiple: true,
          options: [
            { label: "mit Edamame", price: 0.80 },
            { label: "mit Zwiebeln, rot", price: 0.80 },
            { label: "mit Tomaten-Salsa", price: 1.50 },
            { label: "mit Tamago Omelette", price: 0.80 },
            { label: "mit Paprika", price: 0.80 },
            { label: "mit Nam Salat, vietnamesisch", price: 0.80 },
            { label: "mit Mozzarella-Kugel", price: 0.80 },
            { label: "mit Salat-Mix", price: 0.80 },
            { label: "mit Broccoli", price: 0.80 },
            { label: "mit Zucchini", price: 0.80 },
            { label: "mit Surimi", price: 1.50 },
            { label: "mit Kirschtomaten", price: 0.80 },
            { label: "mit Rotkohl", price: 0.80 },
            { label: "mit Rote Beete", price: 0.80 },
            { label: "mit Mais", price: 0.80 },
            { label: "mit Avocado", price: 1.50 },
            { label: "mit Champignons, gebraten", price: 0.80 },
            { label: "mit Spargel, mit", price: 0.80 },
            { label: "mit Wakame Salat", price: 1.50 },
            { label: "mit Sojasprossen", price: 0.80 },
            { label: "mit Mango", price: 0.80 },
            { label: "mit Gurken", price: 0.80 },
            { label: "mit Guacamole", price: 1.50 }
          ]
        },
        {
          title: "Deine Extras - Toppings:",
          required: false,
          multiple: true,
          options: [
            { label: "mit Mozzarella", price: 0.50 },
            { label: "mit Erdnüssen", price: 0.40 },
            { label: "mit Röstzwiebeln", price: 0.40 },
            { label: "mit Sesam", price: 0.40 },
            { label: "mit Kokos-Chips", price: 0.50 },
            { label: "mit Radieschen", price: 0.40 },
            { label: "mit Tobiko (Fischrogen)", price: 0.40 },
            { label: "mit Sushi-Ingwer", price: 0.40 },
            { label: "mit Peperoni", price: 0.40 },
            { label: "mit Lauchzwiebeln", price: 0.40 },
            { label: "mit Cashewnüssen", price: 0.50 },
            { label: "mit Parmesan", price: 0.90 },
            { label: "mit Koriander", price: 0.40 },
            { label: "mit Wasabinüssen", price: 0.50 },
            { label: "mit Seealgen-Streifen", price: 0.40 },
            { label: "mit Mandeln", price: 0.40 }
          ]
        },
        {
          title: "Deine 1. Sauce:",
          required: true,
          multiple: false,
          options: [
            { label: "Teriyakisauce", price: 0 },
            { label: "Hausgemachte Bowlsauce", price: 0 },
            { label: "Erdnusssauce", price: 0 },
            { label: "Sesamsauce", price: 0 },
            { label: "Chili-Honey-Mayonnaise", price: 0 },
            { label: "Trüffel-Mayonnaise", price: 0 },
            { label: "Koreansauce", price: 0 },
            { label: "ohne Sauce", price: 0 }
          ]
        },
        {
          title: "Deine 2. Sauce:",
          required: true,
          multiple: false,
          options: [
            { label: "ohne weitere Sauce", price: 0 },
            { label: "Koreansauce", price: 0 },
            { label: "Chili-Honey-Mayonnaise", price: 0 },
            { label: "Sesamsauce", price: 0 },
            { label: "Teriyakisauce", price: 0 },
            { label: "Erdnusssauce", price: 0 },
            { label: "Trüffel-Mayonnaise", price: 0 },
            { label: "Hausgemachte Bowlsauce", price: 0 }
          ]
        }
      ]
    },
    {
      name: 'Duck Bowl',
      price: '16,90 €',
      description: 'mit knuspriger Ente, Gurken, Mais, Avocado, gebratenen Champignons, Paprika, Broccoli, Tomaten-Salsa, Sesam, Cashewnüsse, Lauchzwiebeln, Roten Zwiebeln',
      image: '/BOWLICIOUS/Duck Bowl.webp',
      tags: [],
      customizationOptions: [
        {
          title: "Deine Base:",
          required: true,
          multiple: false,
          options: [
            { label: "mit Couscous", price: 0 },
            { label: "mit Jasminreis", price: 0 },
            { label: "mit Salat-Mix", price: 0 },
            { label: "mit Sushireis", price: 0 }
          ]
        },
        {
          title: "Deine Extras - Proteine:",
          required: false,
          multiple: true,
          options: [
            { label: "mit Lachs", price: 2.90 },
            { label: "mit Tofu", price: 1.90 },
            { label: "mit Räucherlachs", price: 2.90 },
            { label: "mit Thunfisch", price: 3.90 },
            { label: "mit Crispy Chicken", price: 2.90 },
            { label: "mit Ei, gekocht", price: 1.90 },
            { label: "mit Teriyaki Hähnchen", price: 2.90 },
            { label: "mit Black Tiger Shrimps", price: 2.90 },
            { label: "mit Ebi Tempura Garnelen", price: 3.90 },
            { label: "mit Falafel", price: 2.90 },
            { label: "mit Ente, knusprig", price: 5.90 }
          ]
        },
        {
          title: "Deine Extras - Mix Ins:",
          required: false,
          multiple: true,
          options: [
            { label: "mit Edamame", price: 0.80 },
            { label: "mit Zwiebeln, rot", price: 0.80 },
            { label: "mit Tomaten-Salsa", price: 1.50 },
            { label: "mit Tamago Omelette", price: 0.80 },
            { label: "mit Paprika", price: 0.80 },
            { label: "mit Nam Salat, vietnamesisch", price: 0.80 },
            { label: "mit Mozzarella-Kugel", price: 0.80 },
            { label: "mit Salat-Mix", price: 0.80 },
            { label: "mit Broccoli", price: 0.80 },
            { label: "mit Zucchini", price: 0.80 },
            { label: "mit Surimi", price: 1.50 },
            { label: "mit Kirschtomaten", price: 0.80 },
            { label: "mit Rotkohl", price: 0.80 },
            { label: "mit Rote Beete", price: 0.80 },
            { label: "mit Mais", price: 0.80 },
            { label: "mit Avocado", price: 1.50 },
            { label: "mit Champignons, gebraten", price: 0.80 },
            { label: "mit Spargel, mit", price: 0.80 },
            { label: "mit Wakame Salat", price: 1.50 },
            { label: "mit Sojasprossen", price: 0.80 },
            { label: "mit Mango", price: 0.80 },
            { label: "mit Gurken", price: 0.80 },
            { label: "mit Guacamole", price: 1.50 }
          ]
        },
        {
          title: "Deine Extras - Toppings:",
          required: false,
          multiple: true,
          options: [
            { label: "mit Mozzarella", price: 0.50 },
            { label: "mit Erdnüssen", price: 0.40 },
            { label: "mit Röstzwiebeln", price: 0.40 },
            { label: "mit Sesam", price: 0.40 },
            { label: "mit Kokos-Chips", price: 0.50 },
            { label: "mit Radieschen", price: 0.40 },
            { label: "mit Tobiko (Fischrogen)", price: 0.40 },
            { label: "mit Sushi-Ingwer", price: 0.40 },
            { label: "mit Peperoni", price: 0.40 },
            { label: "mit Lauchzwiebeln", price: 0.40 },
            { label: "mit Cashewnüssen", price: 0.50 },
            { label: "mit Parmesan", price: 0.90 },
            { label: "mit Koriander", price: 0.40 },
            { label: "mit Wasabinüssen", price: 0.50 },
            { label: "mit Seealgen-Streifen", price: 0.40 },
            { label: "mit Mandeln", price: 0.40 }
          ]
        },
        {
          title: "Deine 1. Sauce:",
          required: true,
          multiple: false,
          options: [
            { label: "Teriyakisauce", price: 0 },
            { label: "Hausgemachte Bowlsauce", price: 0 },
            { label: "Erdnusssauce", price: 0 },
            { label: "Sesamsauce", price: 0 },
            { label: "Chili-Honey-Mayonnaise", price: 0 },
            { label: "Trüffel-Mayonnaise", price: 0 },
            { label: "Koreansauce", price: 0 },
            { label: "ohne Sauce", price: 0 }
          ]
        },
        {
          title: "Deine 2. Sauce:",
          required: true,
          multiple: false,
          options: [
            { label: "ohne weitere Sauce", price: 0 },
            { label: "Koreansauce", price: 0 },
            { label: "Chili-Honey-Mayonnaise", price: 0 },
            { label: "Sesamsauce", price: 0 },
            { label: "Teriyakisauce", price: 0 },
            { label: "Erdnusssauce", price: 0 },
            { label: "Trüffel-Mayonnaise", price: 0 },
            { label: "Hausgemachte Bowlsauce", price: 0 }
          ]
        }
      ]
    },
    {
      name: 'Chef Bowl',
      price: '16,90 €',
      description: 'mit Lachs, Ebi Tempura Garnelen, Tomaten-Salsa, Gurken, Guacamole, Mais, Kim Chi, Rote Beete, Salat-Mix, vietnamesischem Nom Salat, Mango, Sesam, Lauchzwiebeln, Cashewnüsse',
      image: '/BOWLICIOUS/Chef Bowl.webp',
      tags: [],
      customizationOptions: [
        {
          title: "Deine Base:",
          required: true,
          multiple: false,
          options: [
            { label: "mit Couscous", price: 0 },
            { label: "mit Jasminreis", price: 0 },
            { label: "mit Salat-Mix", price: 0 },
            { label: "mit Sushireis", price: 0 }
          ]
        },
        {
          title: "Deine Extras - Proteine:",
          required: false,
          multiple: true,
          options: [
            { label: "mit Lachs", price: 2.90 },
            { label: "mit Tofu", price: 1.90 },
            { label: "mit Räucherlachs", price: 2.90 },
            { label: "mit Thunfisch", price: 3.90 },
            { label: "mit Crispy Chicken", price: 2.90 },
            { label: "mit Ei, gekocht", price: 1.90 },
            { label: "mit Teriyaki Hähnchen", price: 2.90 },
            { label: "mit Black Tiger Shrimps", price: 2.90 },
            { label: "mit Ebi Tempura Garnelen", price: 3.90 },
            { label: "mit Falafel", price: 2.90 },
            { label: "mit Ente, knusprig", price: 5.90 }
          ]
        },
        {
          title: "Deine Extras - Mix Ins:",
          required: false,
          multiple: true,
          options: [
            { label: "mit Edamame", price: 0.80 },
            { label: "mit Zwiebeln, rot", price: 0.80 },
            { label: "mit Tomaten-Salsa", price: 1.50 },
            { label: "mit Tamago Omelette", price: 0.80 },
            { label: "mit Paprika", price: 0.80 },
            { label: "mit Nam Salat, vietnamesisch", price: 0.80 },
            { label: "mit Mozzarella-Kugel", price: 0.80 },
            { label: "mit Salat-Mix", price: 0.80 },
            { label: "mit Broccoli", price: 0.80 },
            { label: "mit Zucchini", price: 0.80 },
            { label: "mit Surimi", price: 1.50 },
            { label: "mit Kirschtomaten", price: 0.80 },
            { label: "mit Rotkohl", price: 0.80 },
            { label: "mit Rote Beete", price: 0.80 },
            { label: "mit Mais", price: 0.80 },
            { label: "mit Avocado", price: 1.50 },
            { label: "mit Champignons, gebraten", price: 0.80 },
            { label: "mit Spargel, mit", price: 0.80 },
            { label: "mit Wakame Salat", price: 1.50 },
            { label: "mit Sojasprossen", price: 0.80 },
            { label: "mit Mango", price: 0.80 },
            { label: "mit Gurken", price: 0.80 },
            { label: "mit Guacamole", price: 1.50 }
          ]
        }
      ]
    }
  ]

  const mixYourOwnBowlItems = [
    {
      name: 'Mix Your Own Bowl - Sushireis',
      price: '10,90 €',
      description: '• 1 Protein nach Wahl • bis zu 5 Mix Ins nach Wahl • 3 Toppings nach Wahl • 2 Saucen nach Wahl',
      bulletPoints: [
        '1 Protein nach Wahl',
        'bis zu 5 Mix Ins nach Wahl',
        '3 Toppings nach Wahl',
        '2 Saucen nach Wahl'
      ],
      image: '/BOWLICIOUS/Mix Your Own Bowl - Sushireis.webp',
      tags: [],
      customizationOptions: {
        title: "Mix Your Own Bowl - Sushireis:",
        required: true,
        multiple: false,
        options: [
          { label: "Medium", price: 0 },
          { label: "Premium-Größe Basis", price: 3.00 }
        ]
      }
    },
    {
      name: 'Mix Your Own Bowl - Jasmisreis',
      price: '10,90 €',
      description: '• 1 Protein nach Wahl • bis zu 5 Mix Ins nach Wahl • 3 Toppings nach Wahl • 2 Saucen nach Wahl',
      bulletPoints: [
        '1 Protein nach Wahl',
        'bis zu 5 Mix Ins nach Wahl',
        '3 Toppings nach Wahl',
        '2 Saucen nach Wahl'
      ],
      image: '/BOWLICIOUS/Mix Your Own Bowl - Jasmisreis.webp',
      tags: [],
      customizationOptions: {
        title: "Mix Your Own Bowl - Jasmisreis:",
        required: true,
        multiple: false,
        options: [
          { label: "Medium", price: 0 },
          { label: "Premium-Größe Basis", price: 3.00 }
        ]
      }
    },
    {
      name: 'Mix Your Own Bowl - Couscous',
      price: '10,90 €',
      description: '• 1 Protein nach Wahl • bis zu 5 Mix Ins nach Wahl • 3 Toppings nach Wahl • 2 Saucen nach Wahl',
      bulletPoints: [
        '1 Protein nach Wahl',
        'bis zu 5 Mix Ins nach Wahl',
        '3 Toppings nach Wahl',
        '2 Saucen nach Wahl'
      ],
      image: '/BOWLICIOUS/Mix Your Own Bowl - Couscous.webp',
      tags: [],
      customizationOptions: {
        title: "Mix Your Own Bowl - Couscous:",
        required: true,
        multiple: false,
        options: [
          { label: "Medium", price: 0 },
          { label: "Premium-Größe Basis", price: 3.00 }
        ]
      }
    },
    {
      name: 'Mix Your Own Bowl - Salat-Mix',
      price: '10,90 €',
      description: '• 1 Protein nach Wahl • bis zu 5 Mix Ins nach Wahl • 3 Toppings nach Wahl • 2 Saucen nach Wahl',
      bulletPoints: [
        '1 Protein nach Wahl',
        'bis zu 5 Mix Ins nach Wahl',
        '3 Toppings nach Wahl',
        '2 Saucen nach Wahl'
      ],
      image: '/BOWLICIOUS/Mix Your Own Bowl - Salat-Mix.webp',
      tags: [],
      customizationOptions: {
        title: "Mix Your Own Bowl - Salat-Mix:",
        required: true,
        multiple: false,
        options: [
          { label: "Medium", price: 0 },
          { label: "Premium-Größe Basis", price: 3.00 }
        ]
      }
    }
  ]

  const sashimiItems = [
    {
      name: 'Lachs Sashimi (5 Stück)',
      price: '12,90 €',
      description: 'mit Sushireis serviert',
      image: '/BOWLICIOUS/Lachs Sashimi (5 Stück).webp',
      tags: []
    },
    {
      name: 'Tuna Sashimi (5 Stück)',
      price: '14,90 €',
      description: 'mit Sushireis serviert',
      image: '/BOWLICIOUS/Tuna Sashimi (5 Stück).webp',
      tags: []
    }
  ]

  const saucenItems = [
    {
      name: 'Hauseigene Bowlsauce (empfohlen)',
      price: '2,50 €',
      description: 'würzige Sojasoße mit einem Mix von Unagisauce',
      image: '/BOWLICIOUS/Hauseigene Bowlsauce (empfohlen).webp',
      tags: []
    },
    {
      name: 'Chili-Honey-Mayo (empfohlen)',
      price: '2,50 €',
      description: 'Chilimayonnaise verfeinert mit Honig',
      image: '/BOWLICIOUS/Chili-Honey-Mayo (empfohlen).webp',
      tags: []
    },
    {
      name: 'Sesamsauce',
      price: '2,50 €',
      description: 'herzhaftes und nussiges Geschmacksprofil',
      image: '/BOWLICIOUS/Sesamsauce.webp',
      tags: []
    },
    {
      name: 'Erdnusssauce',
      price: '2,50 €',
      description: 'geheimer Tipp für Bowl-Liebhaber',
      image: '/BOWLICIOUS/Erdnusssauce.webp',
      tags: []
    },
    {
      name: 'Teriyakisauce',
      price: '2,50 €',
      description: 'süß-salzige Note',
      image: '/BOWLICIOUS/Teriyakisauce.webp',
      tags: []
    },
    {
      name: 'Trüffelmayonnaise',
      price: '2,50 €',
      description: '',
      image: '/BOWLICIOUS/Trüffelmayonnaise.webp',
      tags: []
    }
  ]

  const categories = [
    'Beliebt',
    'Vorspeisen',
    'Mac & Cheese Bowls',
    'Salate',
    'Mix Your Own Bowl',
    "Frischetheke's Favourite Bowls",
    'Sashimi',
    'Saucen'
  ]

  // Get all items for search
  const allItems = [
    ...beliebteItems.map(item => ({ ...item, section: 'Beliebt' })),
    ...vorspeisen.map(item => ({ ...item, section: 'Vorspeisen' })),
    ...macAndCheeseBowlsItems.map(item => ({ ...item, section: 'Mac & Cheese Bowls' })),
    ...salateItems.map(item => ({ ...item, section: 'Salate' })),
    ...mixYourOwnBowlItems.map(item => ({ ...item, section: 'Mix Your Own Bowl' })),
    ...frischethekeFavouriteBowlsItems.map(item => ({ ...item, section: "Frischetheke's Favourite Bowls" })),
    ...sashimiItems.map(item => ({ ...item, section: 'Sashimi' })),
    ...saucenItems.map(item => ({ ...item, section: 'Saucen' }))
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
                  <h1 className="text-3xl font-bold text-gray-900">BOWLICIOUS</h1>
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
                placeholder="Suche BOWLICIOUS"
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
            {/* Beliebt Section */}
            <section id="beliebt" className="mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-6 bg-white px-4 py-2 rounded-lg inline-block shadow-sm border-2 border-gray-200 hover:border-gray-300 hover:shadow-[0_0_40px_rgba(255,255,255,1)] transition-all duration-300 cursor-pointer">Beliebt</h2>

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
                      className="flex-shrink-0 w-72 bg-white rounded-xl shadow-md hover:shadow-[0_0_40px_rgba(255,255,255,1)] transition-all duration-300 cursor-pointer border-2 border-gray-200 hover:border-gray-300"
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

            {/* Vorspeisen Section */}
            <section id="vorspeisen" className="mb-12">
              <div className="flex items-center justify-between mb-6 bg-white px-4 py-3 rounded-lg shadow-sm border-2 border-transparent hover:border-white hover:shadow-[0_0_40px_rgba(255,255,255,1)] transition-all duration-300 cursor-pointer">
                <h2 className="text-3xl font-bold text-gray-900">Vorspeisen</h2>
                <span className="text-gray-600 font-semibold">18 Artikel</span>
              </div>

              {/* Grid Layout */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {vorspeisen.map((item) => (
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
                            {item.tags.map((tag) => (
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

            {/* Mac & Cheese Bowls Section */}
            <section id="mac-and-cheese-bowls" className="mb-12">
              <div className="flex items-center justify-between mb-6 bg-white px-4 py-3 rounded-lg shadow-sm border-2 border-transparent hover:border-white hover:shadow-[0_0_40px_rgba(255,255,255,1)] transition-all duration-300 cursor-pointer">
                <h2 className="text-3xl font-bold text-gray-900">Mac & Cheese Bowls</h2>
                <span className="text-gray-600 font-semibold">3 Artikel</span>
              </div>

              {/* Grid Layout */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {macAndCheeseBowlsItems.map((item) => (
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
                            {item.tags.map((tag) => (
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

            {/* Salate Section */}
            <section id="salate" className="mb-12">
              <div className="flex items-center justify-between mb-6 bg-white px-4 py-3 rounded-lg shadow-sm border-2 border-transparent hover:border-white hover:shadow-[0_0_40px_rgba(255,255,255,1)] transition-all duration-300 cursor-pointer">
                <h2 className="text-3xl font-bold text-gray-900">Salate</h2>
                <span className="text-gray-600 font-semibold">3 Artikel</span>
              </div>

              {/* Grid Layout */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {salateItems.map((item) => (
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
                            {item.tags.map((tag) => (
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

            {/* Mix Your Own Bowl Section */}
            <section id="mix-your-own-bowl" className="mb-12">
              <div className="flex items-center justify-between mb-6 bg-white px-4 py-3 rounded-lg shadow-sm border-2 border-transparent hover:border-white hover:shadow-[0_0_40px_rgba(255,255,255,1)] transition-all duration-300 cursor-pointer">
                <h2 className="text-3xl font-bold text-gray-900">Mix Your Own Bowl</h2>
                <span className="text-gray-600 font-semibold">4 Artikel</span>
              </div>

              {/* Grid Layout */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {mixYourOwnBowlItems.map((item) => (
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
                        {item.bulletPoints ? (
                          <ul className="text-xs text-gray-600 mb-2 space-y-1">
                            {item.bulletPoints.map((point, index) => (
                              <li key={index} className="flex items-start">
                                <span className="mr-1.5">•</span>
                                <span>{point}</span>
                              </li>
                            ))}
                          </ul>
                        ) : item.description && (
                          <p className="text-xs text-gray-600 mb-2 line-clamp-2">{item.description}</p>
                        )}

                        {/* Tags */}
                        {item.tags.length > 0 && (
                          <div className="flex gap-1.5 flex-wrap">
                            {item.tags.map((tag) => (
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

            {/* Frischetheke's Favourite Bowls Section */}
            <section id="frischetheke-s-favourite-bowls" className="mb-12">
              <div className="flex items-center justify-between mb-6 bg-white px-4 py-3 rounded-lg shadow-sm border-2 border-transparent hover:border-white hover:shadow-[0_0_40px_rgba(255,255,255,1)] transition-all duration-300 cursor-pointer">
                <h2 className="text-3xl font-bold text-gray-900">Frischetheke's Favourite Bowls</h2>
                <span className="text-gray-600 font-semibold">8 Artikel</span>
              </div>

              {/* Grid Layout */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {frischethekeFavouriteBowlsItems.map((item) => (
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
                            {item.tags.map((tag) => (
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

            {/* Sashimi Section */}
            <section id="sashimi" className="mb-12">
              <div className="flex items-center justify-between mb-6 bg-white px-4 py-3 rounded-lg shadow-sm border-2 border-transparent hover:border-white hover:shadow-[0_0_40px_rgba(255,255,255,1)] transition-all duration-300 cursor-pointer">
                <h2 className="text-3xl font-bold text-gray-900">Sashimi</h2>
                <span className="text-gray-600 font-semibold">2 Artikel</span>
              </div>

              {/* Grid Layout */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {sashimiItems.map((item) => (
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
                            {item.tags.map((tag) => (
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

            {/* Saucen Section */}
            <section id="saucen" className="mb-12">
              <div className="flex items-center justify-between mb-6 bg-white px-4 py-3 rounded-lg shadow-sm border-2 border-transparent hover:border-white hover:shadow-[0_0_40px_rgba(255,255,255,1)] transition-all duration-300 cursor-pointer">
                <h2 className="text-3xl font-bold text-gray-900">Saucen</h2>
                <span className="text-gray-600 font-semibold">6 Artikel</span>
              </div>

              {/* Grid Layout */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {saucenItems.map((item) => (
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
                            {item.tags.map((tag) => (
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

export default function BowliciousPage() {
  return <BowliciousContent />
}
