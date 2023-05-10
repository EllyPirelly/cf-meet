import React from 'react';
import './WelcomeScreen.css';
import meetLogo from './img/svg-m-white.svg';
import googleLogo from './img/svg-google.svg';

function WelcomeScreen(props) {
  return props.showWelcomeScreen ?
    (
      <div className='welcome-screen-container'>
        <header className='header-container'>
          <img className='meet-app-icon' src={meetLogo} alt='Meet App Logo' />
          <h1 className='headline-primary'>Meet App</h1>
        </header>

        <div className='welcome-text'>Log-in to see upcoming events around the world for Full-Stack Web Developers</div>

        <button
          onClick={() => { props.getAccessToken() }}
          className='sign-in-btn'
        >
          <img className='google-icon' src={googleLogo} alt='Google Icon' />
          <span>Sign in with Google</span>
        </button>

        <a className='privacy-policy' href='https://ellypirelly.github.io/cf-meet/privacy.html' target='_blank' rel='noopener noreferrer'>Privacy policy</a>
      </div>
    )
    : null
}

export default WelcomeScreen;