import http from 'k6/http';
import { check, sleep } from 'k6';

export const options = {
  vus: 1,  // 100 virtual users 
  duration: '20s', // Duration of the test
};

// Global variables for headers and session cookie
const sessionCookie = 'ASP.NET_SessionId=q4vva1yehv4hmfhulh11vru1';
const jsonHeaders = {
  'Content-Type': 'application/json',
  Cookie: sessionCookie,
};

export default function () {
  // Helper function to send POST requests
  function postRequest(url, payload, headers) {
    const response = http.post(url, JSON.stringify(payload), { headers, timeout: '180s' });
    if (!check(response, { [`${url} response is 200`]: (res) => res.status === 200 })) {
      console.error(`Request to ${url} failed`);
    }
    sleep(2); // Simulate user pause
    return response;
  }

  // Step 1: Login
  const loginPayload = {
    'lgnUserLogin$UserName': 'NAV',
    'lgnUserLogin$Password': 'Testing@!123',
    'lgnUserLogin$Login': 'Login',
  };
  const loginHeaders = { 'Content-Type': 'application/x-www-form-urlencoded' };
  const loginUrl = 'https://kommune.mainmanager.is/mmv2/MMV2Login.aspx';
  const loginResponse = http.post(loginUrl, loginPayload, { headers: loginHeaders, timeout: '180s' });
  check(loginResponse, {
    'Login successful': (res) => res.status === 200,
  });
  sleep(2);

  // Step 2: Select module Helpdesk
  postRequest('https://kommune.mainmanager.is/mmv2/services/MMLayoutReadOnly.asmx/GetMenuItemSteps', { Tag: 'Helpdesk' }, jsonHeaders);

  // Step 3: Select Incidents under Helpdesk
  postRequest('https://kommune.mainmanager.is/mmv2/services/MMLayoutReadOnly.asmx/GetMenuItemProcessItems', { Parent: 'Helpdesk', Tag: 'Incidents' }, jsonHeaders);

  // Step 4: Click on "All Incidents"
  postRequest('https://kommune.mainmanager.is/mmv2/services/MMLayout.asmx/InitMainLayout', {
    UniqueString: '',
    MenuItemKey: 'Incident',
    SummaryID: 0,
    MenuItemID: 1168,
    MenuItemTypeID: 1,
    ProcessStepTag: 'Incidents',
    ProcessTag: 'Helpdesk',
    SnapshotID: 0,
  }, jsonHeaders);

  // Step 5: Load Modal Control for Incident
  postRequest('https://kommune.mainmanager.is/mmv2/services/MMLayout.asmx/LoadMMModalControl', {
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
  }, jsonHeaders);

  // Step 6: Save Incident Data
  postRequest('https://kommune.mainmanager.is/mmv2/services/MMLayout.asmx/Save', {
    UniqueString: '12d435e80a4f4a0d966189d20a90e7d4',
    DataPath: 'Incident$1$45269',
    Value: [
      'Modal1_TFInspectedByID#49492',
      'Modal1_TFDateInspected#13.11.2024 09:25',
      'Modal1_TFRemarks#Hellohello',
      'Modal1_TFDateModified#09.12.2024 10:43',
      'Modal1_TFStatusID#5',
    ],
  }, jsonHeaders);

  // Step 7: Logout
  const logoutUrl = 'https://kommune.mainmanager.is/mmv2/MMV2Logout.aspx';
  const logoutHeaders = { 'Content-Type': 'text/html; charset=utf-8' };
  const logoutResponse = http.get(logoutUrl, { headers: logoutHeaders, timeout: '180s' });
  check(logoutResponse, { 'Logout successful': (res) => res.status === 200 });
  sleep(2);
}
