import React from 'react';
import { shallow, mount } from 'enzyme';
import App from '../App';
import EventList from '../EventList';
import CitySearch from '../CitySearch';
import NumberOfEvents from '../NumberOfEvents';
import { mockData } from '../mock-data';
import { extractLocations, getEvents } from '../api';

// unit tests
describe('<App /> component', () => {
  let AppWrapper;

  beforeAll(() => {
    AppWrapper = shallow(<App />);
  });

  test('render EventList', () => {
    expect(AppWrapper.find(EventList)).toHaveLength(1);
  });

  test('render CitySearch', () => {
    expect(AppWrapper.find(CitySearch)).toHaveLength(1);
  });

  test('render NumberOfEvents', () => {
    expect(AppWrapper.find(NumberOfEvents)).toHaveLength(1);
  });
});

// integration tests
describe('<App /> integration', () => {
  // events gets passed as prop from App to EventList
  test('App passes "events" state as a prop to EventList', () => {
    const AppWrapper = mount(<App />);
    const AppEventsState = AppWrapper.state('events');
    // state of events is not undefined
    expect(AppEventsState).not.toEqual(undefined);
    // compare state of App's events with EventList's events prop
    expect(AppWrapper.find(EventList).props().events).toEqual(AppEventsState);
    AppWrapper.unmount();
  });

  // locations gets passed as prop from App to CitySearch
  test('App passes "locations" state as a prop to CitySearch', () => {
    const AppWrapper = mount(<App />);
    const AppLocationsState = AppWrapper.state('locations');
    // state of locations is not undefined
    expect(AppLocationsState).not.toEqual(undefined);
    // compare state of App's locations with CitySearch'S locations prop
    expect(AppWrapper.find(CitySearch).props().locations).toEqual(AppLocationsState);
    AppWrapper.unmount();
  });

  test('get list of events matching the city selected by the user', async () => {
    const AppWrapper = mount(<App />);
    const CitySearchWrapper = AppWrapper.find(CitySearch);
    const locations = extractLocations(mockData);
    CitySearchWrapper.setState({ suggestions: locations });
    const suggestions = CitySearchWrapper.state('suggestions');
    // selectedIndex will hold the index of the selected suggestion from the suggestions array
    const selectedIndex = Math.floor(Math.random() * (suggestions.length));
    // return the actual suggestion with suggestion[selectedIndex]
    const selectedCity = suggestions[selectedIndex];
    // mimics click via handleItemClicked method from CitySearch, passing the selected suggestion/city
    // await: async codee that involves fetching the full list of events before filtering
    await CitySearchWrapper.instance().handleItemClicked(selectedCity);
    // async function that is mainly expected to get all the events from the API/mock data asynchronously
    const allEvents = await getEvents();
    // all events are filtered against the selected city in order to find events that have the same location
    const eventsToShow = allEvents.filter(event => event.location === selectedCity);
    // compares whether the state of events takes the same array as the events resulted from filtering process
    expect(AppWrapper.state('events')).toEqual(eventsToShow);
    AppWrapper.unmount();
  });

  test('get list of all events when user selects "See all cities"', async () => {
    const AppWrapper = mount(<App />);
    const suggestionItems = AppWrapper.find(CitySearch).find('.suggestions li');
    // simulates a click on the last item which will always be see all cities
    await suggestionItems.at(suggestionItems.length - 1).simulate('click');
    const allEvents = await getEvents();
    // console.log(AppWrapper.debug());
    expect(AppWrapper.state('events')).toEqual(allEvents);
    AppWrapper.unmount();
  });

  test('get list with amount of event items matching the numberinput number', async () => {
    const AppWrapper = mount(<App />);
    const NumberOfEventsWrapper = AppWrapper.find(NumberOfEvents);
    // changed from fixed number 32 (won't work, mockData has only 5 mock items!) to mockData.length
    const selectedNumber = Math.floor(Math.random() * mockData.length);
    const event = { target: { value: selectedNumber } };
    await NumberOfEventsWrapper.instance().handleInputChanged(event);
    // console.log(AppWrapper.debug());
    expect(AppWrapper.state('eventCount')).toEqual(selectedNumber);
    expect(AppWrapper.state('events').length).toBe(selectedNumber);
    AppWrapper.unmount();
  });
});