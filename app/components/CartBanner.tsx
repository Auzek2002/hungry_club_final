'use client'

import { useCart } from '../context/CartContext'

export default function CartBanner() {
  const { getTotalItems, getTotalPrice } = useCart()
  const totalItems = getTotalItems()

  // Don't show banner if cart is empty
  if (totalItems === 0) return null

  return (
    <div className="fixed bottom-0 left-0 right-0 z-40 bg-[#FF6600] shadow-2xl border-t-4 border-[#FF7700]">
      <div className="max-w-7xl mx-auto px-4 py-4">
        <div className="flex items-center justify-between gap-4">
          {/* Left Side - Cart Info */}
          <div className="flex items-center gap-4 text-white">
            <div className="bg-white/20 rounded-full px-4 py-2">
              <span className="font-bold text-lg">{totalItems} Artikel</span>
            </div>
            <div className="hidden sm:block">
              <span className="text-lg font-semibold">Gesamt: {getTotalPrice()} €</span>
            </div>
          </div>

          {/* Right Side - View Cart Button */}
          <button className="bg-white hover:bg-gray-100 text-[#FF6600] font-bold py-3 px-8 rounded-full transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105">
            Warenkorb ansehen
          </button>
        </div>

        {/* Mobile Total Price */}
        <div className="sm:hidden mt-2 text-center">
          <span className="text-white text-lg font-semibold">Gesamt: {getTotalPrice()} €</span>
        </div>
      </div>
    </div>
  )
}
