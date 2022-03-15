import '@testing-library/cypress/add-commands';

const wait = 10000;

/**
 * Clears the existing shool and program filters by pressing
 * on the CLEAR FILTERS button at the bottom.
 */
const clearFilters = () => {
  cy.scrollTo('bottom');
  cy.findByText(/CLEAR FILTERS/i, { timeout: wait }).click();
  cy.scrollTo('top');
};

/**
 * Clears the existing shool and program filters by pressing
 * on the CLEAR FILTERS button at the bottom.
 * @param index which of the 2 Apply Filter Buttons to be clicked.
 *  0 is the first and 1 is the second
 */
const applyFilters = (index) => {
  cy.scrollTo('bottom');
  cy.findAllByText(/APPLY FILTERS/i)
    .eq(index)
    .click({ timeout: wait });
  cy.scrollTo('top');
};

/**
 * Gets the number of programs in the search results
 * @returns number of programs in the result
 */
const getProgramCount = () => {
  // this function is working only for Student, because button Apply is available only for this user type
  cy.findAllByText('Apply', { timeout: wait })
    .should("be.visible");
  cy.get('[walkme-id="quicksearch-programs"]', { timeout: wait })
    .should('be.visible')
    .invoke('text')
    .then(orgCount => cy.wrap(orgCount.substring(orgCount.lastIndexOf('(') + 1, orgCount.lastIndexOf(')')), { timeout: wait }));
};

/**
 * Gets the number of schools in the search results
 * @returns number of schools in the result
 */
const getSchoolCount = () => {
  cy.findByRole('tab', { name: /Schools(?:\s\(\d+\+?\))?/i })
    .should('be.visible')
    .invoke('text')
    .then($orgCount => cy.wrap($orgCount.substring($orgCount.lastIndexOf('(') + 1, $orgCount.lastIndexOf(')'))));
};

/**
 * Search by school name or location
 * @param schoolOrLocation School name or location
 */
const searchBySchoolName = (schoolOrLocation) => {
  cy.findByPlaceholderText(/school name or location/i).type(schoolOrLocation);
  cy.findByRole('option', { name: schoolOrLocation, timeout: wait }).first().click();
  cy.clickSearch();
};

/**
 * Search by Program Name
 * @param programName Program name
 */
const searchByProgramName = (programName) => {
  cy.findByPlaceholderText(/What would you like to study/i).type(programName);
  cy.findByRole('option', { name: programName, timeout: wait }).first().click();
  cy.clickSearch();
};

/**
 * Searches by both parameters
 * @param programName Program name
 * @param schoolName the name of the school or the location
 */
const searchByProgramAndSchool = (programName, schoolName) => {
  cy.findAllByRole('searchbox', { timeout: wait }).first().type(programName);
  cy.findAllByRole('searchbox').eq(1).type(schoolName);
  cy.clickSearch();
};

/**
 * Land on the school page after searching
 * @param schoolName the name of school
 */
const viewSchoolBySchoolName = (schoolName) => {
  cy.searchBySchoolName(schoolName);
  // Click on Search results
  cy.clickElement('link', new RegExp(schoolName));
};

/**
 * Clicks the search button
 */
const clickSearch = () => {
  cy.waitForAPIResponse('POST', /\/program_search.json/g);
  cy.findByRole('button', { name: /^Search$/, timeout: wait }).click();
  cy.findByRole('tab', { name: /Programs(?:\s\(\d+\+?\))?/i, timeout: wait }).should('be.visible');
};

/**
 * Chooses a country from dropdown under the School Filters
 */
const chooseCountryUnderSchoolFilters = (countryName) => {
  cy.findAllByText(/Select.../i).eq(1).click({ force:true })
  cy.findAllByText(RegExp(countryName))
    .first()
    .click();
};

/**
 * Applies the filter and verifies that the search has returned schools and programs
 */
const applySchoolLocationFilter = () => {
  cy.chooseCountryUnderSchoolFilters('Canada');
  cy.applyFilters(1);
  cy.findAllByText(/apply/i, { timeout: wait }).eq(2).should('be.visible');
  cy.getProgramCount().then(programCount => {
    expect(Number(programCount.replace('+', ''))).to.be.greaterThan(0);
  });
  cy.getSchoolCount().then(schoolCount => {
    expect(Number(schoolCount.replace('+', ''))).to.be.greaterThan(0);
  });
};

/**
 * Enter English score on Eligibility panel
 */
const enterEnglishScore = (examType, score) => {
  cy.findByText(/ielts/i)
    .type('{backspace}');
  cy.findByText(examType)
    .click();
  for (let i = 1; i < 5; i += 1) {
    cy.findAllByRole('spinbutton')
      .eq(i)
      .type(score);
  }
};

/**
 * Enter grading scheme on Eligibility panel
 */
const enterGradingScheme = (gradingSchemeValue) => {
  // cy.get(':nth-child(6) > .field-dirty > .css-2b097c-container > .react-select__control > .react-select__value-container')
  cy.findAllByText(/Select.../i).eq(2)
    .click();
  cy.findAllByText(gradingSchemeValue)
    .first()
    .click();
};

/**
 * Enter education level on Eligibility panel
 */
const enterEducationLevel = (educationLevelValue) => {
  // cy.get('.css-leitz7 > :nth-child(5) > .css-24i1hw > .css-2b097c-container > .react-select__control')
  cy.findByText(/3-Year Bachelors Degree/i)
    .click()
    .type(`{backspace}${educationLevelValue}`);
  cy.findAllByText(educationLevelValue)
    .eq(1)
    .click({ force: true });
};

/**
 * Enter grading average on Eligibility panel
 */
const enterGradingAverage = (gradingAverageValue) => {
  cy.findAllByRole('spinbutton')
    .first()
    .type('{backspace}')
    .type(gradingAverageValue);
};
/**
 * Check student eligibility for a specific school and program
 */
const checkStudentEligibilityForSchoolAndProgram = (student, location, programName) => {
  cy.searchByProgramAndSchool(programName, location);
  cy.wait('@apiResponse');
  cy.findAllByText(/select student/i, { timeout: wait })
    .eq(1)
    .click({ force: true });
  cy.findByRole('textbox', { name: /student/i })
    .type(student);
  cy.findAllByRole('option', { name: RegExp(student), timeout: wait })
    .first()
    .click();
  cy.findByText(/apply now/i, { timeout: wait })
    .should('be.visible');
};

/**
 * Apply for a program for as RP or as Student
 */
const applyForAProgram = (userType) => {
  // increasing the timeout for quick search page until the performance improves
  cy.findByText(/eligibility/i, { timeout: 25000 }).should('exist');
  cy.findAllByText('Apply', { timeout: wait }).eq(6).click({ force:true });
  if (userType === 'rp') {
    cy.get('.confirm', { timeout: wait }).click();
  }
};

/**
 * Choose a Study Permit or Visa from dropdown on Quick search page
 * Make sure you  don't use the full matching String since it will have difficulty choosing the value from Dropdown
 * If you are interested to remove existing values, make sure you pass TRUE for removeExistingVisaTypes value
 */
const chooseVisaTypeFromDropDown = (visaTypeRegExp, removeExitingVisaTypes) => {
  if (removeExitingVisaTypes) {
    cy.get('.css-2b097c-container > .react-select__control > .react-select__indicators > .react-select__clear-indicator > .css-19bqh2r').then(($button) => {
      if ($button.length) {
        cy.get('.css-2b097c-container > .react-select__control > .react-select__indicators > .react-select__clear-indicator > .css-19bqh2r').first().click();
      }
    });
  }
  const visaType = String(visaTypeRegExp).split('/');
  cy.get('.css-gjxt3z > .css-2b097c-container > .react-select__control').click().type(String(visaType[1]));
  cy.findAllByText(visaTypeRegExp).eq(2).click({ force: true });
};

const _ = {
  clearFilters,
  applyFilters,
  getProgramCount,
  getSchoolCount,
  searchBySchoolName,
  searchByProgramName,
  searchByProgramAndSchool,
  viewSchoolBySchoolName,
  clickSearch,
  chooseCountryUnderSchoolFilters,
  applySchoolLocationFilter,
  enterEnglishScore,
  enterGradingScheme,
  enterEducationLevel,
  enterGradingAverage,
  checkStudentEligibilityForSchoolAndProgram,
  applyForAProgram,
  chooseVisaTypeFromDropDown
};

export default _;
