import React, { Component } from "react";

class NumberOfEvents extends Component {
  state = {
    numberinput: 32,
  };

  // handles input change
  handleInputChanged = (event) => {
    const inputValue = event.target.value;

    this.props.updateEvents(null, inputValue);
    this.setState({ numberinput: inputValue });
  };

  render() {
    return (
      <div className='number-container'>
        <h3>Set the amount of events you are looking for</h3>
        <input
          type='number'
          className='eventnumber-amount'
          value={this.state.numberinput}
          onChange={this.handleInputChanged} />
      </div>
    );
  };
}
export default NumberOfEvents;