import React, { Component } from 'react';
import './App.css';
import EventList from './EventList';
import CitySearch from './CitySearch';
import NumberOfEvents from './NumberOfEvents';
import { getEvents, extractLocations } from './api';
import './nprogress.css';

class App extends Component {
  state = {
    // passed as events prop "down" to components
    events: [],
    // passed as locations prop "down" to components
    locations: []
  };

  componentDidMount() {
    this.mounted = true;

    getEvents().then((events) => {
      if (this.mounted) {
        this.setState({ events, locations: extractLocations(events) });
      }
    });
  };

  componentWillUnmount() {
    this.mounted = false;
  };

  // HAS to be defined here b/c state is defined here, too
  updateEvents = (location) => {
    getEvents().then((events) => {
      const locationEvents = (location === 'all') ? events : events.filter((event) => event.location === location);

      this.setState({
        events: locationEvents
      });
    });
  };

  render() {
    return (
      <div className="App">
        <CitySearch
          locations={this.state.locations}
          // updateEvents is passed as a prop so we can call it inside handleItemClicked in CitySearch
          updateEvents={this.updateEvents}
        />
        <NumberOfEvents />
        <EventList events={this.state.events} />
      </div>
    );
  }
}

export default App;
