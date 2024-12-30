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

  
sleep(2);  // Pause test
  const loginResponse = http.post(loginUrl, loginPayload, { headers: loginHeaders , timeout: "120s"});
sleep(2);  // Pause test

  check(loginResponse, {
    'Step 1 : Login successful': (res) => res.status === 200,
    
  });

sleep(2);  // Pause for 1 second


  // STEP 2 : Send POST request to "Building Archive Module"
  const buildingArchiveUrl =
    'https://kommune.mainmanager.is/mmv2/services/MMLayoutReadOnly.asmx/GetMenuItemSteps';

  const buildingArchivePayload = JSON.stringify({
    Tag: 'BuildingArchive',
  });

  const buildingArchiveHeaders = {
    'Content-Type': 'application/json',
    Cookie: sessionCookie,

  };
sleep(2);  // Pause test
  const buildingArchiveResponse = http.post(buildingArchiveUrl, buildingArchivePayload, {
    headers: buildingArchiveHeaders, timeout: "120s"
  });
sleep(2);  // Pause test

  check(buildingArchiveResponse, {
    'STEP 2 : Open Building Archive Module process step': (res) => res.status === 200,
  });

  ////console.log('STEP 2 : Building Archive response:', buildingArchiveResponse.body);

sleep(2);  // Pause for 1 second


    // STEP 3 : Click on "Site Register" 
    const SiteRegisterurl = 'https://kommune.mainmanager.is/mmv2/services/MMLayoutReadOnly.asmx/GetMenuItemProcessItems';

    const SiteRegisterPayload = JSON.stringify({
      Parent: 'BuildingArchive',
      Tag: 'GroundRegistration',
    });
    
    const SiteRegisterHeaders = {
      'Content-Type': 'application/json',
      Cookie: sessionCookie,
      //timeout: 120000, // Set timeout to 120 seconds
    };
    
    // Send the request
  sleep(2);  // Pause test
    const SiteRegisterResponse = http.post(SiteRegisterurl, SiteRegisterPayload, {
      headers: SiteRegisterHeaders, timeout: "120s"
    });
  sleep(2);  // Pause test
    
    // Check if the response status is 200
    check(loginResponse, {
      'STEP 3 : Click on Site Register process step': (res) => res.status === 200,
    });

    // Log the response status and body for debugging
    //console.log('STEP 3 : Response Body:', SiteRegisterResponse.body);

  sleep(2);  // Pause for 1 second


    //STEP 4 : Click on 'Sites"
    const SitesUrl = 'https://kommune.mainmanager.is/mmv2/services/MMLayout.asmx/InitMainLayout';

    // Define the payload for the request
    const SitesPayload = JSON.stringify({
      MenuItemID: 1783,
      MenuItemKey: 'Ground',
      MenuItemTypeID: 1,
      ProcessStepTag: 'GroundRegistration',
      ProcessTag: 'BuildingArchive',
      SnapshotID: 0,
      SummaryID: 0,
      UniqueString: '',
    });
    
    // Define the headers for the request
    const SitesHeaders = {
      'Content-Type': 'application/json',
      Cookie: sessionCookie, // Ensure the session cookie is valid
      //timeout: 120000, // Set timeout to 120 seconds
    };
    
    // Send the POST request
  sleep(2);  // Pause test
    const SitesResponse = http.post(SitesUrl, SitesPayload, {
      headers: SitesHeaders,timeout: "120s"
    });
  sleep(2);  // Pause test
    
    // Log the response status and body for debugging
    //console.log('STEP 4 : Response Status:', SitesResponse.status);
    //console.log('STEP 4 : Response Body:', SitesResponse.body);

    
    // Check if the response status is 200
     check(loginResponse, {
      'STEP 4 : Click on Sites sub step': (res) => res.status === 200,
    });

  sleep(2);  // Pause for 1 second
    

    // STEP 5 : Open a Site Form
    const OpenSitesUrl = 'https://kommune.mainmanager.is/mmv2/services/MMLayout.asmx/LoadMMModalControl';

    // Define the payload for the request
    const OpenSitesPayload = JSON.stringify({
      tag: "Ground",
      datapath: "Ground$1$72108",
      id: "72108",
      PopupSQLListIndex: 0,
      UserRoleID: 0,
      contenttype: "7",
      datatext: "Open site",
      editMode: 1,
      extraparameters: "",
      idselection: [],
      modal: "1",
      norestore: "",
      savebuttonvalue: 0,
      templateid: 0,
      uniquestring: "2dbefb38683d4341821d9ca0e2772464",
      viewkey: "UseDefaultViewKey",
    });
    
    // Define the headers for the request
    const OpenSitesHeaders = {
      'Content-Type': 'application/json',
      Cookie: sessionCookie, // Ensure the session cookie is valid
      //timeout: 120000, // Set timeout to 120 seconds
    };
    
    // Send the POST request
  sleep(2);  // Pause test
    const OpenSiteResponse = http.post(OpenSitesUrl, OpenSitesPayload, {
      headers: OpenSitesHeaders,timeout: "120s"
    });
  sleep(2);  // Pause test
    
    // Log the response status and body for debugging
    //console.log('STEP 5 : Open Site Response Status:', OpenSiteResponse.status);
    //console.log('STEP 5 : Open Site Response Body:', OpenSiteResponse.body);

     // Check if the response status is 200
     check(loginResponse, {
      'STEP 5 : Open a Site ': (res) => res.status === 200,
    });

  sleep(2);  // Pause for 1 second
    
    
   // STEP 6 : Click on Locations Overview

    // Define the URL for the API request
     const PostRequestUrl = 'https://kommune.mainmanager.is/mmv2/services/MMLayoutReadOnly.asmx/GetMenuItemProcessItems';
     
     // Define the payload for the POST request
     const PostRequestPayload = JSON.stringify({
       Parent: 'BuildingArchive',
       Tag: 'RegisterLocationStructure'
     });
     
     // Define the headers for the request
     const PostRequestHeaders = {
       'Content-Type': 'application/json',
       Cookie: sessionCookie,
       //timeout: 120000, // Set timeout to 120 seconds
     };
   sleep(2);  // Pause test
     
     // Send the POST request
     const PostRequestResponse = http.post(PostRequestUrl, PostRequestPayload, {
       headers: PostRequestHeaders,timeout: "120s"
     });
   sleep(2);  // Pause test
     
     // Log the response status and body for debugging
     //console.log('STEP 6 : Post Request Response Status:', PostRequestResponse.status);
     //console.log('STEP 6 : Post Request Response Body:', PostRequestResponse.body);
     
   
     // Check if the response status is 200
    check(loginResponse, {
      'STEP 6 : Click on Locations Overview': (res) => res.status === 200,
    });

  sleep(2);  // Pause for 1 second


    // STEP 7 : Open Buildings sub step

    
    // Define the URL for the API request
    const OpenBuildingUrl = 'https://kommune.mainmanager.is/mmv2/services/MMLayout.asmx/InitMainLayout';
    
    // Define the payload for the POST request
    const OpenBuildingPayload = JSON.stringify({
      UniqueString: '',
      MenuItemKey: 'Building',
      SummaryID: 0,
      MenuItemID: 1018,
      MenuItemTypeID: 1,
      ProcessStepTag: 'RegisterLocationStructure',
      ProcessTag: 'BuildingArchive',
      SnapshotID: 0,
    });
    
    // Define the headers for the request
    const OpenBuildingHeaders = {
      'Content-Type': 'application/json',
      Cookie: sessionCookie,
    };
  sleep(2);  // Pause test
    // Send the POST request
    const OpenBuildingResponse = http.post(OpenBuildingUrl, OpenBuildingPayload, {
      headers: OpenBuildingHeaders, timeout: "120s"
      
    });
  sleep(2);  // Pause test
    
    // Log the response status and body for debugging
    //console.log('STEP 7 : Post Request Response Status:', OpenBuildingResponse.status);
    //console.log('STEP 7 : Post Request Response Body:', OpenBuildingResponse.body);
    
    // Check if the response status is 200
     check(OpenBuildingResponse, {
      'STEP 7 : Open Buildings sub step': (res) => res.status === 200,
    });

  sleep(2);  // Pause for 1 second


    // STEP 8 : Open Building form

    
    // Define the URL for the API request
    const OpenBuildingFormUrl = 'https://kommune.mainmanager.is/mmv2/services/MMLayout.asmx/LoadMMModalControl';
    
    // Define the payload for the POST request
    const OpenBuildingFormPayload = JSON.stringify({
      tag: 'Building',
      datapath: 'Building$1$68856',
      id: '68856',
      PopupSQLListIndex: 0,
      UserRoleID: 0,
      contenttype: '7',
      datatext: 'Open building',
      editMode: 1,
      extraparameters: '',
      idselection: [],
      modal: '1',
      norestore: '',
      savebuttonvalue: 0,
      templateid: 0,
      uniquestring: 'fda46938ceb8497298559380f8a9e88b',
      viewkey: 'UseDefaultViewKey',
    });
    
    // Define the headers for the request
    const OpenBuildingFormHeaders = {
      'Content-Type': 'application/json',
      //timeout: 120000, // Set timeout to 120 seconds
    };

   sleep(2);  // Pause test
    // Send the POST request
    const OpenBuildingFormResponse = http.post(OpenBuildingFormUrl, OpenBuildingFormPayload, {
      headers: OpenBuildingFormHeaders, timeout: "120s"
    });
  sleep(2);  // Pause test
    
    // Log the response status and body for debugging
    //console.log('STEP 8 : Post Request Response Status:', OpenBuildingFormResponse.status);
    //console.log('STEP 8 :Post Request Response Body:', OpenBuildingFormResponse.body);
    
    // Check if the response status is 200
    check(OpenBuildingFormResponse, {
      'STEP 8 : Open Buildings Form ': (res) => res.status === 200,
    });

  sleep(2);  // Pause for 1 second


     // STEP 9 : Click on Buildings sub step

    
    // Define the URL for the API request
    const OpenBuildingUrlAgain = 'https://kommune.mainmanager.is/mmv2/services/MMLayout.asmx/InitMainLayout';
    
    // Define the payload for the POST request
    const OpenBuildingPayloadAgain = JSON.stringify({
      UniqueString: '',
      MenuItemKey: 'Building',
      SummaryID: 0,
      MenuItemID: 1018,
      MenuItemTypeID: 1,
      ProcessStepTag: 'RegisterLocationStructure',
      ProcessTag: 'BuildingArchive',
      SnapshotID: 0,
    });
    
    // Define the headers for the request
    const OpenBuildingHeadersAgain = {
      'Content-Type': 'application/json',
      Cookie: sessionCookie,
    };


   sleep(2);  // Pause test
    // Send the POST request
    const OpenBuildingResponseAgain = http.post(OpenBuildingUrlAgain, OpenBuildingPayloadAgain, {
      headers: OpenBuildingHeadersAgain, timeout: "120s"
    });
  sleep(2);  // Pause test
    
    // Log the response status and body for debugging
    //console.log('STEP 9 :Click on Buildings sub step Status:', OpenBuildingResponseAgain.status);
    //console.log('STEP 9 :Click on Buildings sub step Body:', OpenBuildingResponseAgain.body);
    
    // Check if the response status is 200
     check(OpenBuildingResponseAgain, {
      'STEP 9 : Click on Buildings sub step': (res) => res.status === 200,
    });

  sleep(2);  // Pause for 1 second


    // STEP 10 : Select the value "Aktivitetscenter" from Sites dropdown
    const SelectSitesurl = 'https://kommune.mainmanager.is/mmv2/restapi/List/GetMMList';

  const SelectSitesHeaders = {
    headers: {
      'Content-Type': 'application/json',
      Cookie: sessionCookie,
      //timeout: 120000, // Set timeout to 120 seconds
    },
  };

sleep(2);  // Pause test
  const SelectSitesResponse = http.post(SelectSitesurl, null, {headers: SelectSitesHeaders});
sleep(2);  // Pause test

  // Validate the response
  check(SelectSitesResponse, {
    'STEP 10 : Select the value "Aktivitetscenter" from Sites dropdown': (r) => r.status === 200,
  });

    // Print response for debugging (optional)
    // //console.log('STEP 10 :elect value "Aktivitetscenter" Response Body:', SelectSitesResponse.body);

  sleep(2);  // Pause for 1 second
``
    // STEP 11 : Remove the filter from the Sites dropdown

    const RemoveSitesValueurl = 'https://kommune.mainmanager.is/mmv2/services/MMLayout.asmx/RefreshMainManFilter';

    const RemoveSitespayload = JSON.stringify({
        DataTag: "Building",
        ControlIDChanged: "MainManFilter_TFGroundID",
        Value: [
            "MainManFilter_TFRegionID#0",
            "MainManFilter_TFMainGroupID#0",
            "MainManFilter_TFGroundID#57810",
        ],
    });

    const RemoveSitesHeader = {
    
          'Content-Type': 'application/json',
           Cookie: sessionCookie,
           //timeout: 120000, // Set timeout to 120 seconds
    };
  sleep(2);  // Pause test
    // Send POST request
    const RemoveSitesresponse = http.post(RemoveSitesValueurl, RemoveSitespayload, {headers: RemoveSitesHeader,timeout: "120s"});
  sleep(2);  // Pause test

   

    // Check the response status and content
     check(RemoveSitesresponse, {
      'STEP 11 : Remove the filter from the Sites dropdown': (r) => r.status === 200,
    });

    // Print response for debugging (optional)
    //console.log('STEP 11 : Remove the filter from the Sites dropdown" Response Body:', RemoveSitesresponse.body);

  sleep(2);  // Pause for 1 second


    // STEP 12 : Click on Buildings sub step

    
    // Define the URL for the API request
    const OpenBuildingUrlAgain_ = 'https://kommune.mainmanager.is/mmv2/services/MMLayout.asmx/InitMainLayout';
    
    // Define the payload for the POST request
    const OpenBuildingPayloadAgain_ = JSON.stringify({
      UniqueString: '',
      MenuItemKey: 'Building',
      SummaryID: 0,
      MenuItemID: 1018,
      MenuItemTypeID: 1,
      ProcessStepTag: 'RegisterLocationStructure',
      ProcessTag: 'BuildingArchive',
      SnapshotID: 0,
    });


    // Define the headers for the request
    const OpenBuildingHeadersAgain_ = {
      'Content-Type': 'application/json',
      Cookie: sessionCookie,
      //timeout: 120000, // Set timeout to 120 seconds
    };
    
  sleep(2);  // Pause test
    // Send the POST request
    const OpenBuildingResponseAgain_ = http.post(OpenBuildingUrlAgain_, OpenBuildingPayloadAgain_, {
      headers: OpenBuildingHeadersAgain_,timeout: "120s"
    });
  sleep(2);  // Pause test
    
    // Log the response status and body for debugging
    //console.log('STEP 12 : Click on Buildings sub step Status_:', OpenBuildingResponseAgain_.status);
    //console.log('STEP 12 : Click on Buildings sub step Body_:', OpenBuildingResponseAgain_.body);
    
    // Check if the response status is 200
     check(OpenBuildingResponseAgain_, {
      'STEP 12 : Click on Buildings sub step_': (res) => res.status === 200,
    });

  sleep(2);  // Pause for 1 second


    // STEP 13 : Select value "København" in "Municipality" dropdown
 
    const SelectvalueKøbenhavn_url  = 'https://kommune.mainmanager.is/mmv2/restapi/List/GetMMList';

    // The payload is not required for this API, so an empty string is used
    const SelectvalueKøbenhavnn_payload = '';

    // Define headers
    const SelectvalueKøbenhavnn_Headers = {
        'Content-Type': 'application/json',
         Cookie: sessionCookie,
         //timeout: 120000, // Set timeout to 120 seconds
        
    };

  sleep(2);  // Pause test
    // Send POST request
    const SelectvalueKøbenhavnn_response = http.post(SelectvalueKøbenhavn_url, SelectvalueKøbenhavnn_payload, {headers:SelectvalueKøbenhavnn_Headers,timeout: "120s"});
  sleep(2);  // Pause test

    // Check the response
    check(SelectvalueKøbenhavnn_response, {
        'Step 13 : Status is 200': (r) => r.status === 200,
        //'Step 13 : Response contains "draw" key': (r) => JSON.parse(r.body).hasOwnProperty('draw'),
        //'Step 13 : Response contains "recordsTotal" key': (r) => JSON.parse(r.body).hasOwnProperty('recordsTotal'),
    });

    // Log the response for debugging
    //console.log('STEP 13:  SelectvalueKøbenhavnn_response Body:', SelectvalueKøbenhavnn_response.body);

  sleep(2);  // Pause for 1 second


    //STEP 14 : Remove the  filter

        const Removefilter_url = 'https://kommune.mainmanager.is/mmv2/services/MMLayout.asmx/EmptyDataFilter';
    
        // Define the payload as JSON
        const Removefilter_payload = JSON.stringify({
            DataTag: "Building",
            Value: [
                "DataFilter_TFSearchText#",
                "DataFilter_TFDateFilterID#1002",
                "DataFilter_TFTimeLimitINPUT#All years"
            ],
        });
    
        // Define headers
        const Removefilter_headers = {
           
                'Content-Type': 'application/json',
                 Cookie: sessionCookie,
                 //timeout: 120000, // Set timeout to 120 seconds
            
        };
    
        // Send POST request
      sleep(2);  // Pause test
        const Removefilter_response = http.post(Removefilter_url, Removefilter_payload, {headers: Removefilter_headers,timeout: "120s"});
      sleep(2);  // Pause test


        // Validate response
        check(Removefilter_response, {
            'Step 14 :Status is 200': (r) => r.status === 200,
            //'Step 14 :Response contains key "d"': (r) => JSON.parse(r.body).hasOwnProperty('d'),
           
            
        });
    
        // Log the response for debugging
        //console.log('STEP 14 : Removefilter_Response Body:', Removefilter_response.body);

      sleep(2);  // Pause for 1 second



          // STEP 15: Logout Request
  const logoutUrl = 'https://kommune.mainmanager.is/mmv2/MMV2Logout.aspx';

  const logoutHeaders = {
    'Content-Type': 'text/html; charset=utf-8',
    //'Cookie': sessionCookie,
  };

sleep(2);  // Pause test
  const logoutResponse = http.get(logoutUrl, { headers: logoutHeaders , timeout: "120s"});
sleep(2);  // Pause test

  check(logoutResponse, {
    'STEP 15 : Logout Request, Status is 200': (r) => r.status === 200,
    'STEP 15 : Content-Type is HTML': (r) => r.headers['Content-Type'] === 'text/html; charset=utf-8',
    'STEP 15 : Server is Cloudflare': (r) => r.headers['Server'] === 'cloudflare',
  });
  
}
    
        
    
    






    

    
  
    
    
    
   
  

    


   




  
     

 
    

    

    

    
   
  