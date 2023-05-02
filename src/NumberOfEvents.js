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

    this.props.updateEvents(event);
  };

  render() {
    return (
      <div className='number-container'>
        <h3>Set the amount of events you are looking for</h3>
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