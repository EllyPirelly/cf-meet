import React, { Component } from 'react';
import './App.css';
import EventList from './EventList';
import CitySearch from './CitySearch';
import NumberOfEvents from './NumberOfEvents';
import { getEvents, extractLocations } from './api';
import './nprogress.css';

class App extends Component {
  state = {
    // passed as events prop
    events: [],
    // passed as locations prop
    locations: [],
    // passed as default amount prop
    eventCount: 32,
  };

  // load events when the app loads
  componentDidMount() {
    this.mounted = true;

    getEvents().then((events) => {
      if (this.mounted) {
        this.setState({
          events,
          locations: extractLocations(events)
        });
      }
    });
  };

  componentWillUnmount() {
    this.mounted = false;
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
    return (
      <div className="App">
        <h1 className="headline-primary">Meet App</h1>
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
      </div>
    );
  }
}

export default App;
