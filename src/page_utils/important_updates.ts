import '@testing-library/cypress/add-commands';

const isLocal = Cypress.env('environment') === 'local';
const wait = isLocal ? 30000 : 18000;
const OPTIONS = { timeout: wait };

function navigateToImportantUpdates(){
  cy.get('[data-testid=header-important-updates-dot]').click({ timeout: wait });
  cy.findByText(/notes/i, OPTIONS).should('exist');
};

function viewNotesFromImportantUpdates(){
  cy.findByText(/notes/i).click();
  cy.findByRole('button', { ...OPTIONS, name: /all/i });
  cy.findAllByRole('link', { ...OPTIONS, name: /view/i })
    .eq(0)
    .closest('a')
    .should('have.attr', 'href').then(href => {
      cy.visit(href.toString());
    });
};

function replyToNote() {
  cy.findAllByRole('button', { ...OPTIONS, name: /^reply note$/i }).first().click();
  cy.findByText((/create from template/i)).should('exist');
  cy.findAllByRole('button', { name: /create/i }).first().should('exist');
  cy.findAllByText(/hi,/i).eq(0).click();
};

const _ = {
  navigateToImportantUpdates,
  viewNotesFromImportantUpdates,
  replyToNote
};

export default _;