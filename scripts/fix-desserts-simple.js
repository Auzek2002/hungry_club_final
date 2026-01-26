const fs = require('fs');
const path = require('path');

const migrateFilePath = path.join(__dirname, 'migrate-menu-items.ts');

console.log('Reading migrate-menu-items.ts...');
let content = fs.readFileSync(migrateFilePath, 'utf8');
const lines = content.split('\n');

let fixedLines = [];
let inDessertsSection = false;
let seenDessertsComment = false;
let fixCount = 0;

for (let i = 0; i < lines.length; i++) {
  const line = lines[i];

  // Detect start of DESSERTS section (by finding first DESSERTS restaurant)
  if (!inDessertsSection && line.includes("restaurant: 'DESSERTS'")) {
    inDessertsSection = true;
    seenDessertsComment = false;
    console.log(`Found DESSERTS section at line ${i + 1}`);
  }

  // Detect end of DESSERTS section
  if (inDessertsSection && line.includes("restaurant:") && !line.includes("'DESSERTS'")) {
    inDessertsSection = false;
    console.log(`DESSERTS section ended at line ${i + 1}`);
  }

  // Process DESSERTS section lines
  if (inDessertsSection) {
    // Handle "// Desserts Section" comment - keep only first occurrence with correct indentation
    if (line.trim() === '// Desserts Section') {
      if (!seenDessertsComment) {
        fixedLines.push('  // Desserts Section');
        seenDessertsComment = true;
        fixCount++;
        console.log(`Fixed Desserts comment at line ${i + 1}`);
        continue;
      } else {
        // Skip duplicate
        fixCount++;
        console.log(`Removed duplicate Desserts comment at line ${i + 1}`);
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
