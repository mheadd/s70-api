# Schedule 70 Data Scraper

A data scraper for getting information from the GSA eLibrary site.

## Rationale

GSA eLibrary [schedules and contracts data](https://catalog.data.gov/dataset/gsa-elibrary-schedules-and-contracts) includes a lot more tha  just schedule 70 and does not differentiate which contractors are authorized to work with state and local governments. It's also not clear how current this data is, or how often it is updated.

The GSA eLibrary site does allow for [data to be downloaded](http://www.gsaelibrary.gsa.gov/ElibMain/sinDetails.do?executeQuery=YES&scheduleNumber=70&flag=&filter=&specialItemNumber=132+51), ostensibly in Excel format. However, the downloaded file appears to be HTML, not .xls. Also, system errors are encountered periodically when attempting to download data the this way.

Scraping the data from the eLibrary site gets around these limitations, and also provides useful bits that are not available in the downloadable version (even if it we're working properly), like the URL to link to a specific contractor profile information.

## Usage

Scrape the data from the GSA eLibrary site using the ```scraper.js``` file, like so (note - assumes that [csvkit](https://csvkit.readthedocs.io/en/0.9.1/) is installed):

```bash
~$ echo '"Contractor_Name","Contractor_Details_URL","State_Local_Auth","Contract_Number","Phone","Location","Socio_Economic_Indicators","Contractor_TC_Price_List","View_Catalog"' > data.csv
~$ node utils/scraper.js | sed 's/"|/"/g' | sed 's/|/","/g' | csvcut -c 1-7,9,11 >> data.csv
```

This is admittedly ugly and inefficient, but it works. Suggestions for improvements welcomed.
