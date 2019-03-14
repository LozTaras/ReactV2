import React from 'react';

import ItemList from '../item-list';
import withData from '../hoc-helper/with-data';
import withSwapiService from '../hoc-helper/with-swapi-service';

const widthChildFunction = (Wrapped, fn) => {
  return (props) => {
    return (
      <Wrapped { ...props }>
        { fn }
      </Wrapped>
    );
  }
};

const personeNameFn = (item) => {
  return `${item.name} (${item.gender}, ${item.birthYear})`;
};
const planetNameFn = (item) => {
  return `${item.name} (${item.diameter})`;
};
const starshipNameFn = (item) => {
  return `${item.name} (${item.model})`;
};

const mapPersoneMethoudsToProps = (swapiService) => {
  return {
    getData: swapiService.getAllPeople
  }
}

const mapPersonePlanetsToProps = (swapiService) => {
  return {
    getData: swapiService.getAllPlanets
  }
}

const mapPersoneStarhipsToProps = (swapiService) => {
  return {
    getData: swapiService.getAllStarships
  }
}

const PersonList = withSwapiService(
  mapPersoneMethoudsToProps,
  withData(widthChildFunction(ItemList, personeNameFn))
);
const PlanetList = withSwapiService(
  mapPersonePlanetsToProps,
  withData(widthChildFunction(ItemList, planetNameFn))
);
const StarshipList = withSwapiService(
  mapPersoneStarhipsToProps,
  withData(widthChildFunction(ItemList, starshipNameFn))
);

export {
  PersonList,
	PlanetList,
	StarshipList
};