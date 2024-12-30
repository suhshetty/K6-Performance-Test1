import http from 'k6/http';
import { check, sleep } from 'k6';

export const options = {
  stages: [
    { duration: '5m', target: 100 },  // Ramp up to 250 VUs over 5 minutes
    { duration: '5m', target: 100 },  // Maintain 250 VUs for another 5 minutes
  ],
};

// Session cookie 
const sessionCookie = 'ASP.NET_SessionId=q4vva1yehv4hmfhulh11vru1';

export default function () {
  // STEP 1: Login request
  const loginUrl = 'https://kommune.mainmanager.is/mmv2/MMV2Login.aspx';
  const loginPayload = 'lgnUserLogin$UserName=NAV&lgnUserLogin$Password=Testing@!123&lgnUserLogin$Login=Login';
  const loginHeaders = { 'Content-Type': 'application/x-www-form-urlencoded' };

  sleep(2);
  const loginResponse = http.post(loginUrl, loginPayload, { headers: loginHeaders, timeout: '180s' });
  check(loginResponse, {
    'Step 1: Login successful': (res) => res.status === 200,
  });
  sleep(4);

  // STEP 2a: Select module Helpdesk
  const helpdeskUrl = 'https://kommune.mainmanager.is/mmv2/services/MMLayoutReadOnly.asmx/GetMenuItemSteps';
  const helpdeskPayload = JSON.stringify({ Tag: 'Helpdesk' });
  const helpdeskHeaders = { 'Content-Type': 'application/json', Cookie: sessionCookie };

  sleep(2);
  const helpdeskResponse = http.post(helpdeskUrl, helpdeskPayload, { headers: helpdeskHeaders, timeout: '180s' });
  check(helpdeskResponse, {
    'Step 2a: Helpdesk status is 200': (r) => r.status === 200,
  });
  sleep(4);

  // STEP 2b: Select incidents under Helpdesk
  const incidentsUrl = 'https://kommune.mainmanager.is/mmv2/services/MMLayoutReadOnly.asmx/GetMenuItemProcessItems';
  const incidentsPayload = JSON.stringify({ Parent: 'Helpdesk', Tag: 'Incidents' });
  const incidentsHeaders = { 'Content-Type': 'application/json', Cookie: sessionCookie };

  sleep(2);
  const incidentsResponse = http.post(incidentsUrl, incidentsPayload, { headers: incidentsHeaders, timeout: '180s' });
  check(incidentsResponse, {
    'Step 2b: Incidents status is 200': (r) => r.status === 200,
  });
  sleep(4);

  // STEP 3: Select Incidents under Helpdesk
  const incidentsProcessUrl = 'https://kommune.mainmanager.is/mmv2/services/MMLayoutReadOnly.asmx/GetMenuItemProcessItems';
  const incidentsProcessPayload = JSON.stringify({ Parent: 'Helpdesk', Tag: 'Incidents' });

  sleep(2);
  const incidentsProcessResponse = http.post(incidentsProcessUrl, incidentsProcessPayload, { headers: incidentsHeaders, timeout: '180s' });
  check(incidentsProcessResponse, {
    'Step 3: Incidents under Helpdesk status is 200': (r) => r.status === 200,
  });
  sleep(4);

  // STEP 4: Click on "All Incidents"
  const initLayoutUrl = 'https://kommune.mainmanager.is/mmv2/services/MMLayout.asmx/InitMainLayout';
  const initLayoutPayload = JSON.stringify({
    UniqueString: '',
    MenuItemKey: 'Incident',
    SummaryID: 0,
    MenuItemID: 1168,
    MenuItemTypeID: 1,
    ProcessStepTag: 'Incidents',
    ProcessTag: 'Helpdesk',
    SnapshotID: 0,
  });

  sleep(2);
  const initLayoutResponse = http.post(initLayoutUrl, initLayoutPayload, { headers: incidentsHeaders, timeout: '180s' });
  check(initLayoutResponse, {
    'Step 4: Click on "All Incidents" status is 200': (r) => r.status === 200,
  });
  sleep(6);

  // STEP 5: Load Modal Control for Incident
  const loadModalUrl = 'https://kommune.mainmanager.is/mmv2/services/MMLayout.asmx/LoadMMModalControl';
  const loadModalPayload = JSON.stringify({
    tag: 'Incident',
    datapath: 'Incident$1$45269',
    id: '45269',
    PopupSQLListIndex: 0,
    UserRoleID: 0,
    contenttype: '7',
    datatext: 'Open incident',
    editMode: 1,
    extraparameters: '',
    idselection: [],
    modal: '1',
    norestore: '',
    savebuttonvalue: 0,
    templateid: 0,
    uniquestring: '12d435e80a4f4a0d966189d20a90e7d4',
    viewkey: 'UseDefaultViewKey',
    CurrencyDecimalSeparator: '',
  });

  sleep(2);
  const loadModalResponse = http.post(loadModalUrl, loadModalPayload, { headers: incidentsHeaders, timeout: '180s' });
  check(loadModalResponse, {
    'Step 5: Load Modal Control status is 200': (r) => r.status === 200,
  });
  sleep(6);

  // STEP 6: Save Incident Data
  const saveIncidentUrl = 'https://kommune.mainmanager.is/mmv2/services/MMLayout.asmx/Save';
  const saveIncidentPayload = JSON.stringify({
    UniqueString: '12d435e80a4f4a0d966189d20a90e7d4',
    DataPath: 'Incident$1$45269',
    ActionKey: '',
    AskToContinueConfirmed: false,
    SaveButtonValue: 32,
    Value: [
      'mmGraphicalScreenshot#',
      'Modal1_TFMainObjectSearchField#0',
      'Modal1_TFGroundID#58024',
      'Modal1_TFLocationAndMainObject#58024',
      'Modal1_TFInspectedByOrganisationID#49491',
      'Modal1_TFInspectedByID#49492',
      'Modal1_TFDateInspected#13.11.2024 09:25',
      'Modal1_TFRemarks#Hellohello',
      'Modal1_TFDateModified#09.12.2024 10:43',
      'Modal1_TFDateCreated#21.11.2024 16:02',
      'Modal1_TFCheckwordItemStRemarksID#0',
      'Modal1_TFCheckwordID#4',
      'Modal1_TFCheckwordItemID#46',
      'Modal1_TFPriorityID#0',
      'Modal1_TFThemeID#0',
      'Modal1_TFStatusID#5',
      'Modal1_TFDateFinished#',
      'Modal1_TFEFScopeCategoryID1#0',
      'Modal1_TFEFGlobalCategoryID1#0',
      'AddCommentText#',
      'mmCoordinateX#',
      'mmCoordinateY#',
    ],
  });

  sleep(2);
  const saveIncidentResponse = http.post(saveIncidentUrl, saveIncidentPayload, { headers: incidentsHeaders, timeout: '180s' });
  check(saveIncidentResponse, {
    'Step 6: Save Incident status is 200': (r) => r.status === 200,
  });
  sleep(5);

  // STEP 7: Logout request
  const logoutUrl = 'https://kommune.mainmanager.is/mmv2/MMV2Logout.aspx';
  const logoutHeaders = { 'Content-Type': 'text/html; charset=utf-8' };

  sleep(2);
  const logoutResponse = http.get(logoutUrl, { headers: logoutHeaders, timeout: '180s' });
  check(logoutResponse, {
    'Step 7: Logout successful': (r) => r.status === 200,
  });
  sleep(4);
}
