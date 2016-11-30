# Schedule 70 API

An API for getting data on GSA Schedule 70 vendors that are authorized to work with state and local governments.

## Rationale

State and local governments can purchase IT services off of the GSA Schedule 70, but locating a contractor that meets specific requirements is not easy using the existing [GSA eLibrary website](http://www.gsaelibrary.gsa.gov/ElibMain/home.do). This API makes it easy to search for contractors by state or city; more clearly lists contractor socio-economic indicators, and; supports the development of a range of different client applications that can be used by state and local officials to quickly identify Schedule 70 contractors authorized to work with state and local governments.

## Design

This API is built to conform to as many of the [API standards articulate here](https://github.com/18F/api-standards) as possible. It is built with Node.js and uses the Express framework for the API layer, and MySQL for the back-end data store.

## Usage

* Clone this repo, and install dependencies: ```npm install```
* [Scrape the data](https://github.com/mheadd/s70-api/tree/master/utils) and load it into a MySQL database.
* Copy the sample config to ```config.js``` and add MySQL connection details.
* Start the app: ```npm start```

## Endpoints

Get all contractors
* URL: http://{host}/?limit=1&0ffset=5
* Optional ```limit``` & ```offset``` parameters

Get contractors by State
* URL: http://{host}/state/NY?limit=1&0ffset=5
* Optional ```limit``` & ```offset``` parameters

Get contractors by City
* URL: http://{host}/city/Syracuse?limit=2
* Optional ```limit``` & ```offset``` parameters

## Response fields

| Name | Type | Description |
|---|---|---|
| Contractor_Name | String |  The name of the contractor |
| Contractor_Details_URL | String | URL to the contractor profile on GSA eLibrary  |
| Contract_Number | String | The number of the contract through which the contractor provides service |
| Phone | String |  The contact phone number of the contractor |
| Contractor_TC_Price_List |  String | URL to the contractor's price listing  |
| View_Catalog | String | URL to GSA Advantage catalog  |
| State_Local | Number | Indicates whether contractor is authorized to work with state and local governments |
| Small_Business | Number | 	Indicates whether contractor is classified as a [small business](https://www.sba.gov/contracting/getting-started-contractor/make-sure-you-meet-sba-size-standards/table-small-business-size-standards) |
| Other_Than_Small_Business |  Number |  Indicates whether contractor is classified as other than a small business |
| Women_Owned_Small_Business |  Number | Indicates whether contractor is classified as a [Women Owned Small business](https://www.sba.gov/contracting/government-contracting-programs/women-owned-small-businesses) (WOSB) |
| Economically_Disadvantaged_Women_Owned_Small_Business |  Number | Indicates whether contractor is classified as an [Economically Disadvantaged Women Owned Small business](https://www.sba.gov/contracting/government-contracting-programs/women-owned-small-businesses) (EDWOSB) |
| Woman_Owned_Business | Number  | Indicates whether contractor is classified as a [Woman Owned business](https://www.sba.gov/starting-business/how-start-business/business-types/women-owned-businesses) |
| Service_Disabled_Veteran_Owned_Small_Business | Number | Indicates whether contractor is classified as a [Service Disabled Veteran Owned Small business](https://www.sba.gov/contracting/government-contracting-programs/service-disabled-veteran-owned-businesses) |
| Veteran_Owned_Small_Business | Number| Indicates whether contractor is classified as a [Veteran Owned Small business](https://www.sba.gov/starting-business/how-start-business/business-types/veteran-owned-businesses)	  |
| SBA_Certified_Small_Disadvantaged_Business | Number | Indicates whether contractor is classified as a [SBA Certified Small Disadvantaged business](https://www.sba.gov/contracting/government-contracting-programs/small-disadvantaged-businesses) |
| SBA_Certified_8a_Firm | Number | Indicates whether contractor is classified as a [SBA Certified 8(a) Firm](https://www.sba.gov/contracting/government-contracting-programs/8a-business-development-program) |
| SBA_Certified_HUBZone_Firm | Number | Indicates whether contractor is classified as a [SBA Certified HUBZone Firm](https://www.sba.gov/contracting/government-contracting-programs/hubzone-program) |
| State | String | The state the contractor is located in |
| City | String | The city the contractor is located in |

## Sample response

```json
{
	"result": "success",
	"data": [{
		"Contractor_Name": "GOVSPHERE, INC.",
		"Contractor_Details_URL": "http://www.gsaelibrary.gsa.gov/ElibMain/contractorInfo.do;jsessionid=45223235A079C3DB237FB375FB880575.prd2pweb?contractNumber=GS-35F-0593X&contractorName=GOVSPHERE%2C+INC.&executeQuery=YES",
		"Contract_Number": "GS-35F-0593X",
		"Phone": "315-897-7100",
		"Contractor_TC_Price_List": "https://www.gsaadvantage.gov/ref_text/GS35F0593X/GS35F0593X_online.htm",
		"View_Catalog": "http://www.gsaelibrary.gsa.gov/ElibMain/advRedirect.do?contract=GS-35F-0593X&sin=132+51&src=elib&app=cat",
		"State_Local": 1,
		"Small_Business": 1,
		"Other_Than_Small_Business": 0,
		"Women_Owned_Small_Business": 0,
		"Economically_Disadvantaged_Women_Owned_Small_Business": 0,
		"Woman_Owned_Business": 0,
		"Service_Disabled_Veteran_Owned_Small_Business": 0,
		"Veteran_Owned_Small_Business": 0,
		"SBA_Certified_Small_Disadvantaged_Business": 0,
		"SBA_Certified_8a_Firm": 0,
		"SBA_Certified_HUBZone_Firm": 1,
		"State": "NY",
		"City": "SYRACUSE"
	}, {
		"Contractor_Name": "PROGRESSIVE EXPERT CONSULTING, INC.",
		"Contractor_Details_URL": "http://www.gsaelibrary.gsa.gov/ElibMain/contractorInfo.do;jsessionid=45223235A079C3DB237FB375FB880575.prd2pweb?contractNumber=GS-35F-0375V&contractorName=PROGRESSIVE+EXPERT+CONSULTING%2C+INC.&executeQuery=YES",
		"Contract_Number": "GS-35F-0375V",
		"Phone": "315-446-6160",
		"Contractor_TC_Price_List": "https://www.gsaadvantage.gov/ref_text/GS35F0375V/GS35F0375V_online.htm",
		"View_Catalog": "http://www.gsaelibrary.gsa.gov/ElibMain/advRedirect.do?contract=GS-35F-0375V&sin=132+51&src=elib&app=cat",
		"State_Local": 1,
		"Small_Business": 1,
		"Other_Than_Small_Business": 0,
		"Women_Owned_Small_Business": 0,
		"Economically_Disadvantaged_Women_Owned_Small_Business": 0,
		"Woman_Owned_Business": 0,
		"Service_Disabled_Veteran_Owned_Small_Business": 0,
		"Veteran_Owned_Small_Business": 0,
		"SBA_Certified_Small_Disadvantaged_Business": 1,
		"SBA_Certified_8a_Firm": 0,
		"SBA_Certified_HUBZone_Firm": 0,
		"State": "NY",
		"City": "SYRACUSE"
	}]
}
```
