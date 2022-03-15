import '@testing-library/cypress/add-commands';
import 'cypress-file-upload';

const isLocal = Cypress.env('environment') === 'local';
const { baseUrl } = Cypress.config();
const wait = isLocal ? 15000 : 4000;

export type FixtureEncoding =
    | 'ascii'
    | 'base64'
    | 'binary'
    | 'hex'
    | 'latin1'
    | 'utf8'
    | 'utf-8'
    | 'ucs2'
    | 'ucs-2'
    | 'utf16le'
    | 'utf-16le';

export type FixtureData =
    | string
    | {
        filePath?: string;
        fileContent?: Blob;
        fileName?: string;
        encoding?: FixtureEncoding;
        mimeType?: string;
        lastModified?: number;
      };

export interface FileProcessingOptions {
    subjectType?: 'input' | 'drag-n-drop';
    force?: boolean;
    allowEmpty?: boolean;
  }

/**
 * Verifies if the URL passed matches the URL of the current page
 * @param path: regular expression containing the pattern to be matched
 */
const verifyUrl = (path) => {
  const log = Cypress.log({
    name: "Verify Url",
    displayName: "url",
    message: [`${path}`],
    autoEnd: false,
  });
  cy.url().should('match', path);
  log.end();
};

/**
 * Verifies the pop up text on top right
 * @param toastText: text to be verified on the pop up message
 */
const verifyToastMessage = (toastText) => {
  cy.get('.toast-message', { timeout: wait }).should('exist').and('contain', toastText);
};

/**
 * Click the link specified by the text
 * @param linkText: Link name
 */
const clickElement = (elName, elText) => {
  cy.findByRole(elName, { name: elText })
    .first()
    .should('be.visible')
    .invoke('removeAttr', 'target')
    .click({ timeout: wait });
};

/**
 * wait for spinner to disappear in monolith grid
 */
const waitForElementToBeRemoved = (locator) => {
  cy.get(locator, { timeout: 20000 }).should('not.exist');
};

/**
 * verifies that button is visible and then clicks on it
 * @param buttonText: Text of the button
 */
const clickButton = (buttonText) => {
  cy.findByRole('button', { name: buttonText, timeout: wait }).first().should('be.visible').click();
};

/**
 * Check if the locator exists in the DOM
 * @param locator: string locator to be verified
 */
const locatorExists = (locator) => {
  cy.get('body').then($body => {
    if ($body.find(locator).length) {
      return true;
    }
    return false;
  });
};

/**
 * Edits the given text field
 * @param header heading of the field to be edited
 * @param placeholder identifier of the field
 * @param value new value of the field
 */
const editTextFields = (placeholder, value, header?) => {
  if (header != null) {
    cy.findByRole('heading', { name: header }).should('exist');
  }
  cy.findByPlaceholderText(placeholder).clear().type(value);
};

/**
 * Edits the given dropdown field and selects the first value in dropdown
 * @param header heading of the field to be edited
 * @param placeholder identifier of the field
 */
const editDropdown = (placeholder, header?) => {
  if (header != null) {
    cy.findByRole('heading', { name: header }).should('exist');
  }
  cy.findByText(placeholder).click({ timeout: wait });
  cy.get("div[class='Select-menu-outer']").children().click({ timeout: wait });
};

/**
 * Wait for SPA Loading... in grids disappear
 */
const waitForLoadingToDisappear = () => {
  cy.findByText('Loading...', { timeout: wait })
    .should('not.exist');
};


/**
 * Searches using the specified top navigation menu
 * @param header heading of the field to be edited
 * @param placeholder identifier of the field
 * @param value new value of the field
 */
const searchUsingTopNavigation = (searchTerm, searchPlaceholder, searchLink) => {
  cy.findAllByPlaceholderText(searchPlaceholder, { timeout: wait }).should('exist');
  cy.findAllByPlaceholderText(searchPlaceholder).type(searchTerm);
  cy.findAllByRole('link', { name: searchLink }).first().should('exist');
  cy.findAllByRole('link', { name: searchLink })
    .first()
    .should('be.visible')
    .invoke('removeAttr', 'target')
    .click({ timeout: wait });
  cy.waitForElementToBeRemoved('.fa');
  cy.waitForLoadingToDisappear();
  cy.findByText(searchTerm, { timeout: wait })
    .should('exist');
};

/**
//  * Upload the given file
//  * @param filePath the path at which the file to be uploaded is present
//  * @param uploadLocator locator which open the explorer
//  */
const uploadFile = (uploadLocator, filePath, index, fileName) => {
  cy.get(uploadLocator).get("input[type='file']").eq(index).attachFile(filePath);
  cy.findAllByText(fileName, { timeout: wait }).should('exist');
};

/**
 * Waits for an API response to load before proceeding.
 */
const waitForAPIResponse = (method, route, alias = 'apiResponse') =>{
  cy.server();
  cy.route({ method, url: route }).as(alias);
};

const findCompleteProfileId = (hasApplication = 0) => {
  cy.request(
    `${baseUrl}/api/v2/students?include=agent,agent.agent_information,agent.agent_information.agent_manager.user,student_information.sales_representative.user&sort=-id&filter[applications]=${hasApplication}`
  ).then(response => {

    const listOfData = response.body.data.filter(dataSet => dataSet.attributes.ready_to_apply);
    return listOfData.length > 0 ? listOfData[0].id : undefined;
  });
};

const removeStudentDocument = (responseBody) => {
  cy.request(
    `${baseUrl}/api/students/${responseBody.profile.student_information_id}/student_profile_documents?include=student_document.student_attachments%2Crequirement_template`
  ).then(nestedResponse => {
    cy.request({
      method: 'DELETE',
      url: `${baseUrl}/api/students/${responseBody.profile.student_information_id}/student_attachments/${nestedResponse.body.included[0].relationships.student_attachments.data[0].id}?method=destroy&type=student_attachments`,
      body: {
        student_id: responseBody.profile.student_information_id,
        id: nestedResponse.body.included[0].relationships.student_attachments.data[0].id,
        type: 'student_attachments',
        method: 'destroy',
      },
      headers: {
        'x-csrf-token': nestedResponse.headers['x-csrf-token'],
      },
    }).then(finalResult => {
      expect(finalResult.status).to.eq(204);
    });
  });
};

const removeApplicationAttachment = (attachmentId, requirementId, xcsrfHeader) => {
    cy.request({
      method: 'DELETE',
      url: `${baseUrl}/api/application_requirements/${requirementId}/requirement_attachments/${attachmentId}?method=destroy&type=requirement_attachments`,
      headers: {
        'x-csrf-token': xcsrfHeader,
      },
    }).then(finalResult => {
      expect(finalResult.status).to.eq(200);
    });
  };

/**
 * Checks that bundle sizes are less than certain thresholds
 */
const checkBundleSizes = (thresholds: {
    mainBundleSize: number;
    mainBundleSizeAfterCompression: number;
    sumOfBundles: number;
    sumOfBundlesAfterCompression: number;
  }) => {
    cy.window().then(win => {
      const entries = win.performance.getEntriesByType('resource');

      const webpackBundles = entries.filter(entry => entry.name.includes('assets/spa-')) as Array<
        PerformanceEntry & { decodedBodySize: number; transferSize: number }
      >;

      const mainBundle = webpackBundles.find(entry => entry.name.includes('main'));
      const mainBundleSize = Math.round((mainBundle?.decodedBodySize || 0) / 1000);
      const mainBundleSizeAfterCompression = Math.round((mainBundle?.transferSize || 0) / 1000);

      const sumOfBundles = Math.round(
        webpackBundles.reduce((acc, curr) => acc + curr.decodedBodySize, 0) / 1000
      );
      const sumOfBundlesAfterCompression = Math.round(
        webpackBundles.reduce((acc, curr) => acc + curr.transferSize, 0) / 1000
      );

      cy.log(`Main bundle size: ${mainBundleSize}kb`);
      cy.log(`Main bundle size after gzip: ${mainBundleSizeAfterCompression}kb`);
      cy.log(`Sum of bundle sizes: ${sumOfBundles}kb`);
      cy.log(`Sum of bundle sizes after gzip: ${sumOfBundlesAfterCompression}kb`);

      cy.wrap(mainBundleSize).should('be.lessThan', thresholds.mainBundleSize);
      cy.wrap(mainBundleSizeAfterCompression).should(
        'be.lessThan',
        thresholds.mainBundleSizeAfterCompression
      );

      cy.wrap(sumOfBundles).should('be.lessThan', thresholds.sumOfBundles);
      cy.wrap(sumOfBundlesAfterCompression).should(
        'be.lessThan',
        thresholds.sumOfBundlesAfterCompression
      );
    });};

const disableBrowserPrompts = () => {
  cy.window().then(win => {
    cy.stub(win, 'prompt').returns('DISABLED WINDOW PROMPT');
  });
};

const closeRPWelcomeModal = () => {
  cy.get('body').then((body) => {
    if (body.find('#welcomeLeadManagement').length > 0) {
      cy.findByRole('button', { name: /close/i })
        .should('be.visible')
        .click();
    };
  });
};

const rpCreateStudent = (email: string) => {
  cy.request(`${baseUrl}api/v2/me?include=agent_information`).then((meResponse) => {
    const rpId: string = meResponse.body.included.find((included: any) => included.type === 'agent_information').id;
    cy.request({
      method: 'POST',
      url: `${baseUrl}api/v2/students`,
      body: {
        data: {
          type: 'student',
          attributes: {
            blocked: false,
            did_student_consent: true,
            email,
          }
        },
        relationships: {
          recruitmentPartner: {
            data: {
              type: 'user',
              id: rpId,
            },
          },
        },
      },
      headers: {
        'x-csrf-token': meResponse.headers['x-csrf-token'],
      },
    }).then(createStudentResponse => {
      expect(createStudentResponse.status).to.eq(200);
    });
  });
};

const setupEventTrackerSpy = () => {
  cy.intercept('POST', 'https://api.perfalytics.com/track').as('trackEvent')
}

const assertEventTrackCall = (expectedEvent: string = '$web_event') =>{
  cy.wait('@trackEvent')
  .then((interceptObj) => expect(interceptObj.request?.body?.event).to.equal(expectedEvent))
}

const _ = {
  verifyUrl,
  verifyToastMessage,
  clickElement,
  waitForElementToBeRemoved,
  clickButton,
  checkBundleSizes,
  locatorExists,
  editTextFields,
  editDropdown,
  waitForLoadingToDisappear,
  searchUsingTopNavigation,
  uploadFile,
  waitForAPIResponse,
  findCompleteProfileId,
  removeStudentDocument,
  removeApplicationAttachment,
  disableBrowserPrompts,
  closeRPWelcomeModal,
  rpCreateStudent,
  setupEventTrackerSpy,
  assertEventTrackCall
}

export default _;


