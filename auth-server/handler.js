const { google } = require("googleapis");
const OAuth2 = google.auth.OAuth2;
const calendar = google.calendar("v3");

// set access levels
// any scopes passed must be enabled in the "OAuth consent screen" settings in your project on your Google Console
// is set to read only intentionally to NO access rights to update the calendar
// more info: https://developers.google.com/identity/protocols/oauth2/scopes
const SCOPES = ["https://www.googleapis.com/auth/calendar.readonly"];

// values that google needs to generate an authentication URL to access google calendar api
const credentials = {
  client_id: process.env.CLIENT_ID,
  project_id: process.env.PROJECT_ID,
  client_secret: process.env.CLIENT_SECRET,
  calendar_id: process.env.CALENDAR_ID,
  auth_uri: "https://accounts.google.com/o/oauth2/auth",
  token_uri: "https://oauth2.googleapis.com/token",
  auth_provider_x509_cert_url: "https://www.googleapis.com/oauth2/v1/certs",
  redirect_uris: ["https://ellypirelly.github.io/cf-meet/"],
  javascript_origins: ["https://ellypirelly.github.io", "http://localhost:3000"],
};

const { client_secret, client_id, redirect_uris, calendar_id } = credentials;

// create a new instance of oAuth2Client for each request (!)
const oAuth2Client = new google.auth.OAuth2(
  client_id,
  client_secret,
  redirect_uris[0]
);

// generate an authorization URL
module.exports.getAuthURL = async () => {

  // use the instance stored in oAuth2Client
  // call `generateAuthUrl` on it and pass `access_type` and `scope`
  const authUrl = oAuth2Client.generateAuthUrl({
    access_type: "offline",
    scope: SCOPES,
  });

  return {
    statusCode: 200,
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Credentials": true,
    },
    body: JSON.stringify({
      authUrl: authUrl,
    }),
  };
};

// generate an access token
module.exports.getAccessToken = async (event) => {

  // create a new instance of oAuth2Client for each request (!)
  const oAuth2Client = new google.auth.OAuth2(
    client_id,
    client_secret,
    redirect_uris[0]
  );

  // use code form getAuthURL
  const code = decodeURIComponent(`${event.pathParameters.code}`);

  // for each new oAuth2Client you need to return a promise
  return new Promise((resolve, reject) => {
    oAuth2Client.getToken(code, (err, token) => {
      // exit early on error
      if (err) {
        return reject(err);
      }
      return resolve(token);
    });
  })
    // if successful token will be returned
    .then((token) => {
      return {
        statusCode: 200,
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Credentials': true,
        },
        body: JSON.stringify(token),
      };
    })
    // if not successful error will be returned
    .catch((err) => {
      console.error(err);
      return {
        statusCode: 500,
        body: JSON.stringify(err),
      };
    });
};