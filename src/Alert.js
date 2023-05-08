import React, { Component } from 'react';

class Alert extends Component {
  constructor(props) {
    super(props);
    // can be null as this will be overwritten in children
    this.color = null;
  };

  getStyle = () => {
    return {
      color: this.color,
    };
  };

  render() {
    return (
      <div className="alert">
        {/* text will be received from props, see for example CitySearch*/}
        <p style={this.getStyle()}>{this.props.text}</p>
      </div>
    )
  };
};

// subclass
class InfoAlert extends Alert {
  constructor(props) {
    super(props);
    this.color = 'blue';
  };
};

// export default InfoAlert;
export { InfoAlert };