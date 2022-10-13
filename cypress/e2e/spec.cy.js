

// NOTES:
// Writing tests to verify all the layers of this application are integrated and functional
// Tool - Cypress -  https://www.cypress.io/
// Framework - Mocha - Comes out of box with Cypress ( Cypress can be used with other frameworks like cucumber )
// Scope - UI and mock restful services ( backend )

describe('Job search feature in EPAM careers section', () => {
  // Writing tests to verify the search features in EPAM - https://www.epam.com/careers

  // Web locators in DOM
  const searchBox = '#new_form_job_search_1445745853_copy-keyword'
  const submitButton = 'button[type="submit"]'
  const remoteText = 'div[class="search-result__item-info"] [class="search-result__location"]'
  const positionName = 'div[class="search-result__item-info"] [class="search-result__item-name"]'

  describe('search feature with key word', () =>{
    // Visit the careers page and intercept the backend calls
    before(()=>{
      cy.visit('https://www.epam.com/careers')
/*      cy.intercept('GET','**!/services/vacancy/search*', {
        statusCode: 404,
        body: '404 Not Found!',
      })*/
     // cy.intercept('GET','**/services/vacancy/search*', { fixture: 'job.json' })
    })

    // Search for title and verify the position name
    it('should have position name', () => {
      cy.get('select[id="new_form_job_search_1445745853_copy-location"]').select('All Locations', {force:true}).should('have.value', 'all_locations')
      cy.get(searchBox).type('Lead Software Test Engineer - Remote')
      cy.get(submitButton).click()

      cy.get(positionName).should('have.text','Lead Software Test Engineer - Remote')
    })


    // verify remote or office
    it('should have remote', function () {
      cy.get(remoteText).should('have.text','Remote')
    });
  })

  describe.skip('search feature when data is not available', ()=>{
    // Visit the careers page and intercept the backend calls
    before(()=>{
      cy.visit('https://www.epam.com/careers')
      cy.intercept('GET','**/services/vacancy/search*', {
        statusCode: 404,
        body: '404 Not Found!',
      })
    })

    it('should have error message', function () {

     // cy.get('').should('have.text','')

    });
  })

})