const fs = require('fs');
const path = require('path');

const migrateFilePath = path.join(__dirname, 'migrate-menu-items.ts');

console.log('Reading migrate-menu-items.ts...');
let content = fs.readFileSync(migrateFilePath, 'utf8');
const lines = content.split('\n');

let fixedLines = [];
let inDrinksSection = false;
let seenAlkoholischComment = false;
let seenAlkoholfreiComment = false;
let fixCount = 0;

for (let i = 0; i < lines.length; i++) {
  const line = lines[i];

  // Detect start of DRINKS section (by finding first DRINKS restaurant)
  if (!inDrinksSection && line.includes("restaurant: 'DRINKS'")) {
    inDrinksSection = true;
    seenAlkoholischComment = false;
    seenAlkoholfreiComment = false;
    console.log(`Found DRINKS section at line ${i + 1}`);
  }

  // Detect end of DRINKS section
  if (inDrinksSection && line.includes("restaurant:") && !line.includes("'DRINKS'")) {
    inDrinksSection = false;
    console.log(`DRINKS section ended at line ${i + 1}`);
  }

  // Process DRINKS section lines
  if (inDrinksSection) {
    // Handle "// Alkoholische Getränke Section" comment - keep only first occurrence with correct indentation
    if (line.trim() === '// Alkoholische Getränke Section') {
      if (!seenAlkoholischComment) {
        fixedLines.push('  // Alkoholische Getränke Section');
        seenAlkoholischComment = true;
        fixCount++;
        console.log(`Fixed Alkoholische Getränke comment at line ${i + 1}`);
        continue;
      } else {
        // Skip duplicate
        fixCount++;
        console.log(`Removed duplicate Alkoholische Getränke comment at line ${i + 1}`);
        continue;
      }
    }

    // Handle "// Alkoholfreie Getränke Section" comment - keep only first occurrence with correct indentation
    if (line.trim() === '// Alkoholfreie Getränke Section') {
      if (!seenAlkoholfreiComment) {
        fixedLines.push('  // Alkoholfreie Getränke Section');
        seenAlkoholfreiComment = true;
        fixCount++;
        console.log(`Fixed Alkoholfreie Getränke comment at line ${i + 1}`);
        continue;
      } else {
        // Skip duplicate
        fixCount++;
        console.log(`Removed duplicate Alkoholfreie Getränke comment at line ${i + 1}`);
        continue;
      }
    }

    // Fix indentation: if line starts with 4 spaces, reduce to 2
    if (line.startsWith('    ') && !line.startsWith('      ')) {
      fixedLines.push(line.substring(2));
      fixCount++;
      continue;
    }

    // Fix indentation for deeper nested lines (6 spaces -> 4 spaces, etc.)
    if (line.match(/^      /)) {
      fixedLines.push(line.substring(2));
      fixCount++;
      continue;
    }
  }

  fixedLines.push(line);
}

fs.writeFileSync(migrateFilePath, fixedLines.join('\n'), 'utf8');
console.log(`✅ Fixed ${fixCount} lines in migrate-menu-items.ts`);
