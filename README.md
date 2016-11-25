# Schedule 70 API

An data scraper and API for getting data on GSA Schedule 70 vendors that are authorized to work with state and local governments.

## Usage

Scrape the data from the GSA eLibrary site using the ```scraper.js``` file:

```bash
~$ echo '"Contractor_Name","Contractor_Details_URL","State_Local_Auth","Contract_Number","Phone","Location","Socio_Economic_Indicators","Contractor_TC_Price_List","View_Catalog"' > data.csv
~$ node scraper.js | sed 's/"|/"/g' | sed 's/|/","/g' | csvcut -c 1-7,9,11 >> data.csv
```

Populate the database with the scraped data.

Fire up the API.
