import React, { Component } from 'react';

class Banner extends Component {
  constructor(props) {
    super(props);
    // color can be null as this will be overwritten in children
    this.color = null;
    this.fontSize = 14;
    this.fontWeight = 700;
  };

  getContextStyle = () => {
    return {
      color: this.color,
      fontSize: this.fontSize,
      fontWeight: this.fontWeight,
    };
  };

  render() {
    return (
      <div>
        <div className='banner-container'>
          <p className='banner-text' style={this.getContextStyle()}>{this.props.text}</p>
        </div>
      </div>
    )
  };
};

// subclass
class WarningBanner extends Banner {
  constructor(props) {
    super(props);
    this.color = '#282828';
  };
};

export { WarningBanner };