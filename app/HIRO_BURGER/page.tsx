'use client'

import Image from 'next/image'
import { useRef, useState, useEffect } from 'react'
import ItemModal from '../components/ItemModal'
import CartBanner from '../components/CartBanner'

function HiroBurgerContent() {
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
        const response = await fetch('/api/menu-items?restaurant=HIRO_BURGER&active=true')
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
        'mac-and-cheese',
        'smashburger',
        'burger',
        'loaded-fries',
        'saucen'
      ]

      const categoryNames = [
        'Fingerfood',
        'Mac & Cheese',
        'Smashburger',
        'Burger',
        'Loaded Fries',
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
    // If clicking "fingerfood", scroll to the very top
    if (sectionId === 'fingerfood') {
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

  // Organize menu items by section from database
  const fingerfoodItems = menuItems.filter(item => item.section === 'Fingerfood')
  const macAndCheeseItems = menuItems.filter(item => item.section === 'Mac & Cheese')
  const smashburgerItems = menuItems.filter(item => item.section === 'Smashburger')
  const burgerItems = menuItems.filter(item => item.section === 'Burger')
  const loadedFriesItems = menuItems.filter(item => item.section === 'Loaded Fries')
  const saucenItems = menuItems.filter(item => item.section === 'Saucen')

  // OLD HARD-CODED ARRAYS - TO BE REMOVED
  const loadedFriesItemsFallbackOLD = [
    {
      name: 'Cheese Fries',
      price: '8,90 €',
      description: 'mit hauseigener cremigen Käsesauce, frischer Petersilie, zartschmelzendem Mozzarella, gebratene Zwiebel und Gran Padano',
      image: '/HIRO BURGER/Cheese Fries.webp',
      tags: ['Vegetarisch']
    },
    {
      name: 'Bacon Cheese Fries',
      price: '10,90 €',
      description: 'mit hauseigner Käsesauce, gebratenen Zwiebeln, knusprig gegrilltem Bacon, frischer Petersilie, zartschmelzendem Mozzarella, Röstzwiebeln und Grana Padano',
      image: '/HIRO BURGER/Bacon Cheese Fries.webp',
      tags: []
    },
    {
      name: 'Mexico Fries',
      price: '10,90 €',
      description: 'mit hauseigener Guacamole, würziger Tomaten-Salsa, frischer Petersilie, zartschmelzendem Mozzarella, Grana Padano und hauseigener Soße',
      image: '/HIRO BURGER/Mexico Fries.webp',
      tags: ['Vegetarisch']
    },
    {
      name: 'Rahmchampignon-Fries',
      price: '10,90 €',
      description: 'mit hauseigener Rahmsauce, gebratenen Champignons, frischer Petersilie, zartschmelzendem Mozzarella und Grana Padano',
      image: '/HIRO BURGER/Rahmchampignon-Fries.webp',
      tags: ['Vegetarisch']
    }
  ]

  const saucenItemsOLD = [
    {
      name: 'Cheesesauce',
      price: '3,90 €',
      description: 'Eine cremige, geschmolzene Käsesauce, reichhaltig und würzig.',
      image: '/HIRO BURGER/Cheesesauce.webp',
      tags: ['Vegetarisch']
    },
    {
      name: 'Guacamole',
      price: '3,90 €',
      description: 'Ein cremiger Avocado-Dip',
      image: '/HIRO BURGER/Guacamole.webp',
      tags: ['Vegan', 'Vegetarisch']
    },
    {
      name: 'Ketchup',
      price: '1,50 €',
      description: 'Eine klassische, süß-säuerliche Tomatensauce.',
      image: '/HIRO BURGER/Ketchup.webp',
      tags: []
    },
    {
      name: 'Mayonnaise',
      price: '1,50 €',
      description: 'Eine cremige Sauce, hergestellt aus Eigelb, Öl und Essig.',
      image: '/HIRO BURGER/Mayonnaise.webp',
      tags: []
    },
    {
      name: 'Trüffelmayonnaise',
      price: '2,50 €',
      description: 'Cremige Mayonnaise, verfeinert Trüffelaroma',
      image: '/HIRO BURGER/Trüffelmayonnaise.webp',
      tags: ['Vegetarisch']
    },
    {
      name: 'Hauseigene Burgersauce',
      price: '1,50 €',
      description: 'Eine cremige und würzige Sauce, speziell für Burger kreiert, mit einem einzigartigen Geschmack.',
      image: '/HIRO BURGER/Hauseigene Burgersauce.webp',
      tags: []
    },
    {
      name: 'BBQ-Sauce',
      price: '1,50 €',
      description: 'Eine rauchige, süß-würzige Sauce mit Noten von Tomate und Gewürzen.',
      image: '/HIRO BURGER/BBQ-Sauce.webp',
      tags: []
    },
    {
      name: 'Süß-Sauer-Sauce',
      price: '1,50 €',
      description: 'Eine lebhafte Sauce mit einer ausgewogenen Kombination aus Süße und Säure.',
      image: '/HIRO BURGER/Süß-Sauer-Sauce.webp',
      tags: []
    }
  ]

 
  const burgerItemsOLD = [
    {
      name: 'The Cheeseburger',
      price: '7,43 €',
      originalPrice: '9,90 €',
      description: 'mit 150g Rindfeisch-Patty, doppelt geschmolzenem Irish Cheddar, gebratenen Zwiebeln, frischem Lollo Bionda, roten Zwiebeln, frischen Tomaten und hauseigener Burgersauce',
      image: '/HIRO BURGER/The Cheeseburger.webp',
      tags: [],
      customizationOptions: {
        title: "Deine Extras:",
        required: false,
        multiple: true,
        options: [
          { label: "mit Guacamole", price: 2.00 },
          { label: "mit Röstzwiebel", price: 1.50 },
          { label: "mit sauren Gurken", price: 1.50 },
          { label: "mit Rindfleisch-Patty, extra", price: 3.00 },
          { label: "mit Cheddarscheibe, Irish", price: 1.50 },
          { label: "mit Jalapenos, gegrillt", price: 1.50 },
          { label: "mit Tomatensalsa", price: 2.00 },
          { label: "mit Bacon, gegrillt", price: 2.00 },
          { label: "mit Chili-con-Carne", price: 2.00 },
          { label: "mit Onion Rings", price: 2.00 },
          { label: "mit Champignons, gegrillt", price: 2.00 },
          { label: "mit Zwiebeln, rot", price: 1.50 },
          { label: "mit Grana Padano (Parmesan)", price: 2.00 },
          { label: "mit Mozzarella", price: 1.50 },
          { label: "mit Crispy Chicken Patty", price: 4.00 },
          { label: "mit karamellisierten Zwiebeln", price: 2.00 },
          { label: "mit gebratenen Zwiebeln", price: 2.00 },
          { label: "mit Tomaten", price: 1.50 }
        ]
      }
    },
    {
      name: 'Chili-Cheeseburger',
      price: '10,90 €',
      description: 'mit 150g Rindfeisch-Patty, frisch gegrillten Jalapenos, frischem Lollo Bionda, gegrillten Zwiebeln, roten Zwiebeln, frischen Tomaten, geschmolzenem Irish Cheddar, Chili-Cheesesauce und hauseigener',
      image: '/HIRO BURGER/Chili-Cheeseburger.webp',
      tags: ['Scharf'],
      customizationOptions: {
        title: "Deine Extras:",
        required: false,
        multiple: true,
        options: [
          { label: "mit Guacamole", price: 2.00 },
          { label: "mit Röstzwiebel", price: 1.50 },
          { label: "mit sauren Gurken", price: 1.50 },
          { label: "mit Rindfleisch-Patty, extra", price: 3.00 },
          { label: "mit Cheddarscheibe, Irish", price: 1.50 },
          { label: "mit Jalapenos, gegrillt", price: 1.50 },
          { label: "mit Tomatensalsa", price: 2.00 },
          { label: "mit Bacon, gegrillt", price: 2.00 },
          { label: "mit Chili-con-Carne", price: 2.00 },
          { label: "mit Onion Rings", price: 2.00 },
          { label: "mit Champignons, gegrillt", price: 2.00 },
          { label: "mit Zwiebeln, rot", price: 1.50 },
          { label: "mit Grana Padano (Parmesan)", price: 2.00 },
          { label: "mit Mozzarella", price: 1.50 },
          { label: "mit Crispy Chicken Patty", price: 4.00 },
          { label: "mit karamellisierten Zwiebeln", price: 2.00 },
          { label: "mit gebratenen Zwiebeln", price: 2.00 },
          { label: "mit Tomaten", price: 1.50 }
        ]
      }
    },
    {
      name: 'Crispy Chicken Burger',
      price: '10,90 €',
      description: 'mit in Buttermilch eingelegter Hähnchenbrust, einer Marinade aus 8 Gewürzen, roten Zwiebeln, frischen Tomaten, frischem Lollo Bionda, hauseigener Chipotlesauce und hauseigener Burgersauce',
      image: '/HIRO BURGER/Crispy Chicken Burger.webp',
      tags: [],
      customizationOptions: {
        title: "Deine Extras:",
        required: false,
        multiple: true,
        options: [
          { label: "mit Guacamole", price: 2.00 },
          { label: "mit Röstzwiebel", price: 1.50 },
          { label: "mit sauren Gurken", price: 1.50 },
          { label: "mit Rindfleisch-Patty, extra", price: 3.00 },
          { label: "mit Cheddarscheibe, Irish", price: 1.50 },
          { label: "mit Jalapenos, gegrillt", price: 1.50 },
          { label: "mit Tomatensalsa", price: 2.00 },
          { label: "mit Bacon, gegrillt", price: 2.00 },
          { label: "mit Chili-con-Carne", price: 2.00 },
          { label: "mit Onion Rings", price: 2.00 },
          { label: "mit Champignons, gegrillt", price: 2.00 },
          { label: "mit Zwiebeln, rot", price: 1.50 },
          { label: "mit Grana Padano (Parmesan)", price: 2.00 },
          { label: "mit Mozzarella", price: 1.50 },
          { label: "mit Crispy Chicken Patty", price: 4.00 },
          { label: "mit karamellisierten Zwiebeln", price: 2.00 },
          { label: "mit gebratenen Zwiebeln", price: 2.00 },
          { label: "mit Tomaten", price: 1.50 }
        ]
      }
    },
    {
      name: 'BBQ Bacon Burger',
      price: '10,90 €',
      description: 'mit 150g Rindfeisch-Patty, knusprig gegrilltem Bacon, gebratenen Zwiebeln, geschmolzenem Irish Cheddar, frischem Lollo Bionda, roten Zwiebeln, frischen Tomaten, Barbecuesauce und hauseigener Burgersauce',
      image: '/HIRO BURGER/BBQ Bacon Burger.webp',
      tags: [],
      customizationOptions: {
        title: "Deine Extras:",
        required: false,
        multiple: true,
        options: [
          { label: "mit Guacamole", price: 2.00 },
          { label: "mit Röstzwiebel", price: 1.50 },
          { label: "mit sauren Gurken", price: 1.50 },
          { label: "mit Rindfleisch-Patty, extra", price: 3.00 },
          { label: "mit Cheddarscheibe, Irish", price: 1.50 },
          { label: "mit Jalapenos, gegrillt", price: 1.50 },
          { label: "mit Tomatensalsa", price: 2.00 },
          { label: "mit Bacon, gegrillt", price: 2.00 },
          { label: "mit Chili-con-Carne", price: 2.00 },
          { label: "mit Onion Rings", price: 2.00 },
          { label: "mit Champignons, gegrillt", price: 2.00 },
          { label: "mit Zwiebeln, rot", price: 1.50 },
          { label: "mit Grana Padano (Parmesan)", price: 2.00 },
          { label: "mit Mozzarella", price: 1.50 },
          { label: "mit Crispy Chicken Patty", price: 4.00 },
          { label: "mit karamellisierten Zwiebeln", price: 2.00 },
          { label: "mit gebratenen Zwiebeln", price: 2.00 },
          { label: "mit Tomaten", price: 1.50 }
        ]
      }
    },
    {
      name: 'Best Veggie Burger',
      price: '8,18 €',
      originalPrice: '10,90 €',
      description: 'mit Beyond-Meat-Patty, gebratenen Champignons, Tomatensalsa, frischem Lollo Bionda, frischen Tomaten, roten Zwiebeln und hauseigener Burgersauce',
      image: '/HIRO BURGER/Best Veggie Burger.webp',
      tags: ['Vegetarisch'],
      customizationOptions: {
        title: "Deine Extras:",
        required: false,
        multiple: true,
        options: [
          { label: "mit Guacamole", price: 2.00 },
          { label: "mit Röstzwiebel", price: 1.50 },
          { label: "mit sauren Gurken", price: 1.50 },
          { label: "mit Rindfleisch-Patty, extra", price: 3.00 },
          { label: "mit Cheddarscheibe, Irish", price: 1.50 },
          { label: "mit Jalapenos, gegrillt", price: 1.50 },
          { label: "mit Tomatensalsa", price: 2.00 },
          { label: "mit Bacon, gegrillt", price: 2.00 },
          { label: "mit Chili-con-Carne", price: 2.00 },
          { label: "mit Onion Rings", price: 2.00 },
          { label: "mit Champignons, gegrillt", price: 2.00 },
          { label: "mit Zwiebeln, rot", price: 1.50 },
          { label: "mit Grana Padano (Parmesan)", price: 2.00 },
          { label: "mit Mozzarella", price: 1.50 },
          { label: "mit Crispy Chicken Patty", price: 4.00 },
          { label: "mit karamellisierten Zwiebeln", price: 2.00 },
          { label: "mit gebratenen Zwiebeln", price: 2.00 },
          { label: "mit Tomaten", price: 1.50 }
        ]
      }
    },
    {
      name: 'Trüffel-Burger',
      price: '10,90 €',
      description: 'mit 150g Rindfeisch-Patty, doppelt geschmolzenem Irish Cheddar, gebratenen Zwiebeln, frischem Rucola , in Trüffelöl gegrillten Champignons , verfeinert mit Parmesan und hauseigener Trüffelmayonnaise',
      image: '/HIRO BURGER/Trüffel-Burger.webp',
      tags: [],
      customizationOptions: {
        title: "Deine Extras:",
        required: false,
        multiple: true,
        options: [
          { label: "mit Guacamole", price: 2.00 },
          { label: "mit Röstzwiebel", price: 1.50 },
          { label: "mit sauren Gurken", price: 1.50 },
          { label: "mit Rindfleisch-Patty, extra", price: 3.00 },
          { label: "mit Cheddarscheibe, Irish", price: 1.50 },
          { label: "mit Jalapenos, gegrillt", price: 1.50 },
          { label: "mit Tomatensalsa", price: 2.00 },
          { label: "mit Bacon, gegrillt", price: 2.00 },
          { label: "mit Chili-con-Carne", price: 2.00 },
          { label: "mit Onion Rings", price: 2.00 },
          { label: "mit Champignons, gegrillt", price: 2.00 },
          { label: "mit Zwiebeln, rot", price: 1.50 },
          { label: "mit Grana Padano (Parmesan)", price: 2.00 },
          { label: "mit Mozzarella", price: 1.50 },
          { label: "mit Crispy Chicken Patty", price: 4.00 },
          { label: "mit karamellisierten Zwiebeln", price: 2.00 },
          { label: "mit gebratenen Zwiebeln", price: 2.00 },
          { label: "mit Tomaten", price: 1.50 }
        ]
      }
    }
  ]

  const smashburgerItemsOLD = [
    {
      name: 'Single Smashburger',
      price: '7,90 €',
      description: 'mit 90g Rindfleisch-Patty, doppelt geschmolzenem Irish Cheddar, karamellisierten Zwiebeln, süßen Gewürzgurken, Ketchup und amerikanischem Senf',
      image: '/HIRO BURGER/Single Smashburger.webp',
      tags: [],
      customizationOptions: {
        title: "Deine Extras:",
        required: false,
        multiple: true,
        options: [
          { label: "mit Guacamole", price: 2.00 },
          { label: "mit Röstzwiebel", price: 1.50 },
          { label: "mit sauren Gurken", price: 1.50 },
          { label: "mit Rindfleisch-Patty, extra", price: 3.00 },
          { label: "mit Cheddarscheibe, Irish", price: 1.50 },
          { label: "mit Jalapenos, gegrillt", price: 1.50 },
          { label: "mit Tomatensalsa", price: 2.00 },
          { label: "mit Bacon, gegrillt", price: 2.00 },
          { label: "mit Chili-con-Carne", price: 2.00 },
          { label: "mit Onion Rings", price: 2.00 },
          { label: "mit Champignons, gegrillt", price: 2.00 },
          { label: "mit Zwiebeln, rot", price: 1.50 },
          { label: "mit Grana Padano (Parmesan)", price: 2.00 },
          { label: "mit Mozzarella", price: 1.50 },
          { label: "mit Crispy Chicken Patty", price: 4.00 },
          { label: "mit karamellisierten Zwiebeln", price: 2.00 },
          { label: "mit gebratenen Zwiebeln", price: 2.00 },
          { label: "mit Tomaten", price: 1.50 }
        ]
      }
    },
    {
      name: 'Double Smashburger',
      price: '9,90 €',
      description: 'mit 2 x 90g Rindfleisch-Patty, doppelt geschmolzenem Irish Cheddar, karamellisierten Zwiebeln, süßen Gewürzgurken, Ketchup und amerikanischem Senf',
      image: '/HIRO BURGER/Double Smashburger.webp',
      tags: [],
      customizationOptions: {
        title: "Deine Extras:",
        required: false,
        multiple: true,
        options: [
          { label: "mit Guacamole", price: 2.00 },
          { label: "mit Röstzwiebel", price: 1.50 },
          { label: "mit sauren Gurken", price: 1.50 },
          { label: "mit Rindfleisch-Patty, extra", price: 3.00 },
          { label: "mit Cheddarscheibe, Irish", price: 1.50 },
          { label: "mit Jalapenos, gegrillt", price: 1.50 },
          { label: "mit Tomatensalsa", price: 2.00 },
          { label: "mit Bacon, gegrillt", price: 2.00 },
          { label: "mit Chili-con-Carne", price: 2.00 },
          { label: "mit Onion Rings", price: 2.00 },
          { label: "mit Champignons, gegrillt", price: 2.00 },
          { label: "mit Zwiebeln, rot", price: 1.50 },
          { label: "mit Grana Padano (Parmesan)", price: 2.00 },
          { label: "mit Mozzarella", price: 1.50 },
          { label: "mit Crispy Chicken Patty", price: 4.00 },
          { label: "mit karamellisierten Zwiebeln", price: 2.00 },
          { label: "mit gebratenen Zwiebeln", price: 2.00 },
          { label: "mit Tomaten", price: 1.50 }
        ]
      }
    },
    {
      name: 'The Hiro Smash',
      price: '8,90 €',
      description: 'mit 90g Rindfleisch-Patty, doppelt geschmolzenem Irish Cheddar, karamellisierten Zwiebeln, süßen Gewürzgurken, knackigen Eisbergsalat, frischen Gurkenstreifen und Hiro Special Sauce',
      image: '/HIRO BURGER/The Hiro Smash.webp',
      tags: []
    }
  ]

  const macAndCheeseItemsOLD = [
    {
      name: 'Mac & Cheese (Klein)',
      price: '4,90 €',
      description: 'Ein kleiner Teller mit klassischen Makkaroni in einer cremigen Käsesauce.',
      image: '/HIRO BURGER/Mac & Cheese (Klein).webp',
      tags: ['Vegetarisch']
    },
    {
      name: 'Mac & Cheese (Groß)',
      price: '7,90 €',
      description: 'Ein großer Teller mit klassischen Makkaroni in einer cremigen Käsesauce.',
      image: '/HIRO BURGER/Mac & Cheese (Groß).webp',
      tags: ['Vegetarisch']
    },
    {
      name: 'Favorite Mac & Cheese Bowl',
      price: '11,90 €',
      description: 'Homemade, cremig, käsige Mac & Cheese Bowl mit Crispy Chicken, Coleslaw, hauseigener Soße und mit Röstzwiebeln verfeinert',
      image: '/HIRO BURGER/Favorite Mac & Cheese Bowl.webp',
      tags: []
    }
  ]

  const fingerfoodItemsOLD = [
    {
      name: 'Pommes Frites (1 Pfund)',
      price: '5,90 €',
      description: 'mit Meersalz verfeinert',
      image: '/HIRO BURGER/Pommes Frites (1 Pfund).webp',
      tags: ['Vegan', 'Vegetarisch']
    },
    {
      name: 'Süßkartoffel-Pommes (1 Pfund)',
      price: '7,90 €',
      description: 'mit hauseigenen Gewürzen',
      image: '/HIRO BURGER/Süßkartoffel-Pommes (1 Pfund).webp',
      tags: ['Vegan', 'Vegetarisch']
    },
    {
      name: 'Mini Frühlingsrollen (8 Stück, vegetarisch)',
      price: '5,50 €',
      description: 'Knusprig frittierte kleine Rollen, gefüllt mit frischem Gemüse.',
      image: '/HIRO BURGER/Mini Frühlingsrollen (8 Stück, vegetarisch).webp',
      tags: ['Vegetarisch']
    },
    {
      name: 'Hiro´s Chicken Filet (4 Stück)',
      price: '7,90 €',
      description: '48h mariniert, extrem saftig, maximaler Crunch. In unserer Buttermilk-Gewürzmarinade eingelegt, danach in einer knusprigen Signature-Panade frittiert. Außen laut knusprig, innen butterzart',
      image: '/HIRO BURGER/Hiro´s Chicken Filet (4 Stück).webp',
      tags: []
    },
    {
      name: 'Hiro Cheese Sticks (4 Stück)',
      price: '5,90 €',
      description: 'Unsere hausgemachten Mozza Sticks - außen crunch, innen cremig. Perfekt zum Snacken & Dippen!',
      image: '',
      tags: ['Vegetarisch']
    },
    {
      name: 'Gebackene Garnelen (4 Stück)',
      price: '7,90 €',
      description: 'Crunchy Panko-Garnelen - außen super knusprig, innen butterzart',
      image: '/HIRO BURGER/Gebackene Garnelen (4 Stück).webp',
      tags: []
    },
    {
      name: 'Chicken Nuggets (8 Stück)',
      price: '7,90 €',
      description: 'knusprig frittierte Hähnchennuggets',
      image: '/HIRO BURGER/Chicken Nuggets (8 Stück).webp',
      tags: []
    },
    {
      name: 'Gurken-Kimchi',
      price: '5,90 €',
      description: 'koreanisches Gurken-Kimchi mit gerösteten Sesam',
      image: '/HIRO BURGER/Gurken-Kimchi.webp',
      tags: ['Scharf']
    },
    {
      name: 'Onion Rings (7 Stück)',
      price: '6,90 €',
      description: 'große panierte Zwiebelringe',
      image: '/HIRO BURGER/Onion Rings (7 Stück).webp',
      tags: ['Vegetarisch']
    },
    {
      name: 'Coleslaw',
      price: '6,90 €',
      description: 'Frischer Krautsalat aus feinem Weißkohl und Karotten, abgerundet mit einem cremigen Dressing',
      image: '/HIRO BURGER/Coleslaw.webp',
      tags: []
    }
  ]

  const categories = [
    'Fingerfood',
    'Mac & Cheese',
    'Smashburger',
    'Burger',
    'Loaded Fries',
    'Saucen'
  ]

  // Get all items for search
  const allItems = [
    ...burgerItems.map(item => ({ ...item, section: 'Burger' })),
    ...smashburgerItems.map(item => ({ ...item, section: 'Smashburger' })),
    ...macAndCheeseItems.map(item => ({ ...item, section: 'Mac & Cheese' })),
    ...fingerfoodItems.map(item => ({ ...item, section: 'Fingerfood' })),
    ...loadedFriesItems.map(item => ({ ...item, section: 'Loaded Fries' })),
    ...saucenItems.map(item => ({ ...item, section: 'Saucen' }))
  ]

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
                  <h1 className="text-l md:text-3xl font-bold text-gray-900">HIRO BURGER</h1>
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
                placeholder="Suche HIRO BURGER | Bühlau"
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
                    {item.name === 'Hiro Cheese Sticks (4 Stück)' ? (
                      // Special layout for Hiro Cheese Sticks without image
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <h3 className="font-bold text-gray-900 text-base mb-1">{item.name}</h3>
                          <button className="text-xs text-gray-700 hover:text-gray-900 underline mb-2">
                            Produktinfo
                          </button>
                          <div className="font-bold text-gray-900 text-base mb-2">{item.price}</div>
                          <p className="text-xs text-gray-600 mb-2">{item.description}</p>
                          {item.tags.length > 0 && (
                            <div className="flex gap-1.5 flex-wrap">
                              {item.tags.map((tag: string) => (
                                <span
                                  key={tag}
                                  className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-green-100 text-green-800"
                                >
                                  🥬 {tag}
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
                              src={encodeURI(item.image)}
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

            {/* Mac & Cheese Section */}
            <section id="mac-and-cheese" className="mb-12">
              <div className="flex items-center justify-between mb-6 bg-white px-4 py-3 rounded-lg shadow-sm border-2 border-transparent hover:border-white hover:shadow-[0_0_40px_rgba(255,255,255,1)] transition-all duration-300 cursor-pointer">
                <h2 className="text-3xl font-bold text-gray-900">Mac & Cheese</h2>
                <span className="text-gray-600 font-semibold">{macAndCheeseItems.length} Artikel</span>
              </div>

              {/* Grid Layout */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {macAndCheeseItems.map((item: any) => (
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

            {/* Smashburger Section */}
            <section id="smashburger" className="mb-12">
              <div className="mb-6 bg-white px-4 py-3 rounded-lg shadow-sm border-2 border-transparent hover:border-white hover:shadow-[0_0_40px_rgba(255,255,255,1)] transition-all duration-300 cursor-pointer">
                <div className="flex items-center justify-between mb-2">
                  <h2 className="text-3xl font-bold text-gray-900">Smashburger</h2>
                  <span className="text-gray-600 font-semibold">{smashburgerItems.length} Artikel</span>
                </div>
                <p className="text-sm text-gray-600">Der berühmte Trend aus Amerika, auch mit den Martin Potato Rolls</p>
              </div>

              {/* Grid Layout */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {smashburgerItems.map((item: any) => (
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

            {/* Burger Section */}
            <section id="burger" className="mb-12">
              <div className="mb-6 bg-white px-4 py-3 rounded-lg shadow-sm border-2 border-transparent hover:border-white hover:shadow-[0_0_40px_rgba(255,255,255,1)] transition-all duration-300 cursor-pointer">
                <div className="flex items-center justify-between mb-2">
                  <h2 className="text-3xl font-bold text-gray-900">Burger</h2>
                  <span className="text-gray-600 font-semibold">{burgerItems.length} Artikel</span>
                </div>
                <p className="text-sm text-gray-600">Alle Burger werden mit hausgemachtem Burger-Patty aus Black Angus Rind zubereitet.</p>
              </div>

              {/* Grid Layout */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {burgerItems.map((item: any) => (
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
                        <div className="mb-2">
                          <div className="font-bold text-gray-900 text-base">{item.price}</div>
                          {'originalPrice' in item && item.originalPrice ? (
                            <div className="text-xs text-gray-500 line-through">{String(item.originalPrice)}</div>
                          ) : null}
                        </div>
                        <p className="text-xs text-gray-600 mb-2 line-clamp-2">{item.description}</p>

                        {/* Tags */}
                        {'tags' in item && item.tags && item.tags.length > 0 && (
                          <div className="flex gap-1.5 flex-wrap">
                            {item.tags.map((tag: string) => (
                              <span
                                key={tag}
                                className={`px-2.5 py-0.5 rounded-full text-xs font-semibold ${tag === 'Vegetarisch'
                                  ? 'bg-green-100 text-green-800'
                                  : tag === 'Scharf'
                                    ? 'bg-red-100 text-red-800'
                                    : tag === '25% Rabatt'
                                      ? 'bg-yellow-100 text-yellow-800'
                                      : 'bg-gray-100 text-gray-800'
                                  }`}
                              >
                                {tag === 'Vegetarisch' && '🥬 '}
                                {tag === 'Scharf' && '🌶️ '}
                                {tag === '25% Rabatt' && '🏷️ '}
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

            {/* Loaded Fries Section */}
            <section id="loaded-fries" className="mb-12">
              <div className="flex items-center justify-between mb-6 bg-white px-4 py-3 rounded-lg shadow-sm border-2 border-transparent hover:border-white hover:shadow-[0_0_40px_rgba(255,255,255,1)] transition-all duration-300 cursor-pointer">
                <h2 className="text-3xl font-bold text-gray-900">Loaded Fries</h2>
                <span className="text-gray-600 font-semibold">{loadedFriesItems.length} Artikel</span>
              </div>

              {/* Grid Layout */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {loadedFriesItems.map((item: any) => (
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

          
            {/* Saucen Section */}
            <section id="saucen" className="mb-12">
              <div className="flex items-center justify-between mb-6 bg-white px-4 py-3 rounded-lg shadow-sm border-2 border-transparent hover:border-white hover:shadow-[0_0_40px_rgba(255,255,255,1)] transition-all duration-300 cursor-pointer">
                <h2 className="text-3xl font-bold text-gray-900">Saucen</h2>
                <span className="text-gray-600 font-semibold">{saucenItems.length} Artikel</span>
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
                        <p className="text-xs text-gray-600 mb-2 line-clamp-2">{item.description}</p>

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
