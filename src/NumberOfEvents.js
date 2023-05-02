import React, { Component } from "react";

class NumberOfEvents extends Component {
  state = {
    eventCount: 32,
  };

  // handles input change
  handleInputChanged = (event) => {
    const inputValue = event.target.value;
    this.setState({
      event: event,
      eventCount: inputValue
    });

    // undefined b/c we don't have any location here
    // inputValue -> eventCount -> number
    this.props.updateEvents(undefined, inputValue);
  };

  render() {
    return (
      <div className='number-container'>
        <h3>Number of Events:</h3>
        <input
          type='number'
          className='eventnumber-amount'
          min='1'
          max='100'
          value={this.state.eventCount}
          onChange={this.handleInputChanged} />
      </div>
    );
  };
}

export default NumberOfEvents;