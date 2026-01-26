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
    includes?: string[]  // For menu sets from database
    image?: string
    tags?: string[]
    additionalInfo?: string
    customizationOptions?: CustomizationOptions | CustomizationOptions[]
    customizationGroups?: CustomizationOptions[]  // NEW: Support for multiple groups
  }
}

export default function ItemModal({ isOpen, onClose, item }: ItemModalProps) {
  const [quantity, setQuantity] = useState(1)
  const [selectedOption, setSelectedOption] = useState<number | null>(null)
  const [selectedExtras, setSelectedExtras] = useState<number[]>([])  // For multiple checkbox selections
  // For multiple customization groups
  const [selectedOptions, setSelectedOptions] = useState<Map<number, number | null>>(new Map())
  const [selectedExtrasGroups, setSelectedExtrasGroups] = useState<Map<number, number[]>>(new Map())
  const [selectedSize, setSelectedSize] = useState<string | null>(null)  // Track selected size for Mix Your Own Bowl
  const { addToCart } = useCart()

  // Helper function to get all customization groups (combines legacy and new format)
  const getAllCustomizationGroups = (): CustomizationOptions[] => {
    const groups: CustomizationOptions[] = []

    // Add legacy customizationOptions (convert to array if single object)
    if (item.customizationOptions) {
      if (Array.isArray(item.customizationOptions)) {
        groups.push(...item.customizationOptions)
      } else {
        groups.push(item.customizationOptions)
      }
    }

    // Add new customizationGroups
    if (item.customizationGroups && Array.isArray(item.customizationGroups)) {
      groups.push(...item.customizationGroups)
    }

    // Filter out empty groups (groups with no options)
    return groups.filter(group => group.options && group.options.length > 0)
  }

  const allCustomizationGroups = getAllCustomizationGroups()

  // Check if this is a Mix Your Own Bowl item
  const isMixYourOwnBowl = item.name.includes('Mix Your Own Bowl')

  // Filter customization groups based on selected size (for Mix Your Own Bowl only)
  const getVisibleCustomizationGroups = (): CustomizationOptions[] => {
    if (!isMixYourOwnBowl) {
      return allCustomizationGroups
    }

    // If no size selected yet, show only the first group (size selection)
    if (!selectedSize) {
      return allCustomizationGroups.slice(0, 1)
    }

    // If Medium is selected, hide "Dein 4. Mix In" and "Dein 5. Mix In"
    if (selectedSize === 'Medium') {
      return allCustomizationGroups.filter(group =>
        group.title !== 'Dein 4. Mix In:' && group.title !== 'Dein 5. Mix In:'
      )
    }

    // If Premium-Größe Basis is selected, show all groups
    if (selectedSize === 'Premium-Größe Basis') {
      return allCustomizationGroups
    }

    // Default: show only first group
    return allCustomizationGroups.slice(0, 1)
  }

  const visibleCustomizationGroups = getVisibleCustomizationGroups()

  // Check if all required fields are selected
  const areAllRequiredFieldsSelected = (): boolean => {
    // If no customization groups, button should be enabled
    if (allCustomizationGroups.length === 0) {
      return true
    }

    // Check only visible groups for Mix Your Own Bowl, or all groups for other items
    const groupsToCheck = isMixYourOwnBowl ? visibleCustomizationGroups : allCustomizationGroups

    for (let i = 0; i < allCustomizationGroups.length; i++) {
      const group = allCustomizationGroups[i]

      // Skip groups that aren't visible (for Mix Your Own Bowl)
      if (isMixYourOwnBowl && !groupsToCheck.includes(group)) {
        continue
      }

      // Check if required and single-selection (radio button)
      if (group.required && !group.multiple) {
        const selectedIndex = selectedOptions.get(i)
        if (selectedIndex === null || selectedIndex === undefined) {
          return false
        }
      }
    }

    return true
  }

  const isAddButtonEnabled = areAllRequiredFieldsSelected()

  // Reset selected option when modal opens
  useEffect(() => {
    if (isOpen) {
      setSelectedOption(null)
      setSelectedExtras([])
      setSelectedOptions(new Map())
      setSelectedExtrasGroups(new Map())
      setSelectedSize(null)
      setQuantity(1)
    }
  }, [isOpen])

  // Clear selections from hidden groups when size changes
  useEffect(() => {
    if (isMixYourOwnBowl && selectedSize) {
      const newSelectedOptions = new Map(selectedOptions)
      const newSelectedExtrasGroups = new Map(selectedExtrasGroups)

      // Clear selections from groups that are no longer visible
      allCustomizationGroups.forEach((group, index) => {
        if (!visibleCustomizationGroups.includes(group)) {
          newSelectedOptions.delete(index)
          newSelectedExtrasGroups.delete(index)
        }
      })

      setSelectedOptions(newSelectedOptions)
      setSelectedExtrasGroups(newSelectedExtrasGroups)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedSize])

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

      // Use combined customization groups
      if (allCustomizationGroups.length > 0) {
        allCustomizationGroups.forEach((group, groupIndex) => {
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
      }
      // Legacy support for old single group format
      else if (item.customizationOptions && !Array.isArray(item.customizationOptions)) {
        // Add selected option price if applicable (radio button)
        if (!item.customizationOptions.multiple && selectedOption !== null) {
          const optionPrice = item.customizationOptions.options[selectedOption].price
          basePrice += optionPrice
        }

        // Add selected extras prices (checkboxes)
        if (item.customizationOptions.multiple && selectedExtras.length > 0) {
          selectedExtras.forEach(index => {
            basePrice += item.customizationOptions!.options[index].price
          })
        }
      }

      const totalPrice = (basePrice * quantity).toFixed(2).replace('.', ',')
      return `${totalPrice} €`
    }
    return item.price
  }

  const handleAddToCart = () => {
    // Use the combined customization groups (handles both customizationOptions and customizationGroups)
    if (allCustomizationGroups.length > 0) {
      // Check if all VISIBLE required fields are selected
      const groupsToValidate = isMixYourOwnBowl ? visibleCustomizationGroups : allCustomizationGroups

      for (let groupIndex = 0; groupIndex < allCustomizationGroups.length; groupIndex++) {
        const group = allCustomizationGroups[groupIndex]

        // Skip validation for hidden groups in Mix Your Own Bowl
        if (isMixYourOwnBowl && !groupsToValidate.includes(group)) {
          continue
        }

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

      allCustomizationGroups.forEach((group, groupIndex) => {
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
      // No customization options - just add to cart with base price
      addToCart({
        name: item.name,
        price: item.price,
        description: item.description,
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
          {(item.bulletPoints && item.bulletPoints.length > 0) || (item.includes && item.includes.length > 0) ? (
            <ul className="text-sm text-gray-600 mb-4 space-y-2">
              {(item.bulletPoints || item.includes || []).map((point: string, index: number) => (
                <li key={index} className="flex items-start">
                  <span className="mr-2">•</span>
                  <span>{point}</span>
                </li>
              ))}
            </ul>
          ) : item.description?.includes('•') ? (
            <ul className="text-sm text-gray-600 mb-4 space-y-2">
              {item.description.split('•').filter((p: string) => p.trim()).map((point: string, index: number) => (
                <li key={index} className="flex items-start">
                  <span className="mr-2">•</span>
                  <span>{point.trim()}</span>
                </li>
              ))}
            </ul>
          ) : item.description ? (
            <p className="text-sm text-gray-600 mb-4">{item.description}</p>
          ) : null}

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
          {visibleCustomizationGroups.length > 0 && (
            <>
              {/* Render visible customization groups (combined legacy + new) */}
              {visibleCustomizationGroups.map((group, groupIndex) => {
                // Find the actual group index in allCustomizationGroups for state management
                const actualGroupIndex = allCustomizationGroups.findIndex(g => g.title === group.title)
                return (
                  <div key={actualGroupIndex} className="mb-6 border-t border-b border-gray-200 py-4">
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
                                  checked={(selectedExtrasGroups.get(actualGroupIndex) || []).includes(index)}
                                  onChange={() => {
                                    const currentExtras = selectedExtrasGroups.get(actualGroupIndex) || []
                                    if (currentExtras.includes(index)) {
                                      const newExtras = currentExtras.filter(i => i !== index)
                                      setSelectedExtrasGroups(new Map(selectedExtrasGroups.set(actualGroupIndex, newExtras)))
                                    } else {
                                      setSelectedExtrasGroups(new Map(selectedExtrasGroups.set(actualGroupIndex, [...currentExtras, index])))
                                    }
                                  }}
                                  className="w-5 h-5 text-[#CC0000] focus:ring-[#CC0000] rounded"
                                />
                              ) : (
                                // Radio button for single selection
                                <input
                                  type="radio"
                                  name={`customization-${actualGroupIndex}`}
                                  checked={selectedOptions.get(actualGroupIndex) === index}
                                  onChange={() => {
                                    setSelectedOptions(new Map(selectedOptions.set(actualGroupIndex, index)))
                                    // Track size selection for Mix Your Own Bowl items (first group)
                                    if (isMixYourOwnBowl && actualGroupIndex === 0) {
                                      setSelectedSize(option.label)
                                    }
                                  }}
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
                )
              })}
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
              disabled={!isAddButtonEnabled}
              className={`flex-1 font-bold py-3 px-6 rounded-full transition-colors text-lg shadow-lg ${
                isAddButtonEnabled
                  ? 'bg-[#CC0000] hover:bg-[#990000] text-white cursor-pointer'
                  : 'bg-gray-300 text-gray-500 cursor-not-allowed'
              }`}
            >
              Hinzufügen {calculateTotalPrice()}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
