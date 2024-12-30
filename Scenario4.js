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
  sleep(2); // Pause test
  const loginResponse = http.post(loginUrl, loginPayload, { headers: loginHeaders });
  sleep(2); // Pause test

  check(loginResponse, {
    'Step 1 : Login successful': (res) => res.status === 200,
  });

  sleep(1); // Pause for 1 second

// Step 2a : Select module Property Management
const Property_management_url = 'https://kommune.mainmanager.is/mmv2/services/MMLayoutReadOnly.asmx/GetMenuItemSteps';

// Define the payload as JSON
const Property_management_payload = JSON.stringify({
  Tag: "PropertyManagement"
});

// Define the headers
const Property_management_headers = {
  'Content-Type': 'application/json',
  Cookie: sessionCookie,
};

sleep(2); // Pause test
// Send POST request
const Property_management_response = http.post(Property_management_url, Property_management_payload, { headers: Property_management_headers });
sleep(2); // Pause test

// Validate response
check(Property_management_response, {
  'Step 2a : Select Property_management, Status is 200': (r) => r.status === 200,
  //'Step 2a : Response contains "Organisations overview"': (r) => r.body.includes('Lease contracts overview'),
});


 // Log the response for debugging
 //console.log'Step 2a : -----> Property_management Body:', Property_management_response.body);

 sleep(2); // Pause for 1 second


 // Step 2b : Select module Property Management
 const Property_management_url2 = 'https://kommune.mainmanager.is/mmv2/services/MMLayoutReadOnly.asmx/GetMenuItemProcessItems';

// Define the payload as JSON
const Property_management_Payload2 = JSON.stringify({
  Parent: 'PropertyManagement',
  Tag: "LeaseContract"

});

// Define the headers
const Property_management__headers2 = {
  'Content-Type': 'application/json',
  Cookie: sessionCookie,
};

sleep(2); // Pause test
// Send POST request
const Property_management_response2 = http.post(Property_management_url2, Property_management_Payload2, { headers: Property_management__headers2 });
sleep(2); // Pause test

// Validate response
check(Property_management_response2, {
  'Step 2b : Select Property_management, Status is 200': (r) => r.status === 200,
  //'Step 2b : Response contains "Head lease contracts"': (r) => r.body.includes('Head lease contracts'),
});

// Log the response for debugging
//console.log'Step 2b : -----> Property_management Body2:', Property_management_response2.body);

sleep(2); // Pause for 1 second


// Step 3 : Call Lease Contracts overview
const Lease_Contracts_overview_url = 'https://kommune.mainmanager.is/mmv2/services/MMLayoutReadOnly.asmx/GetMenuItemProcessItems';

// Define the payload as JSON
const Lease_Contracts_payload = JSON.stringify({
  Parent: 'PropertyManagement',
  Tag: "LeaseContract"
 
});

// Define the headers
const Lease_Contracts_headers = {
  'Content-Type': 'application/json',
  Cookie: sessionCookie,
};

sleep(2); // Pause test
// Send POST request
const Lease_Contracts_response = http.post(Lease_Contracts_overview_url, Lease_Contracts_payload, { headers: Lease_Contracts_headers });
sleep(2); // Pause test

// Validate response
check(Lease_Contracts_response, {
  'Step 3 : Select Lease_Contracts, Status is 200': (r) => r.status === 200,
  //'Step 3 : Response contains "SubLeaseContract"': (r) => r.body.includes('SubLeaseContract'),
});

// Log the response for debugging
//console.log'Step 3 : -----> Lease_Contracts_response Body:', Lease_Contracts_response.body);

sleep(2); // Pause for 1 second


// Step 4 : Call head lease contracts
const Head_lease_contracts_url = 'https://kommune.mainmanager.is/mmv2/services/MMLayout.asmx/InitMainLayout';

// Define the headers
const Head_lease_contracts_payload = JSON.stringify({
  UniqueString: "",
  MenuItemKey: "HeadLeaseContract",
  SummaryID: 0,
  MenuItemID: 5387,
  MenuItemTypeID: 1,
  ProcessStepTag: "LeaseContract",
  ProcessTag: "PropertyManagement",
  SnapshotID: 0
});

// Define the headers
const Head_lease_contracts_headers = {
  'Content-Type': 'application/json',
  Cookie: sessionCookie,
};
sleep(2); // Pause test
// Send POST request
const Head_lease_contracts_response = http.post(Head_lease_contracts_url, Head_lease_contracts_payload, { headers: Head_lease_contracts_headers });
sleep(2); // Pause test

// Validate response
check(Head_lease_contracts_response, {
  'Step 4 : Select head lease contracts, Status is 200': (r) => r.status === 200,
  //'Step 4 : Response contains "Head lease contract"': (r) => r.body.includes('Head lease contract'),
});

// Log the response for debugging
//console.log'Step 4 : ----->  Head_lease_contracts_Body:', Head_lease_contracts_response.body);

sleep(2); // Pause for 1 second


// Step 5 : Open a head lease contracts
const Open_head_lease_contracts_url = 'https://kommune.mainmanager.is/mmv2/services/MMLayout.asmx/LoadMMModalControl';

// Define the payload as JSON
const Open_head_lease_contracts_Payload = JSON.stringify({
  tag: "HeadLeaseContract",
  datapath: "HeadLeaseContract$1$2124",
  id: "2124",
  PopupSQLListIndex: 0,
  UserRoleID: 0,
  contenttype: "7",
  datatext: "Open head lease contract",
  editMode: 1,
  extraparameters: "",
  modal: "1",
  norestore: "",
  savebuttonvalue: 0,
  templateid: 0,
  uniquestring: "c1f4e511a46f43758fd7e5533113fa0f",
  viewkey: "UseDefaultViewKey",
  idselection: [] 
});



// Define the headers
const Open_head_lease_contracts_headers = {
  'Content-Type': 'application/json',
  Cookie: sessionCookie,
};

sleep(2); // Pause test
// Send POST request
const Open_head_lease_contracts_response = http.post(Open_head_lease_contracts_url, Open_head_lease_contracts_Payload, { headers: Open_head_lease_contracts_headers });
sleep(2); // Pause test

// Validate response
check(Open_head_lease_contracts_response, {
  'Step 5 : Select Open_head_lease_contracts, Status is 200': (r) => r.status === 200,
  //'Step 5 : Response contains "file.documentdatapath"': (r) => r.body.includes('file.documentdatapath'),
});

// Log the response for debugging
//console.log'Step 5 :-----> Open a head lease contracts:', Open_head_lease_contracts_response.body);

sleep(2); // Pause for 1 second


// Step 6a : Select module Property Management
const Property_management_url_a = 'https://kommune.mainmanager.is/mmv2/services/MMLayoutReadOnly.asmx/GetMenuItemSteps';

// Define the payload as JSON
const Property_management_payload_a  = JSON.stringify({
  Tag: "PropertyManagement"
});

// Define the headers
const Property_management_headers_a  = {
  'Content-Type': 'application/json',
  Cookie: sessionCookie,
};

sleep(2); // Pause test
// Send POST request
const Property_management_response_a  = http.post(Property_management_url_a , Property_management_payload_a , { headers: Property_management_headers_a  });
sleep(2); // Pause test


// Validate response
check(Property_management_response_a , {
  'Step 6a  : Select Property_management, Status is 200': (r) => r.status === 200,
  //'Step 6a  : Response contains "Organisations overview"': (r) => r.body.includes('Lease contracts overview'),
});

 // Log the response for debugging
 //console.log'Step 6a  : -----> Property_management Body:', Property_management_response_a .body);

 sleep(2); // Pause for 1 second


 // Step 6b : Select module Property Management
 const Property_management_url2_b = 'https://kommune.mainmanager.is/mmv2/services/MMLayoutReadOnly.asmx/GetMenuItemProcessItems';

// Define the payload as JSON
const Property_management_Payload2_b = JSON.stringify({
  Parent: 'PropertyManagement',
  Tag: "LeaseContract"

});

// Define the headers
const Property_management__headers2_b = {
  'Content-Type': 'application/json',
  Cookie: sessionCookie,
};

sleep(2); // Pause test
// Send POST request
const Property_management_response2_b = http.post(Property_management_url2_b, Property_management_Payload2_b, { headers: Property_management__headers2_b });
sleep(2); // Pause test

// Validate response
check(Property_management_response2, {
  'Step 6b  : Select Property_management, Status is 200': (r) => r.status === 200,
  //'Step 6b  : Response contains "Head lease contracts"': (r) => r.body.includes('Head lease contracts'),
});

// Log the response for debugging
//console.log'Step 6b  : -----> Property_management_b Body2:', Property_management_response2_b.body);

sleep(2); // Pause for 1 second


// Step 7 : Call Lease Contracts overview
const Lease_Contracts_overview_url_a = 'https://kommune.mainmanager.is/mmv2/services/MMLayoutReadOnly.asmx/GetMenuItemProcessItems';

// Define the payload as JSON
const Lease_Contracts_payload_a= JSON.stringify({
  Parent: 'PropertyManagement',
  Tag: "LeaseContract"
 
});

// Define the headers
const Lease_Contracts_headers_a = {
  'Content-Type': 'application/json',
  Cookie: sessionCookie,
};

sleep(2); // Pause test
// Send POST request
const Lease_Contracts_response_a = http.post(Lease_Contracts_overview_url_a, Lease_Contracts_payload_a, { headers: Lease_Contracts_headers_a });
sleep(2); // Pause test

// Validate response
check(Lease_Contracts_response, {
  'Step 7 : Select Lease_Contracts Overview, Status is 200': (r) => r.status === 200,
  //'Step 7 : Response contains "SubLeaseContract"': (r) => r.body.includes('SubLeaseContract'),
});

// Log the response for debugging
//console.log'Step 7 : -----> Lease_Contracts_response Body:', Lease_Contracts_response_a.body);

sleep(2); // Pause for 1 second


// Step 8 : Click on "Lease Contracts"
const Lease_contracts_url = 'https://kommune.mainmanager.is/mmv2/services/MMLayout.asmx/InitMainLayout';

// Define the payload as JSON
const Lease_contracts_payload = JSON.stringify({
  UniqueString: "",
  MenuItemKey: "LeaseContract",
  SummaryID: 0,
  MenuItemID: 1328,
  MenuItemTypeID: 1,
  ProcessStepTag: "LeaseContract",
  ProcessTag: "PropertyManagement",
  SnapshotID: 0
});


// Define the headers
const Lease_contracts_headers = {
  'Content-Type': 'application/json',
  Cookie: sessionCookie,
};
sleep(2); // Pause test
// Send POST request
const Lease_contracts_response = http.post(Lease_contracts_url, Lease_contracts_payload, { headers: Lease_contracts_headers });
sleep(2); // Pause test

// Validate response
check(Lease_contracts_response, {
  'Step 8 : Click on "Lease Contracts", Status is 200': (r) => r.status === 200,
  //'Step 8 : Response contains "UseDefaultViewKey': (r) => r.body.includes('UseDefaultViewKey'),
});

// Log the response for debugging
//console.log'Step 8 : Click on "Lease Contracts"', Lease_contracts_response.body);

sleep(2); // Pause for 1 second


// Step 9 : Open lease contracts
const Open_lease_contracts_url = 'https://kommune.mainmanager.is/mmv2/services/MMLayout.asmx/LoadMMModalControl';

// Define the payload as JSON
const Open_lease_contracts_payload = JSON.stringify({
  tag: "LeaseContract",
  datapath: "LeaseContract$1$100",
  id: "100",
  PopupSQLListIndex: 0,
  UserRoleID: 0,
  contenttype: "7",
  datatext: "Open lease contract",
  editMode: 1,
  extraparameters: "",
  idselection: [],
  modal: "1",
  norestore: "",
  savebuttonvalue: 0,
  templateid: 0,
  uniquestring: "485439c3e6fb4c59b4a6bcbe4bd4d877",
  viewkey: "UseDefaultViewKey"
});



// Define the headers
const Open_lease_contracts_headers = {
  'Content-Type': 'application/json',
  Cookie: sessionCookie,
};

sleep(2); // Pause test
// Send POST request
const Open_lease_contracts_response = http.post(Open_lease_contracts_url, Open_lease_contracts_payload, { headers: Open_lease_contracts_headers });
sleep(2); // Pause test

// Validate response
check(Open_lease_contracts_response, {
  'Step 9 : Open_lease_contracts_, Status is 200': (r) => r.status === 200,
 
});

// Log the response for debugging
//console.log'Step 9 : Open lease contracts:', Open_lease_contracts_response.body);

sleep(2); // Pause for 1 second

// Step 10a : Select module Property Management
const Property_management_url_ = 'https://kommune.mainmanager.is/mmv2/services/MMLayoutReadOnly.asmx/GetMenuItemSteps';

// Define the payload as JSON
const Property_management_payload_ = JSON.stringify({
  Tag: "PropertyManagement"
});

// Define the headers
const Property_management_headers_ = {
  'Content-Type': 'application/json',
  Cookie: sessionCookie,
};
sleep(2); // Pause test
// Send POST request
const Property_management_response_ = http.post(Property_management_url_, Property_management_payload_, { headers: Property_management_headers_ });
sleep(2); // Pause test

// Validate response
check(Property_management_response_, {
  'Step 10a : Select Property_management, Status is 200': (r) => r.status === 200,
  //'Step 10a : Response contains "Organisations overview"': (r) => r.body.includes('Lease contracts overview'),
});

 // Log the response for debugging
 //console.log'Step 10a : -----> Property_management Body:', Property_management_response_.body);

 sleep(2); // Pause for 1 second


 // Step 10b : Select module Property Management
 const Property_management_url3 = 'https://kommune.mainmanager.is/mmv2/services/MMLayoutReadOnly.asmx/GetMenuItemProcessItems';

// Define the payload as JSON
const Property_management_Payload3 = JSON.stringify({
  Parent: 'PropertyManagement',
  Tag: "LeaseContract"

});

// Define the headers
const Property_management__headers3 = {
  'Content-Type': 'application/json',
  Cookie: sessionCookie,
};

sleep(2); // Pause test
// Send POST request
const Property_management_response3 = http.post(Property_management_url3, Property_management_Payload3, { headers: Property_management__headers3 });
sleep(2); // Pause test


// Validate response
check(Property_management_response3, {
  'Step 10b : Select Property_management, Status is 200': (r) => r.status === 200,
  //'Step 10b : Response contains "Head lease contracts"': (r) => r.body.includes('Head lease contracts'),
});

// Log the response for debugging
//console.log'Step 10b : -----> Property_management Body3:', Property_management_response3.body);

sleep(2); // Pause for 1 second


// Step 11 : Call Lease Contracts overview
const Lease_Contracts_overview_url_ = 'https://kommune.mainmanager.is/mmv2/services/MMLayoutReadOnly.asmx/GetMenuItemProcessItems';

// Define the payload as JSON
const Lease_Contracts_payload_ = JSON.stringify({
  Parent: 'PropertyManagement',
  Tag: "LeaseContract"
 
});

// Define the headers
const Lease_Contracts_headers_ = {
  'Content-Type': 'application/json',
  Cookie: sessionCookie,
};

sleep(2); // Pause test
// Send POST request
const Lease_Contracts_response_ = http.post(Lease_Contracts_overview_url_, Lease_Contracts_payload_, { headers: Lease_Contracts_headers_ });
sleep(2); // Pause test


// Validate response
check(Lease_Contracts_response_, {
  'Step 11 : Select Lease_Contracts, Status is 200': (r) => r.status === 200,
  //'Step 11 : Response contains "SubLeaseContract"': (r) => r.body.includes('SubLeaseContract'),
});

// Log the response for debugging
//console.log'Step 11 : -----> Lease_Contracts_response Body:', Lease_Contracts_response_.body);

sleep(2); // Pause for 1 second


// Step 12 : Click on Sub lease contacts

const Sub_lease_contacts_url = 'https://kommune.mainmanager.is/mmv2/services/MMLayout.asmx/InitMainLayout';

// Define the payload as JSON

const Sub_lease_contacts_payload = JSON.stringify({
  UniqueString: "",
  MenuItemKey: "SubLeaseContract", 
  SummaryID: 0, 
  MenuItemID: 5394,
  MenuItemTypeID: 1, 
  ProcessStepTag: "LeaseContract", 
  ProcessTag: "PropertyManagement", 
  SnapshotID: 0, 
});


// Define the headers
const Sub_lease_contacts_headers = {
  'Content-Type': 'application/json',
  Cookie: sessionCookie,
};

sleep(2); // Pause test
// Send POST request
const Sub_lease_contacts_response = http.post(Sub_lease_contacts_url, Sub_lease_contacts_payload, { headers: Sub_lease_contacts_headers });
sleep(2); // Pause test


// Validate response
check(Sub_lease_contacts_response, {
  'Step 12  : Click on Sub_lease_contacts_, Status is 200': (r) => r.status === 200,
  //'Step 12  : Response contains "ActiveListViewNavigationKey"': (r) => r.body.includes('ActiveListViewNavigationKey'),
});

// Log the response for debugging
//console.log'Step 12  : Sub_lease_contacts_response Body:', Sub_lease_contacts_response.body);

sleep(2); // Pause for 1 second


// Step 13 : Open sub lease contract
const Open_sub_lease_contract_url = 'https://kommune.mainmanager.is/mmv2/services/MMLayout.asmx/LoadMMModalControl';

// Define the payload as JSON
const Open_sub_lease_contract_payload = JSON.stringify({
  PopupSQLListIndex: 0,
  UserRoleID: 0,
  contenttype: "7",
  datapath: "SubLeaseContract$1$2191",
  datatext: "Open sub lease contract",
  editMode: 1,
  extraparameters: "",
  id: "2191",
  idselection: [],
  modal: "1",
  norestore: "",
  savebuttonvalue: 0,
  tag: "SubLeaseContract",
  templateid: 0,
  uniquestring: "b7c6e15973b042fd8e7bd502f39a6b3b",
  viewkey: "UseDefaultViewKey"
});


// Define the headers
const Open_sub_lease_contract_headers = {
  'Content-Type': 'application/json',
  Cookie: sessionCookie,
};

sleep(2); // Pause test
// Send POST request
const Open_sub_lease_contract_response = http.post(Open_sub_lease_contract_url, Open_sub_lease_contract_payload, { headers: Open_sub_lease_contract_headers });
sleep(2); // Pause test


// Validate response
check(Open_sub_lease_contract_response, {
  'Step 13 : Open_sub_lease_contract_, Status is 200': (r) => r.status === 200,

});

// Log the response for debugging
//console.log'Step 13 : Open_sub_lease_contract_ Body:', Open_sub_lease_contract_response.body);

sleep(2); // Pause for 1 second

// Step 14a : Select module Property Management
const Property_management_url__ = 'https://kommune.mainmanager.is/mmv2/services/MMLayoutReadOnly.asmx/GetMenuItemSteps';

// Define the payload as JSON
const Property_management_payload__ = JSON.stringify({
  Tag: "PropertyManagement"
});

// Define the headers
const Property_management_headers__ = {
  'Content-Type': 'application/json',
  Cookie: sessionCookie,
};

sleep(2); // Pause test
// Send POST request
const Property_management_response__ = http.post(Property_management_url__, Property_management_payload__, { headers: Property_management_headers__ });
sleep(2); // Pause test

// Validate response
check(Property_management_response__, {
  'Step 14a : Select Property_management , Status is 200': (r) => r.status === 200,
  //'Step 14a : Response contains "Organisations overview"': (r) => r.body.includes('Lease contracts overview'),
});

 // Log the response for debugging
 //console.log'Step 14a : -----> Property_management Body:', Property_management_response__.body);

 sleep(2); // Pause for 1 second


 // Step 14b : Select module Property Management
 const Property_management_url4 = 'https://kommune.mainmanager.is/mmv2/services/MMLayoutReadOnly.asmx/GetMenuItemProcessItems';

// Define the payload as JSON
const Property_management_Payload4 = JSON.stringify({
  Parent: 'PropertyManagement',
  Tag: "LeaseContract"

});

// Define the headers
const Property_management__headers4 = {
  'Content-Type': 'application/json',
  Cookie: sessionCookie,
};

sleep(2); // Pause test
// Send POST request
const Property_management_response4 = http.post(Property_management_url4, Property_management_Payload4, { headers: Property_management__headers4 });
sleep(2); // Pause test

// Validate response
check(Property_management_response4, {
  'Step 14b : Select Property_management, Status is 200': (r) => r.status === 200,
  //'Step 14b : Response contains "Head lease contracts"': (r) => r.body.includes('Head lease contracts'),
});

// Log the response for debugging
//console.log'Step 14b : -----> Property_management Body4:', Property_management_response4.body);

sleep(2); // Pause for 1 second


// Step 15 : Call Lease Contracts overview
const Lease_Contracts_overview_url__ = 'https://kommune.mainmanager.is/mmv2/services/MMLayoutReadOnly.asmx/GetMenuItemProcessItems';

// Define the payload as JSON
const Lease_Contracts_payload__  = JSON.stringify({
  Parent: 'PropertyManagement',
  Tag: "LeaseContract"
 
});

// Define the headers
const Lease_Contracts_headers__  = {
  'Content-Type': 'application/json',
  Cookie: sessionCookie,
};
sleep(2); // Pause test
// Send POST request
const Lease_Contracts_response__  = http.post(Lease_Contracts_overview_url__ , Lease_Contracts_payload__ , { headers: Lease_Contracts_headers__  });
sleep(2); // Pause test
// Validate response
check(Lease_Contracts_response__, {
  'Step 15 : Select Lease_Contracts, Status is 200': (r) => r.status === 200,
  //'Step 15 : Response contains "SubLeaseContract"': (r) => r.body.includes('SubLeaseContract'),
});

// Log the response for debugging
//console.log'Step 15 : -----> Lease_Contracts_response Body:', Lease_Contracts_response__ .body);

sleep(2); // Pause for 1 second


// Step 16 :  Click on "lease contract renogotiation"
const click_lease_contract_renogotiation_url = 'https://kommune.mainmanager.is/mmv2/services/MMLayout.asmx/InitMainLayout';

// Define the payload as JSON
const click_lease_contract_renogotiation_payload = JSON.stringify({
  UniqueString: "",
  MenuItemKey: "LeaseContractRenegotiation",
  SummaryID: 0,
  MenuItemID: 5417,
  MenuItemTypeID: 1,
  ProcessStepTag: "LeaseContract",
  ProcessTag: "PropertyManagement",
  SnapshotID: 0
});


// Define the headers
const click_lease_contract_renogotiation_headers = {
  'Content-Type': 'application/json',
  Cookie: sessionCookie,
};
sleep(2); // Pause test
// Send POST request
const click_lease_contract_renogotiation_response = http.post(click_lease_contract_renogotiation_url, click_lease_contract_renogotiation_payload, { headers: click_lease_contract_renogotiation_headers });
sleep(2); // Pause test
// Validate response
check(click_lease_contract_renogotiation_response, {
  'Step 16 : Select click_lease_contract_renogotiation , Status is 200': (r) => r.status === 200,
  //'Step 16 : Response contains "CurrencyDecimalSeparator"': (r) => r.body.includes('CurrencyDecimalSeparator')
});

// Log the response for debugging
//console.log'Step 16 : click_lease_contract_renogotiation body:', click_lease_contract_renogotiation_response.body);

sleep(2); // Pause for 1 second

// Step 17 :  Click on open "lease contract renogotiation"

const open_lease_contract_renogotiation_url= 'https://kommune.mainmanager.is/mmv2/services/MMLayout.asmx/LoadMMModalControl';

// Define the payload as JSON
const open_lease_contract_renogotiation_payload = JSON.stringify({
  tag: "LeaseContractRenegotiation",
  datapath: "LeaseContractRenegotiation$1$1",
  id: "1",
  PopupSQLListIndex: 0,
  UserRoleID: 0,
  contenttype: "7",
  datatext: "Open lease contract renegotiation",
  editMode: 1,
  extraparameters: "",
  idselection: [],
  modal: "1",
  norestore: "",
  savebuttonvalue: 0,
  templateid: 0,
  uniquestring: "34d94b57d19c4d0599a05b7af42c77e9",
  viewkey: "UseDefaultViewKey"
  });
  
 
// Define the headers
const open_lease_contract_renogotiation_headers = {
  'Content-Type': 'application/json',
  Cookie: sessionCookie,
};

sleep(2); // Pause test
// Send POST request
const open_lease_contract_renogotiation_response = http.post(open_lease_contract_renogotiation_url, open_lease_contract_renogotiation_payload, { headers: open_lease_contract_renogotiation_headers });
sleep(2); // Pause test

// Validate response
check(open_lease_contract_renogotiation_response, {
  'Step 17 : open "lease contract renogotiation", Status is 200': (r) => r.status === 200,
 
});

// Log the response for debugging
//console.log'Step 17 : Open "lease contract renogotiation', open_lease_contract_renogotiation_response.body);

sleep(2); // Pause for 1 second


// Step 18 : Click on save (lease_contract_renogotiation )
const save_lease_contract_renogotiation_url  = 'https://kommune.mainmanager.is/mmv2/services/MMLayout.asmx/Save';

// Define the payload as JSON
const save_lease_contract_payload = JSON.stringify({
  UniqueString: "34d94b57d19c4d0599a05b7af42c77e9",
  DataPath: "LeaseContractRenegotiation$1$1",
  ActionKey: "",
  AskToContinueConfirmed: false,
  SaveButtonValue: 32,
  Value: [
    "mmGraphicalScreenshot#",
    "Modal1_TFSetID#100",
    "Modal1_TFOptionNumber#1"
    // Add additional items if needed
  ]
 
});

// Define the headers
const save_lease_contract_headers = {
  'Content-Type': 'application/json',
  Cookie: sessionCookie,
};

sleep(2); // Pause test
// Send POST request
const save_lease_contract_response = http.post(save_lease_contract_renogotiation_url, save_lease_contract_payload, { headers: save_lease_contract_headers });
sleep(2); // Pause test


// Validate response
check(save_lease_contract_response, {
  'Step 18 : save_lease_contract_response, Status is 200': (r) => r.status === 200,
  //'Step 18 : Response contains "Your work has been saved"': (r) => r.body.includes('Your work has been saved'),
});

// Log the response for debugging
//console.log'Step 18 : save_lease_contract_response Body:', save_lease_contract_response.body);

sleep(2); // Pause for 1 second

// Step 19a : Select module Property Management
const Property_management_url___ = 'https://kommune.mainmanager.is/mmv2/services/MMLayoutReadOnly.asmx/GetMenuItemSteps';

// Define the payload as JSON
const Property_management_payload___  = JSON.stringify({
  Tag: "PropertyManagement"
});

// Define the headers
const Property_management_headers___  = {
  'Content-Type': 'application/json',
  Cookie: sessionCookie,
};

sleep(2); // Pause test
// Send POST request
const Property_management_response___  = http.post(Property_management_url___ , Property_management_payload___ , { headers: Property_management_headers___  });
sleep(2); // Pause test


// Validate response
check(Property_management_response___ , {
  'Step 19a : Select Property_management, Status is 200': (r) => r.status === 200,
  //'Step 19s : Response contains "Organisations overview"': (r) => r.body.includes('Lease contracts overview'),
});

 // Log the response for debugging
 //console.log'Step 19s : -----> Property_management Body___ :', Property_management_response___ .body);

 sleep(2); // Pause for 1 second


 // Step 19b : Select module Property Management
 const Property_management_url2_ = 'https://kommune.mainmanager.is/mmv2/services/MMLayoutReadOnly.asmx/GetMenuItemProcessItems';

// Define the payload as JSON
const Property_management_Payload2_ = JSON.stringify({
  Parent: 'PropertyManagement',
  Tag: "LeaseContract"

});

// Define the headers
const Property_management__headers2_ = {
  'Content-Type': 'application/json',
  Cookie: sessionCookie,
};

sleep(2); // Pause test
// Send POST request
const Property_management_response2_ = http.post(Property_management_url2_, Property_management_Payload2_, { headers: Property_management__headers2_ });
sleep(2); // Pause test


// Validate response
check(Property_management_response2_, {
  'Step 19b : Select Property_management, Status is 200': (r) => r.status === 200,
  //'Step 19b : Response contains "Head lease contracts"': (r) => r.body.includes('Head lease contracts'),
});

// Log the response for debugging
//console.log'Step 19b : -----> Property_management Body2_:', Property_management_response2_.body);

sleep(2); // Pause for 1 second


// Step 20 : Call Lease Contracts overview
const Lease_Contracts_overview_url___ = 'https://kommune.mainmanager.is/mmv2/services/MMLayoutReadOnly.asmx/GetMenuItemProcessItems';

// Define the payload as JSON
const Lease_Contracts_payload___ = JSON.stringify({
  Parent: 'PropertyManagement',
  Tag: "LeaseContract"
 
});

// Define the headers
const Lease_Contracts_headers___ = {
  'Content-Type': 'application/json',
  Cookie: sessionCookie,
};

sleep(2); // Pause test
// Send POST request
const Lease_Contracts_response___ = http.post(Lease_Contracts_overview_url___, Lease_Contracts_payload___, { headers: Lease_Contracts_headers___ });
sleep(2); // Pause test


// Validate response
check(Lease_Contracts_response, {
  'Step 20 : Select Lease_Contracts, Status is 200': (r) => r.status === 200,
  //'Step 20 : Response contains "SubLeaseContract"': (r) => r.body.includes('SubLeaseContract'),
});

// Log the response for debugging
//console.log'Step 20 : -----> Lease_Contracts_response Body___:', Lease_Contracts_response___.body);

sleep(2); // Pause for 1 second


// Step 21 : Call head lease contracts
const Head_lease_contracts_url___ = 'https://kommune.mainmanager.is/mmv2/services/MMLayout.asmx/InitMainLayout';

// Define the headers
const Head_lease_contracts_payload___ = JSON.stringify({
  UniqueString: "",
  MenuItemKey: "HeadLeaseContract",
  SummaryID: 0,
  MenuItemID: 5387,
  MenuItemTypeID: 1,
  ProcessStepTag: "LeaseContract",
  ProcessTag: "PropertyManagement",
  SnapshotID: 0
});

// Define the headers
const Head_lease_contracts_headers___ = {
  'Content-Type': 'application/json',
  Cookie: sessionCookie,
};

sleep(2); // Pause test
// Send POST request
const Head_lease_contracts_response___ = http.post(Head_lease_contracts_url___, Head_lease_contracts_payload___, { headers: Head_lease_contracts_headers___ });
sleep(2); // Pause test


// Validate response
check(Head_lease_contracts_response___, {
  'Step 21 : Select head lease contracts, Status is 200': (r) => r.status === 200,
  //'Step 21: Response contains "Head lease contract___"': (r) => r.body.includes('Head lease contract'),
});

// Log the response for debugging
//console.log'Step 21 : ----->  Head_lease_contracts_Body___:', Head_lease_contracts_response___.body);

sleep(2); // Pause for 1 second



// Step 22 : Click on the 'Site Dropdown'
const click_Site_Dropdown = 'https://kommune.mainmanager.is/mmv2/restapi/List/ComboboxData?DataPath=HeadLeaseContract%241%240%7CGroundID%2412%240&UniqueString=3a5d2caf334f4688bb0ef3e403970e21&p=1&q=;';

// Define the headers
const click_Site_Dropdown_headers = {
  'Content-Type': 'application/json',
  Cookie: sessionCookie,
};

sleep(2); // Pause test
const click_Site_Dropdown_response = http.get(click_Site_Dropdown, { headers: click_Site_Dropdown_headers });
sleep(2); // Pause test

// Check for the response status code
  check(click_Site_Dropdown_response, {
    'Step 22 : Click on the Site Dropdown, status 200': (r) => r.status === 200,
    //'Step 22 : response contains ShowSumOfAllChildrenInLabel': (r) => r.body.includes('ShowSumOfAllChildrenInLabel'),
  });

  // Log the response for debugging
//console.log'Step 22 : ----->  Click on the Site Dropdown', click_Site_Dropdown_response.body);


  // Step 23 : Select value : Affaldscenter, AffaldVarme, Center for Miljø og En

  sleep(2); // Pause for 1 second


  
  // Step 23a: Click on sites dropdown
  const Refresh_MainManFilter_url = 'https://kommune.mainmanager.is/mmv2/services/MMLayout.asmx/RefreshMainManFilter';
  
  // Define the payload
  const Refresh_MainManFilter_payload = JSON.stringify({
    DataTag: 'HeadLeaseContract',
    ControlIDChanged: 'MainManFilter_TFGroundID',
    Value: [
      'MainManFilter_TFRegionID#0',
      'MainManFilter_TFMainGroupID#0',
      'MainManFilter_TFGroundID#58358',
      'MainManFilter_TFMainID#0',
    ],
  });
  
  // Define the headers
  const Refresh_MainManFilter_headers = {
    'Content-Type': 'application/json',
    Cookie: sessionCookie,
  };
  
  // Send POST request
  sleep(2); // Pause test
  const Refresh_MainManFilter_response = http.post(
    Refresh_MainManFilter_url,
    Refresh_MainManFilter_payload,
    { headers: Refresh_MainManFilter_headers }
  );
  sleep(2); // Pause test
  
  // Check for the response status and content
  check(Refresh_MainManFilter_response, {
    'Step 23a : Refresh MainManFilter, status 200': (r) => r.status === 200,
    //'Step 23a : Response contains Show all regions': (r) => r.body.includes('Show all regions'),
  });
  
  // Log the response body for debugging
  //console.log'Step 23a : -----> Click on sites dropdown', Refresh_MainManFilter_response.body);

  sleep(1); // Pause for 1 second


  // Step 23b : Click on sites dropdown
const GetMMList_url = 'https://kommune.mainmanager.is/mmv2/restapi/List/GetMMList';

// Define the headers
const GetMMList_headers = {
  'Content-Type': 'application/json',
  Cookie: sessionCookie, 
};

sleep(2); // Pause test
// Send POST request with no payload
const GetMMList_response = http.post(GetMMList_url, null, { headers: GetMMList_headers });
sleep(2); // Pause test

// Check for the response status and content
check(GetMMList_response, {
  'Step 23b: Click on sites dropdown, status is 200': (r) => r.status === 200,
  //'Step 23b: Response contains Iceconsult.MainTools.MMContainer': (r) => r.body.includes('Iceconsult.MainTools.MMContainer'),
});

// Log the response body for debugging
//console.log'Step 23b: -----> GetMMList response', GetMMList_response.body);

sleep(2); // Pause for 1 second


// Step 24 : Clear the filter
const Refresh_MainManFilter_url_ = 'https://kommune.mainmanager.is/mmv2/services/MMLayout.asmx/RefreshMainManFilter';
  
  // Define the payload
  const Refresh_MainManFilter_payload_ = JSON.stringify({
    DataTag: 'HeadLeaseContract',
    ControlIDChanged: 'MainManFilter_TFGroundID',
    Value: [
      'MainManFilter_TFRegionID#0',
      'MainManFilter_TFMainGroupID#0',
      'MainManFilter_TFGroundID#58358',
      'MainManFilter_TFMainID#0',
    ],
  });
  
  // Define the headers
  const Refresh_MainManFilter_headers_ = {
    'Content-Type': 'application/json',
    Cookie: sessionCookie,
  };
  
  sleep(2); // Pause test
  // Send POST request
  const Refresh_MainManFilter_response_ = http.post(
    Refresh_MainManFilter_url,
    Refresh_MainManFilter_payload,
    { headers: Refresh_MainManFilter_headers }
  );
  sleep(2); // Pause test
  
  // Check for the response status and content
  check(Refresh_MainManFilter_response_, {
    'Step 23a : Clear the filter, Refresh MainManFilter, status 200': (r) => r.status === 200,
    //'Step 23a : Response contains Show all regions': (r) => r.body.includes('Show all regions'),
  });
  
  // Log the response body for debugging
  //console.log'Step 23a : -----> Clear the filter', Refresh_MainManFilter_response_.body);

  sleep(2); // Pause for 1 second

  // Step 24a : Select module Property Management
const Property_management_url____ = 'https://kommune.mainmanager.is/mmv2/services/MMLayoutReadOnly.asmx/GetMenuItemSteps';

// Define the payload as JSON
const Property_management_payload____  = JSON.stringify({
  Tag: "PropertyManagement"
});

// Define the headers
const Property_management_headers____  = {
  'Content-Type': 'application/json',
  Cookie: sessionCookie,
};

sleep(2); // Pause test
// Send POST request
const Property_management_response____  = http.post(Property_management_url____ , Property_management_payload____ , { headers: Property_management_headers____  });
sleep(2); // Pause test

// Validate response
check(Property_management_response____ , {
  'Step 24a : Select Property_management, Status is 200': (r) => r.status === 200,
  //'Step 24a : Response contains "Organisations overview"': (r) => r.body.includes('Lease contracts overview'),
});

 // Log the response for debugging
 //console.log'Step 24a : -----> Property_management Body:', Property_management_response____ .body);

 sleep(2); // Pause for 1 second


 // Step 24b : Select module Property Management
 const Property_management_url2___ = 'https://kommune.mainmanager.is/mmv2/services/MMLayoutReadOnly.asmx/GetMenuItemProcessItems';

// Define the payload as JSON
const Property_management_Payload2___ = JSON.stringify({
  Parent: 'PropertyManagement',
  Tag: "LeaseContract"

});

// Define the headers
const Property_management__headers2___ = {
  'Content-Type': 'application/json',
  Cookie: sessionCookie,
};

sleep(2); // Pause test
// Send POST request
const Property_management_response2___ = http.post(Property_management_url2___, Property_management_Payload2___, { headers: Property_management__headers2___ });
sleep(2); // Pause test

// Validate response
check(Property_management_response2___, {
  'Step 24b : Select Property_management, Status is 200': (r) => r.status === 200,
  //'Step 24b : Response contains "Head lease contracts"': (r) => r.body.includes('Head lease contracts'),
});

// Log the response for debugging
//console.log'Step 24b : -----> Property_management Body2:', Property_management_response2___.body);

sleep(2); // Pause for 1 second


// Step 25 : Call Lease Contracts overview
const Lease_Contracts_overview_url____ = 'https://kommune.mainmanager.is/mmv2/services/MMLayoutReadOnly.asmx/GetMenuItemProcessItems';

// Define the payload as JSON
const Lease_Contracts_payload____ = JSON.stringify({
  Parent: 'PropertyManagement',
  Tag: "LeaseContract"
 
});

// Define the headers
const Lease_Contracts_headers____ = {
  'Content-Type': 'application/json',
  Cookie: sessionCookie,
};

sleep(2); // Pause test
// Send POST request
const Lease_Contracts_response____ = http.post(Lease_Contracts_overview_url____, Lease_Contracts_payload____, { headers: Lease_Contracts_headers____ });
sleep(2); // Pause test

// Validate response
check(Lease_Contracts_response____, {
  'Step 25 : Select Lease_Contracts, Status is 200': (r) => r.status === 200,
 // 'Step 25 : Response contains "SubLeaseContract"': (r) => r.body.includes('SubLeaseContract'),
});

// Log the response for debugging
//console.log'Step 25 : -----> Lease_Contracts_response Body:', Lease_Contracts_response____.body);

sleep(2); // Pause for 1 second


// Step 26 : Call head lease contracts
const Head_lease_contracts_url____ = 'https://kommune.mainmanager.is/mmv2/services/MMLayout.asmx/InitMainLayout';

// Define the headers
const Head_lease_contracts_payload____ = JSON.stringify({
  UniqueString: "",
  MenuItemKey: "HeadLeaseContract",
  SummaryID: 0,
  MenuItemID: 5387,
  MenuItemTypeID: 1,
  ProcessStepTag: "LeaseContract",
  ProcessTag: "PropertyManagement",
  SnapshotID: 0
});

// Define the headers
const Head_lease_contracts_headers____ = {
  'Content-Type': 'application/json',
  Cookie: sessionCookie,
};

sleep(2); // Pause test
// Send POST request
const Head_lease_contracts_response____ = http.post(Head_lease_contracts_url____, Head_lease_contracts_payload____, { headers: Head_lease_contracts_headers____ });
sleep(2); // Pause test


// Validate response
check(Head_lease_contracts_response____, {
  'Step 26 : Select head lease contracts, Status is 200': (r) => r.status === 200,
  //'Step 26 : Response contains "Head lease contract"': (r) => r.body.includes('Head lease contract'),
});

// Log the response for debugging
//console.log'Step 26 : ----->  Head_lease_contracts_Body____:', Head_lease_contracts_response____.body);

sleep(2); // Pause for 1 second


// Step 27 : Click on Payer 

// // Send POST request
const ComboBoxTree_url = 'https://kommune.mainmanager.is/mmv2/restapi/Graphical/ComboBoxTree?parent=%23&datapath=HeadLeaseContract%241%240%7CBenificiary2ID%247%240&uniquestring=5c7168fd13f649f7b5ca53df395ddb21&selectedID=0&containerLocation=2&treeModeEnum=-1&searchString=&selectedFound=false';

// Define the headers
const ComboBoxTree_headers = {
  'Content-Type': 'application/json',
  Cookie: sessionCookie, 
};

sleep(2); // Pause test
// Send GET request with no payload
const ComboBoxTree_response = http.get(ComboBoxTree_url, { headers: ComboBoxTree_headers });
sleep(2); // Pause test


// Check for the response status and content
check(ComboBoxTree_response, {
  'Step 27: ComboBoxTree, status is 200': (r) => r.status === 200,
  //'Step 27: Response contains "Nothing selected"': (r) => r.body.includes('Nothing selected'),
});

// Log the response body for debugging
//console.log'Step 27: -----> Click on Payer  response', ComboBoxTree_response.body);

sleep(2); // Pause for 1 second



// Step 28 : Select value : MalerMestrene2 

//  Send POST request
const RefreshDataFilter_url = 'https://kommune.mainmanager.is/mmv2/services/MMLayout.asmx/RefreshDataFilter';

// Define the payload
const RefreshDataFilter_payload = JSON.stringify({
  DataTag: 'HeadLeaseContract',
  ControlIDChanged: 'DataFilter_TFBenificiary2ID',
  TemplateID: 0,
  Value: [
    'DataFilter_TFSearchText#',
    'DataFilter_TFDateFilterID#1008',
    'DataFilter_TFTimeLimitINPUT#All years',
    'DataFilter_TFTimeLimit#',
    'DataFilter_TFStatusID#1,10,11,13,14,15,16,17,18,19,2,20,5,8',
    'DataFilter_TFLeaseContractTypeID#0',
    'DataFilter_TFRentalTypeID#0',
    'DataFilter_TFTenancyStatusID#0',
    'DataFilter_TFCodeSearch#',
    'DataFilter_TFEFCategoryID1#0',
    'DataFilter_TFContractStatusCategoryID#0',
    'DataFilter_TFProviderID#0',
    'DataFilter_TFManagerID#0',
    'DataFilter_TFEFBoolean3#0',
    'DataFilter_TFAgentID#0',
    'DataFilter_TFAgentContactID#0',
    'DataFilter_TFBenificiary2ID#50566',
    'DataFilter_TFPayerContactID#0',
    'DataFilter_TFEFBoolean2#0',
    'DataFilter_TFBenificiaryID#0',
    'DataFilter_TFEFBoolean1#0',
    'DataFilter_TFEFBoolean4#0',
    'DataFilter_TFHasTerminationClause#0',
    'DataFilter_TFShowInactiveFilterID#0',
  ],
});

// Define the headers
const RefreshDataFilter_headers = {
  'Content-Type': 'application/json',
  Cookie: sessionCookie, 
};

sleep(2); // Pause test
// Send POST request with the payload
const RefreshDataFilter_response = http.post(
  RefreshDataFilter_url,
  RefreshDataFilter_payload,
  { headers: RefreshDataFilter_headers }
);
sleep(2); // Pause test

// Check for the response status and content
check(RefreshDataFilter_response, {
  'Step 28: RefreshDataFilter, status is 200': (r) => r.status === 200,
  //'Step 28: Response contains "Nothing selected"': (r) => r.body.includes('MalerMestrene2'),

});

// Log the response body for debugging
//console.log'Step 28: -----> RefreshDataFilter response', RefreshDataFilter_response.body);

sleep(2); // Pause for 1 second


// Step 29 : Remove the filter

// Send POST request
const EmptyDataFilter_url = 'https://kommune.mainmanager.is/mmv2/services/MMLayout.asmx/EmptyDataFilter';

// Define the payload
const EmptyDataFilter_payload = JSON.stringify({
  DataTag: 'HeadLeaseContract',
  Value: [
    'DataFilter_TFSearchText#',
    'DataFilter_TFDateFilterID#1008',
    'DataFilter_TFTimeLimitINPUT#All years',
    'DataFilter_TFTimeLimit#',
    'DataFilter_TFStatusID#1,10,11,13,14,15,16,17,18,19,2,20,5,8',
    'DataFilter_TFLeaseContractTypeID#0',
    'DataFilter_TFRentalTypeID#0',
    'DataFilter_TFTenancyStatusID#0',
    'DataFilter_TFCodeSearch#',
    'DataFilter_TFEFCategoryID1#0',
    'DataFilter_TFContractStatusCategoryID#0',
    'DataFilter_TFProviderID#0',
    'DataFilter_TFManagerID#0',
    'DataFilter_TFEFBoolean3#0',
    'DataFilter_TFAgentID#0',
    'DataFilter_TFAgentContactID#0',
    'DataFilter_TFBenificiary2ID#50566',
    'DataFilter_TFPayerContactID#0',
    'DataFilter_TFEFBoolean2#0',
    'DataFilter_TFBenificiaryID#0',
    'DataFilter_TFEFBoolean1#0',
    'DataFilter_TFEFBoolean4#0',
    'DataFilter_TFHasTerminationClause#0',
    'DataFilter_TFShowInactiveFilterID#0',
  ],
});

// Define the headers
const EmptyDataFilter_headers = {
  'Content-Type': 'application/json',
  Cookie: sessionCookie, // Ensure sessionCookie is defined in your setup
};

sleep(2); // Pause test
// Send POST request with the payload
const EmptyDataFilter_response = http.post(
  EmptyDataFilter_url,
  EmptyDataFilter_payload,
  { headers: EmptyDataFilter_headers }
);
sleep(2); // Pause test

// Check for the response status and content
check(EmptyDataFilter_response, {
  'Step 29: Remove the filter, status is 200': (r) => r.status === 200,
  //'Step 29: Response contains "FormRefresh"': (r) => r.body.includes('FormRefresh'),
});

// Log the response body for debugging
//console.log'Step 29: -----> Remove the filter response', EmptyDataFilter_response.body);


sleep(2); // Pause for 1 second


  // STEP 30: Logout Request
  const logoutUrl = 'https://kommune.mainmanager.is/mmv2/MMV2Logout.aspx';

  const logoutHeaders = {
    'Content-Type': 'text/html; charset=utf-8',
    //'Cookie': sessionCookie,
  };
  sleep(2); // Pause test
  const logoutResponse = http.get(logoutUrl, { headers: logoutHeaders });
  sleep(2); // Pause test


  check(logoutResponse, {
    'STEP 30 : Logout Request, Status is 200': (r) => r.status === 200,
    //'STEP 30 : Content-Type is HTML': (r) => r.headers['Content-Type'] === 'text/html; charset=utf-8',
    //'STEP 30 : Server is Cloudflare': (r) => r.headers['Server'] === 'cloudflare',
  });
  






  
  





}







