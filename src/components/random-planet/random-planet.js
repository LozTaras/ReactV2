import React, { Component } from 'react';
import SwapiServices from '../../services/swapi-service';
import Spinner from '../spinner';
import Error from '../error-indicator';

import './random-planet.css';

export default class RandomPlanet extends Component {

  componentDidMount() {
    this.updatePlanet();
    this.timerId = setInterval(this.updatePlanet, 5000);   
  }

  componentWillUnmount() {
    clearInterval(this.timerId);
  }

  swapiService = new SwapiServices();

  state = {
    id: null,
    name: null,
    population: null,
    rotationPeriod: null,
    diameter: null,
    loading: true,
    error: false 
  };

  onPlanetLoaded = (planet) => {
    this.setState({ 
      ...planet,
      loading: false
    });
  }

  onError = (err) => {
    this.setState({
      error: true
    })
  }

  updatePlanet = () => {
    const id = Math.floor(Math.random() * 16 + 2);
    this.swapiService
      .getPlanet(id)
      .then(this.onPlanetLoaded)
      .catch(this.onError);
  }

  render() {
    const { id,
            population, 
            rotationPeriod, 
            diameter,
            name,
            loading,
            error } = this.state;
    const src = `https://starwars-visualguide.com/assets/img/planets/${id}.jpg`;

    if(loading || error) {
      return (
        <div className="random-planet jumbotron rounded">
          { error ? <Error /> : <Spinner /> }
        </div>
      );
    }

    return (
      <div className="random-planet jumbotron rounded">        
        <img className="planet-image"
             src={ src }
             alt="planet" />
        <div>
          <h4>{ name }</h4>
          <ul className="list-group list-group-flush">
            <li className="list-group-item">
              <span className="term">Population</span>
              <span>{ population }</span>
            </li>
            <li className="list-group-item">
              <span className="term">Rotation Period</span>
              <span>{ rotationPeriod }</span>
            </li>
            <li className="list-group-item">
              <span className="term">Diameter</span>
              <span>{ diameter }</span>
            </li>
          </ul>
        </div>
      </div>

    );
  };
}
