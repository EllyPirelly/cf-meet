import React, { Component } from 'react';

class CitySearch extends Component {
  state = {
    query: '',
    suggestions: [],
    showSuggestions: undefined
  };

  handleInputChanged = (event) => {
    const value = event.target.value;

    const suggestions = this.props.locations.filter((location) => {
      return location.toUpperCase().indexOf(value.toUpperCase()) > -1;
    });

    this.setState({
      query: value,
      suggestions,
    });
  };

  handleItemClicked = (suggestion) => {
    this.setState({
      query: suggestion,
      showSuggestions: false
    });

    this.props.updateEvents(suggestion);
  };

  render() {
    return (
      <div className='city-search'>
        <h3>Search for cities</h3>

        <input
          type='text'
          className='city-input'
          value={this.state.query}
          onChange={this.handleInputChanged}
          onFocus={() => { this.setState({ showSuggestions: true }) }}
        />

        <ul className='city-suggestions' style={this.state.showSuggestions ? {} : { display: 'none' }}>
          {this.state.suggestions.map((suggestion) => (
            <li
              key={suggestion}
              onClick={() => this.handleItemClicked(suggestion)}
            >{suggestion}</li>
          ))}

          <button onClick={() => this.handleItemClicked('all')}>
            <b>See all cities</b>
          </button>
        </ul>
      </div>
    );
  };
};

export default CitySearch;