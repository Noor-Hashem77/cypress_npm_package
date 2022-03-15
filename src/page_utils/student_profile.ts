import '@testing-library/cypress/add-commands';
import 'cypress-file-upload';

const wait = 3000

const findAttendedSchools = () => {
  cy.get('#EducationHistoryPage')
    .its('length')
    .then(() => {
      cy.findAllByRole('button', { name: /expand/i })
        .its('length')
        .then(lengthOfEntries => lengthOfEntries);
    });
};

const editStudentAddressDetails = (studentData) => {
  cy.findAllByRole('textbox', { name: /address/i, timeout: wait })
    .first()
    .clear()
    .type(studentData.address);
  cy.findAllByRole('textbox', { name: /city\/town/i })
    .first()
    .clear()
    .type(studentData.city);
  cy.findAllByRole('combobox')
    .eq(1)
    .click({ force: true });
  cy.findAllByRole('option', { name: studentData.country}).click();
  cy.findAllByRole('textbox', { name: /postal\/zip code/i })
    .first()
    .clear()
    .type(studentData.postalCode);
  cy.findByRole('textbox', { name: /email/i })
    .clear()
    .type(studentData.email);
};

const _ = {
  findAttendedSchools,
  editStudentAddressDetails
};

export default _;