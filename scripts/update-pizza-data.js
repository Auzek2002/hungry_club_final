const fs = require('fs');
const path = require('path');

const migrateFilePath = path.join(__dirname, 'migrate-menu-items.ts');
const pizzaDataPath = path.join(__dirname, 'pizza-time-data.ts');

console.log('Reading migrate-menu-items.ts...');
const migrateContent = fs.readFileSync(migrateFilePath, 'utf8');

console.log('Reading pizza-time-data.ts...');
const pizzaDataContent = fs.readFileSync(pizzaDataPath, 'utf8');

// Extract just the array content from pizza-time-data.ts
const pizzaArrayMatch = pizzaDataContent.match(/export const pizzaTimeMenuItems = \[([\s\S]*)\]/);
if (!pizzaArrayMatch) {
  console.error('Could not find pizzaTimeMenuItems array in pizza-time-data.ts');
  process.exit(1);
}

// Get the array contents WITHOUT the surrounding brackets
const pizzaItems = pizzaArrayMatch[1].trim();

// Find the PIZZA_TIME section in migrate-menu-items.ts
const lines = migrateContent.split('\n');
let startIndex = -1;
let endIndex = -1;
let inPizzaSection = false;
let bracketCount = 0;

for (let i = 0; i < lines.length; i++) {
  const line = lines[i];

  // Look for the start of PIZZA_TIME section
  if (line.includes("restaurant: 'PIZZA_TIME'") || line.includes('restaurant: "PIZZA_TIME"')) {
    if (startIndex === -1) {
      // Find the opening bracket of this item
      for (let j = i; j >= 0; j--) {
        if (lines[j].trim() === '{') {
          startIndex = j;
          inPizzaSection = true;
          bracketCount = 1;
          break;
        }
      }
    }
  }

  if (inPizzaSection && startIndex !== -1) {
    // Track brackets to find where PIZZA_TIME section ends
    const openBrackets = (line.match(/{/g) || []).length;
    const closeBrackets = (line.match(/}/g) || []).length;
    bracketCount += openBrackets - closeBrackets;

    // When we close the object and hit a comma or closing bracket, that's the end
    if (bracketCount === 0 && (line.includes('},') || line.trim() === '}')) {
      endIndex = i;
      break;
    }
  }
}

if (startIndex === -1 || endIndex === -1) {
  console.error('Could not find PIZZA_TIME section boundaries');
  console.log('Start index:', startIndex);
  console.log('End index:', endIndex);
  process.exit(1);
}

console.log(`Found PIZZA_TIME section from line ${startIndex + 1} to line ${endIndex + 1}`);
console.log(`This is ${endIndex - startIndex + 1} lines`);

// Check if there are more PIZZA_TIME items after endIndex
let hasMorePizzaItems = false;
for (let i = endIndex + 1; i < lines.length; i++) {
  if (lines[i].includes("restaurant: 'PIZZA_TIME'") || lines[i].includes('restaurant: "PIZZA_TIME"')) {
    hasMorePizzaItems = true;
    // Find the end of all PIZZA_TIME items
    let currentBracketCount = 0;
    let foundStart = false;

    for (let j = i; j < lines.length; j++) {
      if (!foundStart && lines[j].trim() === '{') {
        foundStart = true;
        currentBracketCount = 1;
        continue;
      }

      if (foundStart) {
        const openBrackets = (lines[j].match(/{/g) || []).length;
        const closeBrackets = (lines[j].match(/}/g) || []).length;
        currentBracketCount += openBrackets - closeBrackets;

        if (currentBracketCount === 0 && (lines[j].includes('},') || lines[j].trim() === '}')) {
          endIndex = j;
          break;
        }
      }
    }
  }
}

if (hasMorePizzaItems) {
  console.log(`Found more PIZZA_TIME items, updated end to line ${endIndex + 1}`);
}

// Reconstruct the file with new PIZZA_TIME data
const beforeSection = lines.slice(0, startIndex).join('\n');
const afterSection = lines.slice(endIndex + 1).join('\n');

// Format the pizza items properly with indentation (items, not array)
const formattedPizzaItems = pizzaItems
  .split('\n')
  .map((line) => '  ' + line) // All lines get 2 spaces
  .join('\n');

const newContent = beforeSection + '\n' + formattedPizzaItems.trimEnd() + '\n' + afterSection;

// Write the updated content
fs.writeFileSync(migrateFilePath, newContent, 'utf8');

console.log('✅ Successfully updated PIZZA_TIME data in migrate-menu-items.ts');
console.log(`Replaced ${endIndex - startIndex + 1} lines with new PIZZA_TIME data`);
