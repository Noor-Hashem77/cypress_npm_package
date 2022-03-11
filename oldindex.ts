// // module.exports = require('./Support/common_utils/login.spec.js');
// // module.exports = {cy: require('./Support/login')}
// // export { login } from './Support/index';
// import '@testing-library/cypress/add-commands';

// export * from './src/authentication';
// import NoorLogin from './src/common_utils/2authentication';

// const initialize = () => {
//   Cypress.Commands.add('NoorLogin', { orevSubject: true } ,NoorLogin);
// };

// initialize();

// /**
//  * Function to login the user to AB
//  * @param username username of the user
//  * @param password password of the user
//  * @param path path where login page is found. Defaults to '/'
//  */
//  Cypress.Commands.add('NoorLogin', (username, password, path = '/', rememberMe = false) => {
//   console.log('THIS IS FROM THE PACKAGE!!')
//   const log = Cypress.log({
//     name: "uiLogin",
//     displayName: "LOGIN",
//     message: "Authenticating...",
//     autoEnd: false
//   });
//   cy.visit(path);
//   cy.findByRole('textbox').type(username);
//   cy.findByPlaceholderText(/••••••••••••/i).type(password);
//   if (rememberMe) {
//     cy.findByRole('checkbox', { name: /remember username/i }).check({force: true});
//   }
//   cy.findByRole('button', { name: /log in/i }).click();
//   cy.getCookies();
//   Cypress.Cookies.preserveOnce();
//   log.end();
// });



// // declare namespace Cypress {
// //   interface Chainable {
// //     /**
// //      * Custom command to select DOM element by data-cy attribute.
// //      * @example cy.dataCy('greeting')
// //      */
// //      NoorLogin(username: string, password: string, path?: string, rememberMe?: Boolean): Chainable<any>;
// //   }
// // }

// declare global {
//   namespace Cypress {
//     interface Chainable {
//       NoorLogin(username: string, password: string, path?: string, rememberMe?: Boolean): Chainable<any>;
//     }
//   }
// }