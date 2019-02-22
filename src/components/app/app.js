import React, { Component } from 'react';

import Header from '../header';
import RandomPlanet from '../random-planet';
import PeoplePage from '../people-page';
import Error from '../error-indicator';

import './app.css';

class App extends Component {

  state = {
    isError: false
  }

  componentDidCatch() {
    this.setState({ isError: true })
  }

  render() {
    if(this.state.isError) {
      return <Error />;
    }

    return (
      <div>
        <Header />
        <RandomPlanet />  
        <PeoplePage />
      </div>
    );
  }
};

export default App;