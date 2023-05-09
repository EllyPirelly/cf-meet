import React, { Component } from 'react';

class Alert extends Component {
  constructor(props) {
    super(props);
    // color can be null as this will be overwritten in children
    this.color = null;
    this.fontSize = 14;
    this.fontWeight = 700;
  };

  getStyle = () => {
    return {
      color: this.color,
      fontSize: this.fontSize,
      fontWeight: this.fontWeight,
    };
  };

  render() {
    return (
      <div className='alert'>
        {/* text will be received from props, see for example CitySearch, NumberOfEvents */}
        <p style={this.getStyle()}>{this.props.text}</p>
      </div>
    )
  };
};

// subclass
class InfoAlert extends Alert {
  constructor(props) {
    super(props);
    this.color = '#32acfd';
  };
};

class ErrorAlert extends Alert {
  constructor(props) {
    super(props);
    this.color = '#ff0000';
  };
};

// TODO: figure out when to implement a warning - maybe before offline mode?
class WarningAlert extends Alert {
  constructor(props) {
    super(props);
    this.color = '#efb65b';
  };
};

export { InfoAlert, ErrorAlert, WarningAlert };