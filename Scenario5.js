import http from 'k6/http';
import { check, sleep } from 'k6';

export const options = {
  stages: [
    { duration: '5m', target: 100 },  // Ramp up to 100 VUs over 5 minutes
    { duration: '5m', target: 100 },  // Maintain 100 VUs for another 5 minutes
  ],
};


// Session cookie 
const sessionCookie = 'ASP.NET_SessionId=q4vva1yehv4hmfhulh11vru1';


export default function () {
    // STEP 1 : Login request
    const loginUrl = 'https://kommune.mainmanager.is/mmv2/MMV2Login.aspx';
    const loginPayload = {
      'lgnUserLogin$UserName': 'NAV',
      'lgnUserLogin$Password': 'Testing@!123',
      'lgnUserLogin$Login': 'Login',
    };
  
    const loginHeaders = {
      'Content-Type': 'application/x-www-form-urlencoded',
    };

    sleep(1); // Pause test
    const loginResponse = http.post(loginUrl, loginPayload, { headers: loginHeaders, timeout: "180s" });
    sleep(1); // Pause test

    check(loginResponse, {
      'Step 1 : Login successful': (res) => res.status === 200,
    });

      sleep(1); // Pause test


// Step 2a : Select module Helpdesk
const helpdesk_url = 'https://kommune.mainmanager.is/mmv2/services/MMLayoutReadOnly.asmx/GetMenuItemSteps';

// Define the payload as JSON
const helpdesk_payload = JSON.stringify({
  Tag: "Helpdesk"
});

// Define the headers
const helpdesk_headers = {
  'Content-Type': 'application/json',
  Cookie: sessionCookie,
};

sleep(1); // Pause test
// Send POST request
const helpdesk_response = http.post(helpdesk_url, helpdesk_payload, { headers: helpdesk_headers, timeout: "180s" });
sleep(1); // Pause test

// Validate response
check(helpdesk_response, {
  'Step 2a : Select Helpdesk, Status is 200': (r) => r.status === 200,
  //'Step 2a : Response contains "Helpdesk.Incidents"': (r) => r.body.includes('Helpdesk.Incidents'),
});

// Log the response for debugging
//console.log('Step 2a : -----> Helpdesk Body:', helpdesk_response.body);

sleep(1); // Pause test

// Step 2b : Select module Helpdesk
const incidents_url = 'https://kommune.mainmanager.is/mmv2/services/MMLayoutReadOnly.asmx/GetMenuItemProcessItems';

// Define the payload as JSON
const incidents_payload = JSON.stringify({
  Parent: "Helpdesk",
  Tag: "Incidents"
});

// Define the headers
const incidents_headers = {
  'Content-Type': 'application/json',
  Cookie: sessionCookie,
};

 sleep(1); // Pause test
// Send POST request
const incidents_response = http.post(incidents_url, incidents_payload, { headers: incidents_headers, timeout: "180s"});
sleep(1); // Pause test

// Validate response
check(incidents_response, {
  'Step 2b : Select module Helpdesk, Status is 200': (r) => r.status === 200,
  //'Step 2b : Response contains "Helpdesk"': (r) => r.body.includes('Helpdesk'),
});

// Log the response for debugging
//console.log('Step 2b : -----> Incidents Body:', incidents_response.body);

sleep(1); // Pause test


// Step 3 : Select Incidents under Helpdesk
const incidents_process_url = 'https://kommune.mainmanager.is/mmv2/services/MMLayoutReadOnly.asmx/GetMenuItemProcessItems';

// Define the payload as JSON
const incidents_process_payload = JSON.stringify({
  Parent: "Helpdesk",
  Tag: "Incidents"
});

// Define the headers
const incidents_process_headers = {
  'Content-Type': 'application/json',
  Cookie: sessionCookie,
};

 sleep(1); // Pause test
// Send POST request
const incidents_process_response = http.post(incidents_process_url, incidents_process_payload, { headers: incidents_process_headers, timeout: "180s" });
sleep(4); // Pause test

// Validate response
check(incidents_process_response, {
  'Step 3 : Select Incidents under Helpdesk, Status is 200': (r) => r.status === 200,
  //'Step 3 : Response contains "Incidents"': (r) => r.body.includes('Incidents'),
});

// Log the response for debugging
//console.log('Step 3 : -----> Incidents Process Body:', incidents_process_response.body);

sleep(1); // Pause test

// Step 4 : Click on "All Incidents"
const init_layout_url = 'https://kommune.mainmanager.is/mmv2/services/MMLayout.asmx/InitMainLayout';

// Define the payload as JSON
const init_layout_payload = JSON.stringify({
  UniqueString: "",
  MenuItemKey: "Incident",
  SummaryID: 0,
  MenuItemID: 1168,
  MenuItemTypeID: 1,
  ProcessStepTag: "Incidents",
  ProcessTag: "Helpdesk",
  SnapshotID: 0,
});

// Define the headers
const init_layout_headers = {
  'Content-Type': 'application/json',
  Cookie: sessionCookie,
};

 sleep(1); // Pause test
// Send POST request
const init_layout_response = http.post(init_layout_url, init_layout_payload, { headers: init_layout_headers , timeout: "180s"});
sleep(5); // Pause test

// Validate response
check(init_layout_response, {
  'Step 4 : Click on "All Incidents", Status is 200': (r) => r.status === 200,
  //'Step 4 : Response contains "Incidents"': (r) => r.body.includes('Incidents'),
});

// Log the response for debugging
//console.log('Step 4 : -----> Click on "All Incidents":', init_layout_response.body);

sleep(1); // Pause test


// Step 5 : Load Modal Control for Incident
const load_modal_url = 'https://kommune.mainmanager.is/mmv2/services/MMLayout.asmx/LoadMMModalControl';

// Define the payload as JSON
const load_modal_payload = JSON.stringify({
  tag: "Incident",
  datapath: "Incident$1$45269",
  id: "45269",
  PopupSQLListIndex: 0,
  UserRoleID: 0,
  contenttype: "7",
  datatext: "Open incident",
  editMode: 1,
  extraparameters: "",
  idselection: [],
  modal: "1",
  norestore: "",
  savebuttonvalue: 0,
  templateid: 0,
  uniquestring: "12d435e80a4f4a0d966189d20a90e7d4",
  viewkey: "UseDefaultViewKey",
  CurrencyDecimalSeparator: ""
});

// Define the headers
const load_modal_headers = {
  'Content-Type': 'application/json',
  Cookie: sessionCookie,
};

 sleep(3); // Pause test
// Send POST request
const load_modal_response = http.post(load_modal_url, load_modal_payload, { headers: load_modal_headers, timeout: "180s" });
sleep(5); // Pause test

// Validate response
check(load_modal_response, {
  'Step 5 : Load Modal Control for Incident, Status is 200': (r) => r.status === 200,
  //'Step 5 : Response contains "Janúar"': (r) => r.body.includes('Janúar'),
});

// Log the response for debugging
//console.log('Step 5 : -----> Load Modal Body:', load_modal_response.body);

sleep(1); // Pause test

// Step 6 : Save Incident Data
const save_incident_url = 'https://kommune.mainmanager.is/mmv2/services/MMLayout.asmx/Save';

// Define the payload as JSON
const save_incident_payload = JSON.stringify({
  UniqueString: "12d435e80a4f4a0d966189d20a90e7d4",
  DataPath: "Incident$1$45269",
  ActionKey: "",
  AskToContinueConfirmed: false,
  SaveButtonValue: 32,
  Value: [
    "mmGraphicalScreenshot#",
    "Modal1_TFMainObjectSearchField#0",
    "Modal1_TFGroundID#58024",
    "Modal1_TFLocationAndMainObject#58024",
    "Modal1_TFInspectedByOrganisationID#49491",
    "Modal1_TFInspectedByID#49492",
    "Modal1_TFDateInspected#13.11.2024 09:25",
    "Modal1_TFRemarks#Hellohello",
    "Modal1_TFDateModified#09.12.2024 10:43",
    "Modal1_TFDateCreated#21.11.2024 16:02",
    "Modal1_TFCheckwordItemStRemarksID#0",
    "Modal1_TFCheckwordID#4",
    "Modal1_TFCheckwordItemID#46",
    "Modal1_TFPriorityID#0",
    "Modal1_TFThemeID#0",
    "Modal1_TFStatusID#5",
    "Modal1_TFDateFinished#",
    "Modal1_TFEFScopeCategoryID1#0",
    "Modal1_TFEFGlobalCategoryID1#0",
    "AddCommentText#",
    "mmCoordinateX#",
    "mmCoordinateY#"
  ]
 
});

// Define the headers
const save_incident_headers = {
  'Content-Type': 'application/json',
  Cookie: sessionCookie,
};

 sleep(2); // Pause test
// Send POST request
const save_incident_response = http.post(save_incident_url, save_incident_payload, { headers: save_incident_headers, timeout: "180s" });
sleep(5); // Pause test

// Validate response
check(save_incident_response, {
  'Step 6 : Save Incident Data, Status is 200': (r) => r.status === 200,
  //'Step 6 : Response contains "Your work has been saved"': (r) => r.body.includes('Your work has been saved'),
});

// Log the response for debugging
//console.log('Step 6 : -----> Save Incident Body:', save_incident_response.body);
sleep(1); // Pause test

  // STEP 7: Logout Request
  const logoutUrl = 'https://kommune.mainmanager.is/mmv2/MMV2Logout.aspx';

  const logoutHeaders = {
    'Content-Type': 'text/html; charset=utf-8',
    //'Cookie': sessionCookie,
  };

  sleep(1); // Pause test
  const logoutResponse = http.get(logoutUrl, { headers: logoutHeaders, timeout: "180s" });
  sleep(1); // Pause test

  check(logoutResponse, {
    'STEP 7 : Logout Request, Status is 200': (r) => r.status === 200,
    //'STEP 7 : Content-Type is HTML': (r) => r.headers['Content-Type'] === 'text/html; charset=utf-8',
    //'STEP 7 : Server is Cloudflare': (r) => r.headers['Server'] === 'cloudflare',
  });

}