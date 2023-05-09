import React, { Component } from 'react';
import { InfoAlert } from './Alert';

class CitySearch extends Component {
  state = {
    query: '',
    suggestions: [],
    // boolean state, per default undefined
    showSuggestions: undefined
  }

  handleInputChanged = (event) => {
    const value = event.target.value;
    this.setState({
      suggestions: [],
      showSuggestions: false,
      infoText: ''
    });

    const suggestions = this.props.locations.filter((location) => {
      return location.toUpperCase().indexOf(value.toUpperCase()) > -1;
    });

    if (suggestions.length === 0) {
      this.setState({
        query: value,
        infoText: 'Please try another city.',
      });
    } else {
      return this.setState({
        query: value,
        suggestions,
        infoText: ''
      });
    };
  };

  handleItemClicked = (suggestion) => {
    this.setState({
      query: suggestion,
      // state needs to be false (hidden) whenever an item is clicked
      showSuggestions: false
    });

    this.props.updateEvents(suggestion);
  };

  render() {
    return (
      <div className='city-search-container'>
        <div>Choose your nearest city</div>

        <label htmlFor='citysearch' className='visually-hidden'>City Search</label>
        <input
          type='text'
          id='citysearch'
          className='city'
          placeholder='Search for a City'
          value={this.state.query}
          onChange={this.handleInputChanged}
          // booleand state showSuggestions true
          onFocus={() => { this.setState({ showSuggestions: true }) }}
        />
        {/* text will be passed via infoText state, see above */}
        <InfoAlert text={this.state.infoText} />

        <ul
          className='suggestions'
          // if showSuggestions is true, list is visible
          // if showSuggestions is false style won't have display none, and list will be displayed
          style={this.state.showSuggestions ? { display: 'block' } : { display: 'none' }}>

          {this.state.suggestions.map((suggestion) => (
            <li
              key={suggestion}
              onClick={() => this.handleItemClicked(suggestion)}
            >{suggestion}</li>
          ))}

          {/* 'all' is used as a flag */}
          <li onClick={() => this.handleItemClicked('all')}>
            <b>See all cities</b>
          </li>
        </ul>
      </div>
    );
  };
};

export default CitySearch;