import mongoose, { Schema, Model } from 'mongoose'

export interface IMenuItem {
  // Restaurant and section info
  restaurant: string // e.g., 'HIRO_BURGER', 'ANOTHER_RESTAURANT'
  section: string // e.g., 'Burger', 'Fingerfood', 'Loaded Fries'

  // Item details
  name: string
  price: string
  originalPrice?: string
  description: string
  additionalInfo?: string
  image: string
  tags: string[] // e.g., ['Vegetarisch', 'Vegan', 'Scharf']
  includes?: string[] // For menu sets - list of items included

  // Customization options (for burgers, etc.) - supports multiple groups
  customizationOptions?: {
    title: string
    required: boolean
    multiple: boolean
    options: Array<{
      label: string
      price: number
    }>
  }

  // Multiple customization groups (new format)
  customizationGroups?: Array<{
    title: string
    required: boolean
    multiple: boolean
    options: Array<{
      label: string
      price: number
    }>
  }>

  // Display order
  order?: number

  // Active status
  active: boolean

  // Timestamps
  createdAt: Date
  updatedAt: Date
}

const MenuItemSchema = new Schema<IMenuItem>(
  {
    restaurant: {
      type: String,
      required: true,
      index: true,
    },
    section: {
      type: String,
      required: true,
      index: true,
    },
    name: {
      type: String,
      required: true,
    },
    price: {
      type: String,
      required: true,
    },
    originalPrice: {
      type: String,
    },
    description: {
      type: String,
      required: false,
      default: '',
    },
    additionalInfo: {
      type: String,
    },
    image: {
      type: String,
      default: '',
    },
    tags: {
      type: [String],
      default: [],
    },
    includes: {
      type: [String],
      default: [],
    },
    customizationOptions: {
      title: { type: String },
      required: { type: Boolean },
      multiple: { type: Boolean },
      options: [{
        label: { type: String },
        price: { type: Number },
      }],
    },
    customizationGroups: [{
      title: { type: String },
      required: { type: Boolean },
      multiple: { type: Boolean },
      options: [{
        label: { type: String },
        price: { type: Number },
      }],
    }],
    order: {
      type: Number,
      default: 0,
    },
    active: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
    collection: 'menuitems',
  }
)

// Create compound index for restaurant + section
MenuItemSchema.index({ restaurant: 1, section: 1 })

// Delete existing model to ensure schema updates are applied
if (mongoose.models.MenuItem) {
  delete mongoose.models.MenuItem
}

const MenuItem: Model<IMenuItem> = mongoose.model<IMenuItem>('MenuItem', MenuItemSchema)

export default MenuItem
