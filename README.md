# Schedule 70 API

An API for getting data on GSA Schedule 70 vendors that are authorized to work with state and local governments.

## Rationale

State and local governments can purchase IT services off of the GSA Schedule 70, but locating a contractor that meets specific requirements is not easy using the existing [GSA eLibrary website](http://www.gsaelibrary.gsa.gov/ElibMain/home.do). This API makes it easy to search for contractors by state and/or by specific socio-economic indicators, and supports the development of a range of different client applications that can be used by state and local officials to more easily identify Schedule 70 contractors.

## Design

This API is built to conform to as many of the [API standards articulate here](https://github.com/18F/api-standards) as possible. It is built with Node.js and uses the Express framework for the API layer and MySQL for the back-end data store.

## Usage

* Clone this repo, and install dependencies: ```npm install```
* [Scrape the data](https://github.com/mheadd/s70-api/tree/master/utils) and load it into a MySQL database.
* Copy the sample config to ```config.js``` and add MySQL connection details.
* Start the app: ```npm start```

## Endpoints
