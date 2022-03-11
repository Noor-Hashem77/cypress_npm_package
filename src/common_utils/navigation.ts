import '@testing-library/cypress/add-commands';

export interface MenuTestData {
  menuName: String;
  pageHeader: String;
}

const wait = 10000;

/**
 * Menu availability check with page load
 */
function menuCheck (menuTestData) {
  menuTestData.forEach((el: MenuTestData) => {
    cy.findAllByText(el.menuName)
      .first()
      .should('exist')
      .invoke('show')
      .click({ force: true })
      .then(() => {
        cy.findAllByText(el.pageHeader, { timeout: wait }).should('be.visible');
      });
  });
};

/**
 * Simple menu availability check
 */
function simpleMenuCheck (menuItems) {
  menuItems.forEach((el: String) => {
    cy.findAllByText(el).first().should('exist');
  });
};

/**
 * Clicks on one menu option and verifies it
 */
function clickLeftMenuOption (menuName, url) {
  cy.findAllByText(menuName)
    .first()
    .should('exist')
    .invoke('show')
    .click({ force: true })
    .then(() => {
      cy.verifyUrl(url);
    });
};

/**
 * Clicks on the first link from any given grid or list
 */
function navigateToFirstLinkFromList (linkName){
  cy.findAllByRole('link', { name: linkName }).first().then(link => {
    cy.request(link.prop('href')).its('status').should('eq', 200).visit(link.prop('href'));
  });
};

const _ = {
  menuCheck,
  simpleMenuCheck,
  clickLeftMenuOption,
  navigateToFirstLinkFromList
}

export default _;