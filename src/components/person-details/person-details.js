import React, { Component } from 'react';
import SwapiServices from '../../services/swapi-service';
import Spinner from '../spinner';

import './person-details.css';

export default class PersonDetails extends Component {

  swapiService = new SwapiServices();

  state = {
    persone: null,
    loading: true
  }

  componentDidMount() {
    this.updatePersone();
  }

  componentDidUpdate(prevProps) {    
    if(prevProps.personId !== this.props.personId) {            
      this.updatePersone();

      this.setState({ loading: true });
    }    
  }

  updatePersone() {
    const { personId } = this.props;    
    if(!personId) return;

    this.swapiService
      .getPerson(personId)
      .then((persone) => {
        this.setState({ 
          persone,
          loading: false
        });
      });
  }

  render() {
    const { persone, loading } = this.state;
    if(!persone || loading) {
      return (
        <div className="person-details card">
          <Spinner />
        </div>
      );
    }

    return (
      <div className="person-details card">
        <img className="person-image"
          src={ `https://starwars-visualguide.com/assets/img/characters/${persone.id}.jpg` }
          alt="person-icon" />

        <div className="card-body">
          <h4>{ persone.name }</h4>
          <ul className="list-group list-group-flush">
            <li className="list-group-item">
              <span className="term">Gender</span>
              <span>{ persone.gender }</span>
            </li>
            <li className="list-group-item">
              <span className="term">Birth Year</span>
              <span>{ persone.birthYear }</span>
            </li>
            <li className="list-group-item">
              <span className="term">Eye Color</span>
              <span>{ persone.eyeColor }</span>
            </li>
          </ul>
        </div>
      </div>
    )
  }
}
