import React from 'react';

import ErrorBoundry from '../error-boundry';
import Row from '../row';
import { PlanetList, PlanetDetails } from '../sw-components';
import { withRouter } from 'react-router-dom';

const PlanetPage = ({ match, history }) => {
  const { id } = match.params;
  const items = (
    <PlanetList onItemSelected={ (id) => history.push(id) } />
  );
  const planetDetails = (
    id ? <PlanetDetails itemId={ id } /> : <div>Please Select a planet!</div>
  );

  return (
    <ErrorBoundry>
      <Row left={ items } rigth={ planetDetails } />
    </ErrorBoundry>
  )
}

export default withRouter(PlanetPage);
