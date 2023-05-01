import React, { Component } from "react";

class NumberOfEvents extends Component {
  state = {
    numberinput: 32,
  };

  // handles input change
  handleInputChanged = (event) => {
    let inputValue = event.target.value;
    this.props.updateEvents(null, inputValue);
    this.setState({ numberinput: inputValue });
  };

  render() {
    return (
      <div className='number-container'>
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