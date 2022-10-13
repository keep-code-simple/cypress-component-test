import { Given, Then, When, And } from "cypress-cucumber-preprocessor/steps";

const searchBoxLocator = '#new_form_job_search_1445745853_copy-keyword'
const submitButtonLocator = 'button[type="submit"]'
const remoteTextLocator = 'div[class="search-result__item-info"] [class="search-result__location"]'
const positionNameLocator = 'div[class="search-result__item-info"] [class="search-result__item-name"]'
const errorMessageLocator = 'section[class="search-result"] div[class="search-result__error-message"]'

Given("I visit epam careers", function () {
    cy.visit('https://www.epam.com/careers')
});

When("search for engineer position", function () {
    cy.get('select[id="new_form_job_search_1445745853_copy-location"]').select('All Locations', {force:true}).should('have.value', 'all_locations')
    cy.get(searchBoxLocator).type('Lead Software Test Engineer - Remote',{force:true})
    cy.get(submitButtonLocator).click()
});

Then("I should see position details", function (rawTable) {
    const expectedData = rawTable.hashes()[0]
    cy.get(positionNameLocator).should('have.text',expectedData.name)
});

When(/^search for "(.*)" position$/, function (positionName) {
    cy.get('select[id="new_form_job_search_1445745853_copy-location"]').select('All Locations', {force:true}).should('have.value', 'all_locations')
    cy.get(searchBoxLocator).type(positionName,{force:true})
    cy.get(submitButtonLocator).click()
});

Then(/^I should see "([^"]*)"$/, function (errorMessage) {
    cy.get(errorMessageLocator).should('have.text', errorMessage)
});