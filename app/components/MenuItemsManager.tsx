'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'

interface MenuItem {
  _id: string
  restaurant: string
  section: string
  name: string
  price: string
  originalPrice?: string
  description: string
  additionalInfo?: string
  image: string
  tags: string[]
  customizationOptions?: {
    title: string
    required: boolean
    multiple: boolean
    options: Array<{
      label: string
      price: number
    }>
  }
  customizationGroups?: Array<{
    title: string
    required: boolean
    multiple: boolean
    options: Array<{
      label: string
      price: number
    }>
  }>
  order?: number
  active: boolean
  createdAt: string
  updatedAt: string
}

export default function MenuItemsManager() {
  const [menuItems, setMenuItems] = useState<MenuItem[]>([])
  const [loading, setLoading] = useState(true)
  const [selectedRestaurant, setSelectedRestaurant] = useState<string>('ALL')
  const [selectedSection, setSelectedSection] = useState<string>('ALL')
  const [showEditModal, setShowEditModal] = useState(false)
  const [showAddModal, setShowAddModal] = useState(false)
  const [editingItem, setEditingItem] = useState<MenuItem | null>(null)
  const [formData, setFormData] = useState<Partial<MenuItem>>({})
  const [uploading, setUploading] = useState(false)
  const [imagePreview, setImagePreview] = useState<string>('')

  // Fetch menu items
  const fetchMenuItems = async () => {
    try {
      const response = await fetch('/api/menu-items')
      const data = await response.json()

      if (data.success) {
        setMenuItems(data.menuItems)
      }
    } catch (error) {
      console.error('Error fetching menu items:', error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchMenuItems()
  }, [])

  // Get unique restaurants and sections
  const restaurants = ['ALL', ...Array.from(new Set(menuItems.map(item => item.restaurant)))]
  const sections = selectedRestaurant === 'ALL'
    ? ['ALL', ...Array.from(new Set(menuItems.map(item => item.section)))]
    : ['ALL', ...Array.from(new Set(menuItems.filter(item => item.restaurant === selectedRestaurant).map(item => item.section)))]

  // Filter items
  const filteredItems = menuItems.filter(item => {
    if (selectedRestaurant !== 'ALL' && item.restaurant !== selectedRestaurant) return false
    if (selectedSection !== 'ALL' && item.section !== selectedSection) return false
    return true
  })

  // Group by restaurant and section
  const groupedItems: { [key: string]: { [key: string]: MenuItem[] } } = {}
  filteredItems.forEach(item => {
    if (!groupedItems[item.restaurant]) {
      groupedItems[item.restaurant] = {}
    }
    if (!groupedItems[item.restaurant][item.section]) {
      groupedItems[item.restaurant][item.section] = []
    }
    groupedItems[item.restaurant][item.section].push(item)
  })

  // Delete item
  const deleteItem = async (id: string, name: string) => {
    if (!confirm(`Sind Sie sicher, dass Sie löschen möchten "${name}"?`)) {
      return
    }

    try {
      const response = await fetch(`/api/menu-items/${id}`, {
        method: 'DELETE',
      })

      const data = await response.json()

      if (data.success) {
        setMenuItems(menuItems.filter(item => item._id !== id))
        alert('Element erfolgreich gelöscht')
      } else {
        alert('Fehler beim Löschen des Elements')
      }
    } catch (error) {
      console.error('Error deleting item:', error)
      alert('Fehler beim Löschen des Elements')
    }
  }

  // Toggle active status
  const toggleActive = async (item: MenuItem) => {
    try {
      const response = await fetch(`/api/menu-items/${item._id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ active: !item.active }),
      })

      const data = await response.json()

      if (data.success) {
        setMenuItems(menuItems.map(mi =>
          mi._id === item._id ? { ...mi, active: !mi.active } : mi
        ))
      } else {
        alert('Aktualisierung des Elements fehlgeschlagen')
      }
    } catch (error) {
      console.error('Error updating item:', error)
      alert('Fehler beim Aktualisieren des Artikels')
    }
  }

  // Open edit modal
  const openEditModal = (item: MenuItem) => {
    setEditingItem(item)
    setFormData(item)
    setImagePreview(item.image || '')
    setShowEditModal(true)
  }

  // Open add modal
  const openAddModal = () => {
    setFormData({
      restaurant: selectedRestaurant !== 'ALL' ? selectedRestaurant : 'HIRO_BURGER',
      section: selectedSection !== 'ALL' ? selectedSection : 'Burger',
      name: '',
      price: '',
      description: '',
      image: '',
      tags: [],
      active: true,
    })
    setImagePreview('')
    setShowAddModal(true)
  }

  // Handle image upload
  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    // Validate file type
    if (!file.type.startsWith('image/')) {
      alert('Bitte wählen Sie eine Bilddatei aus.')
      return
    }

    // Validate file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      alert('Die Bildgröße darf maximal 5 MB betragen.')
      return
    }

    try {
      setUploading(true)

      // Create form data
      const uploadFormData = new FormData()
      uploadFormData.append('file', file)
      uploadFormData.append('restaurant', formData.restaurant || 'HIRO_BURGER')

      // Upload image
      const response = await fetch('/api/upload', {
        method: 'POST',
        body: uploadFormData,
      })

      const data = await response.json()

      if (data.success) {
        // Update form data with new image URL
        setFormData({ ...formData, image: data.imageUrl })
        setImagePreview(data.imageUrl)
        alert('Bild erfolgreich hochgeladen!')
      } else {
        alert('Bild konnte nicht hochgeladen werden: ' + data.error)
      }
    } catch (error) {
      console.error('Error uploading image:', error)
      alert('Fehler beim Hochladen des Bildes')
    } finally {
      setUploading(false)
    }
  }

  // Save item (add or update)
  const saveItem = async () => {
    try {
      const url = editingItem
        ? `/api/menu-items/${editingItem._id}`
        : '/api/menu-items'

      const method = editingItem ? 'PATCH' : 'POST'

      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })

      const data = await response.json()

      if (data.success) {
        fetchMenuItems() // Refresh the list
        setShowEditModal(false)
        setShowAddModal(false)
        setEditingItem(null)
        setFormData({})
        alert(editingItem ? 'Artikel erfolgreich aktualisiert' : 'Artikel erfolgreich hinzugefügt')
      } else {
        alert('Speichern des Artikels fehlgeschlagen')
      }
    } catch (error) {
      console.error('Error saving item:', error)
      alert('Fehler beim Speichern des Artikels')
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-[#CC0000]"></div>
      </div>
    )
  }

  return (
    <div>
      {/* Filters and Add Button */}
      <div className="mb-6 flex flex-wrap items-center gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Restaurant</label>
          <select
            value={selectedRestaurant}
            onChange={(e) => {
              setSelectedRestaurant(e.target.value)
              setSelectedSection('ALL')
            }}
            className="px-4 py-2 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-[#CC0000]"
          >
            {restaurants.map(restaurant => (
              <option key={restaurant} value={restaurant}>{restaurant}</option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Abschnitt</label>
          <select
            value={selectedSection}
            onChange={(e) => setSelectedSection(e.target.value)}
            className="px-4 py-2 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-[#CC0000]"
          >
            {sections.map(section => (
              <option key={section} value={section}>{section}</option>
            ))}
          </select>
        </div>

        <div className="ml-auto">
          <label className="block text-sm font-medium text-gray-700 mb-1">&nbsp;</label>
          <button
            onClick={openAddModal}
            className="px-6 py-2 bg-[#CC0000] text-white font-bold rounded-lg hover:bg-[#990000] transition-all duration-300"
          >
            + Neues Element hinzufügen
          </button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div className="bg-white rounded-lg shadow-md p-4">
          <p className="text-sm text-gray-600">Gesamtzahl der Artikel</p>
          <p className="text-2xl font-bold text-gray-900">{menuItems.length}</p>
        </div>
        <div className="bg-white rounded-lg shadow-md p-4">
          <p className="text-sm text-gray-600">Aktive Artikel</p>
          <p className="text-2xl font-bold text-green-600">{menuItems.filter(i => i.active).length}</p>
        </div>
        <div className="bg-white rounded-lg shadow-md p-4">
          <p className="text-sm text-gray-600">Inaktive Artikel</p>
          <p className="text-2xl font-bold text-red-600">{menuItems.filter(i => !i.active).length}</p>
        </div>
      </div>

      {/* Menu Items List */}
      <div className="space-y-8">
        {Object.keys(groupedItems).length === 0 ? (
          <div className="bg-white rounded-lg shadow-md p-12 text-center">
            <h3 className="text-xl font-bold text-gray-900 mb-2">Keine Menüpunkte gefunden</h3>
            <p className="text-gray-600">Fügen Sie Ihren ersten Menüpunkt hinzu, um loszulegen.</p>
          </div>
        ) : (
          Object.entries(groupedItems).map(([restaurant, sections]) => (
            <div key={restaurant}>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">{restaurant}</h2>
              {Object.entries(sections).map(([section, items]) => (
                <div key={`${restaurant}-${section}`} className="mb-6">
                  <h3 className="text-xl font-semibold text-gray-800 mb-3 flex items-center gap-2">
                    {section}
                    <span className="text-sm font-normal text-gray-600">({items.length} items)</span>
                  </h3>
                  <div className="grid grid-cols-1 gap-4">
                    {items.map(item => (
                      <div
                        key={item._id}
                        className={`bg-white rounded-lg shadow-sm p-4 border-2 transition-all duration-300 ${
                          item.active ? 'border-transparent hover:border-[#CC0000]' : 'border-gray-300 opacity-60'
                        }`}
                      >
                        <div className="flex gap-4">
                          {/* Image */}
                          {item.image && (
                            <div className="relative w-24 h-24 bg-gray-100 rounded-lg overflow-hidden flex-shrink-0">
                              <Image
                                src={encodeURI(item.image)}
                                alt={item.name}
                                fill
                                className="object-cover"
                              />
                            </div>
                          )}

                          {/* Content */}
                          <div className="flex-1">
                            <div className="flex items-start justify-between mb-2">
                              <div>
                                <h4 className="font-bold text-gray-900 text-lg">{item.name}</h4>
                                <div className="flex items-center gap-2 mt-1">
                                  <span className="font-bold text-[#CC0000]">{item.price}</span>
                                  {item.originalPrice && (
                                    <span className="text-sm text-gray-500 line-through">{item.originalPrice}</span>
                                  )}
                                  {!item.active && (
                                    <span className="px-2 py-0.5 bg-red-100 text-red-800 text-xs font-semibold rounded">
                                      INAKTIV
                                    </span>
                                  )}
                                </div>
                              </div>
                            </div>
                            <p className="text-sm text-gray-600 mb-2">{item.description}</p>
                            {item.tags.length > 0 && (
                              <div className="flex gap-1.5 flex-wrap mb-3">
                                {item.tags.map(tag => (
                                  <span
                                    key={tag}
                                    className={`px-2 py-0.5 rounded-full text-xs font-semibold ${
                                      tag === 'Vegan' || tag === 'Vegetarisch'
                                        ? 'bg-green-100 text-green-800'
                                        : tag === 'Scharf'
                                        ? 'bg-red-100 text-red-800'
                                        : 'bg-gray-100 text-gray-800'
                                    }`}
                                  >
                                    {tag}
                                  </span>
                                ))}
                              </div>
                            )}
                            {(item.customizationOptions || (item.customizationGroups && item.customizationGroups.length > 0)) && (
                              <div className="mb-3 flex gap-2 flex-wrap">
                                {item.customizationOptions && (
                                  <span className="px-2 py-0.5 bg-purple-100 text-purple-800 text-xs font-semibold rounded">
                                    🎛️ {item.customizationOptions.options?.length || 0} Optionen (Vermächtnis)
                                  </span>
                                )}
                                {item.customizationGroups && item.customizationGroups.length > 0 && (
                                  <span className="px-2 py-0.5 bg-blue-100 text-blue-800 text-xs font-semibold rounded">
                                    📋 {item.customizationGroups.length} Anpassungsgruppe{item.customizationGroups.length > 1 ? 's' : ''}
                                  </span>
                                )}
                              </div>
                            )}
                            <div className="flex gap-2">
                              <button
                                onClick={() => openEditModal(item)}
                                className="px-4 py-1.5 bg-blue-600 text-white text-sm font-semibold rounded hover:bg-blue-700 transition-colors"
                              >
                                Bearbeiten
                              </button>
                              <button
                                onClick={() => toggleActive(item)}
                                className={`px-4 py-1.5 text-sm font-semibold rounded transition-colors ${
                                  item.active
                                    ? 'bg-yellow-600 text-white hover:bg-yellow-700'
                                    : 'bg-green-600 text-white hover:bg-green-700'
                                }`}
                              >
                                {item.active ? 'Deaktivieren' : 'Aktivieren'}
                              </button>
                              <button
                                onClick={() => deleteItem(item._id, item.name)}
                                className="px-4 py-1.5 bg-red-600 text-white text-sm font-semibold rounded hover:bg-red-700 transition-colors"
                              >
                                Löschen
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          ))
        )}
      </div>

      {/* Edit/Add Modal */}
      {(showEditModal || showAddModal) && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm overflow-y-auto">
          <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full p-8 my-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              {editingItem ? 'Edit Menu Item' : 'Add New Menu Item'}
            </h2>

            <div className="space-y-4 max-h-[60vh] overflow-y-auto pr-2">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Restaurant *</label>
                  <input
                    type="text"
                    value={formData.restaurant || ''}
                    onChange={(e) => setFormData({ ...formData, restaurant: e.target.value })}
                    className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-[#CC0000]"
                    placeholder="HIRO_BURGER"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Abschnitt *</label>
                  <input
                    type="text"
                    value={formData.section || ''}
                    onChange={(e) => setFormData({ ...formData, section: e.target.value })}
                    className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-[#CC0000]"
                    placeholder="Burger"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Name *</label>
                <input
                  type="text"
                  value={formData.name || ''}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-[#CC0000]"
                  placeholder="The Cheeseburger"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Preis *</label>
                  <input
                    type="text"
                    value={formData.price || ''}
                    onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                    className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-[#CC0000]"
                    placeholder="9,90 €"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Originalpreis (Optional)</label>
                  <input
                    type="text"
                    value={formData.originalPrice || ''}
                    onChange={(e) => setFormData({ ...formData, originalPrice: e.target.value })}
                    className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-[#CC0000]"
                    placeholder="12,90 €"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Beschreibung *</label>
                <textarea
                  value={formData.description || ''}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  rows={3}
                  className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-[#CC0000]"
                  placeholder="Artikelbeschreibung..."
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Bild</label>

                {/* Image Preview */}
                {imagePreview && (
                  <div className="mb-3">
                    <div className="relative w-32 h-32 border-2 border-gray-300 rounded-lg overflow-hidden bg-gray-50">
                      <Image
                        src={imagePreview}
                        alt="Preview"
                        fill
                        className="object-cover"
                      />
                    </div>
                    <p className="text-xs text-gray-500 mt-1">{formData.image}</p>
                  </div>
                )}

                {/* Upload Section */}
                <div className="space-y-2">
                  <div className="flex gap-2">
                    <label className="flex-1">
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleImageUpload}
                        disabled={uploading}
                        className="hidden"
                      />
                      <div className={`w-full px-4 py-2 border-2 border-dashed rounded-lg text-center cursor-pointer transition-colors ${
                        uploading
                          ? 'border-gray-300 bg-gray-100 cursor-not-allowed'
                          : 'border-[#CC0000] hover:bg-red-50'
                      }`}>
                        {uploading ? (
                          <span className="text-gray-500">Hochladen...</span>
                        ) : (
                          <span className="text-[#CC0000] font-medium">
                            📁 Wählen Sie Bild zum Hochladen
                          </span>
                        )}
                      </div>
                    </label>
                  </div>

                  <div className="text-xs text-gray-500">
                    Laden Sie ein neues Bild hoch (max. 5 MB) oder geben Sie den Pfad unten manuell ein
                  </div>

                  {/* Manual Path Input */}
                  <input
                    type="text"
                    value={formData.image || ''}
                    onChange={(e) => {
                      setFormData({ ...formData, image: e.target.value })
                      setImagePreview(e.target.value)
                    }}
                    className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-[#CC0000] text-sm"
                    placeholder="/HIRO BURGER/item.webp"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Schlagworte (durch Komma getrennt)</label>
                <input
                  type="text"
                  value={formData.tags?.join(', ') || ''}
                  onChange={(e) => setFormData({ ...formData, tags: e.target.value.split(',').map(t => t.trim()).filter(Boolean) })}
                  className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-[#CC0000]"
                  placeholder="Vegetarisch, Scharf, Vegan"
                />
              </div>

              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  id="active"
                  checked={formData.active !== false}
                  onChange={(e) => setFormData({ ...formData, active: e.target.checked })}
                  className="w-4 h-4"
                />
                <label htmlFor="active" className="text-sm font-medium text-gray-700">Active</label>
              </div>

              {/* Customization Options Section */}
              <div className="border-t-2 border-gray-200 pt-4 mt-4">
                <div className="flex items-center justify-between mb-3">
                  <label className="block text-sm font-medium text-gray-700">Anpassungsoptionen (z.B. Burger-Extras)</label>
                  <button
                    type="button"
                    onClick={() => {
                      if (!formData.customizationOptions) {
                        setFormData({
                          ...formData,
                          customizationOptions: {
                            title: 'Deine Extras:',
                            required: false,
                            multiple: true,
                            options: []
                          }
                        })
                      } else {
                        const updatedData = { ...formData }
                        delete updatedData.customizationOptions
                        setFormData(updatedData)
                      }
                    }}
                    className={`px-4 py-1.5 rounded-lg text-sm font-semibold transition-colors ${
                      formData.customizationOptions
                        ? 'bg-red-600 text-white hover:bg-red-700'
                        : 'bg-blue-600 text-white hover:bg-blue-700'
                    }`}
                  >
                    {formData.customizationOptions ? 'Entfernen Sie Anpassungen' : 'Anpassungen hinzufügen'}
                  </button>
                </div>

                {formData.customizationOptions && (
                  <div className="space-y-3 bg-gray-50 p-4 rounded-lg">
                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="block text-xs font-medium text-gray-700 mb-1">Titel</label>
                        <input
                          type="text"
                          value={formData.customizationOptions.title || ''}
                          onChange={(e) => setFormData({
                            ...formData,
                            customizationOptions: {
                              ...formData.customizationOptions!,
                              title: e.target.value
                            }
                          })}
                          className="w-full px-3 py-1.5 text-sm border-2 border-gray-300 rounded-lg focus:outline-none focus:border-[#CC0000]"
                          placeholder="Deine Extras:"
                        />
                      </div>
                      <div className="flex items-end gap-3">
                        <div className="flex items-center gap-2">
                          <input
                            type="checkbox"
                            id="customRequired"
                            checked={formData.customizationOptions.required || false}
                            onChange={(e) => setFormData({
                              ...formData,
                              customizationOptions: {
                                ...formData.customizationOptions!,
                                required: e.target.checked
                              }
                            })}
                            className="w-4 h-4"
                          />
                          <label htmlFor="customRequired" className="text-xs font-medium text-gray-700">Erforderlich</label>
                        </div>
                        <div className="flex items-center gap-2">
                          <input
                            type="checkbox"
                            id="customMultiple"
                            checked={formData.customizationOptions.multiple !== false}
                            onChange={(e) => setFormData({
                              ...formData,
                              customizationOptions: {
                                ...formData.customizationOptions!,
                                multiple: e.target.checked
                              }
                            })}
                            className="w-4 h-4"
                          />
                          <label htmlFor="customMultiple" className="text-xs font-medium text-gray-700">Mehrere</label>
                        </div>
                      </div>
                    </div>

                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <label className="block text-xs font-medium text-gray-700">Optionen</label>
                        <button
                          type="button"
                          onClick={() => {
                            const newOption = { label: '', price: 0 }
                            setFormData({
                              ...formData,
                              customizationOptions: {
                                ...formData.customizationOptions!,
                                options: [...(formData.customizationOptions!.options || []), newOption]
                              }
                            })
                          }}
                          className="px-3 py-1 bg-green-600 text-white text-xs font-semibold rounded hover:bg-green-700 transition-colors"
                        >
                          + Option hinzufügen
                        </button>
                      </div>

                      <div className="space-y-2 max-h-48 overflow-y-auto">
                        {formData.customizationOptions.options && formData.customizationOptions.options.length > 0 ? (
                          formData.customizationOptions.options.map((option, index) => (
                            <div key={index} className="flex gap-2 items-center bg-white p-2 rounded border border-gray-200">
                              <input
                                type="text"
                                value={option.label}
                                onChange={(e) => {
                                  const updatedOptions = [...formData.customizationOptions!.options]
                                  updatedOptions[index] = { ...updatedOptions[index], label: e.target.value }
                                  setFormData({
                                    ...formData,
                                    customizationOptions: {
                                      ...formData.customizationOptions!,
                                      options: updatedOptions
                                    }
                                  })
                                }}
                                className="flex-1 px-2 py-1 text-sm border border-gray-300 rounded focus:outline-none focus:border-[#CC0000]"
                                placeholder="mit Guacamole"
                              />
                              <input
                                type="number"
                                step="0.01"
                                value={option.price}
                                onChange={(e) => {
                                  const updatedOptions = [...formData.customizationOptions!.options]
                                  updatedOptions[index] = { ...updatedOptions[index], price: parseFloat(e.target.value) || 0 }
                                  setFormData({
                                    ...formData,
                                    customizationOptions: {
                                      ...formData.customizationOptions!,
                                      options: updatedOptions
                                    }
                                  })
                                }}
                                className="w-24 px-2 py-1 text-sm border border-gray-300 rounded focus:outline-none focus:border-[#CC0000]"
                                placeholder="2.00"
                              />
                              <button
                                type="button"
                                onClick={() => {
                                  const updatedOptions = formData.customizationOptions!.options.filter((_, i) => i !== index)
                                  setFormData({
                                    ...formData,
                                    customizationOptions: {
                                      ...formData.customizationOptions!,
                                      options: updatedOptions
                                    }
                                  })
                                }}
                                className="px-2 py-1 bg-red-600 text-white text-xs font-semibold rounded hover:bg-red-700 transition-colors"
                              >
                                ✕
                              </button>
                            </div>
                          ))
                        ) : (
                          <p className="text-xs text-gray-500 italic text-center py-2">Noch keine Optionen. Klicken Sie auf „+ Option hinzufügen“, um eine hinzuzufügen.</p>
                        )}
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* NEW: Multiple Customization Groups Section */}
              <div className="border-t-2 border-gray-200 pt-4 mt-4">
                <div className="flex items-center justify-between mb-3">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Anpassungsgruppen (Fortschrittlich)</label>
                    <p className="text-xs text-gray-500 mt-0.5">Erstellen Sie mehrere Anpassungskategorien (z. B. Beläge, Brotsorte, Größe)</p>
                  </div>
                  <button
                    type="button"
                    onClick={() => {
                      const newGroup = {
                        title: '',
                        required: false,
                        multiple: true,
                        options: []
                      }
                      setFormData({
                        ...formData,
                        customizationGroups: [...(formData.customizationGroups || []), newGroup]
                      })
                    }}
                    className="px-4 py-1.5 bg-green-600 text-white rounded-lg text-sm font-semibold hover:bg-green-700 transition-colors"
                  >
                    + Gruppe hinzufügen
                  </button>
                </div>

                {formData.customizationGroups && formData.customizationGroups.length > 0 && (
                  <div className="space-y-4">
                    {formData.customizationGroups.map((group, groupIndex) => (
                      <div key={groupIndex} className="bg-blue-50 border-2 border-blue-200 rounded-lg p-4">
                        <div className="flex items-center justify-between mb-3">
                          <h4 className="text-sm font-bold text-blue-900">Gruppe {groupIndex + 1}</h4>
                          <button
                            type="button"
                            onClick={() => {
                              const updatedGroups = formData.customizationGroups!.filter((_, i) => i !== groupIndex)
                              setFormData({
                                ...formData,
                                customizationGroups: updatedGroups
                              })
                            }}
                            className="px-3 py-1 bg-red-600 text-white text-xs font-semibold rounded hover:bg-red-700 transition-colors"
                          >
                            Gruppe löschen
                          </button>
                        </div>

                        <div className="space-y-3">
                          <div className="grid grid-cols-2 gap-3">
                            <div>
                              <label className="block text-xs font-medium text-gray-700 mb-1">Gruppentitel *</label>
                              <input
                                type="text"
                                value={group.title}
                                onChange={(e) => {
                                  const updatedGroups = [...formData.customizationGroups!]
                                  updatedGroups[groupIndex] = { ...updatedGroups[groupIndex], title: e.target.value }
                                  setFormData({ ...formData, customizationGroups: updatedGroups })
                                }}
                                className="w-full px-3 py-1.5 text-sm border-2 border-gray-300 rounded-lg focus:outline-none focus:border-[#CC0000]"
                                placeholder="e.g., Wähle dein Bun"
                              />
                            </div>
                            <div className="flex items-end gap-3">
                              <div className="flex items-center gap-2">
                                <input
                                  type="checkbox"
                                  id={`group${groupIndex}-required`}
                                  checked={group.required}
                                  onChange={(e) => {
                                    const updatedGroups = [...formData.customizationGroups!]
                                    updatedGroups[groupIndex] = { ...updatedGroups[groupIndex], required: e.target.checked }
                                    setFormData({ ...formData, customizationGroups: updatedGroups })
                                  }}
                                  className="w-4 h-4"
                                />
                                <label htmlFor={`group${groupIndex}-required`} className="text-xs font-medium text-gray-700">Erforderlich</label>
                              </div>
                              <div className="flex items-center gap-2">
                                <input
                                  type="checkbox"
                                  id={`group${groupIndex}-multiple`}
                                  checked={group.multiple}
                                  onChange={(e) => {
                                    const updatedGroups = [...formData.customizationGroups!]
                                    updatedGroups[groupIndex] = { ...updatedGroups[groupIndex], multiple: e.target.checked }
                                    setFormData({ ...formData, customizationGroups: updatedGroups })
                                  }}
                                  className="w-4 h-4"
                                />
                                <label htmlFor={`group${groupIndex}-multiple`} className="text-xs font-medium text-gray-700">Mehrere</label>
                              </div>
                            </div>
                          </div>

                          <div>
                            <div className="flex items-center justify-between mb-2">
                              <label className="block text-xs font-medium text-gray-700">Optionen</label>
                              <button
                                type="button"
                                onClick={() => {
                                  const updatedGroups = [...formData.customizationGroups!]
                                  updatedGroups[groupIndex] = {
                                    ...updatedGroups[groupIndex],
                                    options: [...updatedGroups[groupIndex].options, { label: '', price: 0 }]
                                  }
                                  setFormData({ ...formData, customizationGroups: updatedGroups })
                                }}
                                className="px-3 py-1 bg-blue-600 text-white text-xs font-semibold rounded hover:bg-blue-700 transition-colors"
                              >
                                + Option hinzufügen
                              </button>
                            </div>

                            <div className="space-y-2 max-h-40 overflow-y-auto">
                              {group.options && group.options.length > 0 ? (
                                group.options.map((option, optionIndex) => (
                                  <div key={optionIndex} className="flex gap-2 items-center bg-white p-2 rounded border border-blue-300">
                                    <input
                                      type="text"
                                      value={option.label}
                                      onChange={(e) => {
                                        const updatedGroups = [...formData.customizationGroups!]
                                        updatedGroups[groupIndex].options[optionIndex] = {
                                          ...updatedGroups[groupIndex].options[optionIndex],
                                          label: e.target.value
                                        }
                                        setFormData({ ...formData, customizationGroups: updatedGroups })
                                      }}
                                      className="flex-1 px-2 py-1 text-sm border border-gray-300 rounded focus:outline-none focus:border-[#CC0000]"
                                      placeholder="Option name"
                                    />
                                    <input
                                      type="number"
                                      step="0.01"
                                      value={option.price}
                                      onChange={(e) => {
                                        const updatedGroups = [...formData.customizationGroups!]
                                        updatedGroups[groupIndex].options[optionIndex] = {
                                          ...updatedGroups[groupIndex].options[optionIndex],
                                          price: parseFloat(e.target.value) || 0
                                        }
                                        setFormData({ ...formData, customizationGroups: updatedGroups })
                                      }}
                                      className="w-24 px-2 py-1 text-sm border border-gray-300 rounded focus:outline-none focus:border-[#CC0000]"
                                      placeholder="0.00"
                                    />
                                    <button
                                      type="button"
                                      onClick={() => {
                                        const updatedGroups = [...formData.customizationGroups!]
                                        updatedGroups[groupIndex].options = updatedGroups[groupIndex].options.filter((_, i) => i !== optionIndex)
                                        setFormData({ ...formData, customizationGroups: updatedGroups })
                                      }}
                                      className="px-2 py-1 bg-red-600 text-white text-xs font-semibold rounded hover:bg-red-700 transition-colors"
                                    >
                                      ✕
                                    </button>
                                  </div>
                                ))
                              ) : (
                                <p className="text-xs text-gray-500 italic text-center py-2">Noch keine Optionen. Klicken Sie auf „+ Option hinzufügen“.</p>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                {(!formData.customizationGroups || formData.customizationGroups.length === 0) && (
                  <p className="text-xs text-gray-500 italic text-center py-4 bg-gray-50 rounded-lg">
                    Es sind noch keine Anpassungsgruppen vorhanden. Klicken Sie auf „+ Gruppe hinzufügen“, um eine zu erstellen.
                  </p>
                )}
              </div>
            </div>

            <div className="flex gap-3 mt-6">
              <button
                onClick={() => {
                  setShowEditModal(false)
                  setShowAddModal(false)
                  setEditingItem(null)
                  setFormData({})
                }}
                className="flex-1 px-6 py-3 bg-gray-200 text-gray-700 font-bold rounded-lg hover:bg-gray-300 transition-all duration-300"
              >
                Stornieren
              </button>
              <button
                onClick={saveItem}
                className="flex-1 px-6 py-3 bg-[#CC0000] text-white font-bold rounded-lg hover:bg-[#990000] transition-all duration-300"
              >
                {editingItem ? 'Aktualisieren' : 'Hinzufügen'} Artikel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
