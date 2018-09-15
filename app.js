const http = require('http');
const fs = require('fs');
const csvParse = require('csv-parse');

const hostname = '127.0.0.1';
const port = 3000;

// Object to organize the data
const organizedDataObject = {};
let numberOfLoyalVisitors = 0;

// Reading CSV file
const startTime = new Date();
console.log("Start time: " + startTime);
fs.createReadStream('data-reduced.csv')
  .pipe(csvParse())
  .on('data', (row) => {
    // Process row
    try {
      // Checks if user ID is already in the organizedDataObject
      if(organizedDataObject[row[1]]) {
        // Updates organizedDataObject
        organizedDataObject[row[1]].count++;
        organizedDataObject[row[1]].os.push(row[2]);
        organizedDataObject[row[1]].device.push(row[3]);
        organizedDataObject[row[1]].datetime.push(row[0]);
        // Checks if is not a Loyal Visitor yet and has 10 or more visits
        if(!organizedDataObject[row[1]].isLoyalVisitor && organizedDataObject[row[1]].count > 9) {
          // So sets true and count
          organizedDataObject[row[1]].isLoyalVisitor = true;
          numberOfLoyalVisitors++;
        }
      } else {
        // Or creates a new user
        organizedDataObject[row[1]] = {
          id: row[1],
          count: 1,
          os: [row[2]],
          device: [row[3]],
          datetime: [row[0]],
          isLoyalVisitor: false,
        };
      }
    } catch(error) {
      console.log(error.message);
    }
  })
  .on('end', () => {
    const endTime = new Date();
    console.log("End time: " + endTime);
    // console.log("Time to process: " (endTime - startTime));
    console.log(organizedDataObject);
    console.log("Number of Unique Website Visitors: " + Object.keys(organizedDataObject).length);
    console.log("Number of Loyal Website Visitor: " + numberOfLoyalVisitors);
  });


// const server = http.createServer((req, res) => {
//   res.statusCode = 200;
//   res.setHeader('Content-Type', 'text/plain');
//   res.end('Hello World\n');
// });

// server.listen(port, hostname, () => {
//   console.log(`Server running at http://${hostname}:${port}/`);
// });