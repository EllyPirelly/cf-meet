// loadFeature loads a Gherkin file
// defineFeature defines the code for that file
import { loadFeature, defineFeature } from 'jest-cucumber';
import React from 'react';
import { mockData } from '../mock-data';
import Event from '../Event';
import { shallow } from 'enzyme';

const feature = loadFeature('./src/features/showHideAnEventsDetails.feature');

defineFeature(feature, test => {
  let EventWrapper, event;
  event = mockData[0];
  EventWrapper = shallow(<Event event={event} />);

  test('An event element is collapsed by default.', ({ given, and, when, then }) => {
    given('the main page has been opened', () => {
      // doesn't require any code, nothing's required to happen, can stay empty
    });

    and('a list of events has been rendered', () => {
      expect(EventWrapper.find('.event-container')).toHaveLength(1);
      expect(EventWrapper.find('.event-info-details')).toHaveLength(0);
    });

    when('the user has not clicked the toggle button', () => {
      // doesn't require any code, nothing's required to happen, can stay empty
    });

    then('the event element should be collapsed.', () => {
      expect(EventWrapper.find('.event-info-details')).toHaveLength(0);
    });
  });

  test('A user can expand an event element to see its details.', ({ given, and, when, then }) => {
    given('the main page has been opened', () => {
      // doesn't require any code, nothing's required to happen, can stay empty
    });

    and('a list of events has been rendered', () => {
      expect(EventWrapper.find('.event-container')).toHaveLength(1);
    });

    when('the user clicks the toggle button', () => {
      expect(EventWrapper.find('.toggle-details')).toHaveLength(1);
      expect(EventWrapper.state('hide')).toBe(true);
    });

    then('the event element should expand and show the event element details.', () => {
      const toggelButton = EventWrapper.find('.toggle-details');
      toggelButton.simulate('click');
      expect(EventWrapper.state('hide')).toBe(false);
    });
  });

  test('A user can collapse an event to hide its details.', ({ given, when, then }) => {
    given('an event element is expanded and has been showing event element details', () => {
      expect(EventWrapper.find('.event-info-details')).toHaveLength(1);
      expect(EventWrapper.state('hide')).toBe(false);
    });

    when('the user clicks the toggle button', () => {
      expect(EventWrapper.find('.toggle-details')).toHaveLength(1);
      expect(EventWrapper.state('hide')).toBe(false);
    });

    then('the expanded event element should collapse.', () => {
      const toggelButton = EventWrapper.find('.toggle-details');
      toggelButton.simulate('click');
      expect(EventWrapper.state('hide')).toBe(true);
    });
  });
});