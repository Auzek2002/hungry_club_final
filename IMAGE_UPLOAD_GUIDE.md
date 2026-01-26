# Image Upload Guide for Admin Panel

## How to Upload Images for Menu Items

When adding or editing menu items in the admin panel at `/admin`, you now have **two options** for adding images:

### Option 1: Upload Image (Recommended)

1. **Navigate to Admin Panel**: Go to http://localhost:3000/admin
2. **Click "Add New Item"** or **Edit an existing item**
3. **Scroll to the Image section**
4. **Click "📁 Choose Image to Upload"**
5. **Select an image file** from your computer (JPG, PNG, WEBP, etc.)
6. **Wait for upload** - You'll see "Uploading..." while the file is being uploaded
7. **Preview appears** - Once uploaded, you'll see a preview of the image
8. **Save the item** - Click "Save" to complete

**Image Requirements:**
- Maximum file size: 5MB
- Supported formats: JPG, PNG, WEBP, GIF
- Recommended: WEBP format for best performance

### Option 2: Manual Path Entry

If you already have images in the `public` folder, you can manually enter the path:

1. **Place your image** in the appropriate folder under `public/`
   - For example: `public/HIRO BURGER/My Burger.webp`
2. **Enter the path** in the text input field:
   - Format: `/HIRO BURGER/My Burger.webp`
   - Note: Path starts with `/` and includes the restaurant folder name

## Image Organization

Uploaded images are automatically organized by restaurant:

```
public/
├── HIRO BURGER/
│   ├── item1.webp
│   └── item2.webp
├── TOSHI SUSHI/
│   ├── item1.webp
│   └── item2.webp
├── BOWLICIOUS/
├── PIZZA TIME/
├── LOS TACOS/
├── DRINKS/
└── DESSERTS/
```

## How the Upload System Works

1. **Admin selects file** → File is read from user's computer
2. **Upload to server** → File is sent to `/api/upload` endpoint
3. **File validation** → Server checks file type and size
4. **Create folder** → Creates restaurant folder if it doesn't exist
5. **Save file** → Saves to `public/[RESTAURANT]/[filename]`
6. **Return URL** → Server returns the public URL path
7. **Update form** → Image path is automatically filled in

## Tips

- **Use descriptive filenames**: Name your images clearly (e.g., "Cheeseburger.webp" instead of "img123.webp")
- **Optimize before upload**: Compress images before uploading for better performance
- **Consistent naming**: Use the same naming convention as existing items
- **Test the upload**: After uploading, save the item and view it on the menu page to verify the image appears correctly

## Troubleshooting

**Image not uploading?**
- Check file size is under 5MB
- Ensure file is an image format (JPG, PNG, WEBP, etc.)
- Check browser console for error messages

**Image not showing after upload?**
- Verify the image path is correct
- Make sure the restaurant name in the path matches your item's restaurant
- Try refreshing the page

**Upload button disabled?**
- An upload is currently in progress, please wait
- Refresh the page if stuck

## Example: Adding a New Burger with Image

1. Click "Add New Item"
2. Fill in:
   - Restaurant: `HIRO_BURGER`
   - Section: `Burger`
   - Name: `Triple Cheese Deluxe`
   - Price: `12,90 €`
   - Description: `Three beef patties with melted cheese...`
3. **Upload Image**:
   - Click "📁 Choose Image to Upload"
   - Select `triple-cheese.webp` from your computer
   - Wait for upload to complete
   - See preview appear
4. Add tags: `Beliebt`
5. Check "Active"
6. Click "Save"

The image will now appear at `/HIRO BURGER/triple-cheese.webp` and be visible on the menu!
