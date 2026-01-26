'use client'

import { useState } from 'react'

interface ReservationModalProps {
  isOpen: boolean
  onClose: () => void
}

export default function ReservationModal({ isOpen, onClose }: ReservationModalProps) {
  const [step, setStep] = useState<'time' | 'details' | 'success'>('time')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [reservationNumber, setReservationNumber] = useState('')
  const [reservationData, setReservationData] = useState({
    date: '',
    time: '',
    guests: '2',
    name: '',
    email: '',
    phone: ''
  })

  const handleSubmit = async () => {
    setIsSubmitting(true)
    try {
      const response = await fetch('/api/reservations', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: reservationData.name,
          email: reservationData.email,
          phone: reservationData.phone,
          date: reservationData.date,
          time: reservationData.time,
          guests: reservationData.guests,
        }),
      })

      const data = await response.json()

      if (response.ok && data.success) {
        setReservationNumber(data.reservationNumber)
        setStep('success')
      } else {
        alert(`Failed to make reservation: ${data.error || 'Unknown error'}`)
      }
    } catch (error) {
      console.error('Error submitting reservation:', error)
      alert('Failed to make reservation. Please try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleClose = () => {
    setStep('time')
    setReservationNumber('')
    setReservationData({
      date: '',
      time: '',
      guests: '2',
      name: '',
      email: '',
      phone: ''
    })
    onClose()
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm px-4">
      <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full max-h-[90vh] overflow-y-auto relative">
        {/* Close button */}
        <button
          onClick={handleClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors z-10"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        {/* Step 1: Time Selection */}
        {step === 'time' && (
          <div className="p-8">
            <h2 className="font-[family-name:var(--font-archivo-black)] text-2xl text-[#CC0000] mb-6">
              Machen Sie eine Reservierung
            </h2>

            <div className="space-y-4">
              {/* Date */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Datum
                </label>
                <input
                  type="date"
                  value={reservationData.date}
                  onChange={(e) => setReservationData({ ...reservationData, date: e.target.value })}
                  min={new Date().toISOString().split('T')[0]}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-[#CC0000] focus:outline-none transition-colors"
                  required
                />
              </div>

              {/* Time */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Zeit
                </label>
                <select
                  value={reservationData.time}
                  onChange={(e) => setReservationData({ ...reservationData, time: e.target.value })}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-[#CC0000] focus:outline-none transition-colors"
                  required
                >
                  <option value="">Wählen Sie die Uhrzeit aus</option>
                  <option value="11:30">11:30</option>
                  <option value="12:00">12:00</option>
                  <option value="12:30">12:30</option>
                  <option value="13:00">13:00</option>
                  <option value="13:30">13:30</option>
                  <option value="14:00">14:00</option>
                  <option value="14:30">14:30</option>
                  <option value="15:00">15:00</option>
                  <option value="15:30">15:30</option>
                  <option value="16:00">16:00</option>
                  <option value="16:30">16:30</option>
                  <option value="17:00">17:00</option>
                  <option value="17:30">17:30</option>
                  <option value="18:00">18:00</option>
                  <option value="18:30">18:30</option>
                  <option value="19:00">19:00</option>
                  <option value="19:30">19:30</option>
                  <option value="20:00">20:00</option>
                  <option value="20:30">20:30</option>
                  <option value="21:00">21:00</option>
                </select>
              </div>

              {/* Number of Guests */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Anzahl der Gäste
                </label>
                <select
                  value={reservationData.guests}
                  onChange={(e) => setReservationData({ ...reservationData, guests: e.target.value })}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-[#CC0000] focus:outline-none transition-colors"
                  required
                >
                  {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((num) => (
                    <option key={num} value={num}>
                      {num} {num === 1 ? 'Gast' : 'Gäste'}
                    </option>
                  ))}
                </select>
              </div>

              {/* Next Button */}
              <button
                onClick={() => {
                  if (reservationData.date && reservationData.time) {
                    setStep('details')
                  } else {
                    alert('Please select a date and time')
                  }
                }}
                className="w-full bg-[#CC0000] text-white font-bold py-3 rounded-lg hover:bg-[#990000] transition-colors shadow-md hover:shadow-lg"
              >
                Nächste
              </button>
            </div>
          </div>
        )}

        {/* Step 2: Contact Details */}
        {step === 'details' && (
          <div className="p-8">
            <button
              onClick={() => setStep('time')}
              className="flex items-center gap-2 text-gray-600 hover:text-[#CC0000] mb-4 transition-colors"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              Zurück
            </button>

            <h2 className="font-[family-name:var(--font-archivo-black)] text-2xl text-[#CC0000] mb-2">
              Kontaktdaten
            </h2>
            <p className="text-sm text-gray-600 mb-6">
              Reservierung für {reservationData.guests} {reservationData.guests === '1' ? 'guest' : 'guests'} on {new Date(reservationData.date).toLocaleDateString('de-DE', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })} at {reservationData.time}
            </p>

            <div className="space-y-4">
              {/* Name */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Vollständiger Name
                </label>
                <input
                  type="text"
                  value={reservationData.name}
                  onChange={(e) => setReservationData({ ...reservationData, name: e.target.value })}
                  placeholder="John Doe"
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-[#CC0000] focus:outline-none transition-colors"
                  required
                />
              </div>

              {/* Email */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  E-Mail
                </label>
                <input
                  type="email"
                  value={reservationData.email}
                  onChange={(e) => setReservationData({ ...reservationData, email: e.target.value })}
                  placeholder="john@example.com"
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-[#CC0000] focus:outline-none transition-colors"
                  required
                />
              </div>

              {/* Phone */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Telefonnummer
                </label>
                <input
                  type="tel"
                  value={reservationData.phone}
                  onChange={(e) => setReservationData({ ...reservationData, phone: e.target.value })}
                  placeholder="+49 123 456 789"
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-[#CC0000] focus:outline-none transition-colors"
                  required
                />
              </div>

              {/* Confirm Button */}
              <button
                onClick={() => {
                  if (reservationData.name && reservationData.email && reservationData.phone) {
                    handleSubmit()
                  } else {
                    alert('Bitte füllen Sie alle Felder aus.')
                  }
                }}
                disabled={isSubmitting}
                className="w-full bg-[#CC0000] text-white font-bold py-3 rounded-lg hover:bg-[#990000] transition-colors shadow-md hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? 'Bestätigen...' : 'Bestätigen Sie die Reservierung'}
              </button>
            </div>
          </div>
        )}

        {/* Step 3: Success */}
        {step === 'success' && (
          <div className="p-8">
            <div className="text-center">
              {/* Success Icon */}
              <div className="mx-auto w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mb-6">
                <svg className="w-12 h-12 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>

              {/* Success Message */}
              <h2 className="font-[family-name:var(--font-archivo-black)] text-2xl text-[#CC0000] mb-4">
                Reservierung bestätigt!
              </h2>

              <div className="bg-gray-50 rounded-lg p-6 mb-6">
                <p className="text-gray-700 mb-4">
                  Ihre Reservierung wurde bestätigt.
                </p>

                <div className="bg-white border-2 border-[#CC0000] rounded-lg p-4 mb-4">
                  <p className="text-sm text-gray-600 mb-1">Reservierungsnummer</p>
                  <p className="font-bold text-xl text-[#CC0000]">{reservationNumber}</p>
                </div>

                <div className="text-left space-y-2 text-sm text-gray-600">
                  <div className="flex justify-between">
                    <span>Datum:</span>
                    <span className="font-semibold text-gray-900">
                      {new Date(reservationData.date).toLocaleDateString('de-DE', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span>Zeit:</span>
                    <span className="font-semibold text-gray-900">{reservationData.time}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Gäste:</span>
                    <span className="font-semibold text-gray-900">
                      {reservationData.guests} {reservationData.guests === '1' ? 'Guest' : 'Guests'}
                    </span>
                  </div>
                </div>
              </div>

              <p className="text-gray-600 mb-6">
                Wir werden uns in Kürze bei Ihnen melden <strong>{reservationData.email}</strong> um Ihre Reservierung zu bestätigen.
              </p>

              {/* Close Button */}
              <button
                onClick={handleClose}
                className="w-full bg-[#CC0000] text-white font-bold py-3 rounded-lg hover:bg-[#990000] transition-colors shadow-md hover:shadow-lg"
              >
                Erledigt
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
