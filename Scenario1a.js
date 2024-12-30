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

  sleep(1);  // Pause test
  const loginResponse = http.post(loginUrl, loginPayload, { headers: loginHeaders });
  sleep(1);  // Pause test

  check(loginResponse, {
    'login successful': (res) => res.status === 200,
  });

  sleep(1);  // Pause for 1 second

  // STEP 2 : Send POST request to "My Page" with the session cookie
  const myPageUrl = 'https://kommune.mainmanager.is/mmv2/services/MMLayoutReadOnly.asmx/GetMenuItemSteps';
  const myPagePayload = JSON.stringify({
    Tag: "MyPage",
  });

  const myPageHeaders = {
    'Content-Type': 'application/json',
    'Cookie': sessionCookie,
  };
  sleep(1);  // Pause test
  const myPageResponse = http.post(myPageUrl, myPagePayload, { headers: myPageHeaders });
  sleep(1);  // Pause test

  check(myPageResponse, {
    'My Page module response status 200': (res) => res.status === 200,
  });

  //console.log('My Page response:', myPageResponse.body);

  sleep(1);  // Pause for 1 second

  // STEP 3 : Click On "Unfinished work orders"
  const helpdeskUrl = 'https://kommune.mainmanager.is/mmv2/services/MMLayoutReadOnly.asmx/GetMenuItemSteps';
  const helpdeskPayload = JSON.stringify({
    Tag: "Helpdesk",
  });

  const helpdeskHeaders = {
    'Content-Type': 'application/json',
    'Cookie': sessionCookie,
  };
  sleep(1);  // Pause test
  const helpdeskResponse = http.post(helpdeskUrl, helpdeskPayload, { headers: helpdeskHeaders });
  sleep(1);  // Pause test

  check(helpdeskResponse, {
    'Helpdesk module response status 200': (res) => res.status === 200,
  });

  //console.log('Helpdesk response:', helpdeskResponse.body);

  sleep(1);  // Pause for 1 second

  // STEP 4 : Send POST request to "My Page" again
  const myPageUrlAgain = 'https://kommune.mainmanager.is/mmv2/services/MMLayoutReadOnly.asmx/GetMenuItemSteps';
  const myPagePayloadAgain = JSON.stringify({
    Tag: "MyPage",
  });

  const myPageHeadersAgain = {
    'Content-Type': 'application/json',
    'Cookie': sessionCookie,
  };

  sleep(1);  // Pause test
  const myPageResponseAgain = http.post(myPageUrlAgain, myPagePayloadAgain, { headers: myPageHeadersAgain });
  sleep(1);  // Pause test

  check(myPageResponseAgain, {
    'My Page module response status 200': (res) => res.status === 200,
  });

  //console.log('My Page response again:', myPageResponseAgain.body);

  sleep(1);  // Pause for 1 second

  // STEP 5: Logout Request
  const logoutUrl = 'https://kommune.mainmanager.is/mmv2/MMV2Logout.aspx';

  const logoutHeaders = {
    'Content-Type': 'text/html; charset=utf-8',
    //'Cookie': sessionCookie,
  };
  sleep(1);  // Pause test
  const logoutResponse = http.get(logoutUrl, { headers: logoutHeaders });
  sleep(1);  // Pause test
}
