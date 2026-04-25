const fs = require('fs');
const path = require('path');

const csvPath = path.join(__dirname, 'app', 'assets', 'holidays', 'holidays.csv');
const jsonPath = path.join(__dirname, 'app', 'assets', 'holidays', 'holidays.json');

const csv = fs.readFileSync(csvPath, 'utf-8');
const lines = csv.split('\n').slice(1);
const result = {};

lines.forEach(line => {
  if (!line.trim()) return;
  
  const parts = [];
  let current = '';
  let inQuotes = false;
  
  for (let i = 0; i < line.length; i++) {
    const char = line[i];
    if (char === '"') {
      inQuotes = !inQuotes;
    } else if (char === ',' && !inQuotes) {
      parts.push(current.trim());
      current = '';
    } else {
      current += char;
    }
  }
  parts.push(current.trim());
  
  if (parts.length < 6) return;
  
  const confessions = parts[0].replace(/"/g, '').split(',').map(c => c.trim());
  const holiday = {
    date: parts[1],
    variation: parts[2],
    title: parts[3].replace(/"/g, ''),
    description: parts[4].replace(/"/g, ''),
    observanceLevel: parts[5]
  };
  
  confessions.forEach(confession => {
    if (!result[confession]) result[confession] = [];
    result[confession].push(holiday);
  });
});

fs.writeFileSync(jsonPath, JSON.stringify(result, null, 2));
console.log('JSON file created successfully at:', jsonPath);
