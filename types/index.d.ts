import '@testing-library/cypress/add-commands';
import 'cypress-file-upload';
import { SchoolData } from '../src/page_utils/attended_school';
import { DepositCreditParams } from '../src/page_utils/payment';
import { StudentData } from '../src/page_utils/student_modal';
import { StudentRegistrationForm } from '../src/page_utils/student_registration';
import { VisaProbabilityFormData } from '../src/page_utils/visa_probability';
import { FixtureData, FileProcessingOptions, FixtureEncoding} from '../src/common_utils/otherCommands'

declare global {
  namespace Cypress {
    interface Chainable {
      // authentication.js
      uiLogin7(username: string, password: string, path?: string, rememberMe?: Boolean): Chainable<any>;
      uiLogout(): Chainable<any>;

      // commands.js
      verifyUrl(path: RegExp): Chainable<any>;
      verifyToastMessage(toastText: string): Chainable<any>;
      locatorExists(locator: string): Chainable<any>;
      uploadFile(
        uploadLocator: string,
        filePath: string,
        index: number,
        fileName: RegExp | string
      ): Chainable<any>;
      editTextFields(placeholder: RegExp, value: string, header?: RegExp): Chainable<any>;
      searchUsingTopNavigation(
        searchTerm: string,
        searchPlaceholder: RegExp,
        searchLink: RegExp
      ): Chainable<any>;
      clickElement(elName: string, linkText: RegExp): Chainable<any>;
      clickButton(buttonText: RegExp): Chainable<any>;
      waitForAPIResponse(method: string, route: RegExp, alias?: string): Chainable<any>;
      findCompleteProfileId(hasApplication?: 0 | 1): Chainable<any>;
      removeStudentDocument(responseBody: any): Chainable<any>;
      removeApplicationAttachment(
        applicationId: string,
        indexNumber: number,
        xcsrfHeader: string
      ): Chainable<any>;
      editDropdown(placeholder: RegExp, header?: RegExp): Chainable<any>;
      checkBundleSizes(thresholds: {
        mainBundleSize: number;
        mainBundleSizeAfterCompression: number;
        sumOfBundles: number;
        sumOfBundlesAfterCompression: number;
      }): Chainable<any>;
      waitForElementToBeRemoved(locator: string): Chainable<any>;
      disableBrowserPrompts(): Chainable<any>;
      waitForLoadingToDisappear(): Chainable<any>;
      closeRPWelcomeModal(): Chainable<any>;
      rpCreateStudent(email: string): Chainable<any>;
      setupEventTrackerSpy(): void;
      assertEventTrackCall(expectedEvent?: string): Chainable<any>;

      // navigation.js
      menuCheck(menuTestData: Array<Object>): Chainable<any>;
      simpleMenuCheck(menuItems: Array<String>): Chainable<any>;
      clickLeftMenuOption(menuName: string, url: RegExp): Chainable<any>;
      navigateToFirstLinkFromList(linkName: RegExp): Chainable<any>;

      // Notes
      deleteNote(): Chainable<any>;
      addNote(): Chainable<any>;
      clickAddNoteLink(): Chainable<any>;


      // page_utils / applications
      viewApplicationOptions(option: string, id?: string): Chainable<any>;
      filterAppId(appId: string): Chainable<any>;
      clickOnAppTabs(tabName: RegExp): Chainable<any>;
      applyFiltersOnApplicationsPage(filterValue: string, index: number): Chainable<any>;
      navigateToApplicantRequirements(): Chainable<any>;
      viewOneRandomApplication(): Chainable<any>;
      chooseApplicationFromAppliedList(): Chainable<any>;
      openQuestionRequirementModal(): Chainable<any>;
      chooseApplicantRequirementTab(): Chainable<any>;
      chooseStudentRecordsTab(): Chainable<any>;
      chooseNotesTab(): Chainable<any>;
      openRequirementCreationModal(): Chainable<any>;
      addNewRequirementToApplication(
        stage: RegExp,
        category: RegExp,
        requirementId: string
      ): Chainable<any>;
      exitRequirementCreationModal(): Chainable<any>;
      openRequirementComparisonModal(): Chainable<any>;
      exitRequirementComparisonModal(): Chainable<any>;
      openPreviewMode(): Chainable<any>;
      exitPreviewMode(): Chainable<any>;
      createNoteFromTemplate(): Chainable<any>;
      removeNotes(): Chainable<any>;
      copyApplicationDataToClipboard(): Chainable<any>;
      deleteAnApplication(): Chainable<any>;
      deleteAnyExistingApplication(studentId: number): Chainable<any>;

      // page_utils / attended_schools
      fillAttendedSchoolInformation(schoolData: SchoolData): Chainable<any>;
      enterNameOfInstitution(nameOfInstitution: string): Chainable<any>;
      enterLevelOfEducation(levelOfEducation: string): Chainable<any>;
      enterTextboxDataByName(locator: RegExp, data: string): Chainable<any>;
      enterHasGraduated(): Chainable<any>;
      enterDegreeAwarded(): Chainable<any>;
      enterSchoolLocation(locator: RegExp, location: string, index: number): Chainable<any>;
      enterCountryOfInstitution(countryOfInstitution: string): Chainable<any>;

      // page_utils / important_updates
      navigateToImportantUpdates(): Chainable<any>;
      viewNotesFromImportantUpdates(): Chainable<any>;
      replyToNote(): Chainable<any>;
      
      // page_utils / leads
      dragAndDrop(dragSource: string, dropTarget: string): Chainable<any>;

      //  page_utils / payment
      addPayment(depositType: String): Chainable<any>;
      addDetails(params: DepositCreditParams): Chainable<any>;
      makeTransaction(params: DepositCreditParams): Chainable<any>;
      chooseCurrency(currency: String): Chainable<any>;
      deductAmount(typeOfCharge: String,transactionType: String, amount: String, currency: String): Chainable<any>;
      depositAmount(typeOfCharge: String,accountType: String, transactionType: String, amount: String, currency: String): Chainable<any>;
      verifyImportCenterBtn(buttonName: RegExp,popUpWindowText: String): Chainable<any>;
      testDetails(testComment: String): Chainable<any>;
      selectDepositType(accountType: String, transactionType: String): Chainable<any>;

      // page_utils / program
      filterProgramsByLevel(degree: string, name: string): Chainable<any>;
      openCheckEligibilityModal(): Chainable<any>;
      closeCheckEligibilityModal(): Chainable<any>;

      //  page_utils / quick_search
      clearFilters(): Chainable<any>;
      applyFilters(index: number): Chainable<any>;
      getProgramCount(): Chainable<any>;
      getSchoolCount(): Chainable<any>;
      clickSearch(): Chainable<any>;
      searchBySchoolName(schoolOrLocation: string): Chainable<any>;
      searchByProgramName(programName: string): Chainable<any>;
      searchByProgramAndSchool(programName: string, schoolName: string): Chainable<any>;
      viewSchoolBySchoolName(schoolName: string): Chainable<any>;
      chooseCountryUnderSchoolFilters(countryName: string): Chainable<any>;
      applySchoolLocationFilter(): Chainable<any>;
      enterEnglishScore(examType: RegExp, score: string): Chainable<any>;
      enterGradingScheme(gradingSchemeValue: RegExp): Chainable<any>;
      enterEducationLevel(educationLevelValue: string): Chainable<any>;
      enterGradingAverage(gradingAverageValue: string): Chainable<any>;
      checkStudentEligibilityForSchoolAndProgram(student: string, location: string, programName: string): Chainable<any>;
      applyForAProgram(userType: string): Chainable<any>;
      chooseVisaTypeFromDropDown(visaType: RegExp, removeExitingVisaTypes: boolean): Chainable<any>;

      //  page_utils / requirements
      closeRequirementDetailsModal(): Chainable<any>;
      filterRequirements(requirementName: String): Chainable<any>;
      openRequirementDetailsModal(requirementName: String): Chainable<any>;

      //  page_utils / school
      applyProgramFilter(filterPlaceHolder: RegExp): Chainable<any>;
      clearFilters(): Chainable<any>;
      clickOnHeaderMenu(menuItem: RegExp): Chainable<any>;
      clickProgramName(programName: string): Chainable<any>;

      //  page_utils / student_modal
      fillStudentModal(studentData: StudentData): Chainable<any>;

      // page_utils / student_profile 
      findAttendedSchools(): Chainable<any>;
      editStudentAddressDetails(studentData: JSON): Chainable<any>;

      //  page_utils / student_registration
      fillStudentRegistration(studentData: StudentRegistrationForm): Chainable<any>

      //  page_utils / students
      viewStudentOptions(option: string, id?: string): Chainable<any>;
      findCompleteProfiles(): Chainable<any>;
      advisorSelectStudentFromList(option: string): Chainable<any>;
      rpSearchForStudentFromList(option: RegExp, value: string): Chainable<any>;
      saveDetails(): Chainable<any>;
      resetFilters(): Chainable<any>;
      editPersonalInformation(): Chainable<any>;
      editAddressDetail(): Chainable<any>;
      editTestScores(): Chainable<any>;
      editDate(): Chainable<any>;

      //  page_utils / visa_probability
      fillVisaProbabilityForm(formData: VisaProbabilityFormData): Chainable<any>;


      attachFile(fixture: FixtureData | FixtureData[], processingOpts?: FileProcessingOptions): Chainable<any>;
    }
  }
}


declare namespace Cypress {
  type FixtureEncoding =
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

  type FixtureData =
    | string
    | {
        filePath?: string;
        fileContent?: Blob;
        fileName?: string;
        encoding?: FixtureEncoding;
        mimeType?: string;
        lastModified?: number;
      };

  interface FileProcessingOptions {
    subjectType?: 'input' | 'drag-n-drop';
    force?: boolean;
    allowEmpty?: boolean;
  }

  interface Chainable<Subject = any> {
    /**
     * Command to attach file(s) to given HTML element as subject
     * @param fixture file to attach
     * @param processingOpts affects the way of fixture processing
     */
    attachFile(fixture: FixtureData | FixtureData[], processingOpts?: FileProcessingOptions): Chainable<Subject>;
  }
}