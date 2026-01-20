'use client'

import { useEffect, useState, useRef } from 'react'
import Link from 'next/link'

interface OrderItem {
  name: string
  price: string
  quantity: number
  description?: string
  image?: string
}

interface Order {
  _id: string
  orderNumber: string
  status: string
  fullName: string
  email: string
  phone: string
  deliveryType: 'delivery' | 'pickup'
  streetAddress?: string
  city?: string
  postalCode?: string
  timeOption: 'standard' | 'express' | 'immediate'
  scheduledTime?: string
  remarks?: string
  paymentMethod: 'stripe' | 'cash'
  paymentStatus: string
  totalAmount: number
  currency: string
  items: OrderItem[]
  createdAt: string
  updatedAt: string
}

export default function AdminDashboard() {
  const [orders, setOrders] = useState<Order[]>([])
  const [loading, setLoading] = useState(true)
  const previousOrderCountRef = useRef<number | null>(null)

  // Confirmation modal state
  const [showConfirmModal, setShowConfirmModal] = useState(false)
  const [orderToComplete, setOrderToComplete] = useState<{ id: string, number: string } | null>(null)

  // Play notification sound using Web Audio API - 6 beeps
  const playNotificationSound = async () => {
    console.log('🔔 playNotificationSound called!')

    try {
      // Create audio context
      const AudioContext = window.AudioContext || (window as any).webkitAudioContext
      if (!AudioContext) {
        console.error('Web Audio API not supported')
        return
      }

      const audioContext = new AudioContext()
      console.log('Audio context created, state:', audioContext.state)

      // Resume context if suspended (browser autoplay policy)
      if (audioContext.state === 'suspended') {
        console.log('Audio context is suspended, resuming...')
        await audioContext.resume()
        console.log('Audio context resumed, new state:', audioContext.state)
      }

      // Play 6 beeps with alternating frequencies
      const beeps = [
        { delay: 0, freq: 880 },      // A5
        { delay: 150, freq: 880 },    // A5
        { delay: 300, freq: 1046 },   // C6
        { delay: 450, freq: 1046 },   // C6
        { delay: 600, freq: 1174 },   // D6
        { delay: 750, freq: 1174 },   // D6
      ]

      beeps.forEach(({ delay, freq }, index) => {
        setTimeout(() => {
          console.log(`Playing beep ${index + 1} at ${freq}Hz`)

          const oscillator = audioContext.createOscillator()
          const gainNode = audioContext.createGain()

          oscillator.connect(gainNode)
          gainNode.connect(audioContext.destination)

          oscillator.frequency.value = freq
          oscillator.type = 'square' // More noticeable than sine

          // Volume envelope for sharp attack
          const now = audioContext.currentTime
          gainNode.gain.setValueAtTime(0.6, now)
          gainNode.gain.exponentialRampToValueAtTime(0.01, now + 0.15)

          oscillator.start(now)
          oscillator.stop(now + 0.15)
        }, delay)
      })

      console.log('All beeps scheduled!')
    } catch (error) {
      console.error('Error playing notification sound:', error)
    }
  }

  // Fetch orders
  const fetchOrders = async () => {
    try {
      const response = await fetch('/api/orders')
      const data = await response.json()

      if (data.success) {
        const activeOrders = data.orders.filter((order: Order) =>
          order.status !== 'completed' && order.status !== 'cancelled'
        )

        console.log('Fetched orders:', {
          total: data.orders.length,
          active: activeOrders.length,
          previous: previousOrderCountRef.current,
        })

        // Check if there are new orders (only trigger if we had a previous count and it increased)
        const hasNewOrders = previousOrderCountRef.current !== null && activeOrders.length > previousOrderCountRef.current

        if (hasNewOrders) {
          console.log('🚨 NEW ORDER DETECTED! Playing sound...')
          console.log('Active orders:', activeOrders.length, 'Previous:', previousOrderCountRef.current)

          // Play notification sound
          playNotificationSound()

          // Show browser notification if permitted
          if ('Notification' in window && Notification.permission === 'granted') {
            new Notification('🔔 New Order Received!', {
              body: `Order ${activeOrders[0].orderNumber} has been placed`,
              icon: '/favicon.ico',
            })
          }
        }

        // Sort orders: Express orders first, then by creation time (newest first)
        const sortedOrders = activeOrders.sort((a: Order, b: Order) => {
          // Express orders always come first
          if (a.timeOption === 'express' && b.timeOption !== 'express') return -1
          if (a.timeOption !== 'express' && b.timeOption === 'express') return 1

          // If both are express or both are not express, sort by creation time (newest first)
          return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        })

        // Update previous count and orders
        previousOrderCountRef.current = activeOrders.length
        setOrders(sortedOrders)
      }
    } catch (error) {
      console.error('Error fetching orders:', error)
    } finally {
      setLoading(false)
    }
  }

  // Request notification permission
  useEffect(() => {
    if ('Notification' in window && Notification.permission === 'default') {
      Notification.requestPermission()
    }
  }, [])

  // Fetch orders on mount and set up polling
  useEffect(() => {
    fetchOrders()

    // Poll every 5 seconds for new orders
    const interval = setInterval(fetchOrders, 5000)

    return () => clearInterval(interval)
  }, [])

  // Show confirmation modal
  const showCompleteOrderModal = (orderId: string, orderNumber: string) => {
    setOrderToComplete({ id: orderId, number: orderNumber })
    setShowConfirmModal(true)
  }

  // Mark order as completed (delete from database)
  const completeOrder = async () => {
    if (!orderToComplete) return

    try {
      const response = await fetch(`/api/orders/${orderToComplete.id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
      })

      const data = await response.json()

      if (data.success) {
        // Remove order from list and update ref
        setOrders(orders.filter(order => order._id !== orderToComplete.id))
        previousOrderCountRef.current = (previousOrderCountRef.current || 1) - 1
        setShowConfirmModal(false)
        setOrderToComplete(null)
      } else {
        alert('Failed to delete order')
      }
    } catch (error) {
      console.error('Error deleting order:', error)
      alert('Error deleting order')
    }
  }

  // Update order status
  const updateOrderStatus = async (orderId: string, newStatus: string) => {
    try {
      const response = await fetch(`/api/orders/${orderId}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ status: newStatus }),
      })

      const data = await response.json()

      if (data.success) {
        // Update order in list
        setOrders(orders.map(order =>
          order._id === orderId ? { ...order, status: newStatus } : order
        ))
      } else {
        alert('Failed to update order status')
      }
    } catch (error) {
      console.error('Error updating order status:', error)
      alert('Error updating order status')
    }
  }

  const getStatusColor = (status: string) => {
    const colors: { [key: string]: string } = {
      pending: 'bg-yellow-100 text-yellow-800 border-yellow-300',
      confirmed: 'bg-blue-100 text-blue-800 border-blue-300',
      preparing: 'bg-purple-100 text-purple-800 border-purple-300',
      ready: 'bg-green-100 text-green-800 border-green-300',
      'out-for-delivery': 'bg-orange-100 text-orange-800 border-orange-300',
      completed: 'bg-gray-100 text-gray-800 border-gray-300',
      cancelled: 'bg-red-100 text-red-800 border-red-300',
    }
    return colors[status] || 'bg-gray-100 text-gray-800 border-gray-300'
  }

  const getPaymentStatusColor = (status: string) => {
    return status === 'paid'
      ? 'bg-green-100 text-green-800'
      : status === 'pending'
      ? 'bg-yellow-100 text-yellow-800'
      : 'bg-red-100 text-red-800'
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-[#CC0000] mx-auto mb-4"></div>
          <p className="text-gray-600">Loading orders...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl md:text-3xl font-bold text-gray-900">Admin Dashboard</h1>
              <p className="text-sm text-gray-600 mt-1">Manage your orders in real-time</p>
            </div>
            <Link
              href="/"
              className="px-4 py-2 bg-[#CC0000] text-white font-bold rounded-lg hover:bg-[#990000] transition-all duration-300"
            >
              Back to Home
            </Link>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Active Orders</p>
                <p className="text-3xl font-bold text-gray-900 mt-1">{orders.length}</p>
              </div>
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6 text-blue-600">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h3.75M9 15h3.75M9 18h3.75m3 .75H18a2.25 2.25 0 002.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 00-1.123-.08m-5.801 0c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 00.75-.75 2.25 2.25 0 00-.1-.664m-5.8 0A2.251 2.251 0 0113.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m0 0H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V9.375c0-.621-.504-1.125-1.125-1.125H8.25zM6.75 12h.008v.008H6.75V12zm0 3h.008v.008H6.75V15zm0 3h.008v.008H6.75V18z" />
                </svg>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Pending Payment</p>
                <p className="text-3xl font-bold text-gray-900 mt-1">
                  {orders.filter(o => o.paymentStatus === 'pending').length}
                </p>
              </div>
              <div className="w-12 h-12 bg-yellow-100 rounded-full flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6 text-yellow-600">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Delivery Orders</p>
                <p className="text-3xl font-bold text-gray-900 mt-1">
                  {orders.filter(o => o.deliveryType === 'delivery').length}
                </p>
              </div>
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6 text-green-600">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 18.75a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 01-1.125-1.125V14.25m17.25 4.5a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h1.125c.621 0 1.129-.504 1.09-1.124a17.902 17.902 0 00-3.213-9.193 2.056 2.056 0 00-1.58-.86H14.25M16.5 18.75h-2.25m0-11.177v-.958c0-.568-.422-1.048-.987-1.106a48.554 48.554 0 00-10.026 0 1.106 1.106 0 00-.987 1.106v7.635m12-6.677v6.677m0 4.5v-4.5m0 0h-12" />
                </svg>
              </div>
            </div>
          </div>
        </div>

        {/* Orders List */}
        <div className="space-y-6">
          {orders.length === 0 ? (
            <div className="bg-white rounded-lg shadow-md p-12 text-center">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-16 h-16 mx-auto text-gray-400 mb-4">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h3.75M9 15h3.75M9 18h3.75m3 .75H18a2.25 2.25 0 002.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 00-1.123-.08m-5.801 0c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 00.75-.75 2.25 2.25 0 00-.1-.664m-5.8 0A2.251 2.251 0 0113.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m0 0H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V9.375c0-.621-.504-1.125-1.125-1.125H8.25zM6.75 12h.008v.008H6.75V12zm0 3h.008v.008H6.75V15zm0 3h.008v.008H6.75V18z" />
              </svg>
              <h3 className="text-xl font-bold text-gray-900 mb-2">No Active Orders</h3>
              <p className="text-gray-600">All orders have been completed. New orders will appear here automatically.</p>
            </div>
          ) : (
            orders.map((order) => (
              <div
                key={order._id}
                className={`rounded-lg shadow-md p-6 border-2 transition-all duration-300 ${
                  order.timeOption === 'express'
                    ? 'bg-gradient-to-br from-orange-50 to-yellow-50 border-orange-400 hover:border-orange-600 shadow-lg ring-2 ring-orange-300'
                    : 'bg-white border-transparent hover:border-[#CC0000]'
                }`}
              >
                {/* Express Priority Badge */}
                {order.timeOption === 'express' && (
                  <div className="mb-4 flex items-center gap-2 bg-gradient-to-r from-orange-500 to-red-500 text-white px-4 py-2 rounded-lg font-bold shadow-md animate-pulse">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-5 h-5">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z" />
                    </svg>
                    <span>EXPRESS DELIVERY - PRIORITY ORDER</span>
                  </div>
                )}

                {/* Order Header */}
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="text-xl font-bold text-gray-900">{order.orderNumber}</h3>
                      <span className={`px-3 py-1 rounded-full text-xs font-semibold border ${getStatusColor(order.status)}`}>
                        {order.status.toUpperCase()}
                      </span>
                      <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getPaymentStatusColor(order.paymentStatus)}`}>
                        {order.paymentStatus === 'paid' ? '💳 PAID' : '💰 CASH'}
                      </span>
                    </div>
                    <p className="text-sm text-gray-600">
                      {new Date(order.createdAt).toLocaleString('en-US', {
                        month: 'short',
                        day: 'numeric',
                        year: 'numeric',
                        hour: '2-digit',
                        minute: '2-digit',
                      })}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className={`text-2xl font-bold ${
                      order.timeOption === 'express' ? 'text-orange-600' : 'text-[#CC0000]'
                    }`}>
                      €{order.totalAmount.toFixed(2)}
                    </p>
                    <p className="text-sm text-gray-600">{order.paymentMethod.toUpperCase()}</p>
                  </div>
                </div>

                {/* Customer & Delivery Info */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4 pb-4 border-b">
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2">Customer Information</h4>
                    <div className="space-y-1 text-sm">
                      <p className="text-gray-700"><span className="font-medium">Name:</span> {order.fullName}</p>
                      <p className="text-gray-700"><span className="font-medium">Email:</span> {order.email}</p>
                      <p className="text-gray-700"><span className="font-medium">Phone:</span> {order.phone}</p>
                    </div>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2">
                      {order.deliveryType === 'delivery' ? '🚗 Delivery Details' : '🛍️ Pickup Details'}
                    </h4>
                    <div className="space-y-1 text-sm">
                      {order.deliveryType === 'delivery' ? (
                        <>
                          <p className="text-gray-700"><span className="font-medium">Address:</span> {order.streetAddress}</p>
                          <p className="text-gray-700"><span className="font-medium">City:</span> {order.city} {order.postalCode}</p>
                        </>
                      ) : (
                        <p className="text-gray-700">Customer will pick up the order</p>
                      )}
                      <p className="text-gray-700">
                        <span className="font-medium">Delivery Speed:</span>{' '}
                        {order.timeOption === 'standard'
                          ? '🚗 Standard (45-60 min)'
                          : order.timeOption === 'express'
                          ? '⚡ Express (30 min)'
                          : '🛍️ Ready for Pickup (30 min)'
                        }
                      </p>
                      {order.remarks && (
                        <p className="text-gray-700 mt-2">
                          <span className="font-medium">Special Instructions:</span><br />
                          <span className="italic">"{order.remarks}"</span>
                        </p>
                      )}
                    </div>
                  </div>
                </div>

                {/* Order Items */}
                <div className="mb-4">
                  <h4 className="font-semibold text-gray-900 mb-2">Order Items</h4>
                  <div className="space-y-2">
                    {order.items.map((item, index) => (
                      <div key={index} className="flex justify-between items-center bg-gray-50 rounded p-3">
                        <div>
                          <p className="font-medium text-gray-900">{item.name}</p>
                          {item.description && (
                            <p className="text-xs text-gray-600">{item.description}</p>
                          )}
                        </div>
                        <div className="text-right">
                          <p className="font-medium text-gray-900">x{item.quantity}</p>
                          <p className="text-sm text-gray-600">{item.price}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Actions */}
                <div className="flex flex-wrap gap-2">
                  <select
                    value={order.status}
                    onChange={(e) => updateOrderStatus(order._id, e.target.value)}
                    className="px-4 py-2 border-2 border-gray-300 rounded-lg font-semibold text-sm hover:border-[#CC0000] transition-colors focus:outline-none focus:border-[#CC0000]"
                  >
                    <option value="pending">Pending</option>
                    <option value="confirmed">Confirmed</option>
                    <option value="preparing">Preparing</option>
                    <option value="ready">Ready</option>
                    <option value="out-for-delivery">Out for Delivery</option>
                  </select>

                  <button
                    onClick={() => showCompleteOrderModal(order._id, order.orderNumber)}
                    className="px-6 py-2 bg-green-600 text-white font-bold rounded-lg hover:bg-green-700 transition-all duration-300 shadow-md hover:shadow-lg"
                  >
                    ✓ Mark as Completed
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </main>

      {/* Confirmation Modal */}
      {showConfirmModal && orderToComplete && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
          <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-8">
            {/* Warning Icon */}
            <div className="mb-6 flex justify-center">
              <div className="w-20 h-20 bg-yellow-100 rounded-full flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-12 h-12 text-yellow-600">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" />
                </svg>
              </div>
            </div>

            {/* Modal Content */}
            <h2 className="text-2xl font-bold text-gray-900 mb-3 text-center">Complete Order?</h2>
            <p className="text-gray-700 mb-2 text-center">
              Are you sure you want to mark order <span className="font-bold text-[#CC0000]">{orderToComplete.number}</span> as completed?
            </p>
            <p className="text-sm text-yellow-700 bg-yellow-50 border border-yellow-200 rounded-lg p-3 mb-6 text-center">
              ⚠️ This will permanently delete the order from the database.
            </p>

            {/* Action Buttons */}
            <div className="flex gap-3">
              <button
                onClick={() => {
                  setShowConfirmModal(false)
                  setOrderToComplete(null)
                }}
                className="flex-1 px-6 py-3 bg-gray-200 text-gray-700 font-bold rounded-lg hover:bg-gray-300 transition-all duration-300"
              >
                Cancel
              </button>
              <button
                onClick={completeOrder}
                className="flex-1 px-6 py-3 bg-green-600 text-white font-bold rounded-lg hover:bg-green-700 transition-all duration-300 shadow-md hover:shadow-lg"
              >
                ✓ Complete Order
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
