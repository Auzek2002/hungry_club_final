'use client'

import { createContext, useContext, useState, useEffect, ReactNode } from 'react'

interface CartItem {
  name: string
  price: string
  description?: string
  image?: string
  quantity: number
}

interface CartContextType {
  cartItems: CartItem[]
  addToCart: (item: Omit<CartItem, 'quantity'>, quantity: number) => void
  removeFromCart: (itemName: string) => void
  updateQuantity: (itemName: string, quantity: number) => void
  clearCart: () => void
  getTotalItems: () => number
  getTotalPrice: () => string
}

const CartContext = createContext<CartContextType | undefined>(undefined)

const CART_STORAGE_KEY = 'hungry-club-cart'

export function CartProvider({ children }: { children: ReactNode }) {
  const [cartItems, setCartItems] = useState<CartItem[]>([])
  const [isInitialized, setIsInitialized] = useState(false)

  // Load cart from localStorage on mount
  useEffect(() => {
    try {
      const savedCart = localStorage.getItem(CART_STORAGE_KEY)
      if (savedCart) {
        const parsedCart = JSON.parse(savedCart)
        console.log('Loaded cart from localStorage:', parsedCart)
        setCartItems(parsedCart)
      } else {
        console.log('No saved cart found in localStorage')
      }
    } catch (error) {
      console.error('Error loading cart from localStorage:', error)
    }
    setIsInitialized(true)
  }, [])

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    if (isInitialized) {
      try {
        console.log('Saving cart to localStorage:', cartItems)
        localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cartItems))
      } catch (error) {
        console.error('Error saving cart to localStorage:', error)
      }
    }
  }, [cartItems, isInitialized])

  const addToCart = (item: Omit<CartItem, 'quantity'>, quantity: number) => {
    console.log('Adding to cart:', item, 'quantity:', quantity)
    setCartItems((prevItems) => {
      console.log('Previous cart items:', prevItems)
      const existingItem = prevItems.find((i) => i.name === item.name)

      let newItems
      if (existingItem) {
        // Update quantity if item already exists
        console.log('Item exists, updating quantity')
        newItems = prevItems.map((i) =>
          i.name === item.name
            ? { ...i, quantity: i.quantity + quantity }
            : i
        )
      } else {
        // Add new item
        console.log('New item, adding to cart')
        newItems = [...prevItems, { ...item, quantity }]
      }

      console.log('New cart items:', newItems)
      return newItems
    })
  }

  const removeFromCart = (itemName: string) => {
    setCartItems((prevItems) => prevItems.filter((item) => item.name !== itemName))
  }

  const updateQuantity = (itemName: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(itemName)
    } else {
      setCartItems((prevItems) =>
        prevItems.map((item) =>
          item.name === itemName ? { ...item, quantity } : item
        )
      )
    }
  }

  const clearCart = () => {
    setCartItems([])
  }

  const getTotalItems = () => {
    return cartItems.reduce((total, item) => total + item.quantity, 0)
  }

  const getTotalPrice = () => {
    const total = cartItems.reduce((sum, item) => {
      const priceMatch = item.price.match(/(\d+[,.]?\d*)/)
      if (priceMatch) {
        const price = parseFloat(priceMatch[1].replace(',', '.'))
        return sum + price * item.quantity
      }
      return sum
    }, 0)

    return total.toFixed(2).replace('.', ',')
  }

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        getTotalItems,
        getTotalPrice,
      }}
    >
      {children}
    </CartContext.Provider>
  )
}

export function useCart() {
  const context = useContext(CartContext)
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider')
  }
  return context
}
