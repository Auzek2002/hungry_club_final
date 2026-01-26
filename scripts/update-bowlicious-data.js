const fs = require('fs');
const path = require('path');

const migrateFilePath = path.join(__dirname, 'migrate-menu-items.ts');
const bowliciousDataPath = path.join(__dirname, 'bowlicious-data.ts');

console.log('Reading migrate-menu-items.ts...');
const migrateContent = fs.readFileSync(migrateFilePath, 'utf8');

console.log('Reading bowlicious-data.ts...');
const bowliciousDataContent = fs.readFileSync(bowliciousDataPath, 'utf8');

// Extract just the array content from bowlicious-data.ts
const bowliciousArrayMatch = bowliciousDataContent.match(/export const bowliciousMenuItems = \[([\s\S]*)\]/);
if (!bowliciousArrayMatch) {
  console.error('Could not find bowliciousMenuItems array in bowlicious-data.ts');
  process.exit(1);
}

// Get the array contents WITHOUT the surrounding brackets
const bowliciousItems = bowliciousArrayMatch[1].trim();

// Find the BOWLICIOUS section in migrate-menu-items.ts
const lines = migrateContent.split('\n');
let startIndex = -1;
let endIndex = -1;
let inBowliciousSection = false;
let bracketCount = 0;

for (let i = 0; i < lines.length; i++) {
  const line = lines[i];

  // Look for the start of BOWLICIOUS section
  if (line.includes("restaurant: 'BOWLICIOUS'") || line.includes('restaurant: "BOWLICIOUS"')) {
    if (startIndex === -1) {
      // Find the opening bracket of this item
      for (let j = i; j >= 0; j--) {
        if (lines[j].trim() === '{') {
          startIndex = j;
          inBowliciousSection = true;
          bracketCount = 1;
          break;
        }
      }
    }
  }

  if (inBowliciousSection && startIndex !== -1) {
    // Track brackets to find where BOWLICIOUS section ends
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
  console.error('Could not find BOWLICIOUS section boundaries');
  console.log('Start index:', startIndex);
  console.log('End index:', endIndex);
  process.exit(1);
}

console.log(`Found BOWLICIOUS section from line ${startIndex + 1} to line ${endIndex + 1}`);
console.log(`This is ${endIndex - startIndex + 1} lines`);

// Check if there are more BOWLICIOUS items after endIndex
let hasMoreBowliciousItems = false;
for (let i = endIndex + 1; i < lines.length; i++) {
  if (lines[i].includes("restaurant: 'BOWLICIOUS'") || lines[i].includes('restaurant: "BOWLICIOUS"')) {
    hasMoreBowliciousItems = true;
    // Find the end of all BOWLICIOUS items
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

if (hasMoreBowliciousItems) {
  console.log(`Found more BOWLICIOUS items, updated end to line ${endIndex + 1}`);
}

// Reconstruct the file with new BOWLICIOUS data
const beforeSection = lines.slice(0, startIndex).join('\n');
const afterSection = lines.slice(endIndex + 1).join('\n');

// Format the bowlicious items properly with indentation (items, not array)
const formattedBowliciousItems = bowliciousItems
  .split('\n')
  .map((line) => '  ' + line) // All lines get 2 spaces
  .join('\n');

const newContent = beforeSection + '\n' + formattedBowliciousItems.trimEnd() + '\n' + afterSection;

// Write the updated content
fs.writeFileSync(migrateFilePath, newContent, 'utf8');

console.log('✅ Successfully updated BOWLICIOUS data in migrate-menu-items.ts');
console.log(`Replaced ${endIndex - startIndex + 1} lines with new BOWLICIOUS data`);
