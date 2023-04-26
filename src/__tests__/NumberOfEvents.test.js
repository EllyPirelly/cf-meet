import React from 'react';
import { shallow } from 'enzyme';
// import { mockData } from '../mock-data';
import NumberOfEvents from '../NumberOfEvents';

describe('<NumberOfEvents /> component', () => {
  test('render outer number of events container', () => {
    const NumberOfEventsWrapper = shallow(<NumberOfEvents />);
    expect(NumberOfEventsWrapper.find('.eventnumber-container')).toHaveLength(1);
  });
});