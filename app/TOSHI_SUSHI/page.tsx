'use client'

import Image from 'next/image'
import { useRef, useState, useEffect } from 'react'
import ItemModal from '../components/ItemModal'
import CartBanner from '../components/CartBanner'

function ToshiSushiContent() {
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
        'sushi-menüs',
        'sushi-maki',
        'sushi-nigiri',
        'sushi-inside-out',
        'sushi-tempura-futo-maki',
        'sushi-futo-maki',
        'sushi-sashimi',
        'appetizer',
        'suppen',
        'salate',
        'gebratene-spezialitäten',
        'asia-thai-curry',
        'asia-vietnamesische-spezialitäten',
        'extras'
      ]

      const categoryNames = [
        'Beliebt',
        'Sushi-Menüs',
        'Sushi-Maki',
        'Sushi-nigiri',
        'Sushi inside-Out',
        'Sushi-tempura Futo Maki',
        'Sushi-futo Maki',
        'Sushi-sashimi',
        'Appetizer',
        'Suppen',
        'Salate',
        'Gebratene Spezialitäten',
        'Asia-Thai-Curry',
        'Asia-vietnamesische Spezialitäten',
        'Extras'
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
      name: 'Gebratene Nudeln',
      price: '8,90 €',
      description: 'Goldbraun gebratene Nudeln, liebevoll kombiniert mit frischem Gemüse',
      image: '/TOSHI SUSHI/Gebratene Nudeln.webp',
      category: 'Gebratene Spezialitäten',
      customizationOptions: {
        title: 'Ihre Zutat:',
        required: true,
        options: [
          { label: 'mit Tofu', price: 0 },
          { label: 'mit Hühnerfleisch', price: 0 },
          { label: 'nur mit Gemüse', price: 0 },
          { label: 'mit knusprig gebackener Hähnchenbrust', price: 2.00 },
          { label: 'mit Garnelen', price: 4.00 },
          { label: 'mit Ente, knusprig', price: 3.00 }
        ]
      }
    },
    {
      name: 'Best Red Curry in Town',
      price: '12,90 €',
      description: 'Unser berühmtes Red Curry: aromatisch, samtig und perfekt abgeschmeckt',
      image: '/TOSHI SUSHI/Best Red Curry in Town.webp',
      category: 'Asia-Thai-Curry',
      customizationOptions: {
        title: 'Ihre Zutat:',
        required: true,
        options: [
          { label: 'mit Hühnerfleisch', price: 0 },
          { label: 'nur mit Gemüse', price: 0 },
          { label: 'mit Tofu', price: 0 },
          { label: 'mit Ente, knusprig', price: 2.00 },
          { label: 'mit knusprig gebackener Hähnchenbrust', price: 1.00 },
          { label: 'mit Garnelen', price: 3.00 }
        ]
      }
    },
    {
      name: 'Tom Kha Gai',
      price: '6,90 €',
      description: 'mild-scharfe Hühnersuppe mit Kokosmilch, Hähnchen, Zucchini, grünen Bohnen, Bambus und Champignons',
      image: '/TOSHI SUSHI/Tom Kha Gai.webp',
      category: 'Suppen',
      customizationOptions: {
        title: 'Ihre Zutat:',
        required: true,
        options: [
          { label: 'mit Tofu', price: 0 },
          { label: 'mit Gemüse', price: 0 },
          { label: 'mit Hühnerfleisch', price: 0 },
          { label: 'mit Garnelen', price: 2.00 },
          { label: 'ohne Zutat', price: 0 }
        ]
      }
    },
    {
      name: 'Vegetarische Mini-Frühlingsrollen (8 Stück)',
      price: '5,90 €',
      description: 'mit Gemüsefüllung knusprige gebratene Frühlingsrollen serviert mit Sweet-Chilisauce',
      image: '/TOSHI SUSHI/Vegetarische Mini-Frühlingsrollen (8 Stück).webp',
      category: 'Appetizer'
    },
    {
      name: 'Maki Lachs Avocado',
      price: '5,50 €',
      description: 'mit Lachs und Avocado',
      image: '/TOSHI SUSHI/Maki Lachs Avocado.webp',
      category: 'Appetizer'
    }
  ]

  const sushiMenusItems = [
    {
      name: 'Maki-Mix-Set',
      price: '11,90 €',
      description: '',
      image: '/TOSHI SUSHI/Maki-Mix-Set.webp',
      includes: ['6 Kappa Maki', '6 Avocado Maki', '6 Shake Maki'],
      tags: []
    },
    {
      name: 'Veggie-Set',
      price: '15,90 €',
      description: '',
      image: '/TOSHI SUSHI/Veggie-Set.webp',
      includes: ['6 Maki Kappa', '8 Inside-Out Veggie', '4 Nigiri (Tamago, Tofu, Mango, Avocado)'],
      tags: ['Vegetarisch']
    },
    {
      name: 'Veggie-Set 2',
      price: '14,90 €',
      description: '',
      image: '/TOSHI SUSHI/Veggie-Set 2.webp',
      includes: ['6 Kappa Maki', '6 Avocado Maki', '8 Veggie Rolls'],
      tags: ['Vegetarisch']
    },
    {
      name: 'Sunrise-Set',
      price: '14,90 €',
      description: '',
      image: '/TOSHI SUSHI/Sunrise-Set.webp',
      includes: ['6 Maki Kappa', '6 Maki Shake', '8 Inside-Out Alaska'],
      tags: []
    },
    {
      name: 'King-Set',
      price: '18,90 €',
      description: '',
      image: '/TOSHI SUSHI/King-Set.webp',
      includes: ['6 Shake Maki', '6 Kappa Maki', '10 California Tempura Rolls'],
      tags: []
    },
    {
      name: 'Toshi-Set',
      price: '19,90 €',
      description: '',
      image: '/TOSHI SUSHI/Toshi-Set.webp',
      includes: ['6 Maki Shake', '2 Nigiri Lachs', '2 Nigiri Thunfisch', '2 Nigiri Butterfisch', '8 Inside-Out Alaska'],
      tags: []
    },
    {
      name: 'Lady-Set',
      price: '17,90 €',
      description: '',
      image: '/TOSHI SUSHI/Lady-Set.webp',
      includes: ['6 Maki Shake', '3 Nigiri Lachs', '8 Inside-Out Alaska'],
      tags: []
    },
    {
      name: 'Gentleman-Set',
      price: '19,90 €',
      description: '',
      image: '/TOSHI SUSHI/Gentleman-Set.webp',
      includes: ['6 Maki Tekka', '3 Nigiri Thunfisch', '8 Inside-Out Maguro'],
      tags: []
    },
    {
      name: 'Donald-Set',
      price: '18,90 €',
      description: '',
      image: '/TOSHI SUSHI/Donald-Set.webp',
      includes: ['6 Maki Shake', '8 Inside-Out Alaska', '4 Nigiri (Lachs, Garnelen, Aal, Thunfisch)'],
      tags: []
    },
    {
      name: 'Chef-Set',
      price: '25,90 €',
      description: '',
      image: '/TOSHI SUSHI/Chef-Set.webp',
      includes: ['1 Nigiri Lachs', '1 Nigiri Thunfisch', '1 Nigiri Garnelen', '8 Inside-Out Jackson', '5 Tempura Rolls mit Lachs', '4 Flambierte Sashimi'],
      tags: []
    },
    {
      name: 'Jackson-Set',
      price: '35,90 €',
      description: '',
      image: '/TOSHI SUSHI/Jackson-Set.webp',
      includes: ['5 gebackene Gyoza', '6 Shake Maki', '8 Jackson Rolls', '5 Tempura Rolls mit Lachs', '2 Nigiri Salmon on Fire', '3 Mochi'],
      tags: []
    },
    {
      name: 'Sushi-Set (für 2 Personen)',
      price: '39,90 €',
      description: '',
      image: '/TOSHI SUSHI/Sushi-Set (für 2 Personen).webp',
      includes: ['Miso-Suppe', '6 Maki Shake', '6 Maki Kappa', '2 Nigiri Lachs', '2 Nigiri Thunfisch', '8 Inside-Out Crispy Krebs', '10 Tempura Rollen', 'Wakame Salat'],
      tags: []
    },
    {
      name: 'Sushi-Set (für 4 Personen)',
      price: '79,90 €',
      description: '',
      image: '/TOSHI SUSHI/Sushi-Set (für 4 Personen).webp',
      includes: ['4 Miso-Suppe', '6 Maki Shake', '6 Maki Kappa', '6 Maki Avocado', '2 Nigiri Shake', '2 Nigiri Maguro', '2 Nigiri Ibodai', '2 Nigiri Ebi', '8 Inside-Out Alaska Roll', '8 Inside-Out Jackson Roll', '8 Inside-Out Salmon Skin', '20 Tempura Rolls', 'Wakame Salat'],
      tags: []
    }
  ]

  const sushiMakiItems = [
    {
      name: 'Maki Lachs',
      price: '4,90 €',
      description: 'mit Lachs',
      image: '/TOSHI SUSHI/Maki Lachs.webp',
      tags: []
    },
    {
      name: 'Maki Thunfisch',
      price: '5,50 €',
      description: 'mit Thunfisch',
      image: '/TOSHI SUSHI/Maki Thunfisch.webp',
      tags: []
    },
    {
      name: 'Maki Thunfisch Avocado',
      price: '5,90 €',
      description: 'mit Thunfisch und Avocado',
      image: '/TOSHI SUSHI/Maki Thunfisch Avocado.webp',
      tags: []
    },
    {
      name: 'Maki Lachs Avocado',
      price: '5,50 €',
      description: 'mit Lachs und Avocado',
      image: '/TOSHI SUSHI/Maki Lachs Avocado.webp',
      tags: []
    },
    {
      name: 'Maki Avocado',
      price: '3,90 €',
      description: 'mit Avocado und Sesam',
      image: '/TOSHI SUSHI/Maki Avocado.webp',
      tags: ['Vegetarisch']
    },
    {
      name: 'Maki Gurke',
      price: '3,90 €',
      description: 'mit Gurke und Sesam',
      image: '/TOSHI SUSHI/Maki Gurke.webp',
      tags: ['Vegetarisch']
    },
    {
      name: 'Maki Mango',
      price: '3,90 €',
      description: 'mit Mango',
      image: '/TOSHI SUSHI/Maki Mango.webp',
      tags: ['Vegetarisch']
    },
    {
      name: 'Maki California',
      price: '4,90 €',
      description: 'mit Krebsfleisch und Avocado',
      image: '/TOSHI SUSHI/Maki California.webp',
      tags: []
    },
    {
      name: 'Maki Hot Spicy Tuna',
      price: '5,50 €',
      description: 'mit gekochtem Thunfisch',
      image: '/TOSHI SUSHI/Maki Hot Spicy Tuna.webp',
      tags: ['Scharf']
    },
    {
      name: 'Omelette Maki',
      price: '4,50 €',
      description: 'mit japanischem Omelette',
      image: '/TOSHI SUSHI/Omelette Maki.webp',
      tags: ['Vegetarisch']
    },
    {
      name: 'Ebi Avocado Maki',
      price: '5,90 €',
      description: 'mit gekochten Großgarnelen und Avocado',
      image: '/TOSHI SUSHI/Ebi Avocado Maki.webp',
      tags: []
    }
  ]

  const sushiNigiriItems = [
    {
      name: 'Nigiri Lachs',
      price: '4,90 €',
      description: 'mit Lachs',
      image: '/TOSHI SUSHI/Nigiri Lachs.webp',
      tags: []
    },
    {
      name: 'Nigiri Thunfisch',
      price: '5,50 €',
      description: 'mit Thunfisch',
      image: '/TOSHI SUSHI/Nigiri Thunfisch.webp',
      tags: []
    },
    {
      name: 'Nigiri Garnele',
      price: '5,50 €',
      description: 'mit Großgarnelen',
      image: '/TOSHI SUSHI/Nigiri Garnele.webp',
      tags: []
    },
    {
      name: 'Nigiri Flussaal',
      price: '5,90 €',
      description: 'mit Flussaal',
      image: '/TOSHI SUSHI/Nigiri Flussaal.webp',
      tags: []
    },
    {
      name: 'Nigiri Butterfisch',
      price: '5,50 €',
      description: 'mit Butterfisch',
      image: '/TOSHI SUSHI/Nigiri Butterfisch.webp',
      tags: []
    },
    {
      name: 'Nigiri flambierter Lachs',
      price: '5,50 €',
      description: 'mit flambiertem Lachs',
      image: '/TOSHI SUSHI/Nigiri flambierter Lachs.webp',
      tags: []
    },
    {
      name: 'Nigiri flambierter Thunfisch',
      price: '5,50 €',
      description: 'mit flambiertem Thunfisch',
      image: '/TOSHI SUSHI/Nigiri flambierter Thunfisch.webp',
      tags: []
    },
    {
      name: 'Nigiri Jakobsmuschel',
      price: '7,50 €',
      description: 'mit japanischen Jakobsmuscheln und hauseigener Sauce',
      image: '/TOSHI SUSHI/Nigiri Jakobsmuschel.webp',
      tags: []
    },
    {
      name: 'Nigiri Omelette',
      price: '4,90 €',
      description: 'mit Omelett',
      image: '/TOSHI SUSHI/Nigiri Omelette.webp',
      tags: ['Vegetarisch']
    },
    {
      name: 'Nigiri Crazy Tuna',
      price: '6,90 €',
      description: 'mit gekochtem Thunfisch, Lauchzwiebeln und Chili',
      image: '/TOSHI SUSHI/Nigiri Crazy Tuna.webp',
      tags: ['Scharf']
    },
    {
      name: 'Nigiri Avocado',
      price: '4,90 €',
      description: 'mit Avocado',
      image: '/TOSHI SUSHI/Nigiri Avocado.webp',
      tags: ['Vegetarisch']
    }
  ]

  const sushiInsideOutItems = [
    {
      name: 'Alaska Roll',
      price: '9,90 €',
      description: 'mit Lachs, Avocado, Fischrogen und Frischkäse',
      image: '/TOSHI SUSHI/Alaska Roll.webp',
      tags: []
    },
    {
      name: 'Maguro Roll',
      price: '10,50 €',
      description: 'mit Thunfisch, Avocado, Gurke und Fischrogen',
      image: '/TOSHI SUSHI/Maguro Roll.webp',
      tags: []
    },
    {
      name: 'Ebi Tempura Roll',
      price: '10,90 €',
      description: 'mit knusprigen Großgarnelen, Avocado und Frischkäse',
      image: '/TOSHI SUSHI/Ebi Tempura Roll.webp',
      tags: []
    },
    {
      name: 'Jackson Roll',
      price: '12,90 €',
      description: 'mit knusprigen Großgarnelen, Avocado, Frischkäse, umhüllt von flambiertem Lachs und hauseigener Sauce',
      image: '/TOSHI SUSHI/Jackson Roll.webp',
      tags: []
    },
    {
      name: 'California Roll',
      price: '8,90 €',
      description: 'mit Surimi, Avocado, Frischkäse und Sesam',
      image: '/TOSHI SUSHI/California Roll.webp',
      tags: []
    },
    {
      name: 'Salmon Skin',
      price: '9,50 €',
      description: 'mit gegrillter Lachshaut, Gurke und Avocado',
      image: '/TOSHI SUSHI/Salmon Skin.webp',
      tags: []
    },
    {
      name: 'Flaming Shake',
      price: '12,90 €',
      description: 'mit gegrillter Lachshaut, Avocado, Gurke und umhüllt von flambiertem Lachs und hauseigener Sauce',
      image: '/TOSHI SUSHI/Flaming Shake.webp',
      tags: []
    },
    {
      name: 'Toshi Roll',
      price: '12,90 €',
      description: 'mit gekochten Garnelen, Mango, Gurke, umhüllt von hauchdünnen Avocado Streifen und hauseigener Sauce',
      image: '/TOSHI SUSHI/Toshi Roll.webp',
      tags: []
    },
    {
      name: 'Dream Roll',
      price: '8,90 €',
      description: 'frittierte Avocado und Frischkäse und hauseigner Sauce',
      image: '/TOSHI SUSHI/Dream Roll.webp',
      tags: ['Vegetarisch']
    },
    {
      name: 'Veggie Roll',
      price: '8,90 €',
      description: 'mit Spargel, Gurke, Avocado, Rucola und Frischkäse',
      image: '/TOSHI SUSHI/Veggie Roll.webp',
      tags: ['Vegetarisch']
    },
    {
      name: 'Veggie Deluxe Roll',
      price: '11,90 €',
      description: 'mit Tamago-Ei, Mango, Gurke, umhüllt von hauchdünnen Avocadostreifen und hauseigener Sauce',
      image: '/TOSHI SUSHI/Veggie Deluxe Roll.webp',
      tags: ['Vegetarisch']
    },
    {
      name: 'Philadelphia Roll',
      price: '12,90 €',
      description: 'mit gekochten Garnelen, Mango, Gurke, Frischkäse, umhüllt von flambiertem Lachs und hauseigener Sauce',
      image: '/TOSHI SUSHI/Philadelphia Roll.webp',
      tags: []
    },
    {
      name: 'Chicken Teriyaki',
      price: '10,50 €',
      description: 'mit Yakitori-Hähnchen, Avocado, Gurke, umhüllt mit Rucola, Röstzwiebeln und hausgemachter Sauce',
      image: '/TOSHI SUSHI/Chicken Teriyaki.webp',
      tags: []
    },
    {
      name: 'Rainbow Roll',
      price: '12,90 €',
      description: 'mit gegrilltem Flussaal, Avocado, Gurke Frischkäse, umhüllt von 4 verschiedenen Fischsorten und hauseigener Sauce',
      image: '/TOSHI SUSHI/Rainbow Roll.webp',
      tags: []
    },
    {
      name: 'Crispy Duck',
      price: '10,50 €',
      description: 'mit frittierter Ente, Frischkäse und hauseigener Sauce',
      image: '/TOSHI SUSHI/Crispy Duck.webp',
      tags: []
    },
    {
      name: 'Good Friends',
      price: '12,90 €',
      description: 'mit knusprigen Großgarnelen, Avocado, Frischkäse und umhüllt von gegrilltem Flussaal und hauseigener Sauce',
      image: '/TOSHI SUSHI/Good Friends.webp',
      tags: []
    },
    {
      name: 'Crispy Krebs',
      price: '11,50 €',
      description: 'frittiertes Surimi, umhüllt von Lachs und hauseigener Sauce',
      image: '/TOSHI SUSHI/Crispy Krebs.webp',
      tags: []
    },
    {
      name: 'Salmon loves Tuna',
      price: '12,90 €',
      description: 'mit Surimi, Avocado, Frischkäse, umhüllt von Lachs und Thunfisch und hauseigener Sauce',
      image: '/TOSHI SUSHI/Salmon loves Tuna.webp',
      tags: []
    },
    {
      name: 'Golden Hero',
      price: '12,90 €',
      description: 'mit gekochtem Thunfisch, Avocado, Gurke und umhüllt von Lachs und Thunfisch',
      image: '/TOSHI SUSHI/Golden Hero.webp',
      tags: []
    }
  ]

  const sushiTempuraFutoMakiItems = [
    {
      name: 'Tempura California (10 Stück)',
      price: '9,90 €',
      description: 'mit Surimi und Avocado',
      image: '/TOSHI SUSHI/Tempura California (10 Stück).webp',
      tags: []
    },
    {
      name: 'Tempura Veggie (10 Stück)',
      price: '9,90 €',
      description: 'mit Tamago-Ei, Avocado und Frischkäse',
      image: '/TOSHI SUSHI/Tempura Veggie (10 Stück).webp',
      tags: ['Vegetarisch']
    },
    {
      name: 'Tempura Chicken (10 Stück)',
      price: '10,90 €',
      description: 'mit Yakitori-Hähnchenfilet und Avocado',
      image: '/TOSHI SUSHI/Tempura Chicken (10 Stück).webp',
      tags: []
    },
    {
      name: 'Tempura Salmon',
      price: '7,50 €',
      description: 'mit Lachs',
      image: '/TOSHI SUSHI/Tempura Salmon.webp',
      tags: [],
      customizationOptions: {
        title: 'Tempura Salmon - 1 Pflichtfeld',
        required: true,
        options: [
          { label: '5 Stück', price: 0 },
          { label: '10 Stück', price: 7.50 }
        ]
      }
    },
    {
      name: 'Tempura Ebi',
      price: '8,50 €',
      description: 'mit Ebi-Tempura',
      image: '/TOSHI SUSHI/Tempura Ebi.webp',
      tags: [],
      customizationOptions: {
        title: 'Tempura Ebi - 1 Pflichtfeld',
        required: true,
        options: [
          { label: '5 Stück', price: 0 },
          { label: '10 Stück', price: 8.50 }
        ]
      }
    },
    {
      name: 'Tempura Maguro',
      price: '8,50 €',
      description: 'mit Thunfisch',
      image: '/TOSHI SUSHI/Tempura Maguro.webp',
      tags: [],
      customizationOptions: {
        title: 'Tempura Maguro - 1 Pflichtfeld',
        required: true,
        options: [
          { label: '5 Stück', price: 0 },
          { label: '10 Stück', price: 8.50 }
        ]
      }
    }
  ]

  const sushiFutoMakiItems = [
    {
      name: 'Big Buddha',
      price: '6,90 €',
      description: 'mit Spargel, Mango, Rucola und Frischkäse',
      image: '/TOSHI SUSHI/Big Buddha.webp',
      tags: ['Vegetarisch'],
      customizationOptions: {
        title: 'Big Buddha - 1 Pflichtfeld',
        required: true,
        options: [
          { label: '5 Stück', price: 0 },
          { label: '10 Stück', price: 6.90 }
        ]
      }
    },
    {
      name: 'Big Ocean',
      price: '7,90 €',
      description: 'mit Avocado, Gurke, Lachs, Thunfisch, Frischkäse, Fischrogen und süßer Sojasauce',
      image: '/TOSHI SUSHI/Big Ocean.webp',
      tags: [],
      customizationOptions: {
        title: 'Big Ocean - 1 Pflichtfeld',
        required: true,
        options: [
          { label: '5 Stück', price: 0 },
          { label: '10 Stück', price: 7.90 }
        ]
      }
    },
    {
      name: 'Big Gunkan',
      price: '8,50 €',
      description: 'mit Avocado, Gurke, gekochten Garnelen, Surimi, Mango, Frischkäse, umhüllt von Erdnüssen, Sesam und Mangosauce',
      image: '/TOSHI SUSHI/Big Gunkan.webp',
      tags: [],
      customizationOptions: {
        title: 'Big Gunkan - 1 Pflichtfeld',
        required: true,
        options: [
          { label: '5 Stück', price: 0 },
          { label: '10 Stück', price: 8.50 }
        ]
      }
    },
    {
      name: 'Big Boss',
      price: '8,50 €',
      description: 'mit Mango, gebackenen Garnelen, Frischkäse und hausgemachter Sauce',
      image: '/TOSHI SUSHI/Big Boss.webp',
      tags: [],
      customizationOptions: {
        title: 'Big Boss - 1 Pflichtfeld',
        required: true,
        options: [
          { label: '5 Stück', price: 0 },
          { label: '10 Stück', price: 8.50 }
        ]
      }
    }
  ]

  const sushiSashimiItems = [
    {
      name: 'Lachs Sashimi (6 Stück)',
      price: '13,90 €',
      description: 'mit Lachs',
      image: '/TOSHI SUSHI/Lachs Sashimi (6 Stück).webp',
      tags: []
    },
    {
      name: 'Sashimi Thunfisch (6 Stück)',
      price: '15,90 €',
      description: 'mit Thunfisch',
      image: '/TOSHI SUSHI/Sashimi Thunfisch (6 Stück).webp',
      tags: []
    },
    {
      name: 'Sashimi Mix (18 Stück)',
      price: '29,90 €',
      description: 'mit gemischten Fischsorten',
      image: '/TOSHI SUSHI/Sashimi Mix (18 Stück).webp',
      tags: []
    },
    {
      name: 'Lachs Tataki (5 Scheiben)',
      price: '11,90 €',
      description: 'kurz flambiertes Lachs-Sashimi mit Sesam und hauseigener Sauce',
      image: '/TOSHI SUSHI/Lachs Tataki (5 Scheiben).webp',
      tags: []
    },
    {
      name: 'Thunfisch Tataki (5 Scheiben)',
      price: '13,90 €',
      description: 'kurz flambiertes Thunfisch-Sashimi mit Sesam und hauseigener Sauce',
      image: '/TOSHI SUSHI/Thunfisch Tataki (5 Scheiben).webp',
      tags: []
    }
  ]

  const extrasItems = [
    {
      name: 'Reis (Pur)',
      price: '3,00 €',
      description: 'gekochter weißer vietnamesischer Reis',
      image: '/TOSHI SUSHI/Reis (Pur).webp',
      tags: ['Vegan', 'Vegetarisch']
    },
    {
      name: 'Reisnudeln',
      price: '3,00 €',
      description: 'vietnamesische warme Reisnudeln',
      image: '/TOSHI SUSHI/Reisnudeln.webp',
      tags: ['Vegan', 'Vegetarisch']
    },
    {
      name: 'Reisbandnudeln',
      price: '3,00 €',
      description: 'Weiche, zarte Nudeln',
      image: '/TOSHI SUSHI/Reisbandnudeln.webp',
      tags: ['Vegan', 'Vegetarisch']
    },
    {
      name: 'Süß-Sauer-Sauce',
      price: '1,50 €',
      description: 'Fruchtig, aromatisch und leicht würzig',
      image: '/TOSHI SUSHI/Süß-Sauer-Sauce.webp',
      tags: ['Vegan', 'Vegetarisch']
    },
    {
      name: 'Sriracha-Sauce (scharf)',
      price: '1,50 €',
      description: 'Intensiv scharf, leicht süßlich und unverwechselbar',
      image: '/TOSHI SUSHI/Sriracha-Sauce (scharf).webp',
      tags: ['Vegan', 'Vegetarisch', 'Scharf']
    },
    {
      name: 'Vietnamesische Limetten-Fischsauce',
      price: '1,50 €',
      description: 'Fischsauce, die mit Zucker, Limettensaft, Knoblauch und Chilis angerührt ist',
      image: '/TOSHI SUSHI/Vietnamesische Limetten-Fischsauce.webp',
      tags: []
    },
    {
      name: 'Hoisin-Sauce',
      price: '1,50 €',
      description: 'Aromatisch-süßliche Sauce mit tiefem, rauchigem Geschmack',
      image: '/TOSHI SUSHI/Hoisin-Sauce.webp',
      tags: ['Vegan', 'Vegetarisch']
    },
    {
      name: 'Homemade Sweet Unagisauce (Sushisauce)',
      price: '2,50 €',
      description: 'würzige, süße Sojasoße mit einem Mix aus Unagisauce',
      image: '/TOSHI SUSHI/Homemade Sweet Unagisauce (Sushisauce).webp',
      tags: []
    },
    {
      name: 'Sweet-Chilimayo (Sushisauce)',
      price: '2,50 €',
      description: 'hausgemachte Chilimayo verfeinert mit Honig',
      image: '/TOSHI SUSHI/Sweet-Chilimayo (Sushisauce).webp',
      tags: ['Vegetarisch']
    },
    {
      name: 'Ingwer',
      price: '2,00 €',
      description: 'Frisch eingelegter Ingwer',
      image: '/TOSHI SUSHI/Ingwer.webp',
      tags: ['Vegan', 'Vegetarisch']
    },
    {
      name: 'Wasabi',
      price: '1,50 €',
      description: 'Scharf, intensiv und belebend',
      image: '/TOSHI SUSHI/Wasabi.webp',
      tags: ['Vegan', 'Vegetarisch', 'Scharf']
    }
  ]

  const appetizerItems = [
    {
      name: 'Vegetarische Mini-Frühlingsrollen (8 Stück)',
      price: '5,90 €',
      description: 'mit Gemüsefüllung knusprige gebratene Frühlingsrollen serviert mit Sweet-Chilisauce',
      image: '/TOSHI SUSHI/Vegetarische Mini-Frühlingsrollen (8 Stück).webp',
      tags: ['Vegetarisch']
    },
    {
      name: 'Vietnamesische Frühlingsrollen (3 Stück)',
      price: '6,90 €',
      description: 'hausgemachte knusprige Frühlingsrollen gefüllt mit Hackfleisch, Glasnudeln, Morcheln, Garnelen, frischem Gemüse und Sweet-Chilisauce',
      image: '/TOSHI SUSHI/Vietnamesische Frühlingsrollen (3 Stück).webp',
      tags: []
    },
    {
      name: 'Sommerrollen (2 Stück)',
      price: '5,90 €',
      description: 'mit Reisnudeln, frischem Salat, Nom, Gurke und frischen Kräutern, umwickelt von Reispapier, serviert mit hausgemachter Hoisin-Sauce',
      image: '/TOSHI SUSHI/Sommerrollen (2 Stück).webp',
      tags: [],
      customizationOptions: {
        title: 'Ihr Sonderwunsch:',
        required: true,
        options: [
          { label: 'nur mit Gemüse', price: 0 },
          { label: 'mit Tofu', price: 0.50 },
          { label: 'mit gegrillten Garnelen', price: 1.00 },
          { label: 'mit gebratenen Rindfleisch', price: 2.00 }
        ]
      }
    },
    {
      name: 'Gebackene Wantan (4 Stück)',
      price: '4,90 €',
      description: 'hausgemachte knusprige Teigtaschen gefüllt mit Hackfleisch, Garnelentartar, frischen Kräutern und Sweet-Chilisauce',
      image: '/TOSHI SUSHI/Gebackene Wantan (4 Stück).webp',
      tags: []
    },
    {
      name: 'Gebackene Garnelen (4 Stück)',
      price: '7,90 €',
      description: 'knusprige Großgarnelen in Pankomehl serviert mit Sweet-Chilisauce',
      image: '/TOSHI SUSHI/Gebackene Garnelen (4 Stück).webp',
      tags: []
    },
    {
      name: 'Yakitori-Hähnchenspieße (3 Stück)',
      price: '5,90 €',
      description: 'japanische Hähnchenspieße umhüllt von Yakitorisauce',
      image: '/TOSHI SUSHI/Yakitori-Hähnchenspieße (3 Stück).webp',
      tags: []
    },
    {
      name: 'Gebackene Gyoza (4 Stück)',
      price: '6,90 €',
      description: 'japanische gebackene Teigtaschen gefüllt mit Fleischtatar und Gemüse',
      image: '/TOSHI SUSHI/Gebackene Gyoza (4 Stück).webp',
      tags: []
    },
    {
      name: 'Vegetarische Gyoza (4 Stück)',
      price: '5,90 €',
      description: 'vegetarische Gyoza mit einer Füllung von Spinat und Gemüse serviert mit Sweet-Chilisauce',
      image: '/TOSHI SUSHI/Vegetarische Gyoza (4 Stück).webp',
      tags: ['Vegetarisch']
    },
    {
      name: 'Edamame',
      price: '6,90 €',
      description: 'japanische blanchierte Sojabohnen mit Salz',
      image: '/TOSHI SUSHI/Edamame.webp',
      tags: ['Vegan', 'Vegetarisch']
    },
    {
      name: 'Ha Kao (4 Stück)',
      price: '6,90 €',
      description: 'gedämpfte Teigtaschen gefüllt mit Garnelentartar',
      image: '/TOSHI SUSHI/Ha Kao (4 Stück).webp',
      tags: []
    },
    {
      name: 'Gurken-Kimchi',
      price: '5,90 €',
      description: 'koreanisches Gurken-Kimchi mit gerösteten Sesam',
      image: '/TOSHI SUSHI/Gurken-Kimchi.webp',
      tags: ['Scharf']
    }
  ]

  const suppenItems = [
    {
      name: 'Tom Kha Gai',
      price: '6,90 €',
      description: 'mild-scharfe Hühnersuppe mit Kokosmilch, Hähnchen, Zucchini, grünen Bohnen, Bambus und Champignons',
      image: '/TOSHI SUSHI/Tom Kha Gai.webp',
      tags: [],
      customizationOptions: {
        title: 'Ihre Zutat:',
        required: true,
        options: [
          { label: 'mit Tofu', price: 0 },
          { label: 'mit Gemüse', price: 0 },
          { label: 'mit Hühnerfleisch', price: 0 },
          { label: 'mit Garnelen', price: 2.00 },
          { label: 'ohne Zutat', price: 0 }
        ]
      }
    },
    {
      name: 'Tom Yam Gung',
      price: '6,90 €',
      description: 'sauer-scharf Suppe mit Garnelen, grünen Bohnen, Zucchini, Bambus, Zitronengras und Champignons',
      image: '/TOSHI SUSHI/Tom Yam Gung.webp',
      tags: ['Scharf'],
      customizationOptions: {
        title: 'Ihre Zutat:',
        required: true,
        options: [
          { label: 'mit Tofu', price: 0 },
          { label: 'mit Gemüse', price: 0 },
          { label: 'mit Hühnerfleisch', price: 0 },
          { label: 'mit Garnelen', price: 2.00 },
          { label: 'ohne Zutat', price: 0 }
        ]
      }
    },
    {
      name: 'Peking-Suppe',
      price: '5,90 €',
      description: 'Ein echter Klassiker der asiatischen Kücheunsere original Peking-Suppe begeistert mit ihrer perfekt ausbalancierten Schärfe, frischem Gemüse, zartem Hühnerfleisch und feinen Pilzen. Leicht säuerlich, angenehm scharf und unglaublich aromatisch - ein wärmender Genuss, der jede Bestellung aufwertet.',
      image: '/TOSHI SUSHI/Peking-Suppe.webp',
      tags: ['Scharf']
    },
    {
      name: 'Miso-Suppe',
      price: '4,90 €',
      description: 'mit Tofu, Meeresalgen und fermentierte Sojabohnenpaste',
      image: '/TOSHI SUSHI/Miso-Suppe.webp',
      tags: ['Vegetarisch']
    }
  ]

  const salateItems = [
    {
      name: 'Salat Wakame',
      price: '5,90 €',
      description: 'japanischer Seetangsalat verfeinert mit Sesam',
      image: '/TOSHI SUSHI/Salat Wakame.webp',
      tags: ['Vegan', 'Vegetarisch']
    },
    {
      name: 'Nom - Salat mit Garnelen',
      price: '8,90 €',
      description: 'frischer vietnamesischer Salat mit marinierten Garnelen aus Kohlrabi und Karotten, verfeinert mit asiatischen Kräutern, Erdnüssen und Knoblauch, leicht säuerlich-süß und herrlich knackig',
      image: '/TOSHI SUSHI/Nom - Salat mit Garnelen.webp',
      tags: []
    }
  ]

  const gebrateneSpezialitaetenItems = [
    {
      name: 'Gebratene Nudeln',
      price: '8,90 €',
      description: 'Goldbraun gebratene Nudeln, liebevoll kombiniert mit frischem Gemüse',
      image: '/TOSHI SUSHI/Gebratene Nudeln.webp',
      tags: [],
      customizationOptions: {
        title: 'Ihre Zutat:',
        required: true,
        options: [
          { label: 'mit Tofu', price: 0 },
          { label: 'mit Hühnerfleisch', price: 0 },
          { label: 'nur mit Gemüse', price: 0 },
          { label: 'mit knusprig gebackener Hähnchenbrust', price: 2.00 },
          { label: 'mit Garnelen', price: 4.00 },
          { label: 'mit Ente, knusprig', price: 3.00 }
        ]
      }
    },
    {
      name: 'Gebratener Reis',
      price: '8,90 €',
      description: 'Locker gebratener Reis, verfeinert mit frischem Gemüse und Ei',
      image: '/TOSHI SUSHI/Gebratener Reis.webp',
      tags: [],
      customizationOptions: {
        title: 'Ihre Zutat:',
        required: true,
        options: [
          { label: 'mit Tofu', price: 0 },
          { label: 'mit Hühnerfleisch', price: 0 },
          { label: 'nur mit Gemüse', price: 0 },
          { label: 'mit knusprig gebackener Hähnchenbrust', price: 2.00 },
          { label: 'mit Garnelen', price: 4.00 },
          { label: 'mit Ente, knusprig', price: 3.00 }
        ]
      }
    },
    {
      name: 'Gebratene Udon-Nudeln',
      price: '10,90 €',
      description: 'Dicke, weiche Udon-Nudeln, schonend gebraten und umhüllt von einer aromatischen Sauce, dazu knackiges Gemüse',
      image: '/TOSHI SUSHI/Gebratene Udon-Nudeln.webp',
      tags: [],
      customizationOptions: {
        title: 'Ihre Zutat:',
        required: true,
        options: [
          { label: 'mit Tofu', price: 0 },
          { label: 'mit Hühnerfleisch', price: 0 },
          { label: 'nur mit Gemüse', price: 0 },
          { label: 'mit knusprig gebackener Hähnchenbrust', price: 2.00 },
          { label: 'mit Garnelen', price: 4.00 },
          { label: 'mit Ente, knusprig', price: 3.00 }
        ]
      }
    },
    {
      name: 'Handgemachte Biang Biang Noodles',
      price: '13,90 €',
      description: 'Breite, frisch gezogene Nudeln treffen auf zartes Rindfleisch, Pak Choi, knusprigen Knoblauch und würziges Chiliöl. Ein authentischer Klassiker aus Xi an.',
      image: '/TOSHI SUSHI/Handgemachte Biang Biang Noodles.webp',
      tags: ['Scharf']
    },
    {
      name: 'Toshi Trüffel Udon (vegetarisch)',
      price: '13,90 €',
      description: 'Inspiriert von der japanischen und italienischen Küche, vereint in unserem Signature-Dish. Udon-Nudeln in einer cremigen Trüffel-Sahnesoße, verfeinert mit Parmesan, perfekt gekochtem Ei und goldbraun angebratenen Kräuterseitlingen und gehobeltem schwarzen Trüffel. Ein einzigartiges Fusion-Erlebnis voller Umami und Eleganz',
      image: '/TOSHI SUSHI/Toshi Trüffel Udon (vegetarisch).webp',
      tags: ['Vegetarisch'],
      customizationOptions: {
        title: 'Ihre Zutat:',
        required: true,
        options: [
          { label: 'mit Tofu', price: 0 },
          { label: 'mit Hühnerfleisch', price: 0 },
          { label: 'nur mit Gemüse', price: 0 },
          { label: 'mit knusprig gebackener Hähnchenbrust', price: 2.00 },
          { label: 'mit Garnelen', price: 4.00 },
          { label: 'mit Ente, knusprig', price: 3.00 }
        ]
      }
    }
  ]

  const asiaThaiCurryItems = [
    {
      name: 'Best Red Curry in Town',
      price: '12,90 €',
      description: 'Unser berühmtes Red Curry: aromatisch, samtig und perfekt abgeschmeckt',
      image: '/TOSHI SUSHI/Best Red Curry in Town.webp',
      tags: [],
      customizationOptions: {
        title: 'Ihre Zutat:',
        required: true,
        options: [
          { label: 'mit Hühnerfleisch', price: 0 },
          { label: 'nur mit Gemüse', price: 0 },
          { label: 'mit Tofu', price: 0 },
          { label: 'mit Ente, knusprig', price: 2.00 },
          { label: 'mit knusprig gebackener Hähnchenbrust', price: 1.00 },
          { label: 'mit Garnelen', price: 3.00 }
        ]
      }
    },
    {
      name: 'Erdnuss-Kokos',
      price: '12,90 €',
      description: 'Ein harmonisches Zusammenspiel von cremiger Kokosmilch und nussiger Erdnuss',
      image: '/TOSHI SUSHI/Erdnuss-Kokos.webp',
      tags: [],
      customizationOptions: {
        title: 'Ihre Zutat:',
        required: true,
        options: [
          { label: 'mit Hühnerfleisch', price: 0 },
          { label: 'nur mit Gemüse', price: 0 },
          { label: 'mit Tofu', price: 0 },
          { label: 'mit Ente, knusprig', price: 2.00 },
          { label: 'mit knusprig gebackener Hähnchenbrust', price: 1.00 },
          { label: 'mit Garnelen', price: 3.00 }
        ]
      }
    },
    {
      name: 'Mango-Kokos',
      price: '12,90 €',
      description: 'Mango-Kokos-Curry verwöhnt mit saftigen Mangostücken und zartem Gemüse',
      image: '/TOSHI SUSHI/Mango-Kokos.webp',
      tags: [],
      customizationOptions: {
        title: 'Ihre Zutat:',
        required: true,
        options: [
          { label: 'mit Hühnerfleisch', price: 0 },
          { label: 'nur mit Gemüse', price: 0 },
          { label: 'mit Tofu', price: 0 },
          { label: 'mit Ente, knusprig', price: 2.00 },
          { label: 'mit knusprig gebackener Hähnchenbrust', price: 1.00 },
          { label: 'mit Garnelen', price: 3.00 }
        ]
      }
    },
    {
      name: 'Pikantes Curry (Chop Suey)',
      price: '12,90 €',
      description: 'Würzig, frisch und knackig: Unser Chop-Suey-Curry vereint frisches Gemüse mit aromatischer Sauce',
      image: '/TOSHI SUSHI/Pikantes Curry (Chop Suey).webp',
      tags: ['Scharf'],
      customizationOptions: {
        title: 'Ihre Zutat:',
        required: true,
        options: [
          { label: 'mit Hühnerfleisch', price: 0 },
          { label: 'nur mit Gemüse', price: 0 },
          { label: 'mit Tofu', price: 0 },
          { label: 'mit Ente, knusprig', price: 2.00 },
          { label: 'mit knusprig gebackener Hähnchenbrust', price: 1.00 },
          { label: 'mit Garnelen', price: 3.00 }
        ]
      }
    },
    {
      name: 'Golden Curry (Kare Raisu) - Japanisches Curry',
      price: '12,90 €',
      description: 'mild-süßes japanisches Curry mit geschmorten Zwiebeln, Karotten und Kartoffeln und serviert mit fluffigem Reis- Ein echter Wohlfühlklassiker.',
      image: '/TOSHI SUSHI/Golden Curry (Kare Raisu) - Japanisches Curry.webp',
      tags: [],
      customizationOptions: {
        title: 'Ihre Zutat:',
        required: true,
        options: [
          { label: 'mit Tofu', price: 0 },
          { label: 'mit Hühnerfleisch', price: 0 },
          { label: 'nur mit Gemüse', price: 0 },
          { label: 'mit knusprig gebackener Hähnchenbrust', price: 2.00 },
          { label: 'mit Garnelen', price: 4.00 },
          { label: 'mit Ente, knusprig', price: 3.00 }
        ]
      }
    }
  ]

  const asiaVietnamesischeSpezialitaetenItems = [
    {
      name: 'Original Hanoi Pho Suppe',
      price: '12,90 €',
      description: 'Reisbandnudelsuppe nach einem traditionellen vietnamesischen Rezept, dazu frische Kräuter und Zutat nach Wahl',
      image: '/TOSHI SUSHI/Original Hanoi Pho Suppe.webp',
      tags: [],
      customizationOptions: {
        title: 'Ihre Zutat:',
        required: true,
        options: [
          { label: 'mit Tofu', price: 0 },
          { label: 'mit Hühnerfleisch', price: 0 },
          { label: 'mit Rindfleisch', price: 2.00 },
          { label: 'ohne Zutat', price: 0 }
        ]
      }
    },
    {
      name: 'Bun Bo Nam Bo',
      price: '13,90 €',
      description: 'warme Reisnudeln mit frischem Salat, Gemüse und vietnamesischen Kräutern, verfeinert mit Erdnüssen und Röstzwiebeln in einer Limetten-Knoblauch Sauce und im Wok angebratenes Rindfleisch',
      image: '/TOSHI SUSHI/Bun Bo Nam Bo.webp',
      tags: []
    },
    {
      name: 'Bun Bo Nam Bo Tofu (vegetarisch)',
      price: '12,90 €',
      description: 'warme Reisnudeln mit frischem Salat, Gemüse und vietnamesischen Kräutern, verfeinert mit Erdnüssen und Röstzwiebeln in einer Limetten-Knoblauch Sauce und im Wok angebratenes Tofu',
      image: '/TOSHI SUSHI/Bun Bo Nam Bo Tofu (vegetarisch).webp',
      tags: ['Vegetarisch']
    },
    {
      name: 'Bun Cha Nuong',
      price: '13,90 €',
      description: 'traditionell gegrilltes mariniertes Schweinefleisch auf warmen Reisnudeln mit frischem Salat, Gemüse, vietnamesischen Kräutern, verfeinert mit Erdnüssen und mit einer Limetten-Knoblauch-Sauce serviert',
      image: '/TOSHI SUSHI/Bun Cha Nuong.webp',
      tags: []
    },
    {
      name: 'Bun Nem',
      price: '12,90 €',
      description: 'knusprig frittierte Frühlingsrollen auf warmen Reisnudeln mit gemischtem Salat, Nom, vietnamesischen Kräutern, Erdnüssen, verfeinert mit Röstzwiebeln und Limetten-Knoblauchsauce',
      image: '/TOSHI SUSHI/Bun Nem.webp',
      tags: []
    }
  ]

  const categories = [
    'Beliebt',
    'Sushi-Menüs',
    'Sushi-Maki',
    'Sushi-nigiri',
    'Sushi inside-Out',
    'Sushi-tempura Futo Maki',
    'Sushi-futo Maki',
    'Sushi-sashimi',
    'Appetizer',
    'Suppen',
    'Salate',
    'Gebratene Spezialitäten',
    'Asia-Thai-Curry',
    'Asia-vietnamesische Spezialitäten',
    'Extras'
  ]

  // Get all items for search
  const allItems = [
    ...beliebteItems.map(item => ({ ...item, section: 'Beliebt' })),
    ...sushiMenusItems.map(item => ({ ...item, section: 'Sushi-Menüs' })),
    ...sushiMakiItems.map(item => ({ ...item, section: 'Sushi-Maki' })),
    ...sushiNigiriItems.map(item => ({ ...item, section: 'Sushi-nigiri' })),
    ...sushiInsideOutItems.map(item => ({ ...item, section: 'Sushi inside-Out' })),
    ...sushiTempuraFutoMakiItems.map(item => ({ ...item, section: 'Sushi-tempura Futo Maki' })),
    ...sushiFutoMakiItems.map(item => ({ ...item, section: 'Sushi-futo Maki' })),
    ...sushiSashimiItems.map(item => ({ ...item, section: 'Sushi-sashimi' })),
    ...appetizerItems.map(item => ({ ...item, section: 'Appetizer' })),
    ...suppenItems.map(item => ({ ...item, section: 'Suppen' })),
    ...salateItems.map(item => ({ ...item, section: 'Salate' })),
    ...gebrateneSpezialitaetenItems.map(item => ({ ...item, section: 'Gebratene Spezialitäten' })),
    ...asiaThaiCurryItems.map(item => ({ ...item, section: 'Asia-Thai-Curry' })),
    ...asiaVietnamesischeSpezialitaetenItems.map(item => ({ ...item, section: 'Asia-vietnamesische Spezialitäten' })),
    ...extrasItems.map(item => ({ ...item, section: 'Extras' }))
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
                  <h1 className="text-3xl font-bold text-gray-900">TOSHI SUSHI</h1>
                  <div className="flex items-center gap-2 mt-2">
                    <span className="text-orange-500">★</span>
                    <span className="text-sm font-semibold text-gray-700">4,5 (500+)</span>
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
                placeholder="Suche TOSHI SUSHI"
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

            {/* Sushi-Menüs Section */}
            <section id="sushi-menüs" className="mb-12">
              <div className="flex items-center justify-between mb-6 bg-white px-4 py-3 rounded-lg shadow-sm border-2 border-transparent hover:border-white hover:shadow-[0_0_40px_rgba(255,255,255,1)] transition-all duration-300 cursor-pointer">
                <h2 className="text-3xl font-bold text-gray-900">Sushi-Menüs</h2>
                <span className="text-gray-600 font-semibold">13 Artikel</span>
              </div>

              {/* Grid Layout */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {sushiMenusItems.map((item) => (
                  <div
                    key={item.name}
                    onClick={() => openModal(item)}
                    className="bg-white rounded-lg shadow-sm hover:shadow-[0_0_40px_rgba(255,255,255,1)] transition-all duration-300 cursor-pointer border-2 border-transparent hover:border-white p-4"
                  >
                    <div className="flex gap-4 items-start">
                      {/* Left Side - Content */}
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <h3 className="font-bold text-gray-900 text-base">{item.name}</h3>
                          <button className="text-xs text-gray-700 hover:text-gray-900 underline">
                            Produktinfo
                          </button>
                        </div>
                        <div className="font-bold text-gray-900 text-base mb-2">{item.price}</div>

                        {/* Set Contents as Bullet Points */}
                        {item.includes && item.includes.length > 0 && (
                          <ul className="text-sm text-gray-600 space-y-0.5">
                            {item.includes.map((content, idx) => (
                              <li key={idx} className="flex items-start">
                                <span className="mr-2">•</span>
                                <span>{content}</span>
                              </li>
                            ))}
                          </ul>
                        )}

                        {/* Tags */}
                        {item.tags.length > 0 && (
                          <div className="flex gap-1.5 flex-wrap mt-2">
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

            {/* Sushi-Maki Section */}
            <section id="sushi-maki" className="mb-12">
              <div className="flex items-center justify-between mb-6 bg-white px-4 py-3 rounded-lg shadow-sm border-2 border-transparent hover:border-white hover:shadow-[0_0_40px_rgba(255,255,255,1)] transition-all duration-300 cursor-pointer">
                <h2 className="text-3xl font-bold text-gray-900">Sushi-Maki</h2>
                <span className="text-gray-600 font-semibold">11 Artikel</span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {sushiMakiItems.map((item) => (
                  <div
                    key={item.name}
                    onClick={() => openModal(item)}
                    className="bg-white rounded-lg shadow-sm hover:shadow-[0_0_40px_rgba(255,255,255,1)] transition-all duration-300 cursor-pointer border-2 border-transparent hover:border-white p-4"
                  >
                    <div className="flex gap-4 items-start">
                      <div className="flex-1">
                        <h3 className="font-bold text-gray-900 text-base mb-1">{item.name}</h3>
                        <button className="text-xs text-gray-700 hover:text-gray-900 underline mb-2">
                          Produktinfo
                        </button>
                        <div className="font-bold text-gray-900 text-base mb-2">{item.price}</div>
                        {item.description && (
                          <p className="text-xs text-gray-600 mb-2 line-clamp-2">{item.description}</p>
                        )}
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
                      <div className="flex flex-col items-end gap-2">
                        <button className="bg-white border-2 border-gray-300 rounded-full p-1.5 hover:bg-gray-50 transition-colors">
                          <span className="text-lg text-[#CC0000]">+</span>
                        </button>
                        <div className="relative w-28 h-28 bg-orange-50 rounded-lg overflow-hidden">
                          <Image src={item.image} alt={item.name} fill className="object-cover" />
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* Sushi-nigiri Section */}
            <section id="sushi-nigiri" className="mb-12">
              <div className="flex items-center justify-between mb-6 bg-white px-4 py-3 rounded-lg shadow-sm border-2 border-transparent hover:border-white hover:shadow-[0_0_40px_rgba(255,255,255,1)] transition-all duration-300 cursor-pointer">
                <h2 className="text-3xl font-bold text-gray-900">Sushi-nigiri</h2>
                <span className="text-gray-600 font-semibold">11 Artikel</span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {sushiNigiriItems.map((item) => (
                  <div
                    key={item.name}
                    onClick={() => openModal(item)}
                    className="bg-white rounded-lg shadow-sm hover:shadow-[0_0_40px_rgba(255,255,255,1)] transition-all duration-300 cursor-pointer border-2 border-transparent hover:border-white p-4"
                  >
                    <div className="flex gap-4 items-start">
                      <div className="flex-1">
                        <h3 className="font-bold text-gray-900 text-base mb-1">{item.name}</h3>
                        <button className="text-xs text-gray-700 hover:text-gray-900 underline mb-2">
                          Produktinfo
                        </button>
                        <div className="font-bold text-gray-900 text-base mb-2">{item.price}</div>
                        {item.description && (
                          <p className="text-xs text-gray-600 mb-2 line-clamp-2">{item.description}</p>
                        )}
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
                      <div className="flex flex-col items-end gap-2">
                        <button className="bg-white border-2 border-gray-300 rounded-full p-1.5 hover:bg-gray-50 transition-colors">
                          <span className="text-lg text-[#CC0000]">+</span>
                        </button>
                        <div className="relative w-28 h-28 bg-orange-50 rounded-lg overflow-hidden">
                          <Image src={item.image} alt={item.name} fill className="object-cover" />
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* Sushi inside-Out Section */}
            <section id="sushi-inside-out" className="mb-12">
              <div className="flex items-center justify-between mb-6 bg-white px-4 py-3 rounded-lg shadow-sm border-2 border-transparent hover:border-white hover:shadow-[0_0_40px_rgba(255,255,255,1)] transition-all duration-300 cursor-pointer">
                <h2 className="text-3xl font-bold text-gray-900">Sushi inside-Out</h2>
                <span className="text-gray-600 font-semibold">19 Artikel</span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {sushiInsideOutItems.map((item) => (
                  <div
                    key={item.name}
                    onClick={() => openModal(item)}
                    className="bg-white rounded-lg shadow-sm hover:shadow-[0_0_40px_rgba(255,255,255,1)] transition-all duration-300 cursor-pointer border-2 border-transparent hover:border-white p-4"
                  >
                    <div className="flex gap-4 items-start">
                      <div className="flex-1">
                        <h3 className="font-bold text-gray-900 text-base mb-1">{item.name}</h3>
                        <button className="text-xs text-gray-700 hover:text-gray-900 underline mb-2">
                          Produktinfo
                        </button>
                        <div className="font-bold text-gray-900 text-base mb-2">{item.price}</div>
                        {item.description && (
                          <p className="text-xs text-gray-600 mb-2 line-clamp-2">{item.description}</p>
                        )}
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
                      <div className="flex flex-col items-end gap-2">
                        <button className="bg-white border-2 border-gray-300 rounded-full p-1.5 hover:bg-gray-50 transition-colors">
                          <span className="text-lg text-[#CC0000]">+</span>
                        </button>
                        <div className="relative w-28 h-28 bg-orange-50 rounded-lg overflow-hidden">
                          <Image src={item.image} alt={item.name} fill className="object-cover" />
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* Sushi-tempura Futo Maki Section */}
            <section id="sushi-tempura-futo-maki" className="mb-12">
              <div className="flex items-center justify-between mb-6 bg-white px-4 py-3 rounded-lg shadow-sm border-2 border-transparent hover:border-white hover:shadow-[0_0_40px_rgba(255,255,255,1)] transition-all duration-300 cursor-pointer">
                <h2 className="text-3xl font-bold text-gray-900">Sushi-tempura Futo Maki</h2>
                <span className="text-gray-600 font-semibold">6 Artikel</span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {sushiTempuraFutoMakiItems.map((item) => (
                  <div
                    key={item.name}
                    onClick={() => openModal(item)}
                    className="bg-white rounded-lg shadow-sm hover:shadow-[0_0_40px_rgba(255,255,255,1)] transition-all duration-300 cursor-pointer border-2 border-transparent hover:border-white p-4"
                  >
                    <div className="flex gap-4 items-start">
                      <div className="flex-1">
                        <h3 className="font-bold text-gray-900 text-base mb-1">{item.name}</h3>
                        <button className="text-xs text-gray-700 hover:text-gray-900 underline mb-2">
                          Produktinfo
                        </button>
                        <div className="font-bold text-gray-900 text-base mb-2">{item.price}</div>
                        {item.description && (
                          <p className="text-xs text-gray-600 mb-2 line-clamp-2">{item.description}</p>
                        )}
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
                      <div className="flex flex-col items-end gap-2">
                        <button className="bg-white border-2 border-gray-300 rounded-full p-1.5 hover:bg-gray-50 transition-colors">
                          <span className="text-lg text-[#CC0000]">+</span>
                        </button>
                        <div className="relative w-28 h-28 bg-orange-50 rounded-lg overflow-hidden">
                          <Image src={item.image} alt={item.name} fill className="object-cover" />
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* Sushi-futo Maki Section */}
            <section id="sushi-futo-maki" className="mb-12">
              <div className="flex items-center justify-between mb-6 bg-white px-4 py-3 rounded-lg shadow-sm border-2 border-transparent hover:border-white hover:shadow-[0_0_40px_rgba(255,255,255,1)] transition-all duration-300 cursor-pointer">
                <h2 className="text-3xl font-bold text-gray-900">Sushi-futo Maki</h2>
                <span className="text-gray-600 font-semibold">4 Artikel</span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {sushiFutoMakiItems.map((item) => (
                  <div
                    key={item.name}
                    onClick={() => openModal(item)}
                    className="bg-white rounded-lg shadow-sm hover:shadow-[0_0_40px_rgba(255,255,255,1)] transition-all duration-300 cursor-pointer border-2 border-transparent hover:border-white p-4"
                  >
                    <div className="flex gap-4 items-start">
                      <div className="flex-1">
                        <h3 className="font-bold text-gray-900 text-base mb-1">{item.name}</h3>
                        <button className="text-xs text-gray-700 hover:text-gray-900 underline mb-2">
                          Produktinfo
                        </button>
                        <div className="font-bold text-gray-900 text-base mb-2">{item.price}</div>
                        {item.description && (
                          <p className="text-xs text-gray-600 mb-2 line-clamp-2">{item.description}</p>
                        )}
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
                      <div className="flex flex-col items-end gap-2">
                        <button className="bg-white border-2 border-gray-300 rounded-full p-1.5 hover:bg-gray-50 transition-colors">
                          <span className="text-lg text-[#CC0000]">+</span>
                        </button>
                        <div className="relative w-28 h-28 bg-orange-50 rounded-lg overflow-hidden">
                          <Image src={item.image} alt={item.name} fill className="object-cover" />
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* Sushi-sashimi Section */}
            <section id="sushi-sashimi" className="mb-12">
              <div className="flex items-center justify-between mb-6 bg-white px-4 py-3 rounded-lg shadow-sm border-2 border-transparent hover:border-white hover:shadow-[0_0_40px_rgba(255,255,255,1)] transition-all duration-300 cursor-pointer">
                <h2 className="text-3xl font-bold text-gray-900">Sushi-sashimi</h2>
                <span className="text-gray-600 font-semibold">5 Artikel</span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {sushiSashimiItems.map((item) => (
                  <div
                    key={item.name}
                    onClick={() => openModal(item)}
                    className="bg-white rounded-lg shadow-sm hover:shadow-[0_0_40px_rgba(255,255,255,1)] transition-all duration-300 cursor-pointer border-2 border-transparent hover:border-white p-4"
                  >
                    <div className="flex gap-4 items-start">
                      <div className="flex-1">
                        <h3 className="font-bold text-gray-900 text-base mb-1">{item.name}</h3>
                        <button className="text-xs text-gray-700 hover:text-gray-900 underline mb-2">
                          Produktinfo
                        </button>
                        <div className="font-bold text-gray-900 text-base mb-2">{item.price}</div>
                        {item.description && (
                          <p className="text-xs text-gray-600 mb-2 line-clamp-2">{item.description}</p>
                        )}
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
                      <div className="flex flex-col items-end gap-2">
                        <button className="bg-white border-2 border-gray-300 rounded-full p-1.5 hover:bg-gray-50 transition-colors">
                          <span className="text-lg text-[#CC0000]">+</span>
                        </button>
                        <div className="relative w-28 h-28 bg-orange-50 rounded-lg overflow-hidden">
                          <Image src={item.image} alt={item.name} fill className="object-cover" />
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* Appetizer Section */}
            <section id="appetizer" className="mb-12">
              <div className="flex items-center justify-between mb-6 bg-white px-4 py-3 rounded-lg shadow-sm border-2 border-transparent hover:border-white hover:shadow-[0_0_40px_rgba(255,255,255,1)] transition-all duration-300 cursor-pointer">
                <h2 className="text-3xl font-bold text-gray-900">Appetizer</h2>
                <span className="text-gray-600 font-semibold">11 Artikel</span>
              </div>

              {/* Grid Layout */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {appetizerItems.map((item) => (
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

            {/* Suppen Section */}
            <section id="suppen" className="mb-12">
              <div className="flex items-center justify-between mb-6 bg-white px-4 py-3 rounded-lg shadow-sm border-2 border-transparent hover:border-white hover:shadow-[0_0_40px_rgba(255,255,255,1)] transition-all duration-300 cursor-pointer">
                <h2 className="text-3xl font-bold text-gray-900">Suppen</h2>
                <span className="text-gray-600 font-semibold">4 Artikel</span>
              </div>

              {/* Grid Layout */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {suppenItems.map((item) => (
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

            {/* Salate Section */}
            <section id="salate" className="mb-12">
              <div className="flex items-center justify-between mb-6 bg-white px-4 py-3 rounded-lg shadow-sm border-2 border-transparent hover:border-white hover:shadow-[0_0_40px_rgba(255,255,255,1)] transition-all duration-300 cursor-pointer">
                <h2 className="text-3xl font-bold text-gray-900">Salate</h2>
                <span className="text-gray-600 font-semibold">2 Artikel</span>
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

            {/* Gebratene Spezialitäten Section */}
            <section id="gebratene-spezialitäten" className="mb-12">
              <div className="flex items-center justify-between mb-6 bg-white px-4 py-3 rounded-lg shadow-sm border-2 border-transparent hover:border-white hover:shadow-[0_0_40px_rgba(255,255,255,1)] transition-all duration-300 cursor-pointer">
                <h2 className="text-3xl font-bold text-gray-900">Gebratene Spezialitäten</h2>
                <span className="text-gray-600 font-semibold">5 Artikel</span>
              </div>

              {/* Grid Layout */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {gebrateneSpezialitaetenItems.map((item) => (
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

            {/* Asia-Thai-Curry Section */}
            <section id="asia-thai-curry" className="mb-12">
              <div className="flex items-center justify-between mb-6 bg-white px-4 py-3 rounded-lg shadow-sm border-2 border-transparent hover:border-white hover:shadow-[0_0_40px_rgba(255,255,255,1)] transition-all duration-300 cursor-pointer">
                <h2 className="text-3xl font-bold text-gray-900">Asia-Thai-Curry</h2>
                <span className="text-gray-600 font-semibold">5 Artikel</span>
              </div>

              {/* Grid Layout */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {asiaThaiCurryItems.map((item) => (
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

            {/* Asia-vietnamesische Spezialitäten Section */}
            <section id="asia-vietnamesische-spezialitäten" className="mb-12">
              <div className="flex items-center justify-between mb-6 bg-white px-4 py-3 rounded-lg shadow-sm border-2 border-transparent hover:border-white hover:shadow-[0_0_40px_rgba(255,255,255,1)] transition-all duration-300 cursor-pointer">
                <h2 className="text-3xl font-bold text-gray-900">Asia-vietnamesische Spezialitäten</h2>
                <span className="text-gray-600 font-semibold">5 Artikel</span>
              </div>

              {/* Grid Layout */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {asiaVietnamesischeSpezialitaetenItems.map((item) => (
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


            {/* Extras Section */}
            <section id="extras" className="mb-12">
              <div className="flex items-center justify-between mb-6 bg-white px-4 py-3 rounded-lg shadow-sm border-2 border-transparent hover:border-white hover:shadow-[0_0_40px_rgba(255,255,255,1)] transition-all duration-300 cursor-pointer">
                <h2 className="text-3xl font-bold text-gray-900">Extras</h2>
                <span className="text-gray-600 font-semibold">11 Artikel</span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {extrasItems.map((item) => (
                  <div
                    key={item.name}
                    onClick={() => openModal(item)}
                    className="bg-white rounded-lg shadow-sm hover:shadow-[0_0_40px_rgba(255,255,255,1)] transition-all duration-300 cursor-pointer border-2 border-transparent hover:border-white p-4"
                  >
                    <div className="flex gap-4 items-start">
                      <div className="flex-1">
                        <h3 className="font-bold text-gray-900 text-base mb-1">{item.name}</h3>
                        <button className="text-xs text-gray-700 hover:text-gray-900 underline mb-2">
                          Produktinfo
                        </button>
                        <div className="font-bold text-gray-900 text-base mb-2">{item.price}</div>
                        {item.description && (
                          <p className="text-xs text-gray-600 mb-2 line-clamp-2">{item.description}</p>
                        )}
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
                      <div className="flex flex-col items-end gap-2">
                        <button className="bg-white border-2 border-gray-300 rounded-full p-1.5 hover:bg-gray-50 transition-colors">
                          <span className="text-lg text-[#CC0000]">+</span>
                        </button>
                        <div className="relative w-28 h-28 bg-orange-50 rounded-lg overflow-hidden">
                          <Image src={item.image} alt={item.name} fill className="object-cover" />
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

export default function ToshiSushiPage() {
  return <ToshiSushiContent />
}
