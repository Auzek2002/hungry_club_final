import mongoose, { Schema, Model } from 'mongoose'

export interface IOrder {
  // Order details
  orderNumber: string
  status: 'pending' | 'confirmed' | 'preparing' | 'ready' | 'out-for-delivery' | 'completed' | 'cancelled'

  // Customer information
  fullName: string
  email: string
  phone: string

  // Delivery information
  deliveryType: 'delivery' | 'pickup'
  streetAddress?: string
  city?: string
  postalCode?: string

  // Order specifics
  timeOption: 'standard' | 'express' | 'immediate'
  scheduledTime?: string
  remarks?: string

  // Payment
  paymentMethod: 'stripe' | 'cash'
  paymentStatus: 'pending' | 'paid' | 'failed'
  stripeSessionId?: string

  // Pricing
  totalAmount: number
  currency: string

  // Cart items - essential data only
  items: Array<{
    name: string
    price: string
    quantity: number
  }>

  // Timestamps
  createdAt: Date
  updatedAt: Date
  completedAt?: Date
}

const OrderSchema = new Schema<IOrder>(
  {
    orderNumber: {
      type: String,
      unique: true,
    },
    status: {
      type: String,
      enum: ['pending', 'confirmed', 'preparing', 'ready', 'out-for-delivery', 'completed', 'cancelled'],
      default: 'pending',
    },
    fullName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
      required: true,
    },
    deliveryType: {
      type: String,
      enum: ['delivery', 'pickup'],
      required: true,
    },
    streetAddress: {
      type: String,
      required: function(this: IOrder) {
        return this.deliveryType === 'delivery'
      },
    },
    city: {
      type: String,
      required: function(this: IOrder) {
        return this.deliveryType === 'delivery'
      },
    },
    postalCode: {
      type: String,
    },
    timeOption: {
      type: String,
      enum: ['standard', 'express', 'immediate'],
      required: true,
    },
    scheduledTime: {
      type: String,
    },
    remarks: {
      type: String,
    },
    paymentMethod: {
      type: String,
      enum: ['stripe', 'cash'],
      required: true,
    },
    paymentStatus: {
      type: String,
      enum: ['pending', 'paid', 'failed'],
      default: 'pending',
    },
    stripeSessionId: {
      type: String,
    },
    totalAmount: {
      type: Number,
      required: true,
    },
    currency: {
      type: String,
      default: 'EUR',
    },
    items: [{
      name: { type: String, required: true },
      price: { type: String, required: true },
      quantity: { type: Number, required: true },
    }],
    completedAt: {
      type: Date,
    },
  },
  {
    timestamps: true,
    collection: 'hungryclub',
  }
)

// Generate order number
OrderSchema.pre('save', async function(next) {
  if (!this.orderNumber) {
    try {
      // Use the model from this schema's model
      const OrderModel = this.constructor as Model<IOrder>
      const count = await OrderModel.countDocuments()
      const date = new Date()
      const dateStr = date.toISOString().slice(0, 10).replace(/-/g, '')
      this.orderNumber = `HC-${dateStr}-${String(count + 1).padStart(4, '0')}`
    } catch (error) {
      console.error('Error generating order number:', error)
      // Fallback order number
      const date = new Date()
      const dateStr = date.toISOString().slice(0, 10).replace(/-/g, '')
      const random = Math.floor(Math.random() * 10000)
      this.orderNumber = `HC-${dateStr}-${String(random).padStart(4, '0')}`
    }
  }
  next()
})

// Delete existing model to ensure schema updates are applied
if (mongoose.models.Order) {
  delete mongoose.models.Order
}

const Order: Model<IOrder> = mongoose.model<IOrder>('Order', OrderSchema)

export default Order
