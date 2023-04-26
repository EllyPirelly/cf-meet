import React from 'react';
import { shallow } from 'enzyme';
// import { mockData } from '../mock-data';
import Event from '../Event';

describe('<Event /> component', () => {
  test('render outer event container', () => {
    const EventWrapper = shallow(<Event />);
    expect(EventWrapper.find('.event-container')).toHaveLength(1);
  });
});