import React from "react";
import { shallow } from "enzyme";
import Event from "../Event";
import { mockData } from "../mock-data";

describe("<Event /> component", () => {
  let EventWrapper, event;

  beforeAll(() => {
    event = mockData[0];
    EventWrapper = shallow(<Event event={event} />);
  });

  test('check if event container exists', () => {
    expect(EventWrapper.find('.event-container')).toHaveLength(1);
  });

  test('render default event information', () => {
    const eventHeadline = EventWrapper.find('.event-headline');
    const eventStart = EventWrapper.find('.event-start');
    const eventEnd = EventWrapper.find('.event-end');
    const eventLocation = EventWrapper.find('.event-location');

    expect(eventHeadline.text()).toBe(`${event.summary}`);
    expect(eventStart.text()).toBe(
      `Start: ${new Date(event.start.dateTime).toUTCString()}`
    );
    expect(eventEnd.text()).toBe(
      `End: ${new Date(event.end.dateTime).toUTCString()}`
    );
    expect(eventLocation.text()).toBe(`Location: ${event.location}`);
  });

  // watch out - details are hidden by default!
  // don't check for elements that initially are not present on site but depend on a click to be rendered!
  test('render event details', async () => {
    // check for the toggle button
    const toggleDetails = EventWrapper.find('.toggle-details');
    // if toggleDetails are there, simulate click
    await toggleDetails.simulate('click');

    // now check for sub event details
    const eventGoogleLink = EventWrapper.find('.event-google-link');
    const eventDescription = EventWrapper.find('.event-description');

    expect(EventWrapper.find('.event-info-details')).toHaveLength(1);
    expect(eventGoogleLink.prop('href')).toBe(`${event.htmlLink}`);
    expect(eventDescription.text()).toBe(`${event.description}`);
  });

  test("check if toggle button exists", () => {
    expect(EventWrapper.find('.toggle-details')).toHaveLength(1);
  });

  test('show/hide details when clicked', () => {
    const toggleButton = EventWrapper.find('.toggle-details');

    expect(toggleButton).toHaveLength(1);
    toggleButton.simulate('click');
    expect(EventWrapper.state('hide')).toBe(false);
  });
});

// toggle this to trigger tests t