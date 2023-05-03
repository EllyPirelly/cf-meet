// loadFeature loads a Gherkin file
// defineFeature defines the code for that file
import { loadFeature, defineFeature } from 'jest-cucumber';
import React from 'react';
import { mockData } from '../mock-data';
import App from '../App';
import CitySearch from '../CitySearch';
import { extractLocations } from '../api';
import { mount, shallow } from 'enzyme';

const feature = loadFeature('./src/features/filterEventsByCity.feature');

defineFeature(feature, test => {
  test('When user hasn’t searched for a city, show upcoming events from all cities.', ({ given, when, then }) => {
    given('user hasn’t searched for any city', () => {
      // doesn't require any code, nothing's required to happen, can stay empty
    });

    let AppWrapper;

    when('the user opens the app', () => {
      // full rendering API mount
      AppWrapper = mount(<App />);
    });

    then('the user should see the list of upcoming events.', () => {
      // without updating, none of the changes will be displayed on the App component
      // getting the list of events is an asynchronous action
      AppWrapper.update();
      // list of events rendered in App is compared with list of event in mock data
      expect(AppWrapper.find('.event-container')).toHaveLength(mockData.length);
    });
  });

  test('User should see a list of suggestions when they search for a city', ({ given, when, then }) => {
    let CitySearchWrapper;
    const locations = extractLocations(mockData);

    given('the main page is open', () => {
      // shallow instead of mount as we don't need to render any of CitySearch's children
      CitySearchWrapper = shallow(<CitySearch updateEvents={() => { }} locations={locations} />);
    });

    when('the user starts typing in the city textbox', () => {
      // 'Berlin' because we have it in the mock data
      CitySearchWrapper.find('.city').simulate('change', { target: { value: 'Berlin' } });
    });

    then('the user should receive a list of cities (suggestions) that match what they’ve typed', () => {
      // question: why is that always 2 eventhough I have 5 mock data objects
      // so either the phrasing of the test is wrong / misleading, or my previously tested code?
      expect(CitySearchWrapper.find('.suggestions li')).toHaveLength(2);
    });
  });

  test('User can select a city from the suggested list', ({ given, and, when, then }) => {
    let AppWrapper;

    // async to allow App to properly load events and locations
    given('user was typing “Berlin” in the city textbox', async () => {
      // full rendering API mount because of interaction with the child: CitySearch
      AppWrapper = await mount(<App />);
      // simulate change of value to 'Berlin'
      AppWrapper.find('.city').simulate('change', { target: { value: 'Berlin' } });
    });

    and('the list of suggested cities is showing', () => {
      // to ensure the App is updated after receiving list of suggestions
      AppWrapper.update();
      expect(AppWrapper.find('.suggestions li')).toHaveLength(2);
    });

    when('the user selects a city (e.g., “Berlin, Germany”) from the list', () => {
      // click event on the first li
      AppWrapper.find('.suggestions li').at(0).simulate('click');
    });

    then('their city should be changed to that city (i.e., “Berlin, Germany”)', () => {
      const CitySearchWrapper = AppWrapper.find(CitySearch);
      // checks whether query state of CitySearch is Berlin, see CitySearch.test.js
      expect(CitySearchWrapper.state('query')).toBe('Berlin, Germany');
    });

    and('the user should receive a list of upcoming events in that city', () => {
      expect(AppWrapper.find('.event-container')).toHaveLength(mockData.length);
    });
  });
});