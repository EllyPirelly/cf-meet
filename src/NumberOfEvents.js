import React, { Component } from "react";

class NumberOfEvents extends Component {
  // set a default/initial state
  state = {
    query: 1
  };

  // handles input change
  handleInputChanged = (event) => {
    const value = event.target.value;

    this.setState({
      query: value,
    });
  };

  render() {
    return (
      <div className='eventnumber-container'>
        <input
          type='number'
          className='eventnumber-amount'
          value={this.state.query}
          onChange={this.handleInputChanged} />
      </div>
    );
  };
};

export default NumberOfEvents;