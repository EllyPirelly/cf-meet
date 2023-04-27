import React, { Component } from 'react';

class Event extends Component {
  state = {
    showDetails: false,
  };

  render() {
    // const { event } = this.props;

    const {
      summary,
      location,
      start,
      end,
      // hmtlLink,
      description
    } = this.props.event;

    const { showDetails } = this.state;

    return (
      <div className='event-container'>
        <div className='event-info'>
          <h2 className='event-headline'>{summary}</h2>
          <div>
            <span className='event-start'>Start: {new Date(start.dateTime).toISOString()}</span>
            <span className='event-end'>End: {new Date(end.dateTime).toISOString()}</span>
            <span className='event-location'>{location}</span>
          </div>

          {showDetails && (
            <button
              type='button'
              className="toggle-details-btn"
              onClick={() => this.setState({ showDetails: !showDetails })}
            >
              Hide Details
            </button>
          )}

          {!showDetails && (
            <button
              type='button'
              className="toggle-details-btn"
              onClick={() => this.setState({ showDetails: !showDetails })}
            >
              Show Details
            </button>
          )}
        </div>

        {showDetails && (
          <div className='event-info-details'>
            <h3>About the event:</h3>
            <h4>
              {/* <a href='{htmlLink}' className='event-google-link'> */}
              <a href='/' className='event-google-link'>
                See details on Google Calendar
              </a>
            </h4>
            <p className='event-description'>{description}</p>
          </div>
        )}
      </div>
    );
  };
};

export default Event;