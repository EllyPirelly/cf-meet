import React from 'react';
import { shallow } from 'enzyme';
import NumberOfEvents from '../NumberOfEvents';

describe('<NumberOfEvents /> component', () => {
  let NumberOfEventsWrapper;

  beforeAll(() => {
    // pass an empty function
    NumberOfEventsWrapper = shallow(<NumberOfEvents updateEvents={() => { }} />);
  });

  test('renders NumberOfEvents container', () => {
    expect(NumberOfEventsWrapper.find('.number-container')).toHaveLength(1);
  });

  test('check if input default is 32', () => {
    expect(NumberOfEventsWrapper.find('.eventnumber-amount').prop('value')).toBe(32);
  });

  test('check if user input is rendered correctly', () => {
    const number = NumberOfEventsWrapper.state('eventCount');
    expect(NumberOfEventsWrapper.find('.eventnumber-amount').prop('value')).toBe(number);
  });

  test('check event number input changes', () => {
    NumberOfEventsWrapper.setState({
      eventCount: 32
    });
    const number = { target: { value: 3 } };
    NumberOfEventsWrapper.find('.eventnumber-amount').simulate('change', number);
    expect(NumberOfEventsWrapper.state('eventCount')).toBe(3);
  });
});
