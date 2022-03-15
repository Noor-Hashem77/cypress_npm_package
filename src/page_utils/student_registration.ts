export interface StudentRegistrationForm {
  email: string;
  password: string;
}

/**
 * Fills the student modal with the provided data
 * @param studentData of type StudentRegistrationForm
 */
const fillStudentRegistration = ({
  email,
  password,
}: StudentRegistrationForm) => {
  if (email) {
    cy.findByPlaceholderText(/Email/i)
      .clear()
      .type(email);
  }
  if (password) {
    cy.findByPlaceholderText("Password")
      .clear()
      .type(password);
  }
  if (password) {
    cy.findByPlaceholderText(/Confirm Password/i)
      .clear()
      .type(password);
  }
  cy.get('input#user_has_accepted_terms').check()
  cy.get('input#user_has_accepted_privacy').check()      
};

const _ = {
  fillStudentRegistration
};

export default _;