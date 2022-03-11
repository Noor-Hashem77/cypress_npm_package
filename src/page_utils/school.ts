import '@testing-library/cypress/add-commands';

const wait = 15000;

/**
 * Click on the filter by given placeholder
 */
function applyProgramFilter (filterPlaceHolder){
  cy.intercept({
    method: 'GET',
    url: `/api/schools/2/programs?filter%5Bdiscipline_ids%5D=&filter%5Blevel%5D=&filter%5Bprogram_name%5D=&filter%5Bpublication_status%5D=all&include=program_intakes&page%5Bnumber%5D=1&parent=%5Bobject%20Object%5D&sort=-tuition&stats%5Btotal%5D=count`
  }).as('sortPrograms');
  cy.findAllByText(/Filters/g)
    .eq(0)
    .click({ timeout: wait });
  cy.waitForAPIResponse('GET', /\/conditions\//g);
  cy.findByText(filterPlaceHolder).click();
  cy.findAllByRole('option', { name: /tuition/i }).eq(1).click();
  cy.wait('@sortPrograms').its('response.statusCode').should('equal', 200);
};

/**
 * Clears the existing filters.
 */
function clearFilters (){
  cy.findByText(/Clear Filters/g, { timeout: wait }).click();
};

/**
 * Clicks on specified top menu link.
 * @param menuItem the given menu item
 */
function clickOnHeaderMenu (menuItem) {
  cy.get("div[class='not_sticky']")
    .children()
    .children()
    .within(() => {
      cy.findByText(menuItem).click();
    });
};

/**
 * Clicks program anme and verifies header.
 * @param menuItem the given menu item
 */
function clickProgramName (programName){
  cy.get('div.card-header a', { timeout: wait }).eq(0).invoke('removeAttr', 'target').click();
  cy.findAllByRole('heading').eq(0).should('contain', programName).and('be.visible');
};

const _ = {
  applyProgramFilter,
  clearFilters,
  clickOnHeaderMenu,
  clickProgramName
};

export default _;