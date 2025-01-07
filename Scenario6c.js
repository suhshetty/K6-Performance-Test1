import http from 'k6/http';
import { check, sleep } from 'k6';

// Declare cookieHeader outside the default function
let cookieHeader = '';

export const options = {
  vus: 1, // Number of virtual users
  duration: '3m', // Duration of the test
};

// Function to log each step dynamically
function logStep(stepNumber, stepName, response) {
  console.log(`Step ${stepNumber} : ${stepName}`);
  
  // Validate response
  check(response, {
    [`Step ${stepNumber} : ${stepName} - Status is 200`]: (r) => r.status === 200,
    [`Step ${stepNumber} : ${stepName} - Response contains expected text`]: (r) => r.body.includes(stepName),
  });

  // Log response body for debugging
  console.log(`Step ${stepNumber} : -----> ${stepName} Body:`, response.body);
  sleep(2); // Pause test after logging
}

// Function for Step 1: Login request
function login() {
  const loginUrl = 'https://kommune.mainmanager.is/mmv2/MMV2Login.aspx';
  const loginPayload = {
    'lgnUserLogin$UserName': 'NAV',
    'lgnUserLogin$Password': 'Testing@!123',
    'lgnUserLogin$Login': 'Login',
  };

  const loginHeaders = {
    'Content-Type': 'application/x-www-form-urlencoded',
    'Cookie': cookieHeader, // Add the cookie header
  };

  const loginResponse = http.post(loginUrl, loginPayload, { headers: loginHeaders, timeout: '120s' });
  logStep(1, 'Login', loginResponse);
}

// Function for Step 2a: Select Operation and Maintenance
function selectOperationAndMaintenance() {
  const operation_and_maintenance_url = 'https://kommune.mainmanager.is/mmv2/services/MMLayoutReadOnly.asmx/GetMenuItemSteps';
  const operation_and_maintenance_payload = JSON.stringify({
    Tag: "OperationAndMaintenance"
  });
  const operation_and_maintenance_headers = {
    'Content-Type': 'application/json',
    Cookie: cookieHeader,
  };

  const operation_and_maintenance_response = http.post(operation_and_maintenance_url, operation_and_maintenance_payload, { headers: operation_and_maintenance_headers, timeout: "120s" });
  logStep(2, 'Select Operation and Maintenance', operation_and_maintenance_response);
}

// Function for Step 2b: Select Task Planning
function selectTaskPlanning() {
  const task_planning_url = 'https://kommune.mainmanager.is/mmv2/services/MMLayoutReadOnly.asmx/GetMenuItemProcessItems';
  const task_planning_payload = JSON.stringify({
    Parent: "OperationAndMaintenance",
    Tag: "TaskPlanning"
  });
  const task_planning_headers = {
    'Content-Type': 'application/json',
    Cookie: cookieHeader,
  };

  const task_planning_response = http.post(task_planning_url, task_planning_payload, { headers: task_planning_headers, timeout: "120s" });
  logStep(3, 'Select Task Planning', task_planning_response);
}

// Function for Step 3: Select Work Order Overview
function selectWorkOrderOverview() {
  const requests_url = 'https://kommune.mainmanager.is/mmv2/services/MMLayoutReadOnly.asmx/GetMenuItemProcessItems';
  const requests_payload = JSON.stringify({
    Parent: "OperationAndMaintenance",
    Tag: "Requests"
  });
  const requests_headers = {
    'Content-Type': 'application/json',
    Cookie: cookieHeader,
  };

  const requests_response = http.post(requests_url, requests_payload, { headers: requests_headers, timeout: "120s" });
  logStep(4, 'Select Work Order Overview', requests_response);
}

// Function for Step 4a: Click on Work Orders
function clickWorkOrders() {
  const init_main_layout_url = 'https://kommune.mainmanager.is/mmv2/services/MMLayout.asmx/InitMainLayout';
  const init_main_layout_payload = JSON.stringify({
    UniqueString: "",
    MenuItemKey: "Request",
    SummaryID: 0,
    MenuItemID: 1133,
    MenuItemTypeID: 1,
    ProcessStepTag: "Requests",
    ProcessTag: "OperationAndMaintenance",
    SnapshotID: 0
  });
  const init_main_layout_headers = {
    'Content-Type': 'application/json',
    Cookie: cookieHeader,
  };

  const init_main_layout_response = http.post(init_main_layout_url, init_main_layout_payload, { headers: init_main_layout_headers, timeout: "120s" });
  logStep(5, 'Click on Work Orders', init_main_layout_response);
}

// Function for Step 4b: Click on Work Orders (Another endpoint)
function clickWorkOrdersAnotherEndpoint() {
  const get_mm_list_headers_url = 'https://kommune.mainmanager.is/mmv2/restapi/List/GetMMListHeaders?DataPath=Request%241%240&UniqueString=ddc3f428aaec43cbb4d3d2f6849e9b26&Gantt=False&PopupSQLListIndex=0&_1733734358981';
  const get_mm_list_headers_headers = {
    'Content-Type': 'application/json',
    Cookie: cookieHeader,
  };

  const get_mm_list_headers_response = http.get(get_mm_list_headers_url, { headers: get_mm_list_headers_headers, timeout: "120s" });
  logStep(6, 'Click on Work Orders (Another endpoint)', get_mm_list_headers_response);
}

// Function for Step 5: Empty Data Filter
function emptyDataFilter() {
  const empty_data_filter_url = 'https://kommune.mainmanager.is/mmv2/services/MMLayout.asmx/EmptyDataFilter';
  const empty_data_filter_payload = JSON.stringify({
    DataTag: "Request",
    Value: [
      "DataFilter_TFSearchText#",
      "DataFilter_TFDateFilterID#1000",
      "DataFilter_TFTimeLimitINPUT#All years",
      "DataFilter_TFTimeLimit#;",
      "DataFilter_TFMainTypeID#0",
      "DataFilter_TFAssignmentCategoryID#0",
      "DataFilter_TFFinanceDataSetID#0",
      "DataFilter_TFAccountID#0",
      "DataFilter_TFMaintenanceCategoryID#0",
      "DataFilter_TFCategoryID#0",
      "DataFilter_TFOrganisationFromID#0",
      "DataFilter_TFOwnerID#0",
      "DataFilter_TFOrganisationToID#0",
      "DataFilter_TFEmployeeToID#0",
      "DataFilter_TFFinishBehindSchedule#false",
      "DataFilter_TFStatus#5,14",
    ],
  });
  const empty_data_filter_headers = {
    'Content-Type': 'application/json',
    Cookie: cookieHeader,
  };

  const empty_data_filter_response = http.post(empty_data_filter_url, empty_data_filter_payload, { headers: empty_data_filter_headers , timeout: "120s"});
  logStep(7, 'Empty Data Filter', empty_data_filter_response);
}

// Main function to execute steps
export default function () {
  // Fetch cookies from the GitHub repository during the test execution
  if (!cookieHeader) {
    const cookiesUrl = 'https://raw.githubusercontent.com/suhshetty/cookies/main/cookies.json';
    const response = http.get(cookiesUrl);

    // Parse cookies from the response body
    const cookies = JSON.parse(response.body);

    // Check if ASP.NET_SessionId exists in cookies
    const aspNetSessionIdCookie = cookies.find(cookie => cookie.name === 'ASP.NET_SessionId');
    if (aspNetSessionIdCookie) {
      console.log('ASP.NET_SessionId cookie value:', aspNetSessionIdCookie.value);
    } else {
      console.log('ASP.NET_SessionId cookie not found!');
    }

    // Convert cookies into a "Cookie" header string
    cookieHeader = cookies.map((cookie) => `${cookie.name}=${cookie.value}`).join('; ');

    // Print the cookie header to verify
    console.log('Loaded Cookie Header:', cookieHeader);
  }

  // Execute each step
  login();
  selectOperationAndMaintenance();
  selectTaskPlanning();
  selectWorkOrderOverview();
  clickWorkOrders();
  clickWorkOrdersAnotherEndpoint();
  emptyDataFilter();
}
