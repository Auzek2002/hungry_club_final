const fs = require('fs');
const path = require('path');

const migrateFilePath = path.join(__dirname, 'migrate-menu-items.ts');

console.log('Reading migrate-menu-items.ts...');
const content = fs.readFileSync(migrateFilePath, 'utf8');
const lines = content.split('\n');

// Find the problematic lines
let fixedLines = [];
let inPizzaSection = false;
let pizzaStartLine = -1;
let pizzaEndLine = -1;

for (let i = 0; i < lines.length; i++) {
  const line = lines[i];

  // Detect start of PIZZA_TIME section
  if (line.includes('PIZZA_TIME') && line.includes('//')) {
    inPizzaSection = true;
    pizzaStartLine = i + 1;
    console.log(`PIZZA_TIME section starts at line ${i + 1}`);
    fixedLines.push(line);
    continue;
  }

  // Skip the opening bracket after PIZZA_TIME comment
  if (line.trim() === '[' && inPizzaSection && pizzaStartLine !== -1) {
    console.log(`Removing opening bracket at line ${i + 1}`);
    continue;
  }

  // Detect when PIZZA_TIME section ends (when we hit a different restaurant)
  if (inPizzaSection && line.includes("restaurant:") && !line.includes("PIZZA_TIME")) {
    inPizzaSection = false;
    pizzaEndLine = i;
    console.log(`PIZZA_TIME section ends at line ${i}`);
  }

  // Fix PIZZA_TIME section
  if (inPizzaSection && pizzaStartLine !== -1 && !pizzaEndLine) {
    // Skip duplicate "// Beliebt Section" comment (keep only the first one with proper indentation)
    if (line.trim() === '// Beliebt Section') {
      if (fixedLines.length > 0) {
        // Check last few lines for duplicate
        const lastFewLines = fixedLines.slice(-3).map(l => l.trim());
        if (lastFewLines.includes('// Beliebt Section')) {
          console.log(`Removing duplicate comment at line ${i + 1}`);
          continue;
        }
      }
    }

    // Reduce indentation (from 4 spaces to 2)
    if (line.startsWith('    ')) {
      fixedLines.push(line.substring(2));
      continue;
    }
  }

  fixedLines.push(line);
}

console.log(`Fixed ${lines.length - fixedLines.length} lines`);
console.log(`PIZZA_TIME section: lines ${pizzaStartLine} to ${pizzaEndLine}`);

// Write the fixed content
fs.writeFileSync(migrateFilePath, fixedLines.join('\n'), 'utf8');
console.log('✅ Fixed migrate-menu-items.ts structure');
