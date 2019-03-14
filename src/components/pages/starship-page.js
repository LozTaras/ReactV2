import React, { Component } from 'react';

import ErrorBoundry from '../error-boundry';
import Row from '../row';
import { StarshipList, StarshipDetails } from '../sw-components';

export default class StarshipPage extends Component {

  state = {
    selectedStarship: 15
  };  

  onStarshipSelected = (selectedStarship) => {
    this.setState({ selectedStarship });
  };

  render() {
    const items = (
      <StarshipList onItemSelected={ this.onStarshipSelected } />
      );
    const starshipDetails = (
      <StarshipDetails itemId={ this.state.selectedStarship } />
    );

    return (
      <ErrorBoundry>
        <Row left={ items } rigth={ starshipDetails } />
      </ErrorBoundry>
    )
  }
}
