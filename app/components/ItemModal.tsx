'use client'

import Image from 'next/image'
import { useState, useEffect } from 'react'
import { useCart } from '../context/CartContext'

interface ItemModalProps {
  isOpen: boolean
  onClose: () => void
  item: {
    name: string
    price: string
    description?: string
    bulletPoints?: string[]
    image?: string
    tags?: string[]
    additionalInfo?: string
  }
}

export default function ItemModal({ isOpen, onClose, item }: ItemModalProps) {
  const [quantity, setQuantity] = useState(1)
  const { addToCart } = useCart()

  // Prevent body scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }

    // Cleanup on unmount
    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [isOpen])

  if (!isOpen) return null

  const decreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1)
    }
  }

  const increaseQuantity = () => {
    setQuantity(quantity + 1)
  }

  // Calculate total price based on quantity
  const calculateTotalPrice = () => {
    // Extract numeric value from price string (e.g., "5,90 €" -> 5.90)
    const priceMatch = item.price.match(/(\d+[,.]?\d*)/)
    if (priceMatch) {
      const basePrice = parseFloat(priceMatch[1].replace(',', '.'))
      const totalPrice = (basePrice * quantity).toFixed(2).replace('.', ',')
      return `${totalPrice} €`
    }
    return item.price
  }

  const handleAddToCart = () => {
    addToCart({
      name: item.name,
      price: item.price,
      description: item.description,
      image: item.image
    }, quantity)
    onClose()
    setQuantity(1)
  }

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/50"
        onClick={onClose}
      ></div>

      {/* Modal */}
      <div className="relative bg-white rounded-2xl shadow-2xl max-w-2xl w-full mx-4 max-h-[90vh] overflow-y-auto">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 w-10 h-10 flex items-center justify-center bg-white rounded-full shadow-lg hover:bg-gray-100 transition-colors"
        >
          <span className="text-2xl text-gray-700">×</span>
        </button>

        {/* Content */}
        <div className="p-6">
          {/* Image Section - Only show if image exists */}
          {item.image && (
            <div className="relative w-full h-64 bg-orange-50 rounded-xl overflow-hidden mb-6">
              <Image
                src={item.image}
                alt={item.name}
                fill
                className="object-cover"
              />
            </div>
          )}

          {/* Item Name */}
          <h2 className="text-2xl font-bold text-gray-900 mb-4">{item.name}</h2>

          {/* Price */}
          <div className="text-xl font-bold text-gray-900 mb-4">{item.price}</div>

          {/* Description or Bullet Points */}
          {item.bulletPoints ? (
            <ul className="text-sm text-gray-600 mb-4 space-y-2">
              {item.bulletPoints.map((point, index) => (
                <li key={index} className="flex items-start">
                  <span className="mr-2">•</span>
                  <span>{point}</span>
                </li>
              ))}
            </ul>
          ) : item.description && (
            <p className="text-sm text-gray-600 mb-4">{item.description}</p>
          )}

          {/* Additional Info */}
          {item.additionalInfo && (
            <p className="text-xs text-gray-500 mb-4">{item.additionalInfo}</p>
          )}

          {/* Tags */}
          {item.tags && item.tags.length > 0 && (
            <div className="flex gap-2 flex-wrap mb-6">
              {item.tags.map((tag) => (
                <span
                  key={tag}
                  className={`px-3 py-1 rounded-full text-sm font-semibold ${
                    tag === 'Vegan'
                      ? 'bg-green-100 text-green-800'
                      : tag === 'Vegetarisch'
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

          {/* Produktinfo Link */}
          <button className="text-sm text-gray-700 hover:text-gray-900 underline mb-6">
            Produktinfo
          </button>

          {/* Quantity Controls and Add Button */}
          <div className="flex items-center gap-4">
            {/* Quantity Controls */}
            <div className="flex items-center gap-3 bg-gray-100 rounded-full px-4 py-2">
              <button
                onClick={decreaseQuantity}
                className="w-8 h-8 flex items-center justify-center text-2xl text-gray-700 hover:text-gray-900 transition-colors"
              >
                −
              </button>
              <span className="text-lg font-semibold text-gray-900 min-w-[30px] text-center">
                {quantity}
              </span>
              <button
                onClick={increaseQuantity}
                className="w-8 h-8 flex items-center justify-center text-2xl text-gray-700 hover:text-gray-900 transition-colors"
              >
                +
              </button>
            </div>

            {/* Add to Cart Button */}
            <button
              onClick={handleAddToCart}
              className="flex-1 bg-[#CC0000] hover:bg-[#C73614] text-white font-bold py-3 px-6 rounded-full transition-colors text-lg shadow-lg"
            >
              Hinzufügen {calculateTotalPrice()}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
