import React, { Component } from 'react';
import meetLogo from './img/svg-m-blue.svg';

class Header extends Component {
  render() {
    return (
      <header className='header-container'>
        <img className='meet-app-icon' src={meetLogo} alt='Meet App Logo' />
        <h1 className='headline-primary'>Meet App</h1>
      </header>
    );
  }
};

export default Header;