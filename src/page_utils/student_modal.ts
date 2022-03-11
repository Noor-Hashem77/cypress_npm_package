export interface StudentData {
  email: string;
  phone?: string;
  firstName?: string;
  middleName?: string;
  lastName?: string;
  dateOfBirth?: string;
  citizenship?: string;
  gender?: 'Male' | 'Female';
  leadStatus?: string;
  leadSource?: string;
  customLeadSource?: string;
  countryOfInterest?: string[];
  serviceOfInterest?: string[];
  didStudentConsent: boolean;
}

/**
 * Fills the student modal with the provided data
 * @param studentData of type StudentData
 */
function fillStudentModal
  ({
    email,
    phone,
    firstName,
    middleName,
    lastName,
    dateOfBirth,
    citizenship,
    gender,
    leadStatus,
    leadSource,
    customLeadSource,
    countryOfInterest,
    serviceOfInterest,
    didStudentConsent,
  }: StudentData) {
    cy.findByLabelText('Email').clear().type(email);
    if (phone) {
      cy.findByRole('textbox', { name: /Phone Number/i })
        .clear()
        .type(phone);
    }
    if (firstName) {
      cy.findByRole('textbox', { name: /Given Name/i })
        .clear()
        .type(firstName);
    }
    if (middleName) {
      cy.findByRole('textbox', { name: /Middle Name/i })
        .clear()
        .type(middleName);
    }
    if (lastName) {
      cy.findByRole('textbox', { name: /Family Name/i })
        .clear()
        .type(lastName);
    }
    if (dateOfBirth) {
      cy.findByPlaceholderText('yyyy-mm-dd').clear().type(dateOfBirth);
    }
    if (citizenship) {
      cy.findByRole('textbox', { name: /Country of Citizenship/i })
        .clear()
        .type(citizenship);
      cy.findByRole('option', { name: citizenship }).click();
    }
    if (gender) {
      cy.findByLabelText(`gender-${gender}`).click();
    }
    if (leadStatus) {
      cy.findByRole('textbox', { name: /Status/i })
        .clear()
        .type(leadStatus);
      cy.findByRole('option', { name: leadStatus }).click();
    }
    if (leadSource) {
      cy.findByRole('textbox', { name: /Referral Source/i })
        .clear()
        .type(leadSource);
      cy.findByRole('option', { name: leadSource, exact: true }).click();
    }
    if (customLeadSource) {
      cy.findByRole('textbox', { name: /Custom Referral Source/i }).clear().type(customLeadSource);
    }
    if (countryOfInterest) {
      cy.get('#country_of_interest_checkbox').click();
      countryOfInterest.forEach(c => cy.findByRole('option', { name: c }).click())
      cy.get('body').click(0,0);
    }
    if (serviceOfInterest) {
      cy.get('#service_of_interest_checkbox').click();
      serviceOfInterest.forEach(s => cy.findByRole('option', { name: s }).click())
      cy.get('body').click(0,0);
    }
    if (didStudentConsent) {
      cy.findByRole('checkbox', {
        name: /Student Consent/i
      }).click();
    }
  }

const _ = {
  fillStudentModal
};

export default _;