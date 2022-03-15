import authenticate from './src/common_utils/authentication';
import customCommands from './src/common_utils/commands';
import otherCommands from './src/common_utils/otherCommands';
import navigation from './src/common_utils/navigation';
import notes from './src/common_utils/notes';
import applications from './src/page_utils/applications';
import attended_schools from './src/page_utils/attended_school';
import important_updates from './src/page_utils/important_updates';
import leads from './src/page_utils/leads';
import payment from './src/page_utils/payment';
import program from './src/page_utils/program';
import quick_search from './src/page_utils/quick_search';
import requirements from './src/page_utils/requirements';
import school from './src/page_utils/school';
import student_modal from './src/page_utils/student_modal';
import student_profile from './src/page_utils/student_profile';
import student_registration from './src/page_utils/student_registration';
import students from './src/page_utils/students';
import visa_probability from './src/page_utils/visa_probability';

const initialize = () => {
  Cypress.Commands.add('uiLogin', authenticate.uiLogin);
  Cypress.Commands.add('uiLogout', authenticate.uiLogout);

  Cypress.Commands.add('verifyUrl', customCommands.verifyUrl);
  Cypress.Commands.add('verifyToastMessage', customCommands.verifyToastMessage);
  Cypress.Commands.add('clickElement', customCommands.clickElement);
  Cypress.Commands.add('waitForElementToBeRemoved', customCommands.waitForElementToBeRemoved);
  Cypress.Commands.add('clickButton', customCommands.clickButton);
  Cypress.Commands.add('locatorExists', customCommands.locatorExists);
  Cypress.Commands.add('editTextFields', customCommands.editTextFields);
  Cypress.Commands.add('editDropdown', customCommands.editDropdown);
  Cypress.Commands.add('waitForLoadingToDisappear', customCommands.waitForLoadingToDisappear);
  Cypress.Commands.add('searchUsingTopNavigation', customCommands.searchUsingTopNavigation);
  Cypress.Commands.add('uploadFile', customCommands.uploadFile);
  Cypress.Commands.add('waitForAPIResponse', customCommands.waitForAPIResponse);
  Cypress.Commands.add('findCompleteProfileId', customCommands.findCompleteProfileId);
  Cypress.Commands.add('removeStudentDocument', customCommands.removeStudentDocument);
  Cypress.Commands.add('removeApplicationAttachment', customCommands.removeApplicationAttachment);
  Cypress.Commands.add('disableBrowserPrompts', customCommands.disableBrowserPrompts);
  Cypress.Commands.add('closeRPWelcomeModal', customCommands.closeRPWelcomeModal);
  Cypress.Commands.add('rpCreateStudent', customCommands.rpCreateStudent);
  Cypress.Commands.add('setupEventTrackerSpy', customCommands.setupEventTrackerSpy);
  Cypress.Commands.add('assertEventTrackCall', customCommands.assertEventTrackCall);

  Cypress.Commands.add('checkBundleSizes', otherCommands.checkBundleSizes);

  Cypress.Commands.add('menuCheck', navigation.menuCheck);
  Cypress.Commands.add('simpleMenuCheck', navigation.simpleMenuCheck);
  Cypress.Commands.add('clickLeftMenuOption', navigation.clickLeftMenuOption);
  Cypress.Commands.add('navigateToFirstLinkFromList', navigation.navigateToFirstLinkFromList);

  Cypress.Commands.add('deleteNote', notes.deleteNote);
  Cypress.Commands.add('addNote', notes.addNote);
  Cypress.Commands.add('clickAddNoteLink', notes.clickAddNoteLink);

  Cypress.Commands.add('viewApplicationOptions', applications.viewApplicationOptions);
  Cypress.Commands.add('filterAppId', applications.filterAppId);
  Cypress.Commands.add('clickOnAppTabs', applications.clickOnAppTabs);
  Cypress.Commands.add('applyFiltersOnApplicationsPage', applications.applyFiltersOnApplicationsPage);
  Cypress.Commands.add('navigateToApplicantRequirements', applications.navigateToApplicantRequirements);
  Cypress.Commands.add('viewOneRandomApplication', applications.viewOneRandomApplication);
  Cypress.Commands.add('chooseApplicationFromAppliedList', applications.chooseApplicationFromAppliedList);
  Cypress.Commands.add('openQuestionRequirementModal', applications.openQuestionRequirementModal);
  Cypress.Commands.add('chooseApplicantRequirementTab', applications.chooseApplicantRequirementTab);
  Cypress.Commands.add('chooseStudentRecordsTab', applications.chooseStudentRecordsTab);
  Cypress.Commands.add('chooseNotesTab', applications.chooseNotesTab);
  Cypress.Commands.add('openRequirementCreationModal', applications.openRequirementCreationModal);
  Cypress.Commands.add('exitRequirementCreationModal', applications.exitRequirementCreationModal);
  Cypress.Commands.add('openRequirementComparisonModal', applications.openRequirementComparisonModal);
  Cypress.Commands.add('addNewRequirementToApplication', applications.addNewRequirementToApplication);
  Cypress.Commands.add('exitRequirementComparisonModal', applications.exitRequirementComparisonModal);
  Cypress.Commands.add('openPreviewMode', applications.openPreviewMode);
  Cypress.Commands.add('exitPreviewMode', applications.exitPreviewMode);
  Cypress.Commands.add('createNoteFromTemplate', applications.createNoteFromTemplate);
  Cypress.Commands.add('removeNotes', applications.removeNotes);
  Cypress.Commands.add('copyApplicationDataToClipboard', applications.copyApplicationDataToClipboard);
  Cypress.Commands.add('deleteAnApplication', applications.deleteAnApplication);
  Cypress.Commands.add('deleteAnyExistingApplication', applications.deleteAnyExistingApplication);

  Cypress.Commands.add('fillAttendedSchoolInformation', attended_schools.fillAttendedSchoolInformation);
  Cypress.Commands.add('enterLevelOfEducation', attended_schools.enterLevelOfEducation);
  Cypress.Commands.add('enterTextboxDataByName', attended_schools.enterTextboxDataByName);
  Cypress.Commands.add('enterHasGraduated', attended_schools.enterHasGraduated);
  Cypress.Commands.add('enterDegreeAwarded', attended_schools.enterDegreeAwarded);
  Cypress.Commands.add('enterSchoolLocation', attended_schools.enterSchoolLocation);
  Cypress.Commands.add('countryOfInstitution', attended_schools.countryOfInstitution);

  Cypress.Commands.add('navigateToImportantUpdates', important_updates.navigateToImportantUpdates);
  Cypress.Commands.add('viewNotesFromImportantUpdates', important_updates.viewNotesFromImportantUpdates);
  Cypress.Commands.add('replyToNote', important_updates.replyToNote);

  Cypress.Commands.add('dragAndDrop', leads.dragAndDrop);

  Cypress.Commands.add('addPayment', payment.addPayment);
  Cypress.Commands.add('makeTransaction', payment.makeTransaction);
  Cypress.Commands.add('chooseCurrency', payment.chooseCurrency);
  Cypress.Commands.add('verifyImportCenterBtn', payment.verifyImportCenterBtn);
  Cypress.Commands.add('testDetails', payment.testDetails);
  Cypress.Commands.add('deductAmount', payment.deductAmount);
  Cypress.Commands.add('addDetails', payment.addDetails);
  Cypress.Commands.add('selectDepositType', payment.selectDepositType);
  Cypress.Commands.add('depositAmount', payment.depositAmount);

  Cypress.Commands.add('filterProgramsByLevel', program.filterProgramsByLevel);
  Cypress.Commands.add('openCheckEligibilityModal', program.openCheckEligibilityModal);
  Cypress.Commands.add('closeCheckEligibilityModal', program.closeCheckEligibilityModal);

  Cypress.Commands.add('clearFilters', quick_search.clearFilters);
  Cypress.Commands.add('applyFilters', quick_search.applyFilters);
  Cypress.Commands.add('getProgramCount', quick_search.getProgramCount);
  Cypress.Commands.add('getSchoolCount', quick_search.getSchoolCount);
  Cypress.Commands.add('searchBySchoolName', quick_search.searchBySchoolName);
  Cypress.Commands.add('searchByProgramName', quick_search.searchByProgramName);
  Cypress.Commands.add('searchByProgramAndSchool', quick_search.searchByProgramAndSchool);
  Cypress.Commands.add('viewSchoolBySchoolName', quick_search.viewSchoolBySchoolName);
  Cypress.Commands.add('clickSearch', quick_search.clickSearch);
  Cypress.Commands.add('chooseCountryUnderSchoolFilters', quick_search.chooseCountryUnderSchoolFilters);
  Cypress.Commands.add('applySchoolLocationFilter', quick_search.applySchoolLocationFilter);
  Cypress.Commands.add('enterEnglishScore', quick_search.enterEnglishScore);
  Cypress.Commands.add('enterGradingScheme', quick_search.enterGradingScheme);
  Cypress.Commands.add('enterEducationLevel', quick_search.enterEducationLevel);
  Cypress.Commands.add('enterGradingAverage', quick_search.enterGradingAverage);
  Cypress.Commands.add('checkStudentEligibilityForSchoolAndProgram', quick_search.checkStudentEligibilityForSchoolAndProgram);
  Cypress.Commands.add('applyForAProgram', quick_search.applyForAProgram);
  Cypress.Commands.add('chooseVisaTypeFromDropDown', quick_search.chooseVisaTypeFromDropDown);

  Cypress.Commands.add('closeRequirementDetailsModal', requirements.closeRequirementDetailsModal);
  Cypress.Commands.add('filterRequirements', requirements.filterRequirements);
  Cypress.Commands.add('openRequirementDetailsModal', requirements.openRequirementDetailsModal);

  Cypress.Commands.add('applyProgramFilter', school.applyProgramFilter);
  Cypress.Commands.add('clearFilters', school.clearFilters);
  Cypress.Commands.add('clickOnHeaderMenu', school.clickOnHeaderMenu);
  Cypress.Commands.add('clickProgramName', school.clickProgramName);

  Cypress.Commands.add('fillStudentModal', student_modal.fillStudentModal);

  Cypress.Commands.add('findAttendedSchools', student_profile.findAttendedSchools);
  Cypress.Commands.add('editStudentAddressDetails', student_profile.editStudentAddressDetails); 
  
  Cypress.Commands.add('fillStudentRegistration', student_registration.fillStudentRegistration); 

  Cypress.Commands.add('viewStudentOptions', students.viewStudentOptions); 
  Cypress.Commands.add('findCompleteProfiles', students.findCompleteProfiles); 
  Cypress.Commands.add('advisorSelectStudentFromList', students.advisorSelectStudentFromList); 
  Cypress.Commands.add('rpSearchForStudentFromList', students.rpSearchForStudentFromList); 
  Cypress.Commands.add('saveDetails', students.saveDetails); 
  Cypress.Commands.add('resetFilters', students.resetFilters); 
  Cypress.Commands.add('editPersonalInformation', students.editPersonalInformation); 
  Cypress.Commands.add('editAddressDetail', students.editAddressDetail); 
  Cypress.Commands.add('editTestScores', students.editTestScores); 
  Cypress.Commands.add('editDate', students.editDate); 

  Cypress.Commands.add('fillVisaProbabilityForm', visa_probability.fillVisaProbabilityForm); 
};

initialize();