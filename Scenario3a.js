import http from 'k6/http';
import { check } from 'k6';

export const options = {
  vus: 1, // Number of virtual users
  duration: '1s', // Test duration
};

// Variables in the init context
const Right_click_on_MM_GROUP_url = 'https://kommune.mainmanager.is/mmv2/services/MMLayoutReadOnly.asmx/PopulateTreeActionMenu';
const Right_click_on_MM_GROUP_payload = JSON.stringify({
  sDataTag: "Organisation",
  lDataID: 50421,
});
const sessionCookie = 'ASP.NET_SessionId=mi4h52dkdjdmhe4m10ohx3rx';
const Right_click_on_MM_GROUP_headers = {
  'Content-Type': 'application/json',
  'Cookie': sessionCookie,
  'X-Debug': 'true',
  'Accept-Language': 'en-US',
  'User-Agent': 'k6 Performance Test',
};

export default function () {
  // Send POST request
  const Right_click_on_MM_GROUP_response = http.post(
    Right_click_on_MM_GROUP_url,
    Right_click_on_MM_GROUP_payload,
    { headers: Right_click_on_MM_GROUP_headers }
  );

  // Debugging: Log the request details
  console.log('Request Headers:', JSON.stringify(Right_click_on_MM_GROUP_headers, null, 2));
  console.log('Request Payload:', Right_click_on_MM_GROUP_payload);

  // Debugging: Log the full response
  console.log('Full Response:', JSON.stringify(Right_click_on_MM_GROUP_response, null, 2));

  // Validate response
  check(Right_click_on_MM_GROUP_response, {
    'STEP 6 : Status code is 200': (r) => r.status === 200,

  });

  // Additional Debugging: Check if response contains expected elements
  if (Right_click_on_MM_GROUP_response.body.includes("TreeActionMenu")) {
    console.log("TreeActionMenu detected in the response.");
  } else {
    console.log("TreeActionMenu is missing or hidden in the response.");
  }

  console.log('Step 6 : Right_click_on_MM_GROUP Response Body:', Right_click_on_MM_GROUP_response.body);
}
