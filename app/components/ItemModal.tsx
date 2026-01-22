'use client'

import Image from 'next/image'
import { useState, useEffect } from 'react'
import { useCart } from '../context/CartContext'

interface CustomizationOption {
  label: string
  price: number
}

interface CustomizationOptions {
  title: string
  required: boolean
  multiple?: boolean  // Allow multiple selections (checkboxes)
  options: CustomizationOption[]
}

interface ItemModalProps {
  isOpen: boolean
  onClose: () => void
  item: {
    name: string
    price: string
    description?: string
    bulletPoints?: string[]
    image?: string
    tags?: string[]
    additionalInfo?: string
    customizationOptions?: CustomizationOptions | CustomizationOptions[]
  }
}

export default function ItemModal({ isOpen, onClose, item }: ItemModalProps) {
  const [quantity, setQuantity] = useState(1)
  const [selectedOption, setSelectedOption] = useState<number | null>(null)
  const [selectedExtras, setSelectedExtras] = useState<number[]>([])  // For multiple checkbox selections
  // For multiple customization groups
  const [selectedOptions, setSelectedOptions] = useState<Map<number, number | null>>(new Map())
  const [selectedExtrasGroups, setSelectedExtrasGroups] = useState<Map<number, number[]>>(new Map())
  const { addToCart } = useCart()

  // Reset selected option when modal opens
  useEffect(() => {
    if (isOpen) {
      setSelectedOption(null)
      setSelectedExtras([])
      setSelectedOptions(new Map())
      setSelectedExtrasGroups(new Map())
      setQuantity(1)
    }
  }, [isOpen])

  // Prevent body scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }

    // Cleanup on unmount
    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [isOpen])

  if (!isOpen) return null

  const decreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1)
    }
  }

  const increaseQuantity = () => {
    setQuantity(quantity + 1)
  }

  // Calculate total price based on quantity and selected option/extras
  const calculateTotalPrice = () => {
    // Extract numeric value from price string (e.g., "5,90 €" -> 5.90)
    const priceMatch = item.price.match(/(\d+[,.]?\d*)/)
    if (priceMatch) {
      let basePrice = parseFloat(priceMatch[1].replace(',', '.'))

      // Handle multiple customization groups
      if (Array.isArray(item.customizationOptions)) {
        item.customizationOptions.forEach((group, groupIndex) => {
          if (!group.multiple) {
            // Radio button selection
            const selectedIndex = selectedOptions.get(groupIndex)
            if (selectedIndex !== null && selectedIndex !== undefined) {
              basePrice += group.options[selectedIndex].price
            }
          } else {
            // Checkbox selections
            const selectedExtrasForGroup = selectedExtrasGroups.get(groupIndex) || []
            selectedExtrasForGroup.forEach(index => {
              basePrice += group.options[index].price
            })
          }
        })
      } else if (item.customizationOptions) {
        // Single customization group (backward compatibility)
        // Add selected option price if applicable (radio button)
        if (!item.customizationOptions.multiple && selectedOption !== null) {
          const optionPrice = (item.customizationOptions as CustomizationOptions).options[selectedOption].price
          basePrice += optionPrice
        }

        // Add selected extras prices (checkboxes)
        if (item.customizationOptions.multiple && selectedExtras.length > 0) {
          selectedExtras.forEach(index => {
            basePrice += (item.customizationOptions as CustomizationOptions).options[index].price
          })
        }
      }

      const totalPrice = (basePrice * quantity).toFixed(2).replace('.', ',')
      return `${totalPrice} €`
    }
    return item.price
  }

  const handleAddToCart = () => {
    // Handle multiple customization groups
    if (Array.isArray(item.customizationOptions)) {
      // Check if all required fields are selected
      for (let groupIndex = 0; groupIndex < item.customizationOptions.length; groupIndex++) {
        const group = item.customizationOptions[groupIndex]
        if (group.required && !group.multiple) {
          const selectedIndex = selectedOptions.get(groupIndex)
          console.log(`Group ${groupIndex} (${group.title}): required=${group.required}, multiple=${group.multiple}, selectedIndex=`, selectedIndex)
          if (selectedIndex === null || selectedIndex === undefined) {
            alert(`Bitte wählen Sie eine Option für "${group.title}" aus.`)
            return
          }
        }
      }

      // Prepare cart item with customization details
      const priceMatch = item.price.match(/(\d+[,.]?\d*)/)
      let basePrice = priceMatch ? parseFloat(priceMatch[1].replace(',', '.')) : 0
      const customizationTexts: string[] = []

      item.customizationOptions.forEach((group, groupIndex) => {
        if (!group.multiple) {
          // Radio button selection
          const selectedIndex = selectedOptions.get(groupIndex)
          if (selectedIndex !== null && selectedIndex !== undefined) {
            const option = group.options[selectedIndex]
            customizationTexts.push(option.label)
            basePrice += option.price
          }
        } else {
          // Checkbox selections
          const selectedExtrasForGroup = selectedExtrasGroups.get(groupIndex) || []
          if (selectedExtrasForGroup.length > 0) {
            const labels = selectedExtrasForGroup.map(index => group.options[index].label)
            customizationTexts.push(labels.join(', '))
            selectedExtrasForGroup.forEach(index => {
              basePrice += group.options[index].price
            })
          }
        }
      })

      const finalPrice = `${basePrice.toFixed(2).replace('.', ',')} €`
      const customizationText = customizationTexts.join(', ')

      addToCart({
        name: item.name,
        price: finalPrice,
        description: customizationText || item.description,
        image: item.image
      }, quantity)
    } else {
      // Single customization group (backward compatibility)
      // Check if customization is required and no option is selected (radio button)
      if (item.customizationOptions?.required && !item.customizationOptions.multiple && selectedOption === null) {
        alert('Bitte wählen Sie eine Option aus.')
        return
      }

      // Prepare cart item with customization details
      let finalPrice = item.price
      let customizationText = ''

      // Handle radio button selection
      if (item.customizationOptions && !item.customizationOptions.multiple && selectedOption !== null) {
        const option = (item.customizationOptions as CustomizationOptions).options[selectedOption]
        customizationText = option.label

        // Calculate the final price including option price
        const priceMatch = item.price.match(/(\d+[,.]?\d*)/)
        if (priceMatch) {
          const basePrice = parseFloat(priceMatch[1].replace(',', '.'))
          const totalPrice = (basePrice + option.price).toFixed(2).replace('.', ',')
          finalPrice = `${totalPrice} €`
        }
      }

      // Handle checkbox selections (multiple extras)
      if (item.customizationOptions && item.customizationOptions.multiple && selectedExtras.length > 0) {
        const selectedExtrasLabels = selectedExtras.map(index =>
          (item.customizationOptions as CustomizationOptions).options[index].label
        )
        customizationText = selectedExtrasLabels.join(', ')

        // Calculate the final price including extras
        const priceMatch = item.price.match(/(\d+[,.]?\d*)/)
        if (priceMatch) {
          let basePrice = parseFloat(priceMatch[1].replace(',', '.'))
          selectedExtras.forEach(index => {
            basePrice += (item.customizationOptions as CustomizationOptions).options[index].price
          })
          const totalPrice = basePrice.toFixed(2).replace('.', ',')
          finalPrice = `${totalPrice} €`
        }
      }

      addToCart({
        name: item.name,
        price: finalPrice,
        description: customizationText || item.description,
        image: item.image
      }, quantity)
    }

    onClose()
    setQuantity(1)
    setSelectedOption(null)
    setSelectedExtras([])
    setSelectedOptions(new Map())
    setSelectedExtrasGroups(new Map())
  }

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/50"
        onClick={onClose}
      ></div>

      {/* Modal */}
      <div className="relative bg-white rounded-2xl shadow-2xl max-w-2xl w-full mx-4 max-h-[90vh] overflow-y-auto">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 w-10 h-10 flex items-center justify-center bg-white rounded-full shadow-lg hover:bg-gray-100 transition-colors"
        >
          <span className="text-2xl text-gray-700">×</span>
        </button>

        {/* Content */}
        <div className="p-6">
          {/* Image Section - Only show if image exists */}
          {item.image && (
            <div className="relative w-full h-64 bg-orange-50 rounded-xl overflow-hidden mb-6">
              <Image
                src={item.image}
                alt={item.name}
                fill
                className="object-cover"
              />
            </div>
          )}

          {/* Item Name */}
          <h2 className="text-2xl font-bold text-gray-900 mb-4">{item.name}</h2>

          {/* Price */}
          <div className="text-xl font-bold text-gray-900 mb-4">{item.price}</div>

          {/* Description or Bullet Points */}
          {item.bulletPoints ? (
            <ul className="text-sm text-gray-600 mb-4 space-y-2">
              {item.bulletPoints.map((point, index) => (
                <li key={index} className="flex items-start">
                  <span className="mr-2">•</span>
                  <span>{point}</span>
                </li>
              ))}
            </ul>
          ) : item.description && (
            <p className="text-sm text-gray-600 mb-4">{item.description}</p>
          )}

          {/* Additional Info */}
          {item.additionalInfo && (
            <p className="text-xs text-gray-500 mb-4">{item.additionalInfo}</p>
          )}

          {/* Tags */}
          {item.tags && item.tags.length > 0 && (
            <div className="flex gap-2 flex-wrap mb-6">
              {item.tags.map((tag) => (
                <span
                  key={tag}
                  className={`px-3 py-1 rounded-full text-sm font-semibold ${
                    tag === 'Vegan'
                      ? 'bg-green-100 text-green-800'
                      : tag === 'Vegetarisch'
                      ? 'bg-green-100 text-green-800'
                      : tag === 'Scharf'
                      ? 'bg-red-100 text-red-800'
                      : 'bg-gray-100 text-gray-800'
                  }`}
                >
                  {tag === 'Vegan' && '🌱 '}
                  {tag === 'Vegetarisch' && '🥬 '}
                  {tag === 'Scharf' && '🌶️ '}
                  {tag}
                </span>
              ))}
            </div>
          )}

          {/* Produktinfo Link */}
          <button className="text-sm text-gray-700 hover:text-gray-900 underline mb-6">
            Produktinfo
          </button>

          {/* Customization Options */}
          {item.customizationOptions && (
            <>
              {Array.isArray(item.customizationOptions) ? (
                // Multiple customization groups
                item.customizationOptions.map((group, groupIndex) => (
                  <div key={groupIndex} className="mb-6 border-t border-b border-gray-200 py-4">
                    <div className="flex items-center justify-between mb-3">
                      <h3 className="text-lg font-bold text-gray-900">
                        {group.title}
                      </h3>
                      {group.required ? (
                        <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded">
                          1 Pflichtfeld
                        </span>
                      ) : (
                        <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded">
                          Optional
                        </span>
                      )}
                    </div>

                    <div className="space-y-2">
                      {group.options.map((option, index) => (
                        <div key={index}>
                          <label className="flex items-center justify-between p-3 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer transition-colors">
                            <div className="flex items-center gap-3">
                              {group.multiple ? (
                                // Checkbox for multiple selection
                                <input
                                  type="checkbox"
                                  checked={(selectedExtrasGroups.get(groupIndex) || []).includes(index)}
                                  onChange={() => {
                                    const currentExtras = selectedExtrasGroups.get(groupIndex) || []
                                    if (currentExtras.includes(index)) {
                                      const newExtras = currentExtras.filter(i => i !== index)
                                      setSelectedExtrasGroups(new Map(selectedExtrasGroups.set(groupIndex, newExtras)))
                                    } else {
                                      setSelectedExtrasGroups(new Map(selectedExtrasGroups.set(groupIndex, [...currentExtras, index])))
                                    }
                                  }}
                                  className="w-5 h-5 text-[#CC0000] focus:ring-[#CC0000] rounded"
                                />
                              ) : (
                                // Radio button for single selection
                                <input
                                  type="radio"
                                  name={`customization-${groupIndex}`}
                                  checked={selectedOptions.get(groupIndex) === index}
                                  onChange={() => setSelectedOptions(new Map(selectedOptions.set(groupIndex, index)))}
                                  className="w-5 h-5 text-[#CC0000] focus:ring-[#CC0000]"
                                />
                              )}
                              <span className="text-sm text-gray-900">{option.label}</span>
                            </div>
                            {option.price > 0 && (
                              <span className="text-sm font-semibold text-gray-700">
                                +{option.price.toFixed(2).replace('.', ',')} €
                              </span>
                            )}
                          </label>
                          <button className="text-xs text-gray-500 hover:text-gray-700 underline ml-11 mt-1">
                            Produktinfo
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                ))
              ) : (
                // Single customization group (backward compatibility)
                <div className="mb-6 border-t border-b border-gray-200 py-4">
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="text-lg font-bold text-gray-900">
                      {item.customizationOptions.title}
                    </h3>
                    {item.customizationOptions.required ? (
                      <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded">
                        1 Pflichtfeld
                      </span>
                    ) : (
                      <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded">
                        Optional
                      </span>
                    )}
                  </div>

                  <div className="space-y-2">
                    {item.customizationOptions.options.map((option, index) => (
                      <div key={index}>
                        <label className="flex items-center justify-between p-3 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer transition-colors">
                          <div className="flex items-center gap-3">
                            {(item.customizationOptions as CustomizationOptions).multiple ? (
                              // Checkbox for multiple selection
                              <input
                                type="checkbox"
                                checked={selectedExtras.includes(index)}
                                onChange={() => {
                                  if (selectedExtras.includes(index)) {
                                    setSelectedExtras(selectedExtras.filter(i => i !== index))
                                  } else {
                                    setSelectedExtras([...selectedExtras, index])
                                  }
                                }}
                                className="w-5 h-5 text-[#CC0000] focus:ring-[#CC0000] rounded"
                              />
                            ) : (
                              // Radio button for single selection
                              <input
                                type="radio"
                                name="customization"
                                checked={selectedOption === index}
                                onChange={() => setSelectedOption(index)}
                                className="w-5 h-5 text-[#CC0000] focus:ring-[#CC0000]"
                              />
                            )}
                            <span className="text-sm text-gray-900">{option.label}</span>
                          </div>
                          {option.price > 0 && (
                            <span className="text-sm font-semibold text-gray-700">
                              +{option.price.toFixed(2).replace('.', ',')} €
                            </span>
                          )}
                        </label>
                        <button className="text-xs text-gray-500 hover:text-gray-700 underline ml-11 mt-1">
                          Produktinfo
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </>
          )}

          {/* Quantity Controls and Add Button */}
          <div className="flex items-center gap-4">
            {/* Quantity Controls */}
            <div className="flex items-center gap-3 bg-gray-100 rounded-full px-4 py-2">
              <button
                onClick={decreaseQuantity}
                className="w-8 h-8 flex items-center justify-center text-2xl text-gray-700 hover:text-gray-900 transition-colors"
              >
                −
              </button>
              <span className="text-lg font-semibold text-gray-900 min-w-[30px] text-center">
                {quantity}
              </span>
              <button
                onClick={increaseQuantity}
                className="w-8 h-8 flex items-center justify-center text-2xl text-gray-700 hover:text-gray-900 transition-colors"
              >
                +
              </button>
            </div>

            {/* Add to Cart Button */}
            <button
              onClick={handleAddToCart}
              className="flex-1 bg-[#CC0000] hover:bg-[#990000] text-white font-bold py-3 px-6 rounded-full transition-colors text-lg shadow-lg"
            >
              Hinzufügen {calculateTotalPrice()}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
