import React, { Component } from 'react';
import { ErrorAlert } from './Alert';

class NumberOfEvents extends Component {
  state = {
    eventCount: 32,
  };

  // handles input change
  handleInputChanged = (event) => {
    const inputValue = event.target.value;
    this.setState({
      event: event,
      eventCount: inputValue,
    });

    // undefined b/c we don't have any location here
    // inputValue -> eventCount -> number
    this.props.updateEvents(undefined, inputValue);

    if (inputValue < 1 || inputValue > 100) {
      this.setState({
        infoText: 'Please select a number between 1 and 32.'
      });
    } else {
      return this.setState({
        infoText: ''
      });
    }
  };

  render() {
    return (
      <div className='number-container'>
        <h4>Number of Events</h4>

        <input
          type='number'
          className='eventnumber-amount'
          min='1'
          max='50'
          value={this.state.eventCount}
          onChange={this.handleInputChanged} />

        {/* text will be passed via infoText state, see above */}
        <ErrorAlert text={this.state.infoText} />
      </div>
    );
  };
}

export default NumberOfEvents;