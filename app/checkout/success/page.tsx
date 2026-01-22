'use client'

import { useEffect, useState, Suspense } from 'react'
import { useSearchParams } from 'next/navigation'
import Link from 'next/link'
import { useCart } from '@/app/context/CartContext'

function CheckoutSuccessContent() {
  const searchParams = useSearchParams()
  const sessionId = searchParams.get('session_id')
  const { clearCart } = useCart()

  const [verificationStatus, setVerificationStatus] = useState<'loading' | 'success' | 'failed'>('loading')
  const [orderDetails, setOrderDetails] = useState<any>(null)
  const [orderNumber, setOrderNumber] = useState<string>('')

  useEffect(() => {
    if (!sessionId) {
      setVerificationStatus('failed')
      return
    }

    // Verify the session server-side
    const verifyPayment = async () => {
      try {
        const response = await fetch('/api/verify-session', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ sessionId }),
        })

        const data = await response.json()

        if (data.verified && data.paymentStatus === 'paid') {
          setVerificationStatus('success')
          setOrderDetails(data)

          // Save the order to database
          try {
            const orderResponse = await fetch('/api/orders', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({
                orderData: data.orderData,
                totalPrice: data.orderData.totalPrice || ((data.amountTotal / 100).toFixed(2).replace('.', ',')),
                cartItems: data.cartItems || [],
                paymentStatus: 'paid',
                stripeSessionId: sessionId,
              }),
            })

            const orderResult = await orderResponse.json()

            if (orderResult.success) {
              setOrderNumber(orderResult.orderNumber)

              // Clear cart using CartContext
              clearCart()

              console.log('Order saved successfully:', orderResult.orderNumber)
            } else {
              console.error('Failed to save order:', orderResult.error)
            }
          } catch (orderError) {
            console.error('Error saving order:', orderError)
          }
        } else {
          setVerificationStatus('failed')
        }
      } catch (error) {
        console.error('Verification error:', error)
        setVerificationStatus('failed')
      }
    }

    verifyPayment()
  }, [sessionId])

  if (verificationStatus === 'loading') {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl shadow-xl p-8 max-w-md w-full text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-[#CC0000] mx-auto mb-4"></div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Verifying Payment...</h2>
          <p className="text-gray-600">Please wait while we confirm your order.</p>
        </div>
      </div>
    )
  }

  if (verificationStatus === 'failed') {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl shadow-xl p-8 max-w-md w-full text-center">
          <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-8 h-8 text-red-600">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Payment Verification Failed</h2>
          <p className="text-gray-600 mb-6">We couldn't verify your payment. Please contact support if you were charged.</p>
          <Link href="/cart" className="inline-block px-6 py-3 bg-[#CC0000] text-white font-bold rounded-lg hover:bg-[#990000] transition-all duration-300">
            Back to Cart
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-xl p-8 max-w-2xl w-full">
        {/* Success Icon */}
        <div className="text-center mb-6">
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-10 h-10 text-green-600">
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Order Confirmed!</h1>
          <p className="text-gray-600">Thank you for your order. We've received your payment.</p>
          {orderNumber && (
            <div className="mt-4 inline-block bg-[#CC0000] text-white px-4 py-2 rounded-lg">
              <p className="text-sm font-semibold">Order Number: {orderNumber}</p>
            </div>
          )}
        </div>

        {/* Order Details */}
        {orderDetails && orderDetails.orderData && (
          <div className="bg-gray-50 rounded-xl p-6 mb-6">
            <h3 className="font-bold text-gray-900 mb-4">Order Details</h3>
            <div className="space-y-3 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-600">Order Type:</span>
                <span className="font-semibold text-gray-900">
                  {orderDetails.orderData.deliveryType === 'delivery' ? '🚗 Delivery' : '🛍️ Pickup'}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Estimated Time:</span>
                <span className="font-semibold text-gray-900">
                  {orderDetails.orderData.timeOption === 'standard'
                    ? '45-60 minutes'
                    : orderDetails.orderData.timeOption === 'express'
                    ? '30 minutes (Express ⚡)'
                    : '~30 minutes'
                  }
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Contact:</span>
                <span className="font-semibold text-gray-900">{orderDetails.orderData.fullName}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Email:</span>
                <span className="font-semibold text-gray-900">{orderDetails.customerEmail || orderDetails.orderData.email}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Phone:</span>
                <span className="font-semibold text-gray-900">{orderDetails.orderData.phone}</span>
              </div>
              {orderDetails.orderData.deliveryType === 'delivery' && (
                <div className="flex justify-between">
                  <span className="text-gray-600">Delivery Address:</span>
                  <span className="font-semibold text-gray-900 text-right">
                    {orderDetails.orderData.streetAddress}, {orderDetails.orderData.postalCode} {orderDetails.orderData.city}
                  </span>
                </div>
              )}
              {orderDetails.orderData.remarks && (
                <div className="flex justify-between">
                  <span className="text-gray-600">Special Instructions:</span>
                  <span className="font-semibold text-gray-900 text-right">{orderDetails.orderData.remarks}</span>
                </div>
              )}
              <div className="border-t pt-3 mt-3 flex justify-between">
                <span className="text-gray-900 font-bold text-lg">Total Paid:</span>
                <span className="font-bold text-[#CC0000] text-lg">
                  €{(orderDetails.amountTotal / 100).toFixed(2)}
                </span>
              </div>
            </div>
          </div>
        )}

        {/* Contact Information */}
        <div className="bg-blue-50 border-2 border-blue-200 rounded-xl p-4 mb-6 text-center">
          <p className="text-sm text-gray-800 mb-2">For any issues regarding your order, please contact:</p>
          <a href="tel:+493012345678" className="text-xl font-bold text-blue-600 hover:text-blue-800 transition-colors">
            +49 30 123 456 789
          </a>
        </div>

        {/* Action Button */}
        <div>
          <Link href="/" className="block w-full px-6 py-3 bg-[#CC0000] text-white font-bold rounded-lg hover:bg-[#990000] transition-all duration-300 text-center shadow-md hover:shadow-lg">
            Back to Home
          </Link>
        </div>
      </div>
    </div>
  )
}

export default function CheckoutSuccess() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl shadow-xl p-8 max-w-md w-full text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-[#CC0000] mx-auto mb-4"></div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Loading...</h2>
          <p className="text-gray-600">Please wait</p>
        </div>
      </div>
    }>
      <CheckoutSuccessContent />
    </Suspense>
  )
}
