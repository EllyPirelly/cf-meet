import React, { Component } from "react";

class Event extends Component {
  state = {
    // hide details per default
    hide: true,
  };

  // function for toggle button
  handleItemClicked = () => {
    this.setState((prevState) => ({
      hide: !prevState.hide,
    }));
  };

  render() {
    const { event } = this.props;

    return (
      <div className='event-container'>
        <div className='event-info'>
          <h2 className='event-headline'>{event.summary}</h2>

          <div className="event-info-short">
            <div className='event-start'>Start: {new Date(event.start.dateTime).toUTCString()}</div>
            <div className='event-end'>End: {new Date(event.end.dateTime).toUTCString()}</div>
            <div className='event-location'>@{event.summary} | {event.location}</div>
          </div>

          {/* details */}
          {this.state.hide === false && (
            <div className='event-info-details'>
              <h3>About the event</h3>
              <p className='event-description'>{event.description}</p>
              <a href={event.htmlLink} className='event-google-link' target='_blank' rel='noopener noreferrer'>See details on Google Calendar</a>
            </div>
          )}
        </div>

        <button
          type='button'
          className='toggle-details'
          onClick={() => this.handleItemClicked()}
        >Show Details</button>
      </div>
    );
  }
}
export default Event;