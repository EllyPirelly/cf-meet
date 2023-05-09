import React, { Component } from 'react';
import './App.css';
import EventList from './EventList';
import CitySearch from './CitySearch';
import NumberOfEvents from './NumberOfEvents';
import { getEvents, extractLocations, checkToken, getAccessToken } from './api';
import './nprogress.css';
import { WarningBanner } from './Banner';
import WelcomeScreen from './WelcomeScreen';

class App extends Component {
  state = {
    events: [],
    locations: [],
    // true: render WS, false: show other components, undefined: render an empty div until state is true or false
    showWelcomeScreen: undefined,
    // passed as default amount prop
    eventCount: 32,
    infoText: '',
  };

  // load events when the app loads
  async componentDidMount() {
    this.mounted = true;
    this.checkOffline();

    const accessToken = localStorage.getItem('access_token');
    const isTokenValid = (await checkToken(accessToken)).error ? false : true;
    const searchParams = new URLSearchParams(window.location.search);
    const code = searchParams.get('code');

    this.setState({
      showWelcomeScreen: !(code || isTokenValid)
    });

    if ((code || isTokenValid) && this.mounted) {
      getEvents().then((events) => {
        if (this.mounted) {
          this.setState({
            events,
            locations: extractLocations(events)
          });
        }
      });
    };
  };

  componentWillUnmount() {
    this.mounted = false;
  };

  // offline functionality
  checkOffline = () => {
    if (!navigator.onLine) {
      // set state text to info text
      this.setState({
        infoText: 'You are currently offline. The events listed on the page might not be up to date.'
      });
    };
  };

  // HAS to be defined here b/c state is defined here, too
  updateEvents = (location, eventCount) => {
    // if we don't define this here, for NumberOfEvents getEvents would run on undefined location
    // for NumberOfEvents, as location is undefined it's false so 'all' will be returned
    location = location || 'all';

    getEvents().then((events) => {
      // 'all' is coming from CitySearch
      const locationEvents = (location === 'all')
        // is 'all'? return all events
        ? events
        // is not 'all'? filter the events list
        : events.filter((event) => event.location === location);

      this.setState({
        // slice events down to the eventCount
        events: locationEvents.slice(0, eventCount),
        eventCount: eventCount
      });
    });
  };

  render() {
    if (this.state.showWelcomeScreen === undefined) return <div className='App' />

    return (
      <div className='App'>
        <WarningBanner text={this.state.infoText} />
        <h1 className='headline-primary'>Meet App</h1>
        <CitySearch
          // pass the state to CitySearch as a prop of locations
          locations={this.state.locations}
          // updateEvents is passed as a prop so we can call it inside handleItemClicked in CitySearch
          updateEvents={this.updateEvents}
        />
        <NumberOfEvents
          updateEvents={this.updateEvents}
        />
        <EventList
          // pass the state to EventList as a prop of events
          events={this.state.events}
        />
        {/* must be displayed at the bottom! */}
        <WelcomeScreen
          showWelcomeScreen={this.state.showWelcomeScreen}
          // function prop that calls getAccessToken()
          getAccessToken={() => { getAccessToken() }}
        />
      </div>
    );
  }
}

export default App;