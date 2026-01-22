import mongoose, { Schema, Model } from 'mongoose'

export interface IReservation {
  // Reservation details
  reservationNumber: string
  status: 'pending' | 'confirmed' | 'cancelled' | 'completed'

  // Customer information
  name: string
  email: string
  phone: string

  // Reservation specifics
  date: string
  time: string
  guests: number

  // Timestamps
  createdAt: Date
  updatedAt: Date
}

const ReservationSchema = new Schema<IReservation>(
  {
    reservationNumber: {
      type: String,
      unique: true,
    },
    status: {
      type: String,
      enum: ['pending', 'confirmed', 'cancelled', 'completed'],
      default: 'pending',
    },
    name: {
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
    date: {
      type: String,
      required: true,
    },
    time: {
      type: String,
      required: true,
    },
    guests: {
      type: Number,
      required: true,
      min: 1,
      max: 20,
    },
  },
  {
    timestamps: true,
    collection: 'reservations',
  }
)

// Generate reservation number
ReservationSchema.pre('save', async function(next) {
  if (!this.reservationNumber) {
    try {
      // Use the model from this schema's model
      const ReservationModel = this.constructor as Model<IReservation>
      const date = new Date()
      const dateStr = date.toISOString().slice(0, 10).replace(/-/g, '')

      // Find the highest reservation number for today to avoid race conditions
      const lastReservation = await ReservationModel.findOne({
        reservationNumber: { $regex: `^RES-${dateStr}-` }
      }).sort({ reservationNumber: -1 }).limit(1)

      let nextNumber = 1
      if (lastReservation && lastReservation.reservationNumber) {
        // Extract the number from the last reservation (e.g., "RES-20260120-0003" -> 3)
        const lastNumber = parseInt(lastReservation.reservationNumber.split('-')[2])
        nextNumber = lastNumber + 1
      }

      this.reservationNumber = `RES-${dateStr}-${String(nextNumber).padStart(4, '0')}`
    } catch (error) {
      console.error('Error generating reservation number:', error)
      // Fallback to timestamp-based unique number to avoid duplicates
      const date = new Date()
      const dateStr = date.toISOString().slice(0, 10).replace(/-/g, '')
      const timestamp = Date.now().toString().slice(-4)
      const random = Math.floor(Math.random() * 100).toString().padStart(2, '0')
      this.reservationNumber = `RES-${dateStr}-${timestamp}${random}`
    }
  }
  next()
})

// Delete existing model to ensure schema updates are applied
if (mongoose.models.Reservation) {
  delete mongoose.models.Reservation
}

const Reservation: Model<IReservation> = mongoose.model<IReservation>('Reservation', ReservationSchema)

export default Reservation
