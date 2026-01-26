const fs = require('fs');
const path = require('path');

const migrateFilePath = path.join(__dirname, 'migrate-menu-items.ts');
const dessertsDataPath = path.join(__dirname, 'desserts-data.ts');

console.log('Reading migrate-menu-items.ts...');
const migrateContent = fs.readFileSync(migrateFilePath, 'utf8');

console.log('Reading desserts-data.ts...');
const dessertsDataContent = fs.readFileSync(dessertsDataPath, 'utf8');

// Extract just the array content from desserts-data.ts
const dessertsArrayMatch = dessertsDataContent.match(/export const dessertsMenuItems = \[([\s\S]*)\]/);
if (!dessertsArrayMatch) {
  console.error('Could not find dessertsMenuItems array in desserts-data.ts');
  process.exit(1);
}

// Get the array contents WITHOUT the surrounding brackets
const dessertsItems = dessertsArrayMatch[1].trim();

// Find the DESSERTS section in migrate-menu-items.ts
const lines = migrateContent.split('\n');
let startIndex = -1;
let endIndex = -1;
let inDessertsSection = false;
let bracketCount = 0;

for (let i = 0; i < lines.length; i++) {
  const line = lines[i];

  // Look for the start of DESSERTS section
  if (line.includes("restaurant: 'DESSERTS'") || line.includes('restaurant: "DESSERTS"')) {
    if (startIndex === -1) {
      // Find the opening bracket of this item
      for (let j = i; j >= 0; j--) {
        if (lines[j].trim() === '{') {
          startIndex = j;
          inDessertsSection = true;
          bracketCount = 1;
          break;
        }
      }
    }
  }

  if (inDessertsSection && startIndex !== -1) {
    // Track brackets to find where DESSERTS section ends
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
  console.error('Could not find DESSERTS section boundaries');
  console.log('Start index:', startIndex);
  console.log('End index:', endIndex);
  process.exit(1);
}

console.log(`Found DESSERTS section from line ${startIndex + 1} to line ${endIndex + 1}`);
console.log(`This is ${endIndex - startIndex + 1} lines`);

// Check if there are more DESSERTS items after endIndex
let hasMoreDessertsItems = false;
for (let i = endIndex + 1; i < lines.length; i++) {
  if (lines[i].includes("restaurant: 'DESSERTS'") || lines[i].includes('restaurant: "DESSERTS"')) {
    hasMoreDessertsItems = true;
    // Find the end of all DESSERTS items
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

if (hasMoreDessertsItems) {
  console.log(`Found more DESSERTS items, updated end to line ${endIndex + 1}`);
}

// Reconstruct the file with new DESSERTS data
const beforeSection = lines.slice(0, startIndex).join('\n');
const afterSection = lines.slice(endIndex + 1).join('\n');

// Format the desserts items properly with indentation (items, not array)
const formattedDessertsItems = dessertsItems
  .split('\n')
  .map((line) => '  ' + line) // All lines get 2 spaces
  .join('\n');

const newContent = beforeSection + '\n' + formattedDessertsItems.trimEnd() + '\n' + afterSection;

// Write the updated content
fs.writeFileSync(migrateFilePath, newContent, 'utf8');

console.log('✅ Successfully updated DESSERTS data in migrate-menu-items.ts');
console.log(`Replaced ${endIndex - startIndex + 1} lines with new DESSERTS data`);
