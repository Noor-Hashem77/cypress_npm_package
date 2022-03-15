import '@testing-library/cypress/add-commands';

const wait = 5000;

/**
 * Close Requirement Details modal and ensure the modal is closed
 * @param option String option to be clicked
 * @param {appId} application ID if the view application option is clicked
 */
const closeRequirementDetailsModal = () => {
  cy.get('[data-testid=modal-close-button] > .fa').click();
  cy.get('[data-testid=modal-close-button] > .fa').should('not.exist');
};

/**
 * Filter the Requirements using requirement name
 * @param requirementName name of the requirement to search for
 */
const filterRequirements = (requirementName) => {
  cy.findByPlaceholderText(/requirement id/i).type(requirementName);
  cy.findByRole('button', { name: /filter/i }).click();
};

/**
 * Open Requirement Details modal
 * @param requirementName name of the requirement to view details for
 */
const openRequirementDetailsModal = (requirementName) => {
  cy.findAllByText(RegExp(requirementName, 'i'), { timeout: wait }).first().click({ force: true });
  cy.findAllByText(/applicant requirements/i, { timeout: wait }).first().should('be.visible');
  cy.findAllByRole('button', { name: /next/i }).first().should('be.visible');
};

const _ = {
  closeRequirementDetailsModal,
  filterRequirements,
  openRequirementDetailsModal
};

export default _;