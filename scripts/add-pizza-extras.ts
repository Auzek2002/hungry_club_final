import * as dotenv from 'dotenv'
import { resolve } from 'path'
import mongoose from 'mongoose'
import connectDB from '../lib/mongodb'
import MenuItem from '../models/MenuItem'

// Load environment variables
dotenv.config({ path: resolve(__dirname, '../.env') })
dotenv.config({ path: resolve(__dirname, '../.env.local') })

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

async function addPizzaExtras() {
  try {
    console.log('Connecting to database...')
    await connectDB()

    console.log('Finding all Pizza ca.30 cm items...')
    const pizzaItems = await MenuItem.find({
      restaurant: 'PIZZA_TIME',
      section: 'Pizza ca.30 cm'
    })

    console.log(`Found ${pizzaItems.length} pizza items`)

    if (pizzaItems.length === 0) {
      console.log('No pizza items found!')
      return
    }

    console.log('Updating items with Deine Extras group...')

    for (const item of pizzaItems) {
      // Check if customizationGroups already exists
      if (!item.customizationGroups) {
        item.customizationGroups = []
      }

      // Check if "Deine Extras:" group already exists
      const hasDeineExtras = item.customizationGroups.some(
        (group: any) => group.title === 'Deine Extras:'
      )

      if (!hasDeineExtras) {
        // Add the Deine Extras group
        item.customizationGroups.push(deineExtrasGroup as any)
        await item.save()
        console.log(`✓ Updated: ${item.name}`)
      } else {
        console.log(`- Skipped (already has Deine Extras): ${item.name}`)
      }
    }

    console.log('\n✅ Migration completed successfully!')
    console.log(`Updated ${pizzaItems.length} pizza items with "Deine Extras" customization group`)

  } catch (error) {
    console.error('❌ Error during migration:', error)
  } finally {
    await mongoose.connection.close()
    console.log('Database connection closed')
  }
}

// Run the migration
addPizzaExtras()
