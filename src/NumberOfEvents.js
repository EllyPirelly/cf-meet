import React, { Component } from 'react';

class NumberOfEvents extends Component {
  state = {
    numberOfEvents: 32,
  };

  handleInputChanged = (event) => {
    const value = event.target.value;
    this.props.updateEvents(null, value);
    this.setState({ numberOfEvents: value });

    if (value < 1) {
      this.setState({
        infoText: "Select number from 1 to 32",
      });
    } else {
      this.setState({
        infoText: "",
      });
    }
  };

  render() {
    const { numberOfEvents } = this.state;

    return (
      <div className='eventnumber-container'>
        <label>Number of Events:</label>
        <input
          type='text'
          className='eventnumber-amount'
          value={numberOfEvents}
          onChange={this.handleInputChanged} />
      </div>
    );
  };
};

export default NumberOfEvents;