const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, 'bowlicious-data.ts');

// Standard bowl customization groups
const standardCustomization = `[
      {
        title: 'Deine Base:',
        required: true,
        multiple: false,
        options: [
          { label: 'mit Couscous', price: 0 },
          { label: 'mit Jasminreis', price: 0 },
          { label: 'mit Salat-Mix', price: 0 },
          { label: 'mit Sushireis', price: 0 }
        ]
      },
      {
        title: 'Deine Extras - Proteine:',
        required: false,
        multiple: true,
        options: [
          { label: 'mit Lachs', price: 2.90 },
          { label: 'mit Tofu', price: 1.90 },
          { label: 'mit Räucherlachs', price: 2.90 },
          { label: 'mit Thunfisch', price: 3.90 },
          { label: 'mit Crispy Chicken', price: 2.90 },
          { label: 'mit Ei, gekocht', price: 1.90 },
          { label: 'mit Teriyaki Hähnchen', price: 2.90 },
          { label: 'mit Black Tiger Shrimps', price: 2.90 },
          { label: 'mit Ebi Tempura Garnelen', price: 3.90 },
          { label: 'mit Falafel', price: 2.90 },
          { label: 'mit Ente, knusprig', price: 5.90 }
        ]
      },
      {
        title: 'Deine Extras - Mix Ins:',
        required: false,
        multiple: true,
        options: [
          { label: 'mit Edamame', price: 0.80 },
          { label: 'mit Zwiebeln, rot', price: 0.80 },
          { label: 'mit Tomaten-Salsa', price: 1.50 },
          { label: 'mit Tamago Omelette', price: 0.80 },
          { label: 'mit Paprika', price: 0.80 },
          { label: 'mit Nam Salat, vietnamesisch', price: 0.80 },
          { label: 'mit Mozzarella-Kugel', price: 0.80 },
          { label: 'mit Salat-Mix', price: 0.80 },
          { label: 'mit Broccoli', price: 0.80 },
          { label: 'mit Zucchini', price: 0.80 },
          { label: 'mit Surimi', price: 1.50 },
          { label: 'mit Kirschtomaten', price: 0.80 },
          { label: 'mit Rotkohl', price: 0.80 },
          { label: 'mit Rote Beete', price: 0.80 },
          { label: 'mit Mais', price: 0.80 },
          { label: 'mit Avocado', price: 1.50 },
          { label: 'mit Champignons, gebraten', price: 0.80 },
          { label: 'mit Spargel, mit', price: 0.80 },
          { label: 'mit Wakame Salat', price: 1.50 },
          { label: 'mit Sojasprossen', price: 0.80 },
          { label: 'mit Mango', price: 0.80 },
          { label: 'mit Gurken', price: 0.80 },
          { label: 'mit Guacamole', price: 1.50 }
        ]
      },
      {
        title: 'Deine Extras - Toppings:',
        required: false,
        multiple: true,
        options: [
          { label: 'mit Mozzarella', price: 0.50 },
          { label: 'mit Erdnüssen', price: 0.40 },
          { label: 'mit Röstzwiebeln', price: 0.40 },
          { label: 'mit Sesam', price: 0.40 },
          { label: 'mit Kokos-Chips', price: 0.50 },
          { label: 'mit Radieschen', price: 0.40 },
          { label: 'mit Tobiko (Fischrogen)', price: 0.40 },
          { label: 'mit Sushi-Ingwer', price: 0.40 },
          { label: 'mit Peperoni', price: 0.40 },
          { label: 'mit Lauchzwiebeln', price: 0.40 },
          { label: 'mit Cashewnüssen', price: 0.50 },
          { label: 'mit Parmesan', price: 0.90 },
          { label: 'mit Koriander', price: 0.40 },
          { label: 'mit Wasabinüssen', price: 0.50 },
          { label: 'mit Seealgen-Streifen', price: 0.40 },
          { label: 'mit Mandeln', price: 0.40 }
        ]
      },
      {
        title: 'Deine 1. Sauce:',
        required: true,
        multiple: false,
        options: [
          { label: 'Teriyakisauce', price: 0 },
          { label: 'Hausgemachte Bowlsauce', price: 0 },
          { label: 'Erdnusssauce', price: 0 },
          { label: 'Sesamsauce', price: 0 },
          { label: 'Chili-Honey-Mayonnaise', price: 0 },
          { label: 'Trüffel-Mayonnaise', price: 0 },
          { label: 'Koreansauce', price: 0 },
          { label: 'ohne Sauce', price: 0 }
        ]
      },
      {
        title: 'Deine 2. Sauce:',
        required: true,
        multiple: false,
        options: [
          { label: 'ohne weitere Sauce', price: 0 },
          { label: 'Koreansauce', price: 0 },
          { label: 'Chili-Honey-Mayonnaise', price: 0 },
          { label: 'Sesamsauce', price: 0 },
          { label: 'Teriyakisauce', price: 0 },
          { label: 'Erdnusssauce', price: 0 },
          { label: 'Trüffel-Mayonnaise', price: 0 },
          { label: 'Hausgemachte Bowlsauce', price: 0 }
        ]
      }
    ]`;

// Read current file
const content = fs.readFileSync(filePath, 'utf8');

// Find the last closing bracket
const lastBracket = content.lastIndexOf(']');

// Content to insert before the closing bracket
const additionalItems = `
  {
    restaurant: 'BOWLICIOUS',
    section: "Frischetheke's Favourite Bowls",
    name: 'Tuna Bowl',
    price: '13,90 €',
    description: 'mit Thunfisch, Wakame Salat, Gurken, Edamame, Tomaten-Salsa, Avocado, Tobiko, Lauchzwiebeln, Sesam, Sushi-Ingwer',
    image: '/BOWLICIOUS/Tuna Bowl.webp',
    tags: [],
    customizationGroups: ${standardCustomization},
    order: 2,
    active: true,
  },
  {
    restaurant: 'BOWLICIOUS',
    section: "Frischetheke's Favourite Bowls",
    name: 'Yakitori Chicken Bowl',
    price: '12,90 €',
    description: 'mit Yakitori Hähnchen, Gurken, Mais, Paprika, Avocado, Tomaten-Salsa, Röstzwiebeln, Erdnüssen, Lauchzwiebeln, Sesam',
    image: '/BOWLICIOUS/Yakitori Chicken Bowl.webp',
    tags: [],
    customizationGroups: ${standardCustomization},
    order: 3,
    active: true,
  },
  {
    restaurant: 'BOWLICIOUS',
    section: "Frischetheke's Favourite Bowls",
    name: 'Veggie Tofu Bowl',
    price: '12,90 €',
    description: 'mit Tofu, Blattspinat, Broccoli, Mais, gebratenen Champignons, Gurken, Tomaten-Salsa, Guacamole, Sesam, Erdnüssen',
    image: '/BOWLICIOUS/Veggie Tofu Bowl.webp',
    tags: ['Vegetarisch'],
    customizationGroups: ${standardCustomization},
    order: 4,
    active: true,
  },
  {
    restaurant: 'BOWLICIOUS',
    section: "Frischetheke's Favourite Bowls",
    name: 'Baked Shrimp Bowl',
    price: '14,90 €',
    description: 'mit Ebi Tempura Garnelen, Gurken, Avocado, Edamame, Tomaten-Salsa, Rote Beete, Omelette, Lauchzwiebeln, Sesam, Erdnüssen, Koriander',
    image: '/BOWLICIOUS/Baked Shrimp Bowl.webp',
    tags: [],
    customizationGroups: ${standardCustomization},
    order: 5,
    active: true,
  },
  {
    restaurant: 'BOWLICIOUS',
    section: "Frischetheke's Favourite Bowls",
    name: 'Falafel Bowl',
    price: '12,90 €',
    description: 'mit Falafel, Tomaten-Salsa, Gurken, Avocado, Paprika, Edamame, Rote Beete, Cashewnüsse, Sesam, Koriander',
    image: '/BOWLICIOUS/Falafel Bowl.webp',
    tags: ['Vegetarisch'],
    customizationGroups: ${standardCustomization},
    order: 6,
    active: true,
  },
  {
    restaurant: 'BOWLICIOUS',
    section: "Frischetheke's Favourite Bowls",
    name: 'Duck Bowl',
    price: '16,90 €',
    description: 'mit knuspriger Ente, Gurken, Mais, Avocado, gebratenen Champignons, Paprika, Broccoli, Tomaten-Salsa, Sesam, Cashewnüsse, Lauchzwiebeln, Roten Zwiebeln',
    image: '/BOWLICIOUS/Duck Bowl.webp',
    tags: [],
    customizationGroups: ${standardCustomization},
    order: 7,
    active: true,
  },
  {
    restaurant: 'BOWLICIOUS',
    section: "Frischetheke's Favourite Bowls",
    name: 'Chef Bowl',
    price: '16,90 €',
    description: 'mit Lachs, Ebi Tempura Garnelen, Tomaten-Salsa, Gurken, Guacamole, Mais, Kim Chi, Rote Beete, Salat-Mix, vietnamesischem Nom Salat, Mango, Sesam, Lauchzwiebeln, Cashewnüsse',
    image: '/BOWLICIOUS/Chef Bowl.webp',
    tags: [],
    customizationGroups: ${standardCustomization},
    order: 8,
    active: true,
  },

  // Sashimi Section
  {
    restaurant: 'BOWLICIOUS',
    section: 'Sashimi',
    name: 'Lachs Sashimi (5 Stück)',
    price: '12,90 €',
    description: 'mit Sushireis serviert',
    image: '/BOWLICIOUS/Lachs Sashimi (5 Stück).webp',
    tags: [],
    order: 1,
    active: true,
  },
  {
    restaurant: 'BOWLICIOUS',
    section: 'Sashimi',
    name: 'Tuna Sashimi (5 Stück)',
    price: '14,90 €',
    description: 'mit Sushireis serviert',
    image: '/BOWLICIOUS/Tuna Sashimi (5 Stück).webp',
    tags: [],
    order: 2,
    active: true,
  },

  // Saucen Section
  {
    restaurant: 'BOWLICIOUS',
    section: 'Saucen',
    name: 'Hauseigene Bowlsauce (empfohlen)',
    price: '2,50 €',
    description: 'würzige Sojasoße mit einem Mix von Unagisauce',
    image: '/BOWLICIOUS/Hauseigene Bowlsauce (empfohlen).webp',
    tags: [],
    order: 1,
    active: true,
  },
  {
    restaurant: 'BOWLICIOUS',
    section: 'Saucen',
    name: 'Chili-Honey-Mayo (empfohlen)',
    price: '2,50 €',
    description: 'Chilimayonnaise verfeinert mit Honig',
    image: '/BOWLICIOUS/Chili-Honey-Mayo (empfohlen).webp',
    tags: [],
    order: 2,
    active: true,
  },
  {
    restaurant: 'BOWLICIOUS',
    section: 'Saucen',
    name: 'Sesamsauce',
    price: '2,50 €',
    description: 'herzhaftes und nussiges Geschmacksprofil',
    image: '/BOWLICIOUS/Sesamsauce.webp',
    tags: [],
    order: 3,
    active: true,
  },
  {
    restaurant: 'BOWLICIOUS',
    section: 'Saucen',
    name: 'Teriyakisauce',
    price: '2,50 €',
    description: 'klassische japanische Sojasauce',
    image: '/BOWLICIOUS/Teriyakisauce.webp',
    tags: [],
    order: 4,
    active: true,
  },
  {
    restaurant: 'BOWLICIOUS',
    section: 'Saucen',
    name: 'Erdnusssauce',
    price: '2,50 €',
    description: 'cremige Erdnussbutter mit Kokosmilch',
    image: '/BOWLICIOUS/Erdnusssauce.webp',
    tags: [],
    order: 5,
    active: true,
  },
  {
    restaurant: 'BOWLICIOUS',
    section: 'Saucen',
    name: 'Trüffel-Mayonnaise',
    price: '2,50 €',
    description: 'leicht cremige Mayonnaise mit edlem Trüffelaroma',
    image: '/BOWLICIOUS/Trüffel-Mayonnaise.webp',
    tags: [],
    order: 6,
    active: true,
  },
  {
    restaurant: 'BOWLICIOUS',
    section: 'Saucen',
    name: 'Koreansauce',
    price: '2,50 €',
    description: 'scharfes Chilisauce mit einer Knoblauch-Note',
    image: '/BOWLICIOUS/Koreansauce.webp',
    tags: ['Scharf'],
    order: 7,
    active: true,
  },
`;

// Create new content
const before = content.slice(0, lastBracket);
const newContent = before + additionalItems + ']';

fs.writeFileSync(filePath, newContent, 'utf8');
console.log('✅ Successfully added remaining BOWLICIOUS items');
