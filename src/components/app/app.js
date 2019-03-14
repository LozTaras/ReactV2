import React, { Component } from 'react';
import SwapiServices from '../../services/swapi-service';

import Header from '../header';
import RandomPlanet from '../random-planet';
import { PeoplePage, 
         PlanetPage, 
         StarshipPage,
         SecretPage,
         LoginPage } from '../pages';
import Error from '../error-indicator';
import { SwapiServiceProvider } from '../swapi-service-context';

import './app.css';

import { BrowserRouter as Router, 
         Route, 
         Switch, 
         Redirect } from 'react-router-dom';
import { PersonDetails } from '../sw-components';

class App extends Component {

  swapiServices = new SwapiServices();

  state = {
    isError: false,
    isLoggedIn: false
  }

  componentDidCatch() {
    this.setState({ isError: true });
  }

  log = () => {
    this.setState({ isLoggedIn: true });
  }

  render() {
    if(this.state.isError) {
      return <Error />;
    }

    return (
      <div>
        <Router>
          <SwapiServiceProvider value={ this.swapiServices }>     
            <Header />

            <RandomPlanet />

            <Switch>
              <Route path="/" 
                render={ () => <h2>Welcome to StarDB</h2> } 
                exact />
              <Route path="/people/" exact component={ PeoplePage } />
              <Route path="/people/:id" 
                render={ ({ match }) => {
                  const { id } = match.params;

                  return <PersonDetails itemId={ id } /> 
                }} />
              <Route path="/planets/:id?" component={ PlanetPage } />
              <Route path="/starships/" component={ StarshipPage } /> 
              <Route path="/login" render={ () => {
                  return <LoginPage 
                    isLoggedIn={ this.state.isLoggedIn }
                    onLogin={ this.log } />
                }} /> 
              <Route path="/secret/" render={ () => {
                return <SecretPage isLoggedIn={ this.state.isLoggedIn } />
              }} />
              <Redirect to="/"/>
            </Switch>
          
          </SwapiServiceProvider>
        </Router>
      </div>
    );
  }
};

export default App;