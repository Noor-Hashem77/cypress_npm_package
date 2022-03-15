import '@testing-library/cypress/add-commands';
import RandomCity from '../data_enums/city';
import RandomLanguage from '../data_enums/language';

const wait = 8000;

const firstNameArr: string[] = ['Rachel', 'Dwight', 'Ross', 'Monica', 'John the 2nd', 'Stewie'];
const middleNameArr: string[] = ['', 'Xavier the 3rd', 'Sam', 'Anglia', 'Parminder', 'Rajesh'];
const lastNameArr: string[] = ["O'Brian", 'Oshay', 'Pearce', 'Griffin', 'Singh', 'Sharma'];
const passportArr: string[] = [
  'A1234567',
  'B8000000',
  'X9876543',
  'P1239876',
  'M1299335',
  'R4019346',
];

const randomNum: number = Math.floor(Math.random() * 6);

/**
 * Click on the option specified
 * @param name String option to be clicked
 * @param {id} student ID if the edit profile option is clicked
 */
const viewStudentOptions = (name, id?, timeout = wait) => {
  cy.findAllByRole('button', { name: new RegExp(`more-actions-${id || ''}`, 'i'), timeout })
    .first()
    .should('be.visible')
    .click();

  cy.findByRole('link', { name: new RegExp(name, 'i') })
    .should('be.visible')
    .invoke('removeAttr', 'target')
    .click({ timeout: wait });

  if (id != null) {
    cy.verifyUrl(new RegExp(`/students/${id}`, 'g'));
  } else {
    cy.verifyUrl(/students/g);
  }
};

/**
 * Find number of Complete profile on first page
 * @returns true if complete profiles exist
 */
const findCompleteProfiles = () => {
  cy.findAllByRole('gridcell', { name: /Complete/g }).then(profileCount => {
    if (Cypress.$(profileCount).length) {
      return true;
    }
    return false;
  });
};

const advisorSelectStudentFromList = (option) => {
  cy.viewStudentOptions(option);
};

const rpSearchForStudentFromList = (option, value) => {
  cy.findAllByRole('gridcell', { timeout: wait }).first().should('be.visible');
  cy.findByRole('textbox', { name: option, timeout: wait })
    .should('be.visible')
    .type(value, { force: true });
  cy.findAllByRole('link', { name: RegExp(value), timeout: wait }).should('be.visible');
};

/**
 * Save Edited details
 * @returns true if complete profiles exist
 */
const saveDetails = () => {
  cy.findAllByRole('button', { name: /Save/g })
    .filter(':visible')
    .click({ timeout: wait, multiple: true });
  cy.verifyToastMessage('data was saved');
};

/**
 * Clicks on Reset Filters
 */
const resetFilters = () => {
  cy.findAllByRole('button', { name: /Reset Filters/g })
    .filter(':visible')
    .click({ timeout: wait });
};

/**
 * Edit the Student Personal Information
 */
const editPersonalInformation = () => {
  cy.findByRole('textbox', { name: /First Name/i }).type(firstNameArr[randomNum]);
  cy.findByRole('textbox', { name: /Middle Name/i }).type(middleNameArr[randomNum]);
  cy.findByRole('textbox', { name: /Last Name/i }).type(lastNameArr[randomNum]);
  cy.findByRole('textbox', { name: /Date of Birth/i }).type('1995-07-27');
  cy.findByRole('textbox', { name: /First Language/i }).type(RandomLanguage());
  cy.findByRole('textbox', { name: /Passport Number/i }).type(passportArr[randomNum]);
};

/**
 * Edit the Student Address Detail
 */
const editAddressDetail = () => {
  cy.findByRole('textbox', { name: /City\/Town/i }).type(RandomCity());
  cy.findByRole('textbox', { name: /Postal\/Zip Code/i }).type(`${Math.floor(Math.random() * 90000)}${10000}`);
  cy.editTextFields(/\+1 201-555-0123/g, '+1 437-000-1122');
  cy.findByRole('textbox', { name: /Email/i }).type('email@test.com');
};

/**
 * Edit the Student Test Scores
 */
const editTestScores = () => {
  cy.findByRole('spinbutton', { name: /Enter Exact Scores/i }).clear().type(`${Math.floor(Math.random() * 3 + 6)}`);
  cy.editTextFields(/Reading/i, `${Math.floor(Math.random() * 3 + 6)}`);
  cy.editTextFields(/Writing/i, `${Math.floor(Math.random() * 3 + 6)}`);
  cy.editTextFields(/Speaking/i, `${Math.floor(Math.random() * 3 + 6)}`);
};

const editDate = () => {
  cy.findAllByRole('textbox', { name: /date of exam/i })
    .first()
    .should('have.attr', 'placeholder', 'yyyy-mm-dd')
    .type('2020-08-24');
};

const _ = {
  viewStudentOptions,
  findCompleteProfiles,
  advisorSelectStudentFromList,
  rpSearchForStudentFromList,
  saveDetails,
  resetFilters,
  editPersonalInformation,
  editAddressDetail,
  editTestScores,
  editDate
};

export default _;
