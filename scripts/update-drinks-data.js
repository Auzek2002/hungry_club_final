const fs = require('fs');
const path = require('path');

const migrateFilePath = path.join(__dirname, 'migrate-menu-items.ts');
const drinksDataPath = path.join(__dirname, 'drinks-data.ts');

console.log('Reading migrate-menu-items.ts...');
const migrateContent = fs.readFileSync(migrateFilePath, 'utf8');

console.log('Reading drinks-data.ts...');
const drinksDataContent = fs.readFileSync(drinksDataPath, 'utf8');

// Extract just the array content from drinks-data.ts
const drinksArrayMatch = drinksDataContent.match(/export const drinksMenuItems = \[([\s\S]*)\]/);
if (!drinksArrayMatch) {
  console.error('Could not find drinksMenuItems array in drinks-data.ts');
  process.exit(1);
}

// Get the array contents WITHOUT the surrounding brackets
const drinksItems = drinksArrayMatch[1].trim();

// Find the DRINKS section in migrate-menu-items.ts
const lines = migrateContent.split('\n');
let startIndex = -1;
let endIndex = -1;
let inDrinksSection = false;
let bracketCount = 0;

for (let i = 0; i < lines.length; i++) {
  const line = lines[i];

  // Look for the start of DRINKS section
  if (line.includes("restaurant: 'DRINKS'") || line.includes('restaurant: "DRINKS"')) {
    if (startIndex === -1) {
      // Find the opening bracket of this item
      for (let j = i; j >= 0; j--) {
        if (lines[j].trim() === '{') {
          startIndex = j;
          inDrinksSection = true;
          bracketCount = 1;
          break;
        }
      }
    }
  }

  if (inDrinksSection && startIndex !== -1) {
    // Track brackets to find where DRINKS section ends
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
  console.error('Could not find DRINKS section boundaries');
  console.log('Start index:', startIndex);
  console.log('End index:', endIndex);
  process.exit(1);
}

console.log(`Found DRINKS section from line ${startIndex + 1} to line ${endIndex + 1}`);
console.log(`This is ${endIndex - startIndex + 1} lines`);

// Check if there are more DRINKS items after endIndex
let hasMoreDrinksItems = false;
for (let i = endIndex + 1; i < lines.length; i++) {
  if (lines[i].includes("restaurant: 'DRINKS'") || lines[i].includes('restaurant: "DRINKS"')) {
    hasMoreDrinksItems = true;
    // Find the end of all DRINKS items
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

if (hasMoreDrinksItems) {
  console.log(`Found more DRINKS items, updated end to line ${endIndex + 1}`);
}

// Reconstruct the file with new DRINKS data
const beforeSection = lines.slice(0, startIndex).join('\n');
const afterSection = lines.slice(endIndex + 1).join('\n');

// Format the drinks items properly with indentation (items, not array)
const formattedDrinksItems = drinksItems
  .split('\n')
  .map((line) => '  ' + line) // All lines get 2 spaces
  .join('\n');

const newContent = beforeSection + '\n' + formattedDrinksItems.trimEnd() + '\n' + afterSection;

// Write the updated content
fs.writeFileSync(migrateFilePath, newContent, 'utf8');

console.log('✅ Successfully updated DRINKS data in migrate-menu-items.ts');
console.log(`Replaced ${endIndex - startIndex + 1} lines with new DRINKS data`);
