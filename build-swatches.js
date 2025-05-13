const fs = require('fs');
const { parse } = require('csv-parse/sync');

const CSV_URL = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vRq_jChMTgT4FzBuptaWMM-V4dQ9MfXkhOyDfMiBTd5REe8zz8ut2_07nPfwon8Ee8IpFJcwpW4jroe/pub?gid=1904432405&single=true&output=csv';

fetch(CSV_URL)
  .then(res => res.text())
  .then(csvText => {
    const records = parse(csvText, { columns: true, skip_empty_lines: true });
    const swatches = records
      .filter(row => row['Color'] && row['Hex Color'])
      .map(row => ({
        name: row['Color'],
        color: row['Hex Color']
      }));
    const output = { swatches };
    fs.writeFileSync('swatches.json', JSON.stringify(output, null, 2));
    console.log('swatches.json generated!');
  })
  .catch(err => console.error(err));