'use client'

import { CartProvider } from './context/CartContext'
import CookieConsentBanner from './components/CookieConsentBanner'

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <CartProvider>
      {children}
      <CookieConsentBanner />
    </CartProvider>
  )
}
