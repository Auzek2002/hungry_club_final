'use client'

import { useState } from 'react'

interface CartItem {
  name: string
  price: string
  description?: string
  image?: string
  quantity: number
}

interface CheckoutModalProps {
  isOpen: boolean
  onClose: () => void
  totalPrice: string
  cartItems: CartItem[]
  clearCart: () => void
}

type DeliveryType = 'delivery' | 'pickup' | null
type TimeOption = 'standard' | 'express' | 'immediate'

export default function CheckoutModal({ isOpen, onClose, totalPrice, cartItems, clearCart }: CheckoutModalProps) {
  const [currentStep, setCurrentStep] = useState(1)
  const [deliveryType, setDeliveryType] = useState<DeliveryType>(null)
  const [timeOption, setTimeOption] = useState<TimeOption>('standard')
  const [scheduledTime, setScheduledTime] = useState('')
  const [postalCode, setPostalCode] = useState('')
  const [postalCodeError, setPostalCodeError] = useState('')

  // Calculate total price with express delivery fee
  const EXPRESS_DELIVERY_FEE = 5.00
  const calculateTotalPrice = () => {
    const basePrice = parseFloat(totalPrice.replace(',', '.'))
    if (timeOption === 'express' && deliveryType === 'delivery') {
      return (basePrice + EXPRESS_DELIVERY_FEE).toFixed(2).replace('.', ',')
    }
    return totalPrice
  }

  // Contact details
  const [fullName, setFullName] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [streetAddress, setStreetAddress] = useState('')
  const [city, setCity] = useState('')
  const [contactErrors, setContactErrors] = useState({
    fullName: '',
    email: '',
    phone: '',
    streetAddress: '',
    city: ''
  })

  const [remarks, setRemarks] = useState('')

  // Payment
  const [paymentMethod, setPaymentMethod] = useState<'stripe' | 'cash' | null>(null)
  const [isProcessingPayment, setIsProcessingPayment] = useState(false)

  // Order success state
  const [showSuccessModal, setShowSuccessModal] = useState(false)
  const [successOrderNumber, setSuccessOrderNumber] = useState('')
  const [successDeliveryType, setSuccessDeliveryType] = useState<'delivery' | 'pickup' | null>(null)
  const [successTimeOption, setSuccessTimeOption] = useState<TimeOption>('standard')

  // Approved postal codes (example list - you can expand this)
  const approvedPostalCodes = ['12345', '12346', '12347', '54321', '10115', '10117', '10119']

  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return emailRegex.test(email)
  }

  const validatePhone = (phone: string) => {
    const phoneRegex = /^[\d\s\-\+\(\)]+$/
    return phoneRegex.test(phone) && phone.replace(/\D/g, '').length >= 10
  }

  const handleNext = () => {
    if (currentStep === 1 && !deliveryType) {
      alert('Please select a delivery type')
      return
    }

    if (currentStep === 4) {
      // Validate contact details
      const errors = {
        fullName: '',
        email: '',
        phone: '',
        streetAddress: '',
        city: ''
      }

      if (!fullName.trim()) {
        errors.fullName = 'Full name is required'
      }

      if (!email.trim()) {
        errors.email = 'Email is required'
      } else if (!validateEmail(email)) {
        errors.email = 'Please enter a valid email address'
      }

      if (!phone.trim()) {
        errors.phone = 'Phone number is required'
      } else if (!validatePhone(phone)) {
        errors.phone = 'Please enter a valid phone number (min. 10 digits)'
      }

      if (deliveryType === 'delivery') {
        if (!streetAddress.trim()) {
          errors.streetAddress = 'Street address is required'
        }
        if (!city.trim()) {
          errors.city = 'City is required'
        }
      }

      if (Object.values(errors).some(error => error !== '')) {
        setContactErrors(errors)
        return
      }

      setContactErrors({
        fullName: '',
        email: '',
        phone: '',
        streetAddress: '',
        city: ''
      })
    }

    if (currentStep < 6) {
      setCurrentStep(currentStep + 1)
    }
  }

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1)
    }
  }

  const handleSubmit = async () => {
    if (!paymentMethod) {
      alert('Please select a payment method')
      return
    }

    const finalTotalPrice = calculateTotalPrice()

    const orderData = {
      deliveryType,
      timeOption,
      scheduledTime,
      postalCode,
      fullName,
      email,
      phone,
      streetAddress,
      city,
      remarks,
      paymentMethod,
    }

    if (paymentMethod === 'cash') {
      // For cash payment, save order to database and confirm
      try {
        const response = await fetch('/api/orders', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            orderData,
            totalPrice: finalTotalPrice,
            cartItems,
            paymentStatus: 'pending',
          }),
        })

        const data = await response.json()

        if (data.success) {
          console.log('Order placed with cash payment:', data)
          setSuccessOrderNumber(data.orderNumber)
          setSuccessDeliveryType(deliveryType)
          setSuccessTimeOption(timeOption)
          setShowSuccessModal(true)
          clearCart() // Clear the cart after successful order
        } else {
          throw new Error('Failed to save order')
        }
      } catch (error) {
        console.error('Order save error:', error)
        alert('Failed to place order. Please try again.')
      }
    } else if (paymentMethod === 'stripe') {
      // Redirect to Stripe checkout
      setIsProcessingPayment(true)

      try {
        const response = await fetch('/api/create-checkout-session', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            orderData,
            totalPrice: finalTotalPrice,
            cartItems,
          }),
        })

        const data = await response.json()

        if (data.url) {
          // Redirect to Stripe checkout
          window.location.href = data.url
        } else {
          throw new Error('Failed to create checkout session')
        }
      } catch (error) {
        console.error('Payment error:', error)
        alert('Failed to process payment. Please try again.')
        setIsProcessingPayment(false)
      }
    }
  }

  const handleSuccessModalClose = () => {
    setShowSuccessModal(false)
    setSuccessOrderNumber('')
    onClose()
    // Reset form
    setCurrentStep(1)
    setDeliveryType(null)
    setTimeOption('standard')
    setScheduledTime('')
    setPostalCode('')
    setFullName('')
    setEmail('')
    setPhone('')
    setStreetAddress('')
    setCity('')
    setRemarks('')
    setPaymentMethod(null)
  }

  if (!isOpen) return null

  // Success Modal
  if (showSuccessModal) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
        <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-8 text-center">
          {/* Success Icon */}
          <div className="mb-6 flex justify-center">
            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-12 h-12 text-green-600">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
          </div>

          {/* Success Message */}
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Ihre Bestellung wurde aufgegeben!</h2>
          <p className="text-lg text-gray-700 mb-4">Bestellnummer: <span className="font-bold text-[#CC0000]">{successOrderNumber}</span></p>

          {/* Estimated Time */}
          <div className="bg-green-50 border-2 border-green-200 rounded-lg p-4 mb-4">
            <p className="text-sm text-gray-700 mb-1">
              {successDeliveryType === 'delivery' ? '🚗 Delivery' : '🛍️ Pickup'}
            </p>
            <p className="text-lg font-bold text-gray-900">
              {successTimeOption === 'standard'
                ? 'Estimated Time: 45-60 minutes'
                : successTimeOption === 'express'
                ? 'Estimated Time: 30 minutes (Express)'
                : 'Estimated Time: ~30 minutes'
              }
            </p>
          </div>

          {/* Contact Info */}
          <div className="bg-blue-50 border-2 border-blue-200 rounded-lg p-4 mb-6">
            <p className="text-sm text-gray-800 mb-2">Bei Fragen zu Ihrer Bestellung wenden Sie sich bitte an uns:</p>
            <a href="tel:+493012345678" className="text-xl font-bold text-blue-600 hover:text-blue-800 transition-colors">
              +49 30 123 456 789
            </a>
          </div>

          {/* Close Button */}
          <button
            onClick={handleSuccessModalClose}
            className="w-full px-6 py-3 bg-[#CC0000] text-white font-bold rounded-lg hover:bg-[#990000] transition-all duration-300 shadow-md hover:shadow-lg"
          >
            Schließen
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
      <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="sticky top-0 bg-white border-b-2 border-gray-100 p-6 rounded-t-2xl z-10">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-2xl font-bold text-gray-900">Kasse</h2>
            <button
              onClick={onClose}
              className="text-gray-500 hover:text-gray-700 transition-colors"
            >
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* Progress Indicator */}
          <div className="flex items-start justify-between gap-1">
            {[
              { num: 1, label: 'Type' },
              { num: 2, label: 'Time' },
              { num: 3, label: 'Area' },
              { num: 4, label: 'Contact' },
              { num: 5, label: 'Notes' },
              { num: 6, label: 'Payment' }
            ].map((step, index) => (
              <div key={step.num} className="flex flex-col items-center flex-1">
                <div className="flex items-center w-full">
                  {index > 0 && (
                    <div className={`flex-1 h-0.5 ${
                      currentStep > step.num - 1 ? 'bg-[#CC0000]' : 'bg-gray-300'
                    } transition-all duration-300`}></div>
                  )}
                  <div className={`flex items-center justify-center w-7 h-7 rounded-full border-2 ${
                    currentStep >= step.num
                      ? 'bg-[#CC0000] border-[#CC0000] text-white'
                      : 'bg-white border-gray-300 text-gray-500'
                  } font-bold text-xs transition-all duration-300 flex-shrink-0`}>
                    {step.num}
                  </div>
                  {index < 5 && (
                    <div className={`flex-1 h-0.5 ${
                      currentStep > step.num ? 'bg-[#CC0000]' : 'bg-gray-300'
                    } transition-all duration-300`}></div>
                  )}
                </div>
                <span className="text-[9px] text-gray-600 mt-1.5 text-center">{step.label}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Content */}
        <div className="p-6">
          {/* Step 1: Delivery Type */}
          {currentStep === 1 && (
            <div className="space-y-6">
              <h3 className="text-xl font-bold text-gray-900 mb-4">Wählen Sie die Lieferart aus</h3>
              <div className="grid grid-cols-2 gap-4">
                <button
                  onClick={() => setDeliveryType('delivery')}
                  className={`p-6 rounded-xl border-2 transition-all duration-300 ${
                    deliveryType === 'delivery'
                      ? 'border-[#CC0000] bg-red-50 shadow-lg'
                      : 'border-gray-200 hover:border-[#CC0000] hover:shadow-md'
                  }`}
                >
                  <div className="text-4xl mb-3">🚗</div>
                  <div className="font-bold text-lg text-gray-900">Lieferung</div>
                  <div className="text-sm text-gray-600 mt-1">30-60 min</div>
                </button>

                <button
                  onClick={() => setDeliveryType('pickup')}
                  className={`p-6 rounded-xl border-2 transition-all duration-300 ${
                    deliveryType === 'pickup'
                      ? 'border-[#CC0000] bg-red-50 shadow-lg'
                      : 'border-gray-200 hover:border-[#CC0000] hover:shadow-md'
                  }`}
                >
                  <div className="text-4xl mb-3">🛍️</div>
                  <div className="font-bold text-lg text-gray-900">Abholen</div>
                  <div className="text-sm text-gray-600 mt-1">~30 min</div>
                </button>
              </div>
            </div>
          )}

          {/* Step 2: Delivery Speed */}
          {currentStep === 2 && (
            <div className="space-y-6">
              <h3 className="text-xl font-bold text-gray-900 mb-4">
                {deliveryType === 'delivery' ? 'Select Delivery Speed' : 'Pickup Time'}
              </h3>

              {deliveryType === 'delivery' ? (
                <div className="grid grid-cols-2 gap-4">
                  {/* Standard Delivery */}
                  <button
                    onClick={() => setTimeOption('standard')}
                    className={`p-6 rounded-xl border-2 transition-all duration-300 ${
                      timeOption === 'standard'
                        ? 'border-[#CC0000] bg-red-50 shadow-lg'
                        : 'border-gray-200 hover:border-[#CC0000] hover:shadow-md'
                    }`}
                  >
                    <div className="text-4xl mb-3">🚗</div>
                    <div className="font-bold text-lg text-gray-900">Standard</div>
                    <div className="text-sm text-gray-600 mt-1">45-60 Minuten</div>
                  </button>

                  {/* Express Delivery */}
                  <button
                    onClick={() => setTimeOption('express')}
                    className={`p-6 rounded-xl border-2 transition-all duration-300 ${
                      timeOption === 'express'
                        ? 'border-[#CC0000] bg-red-50 shadow-lg'
                        : 'border-gray-200 hover:border-[#CC0000] hover:shadow-md'
                    }`}
                  >
                    <div className="text-4xl mb-3">⚡</div>
                    <div className="font-bold text-lg text-gray-900">Äußern</div>
                    <div className="text-sm text-gray-600 mt-1">30 Minuten</div>
                    <div className="text-xs text-[#CC0000] font-semibold mt-2">+{EXPRESS_DELIVERY_FEE.toFixed(2).replace('.', ',')} € fee</div>
                  </button>
                </div>
              ) : (
                <div className="space-y-4">
                  {/* Pickup - Immediate Only */}
                  <button
                    onClick={() => setTimeOption('immediate')}
                    className="w-full p-6 rounded-xl border-2 border-[#CC0000] bg-red-50 transition-all duration-300"
                  >
                    <div className="text-4xl mb-3">🛍️</div>
                    <div className="font-bold text-lg text-gray-900">Bereit zur Abholung</div>
                    <div className="text-sm text-gray-600 mt-1">Ungefähr 30 Minuten</div>
                  </button>
                </div>
              )}
            </div>
          )}

          {/* Step 3: Delivery Area */}
          {currentStep === 3 && (
            <div className="space-y-6">
              <h3 className="text-xl font-bold text-gray-900 mb-4">
                {deliveryType === 'delivery' ? 'Delivery Information' : 'Pickup Location'}
              </h3>

              {deliveryType === 'delivery' ? (
                <div className="p-6 bg-gray-50 rounded-xl">
                  <div className="flex items-start gap-4">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6 text-[#CC0000]">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 18.75a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 01-1.125-1.125V14.25m17.25 4.5a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h1.125c.621 0 1.129-.504 1.09-1.124a17.902 17.902 0 00-3.213-9.193 2.056 2.056 0 00-1.58-.86H14.25M16.5 18.75h-2.25m0-11.177v-.958c0-.568-.422-1.048-.987-1.106a48.554 48.554 0 00-10.026 0 1.106 1.106 0 00-.987 1.106v7.635m12-6.677v6.677m0 4.5v-4.5m0 0h-12" />
                    </svg>
                    <div>
                      <h4 className="font-bold text-gray-900 mb-2">Zustelldienst</h4>
                      <p className="text-gray-700 mb-2">Wir liefern an Ihren Standort!</p>
                      <p className="text-sm text-gray-600">
                        Im nächsten Schritt geben Sie Ihre vollständige Lieferadresse an.
                      </p>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="p-6 bg-gray-50 rounded-xl">
                  <div className="flex items-start gap-4">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6 text-[#CC0000]">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
                    </svg>
                    <div>
                      <h4 className="font-bold text-gray-900 mb-2">Abholadresse</h4>
                      <p className="text-gray-700">Dresdner Straße 220</p>
                      <p className="text-gray-700">Freital 01705</p>
                      <p className="text-sm text-gray-600 mt-2">
                        Ihre Bestellung ist in etwa 30 Minuten abholbereit.
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Step 4: Contact Details */}
          {currentStep === 4 && (
            <div className="space-y-6">
              <h3 className="text-xl font-bold text-gray-900 mb-4">Kontaktinformationen</h3>

              <div className="space-y-4">
                {/* Full Name */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Vollständiger Name *
                  </label>
                  <input
                    type="text"
                    value={fullName}
                    onChange={(e) => {
                      setFullName(e.target.value)
                      setContactErrors({ ...contactErrors, fullName: '' })
                    }}
                    placeholder="Enter your full name"
                    className={`w-full px-4 py-3 border-2 rounded-lg focus:outline-none transition-colors ${
                      contactErrors.fullName
                        ? 'border-red-500 focus:border-red-500'
                        : 'border-gray-300 focus:border-[#CC0000]'
                    }`}
                  />
                  {contactErrors.fullName && (
                    <p className="mt-1 text-sm text-red-600">{contactErrors.fullName}</p>
                  )}
                </div>

                {/* Email */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    E-Mail-Adresse *
                  </label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value)
                      setContactErrors({ ...contactErrors, email: '' })
                    }}
                    placeholder="your.email@example.com"
                    className={`w-full px-4 py-3 border-2 rounded-lg focus:outline-none transition-colors ${
                      contactErrors.email
                        ? 'border-red-500 focus:border-red-500'
                        : 'border-gray-300 focus:border-[#CC0000]'
                    }`}
                  />
                  {contactErrors.email && (
                    <p className="mt-1 text-sm text-red-600">{contactErrors.email}</p>
                  )}
                </div>

                {/* Phone */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Telefonnummer *
                  </label>
                  <input
                    type="tel"
                    value={phone}
                    onChange={(e) => {
                      setPhone(e.target.value)
                      setContactErrors({ ...contactErrors, phone: '' })
                    }}
                    placeholder="+49 123 456 7890"
                    className={`w-full px-4 py-3 border-2 rounded-lg focus:outline-none transition-colors ${
                      contactErrors.phone
                        ? 'border-red-500 focus:border-red-500'
                        : 'border-gray-300 focus:border-[#CC0000]'
                    }`}
                  />
                  {contactErrors.phone && (
                    <p className="mt-1 text-sm text-red-600">{contactErrors.phone}</p>
                  )}
                </div>

                {/* Delivery Address Fields (only for delivery) */}
                {deliveryType === 'delivery' && (
                  <>
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Straßenadresse *
                      </label>
                      <input
                        type="text"
                        value={streetAddress}
                        onChange={(e) => {
                          setStreetAddress(e.target.value)
                          setContactErrors({ ...contactErrors, streetAddress: '' })
                        }}
                        placeholder="Street name and number"
                        className={`w-full px-4 py-3 border-2 rounded-lg focus:outline-none transition-colors ${
                          contactErrors.streetAddress
                            ? 'border-red-500 focus:border-red-500'
                            : 'border-gray-300 focus:border-[#CC0000]'
                        }`}
                      />
                      {contactErrors.streetAddress && (
                        <p className="mt-1 text-sm text-red-600">{contactErrors.streetAddress}</p>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Stadt *
                      </label>
                      <input
                        type="text"
                        value={city}
                        onChange={(e) => {
                          setCity(e.target.value)
                          setContactErrors({ ...contactErrors, city: '' })
                        }}
                        placeholder="City name"
                        className={`w-full px-4 py-3 border-2 rounded-lg focus:outline-none transition-colors ${
                          contactErrors.city
                            ? 'border-red-500 focus:border-red-500'
                            : 'border-gray-300 focus:border-[#CC0000]'
                        }`}
                      />
                      {contactErrors.city && (
                        <p className="mt-1 text-sm text-red-600">{contactErrors.city}</p>
                      )}
                    </div>
                  </>
                )}
              </div>

              <div className="p-4 bg-blue-50 rounded-lg">
                <p className="text-sm text-blue-900">
                  <strong>Notiz:</strong> Wir verwenden diese Informationen, um Sie bezüglich Ihrer Bestellung und Lieferaktualisierungen zu kontaktieren.
                </p>
              </div>
            </div>
          )}

          {/* Step 5: Remarks */}
          {currentStep === 5 && (
            <div className="space-y-6">
              <h3 className="text-xl font-bold text-gray-900 mb-4">Besondere Anweisungen</h3>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Remarks (Optional)
                </label>
                <textarea
                  value={remarks}
                  onChange={(e) => setRemarks(e.target.value)}
                  placeholder="e.g., No onions, Extra spicy please, Please ring the bell"
                  rows={5}
                  className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-[#CC0000] focus:outline-none resize-none"
                />
                <p className="mt-2 text-sm text-gray-500">
                  Fügen Sie Ihrer Bestellung alle Sonderwünsche oder Anweisungen hinzu.
                </p>
              </div>

              {/* Order Summary */}
              <div className="p-4 bg-gray-50 rounded-xl">
                <h4 className="font-bold text-gray-900 mb-3">Bestellübersicht</h4>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Typ:</span>
                    <span className="font-semibold text-gray-900">
                      {deliveryType === 'delivery' ? '🚗 Delivery' : '🛍️ Pickup'}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Geschwindigkeit:</span>
                    <span className="font-semibold text-gray-900">
                      {timeOption === 'standard'
                        ? '🚗 Standard (45-60 min)'
                        : timeOption === 'express'
                        ? '⚡ Express (30 min)'
                        : '🛍️ Pickup (~30 min)'
                      }
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Kontakt:</span>
                    <span className="font-semibold text-gray-900">{fullName}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Telefon:</span>
                    <span className="font-semibold text-gray-900">{phone}</span>
                  </div>
                  {deliveryType === 'delivery' && (
                    <>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Adresse:</span>
                        <span className="font-semibold text-gray-900 text-right">
                          {streetAddress}, {city}
                        </span>
                      </div>
                    </>
                  )}
                  <div className="border-t pt-2 mt-2">
                    <div className="flex justify-between mb-1">
                      <span className="text-gray-600">Zwischensumme:</span>
                      <span className="font-semibold text-gray-900">{totalPrice} €</span>
                    </div>
                    {timeOption === 'express' && deliveryType === 'delivery' && (
                      <div className="flex justify-between mb-1">
                        <span className="text-gray-600">Express-Liefergebühr:</span>
                        <span className="font-semibold text-gray-900">+{EXPRESS_DELIVERY_FEE.toFixed(2).replace('.', ',')} €</span>
                      </div>
                    )}
                    <div className="flex justify-between pt-2 border-t">
                      <span className="text-gray-900 font-bold">Gesamt:</span>
                      <span className="font-bold text-[#CC0000] text-lg">{calculateTotalPrice()} €</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Step 6: Payment Method */}
          {currentStep === 6 && (
            <div className="space-y-6">
              <h3 className="text-xl font-bold text-gray-900 mb-4">Zahlungsmethode</h3>

              <div className="space-y-4">
                {/* Stripe Payment */}
                <button
                  onClick={() => setPaymentMethod('stripe')}
                  className={`w-full p-6 rounded-xl border-2 text-left transition-all duration-300 ${
                    paymentMethod === 'stripe'
                      ? 'border-[#CC0000] bg-red-50 shadow-lg'
                      : 'border-gray-200 hover:border-[#CC0000] hover:shadow-md'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className="text-4xl">💳</div>
                      <div>
                        <div className="font-bold text-lg text-gray-900">Kredit-/Debitkarte</div>
                        <div className="text-sm text-gray-600 mt-1">
                          Sicher bezahlen mit Stripe
                        </div>
                      </div>
                    </div>
                    <div className={`w-6 h-6 rounded-full border-2 ${
                      paymentMethod === 'stripe'
                        ? 'border-[#CC0000] bg-[#CC0000]'
                        : 'border-gray-300'
                    } flex items-center justify-center flex-shrink-0`}>
                      {paymentMethod === 'stripe' && (
                        <div className="w-3 h-3 bg-white rounded-full"></div>
                      )}
                    </div>
                  </div>
                </button>

                {/* Cash Payment */}
                <button
                  onClick={() => setPaymentMethod('cash')}
                  className={`w-full p-6 rounded-xl border-2 text-left transition-all duration-300 ${
                    paymentMethod === 'cash'
                      ? 'border-[#CC0000] bg-red-50 shadow-lg'
                      : 'border-gray-200 hover:border-[#CC0000] hover:shadow-md'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className="text-4xl">💶</div>
                      <div>
                        <div className="font-bold text-lg text-gray-900">Bargeld an {deliveryType === 'delivery' ? 'Delivery' : 'Pickup'}</div>
                        <div className="text-sm text-gray-600 mt-1">
                          Bezahlen Sie bar bei Erhalt Ihrer Bestellung.
                        </div>
                      </div>
                    </div>
                    <div className={`w-6 h-6 rounded-full border-2 ${
                      paymentMethod === 'cash'
                        ? 'border-[#CC0000] bg-[#CC0000]'
                        : 'border-gray-300'
                    } flex items-center justify-center flex-shrink-0`}>
                      {paymentMethod === 'cash' && (
                        <div className="w-3 h-3 bg-white rounded-full"></div>
                      )}
                    </div>
                  </div>
                </button>
              </div>

              {/* Security Note */}
              <div className="p-4 bg-green-50 rounded-lg">
                <div className="flex items-start gap-3">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
                  </svg>
                  <div>
                    <p className="text-sm text-green-900 font-semibold">Sichere Zahlung</p>
                    <p className="text-sm text-green-800">
                      {paymentMethod === 'stripe'
                        ? 'Your payment information is encrypted and secure with Stripe.'
                        : 'No payment required now. Pay when your order arrives.'}
                    </p>
                  </div>
                </div>
              </div>

              {/* Order Total */}
              <div className="p-4 bg-gray-50 rounded-xl">
                <div className="space-y-2">
                  <div className="flex justify-between items-center text-sm">
                    <span className="text-gray-600">Zwischensumme:</span>
                    <span className="font-semibold text-gray-900">{totalPrice} €</span>
                  </div>
                  {timeOption === 'express' && deliveryType === 'delivery' && (
                    <div className="flex justify-between items-center text-sm">
                      <span className="text-gray-600">Express-Liefergebühr:</span>
                      <span className="font-semibold text-gray-900">+{EXPRESS_DELIVERY_FEE.toFixed(2).replace('.', ',')} €</span>
                    </div>
                  )}
                  <div className="flex justify-between items-center pt-2 border-t">
                    <span className="text-lg font-bold text-gray-900">Bestellsumme:</span>
                    <span className="text-2xl font-bold text-[#CC0000]">{calculateTotalPrice()} €</span>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="sticky bottom-0 bg-white border-t-2 border-gray-100 p-6 rounded-b-2xl">
          <div className="flex gap-3">
            {currentStep > 1 && (
              <button
                onClick={handleBack}
                className="px-6 py-3 bg-white text-gray-700 font-bold rounded-lg border-2 border-gray-300 hover:bg-gray-50 transition-all duration-300"
              >
                Zurück
              </button>
            )}
            {currentStep < 6 ? (
              <button
                onClick={handleNext}
                className="flex-1 px-6 py-3 bg-[#CC0000] text-white font-bold rounded-lg hover:bg-[#990000] transition-all duration-300 shadow-md hover:shadow-lg"
              >
                Nächste
              </button>
            ) : (
              <button
                onClick={handleSubmit}
                disabled={isProcessingPayment}
                className="flex-1 px-6 py-3 bg-[#CC0000] text-white font-bold rounded-lg hover:bg-[#990000] transition-all duration-300 shadow-md hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {isProcessingPayment ? (
                  <>
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                    Verarbeitung...
                  </>
                ) : (
                  paymentMethod === 'stripe' ? 'Proceed to Payment' : 'Confirm Order'
                )}
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
