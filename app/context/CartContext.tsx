'use client'

import { createContext, useContext, useState, useEffect, useCallback, useMemo, ReactNode } from 'react'

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
  cartVersion: number // Add a version counter to force re-renders
}

const CartContext = createContext<CartContextType | undefined>(undefined)

const CART_STORAGE_KEY = 'hungry-club-cart'

export function CartProvider({ children }: { children: ReactNode }) {
  const [cartItems, setCartItems] = useState<CartItem[]>([])
  const [isInitialized, setIsInitialized] = useState(false)
  const [cartVersion, setCartVersion] = useState(0) // Version counter to force re-renders

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

  const addToCart = useCallback((item: Omit<CartItem, 'quantity'>, quantity: number) => {
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
    // Increment version to force re-renders in consuming components
    setCartVersion((v) => v + 1)
  }, [])

  const removeFromCart = useCallback((itemName: string) => {
    setCartItems((prevItems) => prevItems.filter((item) => item.name !== itemName))
    setCartVersion((v) => v + 1)
  }, [])

  const updateQuantity = useCallback((itemName: string, quantity: number) => {
    if (quantity <= 0) {
      setCartItems((prevItems) => prevItems.filter((item) => item.name !== itemName))
    } else {
      setCartItems((prevItems) =>
        prevItems.map((item) =>
          item.name === itemName ? { ...item, quantity } : item
        )
      )
    }
    setCartVersion((v) => v + 1)
  }, [])

  const clearCart = useCallback(() => {
    setCartItems([])
    setCartVersion((v) => v + 1)
  }, [])

  const getTotalItems = useCallback(() => {
    return cartItems.reduce((total, item) => total + item.quantity, 0)
  }, [cartItems])

  const getTotalPrice = useCallback(() => {
    const total = cartItems.reduce((sum, item) => {
      const priceMatch = item.price.match(/(\d+[,.]?\d*)/)
      if (priceMatch) {
        const price = parseFloat(priceMatch[1].replace(',', '.'))
        return sum + price * item.quantity
      }
      return sum
    }, 0)

    return total.toFixed(2).replace('.', ',')
  }, [cartItems])

  const contextValue = useMemo(() => ({
    cartItems,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    getTotalItems,
    getTotalPrice,
    cartVersion,
  }), [cartItems, addToCart, removeFromCart, updateQuantity, clearCart, getTotalItems, getTotalPrice, cartVersion])

  return (
    <CartContext.Provider value={contextValue}>
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
