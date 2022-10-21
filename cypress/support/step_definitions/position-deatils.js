import {Given, When, And, Then} from "cypress-cucumber-preprocessor/steps";

const searchBoxLocator = '#new_form_job_search_1445745853_copy-keyword'
const submitButtonLocator = 'button[type="submit"]'
const remoteTextLocator = 'div[class="search-result__item-info"] [class="search-result__location"]'
const positionNameLocator = 'div[class="search-result__item-info"] [class="search-result__item-name"]'
const errorMessageLocator = 'section[class="search-result"] div[class="search-result__error-message"]'
const locationDropBoxLocator = 'select[id="new_form_job_search_1445745853_copy-location"]'


When("I visit epam careers", function () {
    // Here is the live epam careers page -  https://www.epam.com/careers
    // Supposing we have this application running locally
    // cy.visit('http://localhost:3000/careers')
    cy.visit('https://www.epam.com/careers')
});

And("I search for {string} position", function (positionName) {

    //’positionName’ will hold the key word coming from scenario to this step definition

    // entering position name to search
    cy.get(searchBoxLocator).type(positionName)

    // submitting to be search for the position
    cy.get(submitButtonLocator).click()

});

Then("I should see position details as below", function (rawTable) {

    //Reading the expected data from scenario
    const expectedData = rawTable.hashes()[0]

    //Asserting the position name to have expected name
    cy.get(positionNameLocator).should('have.text',expectedData.name)

    // Asserting position type to have expected type
    cy.get(remoteTextLocator).should('have.text',expectedData.positionType)

});


Then("I should see an error message {string}", function (expectedErrorMessage) {

    cy.get(errorMessageLocator).should('have.text', expectedErrorMessage)

});

//-----------------Stubs different ways


// In-line stubbing
Given("There is one {string} position available", function (positionName) {

    // Preparing your stub with expected details, in this case name
    const staticResponse = {
        "result": [
            {
                "id": 85368,
                "name": positionName,
                "displayedLocation": "REMOTE"
            }
        ],
        "total": 1
    }

    // intercepting the actual GET call to vacancy service
    // stubbing out the response to return
    cy.intercept('GET','**/services/vacancy/search*', staticResponse )

});


// Modify the stub at runtime
Given("There are {int} available positions", function (numberOfPositions) {

    cy.fixture('job-office.json').then((stubAllPositions)=>{

        cy.intercept('GET','**/services/vacancy/search*', stubAllPositions)
    })
});

// inject the file
Given("There are {int} positions", function (numberOfPositions) {
    // Stub
    cy.intercept('GET','**/services/vacancy/search*', { fixture: 'job-remote.json' })
});


// Stub for negative test
Given("Vacancy service is not available", function () {
    // Stub
    cy.intercept('GET','**/services/vacancy/search*', {
        statusCode: 500,
        body: '500 Internal server error!!',
        headers: {
            'x-not-found': 'true',
        },
    })
});



// In-line stubbing
Given("There are no positions available", function () {

    // Preparing your stub with expected details, in this case name
    const staticResponse = {
        "result": [],
    }

    // intercepting the actual GET call to vacancy service
    // stubbing out the response to return
    cy.intercept('GET','**/services/vacancy/search*',
        {
            statusCode: 200,
            body: {
                "result": [],
            }
        })

});
