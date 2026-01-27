require('dotenv').config({ path: './.env' })
require('dotenv').config({ path: './.env.local' })

const mongoose = require('mongoose')

const MONGODB_URI = process.env.MONGO_DB_CONNECTION_STRING

console.log('🚀 Starting migration script...')
console.log('MongoDB URI exists:', !!MONGODB_URI)

const deineExtrasGroup = {
  title: 'Deine Extras:',
  required: false,
  multiple: true,
  options: [
    { label: 'mit Pinienkernen', price: 1.50 },
    { label: 'mit Feta', price: 2.50 },
    { label: 'mit Sesam', price: 1.00 },
    { label: 'mit Peperoni', price: 2.00 },
    { label: 'mit Spargel', price: 2.00 },
    { label: 'mit Prosciutto Cotto', price: 3.50 },
    { label: 'mit Kapern', price: 2.00 },
    { label: 'mit Rinderhackfleisch', price: 4.00 },
    { label: 'mit Ei', price: 3.00 },
    { label: 'mit Parmesan', price: 2.50 },
    { label: 'mit Chiliöl', price: 1.00 },
    { label: 'mit Gorgonzola', price: 2.50 },
    { label: 'mit Lachs', price: 5.00 },
    { label: 'mit Falafel', price: 3.50 },
    { label: 'mit Peperoni-Salami', price: 3.50 },
    { label: 'mit Champignons', price: 2.00 },
    { label: 'mit Thunfisch', price: 3.50 },
    { label: 'mit Cheddar', price: 2.50 },
    { label: 'mit Parmaschinken', price: 4.00 },
    { label: 'mit Kimchi', price: 3.00 },
    { label: 'mit Rosmarin', price: 1.50 },
    { label: 'mit Petersilie', price: 1.00 },
    { label: 'mit Frühlingszwiebeln', price: 1.50 },
    { label: 'mit Mozzarella', price: 2.00 },
    { label: 'mit Koriander', price: 1.00 },
    { label: 'mit Artischocken', price: 2.00 },
    { label: 'mit Rucola', price: 2.00 },
    { label: 'mit Creme fraiche', price: 2.50 },
    { label: 'mit Ananas', price: 2.00 },
    { label: 'mit Knoblauch', price: 1.00 },
    { label: 'mit Cashewnüssen', price: 1.50 },
    { label: 'mit Crispy Chicken', price: 4.00 },
    { label: 'mit Bacon', price: 3.50 },
    { label: 'mit Räucherlachs', price: 4.00 },
    { label: 'mit Kirschtomaten', price: 2.00 },
    { label: 'mit Trüffelöl', price: 1.50 },
    { label: 'mit Röstzwiebeln', price: 1.50 },
    { label: 'mit Hähnchenstreifen', price: 3.50 },
    { label: 'mit Pancetta', price: 3.50 },
    { label: 'mit Bolognese', price: 3.00 },
    { label: 'mit Zucchini', price: 2.00 },
    { label: 'mit Avocado', price: 2.00 },
    { label: 'mit Spinat', price: 2.00 },
    { label: 'mit Wasabinüssen', price: 1.50 },
    { label: 'mit Würstchenscheiben', price: 3.50 },
    { label: 'mit Zwiebeln', price: 1.50 },
    { label: 'mit Mango-Currysauce', price: 2.00 },
    { label: 'mit Eisbergsalat', price: 2.00 },
    { label: 'mit Garnelen', price: 4.00 },
    { label: 'mit Basilikum', price: 1.00 },
    { label: 'mit Mozzarella-Kugeln', price: 2.50 },
    { label: 'mit Salami', price: 3.50 },
    { label: 'mit Oliven', price: 2.00 },
    { label: 'mit Gewürzgurken', price: 2.00 },
    { label: 'mit Teriyaki-Hähnchen', price: 3.50 },
    { label: 'mit Mais', price: 2.00 },
    { label: 'mit Pesto', price: 1.50 },
    { label: 'mit Broccoli', price: 2.00 },
    { label: 'mit Erdnüssen', price: 1.50 },
    { label: 'mit Walnüssen', price: 2.00 },
    { label: 'mit Bohnen', price: 2.00 },
    { label: 'mit Teriyakisauce', price: 2.00 },
    { label: 'mit Gurken', price: 2.00 },
    { label: 'mit Sardellen', price: 3.50 },
    { label: 'mit Paprika', price: 2.00 },
    { label: 'mit Büffelmozzarella', price: 2.50 },
    { label: 'mit Chicken Nuggets', price: 4.00 },
    { label: 'mit Oregano', price: 1.00 },
    { label: 'mit Chili-Honey-Mayonnaise', price: 2.00 },
    { label: 'mit Granatapfel', price: 2.00 },
    { label: 'mit Guacamole', price: 3.00 }
  ]
}

console.log(`Total extras in group: ${deineExtrasGroup.options.length}`)

const MenuItemSchema = new mongoose.Schema({
  restaurant: { type: String, required: true, index: true },
  section: { type: String, required: true, index: true },
  name: { type: String, required: true },
  price: { type: String, required: true },
  originalPrice: { type: String },
  description: { type: String, required: false, default: '' },
  additionalInfo: { type: String },
  image: { type: String, default: '' },
  tags: { type: [String], default: [] },
  includes: { type: [String], default: [] },
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
  order: { type: Number, default: 0 },
  active: { type: Boolean, default: true },
}, {
  timestamps: true,
  collection: 'menuitems',
})

// Delete existing model to ensure schema updates are applied
if (mongoose.models.MenuItem) {
  delete mongoose.models.MenuItem
}

const MenuItem = mongoose.model('MenuItem', MenuItemSchema)

async function addPizzaExtras() {
  try {
    if (!MONGODB_URI) {
      console.error('❌ MONGO_DB_CONNECTION_STRING not found in environment variables')
      process.exit(1)
    }

    console.log('Connecting to database...')
    await mongoose.connect(MONGODB_URI, {
      bufferCommands: false,
      serverSelectionTimeoutMS: 10000,
      socketTimeoutMS: 45000,
    })
    console.log('✅ Connected to MongoDB')

    console.log('Finding all Pizza ca.30 cm items...')
    const pizzaItems = await MenuItem.find({
      restaurant: 'PIZZA_TIME',
      section: 'Pizza ca.30 cm'
    })

    console.log(`Found ${pizzaItems.length} pizza items`)

    if (pizzaItems.length === 0) {
      console.log('⚠️  No pizza items found!')
      await mongoose.connection.close()
      return
    }

    console.log('Updating items with Deine Extras group...')
    let updatedCount = 0
    let skippedCount = 0

    for (const item of pizzaItems) {
      // Initialize customizationGroups if it doesn't exist
      if (!item.customizationGroups) {
        item.customizationGroups = []
      }

      // Check if "Deine Extras:" group already exists
      const hasDeineExtras = item.customizationGroups.some(
        group => group.title === 'Deine Extras:'
      )

      if (!hasDeineExtras) {
        // Add the Deine Extras group
        item.customizationGroups.push(deineExtrasGroup)
        await item.save()
        updatedCount++
        console.log(`✓ Updated: ${item.name}`)
      } else {
        skippedCount++
        console.log(`- Skipped (already has Deine Extras): ${item.name}`)
      }
    }

    console.log('\n✅ Migration completed successfully!')
    console.log(`Updated: ${updatedCount} items`)
    console.log(`Skipped: ${skippedCount} items`)
    console.log(`Total: ${pizzaItems.length} items`)

  } catch (error) {
    console.error('❌ Error during migration:', error)
    process.exit(1)
  } finally {
    await mongoose.connection.close()
    console.log('Database connection closed')
    process.exit(0)
  }
}

// Run the migration
addPizzaExtras()
