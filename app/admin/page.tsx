'use client'

import { useEffect, useState, useRef } from 'react'
import Link from 'next/link'
import MenuItemsManager from '../components/MenuItemsManager'

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

interface Reservation {
  _id: string
  reservationNumber: string
  status: string
  name: string
  email: string
  phone: string
  date: string
  time: string
  guests: number
  createdAt: string
  updatedAt: string
}

export default function AdminDashboard() {
  // Authentication state
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [password, setPassword] = useState('')
  const [authError, setAuthError] = useState('')
  const [authLoading, setAuthLoading] = useState(false)

  const [activeTab, setActiveTab] = useState<'orders' | 'reservations' | 'menu'>('orders')
  const [orders, setOrders] = useState<Order[]>([])
  const [reservations, setReservations] = useState<Reservation[]>([])
  const [loading, setLoading] = useState(true)
  const previousOrderCountRef = useRef<number | null>(null)
  const previousReservationCountRef = useRef<number | null>(null)

  // Confirmation modal state
  const [showConfirmModal, setShowConfirmModal] = useState(false)
  const [itemToComplete, setItemToComplete] = useState<{ id: string, number: string, type: 'order' | 'reservation' } | null>(null)

  // Handle password verification
  const handlePasswordSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setAuthError('')
    setAuthLoading(true)

    try {
      const response = await fetch('/api/verify-admin', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ password }),
      })

      if (response.ok) {
        setIsAuthenticated(true)
        setPassword('')
      } else {
        const data = await response.json()
        setAuthError(data.error || 'Invalid password')
      }
    } catch (error) {
      console.error('Error verifying password:', error)
      setAuthError('Failed to verify password')
    } finally {
      setAuthLoading(false)
    }
  }

  // Play ORDER notification sound - 6 beeps (original)
  const playOrderNotificationSound = async () => {
    console.log('🔔 playOrderNotificationSound called!')

    try {
      const AudioContext = window.AudioContext || (window as any).webkitAudioContext
      if (!AudioContext) {
        console.error('Web Audio API not supported')
        return
      }

      const audioContext = new AudioContext()
      console.log('Audio context created, state:', audioContext.state)

      if (audioContext.state === 'suspended') {
        console.log('Audio context is suspended, resuming...')
        await audioContext.resume()
        console.log('Audio context resumed, new state:', audioContext.state)
      }

      // Play 6 beeps with alternating frequencies for ORDERS
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
          console.log(`Playing order beep ${index + 1} at ${freq}Hz`)

          const oscillator = audioContext.createOscillator()
          const gainNode = audioContext.createGain()

          oscillator.connect(gainNode)
          gainNode.connect(audioContext.destination)

          oscillator.frequency.value = freq
          oscillator.type = 'square'

          const now = audioContext.currentTime
          gainNode.gain.setValueAtTime(0.6, now)
          gainNode.gain.exponentialRampToValueAtTime(0.01, now + 0.15)

          oscillator.start(now)
          oscillator.stop(now + 0.15)
        }, delay)
      })

      console.log('All order beeps scheduled!')
    } catch (error) {
      console.error('Error playing order notification sound:', error)
    }
  }

  // Play RESERVATION notification sound - 3 longer chimes (different pattern)
  const playReservationNotificationSound = async () => {
    console.log('🔔 playReservationNotificationSound called!')

    try {
      const AudioContext = window.AudioContext || (window as any).webkitAudioContext
      if (!AudioContext) {
        console.error('Web Audio API not supported')
        return
      }

      const audioContext = new AudioContext()
      console.log('Audio context created, state:', audioContext.state)

      if (audioContext.state === 'suspended') {
        console.log('Audio context is suspended, resuming...')
        await audioContext.resume()
        console.log('Audio context resumed, new state:', audioContext.state)
      }

      // Play 3 ascending chimes for RESERVATIONS (different from orders)
      const chimes = [
        { delay: 0, freq: 523 },      // C5
        { delay: 400, freq: 659 },    // E5
        { delay: 800, freq: 784 },    // G5
      ]

      chimes.forEach(({ delay, freq }, index) => {
        setTimeout(() => {
          console.log(`Playing reservation chime ${index + 1} at ${freq}Hz`)

          const oscillator = audioContext.createOscillator()
          const gainNode = audioContext.createGain()

          oscillator.connect(gainNode)
          gainNode.connect(audioContext.destination)

          oscillator.frequency.value = freq
          oscillator.type = 'sine' // Smoother sound for reservations

          const now = audioContext.currentTime
          gainNode.gain.setValueAtTime(0.5, now)
          gainNode.gain.exponentialRampToValueAtTime(0.01, now + 0.35)

          oscillator.start(now)
          oscillator.stop(now + 0.35)
        }, delay)
      })

      console.log('All reservation chimes scheduled!')
    } catch (error) {
      console.error('Error playing reservation notification sound:', error)
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

        const hasNewOrders = previousOrderCountRef.current !== null && activeOrders.length > previousOrderCountRef.current

        if (hasNewOrders) {
          console.log('🚨 NEW ORDER DETECTED! Playing sound...')
          playOrderNotificationSound()

          if ('Notification' in window && Notification.permission === 'granted') {
            new Notification('🔔 Neue Bestellung erhalten!', {
              body: `Befehl ${activeOrders[0].orderNumber} wurde platziert`,
              icon: '/favicon.ico',
            })
          }
        }

        const sortedOrders = activeOrders.sort((a: Order, b: Order) => {
          if (a.timeOption === 'express' && b.timeOption !== 'express') return -1
          if (a.timeOption !== 'express' && b.timeOption === 'express') return 1
          return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        })

        previousOrderCountRef.current = activeOrders.length
        setOrders(sortedOrders)
      }
    } catch (error) {
      console.error('Error fetching orders:', error)
    } finally {
      setLoading(false)
    }
  }

  // Fetch reservations
  const fetchReservations = async () => {
    try {
      const response = await fetch('/api/reservations')
      const data = await response.json()

      if (data.success) {
        const activeReservations = data.reservations.filter((reservation: Reservation) =>
          reservation.status !== 'completed' && reservation.status !== 'cancelled'
        )

        console.log('Fetched reservations:', {
          total: data.reservations.length,
          active: activeReservations.length,
          previous: previousReservationCountRef.current,
        })

        const hasNewReservations = previousReservationCountRef.current !== null && activeReservations.length > previousReservationCountRef.current

        if (hasNewReservations) {
          console.log('🚨 NEW RESERVATION DETECTED! Playing sound...')
          playReservationNotificationSound()

          if ('Notification' in window && Notification.permission === 'granted') {
            new Notification('📅 Neue Reservierung erhalten!', {
              body: `Reservierung ${activeReservations[0].reservationNumber} wurde gemacht`,
              icon: '/favicon.ico',
            })
          }
        }

        const sortedReservations = activeReservations.sort((a: Reservation, b: Reservation) => {
          return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        })

        previousReservationCountRef.current = activeReservations.length
        setReservations(sortedReservations)
      }
    } catch (error) {
      console.error('Error fetching reservations:', error)
    }
  }

  // Request notification permission
  useEffect(() => {
    if ('Notification' in window && Notification.permission === 'default') {
      Notification.requestPermission()
    }
  }, [])

  // Fetch data on mount and set up polling
  useEffect(() => {
    fetchOrders()
    fetchReservations()

    const interval = setInterval(() => {
      fetchOrders()
      fetchReservations()
    }, 5000)

    return () => clearInterval(interval)
  }, [])

  // Show confirmation modal
  const showCompleteModal = (id: string, number: string, type: 'order' | 'reservation') => {
    setItemToComplete({ id, number, type })
    setShowConfirmModal(true)
  }

  // Mark item as completed (delete from database)
  const completeItem = async () => {
    if (!itemToComplete) return

    try {
      const endpoint = itemToComplete.type === 'order'
        ? `/api/orders/${itemToComplete.id}`
        : `/api/reservations/${itemToComplete.id}`

      const response = await fetch(endpoint, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
      })

      const data = await response.json()

      if (data.success) {
        if (itemToComplete.type === 'order') {
          setOrders(orders.filter(order => order._id !== itemToComplete.id))
          previousOrderCountRef.current = (previousOrderCountRef.current || 1) - 1
        } else {
          setReservations(reservations.filter(reservation => reservation._id !== itemToComplete.id))
          previousReservationCountRef.current = (previousReservationCountRef.current || 1) - 1
        }
        setShowConfirmModal(false)
        setItemToComplete(null)
      } else {
        alert(`Löschen fehlgeschlagen ${itemToComplete.type}`)
      }
    } catch (error) {
      console.error(`Error deleting ${itemToComplete?.type}:`, error)
      alert(`Fehler beim Löschen ${itemToComplete?.type}`)
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
        setOrders(orders.map(order =>
          order._id === orderId ? { ...order, status: newStatus } : order
        ))
      } else {
        alert('Aktualisierung des Bestellstatus fehlgeschlagen')
      }
    } catch (error) {
      console.error('Error updating order status:', error)
      alert('Fehler beim Aktualisieren des Bestellstatus')
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
          <p className="text-gray-600">Loading dashboard...</p>
        </div>
      </div>
    )
  }

  // Show password prompt if not authenticated
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
        <div className="max-w-md w-full bg-white rounded-lg shadow-lg p-8">
          <div className="text-center mb-6">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Admin-Zugriff</h1>
            <p className="text-gray-600">Bitte geben Sie das Administratorpasswort ein, um fortzufahren.</p>
          </div>

          <form onSubmit={handlePasswordSubmit}>
            <div className="mb-4">
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
                Password
              </label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value)
                  setAuthError('')
                }}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#CC0000] focus:border-transparent"
                placeholder="Enter admin password"
                required
                autoFocus
              />
              {authError && (
                <p className="mt-2 text-sm text-red-600">{authError}</p>
              )}
            </div>

            <button
              type="submit"
              disabled={authLoading}
              className="w-full px-4 py-3 bg-[#CC0000] text-white font-bold rounded-lg hover:bg-[#990000] transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {authLoading ? 'Verifying...' : 'Access Dashboard'}
            </button>
          </form>

          <div className="mt-6 text-center">
            <Link
              href="/"
              className="text-sm text-gray-600 hover:text-[#CC0000] transition-colors"
            >
              Zurück nach Hause
            </Link>
          </div>
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
              <h1 className="text-2xl md:text-3xl font-bold text-gray-900">Admin-Dashboard</h1>
              <p className="text-sm text-gray-600 mt-1">Bestellungen und Reservierungen in Echtzeit verwalten</p>
            </div>
            <Link
              href="/"
              className="px-4 py-2 bg-[#CC0000] text-white font-bold rounded-lg hover:bg-[#990000] transition-all duration-300"
            >
              Zurück nach Hause
            </Link>
          </div>
        </div>

        {/* Tabs */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex gap-4 border-b">
            <button
              onClick={() => setActiveTab('orders')}
              className={`px-6 py-3 font-bold transition-all duration-300 border-b-4 ${
                activeTab === 'orders'
                  ? 'border-[#CC0000] text-[#CC0000]'
                  : 'border-transparent text-gray-500 hover:text-gray-700'
              }`}
            >
              Bestellungen ({orders.length})
            </button>
            <button
              onClick={() => setActiveTab('reservations')}
              className={`px-6 py-3 font-bold transition-all duration-300 border-b-4 ${
                activeTab === 'reservations'
                  ? 'border-[#CC0000] text-[#CC0000]'
                  : 'border-transparent text-gray-500 hover:text-gray-700'
              }`}
            >
              Reservierungen ({reservations.length})
            </button>
            <button
              onClick={() => setActiveTab('menu')}
              className={`px-6 py-3 font-bold transition-all duration-300 border-b-4 ${
                activeTab === 'menu'
                  ? 'border-[#CC0000] text-[#CC0000]'
                  : 'border-transparent text-gray-500 hover:text-gray-700'
              }`}
            >
              Menüpunkte
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Orders Tab */}
        {activeTab === 'orders' && (
          <>
            {/* Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <div className="bg-white rounded-lg shadow-md p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">Aktive Bestellungen</p>
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
                    <p className="text-sm text-gray-600">Ausstehende Zahlung</p>
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
                    <p className="text-sm text-gray-600">Lieferaufträge</p>
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
                  <h3 className="text-xl font-bold text-gray-900 mb-2">Keine aktiven Bestellungen</h3>
                  <p className="text-gray-600">Alle Bestellungen sind abgeschlossen. Neue Bestellungen werden hier automatisch angezeigt.</p>
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
                    {order.timeOption === 'express' && (
                      <div className="mb-4 flex items-center gap-2 bg-gradient-to-r from-orange-500 to-red-500 text-white px-4 py-2 rounded-lg font-bold shadow-md animate-pulse">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-5 h-5">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z" />
                        </svg>
                        <span>EXPRESSLIEFERUNG - PRIORITÄTSBESTELLUNG</span>
                      </div>
                    )}

                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <div className="flex items-center gap-3 mb-2">
                          <h3 className="text-xl font-bold text-gray-900">{order.orderNumber}</h3>
                          <span className={`px-3 py-1 rounded-full text-xs font-semibold border ${getStatusColor(order.status)}`}>
                            {order.status.toUpperCase()}
                          </span>
                          <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getPaymentStatusColor(order.paymentStatus)}`}>
                            {order.paymentStatus === 'paid' ? '💳 BEZAHLT' : '💰 KASSE'}
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

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4 pb-4 border-b">
                      <div>
                        <h4 className="font-semibold text-gray-900 mb-2">Kundeninformationen</h4>
                        <div className="space-y-1 text-sm">
                          <p className="text-gray-700"><span className="font-medium">Name:</span> {order.fullName}</p>
                          <p className="text-gray-700"><span className="font-medium">E-Mail:</span> {order.email}</p>
                          <p className="text-gray-700"><span className="font-medium">Telefon:</span> {order.phone}</p>
                        </div>
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-900 mb-2">
                          {order.deliveryType === 'delivery' ? '🚗 Lieferdetails' : '🛍️ Abholdetails'}
                        </h4>
                        <div className="space-y-1 text-sm">
                          {order.deliveryType === 'delivery' ? (
                            <>
                              <p className="text-gray-700"><span className="font-medium">Adresse:</span> {order.streetAddress}</p>
                              <p className="text-gray-700"><span className="font-medium">Stadt:</span> {order.city} {order.postalCode}</p>
                            </>
                          ) : (
                            <p className="text-gray-700">Der Kunde holt die Bestellung ab</p>
                          )}
                          <p className="text-gray-700">
                            <span className="font-medium">Liefergeschwindigkeit:</span>{' '}
                            {order.timeOption === 'standard'
                              ? '🚗 Standard (45-60 min)'
                              : order.timeOption === 'express'
                              ? '⚡ Äußern (30 min)'
                              : '🛍️ Bereit zur Abholung (30 min)'
                            }
                          </p>
                          {order.remarks && (
                            <p className="text-gray-700 mt-2">
                              <span className="font-medium">Besondere Anweisungen:</span><br />
                              <span className="italic">"{order.remarks}"</span>
                            </p>
                          )}
                        </div>
                      </div>
                    </div>

                    <div className="mb-4">
                      <h4 className="font-semibold text-gray-900 mb-2">Artikel bestellen</h4>
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

                    <div className="flex flex-wrap gap-2">
                      <select
                        value={order.status}
                        onChange={(e) => updateOrderStatus(order._id, e.target.value)}
                        className="px-4 py-2 border-2 border-gray-300 rounded-lg font-semibold text-sm hover:border-[#CC0000] transition-colors focus:outline-none focus:border-[#CC0000]"
                      >
                        <option value="pending">Ausstehend</option>
                        <option value="confirmed">Bestätigt</option>
                        <option value="preparing">Vorbereiten</option>
                        <option value="ready">Bereit</option>
                        <option value="out-for-delivery">Zur Auslieferung bereit</option>
                      </select>

                      <button
                        onClick={() => showCompleteModal(order._id, order.orderNumber, 'order')}
                        className="px-6 py-2 bg-green-600 text-white font-bold rounded-lg hover:bg-green-700 transition-all duration-300 shadow-md hover:shadow-lg"
                      >
                        ✓ Als abgeschlossen markieren
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>
          </>
        )}

        {/* Reservations Tab */}
        {activeTab === 'reservations' && (
          <>
            {/* Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <div className="bg-white rounded-lg shadow-md p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">Aktive Reservierungen</p>
                    <p className="text-3xl font-bold text-gray-900 mt-1">{reservations.length}</p>
                  </div>
                  <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6 text-purple-600">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5" />
                    </svg>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-lg shadow-md p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">Heutige Reservierungen</p>
                    <p className="text-3xl font-bold text-gray-900 mt-1">
                      {reservations.filter(r => r.date === new Date().toISOString().split('T')[0]).length}
                    </p>
                  </div>
                  <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6 text-blue-600">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-lg shadow-md p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">Gesamtzahl der Gäste</p>
                    <p className="text-3xl font-bold text-gray-900 mt-1">
                      {reservations.reduce((sum, r) => sum + r.guests, 0)}
                    </p>
                  </div>
                  <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6 text-green-600">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z" />
                    </svg>
                  </div>
                </div>
              </div>
            </div>

            {/* Reservations List */}
            <div className="space-y-6">
              {reservations.length === 0 ? (
                <div className="bg-white rounded-lg shadow-md p-12 text-center">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-16 h-16 mx-auto text-gray-400 mb-4">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5" />
                  </svg>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">Keine aktiven Reservierungen</h3>
                  <p className="text-gray-600">Alle Reservierungen sind abgeschlossen. Neue Reservierungen werden hier automatisch angezeigt.</p>
                </div>
              ) : (
                reservations.map((reservation) => (
                  <div
                    key={reservation._id}
                    className="bg-white rounded-lg shadow-md p-6 border-2 border-transparent hover:border-[#CC0000] transition-all duration-300"
                  >
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <div className="flex items-center gap-3 mb-2">
                          <h3 className="text-xl font-bold text-gray-900">{reservation.reservationNumber}</h3>
                          <span className={`px-3 py-1 rounded-full text-xs font-semibold border ${getStatusColor(reservation.status)}`}>
                            {reservation.status.toUpperCase()}
                          </span>
                        </div>
                        <p className="text-sm text-gray-600">
                          {new Date(reservation.createdAt).toLocaleString('en-US', {
                            month: 'short',
                            day: 'numeric',
                            year: 'numeric',
                            hour: '2-digit',
                            minute: '2-digit',
                          })}
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="text-2xl font-bold text-[#CC0000]">
                          {reservation.guests} {reservation.guests === 1 ? 'Guest' : 'Guests'}
                        </p>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4 pb-4 border-b">
                      <div>
                        <h4 className="font-semibold text-gray-900 mb-2">Kundeninformationen</h4>
                        <div className="space-y-1 text-sm">
                          <p className="text-gray-700"><span className="font-medium">Name:</span> {reservation.name}</p>
                          <p className="text-gray-700"><span className="font-medium">E-Mail:</span> {reservation.email}</p>
                          <p className="text-gray-700"><span className="font-medium">Telefon:</span> {reservation.phone}</p>
                        </div>
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-900 mb-2">📅 Reservierungsdetails</h4>
                        <div className="space-y-1 text-sm">
                          <p className="text-gray-700">
                            <span className="font-medium">Datum:</span>{' '}
                            {new Date(reservation.date).toLocaleDateString('de-DE', {
                              weekday: 'long',
                              year: 'numeric',
                              month: 'long',
                              day: 'numeric',
                            })}
                          </p>
                          <p className="text-gray-700"><span className="font-medium">Zeit:</span> {reservation.time}</p>
                          <p className="text-gray-700">
                            <span className="font-medium">Gäste:</span> {reservation.guests} {reservation.guests === 1 ? 'Person' : 'Menschen'}
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="flex flex-wrap gap-2">
                      <button
                        onClick={() => showCompleteModal(reservation._id, reservation.reservationNumber, 'reservation')}
                        className="px-6 py-2 bg-green-600 text-white font-bold rounded-lg hover:bg-green-700 transition-all duration-300 shadow-md hover:shadow-lg"
                      >
                        ✓ Reservierung erfüllen
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>
          </>
        )}

        {/* Menu Items Tab */}
        {activeTab === 'menu' && (
          <MenuItemsManager />
        )}
      </main>

      {/* Confirmation Modal */}
      {showConfirmModal && itemToComplete && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
          <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-8">
            <div className="mb-6 flex justify-center">
              <div className="w-20 h-20 bg-yellow-100 rounded-full flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-12 h-12 text-yellow-600">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" />
                </svg>
              </div>
            </div>

            <h2 className="text-2xl font-bold text-gray-900 mb-3 text-center">
              {itemToComplete.type === 'order' ? 'Complete Order?' : 'Fulfill Reservation?'}
            </h2>
            <p className="text-gray-700 mb-2 text-center">
              Bist du sicher, dass du das willst {itemToComplete.type === 'order' ? 'mark' : 'fulfill'}{' '}
              <span className="font-bold text-[#CC0000]">{itemToComplete.number}</span> als abgeschlossen?
            </p>
            <p className="text-sm text-yellow-700 bg-yellow-50 border border-yellow-200 rounded-lg p-3 mb-6 text-center">
              ⚠️ Dadurch werden die Daten endgültig gelöscht {itemToComplete.type} aus der Datenbank.
            </p>

            <div className="flex gap-3">
              <button
                onClick={() => {
                  setShowConfirmModal(false)
                  setItemToComplete(null)
                }}
                className="flex-1 px-6 py-3 bg-gray-200 text-gray-700 font-bold rounded-lg hover:bg-gray-300 transition-all duration-300"
              >
                Stornieren
              </button>
              <button
                onClick={completeItem}
                className="flex-1 px-6 py-3 bg-green-600 text-white font-bold rounded-lg hover:bg-green-700 transition-all duration-300 shadow-md hover:shadow-lg"
              >
                ✓ {itemToComplete.type === 'order' ? 'Vollständig' : 'Erfüllen'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
