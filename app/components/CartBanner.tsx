'use client'

import Link from 'next/link'
import { useCart } from '../context/CartContext'

export default function CartBanner() {
  const { cartItems } = useCart()

  // Don't show banner if cart is empty
  if (cartItems.length === 0) return null

  return (
    <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50">
      <Link
        href="/cart"
        className="group flex items-center gap-3 bg-gradient-to-r from-[#CC0000] to-[#FF2900] text-white font-bold py-4 px-8 rounded-full shadow-[0_8px_30px_rgba(204,0,0,0.4)] hover:shadow-[0_12px_40px_rgba(204,0,0,0.6)] transition-all duration-300 hover:scale-105 hover:-translate-y-1"
      >
        {/* Cart Icon with bounce animation */}
        <div className="relative">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={2}
            stroke="currentColor"
            className="w-6 h-6 group-hover:animate-bounce"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z"
            />
          </svg>

          {/* Item count badge */}
          <span className="absolute -top-2 -right-2 bg-white text-[#CC0000] text-xs font-bold w-5 h-5 rounded-full flex items-center justify-center shadow-md">
            {cartItems.length}
          </span>
        </div>

        {/* Text */}
        <span className="text-lg tracking-wide">Warenkorb ansehen</span>

        {/* Arrow icon */}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={2.5}
          stroke="currentColor"
          className="w-5 h-5 transition-transform group-hover:translate-x-1"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3"
          />
        </svg>
      </Link>
    </div>
  )
}
