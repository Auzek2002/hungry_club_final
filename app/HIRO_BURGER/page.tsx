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
        'beliebt',
        'fingerfood',
        'mac-and-cheese',
        'smashburger',
        'burger',
        'loaded-fries',
        'dessert',
        'saucen',
        'alkoholfreie-getränke',
        'alkoholische-getränke'
      ]

      const categoryNames = [
        'Beliebt',
        'Fingerfood',
        'Mac & Cheese',
        'Smashburger',
        'Burger',
        'Loaded Fries',
        'Dessert',
        'Saucen',
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
      name: 'Double Smashburger',
      price: '9,90 €',
      description: 'mit 2 x 90g Rindfleisch-Patty, doppelt geschmolzenem Irish Cheddar, karamellisierten Zwiebeln, süßen Gewürzgurken, Ketchup und amerikanischem Senf',
      image: '/HIRO BURGER/Double Smashburger.webp',
      category: 'Smashburger'
    },
    {
      name: 'The Cheeseburger',
      price: '7,43 €',
      description: 'mit 150g Rindfeisch-Patty, doppelt geschmolzenem Irish Cheddar, gebratenen Zwiebeln, frischem Lollo Bionda, roten Zwiebeln, frischen Tomaten und hauseigener Burgersauce',
      image: '/HIRO BURGER/The Cheeseburger.webp',
      category: 'Burger'
    },
    {
      name: 'Pommes Frites (1 Pfund)',
      price: '5,90 €',
      description: 'mit Meersalz verfeinert',
      image: '/HIRO BURGER/Pommes Frites (1 Pfund).webp',
      category: 'Fingerfood'
    },
    {
      name: 'Single Smashburger',
      price: '7,90 €',
      description: 'mit 90g Rindfleisch-Patty, doppelt geschmolzenem Irish Cheddar, karamellisierten Zwiebeln, süßen Gewürzgurken, Ketchup und amerikanischem Senf',
      image: '/HIRO BURGER/Single Smashburger.webp',
      category: 'Smashburger'
    },
    {
      name: 'Crispy Chicken Burger',
      price: '10,90 €',
      description: 'mit in Buttermilch eingelegter Hähnchenbrust, einer Marinade aus 8 Gewürzen, roten Zwiebeln, frischen Tomaten, frischem Lollo Bionda, hauseigener Chipotlesauce und hauseigener Burgersauce',
      image: '/HIRO BURGER/Crispy Chicken Burger.webp',
      category: 'Burger'
    }
  ]

  const loadedFriesItems = [
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

  const dessertItems = [
    {
      name: 'Mango Cheesecake',
      price: '5,90 €',
      description: 'hausgemachtes Mango-Cheesecake mit Butterkeksboden',
      image: '/HIRO BURGER/Mango Cheesecake.webp',
      tags: ['Vegetarisch']
    },
    {
      name: 'Banana Pudding',
      price: '5,90 €',
      description: 'hausgemachter Banana Pudding - frische Bananenscheiben, luftige Vanillecreme und Eierkeksschichten, liebevoll geschichtet',
      image: '/HIRO BURGER/Banana Pudding.webp',
      tags: ['Vegetarisch']
    },
    {
      name: 'Crème brûlée',
      price: '5,90 €',
      description: 'hausgemachte Süßspeise',
      image: '/HIRO BURGER/Crème brûlée.webp',
      tags: ['Vegetarisch']
    }
  ]

  const saucenItems = [
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

  const burgerItems = [
    {
      name: 'The Cheeseburger',
      price: '7,43 €',
      originalPrice: '9,90 €',
      description: 'mit 150g Rindfeisch-Patty, doppelt geschmolzenem Irish Cheddar, gebratenen Zwiebeln, frischem Lollo Bionda, roten Zwiebeln, frischen Tomaten und hauseigener Burgersauce',
      image: '/HIRO BURGER/The Cheeseburger.webp',
      tags: []
    },
    {
      name: 'Chili-Cheeseburger',
      price: '10,90 €',
      description: 'mit 150g Rindfeisch-Patty, frisch gegrillten Jalapenos, frischem Lollo Bionda, gegrillten Zwiebeln, roten Zwiebeln, frischen Tomaten, geschmolzenem Irish Cheddar, Chili-Cheesesauce und hauseigener',
      image: '/HIRO BURGER/Chili-Cheeseburger.webp',
      tags: ['Scharf']
    },
    {
      name: 'Crispy Chicken Burger',
      price: '10,90 €',
      description: 'mit in Buttermilch eingelegter Hähnchenbrust, einer Marinade aus 8 Gewürzen, roten Zwiebeln, frischen Tomaten, frischem Lollo Bionda, hauseigener Chipotlesauce und hauseigener Burgersauce',
      image: '/HIRO BURGER/Crispy Chicken Burger.webp',
      tags: []
    },
    {
      name: 'BBQ Bacon Burger',
      price: '10,90 €',
      description: 'mit 150g Rindfeisch-Patty, knusprig gegrilltem Bacon, gebratenen Zwiebeln, geschmolzenem Irish Cheddar, frischem Lollo Bionda, roten Zwiebeln, frischen Tomaten, Barbecuesauce und hauseigener Burgersauce',
      image: '/HIRO BURGER/BBQ Bacon Burger.webp',
      tags: []
    },
    {
      name: 'Best Veggie Burger',
      price: '8,18 €',
      originalPrice: '10,90 €',
      description: 'mit Beyond-Meat-Patty, gebratenen Champignons, Tomatensalsa, frischem Lollo Bionda, frischen Tomaten, roten Zwiebeln und hauseigener Burgersauce',
      image: '/HIRO BURGER/Best Veggie Burger.webp',
      tags: ['Vegetarisch']
    },
    {
      name: 'Trüffel-Burger',
      price: '10,90 €',
      description: 'mit 150g Rindfeisch-Patty, doppelt geschmolzenem Irish Cheddar, gebratenen Zwiebeln, frischem Rucola , in Trüffelöl gegrillten Champignons , verfeinert mit Parmesan und hauseigener Trüffelmayonnaise',
      image: '/HIRO BURGER/Trüffel-Burger.webp',
      tags: []
    }
  ]

  const smashburgerItems = [
    {
      name: 'Single Smashburger',
      price: '7,90 €',
      description: 'mit 90g Rindfleisch-Patty, doppelt geschmolzenem Irish Cheddar, karamellisierten Zwiebeln, süßen Gewürzgurken, Ketchup und amerikanischem Senf',
      image: '/HIRO BURGER/Single Smashburger.webp',
      tags: []
    },
    {
      name: 'Double Smashburger',
      price: '9,90 €',
      description: 'mit 2 x 90g Rindfleisch-Patty, doppelt geschmolzenem Irish Cheddar, karamellisierten Zwiebeln, süßen Gewürzgurken, Ketchup und amerikanischem Senf',
      image: '/HIRO BURGER/Double Smashburger.webp',
      tags: []
    },
    {
      name: 'The Hiro Smash',
      price: '8,90 €',
      description: 'mit 90g Rindfleisch-Patty, doppelt geschmolzenem Irish Cheddar, karamellisierten Zwiebeln, süßen Gewürzgurken, knackigen Eisbergsalat, frischen Gurkenstreifen und Hiro Special Sauce',
      image: '/HIRO BURGER/The Hiro Smash.webp',
      tags: []
    }
  ]

  const macAndCheeseItems = [
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

  const fingerfoodItems = [
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
    'Beliebt',
    'Fingerfood',
    'Mac & Cheese',
    'Smashburger',
    'Burger',
    'Loaded Fries',
    'Dessert',
    'Saucen',
    'Alkoholfreie Getränke',
    'Alkoholische Getränke'
  ]

  // Get all items for search
  const allItems = [
    ...beliebteItems.map(item => ({ ...item, section: 'Beliebt' })),
    ...burgerItems.map(item => ({ ...item, section: 'Burger' })),
    ...smashburgerItems.map(item => ({ ...item, section: 'Smashburger' })),
    ...macAndCheeseItems.map(item => ({ ...item, section: 'Mac & Cheese' })),
    ...fingerfoodItems.map(item => ({ ...item, section: 'Fingerfood' })),
    ...loadedFriesItems.map(item => ({ ...item, section: 'Loaded Fries' })),
    ...dessertItems.map(item => ({ ...item, section: 'Dessert' })),
    ...saucenItems.map(item => ({ ...item, section: 'Saucen' })),
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
                  <h1 className="text-3xl font-bold text-gray-900">HIRO BURGER | Bühlau</h1>
                  <div className="flex items-center gap-2 mt-2">
                    <span className="text-orange-500">★</span>
                    <span className="text-sm font-semibold text-gray-700">4,6 (1.400+)</span>
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
                              src={encodeURI(item.image)}
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
                <span className="text-gray-600 font-semibold">10 Artikel</span>
              </div>

              {/* Grid Layout */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {fingerfoodItems.map((item) => (
                  <div
                    key={item.name}
                    onClick={() => openModal(item)}
                    className="bg-white rounded-lg shadow-sm hover:shadow-md transition-all duration-300 cursor-pointer border-2 border-transparent hover:border-[#CC0000] p-4"
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
                              {item.tags.map((tag) => (
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
              <div className="flex items-center justify-between mb-6 bg-white px-4 py-3 rounded-lg shadow-sm border-2 border-transparent hover:border-[#CC0000] hover:shadow-md transition-all duration-300 cursor-pointer">
                <h2 className="text-3xl font-bold text-gray-900">Mac & Cheese</h2>
                <span className="text-gray-600 font-semibold">3 Artikel</span>
              </div>

              {/* Grid Layout */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {macAndCheeseItems.map((item) => (
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
              <div className="mb-6 bg-white px-4 py-3 rounded-lg shadow-sm border-2 border-transparent hover:border-[#CC0000] hover:shadow-md transition-all duration-300 cursor-pointer">
                <div className="flex items-center justify-between mb-2">
                  <h2 className="text-3xl font-bold text-gray-900">Smashburger</h2>
                  <span className="text-gray-600 font-semibold">3 Artikel</span>
                </div>
                <p className="text-sm text-gray-600">Der berühmte Trend aus Amerika, auch mit den Martin Potato Rolls</p>
              </div>

              {/* Grid Layout */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {smashburgerItems.map((item) => (
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
              <div className="mb-6 bg-white px-4 py-3 rounded-lg shadow-sm border-2 border-transparent hover:border-[#CC0000] hover:shadow-md transition-all duration-300 cursor-pointer">
                <div className="flex items-center justify-between mb-2">
                  <h2 className="text-3xl font-bold text-gray-900">Burger</h2>
                  <span className="text-gray-600 font-semibold">6 Artikel</span>
                </div>
                <p className="text-sm text-gray-600">Alle Burger werden mit hausgemachtem Burger-Patty aus Black Angus Rind zubereitet.</p>
              </div>

              {/* Grid Layout */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {burgerItems.map((item) => (
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
                            {item.tags.map((tag) => (
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
              <div className="flex items-center justify-between mb-6 bg-white px-4 py-3 rounded-lg shadow-sm border-2 border-transparent hover:border-[#CC0000] hover:shadow-md transition-all duration-300 cursor-pointer">
                <h2 className="text-3xl font-bold text-gray-900">Loaded Fries</h2>
                <span className="text-gray-600 font-semibold">4 Artikel</span>
              </div>

              {/* Grid Layout */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {loadedFriesItems.map((item) => (
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

            {/* Dessert Section */}
            <section id="dessert" className="mb-12">
              <div className="flex items-center justify-between mb-6 bg-white px-4 py-3 rounded-lg shadow-sm border-2 border-transparent hover:border-[#CC0000] hover:shadow-md transition-all duration-300 cursor-pointer">
                <h2 className="text-3xl font-bold text-gray-900">Dessert</h2>
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
                        <p className="text-xs text-gray-600 mb-2 line-clamp-2">{item.description}</p>

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
                        <p className="text-xs text-gray-600 mb-2 line-clamp-2">{item.description}</p>

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

            {/* Alkoholfreie Getränke Section */}
            <section id="alkoholfreie-getränke" className="mb-12">
              <div className="flex items-center justify-between mb-6 bg-white px-4 py-3 rounded-lg shadow-sm border-2 border-transparent hover:border-[#CC0000] hover:shadow-md transition-all duration-300 cursor-pointer">
                <h2 className="text-3xl font-bold text-gray-900">Alkoholfreie Getränke</h2>
                <span className="text-gray-600 font-semibold">21 Artikel</span>
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
