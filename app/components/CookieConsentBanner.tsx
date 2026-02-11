'use client'

import { useState, useEffect } from 'react'

const CONSENT_KEY = 'hungry-club-cookie-consent'

export default function CookieConsentBanner() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const consent = localStorage.getItem(CONSENT_KEY)
    if (!consent) setVisible(true)
  }, [])

  const handleAccept = () => {
    localStorage.setItem(CONSENT_KEY, 'accepted')
    setVisible(false)
  }

  const handleReject = () => {
    localStorage.setItem(CONSENT_KEY, 'rejected')
    setVisible(false)
  }

  if (!visible) return null

  return (
    <div className="fixed bottom-0 left-0 right-0 z-[9999] bg-[#111] border-t border-[#333] shadow-[0_-4px_30px_rgba(0,0,0,0.5)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4 flex flex-col sm:flex-row items-center justify-between gap-4">
        {/* Text */}
        <p className="text-gray-300 text-sm text-center sm:text-left leading-relaxed">
          Wir verwenden Cookies, um Ihnen die bestmögliche Erfahrung auf unserer Website zu bieten.{' '}
          <button
            onClick={() => {
              const el = document.querySelector('[data-legal="datenschutz"]') as HTMLElement
              if (el) el.click()
            }}
            className="text-[#E31837] hover:underline underline-offset-2"
          >
            Datenschutzerklärung
          </button>
        </p>

        {/* Buttons */}
        <div className="flex gap-3 flex-shrink-0">
          <button
            onClick={handleReject}
            className="px-5 py-2 rounded-lg bg-[#222] hover:bg-[#2a2a2a] text-white text-sm font-semibold border border-[#444] hover:border-[#555] transition-all active:scale-[0.97] cursor-pointer"
          >
            Ablehnen
          </button>
          <button
            onClick={handleAccept}
            className="px-5 py-2 rounded-lg bg-[#E31837] hover:bg-[#c91430] text-white text-sm font-bold transition-all hover:shadow-lg hover:shadow-[#E31837]/30 active:scale-[0.97] cursor-pointer"
          >
            Akzeptieren
          </button>
        </div>
      </div>
    </div>
  )
}
