import React from 'react';
import { shallow } from 'enzyme';
import NumberOfEvents from '../NumberOfEvents';

describe('<NumberOfEvents /> component', () => {
  let NumberOfEventsWrapper;

  beforeAll(() => {
    NumberOfEventsWrapper = shallow(<NumberOfEvents />);
  });

  test("renders the number of events container", () => {
    expect(NumberOfEventsWrapper.find('.number-container')).toHaveLength(1);
  });

  test("check if input default is 1", () => {
    expect(NumberOfEventsWrapper.state('numberinput')).toBe(1);
  });

  test('check event number input', () => {
    NumberOfEventsWrapper.find('.eventnumber-amount').simulate('change', {
      target: { value: 32 },
    });
    expect(NumberOfEventsWrapper.state('numberinput')).toBe(32);
  });


});