import '@testing-library/cypress/add-commands';

const wait = 2000;
const smallWait = 1000;

// The following text can be shortened if shorter run times are desired.
const commentBody =
  "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Scelerisque viverra mauris in aliquam sem fringilla ut. Nulla pharetra diam sit amet nisl suscipit. Eu nisl nunc mi ipsum faucibus vitae. Qua'm nulla porttitor massa id neque aliquam & Lacinia at quis risus sed vulputate odio ut enim blandit. Sed odio morbi > quis commodo odio aenean sed adipiscing. In dictum < non consectetur a erat.";
const filePath = 'files/Test_File_Add_Admin_Comment.pdf';

/**
 * Deletes the most recent note
 */
function deleteNote () {
  cy.get('span.fa.fa-trash').eq(0).click({ timeout: wait });
  // Wait is needed here to avoid race condition for clicking the DELETE confirmation button
  // eslint-disable-next-line cypress/no-unnecessary-waiting
  cy.findByRole('button', { name: /^Delete$/g, timeout: smallWait })
    .should('be.visible')
    .wait(wait)
    .click({ timeout: wait, force: true });
  cy.verifyToastMessage('deleted note');
};

/**
 * Adds a note, the associated file and then verify the note
 */
function addNote() {
  cy.get('#NotesListingContainer').should('be.visible');
  cy.findByPlaceholderText(/Enter title here/i).click({ force: true }).type('Lorem Ipsum');
  cy.get('div.ql-editor.ql-blank').type(commentBody);
  // Upload and verify a sample file using the cypress-file-upload module
  cy.uploadFile("label[for='new-note-files']", filePath, 0, /Test/i);
  cy.findByText('Create').click({ timeout: wait });
  cy.findAllByText(/Lorem Ipsum/g).should('be.visible');
};

/**
 * Checks if a note already exists
 */
function clickAddNoteLink () {
  cy.get('#NotesListingContainer').should('be.visible');
  cy.locatorExists('div.note-body').then(present => {
    if (present) {
      cy.findByText(/Add Note/g).click({ timeout: wait });
    }
  });
};

const _ = {
  deleteNote,
  addNote,
  clickAddNoteLink
}

export default _;