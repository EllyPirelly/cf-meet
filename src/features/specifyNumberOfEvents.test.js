// loadFeature loads a Gherkin file
// defineFeature defines the code for that file
import { loadFeature, defineFeature } from 'jest-cucumber';
import React from 'react';
import NumberOfEvents from '../NumberOfEvents';
import { shallow } from 'enzyme';

const feature = loadFeature('./src/features/specifyNumberOfEvents.feature');

defineFeature(feature, test => {
  let NumberOfEventsWrapper;
  NumberOfEventsWrapper = shallow(<NumberOfEvents updateEvents={() => { }} />);

  test('When a user has not specified a number of events, 32 is the default number of events.', ({ given, when, then }) => {
    given('the main page has been opened', () => {
      // doesn't require any code, nothing's required to happen, can stay empty
    });

    when('the user does not specify the number of events', () => {
      // doesn't require any code, nothing's required to happen, can stay empty
    });

    // this does not work
    // then('the number of events being shown per default should be 32', () => {});

    then(/^the number of events being shown per default should be (\d+).$/, (arg0) => {
      expect(NumberOfEventsWrapper.find('.number-container')).toHaveLength(1);
      expect(NumberOfEventsWrapper.find('.eventnumber-amount').prop('value')).toBe(32);
    });
  });

  test('A user can change the number of events they want to see.', ({ given, when, then }) => {
    given('the main page has been opened', () => {
      // doesn't require any code, nothing's required to happen, can stay empty
    });

    when('the user inputs a specific number into the number input field', () => {
      const number = NumberOfEventsWrapper.state('eventCount');
      expect(NumberOfEventsWrapper.find('.eventnumber-amount').prop('value')).toBe(number);
    });

    then('the user should only see the number of events they specified.', () => {
      NumberOfEventsWrapper.setState({
        eventCount: 32
      });
      const number = { target: { value: 3 } };
      NumberOfEventsWrapper.find('.eventnumber-amount').simulate('change', number);
      expect(NumberOfEventsWrapper.state('eventCount')).toBe(3);
    });
  });
});