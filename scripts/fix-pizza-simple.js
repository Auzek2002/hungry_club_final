const fs = require('fs');
const path = require('path');

const migrateFilePath = path.join(__dirname, 'migrate-menu-items.ts');

console.log('Reading migrate-menu-items.ts...');
let content = fs.readFileSync(migrateFilePath, 'utf8');
const lines = content.split('\n');

let fixedLines = [];
let inPizzaSection = false;
let seenBeliebtComment = false;
let fixCount = 0;

for (let i = 0; i < lines.length; i++) {
  const line = lines[i];

  // Detect start of PIZZA_TIME section (by the comment)
  if (!inPizzaSection && line.includes('// PIZZA_TIME')) {
    inPizzaSection = true;
    seenBeliebtComment = false;
    fixedLines.push(line);
    console.log(`Found PIZZA_TIME section at line ${i + 1}`);
    continue;
  }

  // Detect end of PIZZA_TIME section
  if (inPizzaSection && line.includes("restaurant:") && !line.includes("'PIZZA_TIME'")) {
    inPizzaSection = false;
    console.log(`PIZZA_TIME section ended at line ${i + 1}`);
  }

  // Process PIZZA_TIME section lines
  if (inPizzaSection) {
    // Handle "// Beliebt Section" comment - keep only first occurrence with correct indentation
    if (line.trim() === '// Beliebt Section') {
      if (!seenBeliebtComment) {
        fixedLines.push('  // Beliebt Section');
        seenBeliebtComment = true;
        fixCount++;
        console.log(`Fixed Beliebt comment at line ${i + 1}`);
        continue;
      } else {
        // Skip duplicate
        fixCount++;
        console.log(`Removed duplicate Beliebt comment at line ${i + 1}`);
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
