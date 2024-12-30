import http from 'k6/http';
import { check } from 'k6';

export const options = {
    vus: 5,  // 100 virtual users 
    duration: '10s', // Duration of the test
  };

// Session cookie
const sessionCookie = 'ASP.NET_SessionId=poefqxyx00sldae23slgcw1a';

export default function () {
  // STEP 1: Login request
  const loginUrl = 'https://kommune.mainmanager.is/mmv2/MMV2Login.aspx';
  const loginPayload = {
    'lgnUserLogin$UserName': 'NAV',
    'lgnUserLogin$Password': 'Testing@!123',
    'lgnUserLogin$Login': 'Login',
  };
  const loginHeaders = { 'Content-Type': 'application/x-www-form-urlencoded' };

  const loginResponse = http.post(loginUrl, loginPayload, { headers: loginHeaders });
  check(loginResponse, { 'Step 1: Login successful': (res) => res.status === 200 });

  // STEP 2: Open Building Archive Module
  const buildingArchiveUrl = 'https://kommune.mainmanager.is/mmv2/services/MMLayoutReadOnly.asmx/GetMenuItemSteps';
  const buildingArchivePayload = JSON.stringify({ Tag: 'BuildingArchive' });
  const buildingArchiveHeaders = { 'Content-Type': 'application/json', Cookie: sessionCookie };

  const buildingArchiveResponse = http.post(buildingArchiveUrl, buildingArchivePayload, {
    headers: buildingArchiveHeaders,
  });
  check(buildingArchiveResponse, {
    'Step 2: Open Building Archive Module': (res) => res.status === 200,
  });

  // STEP 3: Click on "Site Register"
  const siteRegisterUrl = 'https://kommune.mainmanager.is/mmv2/services/MMLayoutReadOnly.asmx/GetMenuItemProcessItems';
  const siteRegisterPayload = JSON.stringify({ Parent: 'BuildingArchive', Tag: 'GroundRegistration' });
  const siteRegisterHeaders = { 'Content-Type': 'application/json', Cookie: sessionCookie };

  const siteRegisterResponse = http.post(siteRegisterUrl, siteRegisterPayload, { headers: siteRegisterHeaders });
  check(siteRegisterResponse, { 'Step 3: Click on Site Register': (res) => res.status === 200 });

  // STEP 4: Click on "Sites"
  const sitesUrl = 'https://kommune.mainmanager.is/mmv2/services/MMLayout.asmx/InitMainLayout';
  const sitesPayload = JSON.stringify({
    MenuItemID: 1783,
    MenuItemKey: 'Ground',
    MenuItemTypeID: 1,
    ProcessStepTag: 'GroundRegistration',
    ProcessTag: 'BuildingArchive',
    SnapshotID: 0,
    SummaryID: 0,
    UniqueString: '',
  });
  const sitesHeaders = { 'Content-Type': 'application/json', Cookie: sessionCookie };

  const sitesResponse = http.post(sitesUrl, sitesPayload, { headers: sitesHeaders });
  check(sitesResponse, { 'Step 4: Click on Sites': (res) => res.status === 200 });

  // STEP 5: Open a Site Form
  const openSitesUrl = 'https://kommune.mainmanager.is/mmv2/services/MMLayout.asmx/LoadMMModalControl';
  const openSitesPayload = JSON.stringify({
    tag: 'Ground',
    datapath: 'Ground$1$72108',
    id: '72108',
    PopupSQLListIndex: 0,
    UserRoleID: 0,
    contenttype: '7',
    datatext: 'Open site',
    editMode: 1,
    extraparameters: '',
    idselection: [],
    modal: '1',
    norestore: '',
    savebuttonvalue: 0,
    templateid: 0,
    uniquestring: '2dbefb38683d4341821d9ca0e2772464',
    viewkey: 'UseDefaultViewKey',
  });
  const openSitesHeaders = { 'Content-Type': 'application/json', Cookie: sessionCookie };

  const openSitesResponse = http.post(openSitesUrl, openSitesPayload, { headers: openSitesHeaders });
  check(openSitesResponse, { 'Step 5: Open a Site Form': (res) => res.status === 200 });

  // Additional Steps Continue Below...
  // Ensure headers, payloads, and URLs are correctly set for each API request.

  // STEP 11: Remove filter from Sites dropdown
  const removeSitesValueUrl = 'https://kommune.mainmanager.is/mmv2/services/MMLayout.asmx/RefreshMainManFilter';
  const removeSitesPayload = JSON.stringify({
    DataTag: 'Building',
    ControlIDChanged: 'MainManFilter_TFGroundID',
    Value: [
      'MainManFilter_TFRegionID#0',
      'MainManFilter_TFMainGroupID#0',
      'MainManFilter_TFGroundID#57810',
    ],
  });
  const removeSitesHeader = { 'Content-Type': 'application/json', Cookie: sessionCookie };

  const removeSitesResponse = http.post(removeSitesValueUrl, removeSitesPayload, { headers: removeSitesHeader });
  check(removeSitesResponse, { 'Step 11: Remove filter from Sites dropdown': (res) => res.status === 200 });
}
