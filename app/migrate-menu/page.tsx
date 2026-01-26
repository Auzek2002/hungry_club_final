'use client'

import { useState } from 'react'
import { menuItemsData } from '@/scripts/migrate-menu-items'

export default function MigrateMenuPage() {
  const [status, setStatus] = useState<string>('')
  const [loading, setLoading] = useState(false)

  const runMigration = async () => {
    setLoading(true)
    setStatus('Starting migration...')

    try {
      const response = await fetch('/api/migrate-menu', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ items: menuItemsData }),
      })

      const result = await response.json()

      if (result.success) {
        setStatus(`✅ Success! ${result.message}`)
      } else {
        setStatus(`⚠️ ${result.message}`)
      }
    } catch (error: any) {
      setStatus(`❌ Error: ${error.message}`)
    } finally {
      setLoading(false)
    }
  }

  const clearDatabase = async () => {
    if (!confirm('Are you sure you want to delete ALL menu items from the database?')) {
      return
    }

    setLoading(true)
    setStatus('Clearing database...')

    try {
      const response = await fetch('/api/migrate-menu', {
        method: 'DELETE',
      })

      const result = await response.json()

      if (result.success) {
        setStatus(`✅ ${result.message}`)
      } else {
        setStatus(`❌ Failed to clear database`)
      }
    } catch (error: any) {
      setStatus(`❌ Error: ${error.message}`)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-lg p-8 max-w-2xl w-full">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">Menu Items Migration</h1>
        <p className="text-gray-600 mb-6">
          This page will migrate all hard-coded menu items from the HIRO BURGER restaurant page
          to the MongoDB database.
        </p>

        <div className="space-y-4 mb-6">
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <h3 className="font-semibold text-blue-900 mb-2">What this will do:</h3>
            <ul className="list-disc list-inside text-blue-800 text-sm space-y-1">
              <li>Create {menuItemsData.length} menu items in the database</li>
              <li>All items will be marked as active by default</li>
              <li>Items are organized by restaurant and section</li>
            </ul>
          </div>

          {status && (
            <div className={`border rounded-lg p-4 ${
              status.startsWith('✅')
                ? 'bg-green-50 border-green-200 text-green-900'
                : status.startsWith('⚠️')
                ? 'bg-yellow-50 border-yellow-200 text-yellow-900'
                : 'bg-red-50 border-red-200 text-red-900'
            }`}>
              {status}
            </div>
          )}
        </div>

        <div className="flex gap-4">
          <button
            onClick={runMigration}
            disabled={loading}
            className="flex-1 px-6 py-3 bg-[#CC0000] text-white font-bold rounded-lg hover:bg-[#990000] transition-all duration-300 disabled:bg-gray-400 disabled:cursor-not-allowed"
          >
            {loading ? 'Processing...' : 'Run Migration'}
          </button>

          <button
            onClick={clearDatabase}
            disabled={loading}
            className="px-6 py-3 bg-gray-600 text-white font-bold rounded-lg hover:bg-gray-700 transition-all duration-300 disabled:bg-gray-400 disabled:cursor-not-allowed"
          >
            Clear Database
          </button>
        </div>

        <div className="mt-6 text-sm text-gray-500">
          <p><strong>Note:</strong> Run this migration only once. After migration, you can manage all menu items from the admin panel.</p>
        </div>
      </div>
    </div>
  )
}
