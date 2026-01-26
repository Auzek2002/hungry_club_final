const fs = require('fs');
const path = require('path');

const migrateFilePath = path.join(__dirname, 'migrate-menu-items.ts');
const losTacosDataPath = path.join(__dirname, 'los-tacos-data.ts');

console.log('Reading migrate-menu-items.ts...');
const migrateContent = fs.readFileSync(migrateFilePath, 'utf8');

console.log('Reading los-tacos-data.ts...');
const losTacosDataContent = fs.readFileSync(losTacosDataPath, 'utf8');

// Extract just the array content from los-tacos-data.ts
const losTacosArrayMatch = losTacosDataContent.match(/export const losTacosMenuItems = \[([\s\S]*)\]/);
if (!losTacosArrayMatch) {
  console.error('Could not find losTacosMenuItems array in los-tacos-data.ts');
  process.exit(1);
}

// Get the array contents WITHOUT the surrounding brackets
const losTacosItems = losTacosArrayMatch[1].trim();

// Find the LOS_TACOS section in migrate-menu-items.ts
const lines = migrateContent.split('\n');
let startIndex = -1;
let endIndex = -1;
let inLosTacosSection = false;
let bracketCount = 0;

for (let i = 0; i < lines.length; i++) {
  const line = lines[i];

  // Look for the start of LOS_TACOS section
  if (line.includes("restaurant: 'LOS_TACOS'") || line.includes('restaurant: "LOS_TACOS"')) {
    if (startIndex === -1) {
      // Find the opening bracket of this item
      for (let j = i; j >= 0; j--) {
        if (lines[j].trim() === '{') {
          startIndex = j;
          inLosTacosSection = true;
          bracketCount = 1;
          break;
        }
      }
    }
  }

  if (inLosTacosSection && startIndex !== -1) {
    // Track brackets to find where LOS_TACOS section ends
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
  console.error('Could not find LOS_TACOS section boundaries');
  console.log('Start index:', startIndex);
  console.log('End index:', endIndex);
  process.exit(1);
}

console.log(`Found LOS_TACOS section from line ${startIndex + 1} to line ${endIndex + 1}`);
console.log(`This is ${endIndex - startIndex + 1} lines`);

// Check if there are more LOS_TACOS items after endIndex
let hasMoreLosTacosItems = false;
for (let i = endIndex + 1; i < lines.length; i++) {
  if (lines[i].includes("restaurant: 'LOS_TACOS'") || lines[i].includes('restaurant: "LOS_TACOS"')) {
    hasMoreLosTacosItems = true;
    // Find the end of all LOS_TACOS items
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

if (hasMoreLosTacosItems) {
  console.log(`Found more LOS_TACOS items, updated end to line ${endIndex + 1}`);
}

// Reconstruct the file with new LOS_TACOS data
const beforeSection = lines.slice(0, startIndex).join('\n');
const afterSection = lines.slice(endIndex + 1).join('\n');

// Format the los tacos items properly with indentation (items, not array)
const formattedLosTacosItems = losTacosItems
  .split('\n')
  .map((line) => '  ' + line) // All lines get 2 spaces
  .join('\n');

const newContent = beforeSection + '\n' + formattedLosTacosItems.trimEnd() + '\n' + afterSection;

// Write the updated content
fs.writeFileSync(migrateFilePath, newContent, 'utf8');

console.log('✅ Successfully updated LOS_TACOS data in migrate-menu-items.ts');
console.log(`Replaced ${endIndex - startIndex + 1} lines with new LOS_TACOS data`);
