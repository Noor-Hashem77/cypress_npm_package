export interface SchoolData {
  levelOfEducation: string;
  countryOfInstitution: string;
  nameOfInstitution: string;
  primaryLanguageOfInstruction: string;
  institutionStartDate: string;
  institutionEndDate: string;
  dateGraduated: string;
  degreeAwarded: boolean;
  degreeName: string;
  hasGraduated: boolean;
  schoolAddress: string;
  city: string;
  province: string;
  postalCode: string;
}

/**
 * Fills the student modal with the provided data
 * @param schoolData of type SchoolData
 */
function fillAttendedSchoolInformation(){
  ({
    levelOfEducation,
    countryOfInstitution,
    nameOfInstitution,
    primaryLanguageOfInstruction,
    institutionStartDate,
    institutionEndDate,
    degreeName,
    dateGraduated,
    schoolAddress,
    city,
    province,
    postalCode,
  }: SchoolData) => {
    cy.enterNameOfInstitution(nameOfInstitution);
    cy.enterLevelOfEducation(levelOfEducation);
    cy.enterTextboxDataByName(/primary language of instruction/i, primaryLanguageOfInstruction);
    cy.enterTextboxDataByName(/degree name/i, degreeName);
    cy.enterTextboxDataByName(/attended institution from/i, institutionStartDate);
    cy.enterTextboxDataByName(/attended institution to/i, institutionEndDate);
    cy.enterHasGraduated();
    cy.enterTextboxDataByName(/graduation date/i, dateGraduated);
    cy.enterDegreeAwarded();
    cy.enterSchoolLocation(/address/i, schoolAddress, 1);
    cy.enterSchoolLocation(/city\/town/i, city, 1);
    cy.enterSchoolLocation(/province/i, province, 0);
    cy.enterSchoolLocation(/postal\/zip code/i, postalCode, 1);
    cy.enterCountryOfInstitution(countryOfInstitution);
  }};

function enterNameOfInstitution (nameOfInstitution) {
  cy.findAllByRole('textbox', { name: /name of institution/i })
    .first()
    .type(nameOfInstitution);
};

function enterLevelOfEducation(levelOfEducation){
  cy.findByRole('button', { name: /select level of education.../i })
    .click();
  cy.findAllByRole('option', { name: levelOfEducation })
    .eq(0)
    .click({ force: true });
};

function enterTextboxDataByName(locator, data) {
  cy.findByRole('textbox', { name: locator })
    .type(data);
};

function enterHasGraduated(){
  cy.findAllByRole('radio', { name: /yes/i })
    .first()
    .click();
};

function enterDegreeAwarded (){
  cy.findAllByRole('checkbox', { name: /i have the physical certificate for this degree/i })
    .first()
    .click();
};

function enterSchoolLocation(locator, location, index) {
  cy.findAllByRole('textbox', { name: locator })
    .eq(index)
    .type(location);
};

function countryOfInstitution (countryOfInstitution){
  cy.findByRole('textbox', { name: /country of institution/i })
    .click()
  cy.findAllByRole('option', { name: countryOfInstitution })
    .eq(0)
    .click();
};

const _ = {
  fillAttendedSchoolInformation,
  enterNameOfInstitution,
  enterLevelOfEducation,
  enterTextboxDataByName,
  enterHasGraduated,
  enterDegreeAwarded,
  enterSchoolLocation,
  countryOfInstitution
};

export default _;
