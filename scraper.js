/*
 * A data scraper to get data from GSA eLibrary for vendors
 * authorized to work with state and local governments.
 *
*/

const request = require('request');
const cheerio = require('cheerio');
const cheerioTableparser = require('./tableparser');

// URL to scrape.
let endpoint = 'http://www.gsaelibrary.gsa.gov/ElibMain/sinDetails.do?executeQuery=YES&scheduleNumber=70&flag=&filter=&specialItemNumber=132+51';

request(endpoint, function (error, response, body) {
  if (!error && response.statusCode == 200) {
    $=cheerio.load(body);
    cheerioTableparser($);
    let vendorData = $("#myTable").parsetable(false, false, true);

    // Emptry array to hold vendor collection.
    let vendors = [];

    // Counter variable.
    let recordCount = vendorData[0].length;
    let fieldCount = vendorData.length;

    // Loop through nested arrays.
    for(let i=1; i<recordCount; i++) {
      // Emptry array to hold vendor details.
      let vendor = [];
      for(let j=0; j<fieldCount; j++) {
        vendor.push('"' + vendorData[j][i] + '"')
      }

      // Output comma delimited row.
      console.log(vendor.join(','));
    }
  }
  else {
    console.log('Sorry. I could not access the URL: ' + error);
  }
});
