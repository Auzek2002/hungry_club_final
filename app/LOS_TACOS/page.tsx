'use client'

import Image from 'next/image'
import { useRef, useState, useEffect } from 'react'
import ItemModal from '../components/ItemModal'
import CartBanner from '../components/CartBanner'

function LosTacosContent() {
  const scrollContainerRef = useRef<HTMLDivElement>(null)
  const categoryScrollRef = useRef<HTMLDivElement>(null)
  const [isScrolled, setIsScrolled] = useState(false)
  const [activeCategory, setActiveCategory] = useState('Fingerfood')
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
        const response = await fetch('/api/menu-items?restaurant=LOS_TACOS&active=true')
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
        'fingerfood',
        'fresh-salads',
        'birria-tacos',
        'french-tacos',
        'taco-burger',
        'burritos',
        'loaded-nachos'
      ]

      const categoryNames = [
        'Fingerfood',
        'Fresh Salads',
        'Birria Tacos',
        'French Tacos',
        'Taco-Burger',
        'Burritos',
        'Loaded Nachos'
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
    return category.toLowerCase().replace(/\s+/g, '-').replace(/&/g, 'and')
  }

  // Organize menu items by section from database
  const fingerfoodItems = menuItems.filter(item => item.section === 'Fingerfood')
  const freshSaladsItems = menuItems.filter(item => item.section === 'Fresh Salads')
  const birriaTacosItems = menuItems.filter(item => item.section === 'Birria Tacos')
  const frenchTacosItems = menuItems.filter(item => item.section === 'French Tacos')
  const tacoBurgerItems = menuItems.filter(item => item.section === 'Taco-Burger')
  const burritosItems = menuItems.filter(item => item.section === 'Burritos')
  const loadedNachosItems = menuItems.filter(item => item.section === 'Loaded Nachos')

  // OLD HARD-CODED ARRAYS - TO BE REMOVED
  const beliebteItemsOLD = [
    {
      name: 'The Chicken Taco',
      price: '8,90 €',
      description: 'mit Paprika, Mais, karamellisierten Zwiebeln, Hähnchenbrustfilet, Cheddar und hausgemachter Tacosauce',
      image: '/LOS TACOS/The Chicken Taco.webp',
      category: 'French Tacos',
      customizationOptions: {
        title: "Deine Extras - Mix Ins:",
        required: false,
        multiple: true,
        options: [
          { label: "mit Cheddar", price: 1.00 },
          { label: "mit Guacamole", price: 2.00 },
          { label: "mit Zwiebeln, karamellisiert", price: 1.00 },
          { label: "mit Paprika", price: 1.00 },
          { label: "mit Avocado", price: 2.00 },
          { label: "mit Petersilie", price: 1.00 },
          { label: "mit Koriander", price: 1.00 },
          { label: "mit Lauchzwiebeln", price: 1.00 },
          { label: "mit Zwiebeln, rot", price: 1.00 },
          { label: "mit Feta", price: 2.00 },
          { label: "mit Kidneybohnen", price: 1.00 },
          { label: "mit Eisbergsalat", price: 1.00 },
          { label: "mit Mozzarella", price: 1.00 },
          { label: "mit Gurken Kimchi", price: 2.00 },
          { label: "mit Mais", price: 1.00 },
          { label: "mit Tomatenreis", price: 2.00 },
          { label: "mit Tomatensalsa", price: 1.00 },
          { label: "mit Pommes frites", price: 2.00 }
        ]
      }
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
      category: 'Burritos',
      customizationOptions: [
        {
          title: "Dein Protein:",
          required: true,
          multiple: false,
          options: [
            { label: "mit Chicken", price: 0 },
            { label: "mit Halloumi", price: 0 },
            { label: "mit Falafel", price: 0 },
            { label: "mit Hiro Beef", price: 0 },
            { label: "mit Honey BBQ Chicken", price: 0 },
            { label: "mit Pulled Pork", price: 0 },
            { label: "ohne Protein", price: 0 }
          ]
        },
        {
          title: "Deine Extras - Proteine:",
          required: false,
          multiple: true,
          options: [
            { label: "mit Falafel", price: 3.00 },
            { label: "mit Chicken", price: 3.00 },
            { label: "mit Halloumi", price: 3.00 },
            { label: "mit Pulled Pork", price: 3.00 },
            { label: "mit Honey BBQ Chicken", price: 3.00 },
            { label: "mit Hiro Beef", price: 3.00 }
          ]
        },
        {
          title: "Deine Extras - Mix Ins:",
          required: false,
          multiple: true,
          options: [
            { label: "mit Cheddar", price: 1.00 },
            { label: "mit Guacamole", price: 2.00 },
            { label: "mit Zwiebeln, karamellisiert", price: 1.00 },
            { label: "mit Paprika", price: 1.00 },
            { label: "mit Avocado", price: 2.00 },
            { label: "mit Petersilie", price: 1.00 },
            { label: "mit Koriander", price: 1.00 },
            { label: "mit Lauchzwiebeln", price: 1.00 },
            { label: "mit Zwiebeln, rot", price: 1.00 },
            { label: "mit Feta", price: 2.00 },
            { label: "mit Kidneybohnen", price: 1.00 },
            { label: "mit Eisbergsalat", price: 1.00 },
            { label: "mit Mozzarella", price: 1.00 },
            { label: "mit Gurken Kimchi", price: 2.00 },
            { label: "mit Mais", price: 1.00 },
            { label: "mit Tomatenreis", price: 2.00 },
            { label: "mit Tomatensalsa", price: 1.00 },
            { label: "mit Pommes frites", price: 2.00 }
          ]
        }
      ]
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

  const fingerfoodItemsOLD = [
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

  const freshSaladsItemsOLD = [
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

  const birriaTacosItemsOLD = [
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

  const frenchTacosItemsOLD = [
    {
      name: 'The Chicken Taco',
      price: '8,90 €',
      description: 'mit Paprika, Mais, karamellisierten Zwiebeln, Hähnchenbrustfilet, Cheddar und hausgemachter Tacosauce',
      image: '/LOS TACOS/The Chicken Taco.webp',
      tags: [],
      customizationOptions: {
        title: "Deine Extras - Mix Ins:",
        required: false,
        multiple: true,
        options: [
          { label: "mit Cheddar", price: 1.00 },
          { label: "mit Guacamole", price: 2.00 },
          { label: "mit Zwiebeln, karamellisiert", price: 1.00 },
          { label: "mit Paprika", price: 1.00 },
          { label: "mit Avocado", price: 2.00 },
          { label: "mit Petersilie", price: 1.00 },
          { label: "mit Koriander", price: 1.00 },
          { label: "mit Lauchzwiebeln", price: 1.00 },
          { label: "mit Zwiebeln, rot", price: 1.00 },
          { label: "mit Feta", price: 2.00 },
          { label: "mit Kidneybohnen", price: 1.00 },
          { label: "mit Eisbergsalat", price: 1.00 },
          { label: "mit Mozzarella", price: 1.00 },
          { label: "mit Gurken Kimchi", price: 2.00 },
          { label: "mit Mais", price: 1.00 },
          { label: "mit Tomatenreis", price: 2.00 },
          { label: "mit Tomatensalsa", price: 1.00 },
          { label: "mit Pommes frites", price: 2.00 }
        ]
      }
    },
    {
      name: 'Beef Taco',
      price: '8,90 €',
      description: 'mit Paprika, Mais, karamellisierten Zwiebeln, 150g Rindfleisch Patty, Cheddar und hausgemachter Tacosauce',
      image: '/LOS TACOS/Beef Taco.webp',
      tags: [],
      customizationOptions: {
        title: "Deine Extras - Mix Ins:",
        required: false,
        multiple: true,
        options: [
          { label: "mit Cheddar", price: 1.00 },
          { label: "mit Guacamole", price: 2.00 },
          { label: "mit Zwiebeln, karamellisiert", price: 1.00 },
          { label: "mit Paprika", price: 1.00 },
          { label: "mit Avocado", price: 2.00 },
          { label: "mit Petersilie", price: 1.00 },
          { label: "mit Koriander", price: 1.00 },
          { label: "mit Lauchzwiebeln", price: 1.00 },
          { label: "mit Zwiebeln, rot", price: 1.00 },
          { label: "mit Feta", price: 2.00 },
          { label: "mit Kidneybohnen", price: 1.00 },
          { label: "mit Eisbergsalat", price: 1.00 },
          { label: "mit Mozzarella", price: 1.00 },
          { label: "mit Gurken Kimchi", price: 2.00 },
          { label: "mit Mais", price: 1.00 },
          { label: "mit Tomatenreis", price: 2.00 },
          { label: "mit Tomatensalsa", price: 1.00 },
          { label: "mit Pommes frites", price: 2.00 }
        ]
      }
    },
    {
      name: 'Pulled Pork Taco',
      price: '8,90 €',
      description: 'mit Paprika, Mais, karamellisierten Zwiebeln, Pulled Pork, Barbecue-Limettensauce, Cheddar und hausgemachter Tacosauce',
      image: '/LOS TACOS/Pulled Pork Taco.webp',
      tags: [],
      customizationOptions: {
        title: "Deine Extras - Mix Ins:",
        required: false,
        multiple: true,
        options: [
          { label: "mit Cheddar", price: 1.00 },
          { label: "mit Guacamole", price: 2.00 },
          { label: "mit Zwiebeln, karamellisiert", price: 1.00 },
          { label: "mit Paprika", price: 1.00 },
          { label: "mit Avocado", price: 2.00 },
          { label: "mit Petersilie", price: 1.00 },
          { label: "mit Koriander", price: 1.00 },
          { label: "mit Lauchzwiebeln", price: 1.00 },
          { label: "mit Zwiebeln, rot", price: 1.00 },
          { label: "mit Feta", price: 2.00 },
          { label: "mit Kidneybohnen", price: 1.00 },
          { label: "mit Eisbergsalat", price: 1.00 },
          { label: "mit Mozzarella", price: 1.00 },
          { label: "mit Gurken Kimchi", price: 2.00 },
          { label: "mit Mais", price: 1.00 },
          { label: "mit Tomatenreis", price: 2.00 },
          { label: "mit Tomatensalsa", price: 1.00 },
          { label: "mit Pommes frites", price: 2.00 }
        ]
      }
    },
    {
      name: 'Falafel Taco',
      price: '8,90 €',
      description: 'mit Paprika, Mais, karamellisierten Zwiebeln, Mozzarella, Falafel, veganem Käse und hausgemachter Tacosauce',
      image: '/LOS TACOS/Falafel Taco.webp',
      tags: ['Vegetarisch'],
      customizationOptions: {
        title: "Deine Extras - Mix Ins:",
        required: false,
        multiple: true,
        options: [
          { label: "mit Cheddar", price: 1.00 },
          { label: "mit Guacamole", price: 2.00 },
          { label: "mit Zwiebeln, karamellisiert", price: 1.00 },
          { label: "mit Paprika", price: 1.00 },
          { label: "mit Avocado", price: 2.00 },
          { label: "mit Petersilie", price: 1.00 },
          { label: "mit Koriander", price: 1.00 },
          { label: "mit Lauchzwiebeln", price: 1.00 },
          { label: "mit Zwiebeln, rot", price: 1.00 },
          { label: "mit Feta", price: 2.00 },
          { label: "mit Kidneybohnen", price: 1.00 },
          { label: "mit Eisbergsalat", price: 1.00 },
          { label: "mit Mozzarella", price: 1.00 },
          { label: "mit Gurken Kimchi", price: 2.00 },
          { label: "mit Mais", price: 1.00 },
          { label: "mit Tomatenreis", price: 2.00 },
          { label: "mit Tomatensalsa", price: 1.00 },
          { label: "mit Pommes frites", price: 2.00 }
        ]
      }
    }
  ]

  const tacoBurgerItemsOLD = [
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

  const burritosItemsOLD = [
    {
      name: 'Burritos',
      price: '11,90 €',
      description: 'mit mexikanischem Tomatenreis, Grillgemüse, Tomatenwürfeln, Eisbergsalat, Guacamole, Kidneybohnen, Cheddar und hausgemachter Sauce',
      image: '/LOS TACOS/Burritos.webp',
      tags: [],
      customizationOptions: [
        {
          title: "Dein Protein:",
          required: true,
          multiple: false,
          options: [
            { label: "mit Chicken", price: 0 },
            { label: "mit Halloumi", price: 0 },
            { label: "mit Falafel", price: 0 },
            { label: "mit Hiro Beef", price: 0 },
            { label: "mit Honey BBQ Chicken", price: 0 },
            { label: "mit Pulled Pork", price: 0 },
            { label: "ohne Protein", price: 0 }
          ]
        },
        {
          title: "Deine Extras - Proteine:",
          required: false,
          multiple: true,
          options: [
            { label: "mit Falafel", price: 3.00 },
            { label: "mit Chicken", price: 3.00 },
            { label: "mit Halloumi", price: 3.00 },
            { label: "mit Pulled Pork", price: 3.00 },
            { label: "mit Honey BBQ Chicken", price: 3.00 },
            { label: "mit Hiro Beef", price: 3.00 }
          ]
        },
        {
          title: "Deine Extras - Mix Ins:",
          required: false,
          multiple: true,
          options: [
            { label: "mit Cheddar", price: 1.00 },
            { label: "mit Guacamole", price: 2.00 },
            { label: "mit Zwiebeln, karamellisiert", price: 1.00 },
            { label: "mit Paprika", price: 1.00 },
            { label: "mit Avocado", price: 2.00 },
            { label: "mit Petersilie", price: 1.00 },
            { label: "mit Koriander", price: 1.00 },
            { label: "mit Lauchzwiebeln", price: 1.00 },
            { label: "mit Zwiebeln, rot", price: 1.00 },
            { label: "mit Feta", price: 2.00 },
            { label: "mit Kidneybohnen", price: 1.00 },
            { label: "mit Eisbergsalat", price: 1.00 },
            { label: "mit Mozzarella", price: 1.00 },
            { label: "mit Gurken Kimchi", price: 2.00 },
            { label: "mit Mais", price: 1.00 },
            { label: "mit Tomatenreis", price: 2.00 },
            { label: "mit Tomatensalsa", price: 1.00 },
            { label: "mit Pommes frites", price: 2.00 }
          ]
        }
      ]
    }
  ]

  const loadedNachosItemsOLD = [
    {
      name: 'Mexican Nachos',
      price: '6,90 €',
      description: 'mit Mexikanischer Tomatensalsa, Guacamole, Sour Cream',
      image: '/LOS TACOS/Mexican Nachos.webp',
      tags: []
    }
  ]


  const categories = [
    'Fingerfood',
    'Fresh Salads',
    'Birria Tacos',
    'French Tacos',
    'Taco-Burger',
    'Burritos',
    'Loaded Nachos'
  ]

  // Get all items for search
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
                  <h1 className="text-l md:text-3xl font-bold text-gray-900">Los Tacos</h1>
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
            {/* Fingerfood Section */}
            <section id="fingerfood" className="mb-12">
              <div className="flex items-center justify-between mb-6 bg-white px-4 py-3 rounded-lg shadow-sm border-2 border-transparent hover:border-white hover:shadow-[0_0_40px_rgba(255,255,255,1)] transition-all duration-300 cursor-pointer">
                <h2 className="text-3xl font-bold text-gray-900">Fingerfood</h2>
                <span className="text-gray-600 font-semibold">{fingerfoodItems.length} Artikel</span>
              </div>

              {/* Grid Layout */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {fingerfoodItems.map((item: any) => (
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

            {/* Fresh Salads Section */}
            <section id="fresh-salads" className="mb-12">
              <div className="flex items-center justify-between mb-6 bg-white px-4 py-3 rounded-lg shadow-sm border-2 border-transparent hover:border-white hover:shadow-[0_0_40px_rgba(255,255,255,1)] transition-all duration-300 cursor-pointer">
                <h2 className="text-3xl font-bold text-gray-900">Fresh Salads</h2>
                <span className="text-gray-600 font-semibold">{freshSaladsItems.length} Artikel</span>
              </div>

              {/* Grid Layout */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {freshSaladsItems.map((item: any) => (
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

            {/* Birria Tacos Section */}
            <section id="birria-tacos" className="mb-12">
              <div className="mb-6 bg-white px-4 py-3 rounded-lg shadow-sm border-2 border-transparent hover:border-white hover:shadow-[0_0_40px_rgba(255,255,255,1)] transition-all duration-300 cursor-pointer">
                <div className="flex items-center justify-between mb-2">
                  <h2 className="text-3xl font-bold text-gray-900">Birria Tacos</h2>
                  <span className="text-gray-600 font-semibold">{birriaTacosItems.length} Artikel</span>
                </div>
                <p className="text-sm text-gray-600">Zartes Rind, voller Geschmack Unsere legendären Birria-Tacos sind ein echter Streetfood-Hit: mit zart geschmortem Rindfleisch, langsam in einer würzigen Chili-Gewürzmarinade gegart, serviert in knusprig angebratenen Maistortillas. Dazu gibt's reichlich geschmolzenen Käse, frische Zwiebeln, Koriander und natürlich den originalen Birria-Dip zum Eintunken - heiß, deftig, unwiderstehlich!</p>
              </div>

              {/* Grid Layout */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {birriaTacosItems.map((item: any) => (
                  <div
                    key={item.name}
                    onClick={() => openModal(item)}
                    className="bg-white rounded-lg shadow-sm hover:shadow-[0_0_40px_rgba(255,255,255,1)] transition-all duration-300 cursor-pointer border-2 border-transparent hover:border-white p-4"
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
                              {item.tags.map((tag: string) => (
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
                          <div className="font-bold text-gray-900 text-base mb-2">{item.price}</div>
                          <p className="text-xs text-gray-600 mb-2 line-clamp-2">{item.description}</p>

                          {/* Tags */}
                          {item.tags.length > 0 && (
                            <div className="flex gap-1.5 flex-wrap">
                              {item.tags.map((tag: string) => (
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

            {/* French Tacos Section */}
            <section id="french-tacos" className="mb-12">
              <div className="mb-6 bg-white px-4 py-3 rounded-lg shadow-sm border-2 border-transparent hover:border-white hover:shadow-[0_0_40px_rgba(255,255,255,1)] transition-all duration-300 cursor-pointer">
                <div className="flex items-center justify-between mb-2">
                  <h2 className="text-3xl font-bold text-gray-900">French Tacos</h2>
                  <span className="text-gray-600 font-semibold">{frenchTacosItems.length} Artikel</span>
                </div>
                <p className="text-sm text-gray-600">Alle French Tacos werden mit Pommes frites zubereitet.</p>
              </div>

              {/* Grid Layout */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {frenchTacosItems.map((item: any) => (
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
                        <p className="text-xs text-gray-600 mb-2 line-clamp-2">{item.description}</p>

                        {/* Tags */}
                        {item.tags.length > 0 && (
                          <div className="flex gap-1.5 flex-wrap">
                            {item.tags.map((tag: string) => (
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

            {/* Taco-Burger Section */}
            <section id="taco-burger" className="mb-12">
              <div className="flex items-center justify-between mb-6 bg-white px-4 py-3 rounded-lg shadow-sm border-2 border-transparent hover:border-white hover:shadow-[0_0_40px_rgba(255,255,255,1)] transition-all duration-300 cursor-pointer">
                <h2 className="text-3xl font-bold text-gray-900">Taco-Burger</h2>
                <span className="text-gray-600 font-semibold">{tacoBurgerItems.length} Artikel</span>
              </div>

              {/* Grid Layout */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {tacoBurgerItems.map((item: any) => (
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
                        <p className="text-xs text-gray-600 mb-2 line-clamp-2">{item.description}</p>

                        {/* Tags */}
                        {item.tags.length > 0 && (
                          <div className="flex gap-1.5 flex-wrap">
                            {item.tags.map((tag: string) => (
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

            {/* Burritos Section */}
            <section id="burritos" className="mb-12">
              <div className="mb-6 bg-white px-4 py-3 rounded-lg shadow-sm border-2 border-transparent hover:border-white hover:shadow-[0_0_40px_rgba(255,255,255,1)] transition-all duration-300 cursor-pointer">
                <div className="flex items-center justify-between mb-2">
                  <h2 className="text-3xl font-bold text-gray-900">Burritos</h2>
                  <span className="text-gray-600 font-semibold">{burritosItems.length} Artikel</span>
                </div>
                <p className="text-sm text-gray-600">Alle Burritos werden mit einem Protein nach Wahl zubereitet.</p>
              </div>

              {/* Grid Layout */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {burritosItems.map((item: any) => (
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
                        <p className="text-xs text-gray-600 mb-2 line-clamp-2">{item.description}</p>

                        {/* Tags */}
                        {item.tags.length > 0 && (
                          <div className="flex gap-1.5 flex-wrap">
                            {item.tags.map((tag: string) => (
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

            {/* Loaded Nachos Section */}
            <section id="loaded-nachos" className="mb-12">
              <div className="flex items-center justify-between mb-6 bg-white px-4 py-3 rounded-lg shadow-sm border-2 border-transparent hover:border-white hover:shadow-[0_0_40px_rgba(255,255,255,1)] transition-all duration-300 cursor-pointer">
                <h2 className="text-3xl font-bold text-gray-900">Loaded Nachos</h2>
                <span className="text-gray-600 font-semibold">{loadedNachosItems.length} Artikel</span>
              </div>

              {/* Grid Layout */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {loadedNachosItems.map((item: any) => (
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
                        <p className="text-xs text-gray-600 mb-2 line-clamp-2">{item.description}</p>

                        {/* Tags */}
                        {item.tags.length > 0 && (
                          <div className="flex gap-1.5 flex-wrap">
                            {item.tags.map((tag: string) => (
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

export default function LosTacosPage() {
  return <LosTacosContent />
}
