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

  test('render default event information', () => {
    expect(EventWrapper.find('.event-info')).toHaveLength(1);
    const eventHeadline = EventWrapper.find('.event-headline');
    expect(eventHeadline.text()).toBe(`${event.summary}`);
    const eventStart = EventWrapper.find('.event-start');
    expect(eventStart.text()).toBe(
      `Start: ${new Date(event.start.dateTime).toISOString()}`
    );
    const eventEnd = EventWrapper.find('.event-end');
    expect(eventEnd.text()).toBe(
      `End: ${new Date(event.end.dateTime).toISOString()}`
    );
    const eventLocation = EventWrapper.find('.event-location');
    expect(eventLocation.text()).toBe(`${event.location}`);
  });

  test('render event details', () => {
    expect(EventWrapper.find('.event-info-details')).toHaveLength(1);
    const eventGoogleLink = EventWrapper.find('.event-google-link');
    expect(eventGoogleLink.text()).toBe(`${event.htmlLink}`);
    // .querySelector('a').getAttribute('href')).toBe(`${event.htmlLink}`);
    const eventDescription = EventWrapper.find('.event-description');
    expect(eventDescription.text()).toBe(`${event.description}`);
  });

  test('render toggle button', () => {
    expect(EventWrapper.find('.toggle-details')).toHaveLength(1);
  });

  test('show/hide details when clicked', () => {
    const toggleButton = EventWrapper.find('.toggle-details');
    expect(toggleButton).toHaveLength(1);
    toggleButton.simulate('click');
    expect(EventWrapper.state('hide')).toBe(false);
  });
});