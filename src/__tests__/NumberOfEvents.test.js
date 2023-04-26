import React from 'react';
import { shallow } from 'enzyme';
import NumberOfEvents from '../NumberOfEvents';

describe('<NumberOfEvents /> component', () => {
  let NumberOfEventsWrapper;
  beforeAll(() => {
    NumberOfEventsWrapper = shallow(<NumberOfEvents />);
  })

  test('render outer number of events container', () => {
    expect(NumberOfEventsWrapper.find('.eventnumber-container')).toHaveLength(1);
  });

  test('default event number input', () => {
    expect(NumberOfEventsWrapper.state('query')).toBe(1);
  });

  test('check event number input', () => {
    NumberOfEventsWrapper.find('.eventnumber-amount').simulate('change', {
      target: { value: 32 },
    });
    expect(NumberOfEventsWrapper.state('query')).toBe(32);
  });
});