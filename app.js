const http = require('http');
const fs = require('fs');
const csvParse = require('csv-parse');

const hostname = '127.0.0.1';
const port = 3000;

// Object to organize the data
const organizedDataObject = {};

// Reading CSV file
fs.createReadStream('data-reduced.csv')
  .pipe(csvParse())
  .on('data', (row) => {
    try {
      // Process row
      // console.log(row);
      // Checks if user ID is in the organizedDataObject
      if(organizedDataObject[row[1]]) {
        // Updates organizedDataObject
        organizedDataObject[row[1]].count++;
        organizedDataObject[row[1]].os.push(row[2]);
        organizedDataObject[row[1]].device.push(row[3]);
        organizedDataObject[row[1]].datetime.push(row[0]);
      } else {
        // Or creates a new user
        organizedDataObject[row[1]] = {
          id: row[1],
          count: 1,
          os: [row[2]],
          device: [row[3]],
          datetime: [row[0]],
        };
      }
    } catch(error) {
      console.log(error.message);
    }
  })
  .on('end', () => {
    console.log("Finished");
    console.log(organizedDataObject);
  });


// const server = http.createServer((req, res) => {
//   res.statusCode = 200;
//   res.setHeader('Content-Type', 'text/plain');
//   res.end('Hello World\n');
// });

// server.listen(port, hostname, () => {
//   console.log(`Server running at http://${hostname}:${port}/`);
// });