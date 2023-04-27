import React from 'react';
import { shallow } from 'enzyme';
import NumberOfEvents from '../NumberOfEvents';

describe('<NumberOfEvents /> component', () => {
  let NumberOfEventsWrapper;

  beforeAll(() => {
    NumberOfEventsWrapper = shallow(<NumberOfEvents updateEvents={() => { }} />);
  })

  test('render number of events container', () => {
    expect(NumberOfEventsWrapper.find('.eventnumber-container')).toHaveLength(1);
  });

  test('check input element value', () => {
    const numberOfEvents = NumberOfEventsWrapper.state('numberOfEvents');
    expect(NumberOfEventsWrapper.find('.eventnumber-amount').prop('value')).toBe(numberOfEvents);
  });

  test('change state when input changes', () => {
    const eventObject = {
      target: { value: 32 }
    };
    NumberOfEventsWrapper.find('.eventnumber-amount').simulate(
      'change',
      eventObject
    );
    expect(NumberOfEventsWrapper.state('numberOfEvents')).toBe(32);
  });
});