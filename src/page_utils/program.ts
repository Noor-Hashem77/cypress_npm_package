import '@testing-library/cypress/add-commands';

const wait = 6000;

const filterProgramsByLevel = (degree, name) => {
  cy.findAllByRole('combobox').first().click({ force: true });
  cy.findAllByRole('option', RegExp(degree)).first().click();
  cy.findAllByRole('combobox').eq(1).click({ force: true });
  cy.findAllByRole('option', RegExp(name)).eq(1).click();
};

const openCheckEligibilityModal = () => {
  cy.findAllByText(/check eligibility/i, { timeout: wait }).first().click({ force: true });
};

const closeCheckEligibilityModal = () => {
  cy.findByRole('button', { name: 'close' }).click();
  cy.findByRole('heading', { name: /check student eligibility/i }).should('not.exist');
};

const _ = {
  filterProgramsByLevel,
  openCheckEligibilityModal,
  closeCheckEligibilityModal
};

export default _;

