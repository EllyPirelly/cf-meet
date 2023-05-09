import { mockData } from './mock-data';
import axios from 'axios';
import NProgress from 'nprogress';

// events array, map to create a new array with only locations
// creates new array using the spread operator and spreading a Set
// Set removes all duplicates from the array
export const extractLocations = (events) => {
  var extractLocations = events.map((event) => event.location);
  var locations = [...new Set(extractLocations)];

  return locations;
};

// checks if accessToken is valid
export const checkToken = async (accessToken) => {
  const result = await fetch(
    `https://www.googleapis.com/oauth2/v1/tokeninfo?access_token=${accessToken}`
  )
    .then((res) => res.json())
    .catch((error) => error.json());

  return result;
};

// removes code bit form URL once accessed
const removeQuery = () => {
  // is there a path?
  if (window.history.pushState && window.location.pathname) {
    // yes: build URL with current path
    var newurl =
      window.location.protocol +
      '//' +
      window.location.host +
      window.location.pathname;
    window.history.pushState('', '', newurl);
  } else {
    // no: build URL without a path
    newurl = window.location.protocol + '//' + window.location.host;
    window.history.pushState('', '', newurl);
  };
};

// gets called if authorization code is present
const getToken = async (code) => {
  const encodeCode = encodeURIComponent(code);
  const { access_token } = await fetch(
    'https://oey35e3ybd.execute-api.eu-central-1.amazonaws.com/dev/api/token' +
    '/' +
    encodeCode
  )
    .then((res) => {
      return res.json();
    })
    .catch((error) => error);

  access_token && localStorage.setItem('access_token', access_token);

  return access_token;
};

export const getEvents = async () => {
  // creates and displays progress bars at the top of the page
  NProgress.start();

  // returns mock data when on localhost
  if (window.location.href.startsWith('http://localhost')) {
    NProgress.done();
    return mockData;
  };

  // checks whether user is offline
  // comes before getAccessToken as token is not needed if user is offline
  if (!navigator.onLine) {
    // stringified events list is "stored" in key lastEvents
    const data = localStorage.getItem('lastEvents');
    NProgress.done();
    return data ? JSON.parse(data).events : [];;
  };

  const token = await getAccessToken();

  if (token) {
    removeQuery();

    // GET request to Google Calendar API
    const url =
      'https://oey35e3ybd.execute-api.eu-central-1.amazonaws.com/dev/api/get-events' +
      '/' +
      token;
    const result = await axios.get(url);

    if (result.data) {
      var locations = extractLocations(result.data.events);
      // events is a list; localStorage can only store strings
      localStorage.setItem('lastEvents', JSON.stringify(result.data));
      localStorage.setItem('locations', JSON.stringify(locations));
    }

    NProgress.done();
    return result.data.events;
  };
};

export const getAccessToken = async () => {
  const accessToken = localStorage.getItem('access_token');
  const tokenCheck = accessToken && (await checkToken(accessToken));

  // checks for access token
  if (!accessToken || tokenCheck.error) {
    await localStorage.removeItem('access_token');
    const searchParams = new URLSearchParams(window.location.search);
    const code = await searchParams.get('code');

    // checks for authorization code
    if (!code) {
      // redirects to Google Authorization screen
      const results = await axios.get(
        'https://oey35e3ybd.execute-api.eu-central-1.amazonaws.com/dev/api/get-auth-url'
      );
      const { authUrl } = results.data;

      return (window.location.href = authUrl);
    }

    return code && getToken(code);
  };

  return accessToken;
};
