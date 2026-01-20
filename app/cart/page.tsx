'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useState } from 'react'
import { useCart } from '../context/CartContext'
import CheckoutModal from '../components/CheckoutModal'

export default function CartPage() {
  const { cartItems, removeFromCart, updateQuantity, getTotalPrice, getTotalItems, clearCart } = useCart()
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false)

  const handleQuantityChange = (itemName: string, newQuantity: number) => {
    if (newQuantity >= 1) {
      updateQuantity(itemName, newQuantity)
    }
  }

  const handleRemoveItem = (itemName: string) => {
    removeFromCart(itemName)
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <Link href="/" className="flex items-center gap-2 text-[#CC0000] hover:text-[#990000] transition-colors">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
              </svg>
              <span className="font-bold text-lg">Back to Home</span>
            </Link>
            <h1 className="text-2xl md:text-3xl font-bold text-gray-900">Shopping Cart</h1>
            <div className="w-32"></div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {cartItems.length === 0 ? (
          // Empty Cart State
          <div className="text-center py-16">
            <div className="mb-6">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-24 h-24 mx-auto text-gray-400">
                <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z" />
              </svg>
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Your cart is empty</h2>
            <p className="text-gray-600 mb-6">Add some delicious items from our restaurants!</p>
            <Link href="/" className="inline-block px-6 py-3 bg-[#CC0000] text-white font-bold rounded-lg hover:bg-[#990000] transition-all duration-300 shadow-md hover:shadow-lg">
              Browse Restaurants
            </Link>
          </div>
        ) : (
          // Cart Items
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Cart Items List */}
            <div className="lg:col-span-2 space-y-4">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-bold text-gray-900">
                  Cart Items ({getTotalItems()})
                </h2>
                <button
                  onClick={clearCart}
                  className="text-sm text-red-600 hover:text-red-800 font-semibold transition-colors"
                >
                  Clear Cart
                </button>
              </div>

              {cartItems.map((item) => (
                <div key={item.name} className="bg-white rounded-lg shadow-sm border-2 border-transparent hover:border-[#CC0000] transition-all duration-300 p-4">
                  <div className="flex gap-4">
                    {/* Item Image */}
                    {item.image && (
                      <div className="relative w-24 h-24 bg-orange-50 rounded-lg overflow-hidden flex-shrink-0">
                        <Image
                          src={item.image}
                          alt={item.name}
                          fill
                          className="object-cover"
                        />
                      </div>
                    )}

                    {/* Item Details */}
                    <div className="flex-1">
                      <h3 className="font-bold text-gray-900 text-lg mb-1">{item.name}</h3>
                      {item.description && (
                        <p className="text-sm text-gray-600 mb-2 line-clamp-2">{item.description}</p>
                      )}
                      <div className="flex items-center gap-4 mt-3">
                        <span className="font-bold text-[#CC0000] text-lg">{item.price}</span>

                        {/* Quantity Controls */}
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => handleQuantityChange(item.name, item.quantity - 1)}
                            className="w-8 h-8 rounded-full border-2 border-gray-300 flex items-center justify-center hover:bg-gray-100 transition-colors"
                          >
                            <span className="text-lg font-bold text-gray-700">-</span>
                          </button>
                          <span className="w-8 text-center font-bold text-gray-900">{item.quantity}</span>
                          <button
                            onClick={() => handleQuantityChange(item.name, item.quantity + 1)}
                            className="w-8 h-8 rounded-full border-2 border-gray-300 flex items-center justify-center hover:bg-gray-100 transition-colors"
                          >
                            <span className="text-lg font-bold text-gray-700">+</span>
                          </button>
                        </div>

                        {/* Remove Button */}
                        <button
                          onClick={() => handleRemoveItem(item.name)}
                          className="ml-auto text-red-600 hover:text-red-800 transition-colors"
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                          </svg>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-lg shadow-md p-6 sticky top-24">
                <h2 className="text-xl font-bold text-gray-900 mb-4">Order Summary</h2>

                <div className="space-y-3 mb-6">
                  <div className="flex justify-between text-gray-700">
                    <span>Subtotal</span>
                    <span className="font-semibold">{getTotalPrice()} €</span>
                  </div>
                  <div className="flex justify-between text-gray-700">
                    <span>Delivery Fee</span>
                    <span className="font-semibold">2,00 €</span>
                  </div>
                  <div className="border-t pt-3 flex justify-between text-lg font-bold text-gray-900">
                    <span>Total</span>
                    <span className="text-[#CC0000]">
                      {(parseFloat(getTotalPrice().replace(',', '.')) + 2).toFixed(2).replace('.', ',')} €
                    </span>
                  </div>
                </div>

                <button
                  onClick={() => setIsCheckoutOpen(true)}
                  className="w-full px-6 py-3 bg-[#CC0000] text-white font-bold rounded-lg hover:bg-[#990000] transition-all duration-300 shadow-md hover:shadow-lg mb-3"
                >
                  Proceed to Checkout
                </button>

                <Link href="/" className="block w-full px-6 py-3 bg-white text-[#CC0000] font-bold rounded-lg border-2 border-[#CC0000] hover:bg-gray-50 transition-all duration-300 text-center">
                  Continue Shopping
                </Link>

                {/* Info */}
                <div className="mt-6 pt-6 border-t">
                  <div className="flex items-start gap-2 text-sm text-gray-600">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5 text-green-600 flex-shrink-0">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <p>Free delivery on orders over 20 €</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>

      {/* Checkout Modal */}
      <CheckoutModal
        isOpen={isCheckoutOpen}
        onClose={() => setIsCheckoutOpen(false)}
        totalPrice={(parseFloat(getTotalPrice().replace(',', '.')) + 2).toFixed(2).replace('.', ',')}
        cartItems={cartItems}
        clearCart={clearCart}
      />
    </div>
  )
}
