import React from 'react';

import ErrorBoundry from '../error-boundry';
import { PersonList } from '../sw-components';
import { withRouter } from 'react-router-dom';

 const PeoplePage = ({ history }) => {
  return (
    <ErrorBoundry>
      <PersonList onItemSelected={ (id) => history.push(id) } />
    </ErrorBoundry>
  )
}

export default withRouter(PeoplePage);