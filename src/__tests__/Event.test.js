import React from 'react';
import { shallow } from 'enzyme';
import Event from '../Event';
import { mockData } from '../mock-data';

describe('<Event /> component', () => {
  let EventWrapper, event;

  beforeAll(() => {
    event = mockData[0];
    EventWrapper = shallow(<Event event={event} />);
  });

  test('render outer event container', () => {
    expect(EventWrapper.find('.event-container')).toHaveLength(1);
  });

  test('render event info container', () => {
    expect(EventWrapper.find('.event-info')).toHaveLength(1);
  });

  test('render event default information', () => {
    const eventHeadline = EventWrapper.find('.event-headline');
    const eventStart = EventWrapper.find('.event-start');
    const eventEnd = EventWrapper.find('.event-end');
    const eventLocation = EventWrapper.find('.event-location');

    expect(eventHeadline.text()).toBe(`${event.summary}`);
    expect(eventStart.text()).toBe(
      `Start: ${new Date(event.start.dateTime).toISOString()}`
    );
    expect(eventEnd.text()).toBe(
      `End: ${new Date(event.end.dateTime).toISOString()}`
    );
    expect(eventLocation.text()).toBe(`${event.location}`);
  });

  test('render event info details container', () => {
    expect(EventWrapper.find('.event-info-details')).toHaveLength(1);
  });

  test('render event details information', () => {
    // const eventGoogleLink = EventWrapper.find('.event-google-link');
    const eventDescription = EventWrapper.find('.event-description');

    expect(EventWrapper.find('.event-info-details')).toHaveLength(1);
    // expect(eventGoogleLink.prop('href')).toBe(`{event.htmlLink}`);
    expect(eventDescription.text()).toBe(`${event.description}`);
  });

  test('render toggle button', () => {
    expect(EventWrapper.find('.toggle-details')).toHaveLength(1);
  });

  test('show details when button is clicked', () => {

    EventWrapper.setState({
      showDetails: false,
    });

    EventWrapper.find('.toggle-details').simulate('click');
    expect(EventWrapper.state('showDetails')).toBe(true);
  });
});