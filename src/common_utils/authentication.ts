import '@testing-library/cypress/add-commands';

const isLocal = Cypress.env('environment') === 'local';
const wait = isLocal ? 15000 : 4000;

/**
 * Function to login the user to AB
 * @param username username of the user
 * @param password password of the user
 * @param path path where login page is found. Defaults to '/'
 */
 const { baseUrl } = Cypress.config();
 function uiLogin(username, password, path = '/', rememberMe = false) {
  console.log('!THIS IS FROM THE PACKAGE inside a folder, Noor!!!')
  const log = Cypress.log({
    name: "uiLogin",
    displayName: "LOGIN",
    message: "Authenticating...",
    autoEnd: false
  });
  cy.visit(path);
  cy.findByRole('textbox').type(username);
  cy.findByPlaceholderText(/••••••••••••/i).type(password);
  if (rememberMe) {
    cy.findByRole('checkbox', { name: /remember username/i }).check({force: true});
  }
  cy.findByRole('button', { name: /log in/i }).click();
  cy.getCookies();
  Cypress.Cookies.preserveOnce();
  log.end(); 
};

function uiLogout() {
  console.log("this is from the package!")
  const log = Cypress.log({
    name: "uiLogout",
    displayName: "LOGOUT",
    message: ['current user logout'],
    autoEnd: false,
  });
  cy.findByTestId('header-profile-link').click({ timeout: wait });
  cy.findByTestId('header-profile-dropdown-item-logout').should('be.visible');
  cy.findByText(/Log out/g).click({ timeout: wait }); 
  log.end();
};

// module.exports = ({
//   NoorLogin,
//   NoorLogout
// });

const _ = {
  uiLogin,
  uiLogout
}

export default _;