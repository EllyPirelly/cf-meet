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

          <div>
            <span className='event-start'>Start: {new Date(event.start.dateTime).toISOString()}</span>
            <span className='event-end'>End: {new Date(event.end.dateTime).toISOString()}</span>
            <span className='event-location'>{event.location}</span>
          </div>
        </div>

        {!this.hide && (
          <div className='event-info-details'>
            {/* sub headline stays static */}
            <h3>About the event:</h3>
            {/* Text in link needs to be 'See details on Google Calendar' */}
            <a href='{event.htmlLink}' className='event-google-link'>{event.htmlLink}</a>
            <p className='event-description'>{event.description}</p>
          </div>
        )}

        <button
          type='button'
          className='toggle-details'
          onClick={() => this.handleItemClicked()}
        >Show / Hide details</button>
      </div>
    );
  }
}
export default Event;