const http = require('http');
const fs = require('fs');
const csvParse = require('csv-parse');

const hostname = '127.0.0.1';
const port = 3000;

// Reading CSV file
fs.createReadStream('data.csv')
  .pipe(csvParse())
  .on('data', (data) => {
    try {
      // Process row
      console.log(data);
    } catch(error) {
      console.log(error.message);
    }
  })
  .on('end', () => {
    console.log("Finished");
  });


const server = http.createServer((req, res) => {
  res.statusCode = 200;
  res.setHeader('Content-Type', 'text/plain');
  res.end('Hello World\n');
});

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});