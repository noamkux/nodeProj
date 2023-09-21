const fs = require('fs');
const log = require("./chalk.js")

let createErrorLog = (statusCode, errorMessage) => {
        console.log("here one");
        if (statusCode >= 400) {
                console.log("here two");
          const currentDate = new Date().toISOString().split('T')[0]; // YYYY-MM-DD
          const logFileName = `logs/${currentDate}.log`;
      
          const logData = `${currentDate} - Status ${statusCode}: ${errorMessage}\n`;
      
          // Append the data to the log file
          fs.appendFile(logFileName, logData, (err) => {
            if (err) {
              log.err('Error creating log file:', err);
            }
          });
        }
      }
      

      module.exports = createErrorLog;