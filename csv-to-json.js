const fs = require('fs');
const path = require('path');
const csv = require('csv-parser');

// Set the file paths
const csvFilePath = path.join(__dirname, 'skills-progression.csv');
const jsonFilePath = path.join(__dirname, 'skills-progression.json');

// Create a new array to store the data
const data = [];

// Use the csv-parser module to read the CSV file
fs.createReadStream(csvFilePath)
  .pipe(csv())
  .on('data', (row) => {
    // Convert the row to an object and add it to the data array
    const rowData = {};
    Object.keys(row).forEach((key) => {
      const value = row[key];
      rowData[key] = isNaN(value) ? value : Number(value);
    });
    data.push(rowData);
  })
  .on('end', () => {
    // Write the data to a JSON file
    fs.writeFile(jsonFilePath, JSON.stringify(data), (err) => {
      if (err) {
        console.error('Error writing JSON file:', err);
      } else {
        console.log('JSON file saved successfully.');
      }
    });
  });
