import React from 'react';
import { shallow } from 'enzyme';
import NumberOfEvents from '../NumberOfEvents';

describe('<NumberOfEvents /> component', () => {
  let NumberOfEventsWrapper;

  beforeAll(() => {
    NumberOfEventsWrapper = shallow(<NumberOfEvents updateEvents={() => { }} />);
  });

  test("renders the number of events container", () => {
    expect(NumberOfEventsWrapper.find('.number-container')).toHaveLength(1);
  });

  test("check if input default is 32", () => {
    expect(NumberOfEventsWrapper.state('numberinput')).toBe(32);
  });

  test('check if user input is rendered correctly', () => {
    const number = NumberOfEventsWrapper.state('numberinput');
    expect(NumberOfEventsWrapper.find('.eventnumber-amount').prop('value')).toBe(number);
  });

  test('check event number input', () => {
    NumberOfEventsWrapper.find('.eventnumber-amount').simulate('change', {
      target: { value: 32 },
    });
    expect(NumberOfEventsWrapper.state('numberinput')).toBe(32);
  });
});

// toggle this to trigger tests