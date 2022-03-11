import '@testing-library/cypress/add-commands';

export interface DepositCreditParams {
  transactionType?: String, 
  amount: String,
  currency: string,
  comment?: String,
  title?: String,
  
}

const wait = 9000;

function addPayment(depositType){
  cy.waitForLoadingToDisappear();
  cy.get('div.card-body .fa.fa-plus', { timeout: wait }).click();
  cy.findByText(depositType, { timeout: wait }).click();
};

// To add the Credit from 'Deposit' tab on payment History page
function makeTransaction ({ transactionType, amount, currency, comment, title }){
  cy.findByText('Select...').click();
  cy.findByRole('option', { name: transactionType }).click();
  cy.editTextFields(/amount/i, amount);
  if (comment) {
    cy.editTextFields(/comment/i, comment);
  }
  if (title) {
    cy.editTextFields(/title/i, title);
  }
  cy.chooseCurrency(currency);
  cy.findByText(/submit/i).click();
  cy.waitForLoadingToDisappear();
};

// To choose the currency type CAD, USD, AUD or GBP
function chooseCurrency (currency){
  if (currency === 'USD') {
    cy.get('div.currency-selector-wrapper > div:nth-of-type(1)').click();
  } else if (currency === 'CAD') {
    cy.get('div.currency-selector-wrapper > div:nth-of-type(2)').click();
  } else if (currency === 'GBP') {
    cy.get('div.currency-selector-wrapper > div:nth-of-type(3)').click();
  } else {
    cy.get('div.currency-selector-wrapper > div:nth-of-type(4)').click();
  }
};

function verifyImportCenterBtn (buttonName,popUpWindowText){
  cy.clickLeftMenuOption('Import Center', /import_center/g);
  cy.findAllByRole('button', { name: buttonName })
    .first()
    .should('exist')
    .click();
  cy.on('window:confirm', (text) => {
    expect(text).to.contains(popUpWindowText);
    return false;
  });
};

function testDetails (testComment) {
  cy.get('div.card-body .fa.fa-plus', { timeout: wait }).should('be.visible');
  cy.waitForLoadingToDisappear();
  cy.findAllByRole('button', { name: /VIEW DETAILS/i })
    .first()
    .click();
  cy.get('span.description').then((el)=> {
    assert.include(el.text(), testComment);
  });
  cy.get('div > span.fa.fa-times').click();
};

function deductAmount (typeOfCharge,transactionType, amount, currency){
  const now = new Date().getTime();
  const title = `Testing_${transactionType}+${now}`;
  cy.addPayment(typeOfCharge);
  // adding amount to the account
  cy.makeTransaction({ transactionType, amount, currency, title });
  cy.waitForLoadingToDisappear();
  cy.waitForAPIResponse('GET', /\/api\/agents\//g).then(() => {
    cy.testDetails(title)
  })
};

// To add the Credit from 'Deposit' tab on payment History page
function addDetails ({ amount, currency, comment, title }) {
  cy.editTextFields(/amount/i, amount);
  if (comment) {
    cy.editTextFields(/comment/i, comment);
  }
  if (title) {
    cy.editTextFields(/title/i, title);
  }
  cy.chooseCurrency(currency);
  cy.findByText(/submit/i).click();
  cy.waitForLoadingToDisappear();
};

function selectDepositType (accountType, transactionType) {
  cy.findByText('Select Account...').click();
  cy.findByRole('option', { name: accountType }).click();
  cy.findByText('Select Transaction...').click();
  cy.findByRole('option', { name: transactionType }).click();
};

function depositAmount (typeOfCharge, accountType, transactionType, amount, currency) {
  const now = new Date().getTime();
  const title = `Testing_${transactionType}+${now}`;
  cy.addPayment(typeOfCharge);
  // adding amount to the account
  cy.selectDepositType(accountType,transactionType);
  cy.addDetails({amount, currency, title});
  cy.waitForLoadingToDisappear();
  cy.waitForAPIResponse('GET', /\/api\/agents\//g).then(() => {
    cy.testDetails(title)
  })
};

const _ = {
  addPayment,
  makeTransaction,
  chooseCurrency,
  verifyImportCenterBtn,
  testDetails,
  deductAmount,
  addDetails,
  selectDepositType,
  depositAmount
};

export default _;

