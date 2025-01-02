import { check, group } from "k6";
import http from "k6/http";
import { sleep } from "k6";

// The target URL
const loginUrl = "https://kommune.mainmanager.is/mmv2/MMV2Login.aspx";

// Extracted dynamic fields
let viewState = "";
let viewStateGenerator = "";
let eventTarget = "";
let eventArgument = "";

export default function () {
  // Step 1: Initial request to get the form data (dynamic fields).
  let response = http.get(loginUrl);

  // Step 2: Extract the dynamic fields (e.g., __VIEWSTATE, __VIEWSTATEGENERATOR, etc.)
  viewState = response.body.match(/id="__VIEWSTATE" value="([^"]+)"/)[1];
  viewStateGenerator = response.body.match(/id="__VIEWSTATEGENERATOR" value="([^"]+)"/)[1];
  eventTarget = response.body.match(/id="__EVENTTARGET" value="([^"]+)"/);
  eventArgument = response.body.match(/id="__EVENTARGUMENT" value="([^"]+)"/);

  // Step 3: Prepare the login payload with dynamic fields and credentials
  let loginPayload = {
    __VIEWSTATE: viewState,
    __VIEWSTATEGENERATOR: viewStateGenerator,
    __EVENTTARGET: eventTarget ? eventTarget[1] : "",
    __EVENTARGUMENT: eventArgument ? eventArgument[1] : "",
    username: "NAV", // Your username
    password: "Testing@!123", // Your password
  };

  // Step 4: Send the login POST request
  response = http.post(loginUrl, loginPayload);

  // Step 5: Check if the login was successful by checking for a successful HTTP status
  group("Login attempt", function () {
    check(response, {
      "Login status is 200": (r) => r.status === 200,
      // You can add more checks here to confirm if the login was successful, e.g., checking for specific page content.
    });
  });

  // Step 6: Log response cookies (for troubleshooting)
  console.log("Response Cookies after login:", response.cookies);

  // Step 7: Extract cookies manually if not captured automatically
  let cookies = {
    "JSESSIONID": "your_cookie_value_here",  // Replace with actual cookie name and value after inspecting the browser
    "ASP.NET_SessionId": "your_session_id_here", // Replace with actual session ID or other relevant cookies
  };

  // Step 8: Add necessary headers (optional for simulating a browser request)
  let headers = {
    "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36",
    "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8",
    "Accept-Language": "en-US,en;q=0.5",
  };

  // Step 9: Follow-up request (replace protectedUrl with your follow-up URL)
  let followUpResponse = http.get("https://your-protected-url.com", {
    headers: headers,
    cookies: cookies,
  });

  // Step 10: Check if the follow-up request was successful
  check(followUpResponse, {
    "Follow-up status is 200": (r) => r.status === 200,
  });

  // Step 11: Optional: Add a delay between iterations
  sleep(1);
}
