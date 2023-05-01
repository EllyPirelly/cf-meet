import React, { Component } from "react";

class NumberOfEvents extends Component {
  state = {
    numberinput: 1,
  };

  // handles input change
  handleInputChanged = (event) => {
    const value = event.target.value;

    this.setState({
      numberinput: value,
    });
  };

  render() {
    return (
      <div className='number-container'>
        <input
          type='number'
          className='eventnumber-amount'
          value={this.state.query}
          onChange={this.handleInputChanged} />
      </div>
    );
  };
}
export default NumberOfEvents;