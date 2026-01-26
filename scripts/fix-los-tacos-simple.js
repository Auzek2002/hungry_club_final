const fs = require('fs');
const path = require('path');

const migrateFilePath = path.join(__dirname, 'migrate-menu-items.ts');

console.log('Reading migrate-menu-items.ts...');
let content = fs.readFileSync(migrateFilePath, 'utf8');
const lines = content.split('\n');

let fixedLines = [];
let inLosTacosSection = false;
let seenBeliebtComment = false;
let fixCount = 0;

for (let i = 0; i < lines.length; i++) {
  const line = lines[i];

  // Detect start of LOS_TACOS section (by finding first LOS_TACOS restaurant)
  if (!inLosTacosSection && line.includes("restaurant: 'LOS_TACOS'")) {
    inLosTacosSection = true;
    seenBeliebtComment = false;
    console.log(`Found LOS_TACOS section at line ${i + 1}`);
  }

  // Detect end of LOS_TACOS section
  if (inLosTacosSection && line.includes("restaurant:") && !line.includes("'LOS_TACOS'")) {
    inLosTacosSection = false;
    console.log(`LOS_TACOS section ended at line ${i + 1}`);
  }

  // Process LOS_TACOS section lines
  if (inLosTacosSection) {
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
