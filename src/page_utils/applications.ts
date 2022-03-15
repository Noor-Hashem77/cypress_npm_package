import '@testing-library/cypress/add-commands';

const wait = 12000;

/**
 * Click on the option specified
 * @param option String option to be clicked
 * @param {appId} application ID if the view application option is clicked
 */
const viewApplicationOptions = (option, id?) => {
  // eslint-disable-next-line cypress/no-unnecessary-waiting
  cy.wait(2000); // wait is necessary here because sometimes the page loads twice
  cy.findAllByRole('button', { name: new RegExp(`more-actions-${id || ''}`, 'i'), timeout: wait })
    .first()
    .should('be.visible')
    .click({ force: true });

  cy.findAllByText(option, { timeout: wait })
    .first()
    .should('be.visible')
    .invoke('removeAttr', 'target')
    .click();

  if (id != null) {
    const cleanId = id.trim();
    cy.verifyUrl(new RegExp(`/applications/${cleanId}`, 'g'));
  } else {
    cy.verifyUrl(/applications/g);
  }
};

/**
 * Filter the application using application id
 * @param appId id of the app to be filtered
 */
const filterAppId = (appId) => {
  cy.get('input.MuiInputBase-input.MuiOutlinedInput-input').eq(2).type(appId);
  cy.findByRole('button', { name: 'Apply Filters' }).click({ timeout: wait });
  cy.findAllByRole('link', { name: /^[0-9]+$/i, timeout: wait })
    .should('have.length', 2)
    .and('be.visible', { timeout: wait });
};

/**
 * Gets the number of schools in the search results
 * @returns number of schools in the result
 */
const clickOnAppTabs = (tabName) => {
  cy.findByText(tabName).click({ timeout: wait });
};

const applyFiltersOnApplicationsPage = (filterValue, index) => {
  cy.findAllByRole('gridcell', { timeout: wait }).first().should('be.visible');
  cy.findAllByRole('textbox', { timeout: wait })
    .eq(index)
    .click({ force: true })
    .type(filterValue, { force: true });
  cy.findByRole('button', { name: /apply filters/i }).click();
  cy.findAllByText(filterValue, { timeout: wait }).first().should('exist');
};

const navigateToApplicantRequirements = () => {
  cy.findByText(/applicant requirements/i, { timeout: wait }).click();
};

const viewOneRandomApplication = () => {
  // eslint-disable-next-line cypress/no-unnecessary-waiting
  cy.wait(5000); // wait is necessary here because sometimes the page loads twice
  cy.findAllByRole('button', { name: /more-actions-/i, timeout: wait })
    .should('be.visible')
    .should('have.length.gte', 1)
    .eq(0)
    .click({ force: true }); // we don't mind if the button is detached as the open state is persisted

  cy.findAllByText(/all applications/i, { timeout: wait })
    .first()
    .should('be.visible');

  cy.findByRole('link', { name: /all applications/i }).then(link => {
    cy.request(link.prop('href')).its('status').should('eq', 200).visit(link.prop('href'));
  });
  cy.chooseApplicationFromAppliedList();
};

const chooseApplicationFromAppliedList = () => {
  cy.findAllByRole('button', { name: /view/i, timeout: wait })
    .eq(0)
    .closest('a')
    .should('have.attr', 'href')
    .then(href => {
      cy.visit(href.toString());
    });
};

const openQuestionRequirementModal = () => {
  cy.findAllByRole('button', {
    name: /question/i,
    timeout: wait,
  })
    .first()
    .should('exist');
  cy.get('[data-tip="Answer questions for this requirement"]').click();
  cy.findByRole('button', { name: /submit/i }).should('exist');
  cy.get('[data-testid="modal-close-button"]').click();
};

const chooseApplicantRequirementTab = () => {
  cy.findByText(/applicant requirements/i).click();
  cy.get('.fulfill-requirement-button', { timeout: wait }).should('exist');
};

const chooseStudentRecordsTab = () => {
  cy.findByText(/student records/i).click();
  cy.url().should('include', 'student-records');
};

const chooseNotesTab = () => {
  cy.findByText(/notes/i, { timeout: wait }).click();
  cy.url().should('include', 'tab=notes');
};

const openRequirementCreationModal = () => {
  cy.findByText(/create requirement/i).click();
  cy.findByText(/requirement details/i).should('exist');
};

const exitRequirementCreationModal = () => {
  cy
  .findByRole('button', { name: /close/i })
  .click();
};

const openRequirementComparisonModal = () => {
  cy.findAllByText(/compare/i).first().click();
  cy.findByText(/requirement comparison/i).should('exist');
};

const addNewRequirementToApplication = (stage, category, requirementId) => {
  // open the modal
  cy.findByRole('button', { name: /add requirements/i }).click();
  cy.findByText(/select requirement/i).should('exist');
  // fill out the criteria
  cy.findByPlaceholderText(/requirement id \/ internal name/i)
    .click()
    .type(requirementId)
    .type(`{enter}`);
  cy.findAllByText(/stage/i).first().click();
  cy.findAllByRole('option', { name: stage }).eq(0).click();
  cy.findAllByText(/category/i)
    .first()
    .click();
  cy.findAllByRole('option', { name: category }).eq(0).click({ force: true });
  // choose the matching option
  cy.findByRole('dialog').within(() => {
    cy.findAllByRole('checkbox', { timeout: 5000 }).eq(0).check();
  })
  // add the new requirement
  cy.findByRole('button', { name: /confirm/i }).click();
  // verify the modal is closed
  cy.findByRole('button', { name: /confirm/i }).should('not.exist');
};

const exitRequirementComparisonModal = () => {
  cy.findByRole('button', { name: /close/i, timeout: wait }).click({ force: true });
};

const openPreviewMode = () => {
  cy.findByText(/preview mode/i).click();
};

const exitPreviewMode = () => {
  cy.findByText(/exit preview mode/i).click();
};

const createNoteFromTemplate = () => {
  // cy.findByRole("button", { name: /.*(add note)|(hide).*/i }).then((el) => {
  //   if (el.text().toLowerCase().trim() === "add note") {
  //     return cy.findByText(/add note/i).click();
  //   }
  // })
  // cy.findByRole('button', { name: /create from template/i }).click();
  // cy.findByText(/select a template/i).should('exist');
  // cy.findAllByText(/rp template/i).click({ multiple: true });
  // cy.findByRole('button', { name: /choose/i }).click();
  // cy.findByRole('button', { name: /^Create$/ }).click();

  cy.findByRole("button", { name: /.*(add note)|(hide).*/i }).then((el) => {
    if (el.text().toLowerCase().trim() === "add note") {
      return cy.findByText(/add note/i).click();
    }
  })
  cy.findByRole('button', { name: /create from template/i }).click();
  cy.findByText(/select a template/i).should('exist');
  cy.findAllByText(/rp template/i).click({ multiple: true });

  // This is a workaround for an open cypress bug where '.click` does not
  // re-query the element if the element becomes detached between the query and
  // the click
  //
  // I'm not exactly sure why this button gets detached more often, but I'm
  // wondering if it's because one of its grand-parents renders a react tree
  // within a react tree, which is unconventional and might lead to things like
  // this:
  // https://github.com/ApplyBoard/platform_monorepo_ui/blob/89922323a92e890594355359dbf7be139868af0e/apps/ab_students_ui/src/ab-common/src/components/NoteTemplates/NoteTemplatesModal/index.js#L100-L109
  //
  // ```
  //  const template = await new Promise(
  //   (resolve) => {
  //     ReactDOM.render(
  //       <StoreWrapper>
  //         <EnhancedNoteTemplatesModal onTemplate={resolve} isPrivateTab={isPrivate}/>
  //       </StoreWrapper>,
  //       container,
  //     );
  //   },
  // );
  // ```
  //
  // The workaround here works because cypress will retry .should if it fails
  // and we throw an error inside .should if the element is not attached.
  //
  // Right underneath this check we synchronously click the button.  Because we
  // do this synchronously, the "isAttached" check and the "click" happen in the
  // same javascript event loop.  Assuming cypress and the browser share an
  // event loop, this should mean that there's no chance of the button detaching
  // between our check here and our click call
  cy.findByRole('button', { name: /choose/i })
    .should(($btn) => {
      if (!Cypress.dom.isAttached($btn)) {
        throw new Error("Not attached to the DOM");
      }

      $btn.click();
    });

  cy.findByRole('button', { name: /^Create$/ }).click();
};

const removeNotes = () => {
  cy.findAllByRole('button', { name: /^delete note$/i }).first().click();
  cy.findByRole('button', { name: /^delete$/i }).click();
};

const copyApplicationDataToClipboard = () => {
  cy.get('[data-cy="copy-school-name"]').click();
  cy.findByText(/copied school's name to clipboard/i, { timeout: wait }).should('be.visible');
  cy.get('[data-cy="copy-program-name"]').click();
  cy.findByText(/copied program's name to clipboard/i, { timeout: wait }).should('be.visible');
  cy.get('[data-tip="Click to copy application ID"]').click();
  cy.findByText(/copied application id to clipboard/i, { timeout: wait }).should('be.visible');
  cy.get('[data-cy="copy-student-name"]').click();
  cy.findByText(/copied student's name/i, { timeout: wait }).should('be.visible');
  cy.get('[data-cy="copy-agent-name"]').click();
  cy.findByText(/copied recruitment partner's name to clipboard/i, { timeout: wait }).should(
    'be.visible'
  );
};

const deleteAnApplication = () => {
  cy.get('.confirm', { timeout: wait }).should('not.be.visible');
  cy.findAllByRole('button', { name: /view/i, timeout: wait }).first().should('be.visible');
  cy.get('.css-77pvbq > .fa').click();
  cy.findByRole('button', { name: /cancel/i }).should('be.visible');

  // eslint-disable-next-line cypress/no-unnecessary-waiting
  cy.findAllByRole('button', { name: /delete/i, timeout: wait })
    .first()
    .should('be.be.visible')
    .wait(3000) // Wait required to workaround an existing bug with race condition
    .click({ force: true });
  cy.get('.css-77pvbq > .fa').should('not.exist');
};

const deleteAnyExistingApplication = (studentId) => {
  const { baseUrl } = Cypress.config();
  cy.request(`${baseUrl}/api/v0.1/students/${studentId}/applications`).then(response => {
    for (let i = 0; i < response.body.length; i += 1) {
      if (!response.body[i].paid) {
        cy.log('Found applications to DELETE');
        const applicationId = response.body[i].id;
        cy.request({
          method: 'DELETE',
          url: `${baseUrl}/api/v0.1/applications/${applicationId}`,
          headers: {
            'x-csrf-token': response.headers['x-csrf-token'],
          },
        }).then(deleteResponse => {
          expect(deleteResponse.status).to.eq(200);
        });
      }
    }
  });
};

const _ = {
  viewApplicationOptions,
  filterAppId,
  clickOnAppTabs,
  applyFiltersOnApplicationsPage,
  navigateToApplicantRequirements,
  viewOneRandomApplication,
  chooseApplicationFromAppliedList,
  openQuestionRequirementModal,
  chooseApplicantRequirementTab,
  chooseStudentRecordsTab,
  chooseNotesTab,
  openRequirementCreationModal,
  exitRequirementCreationModal,
  openRequirementComparisonModal,
  addNewRequirementToApplication,
  exitRequirementComparisonModal,
  openPreviewMode,
  exitPreviewMode,
  createNoteFromTemplate,
  removeNotes,
  copyApplicationDataToClipboard,
  deleteAnApplication,
  deleteAnyExistingApplication
}


export default _;

