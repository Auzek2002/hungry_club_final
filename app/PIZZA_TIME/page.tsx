'use client'

import Image from 'next/image'
import { useRef, useState, useEffect } from 'react'
import ItemModal from '../components/ItemModal'
import CartBanner from '../components/CartBanner'

function PizzaTimeContent() {
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
        'pizza-ca.30-cm',
        'saucen',
        'desserts',
        'alkoholfreie-getränke',
        'alkoholische-getränke'
      ]

      const categoryNames = [
        'Beliebt',
        'Vorspeisen',
        'Pizza ca.30 cm',
        'Saucen',
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
    return category.toLowerCase().replace(/\s+/g, '-').replace(/&/g, 'and').replace(/ä/g, 'ä').replace(/ö/g, 'ö').replace(/ü/g, 'ü')
  }

  const beliebteItems = [
    {
      name: 'Pizza Margherita',
      price: '7,90 €',
      description: 'mit Basilikum und Oregano',
      image: '/PIZZA TIME/Pizza Margherita.webp',
      category: 'Pizza ca.30 cm'
    },
    {
      name: 'Pizza Hiro',
      price: '13,00 €',
      description: 'mit Burger Crumble, Tomatenscheiben, karamellisierten Zwiebeln, Gewürzgurken, Cheddar, Salat und Burgersauce',
      image: '/PIZZA TIME/Pizza Hiro.webp',
      category: 'Pizza ca.30 cm'
    },
    {
      name: 'Mango Cheesecake',
      price: '5,90 €',
      description: 'hausgemachtes Mango-Cheesecake mit Butterkeksboden',
      image: '/PIZZA TIME/Mango Cheesecake.webp',
      category: 'Desserts'
    },
    {
      name: 'Pizza Caprese',
      price: '7,90 €',
      description: 'mit Tomatenscheiben, Büffelmozzarella, Pesto und Oregano',
      image: '/PIZZA TIME/Pizza Caprese.webp',
      category: 'Pizza ca.30 cm'
    },
    {
      name: 'Pizza Chicken Hollandaise',
      price: '8,90 €',
      description: 'mit Sauce Hollandaise, Mozzarella, Hähnchenstreifen, Broccoli und Kirschtomaten, ohne Tomatensauce',
      image: '/PIZZA TIME/Pizza Chicken Hollandaise.webp',
      category: 'Pizza ca.30 cm'
    }
  ]

  const vorspeisen = [
    {
      name: 'Chicken Nuggets (8 Stück)',
      price: '6,90 €',
      description: 'knusprig frittierte Hähnchen Nuggets',
      image: '/PIZZA TIME/Chicken Nuggets (8 Stück).webp',
      tags: []
    },
    {
      name: 'Onion Rings (7 Stück)',
      price: '5,90 €',
      description: 'große panierte Zwiebelringe',
      image: '/PIZZA TIME/Onion Rings (7 Stück).webp',
      tags: []
    },
    {
      name: 'Mozzarella Sticks (7 Stück)',
      price: '5,90 €',
      description: 'mit Kräuterpanade',
      image: '/PIZZA TIME/Mozzarella Sticks (7 Stück).webp',
      tags: []
    },
    {
      name: 'Gurken Kimchi',
      price: '5,90 €',
      description: 'koreanisches Gurken-Kimchi mit geröstetem Sesam',
      image: '/PIZZA TIME/Gurken Kimchi.webp',
      tags: []
    },
    {
      name: 'Coleslaw',
      price: '6,90 €',
      description: 'frischer Krautsalat mit Weißkohl, Karotten und cremigem Dressing',
      image: '/PIZZA TIME/Coleslaw.webp',
      tags: []
    },
    {
      name: 'Mac and Cheese (klein)',
      price: '4,90 €',
      description: '',
      image: '/PIZZA TIME/Mac and Cheese (klein).webp',
      tags: []
    },
    {
      name: 'Mac and Cheese (Groß)',
      price: '8,90 €',
      description: '',
      image: '/PIZZA TIME/Mac and Cheese (Groß).webp',
      tags: []
    }
  ]

  const pizzaCa30Items = [
    {
      name: 'Pizza Margherita',
      price: '5,93 €',
      originalPrice: '7,90 €',
      description: 'mit Basilikum und Oregano',
      image: '/PIZZA TIME/Pizza Margherita.webp',
      tags: []
    },
    {
      name: 'Pizza Salami',
      price: '6,68 €',
      originalPrice: '8,90 €',
      description: 'mit Salami',
      image: '/PIZZA TIME/Pizza Salami.webp',
      tags: []
    },
    {
      name: 'Pizza Caprese',
      price: '7,90 €',
      description: 'mit Tomatenscheiben, Büffelmozzarella, Pesto und Oregano',
      image: '/PIZZA TIME/Pizza Caprese.webp',
      tags: []
    },
    {
      name: 'Pizza Prosciutto',
      price: '8,90 €',
      description: 'mit Schinken',
      image: '/PIZZA TIME/Pizza Prosciutto.webp',
      tags: []
    },
    {
      name: 'Pizza BBQ-Chicken',
      price: '8,01 €',
      originalPrice: '8,90 €',
      description: 'mit Barbecuesauce, Mozzarella, Hähnchenstreifen, Mais, Paprika und Zwiebeln, ohne Tomatensauce',
      image: '/PIZZA TIME/Pizza BBQ-Chicken.webp',
      tags: []
    },
    {
      name: 'Pizza Hawaii',
      price: '8,90 €',
      description: 'mit Schinken und Ananas',
      image: '/PIZZA TIME/Pizza Hawaii.webp',
      tags: []
    },
    {
      name: 'Pizza Chicken Teriyaki',
      price: '9,90 €',
      description: 'mit Hähnchenfleisch, Broccoli, Mais, Frühlingszwiebeln, Sesam und Teriyakisauce',
      image: '',
      tags: []
    },
    {
      name: 'Pizza Prosciutto e Funghi',
      price: '8,90 €',
      description: 'mit Schinken und Champignons',
      image: '/PIZZA TIME/Pizza Prosciutto e Funghi.webp',
      tags: []
    },
    {
      name: 'Pizza Tonno',
      price: '8,90 €',
      description: 'mit Thunfisch und Zwiebeln',
      image: '/PIZZA TIME/Pizza Tonno.webp',
      tags: []
    },
    {
      name: 'Pizza Funghi',
      price: '7,90 €',
      description: 'mit Champignons und Oregano',
      image: '/PIZZA TIME/Pizza Funghi.webp',
      tags: []
    },
    {
      name: 'Pizza Primavera',
      price: '8,90 €',
      description: 'mit Kirschtomaten, Rucola, Parmesan und Pinienkernen',
      image: '/PIZZA TIME/Pizza Primavera.webp',
      tags: []
    },
    {
      name: 'Pizza Salmone Spinaci',
      price: '9,90 €',
      description: 'mit Creme fraiche, Mozzarella, Lachs, Blattspinat, Knoblauch und Schnittlauch, ohne Tomatensauce',
      image: '/PIZZA TIME/Pizza Salmone Spinaci.webp',
      tags: []
    },
    {
      name: 'Pizza Hiro',
      price: '11,12 €',
      originalPrice: '13,90 €',
      description: 'mit Burger Crumble, Tomatenscheiben, karamellisierten Zwiebeln, Gewürzgurken, Cheddar, Salat und Burgersauce',
      image: '/PIZZA TIME/Pizza Hiro.webp',
      tags: []
    },
    {
      name: 'Pizza Chicken Hollandaise',
      price: '8,90 €',
      description: 'mit Sauce Hollandaise, Mozzarella, Hähnchenstreifen, Broccoli und Kirschtomaten, ohne Tomatensauce',
      image: '/PIZZA TIME/Pizza Chicken Hollandaise.webp',
      tags: []
    },
    {
      name: 'Pizza Diavolo (scharf)',
      price: '8,90 €',
      description: 'mit scharfer Salami, Peperoni und Zwiebeln',
      image: '/PIZZA TIME/Pizza Diavolo (scharf).webp',
      tags: []
    },
    {
      name: 'Pizza Vegetaria',
      price: '8,90 €',
      description: 'mit Kirschtomaten, Paprika, Broccoli, Mais, Oliven und Champignons',
      image: '/PIZZA TIME/Pizza Vegetaria.webp',
      tags: []
    },
    {
      name: 'Pizza Capricciosa',
      price: '8,90 €',
      description: 'mit Artischocken, Schinken, Oliven und Champignons',
      image: '/PIZZA TIME/Pizza Capricciosa.webp',
      tags: []
    },
    {
      name: 'Pizza Tartufo',
      price: '9,90 €',
      description: 'mit Creme fraiche, Trüffelcreme, Pancetta, Rucola und Parmesan, ohne Tomatensauce und Mozzarella',
      image: '/PIZZA TIME/Pizza Tartufo.webp',
      tags: []
    },
    {
      name: 'Pizza Parma',
      price: '9,90 €',
      description: 'mit Parmaschinken, Rucola, Kirschtomaten und Parmesan',
      image: '/PIZZA TIME/Pizza Parma.webp',
      tags: []
    },
    {
      name: 'Pizza Bollywood',
      price: '8,90 €',
      description: 'mit Mango-Currysauce, Mozzarella, Hähnchenstreifen, Ananas und Paprika, ohne Tomatensauce',
      image: '/PIZZA TIME/Pizza Bollywood.webp',
      tags: []
    },
    {
      name: 'Pizza Hot Dog',
      price: '8,90 €',
      description: 'mit Würstchenscheiben, Gewürzgurken, Röstzwiebeln und Hot-Dogsauce',
      image: '/PIZZA TIME/Pizza Hot Dog.webp',
      tags: []
    },
    {
      name: 'Pizza Quattro Formaggi',
      price: '8,90 €',
      description: 'mit 4 verschiedenen Käsesorten',
      image: '/PIZZA TIME/Pizza Quattro Formaggi.webp',
      tags: []
    },
    {
      name: 'Pizza Spinaci',
      price: '8,90 €',
      description: 'mit Spinat, Knoblauch, Ei',
      image: '',
      tags: []
    },
    {
      name: 'Pizza Quattro Stagioni',
      price: '10,90 €',
      description: 'mit Salami, Schinken, Paprika, Champignons und roten Zwiebeln',
      image: '',
      tags: []
    }
  ]

  const saucenItems = [
    {
      name: 'Ketchup',
      price: '1,50 €',
      description: '',
      image: '/PIZZA TIME/Ketchup.webp',
      tags: []
    },
    {
      name: 'Mayonnaise',
      price: '1,50 €',
      description: '',
      image: '/PIZZA TIME/Mayonnaise.webp',
      tags: []
    },
    {
      name: 'Guacamole',
      price: '3,90 €',
      description: '',
      image: '/PIZZA TIME/Guacamole.webp',
      tags: []
    },
    {
      name: 'Cheesesauce',
      price: '3,90 €',
      description: '',
      image: '/PIZZA TIME/Cheesesauce.webp',
      tags: []
    },
    {
      name: 'Süß-Sauer-Sauce',
      price: '1,50 €',
      description: '',
      image: '/PIZZA TIME/Süß-Sauer-Sauce.webp',
      tags: []
    },
    {
      name: 'Barbecuesauce',
      price: '1,50 €',
      description: '',
      image: '/PIZZA TIME/Barbecuesauce.webp',
      tags: []
    },
    {
      name: 'Srirachasauce',
      price: '1,50 €',
      description: '',
      image: '/PIZZA TIME/Srirachasauce.webp',
      tags: []
    },
    {
      name: 'Trüffelmayonnaise',
      price: '2,50 €',
      description: '',
      image: '/PIZZA TIME/Trüffelmayonnaise.webp',
      tags: []
    },
    {
      name: 'Teriyakisauce',
      price: '2,00 €',
      description: '',
      image: '/PIZZA TIME/Teriyakisauce.webp',
      tags: []
    }
  ]

  const dessertItems = [
    {
      name: 'Creme Brulee',
      price: '4,90 €',
      description: 'feine Vanillecreme mit goldbrauner, knuspriger Karamellkruste und saisonalem Obst',
      image: '/PIZZA TIME/Creme Brulee.webp',
      tags: []
    },
    {
      name: 'Banana Pudding',
      price: '5,90 €',
      description: 'hausgemachter Banana Pudding - frische Bananenscheiben, luftige Vanillecreme und Eierkeksschichten, liebevoll geschichtet',
      image: '/PIZZA TIME/Banana Pudding.webp',
      tags: []
    },
    {
      name: 'Mango Cheesecake',
      price: '5,90 €',
      description: 'hausgemachtes Mango-Cheesecake mit Butterkeksboden',
      image: '/PIZZA TIME/Mango Cheesecake.webp',
      tags: []
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
      name: 'Mango Lassi 0,4l (EINWEG)',
      price: '4,65 €',
      description: '',
      image: '/PIZZA TIME/Mango Lassi 0,4l (EINWEG).webp',
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
    'Vorspeisen',
    'Pizza ca.30 cm',
    'Saucen',
    'Desserts',
    'Alkoholfreie Getränke',
    'Alkoholische Getränke'
  ]

  // Get all items for search
  const allItems = [
    ...beliebteItems.map(item => ({ ...item, section: 'Beliebt' })),
    ...vorspeisen.map(item => ({ ...item, section: 'Vorspeisen' })),
    ...pizzaCa30Items.map(item => ({ ...item, section: 'Pizza ca.30 cm' })),
    ...saucenItems.map(item => ({ ...item, section: 'Saucen' })),
    ...dessertItems.map(item => ({ ...item, section: 'Desserts' })),
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
                  <h1 className="text-3xl font-bold text-gray-900">Pizza Time</h1>
                  <div className="flex items-center gap-2 mt-2">
                    <span className="text-orange-500">★</span>
                    <span className="text-sm font-semibold text-gray-700">3,9 (42)</span>
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

            {/* Vorspeisen Section */}
            <section id="vorspeisen" className="mb-12">
              <div className="flex items-center justify-between mb-6 bg-white px-4 py-3 rounded-lg shadow-sm border-2 border-transparent hover:border-[#CC0000] hover:shadow-md transition-all duration-300 cursor-pointer">
                <h2 className="text-3xl font-bold text-gray-900">Vorspeisen</h2>
                <span className="text-gray-600 font-semibold">7 Artikel</span>
              </div>

              {/* Grid Layout */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {vorspeisen.map((item) => (
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
              <div className="mb-6 bg-white px-4 py-3 rounded-lg shadow-sm border-2 border-transparent hover:border-[#CC0000] hover:shadow-md transition-all duration-300 cursor-pointer">
                <div className="flex items-center justify-between mb-2">
                  <h2 className="text-3xl font-bold text-gray-900">Pizza ca.30 cm</h2>
                  <span className="text-gray-600 font-semibold">24 Artikel</span>
                </div>
                <p className="text-sm text-gray-600">Alle Pizzen werden mit Tomatensauce und Mozzarella zubereitet.</p>
              </div>

              {/* Grid Layout */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {pizzaCa30Items.map((item) => (
                  <div
                    key={item.name}
                    onClick={() => openModal(item)}
                    className="bg-white rounded-lg shadow-sm hover:shadow-md transition-all duration-300 cursor-pointer border-2 border-transparent hover:border-[#CC0000] p-4"
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
                              {item.tags.map((tag) => (
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
                              {item.tags.map((tag) => (
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
              <div className="flex items-center justify-between mb-6 bg-white px-4 py-3 rounded-lg shadow-sm border-2 border-transparent hover:border-[#CC0000] hover:shadow-md transition-all duration-300 cursor-pointer">
                <h2 className="text-3xl font-bold text-gray-900">Saucen</h2>
                <span className="text-gray-600 font-semibold">9 Artikel</span>
              </div>

              {/* Grid Layout */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {saucenItems.map((item) => (
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

            {/* Desserts Section */}
            <section id="desserts" className="mb-12">
              <div className="flex items-center justify-between mb-6 bg-white px-4 py-3 rounded-lg shadow-sm border-2 border-transparent hover:border-[#CC0000] hover:shadow-md transition-all duration-300 cursor-pointer">
                <h2 className="text-3xl font-bold text-gray-900">Desserts</h2>
                <span className="text-gray-600 font-semibold">3 Artikel</span>
              </div>

              {/* Grid Layout */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {dessertItems.map((item) => (
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

            {/* Alkoholfreie Getränke Section */}
            <section id="alkoholfreie-getränke" className="mb-12">
              <div className="flex items-center justify-between mb-6 bg-white px-4 py-3 rounded-lg shadow-sm border-2 border-transparent hover:border-[#CC0000] hover:shadow-md transition-all duration-300 cursor-pointer">
                <h2 className="text-3xl font-bold text-gray-900">Alkoholfreie Getränke</h2>
                <span className="text-gray-600 font-semibold">19 Artikel</span>
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
