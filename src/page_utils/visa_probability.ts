export interface VisaProbabilityFormData {
  countryOfCitizenship: string;
  countryOfResidence: string;
  age: string;
  gender: 'Male' | 'Female' | 'Other';
  levelOfStudy?: string[];
  province?: string[];
}

/**
 * Fills the visa probability form with the provided data
 * @param visaProbabilityFormData of type VisaProbabilityFormData
 */
function fillVisaProbabilityForm
  ({
    countryOfCitizenship,
    countryOfResidence,
    age,
    gender,
    levelOfStudy,
    province,
  }: VisaProbabilityFormData) {
    cy.findByRole('textbox', { name: /Country of Citizenship/i })
      .clear()
      .type(countryOfCitizenship)
      .type('{enter}');
    cy.findByRole('textbox', { name: /Country of Residence/i })
      .clear()
      .type(countryOfResidence)
      .type('{enter}');
    cy.findByRole('spinbutton', { name: /Age/i })
      .clear()
      .type(age);
    cy.findByRole('radio', { name: gender }).click();
    levelOfStudy?.forEach(val => {
      cy.findByRole('textbox', { name: 'Desired level(s) of study' })
        .clear()
        .type(val)
        .type('{enter}');
    })
    province?.forEach(val => {
      cy.findByRole('textbox', { name: 'Desired destination province(s)' })
        .clear()
        .type(val)
        .type('{enter}');
    })
  }

const _ = {
  fillVisaProbabilityForm
};

export default _;