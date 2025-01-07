import http from 'k6/http';
import { check, sleep } from 'k6';

export const options = {
  stages: [
    { duration: '5m', target: 100 },  // Ramp up to 100 VUs over 5 minutes
    { duration: '5m', target: 100 },  // Maintain 100 VUs for another 5 minutes
  ],
};


// Session cookie 
const sessionCookie = 'ASP.NET_SessionId=tu1dq0c2v2lmdtwetb3prtz2';

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

  sleep(2); // Pause for 1 second


 
  // STEP 2a : Select Human Resources

  // Define the URL
  const Human_Resources_url = 'https://kommune.mainmanager.is/mmv2/services/MMLayoutReadOnly.asmx/GetMenuItemSteps';

  // Define the payload as JSON
  const Human_Resources_payload = JSON.stringify({
    Tag: "HumanResources"
  });

  // Define the headers
  const Human_Resources_headers = {
    'Content-Type': 'application/json',
    Cookie: sessionCookie,
  };

  sleep(2); // Pause test
  // Send POST request
  const Human_Resources_response = http.post(Human_Resources_url, Human_Resources_payload, { headers: Human_Resources_headers });
  sleep(2); // Pause test

  // Validate response
  check(Human_Resources_response, {
    'Step 2a : Select Human Resources, Status is 200': (r) => r.status === 200,
    'Step 2a : Response contains key "d"': (r) => JSON.parse(r.body).hasOwnProperty('d'),
    'Step 2a : Response contains "Organisations overview"': (r) => r.body.includes('Organisations overview'),
  });

  // Log the response for debugging
  ////console.log('Step 2a : Human_Resources_Response Body:', Human_Resources_response.body);

  sleep(2); // Pause for 1 second


   // STEP 2b : Select Human Resources

   const Human_Resources_url2 = 'https://kommune.mainmanager.is/mmv2/services/MMLayoutReadOnly.asmx/GetMenuItemProcessItems';

// Define the payload as JSON
const Human_Resources_payload2 = JSON.stringify({
  Parent: "HumanResources",
  Tag: "Organisation"
});

// Define the headers
const Human_Resources_headers2 = {
  'Content-Type': 'application/json',
  'Cookie': sessionCookie,
};

 sleep(2); // Pause test
// Send POST request
const Human_Resources_response2 = http.post(Human_Resources_url2, Human_Resources_payload2, { headers: Human_Resources_headers2 });
sleep(2); // Pause test

// Validate the response
check(Human_Resources_response2, {
  'Step 2b : Select Human Resources, Status code is 200': (r) => r.status === 200,
  'Step 2b : Response contains key "d"': (r) => JSON.parse(r.body).hasOwnProperty('d'),
  'Step 2b : Response contains "Build organisation trees"': (r) => r.body.includes('Build organisation trees'),
  'Step 2b : Response contains "Work groups"': (r) => r.body.includes('Work groups'),
  'Step 2b : Response contains "Employees"': (r) => r.body.includes('Employees'),
});

// Log the response for debugging
////console.log('Step 2b : Human_Resources_response2:', Human_Resources_response2.body);

sleep(2); // Pause for 1 second


// STEP 3 : Call Organisations Overview
// Call organisations Overview
const Organisations_Overview_url = 'https://kommune.mainmanager.is/mmv2/services/MMLayoutReadOnly.asmx/GetMenuItemProcessItems';

// Define the payload as JSON
const Organisations_Overview_payload = JSON.stringify({
  Parent: "HumanResources",
  Tag: "Organisation"
});

// Define the headers
const Organisations_Overview_headers = {
  'Content-Type': 'application/json',
  'Cookie': sessionCookie,
};

sleep(2); // Pause test
// Send POST request
const Organisations_Overview_Response = http.post(Organisations_Overview_url, Organisations_Overview_payload, { headers: Organisations_Overview_headers });
sleep(2); // Pause test

// Validate the response
check(Organisations_Overview_Response, {
  'Step 3 : Call organisations Overview, Status code is 200': (r) => r.status === 200,
  'Step 3 : Response contains key "d"': (r) => JSON.parse(r.body).hasOwnProperty('d'),
  'Step 3 : Response contains "Build organisation trees"': (r) => r.body.includes('Build organisation trees'),
  'Step 3 : Response contains "Work groups"': (r) => r.body.includes('Work groups'),
  'Step 3 : Response contains "Employees"': (r) => r.body.includes('Employees'),
});

// Log the response for debugging
//////console.log('Step 3 : Organisations_Overview_Response:', Organisations_Overview_Response.body);

sleep(2); // Pause for 1 second


// Step 4 : Call Build Organisation Tree

const Call_Build_Organisation_Tree_url = 'https://kommune.mainmanager.is/mmv2/services/MMLayout.asmx/InitMainLayout';

// Define the payload for the POST request
const Call_Build_Organisation_Tree_payload = JSON.stringify({
  UniqueString: "",
  MenuItemKey: "OrganisationTree",
  SummaryID: 0,
  MenuItemID: 2926,
  MenuItemTypeID: 1,
  ProcessStepTag: "Organisation",
  ProcessTag: "HumanResources",
  SnapshotID: 0,
  SummaryID: 0,
});

// Define the headers
const Call_Build_Organisation_Tree_headers = {
  'Content-Type': 'application/json',
  'Cookie': sessionCookie,
};

// Define the function for the test

sleep(2); // Pause test
  // Send the POST request
  const Call_Build_Organisation_Tree_response = http.post(Call_Build_Organisation_Tree_url, Call_Build_Organisation_Tree_payload, { headers : Call_Build_Organisation_Tree_headers });
  sleep(2); // Pause test

  // Check if the response status is 200
  check(Call_Build_Organisation_Tree_response, {
    'Step 4 : Call Build Organisation Tree, Status code is 200': (r) => r.status === 200,
  });

  // Check if the response contains the expected fields
  check(Call_Build_Organisation_Tree_response, {
    'Step 4 : Response contains d': (r) => r.body.includes('"d":'),
    'Step 4 : Response contains GraphicalNavigation': (r) => r.body.includes('"GraphicalNavigation":'),
    'Step 4 : Response contains ActiveDataCaption': (r) => r.body.includes('"ActiveDataCaption":'),
  });

  // Log the response for debugging purposes
  //console.log('Step 4 : Call_Build_Organisation_Tree_response: ', Call_Build_Organisation_Tree_response.body);

  sleep(2); // Pause for 1 second


  // STEP 5 : Call MM GROUP ApS

const Call_MM_GROUP_ApS_url = 'https://kommune.mainmanager.is/mmv2/restapi/Graphical/Tree?parent=11547&datapath=OrganisationTree%241%240&uniquestring=d8fb4b0cdc2343fb932c957056dc6b89&child=false&treeid=MMLeftTree-OrganisationTree';

// Headers
const Call_MM_GROUP_ApS_headers = {
  'Cookie': sessionCookie,
};

sleep(2); // Pause test
// Send GET request
const Call_MM_GROUP_ApS_response = http.get(Call_MM_GROUP_ApS_url, { headers: Call_MM_GROUP_ApS_headers });
sleep(2); // Pause test


// Validate response
check(Call_MM_GROUP_ApS_response, {
  'Step 5 : Call MM GROUP ApS, status is 200': (r) => r.status === 200,
  'Step 5 : Response contains children': (r) => JSON.parse(r.body).length > 0,
});

// Log the response for debugging
////console.log('Step 5 : Call_MM_GROUP_ApS_Response:', Call_MM_GROUP_ApS_response.body);

sleep(2); // Pause for 1 second


// STEP 6 : Right click on MM GROUP
const Right_click_on_MM_GROUP_url = 'https://kommune.mainmanager.is/mmv2/services/MMLayoutReadOnly.asmx/PopulateTreeActionMenu';

// Payload
const Right_click_on_MM_GROUP_payload = JSON.stringify({
  sDataTag: "Organisation",
  lDataID: 50421,
});

// Headers
const Right_click_on_MM_GROUP_headers = {
  'Content-Type': 'application/json',
  'Cookie': sessionCookie,
};

sleep(2); // Pause test
// Send POST request
const Right_click_on_MM_GROUP_response = http.post(Right_click_on_MM_GROUP_url, Right_click_on_MM_GROUP_payload, { headers : Right_click_on_MM_GROUP_headers });
sleep(2); // Pause test

// Validate response
check(Right_click_on_MM_GROUP_response, {
  'STEP 6 : Right click on MM GROUP, Status code is 200': (r) => r.status === 200,

});

// Log the response for debugging
////console.log('Step 6 : Right_click_on_MM_GROUP Response Body:', Right_click_on_MM_GROUP_response.body);

sleep(2); // Pause for 1 second


// Step 7 : Select Open company option

const Select_Open_company_url = 'https://kommune.mainmanager.is/mmv2/services/MMLayout.asmx/LoadMMModalControl';

// Payload
const Select_Open_company_payload = JSON.stringify({
  tag: "Company",
  datapath: "Company$1$50421",
  id: "50421",
  modal: "1",
  viewkey: "UseDefaultViewKey",
  uniquestring: "6f56d9e47b31453eb98d7726cecb3b77",
  editMode: 1,
  datatext: "Open company",
  contenttype: "7",
  extraparameters: "",
  norestore: "",
  savebuttonvalue: 0,
  templateid: 0,
  PopupSQLListIndex: 0,
  UserRoleID: 0,
  idselection: [],
});

// Headers
const Select_Open_company_headers = {
  'Content-Type': 'application/json',
};

sleep(2); // Pause test
// Send POST request
const Select_Open_company_response = http.post(Select_Open_company_url, Select_Open_company_payload, { headers : Select_Open_company_headers });
sleep(2); // Pause test

// Validate response
check(Select_Open_company_response, {
  'Step 7 : Select Open company option, Status code is 200': (r) => r.status === 200,
});

// Log the response for debugging
//console.log('Step 7 : Select_Open_company_Response Body:', Select_Open_company_response.body);

sleep(2); // Pause for 1 second


  // STEP 8a : Select Human Resources

  // Define the URL
  const Human_Resources_url_ = 'https://kommune.mainmanager.is/mmv2/services/MMLayoutReadOnly.asmx/GetMenuItemSteps';

  // Define the payload as JSON
  const Human_Resources_payload_ = JSON.stringify({
    Tag: "HumanResources"
  });

  // Define the headers
  const Human_Resources_headers_ = {
    'Content-Type': 'application/json',
    Cookie: sessionCookie,
  };

 sleep(2); // Pause test
  // Send POST request
  const Human_Resources_response_ = http.post(Human_Resources_url_, Human_Resources_payload_, { headers: Human_Resources_headers_ });
  sleep(2); // Pause test


  // Validate response
  check(Human_Resources_response_, {
    'Step 8a : Select Human Resources, Status is 200': (r) => r.status === 200,
    'Step 8a : Response contains key "d"': (r) => JSON.parse(r.body).hasOwnProperty('d'),
    'Step 8a : Response contains "Organisations overview"': (r) => r.body.includes('Organisations overview'),
  });

  // Log the response for debugging
  //console.log('Step 8a : Human_Resources_Response Body_:', Human_Resources_response_.body);

  sleep(2); // Pause for 1 second


   // STEP 8b : Select Human Resources

   const Human_Resources_url2_ = 'https://kommune.mainmanager.is/mmv2/services/MMLayoutReadOnly.asmx/GetMenuItemProcessItems';

// Define the payload as JSON
const Human_Resources_payload2_ = JSON.stringify({
  Parent: "HumanResources",
  Tag: "Organisation"
});

// Define the headers
const Human_Resources_headers2_ = {
  'Content-Type': 'application/json',
  'Cookie': sessionCookie,
};

sleep(2); // Pause test
// Send POST request
const Human_Resources_response2_ = http.post(Human_Resources_url2_, Human_Resources_payload2_, { headers: Human_Resources_headers2_ });
sleep(2); // Pause test


// Validate the response
check(Human_Resources_response2_, {
  'Step 8b : Select Human Resources, Status code is 200': (r) => r.status === 200,
  'Step 8b : Response contains key "d"': (r) => JSON.parse(r.body).hasOwnProperty('d'),
  'Step 8b : Response contains "Build organisation trees"': (r) => r.body.includes('Build organisation trees'),
  'Step 8b : Response contains "Work groups"': (r) => r.body.includes('Work groups'),
  'Step 8b : Response contains "Employees"': (r) => r.body.includes('Employees'),
});

// Log the response for debugging
//console.log('Step 8b : Human_Resources_response2_:', Human_Resources_response2_.body);

sleep(2); // Pause for 1 second


// STEP 9 : Call Organisations Overview
// Call organisations Overview
const Organisations_Overview_url_ = 'https://kommune.mainmanager.is/mmv2/services/MMLayoutReadOnly.asmx/GetMenuItemProcessItems';

// Define the payload as JSON
const Organisations_Overview_payload_ = JSON.stringify({
  Parent: "HumanResources",
  Tag: "Organisation"
});

// Define the headers
const Organisations_Overview_headers_ = {
  'Content-Type': 'application/json',
  'Cookie': sessionCookie,
};

sleep(2); // Pause test
// Send POST request
const Organisations_Overview_Response_ = http.post(Organisations_Overview_url, Organisations_Overview_payload, { headers: Organisations_Overview_headers });
sleep(2); // Pause test


// Validate the response
check(Organisations_Overview_Response_, {
  'Step 9 : Call organisations Overview, Status code is 200': (r) => r.status === 200,
  'Step 9 : Response contains key "d"': (r) => JSON.parse(r.body).hasOwnProperty('d'),
  'Step 9 : Response contains "Build organisation trees"': (r) => r.body.includes('Build organisation trees'),
  'Step 9 : Response contains "Work groups"': (r) => r.body.includes('Work groups'),
  'Step 9 : Response contains "Employees"': (r) => r.body.includes('Employees'),
});

// Log the response for debugging
//console.log('Step 9 : Organisations_Overview_Response_:', Organisations_Overview_Response_.body);

sleep(2); // Pause for 1 second


// Step 10 : Call Build Organisation Tree

const Call_Build_Organisation_Tree_url_ = 'https://kommune.mainmanager.is/mmv2/services/MMLayout.asmx/InitMainLayout';

// Define the payload for the POST request
const Call_Build_Organisation_Tree_payload_ = JSON.stringify({
  UniqueString: "",
  MenuItemKey: "OrganisationTree",
  SummaryID: 0,
  MenuItemID: 2926,
  MenuItemTypeID: 1,
  ProcessStepTag: "Organisation",
  ProcessTag: "HumanResources",
  SnapshotID: 0,
  SummaryID: 0,
});

// Define the headers
const Call_Build_Organisation_Tree_headers_ = {
  'Content-Type': 'application/json',
  'Cookie': sessionCookie,
};

// Define the function for the test

sleep(2); // Pause test
  // Send the POST request
  const Call_Build_Organisation_Tree_response_ = http.post(Call_Build_Organisation_Tree_url_, Call_Build_Organisation_Tree_payload_, { headers : Call_Build_Organisation_Tree_headers_ });
  sleep(2); // Pause test


  // Check if the response status is 200
  check(Call_Build_Organisation_Tree_response_, {
    'Step 10 : Call Build Organisation Tree, Status code is 200': (r) => r.status === 200,
  });

  // Check if the response contains the expected fields
  check(Call_Build_Organisation_Tree_response_, {
    'Step 10 : Response contains d': (r) => r.body.includes('"d":'),
    'Step 10 : Response contains GraphicalNavigation': (r) => r.body.includes('"GraphicalNavigation":'),
    'Step 10 : Response contains ActiveDataCaption': (r) => r.body.includes('"ActiveDataCaption":'),
  });

  // Log the response for debugging purposes
  //console.log('Step 10 : Call_Build_Organisation_Tree_response_: ', Call_Build_Organisation_Tree_response_.body);

  sleep(2); // Pause for 1 second


 // STEP 11 : Right click on Gro Ustad and select Open person
 const Right_Click_url = 'https://kommune.mainmanager.is/mmv2/services/MMLayoutReadOnly.asmx/PopulateTreeActionMenu';

 // Define the payload
 const Right_Click_payload = JSON.stringify({
   sDataTag: "Person",
   lDataID: 57685,
 });
 
 // Set the headers
 const Right_Click_headers = {
   'Content-Type': 'application/json',
   'Cookie': sessionCookie,
 };

 sleep(2); // Pause test
// Make the POST request
const Right_Click_res = http.post(Right_Click_url, Right_Click_payload, { headers: Right_Click_headers });
sleep(2); // Pause test

// Log the entire response for debugging
//console.log('Step 11 : Right click on Gro Ustad Response: ', Right_Click_res.body);

// Validate response status and content
check(Right_Click_res, {
  'STEP 11 : Right click on Gro Ustad and select Open person, Status is 200': (r) => r.status === 200,
  'STEP 11 : Response body contains d field': (r) => r.body.includes('"d":'),
 
});

sleep(1); // Pause for 1 second


 // STEP 12: Logout Request
 const logoutUrl = 'https://kommune.mainmanager.is/mmv2/MMV2Logout.aspx';

 const logoutHeaders = {
   'Content-Type': 'text/html; charset=utf-8',
   //'Cookie': sessionCookie,
 };
 sleep(2); // Pause test
 const logoutResponse = http.get(logoutUrl, { headers: logoutHeaders });
 sleep(2); // Pause test
 check(logoutResponse, {
  'STEP 12 : Logout Request, Status is 200': (r) => r.status === 200,
  'STEP 12 : Content-Type is HTML': (r) => r.headers['Content-Type'] === 'text/html; charset=utf-8',
  'STEP 12 : Server is Cloudflare': (r) => r.headers['Server'] === 'cloudflare',
});





  
}
