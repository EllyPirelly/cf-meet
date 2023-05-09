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

    // > 100 does not really make sense here, as events will be displayed anyhow (it's the logic), but was part of the task - delete later
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
        <div>Number of Events</div>

        <label htmlFor='number' className='visually-hidden'>Number of Events</label>
        <input
          type='number'
          id='number'
          className='eventnumber-amount'
          min='1'
          max='50'
          value={this.state.eventCount}
          onChange={this.handleInputChanged}
        />

        {/* text will be passed via infoText state, see above */}
        <ErrorAlert text={this.state.infoText} />
      </div>
    );
  };
}

export default NumberOfEvents;