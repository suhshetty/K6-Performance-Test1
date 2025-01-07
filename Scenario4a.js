import http from 'k6/http';
import { check } from 'k6';

export const options = {
  vus: 1,  // 100 virtual users 
  duration: '5s', // Duration of the test
};



// Set session cookie as a global variable to be reused in all iterations
const sessionCookie = 'ASP.NET_SessionId=xrgxtjoulirjx3bxq3quzirg';

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

  const loginResponse = http.post(loginUrl, loginPayload, { headers: loginHeaders });

  check(loginResponse, {
    'Step 1 : Login successful': (res) => res.status === 200,
  });






  function selectPropertyManagement(sessionCookie) 
  {
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
  
    // Send POST request
    const Property_management_response = http.post(Property_management_url, Property_management_payload, { headers: Property_management_headers });
  
    // Validate response
    check(Property_management_response, {
      'Step 2a : Select Property_management, Status is 200': (r) => r.status === 200,
      'Step 2a : Response contains "Organisations overview"': (r) => r.body.includes('Lease contracts overview'),
    });
  
    // Log the response for debugging
    console.log('Step 2a : -----> Property_management Body:', Property_management_response.body);
  
  
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
  
    // Send POST request
    const Property_management_response2 = http.post(Property_management_url2, Property_management_Payload2, { headers: Property_management__headers2 });
  
    // Validate response
    check(Property_management_response2, {
      'Step 2b : Select Property_management, Status is 200': (r) => r.status === 200,
      'Step 2b : Response contains "Head lease contracts"': (r) => r.body.includes('Head lease contracts'),
    });
  
    // Log the response for debugging
    console.log('Step 2b : -----> Property_management Body2:', Property_management_response2.body);
  
    
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
  
    // Send POST request
    const Lease_Contracts_response = http.post(Lease_Contracts_overview_url, Lease_Contracts_payload, { headers: Lease_Contracts_headers });
  
    // Validate response
    check(Lease_Contracts_response, {
      'Step 3 : Select Lease_Contracts, Status is 200': (r) => r.status === 200,
      'Step 3 : Response contains "SubLeaseContract"': (r) => r.body.includes('SubLeaseContract'),
    });
  
    // Log the response for debugging
    console.log('Step 3 : -----> Lease_Contracts_response Body:', Lease_Contracts_response.body);
  }
  
  // Call the function with the session cookie
  selectPropertyManagement(sessionCookie);

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

// Send POST request
const Head_lease_contracts_response = http.post(Head_lease_contracts_url, Head_lease_contracts_payload, { headers: Head_lease_contracts_headers });

// Validate response
check(Head_lease_contracts_response, {
  'Step 4 : Select head lease contracts, Status is 200': (r) => r.status === 200,
  'Step 4 : Response contains "Head lease contract"': (r) => r.body.includes('Head lease contract'),
});

// Log the response for debugging
console.log('Step 4 : ----->  Head_lease_contracts_Body:', Head_lease_contracts_response.body);


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

// Send POST request
const Open_head_lease_contracts_response = http.post(Open_head_lease_contracts_url, Open_head_lease_contracts_Payload, { headers: Open_head_lease_contracts_headers });

// Validate response
check(Open_head_lease_contracts_response, {
  'Step 5 : Select Open_head_lease_contracts, Status is 200': (r) => r.status === 200,
  'Step 5 : Response contains "file.documentdatapath"': (r) => r.body.includes('file.documentdatapath'),
});

// Log the response for debugging
console.log('Step 5 :-----> Open a head lease contracts:', Open_head_lease_contracts_response.body);

  // Call the function with the session cookie
  selectPropertyManagement(sessionCookie);
  


}