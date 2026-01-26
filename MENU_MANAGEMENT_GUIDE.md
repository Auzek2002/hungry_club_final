# Menu Management System - Setup & Usage Guide

## Overview
You can now manage all restaurant menu items directly from the admin panel! No more editing code to update prices, descriptions, or add new items.

## Setup Instructions

### Step 1: Run the Migration (ONE TIME ONLY)

1. Start your development server:
```bash
npm run dev
```

2. Visit the migration page in your browser:
```
http://localhost:3000/migrate-menu
```

3. **If you see a message about existing items:**
   - Click the **"Clear Database"** button first
   - Confirm the deletion
   - Wait for the success message

4. Click the **"Run Migration"** button
   - This will move all 35 hard-coded menu items from HIRO BURGER into your MongoDB database
   - You should see a success message showing how many items were migrated

5. **Important:** Only run this migration ONCE. After the initial migration, manage all items from the admin panel.

### Step 2: Access the Admin Panel

1. Go to your admin dashboard:
```
http://localhost:3000/admin
```

2. Click on the **"Menu Items"** tab (third tab after Orders and Reservations)

3. You should see all your menu items organized by restaurant and section

## Using the Menu Management System

### View Menu Items

- **Filter by Restaurant**: Select a restaurant from the dropdown (currently only HIRO_BURGER)
- **Filter by Section**: Select a section (Burger, Fingerfood, Mac & Cheese, etc.)
- Items are displayed grouped by restaurant and section

### Add New Menu Item

1. Click the **"+ Add New Item"** button
2. Fill in the form:
   - **Restaurant**: Name of the restaurant (e.g., HIRO_BURGER)
   - **Section**: Category (e.g., Burger, Fingerfood, Saucen)
   - **Name**: Item name
   - **Price**: Price with currency (e.g., "9,90 €")
   - **Original Price** (optional): For showing discounts
   - **Description**: Full description of the item
   - **Image Path**: Path to the image (e.g., "/HIRO BURGER/item.webp")
   - **Tags**: Comma-separated tags (e.g., "Vegetarisch, Scharf")
   - **Active**: Check to make it visible on the website
   - **Customization Options** (optional): See below for details
3. Click **"Add Item"**

### Manage Customization Options (Burger Extras)

Customization options allow customers to add extras to items (like burger toppings). Perfect for burgers!

**To Add Customizations:**
1. When editing/adding an item, click **"Add Customizations"** button
2. Configure the options:
   - **Title**: Display text (e.g., "Deine Extras:")
   - **Required**: Check if customer must select at least one
   - **Multiple**: Check if customer can select multiple options
3. Click **"+ Add Option"** to add each extra:
   - **Label**: Name of the extra (e.g., "mit Guacamole")
   - **Price**: Additional cost (e.g., 2.00 for €2.00)
4. Add as many options as needed
5. Click **✕** to remove an option
6. Click **"Remove Customizations"** to delete all customizations

**Example:** For a burger with extras:
- Title: "Deine Extras:"
- Multiple: ✓ (customers can select multiple)
- Options:
  - "mit Guacamole" - 2.00
  - "mit Bacon, gegrillt" - 2.00
  - "mit Cheddarscheibe, Irish" - 1.50

### Manage Multiple Customization Groups (Advanced)

**NEW!** You can now create multiple independent customization categories for a single item!

**Perfect for:**
- Burgers with separate categories for toppings, bread type, and size
- Pizzas with base, toppings, and extra cheese options
- Drinks with size, ice, and add-ons

**How to Use:**
1. When editing/adding an item, scroll to **"Customization Groups (Advanced)"**
2. Click **"+ Add Group"** for each category you want
3. For each group:
   - **Group Title**: Name the category (e.g., "Wähle dein Bun", "Patty-Größe")
   - **Required**: Check if customer must select from this group
   - **Multiple**: Check if customer can select multiple options
   - **+ Add Option**: Add choices within this group
   - **Delete Group**: Remove the entire group

**Example: Premium Burger with Multiple Groups**

**Group 1: "Deine Extras"** (Multiple: ✓)
- mit Guacamole - 2.00
- mit Bacon, gegrillt - 2.00
- mit Cheddarscheibe, Irish - 1.50

**Group 2: "Wähle dein Bun"** (Required: ✓)
- Classic Sesame Bun - 0.00
- Brioche Bun - 1.00
- Glutenfrei Bun - 1.50

**Group 3: "Patty-Größe"** (Required: ✓)
- Single (150g) - 0.00
- Double (300g) - 3.00
- Triple (450g) - 6.00

Each group appears as a separate selection on the order page!

### Edit Menu Item

1. Find the item you want to edit
2. Click the **"Edit"** button
3. Modify any fields you want to change
4. Click **"Update Item"**

### Delete Menu Item

1. Find the item you want to delete
2. Click the **"Delete"** button
3. Confirm the deletion

### Activate/Deactivate Menu Item

- Click the **"Deactivate"** button to hide an item from the website (without deleting it)
- Click the **"Activate"** button to show it again

## How It Works

### Before (Hard-coded)
Menu items were defined in code at:
- `app/HIRO_BURGER/page.tsx` (lines 154-642)

To change a price or add an item, you had to:
1. Edit the code
2. Restart the server
3. Risk introducing bugs

### After (Database-driven)
Menu items are stored in MongoDB:
- Collection: `menuitems`
- Admin panel provides a user-friendly interface
- Changes appear instantly on the website
- No code changes needed

## Restaurant Page Updates

The HIRO BURGER page now:
- Fetches menu items from the database on load
- Only shows **active** items
- Updates item counts dynamically
- Shows a loading spinner while fetching data

## Database Schema

Each menu item has:
```typescript
{
  restaurant: string        // e.g., "HIRO_BURGER"
  section: string          // e.g., "Burger", "Fingerfood"
  name: string             // Item name
  price: string            // e.g., "9,90 €"
  originalPrice?: string   // Optional, for discounts
  description: string      // Full description
  image: string            // Image path
  tags: string[]           // ["Vegetarisch", "Scharf", etc.]

  // Legacy single customization (still supported)
  customizationOptions?: {
    title: string
    required: boolean
    multiple: boolean
    options: Array<{
      label: string
      price: number
    }>
  }

  // NEW: Multiple customization groups
  customizationGroups?: Array<{
    title: string
    required: boolean
    multiple: boolean
    options: Array<{
      label: string
      price: number
    }>
  }>

  order?: number           // Display order
  active: boolean          // Visibility flag
  createdAt: Date
  updatedAt: Date
}
```

## API Endpoints

The system uses these API routes:

- `GET /api/menu-items` - Get all menu items (with filters)
- `GET /api/menu-items/:id` - Get single item
- `POST /api/menu-items` - Create new item
- `PATCH /api/menu-items/:id` - Update item
- `DELETE /api/menu-items/:id` - Delete item

## Files Modified/Created

### New Files
- `models/MenuItem.ts` - MongoDB schema
- `app/api/menu-items/route.ts` - GET/POST endpoints
- `app/api/menu-items/[id]/route.ts` - GET/PATCH/DELETE endpoints
- `app/api/migrate-menu/route.ts` - Migration endpoint
- `app/migrate-menu/page.tsx` - Migration UI
- `app/components/MenuItemsManager.tsx` - Admin panel component
- `scripts/migrate-menu-items.ts` - Migration data

### Modified Files
- `app/admin/page.tsx` - Added Menu Items tab
- `app/HIRO_BURGER/page.tsx` - Now fetches from database

## Troubleshooting

### Migration fails with "Database already has X items"
- The migration has already been run
- You can clear the database using the "Clear Database" button on the migration page
- Then run the migration again

### Items not showing on restaurant page
- Check that items are marked as **active** in the admin panel
- Verify the **restaurant** field matches exactly: "HIRO_BURGER"
- Check browser console for any errors

### Changes not appearing
- Hard refresh the page (Ctrl+F5 or Cmd+Shift+R)
- Check that the item is marked as active

## Next Steps

You can:
1. Add more restaurants by creating menu items with different restaurant names
2. Create new sections for each restaurant
3. Upload custom images to the `/public` folder
4. Customize the admin panel further if needed

## Support

If you encounter any issues:
1. Check the browser console for errors
2. Check the terminal/server logs
3. Verify your MongoDB connection string in `.env.local`
