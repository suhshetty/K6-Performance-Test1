import http from 'k6/http';
import { check } from 'k6';

export const options = {
  vus: 1,  // 1 virtual user 
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

  // Start the first step with stepNumber 2 (or whichever step number you want to start with)
  selectPropertyManagement(sessionCookie, 2);
}

function selectPropertyManagement(sessionCookie, stepNumber) {
  // Step {stepNumber} : Select module Property Management
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
    [`Step ${stepNumber} : Select Property_management, Status is 200`]: (r) => r.status === 200,
    [`Step ${stepNumber} : Response contains "Organisations overview"`]: (r) => r.body.includes('Lease contracts overview'),
  });

  // Log the response for debugging
  console.log(`Step ${stepNumber} : -----> Property_management Body:`, Property_management_response.body);

  // Call the next step with incremented stepNumber
  selectNextStep(sessionCookie, stepNumber + 1);
}

function selectNextStep(sessionCookie, stepNumber) {
  // Step {stepNumber} : Select module Property Management
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
    [`Step ${stepNumber} : Select Property_management, Status is 200`]: (r) => r.status === 200,
    [`Step ${stepNumber} : Response contains "Head lease contracts"`]: (r) => r.body.includes('Head lease contracts'),
  });

  // Log the response for debugging
  console.log(`Step ${stepNumber} : -----> Property_management Body2:`, Property_management_response2.body);

  // Call the next step with incremented stepNumber
  callLeaseContractsOverview(sessionCookie, stepNumber + 1);
}

function callLeaseContractsOverview(sessionCookie, stepNumber) {
  // Step {stepNumber} : Call Lease Contracts overview
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
    [`Step ${stepNumber} : Select Lease_Contracts, Status is 200`]: (r) => r.status === 200,
    [`Step ${stepNumber} : Response contains "SubLeaseContract"`]: (r) => r.body.includes('SubLeaseContract'),
  });

  // Log the response for debugging
  console.log(`Step ${stepNumber} : -----> Lease_Contracts_response Body:`, Lease_Contracts_response.body);

  selectPropertyManagement(sessionCookie, stepNumber)
}
