export default class SwapiService {

  _apiBase = 'https://swapi.co/api';

  async getResource(url) {
    const res = await fetch(`${this._apiBase}${url}`);

    if (!res.ok) {
      throw new Error(`Could not fetch ${url}` +
        `, received ${res.status}`)
    }
    return await res.json();
  }

  getAllPeople = async () => {
    const res = await this.getResource(`/people/`);

    return res.results.map(this._transformPersone);
  }

  getPerson = async (id) => {
    const persone = await this.getResource(`/people/${id}/`);

    return this._transformPersone(persone);
  }

  getAllPlanets = async () => {
    const res = await this.getResource(`/planets/`);

    return res.results.map(this._transformPlanet);
  }

  getPlanet = async (id) => {
    const planet = await this.getResource(`/planets/${id}/`);

    return this._transformPlanet(planet);
  }

  getAllStarships = async () => {
    const res = await this.getResource(`/starships/`);

    return res.results.map(this._transformSpaceship);
  }

  getStarship = async (id) => {
    const ship = await this.getResource(`/starships/${id}/`);

    return this._transformSpaceship(ship);
  }

  getPersonImage = (id) => {
    return `https://starwars-visualguide.com/assets/img/characters/${id}.jpg`;
  }

  getPlanetImage = (id) => {
    return `https://starwars-visualguide.com/assets/img/planets/${id}.jpg`;
  }

  getStarshipImage = (id) => {
    return `https://starwars-visualguide.com/assets/img/starships/${id}.jpg`;
  }

  _extractId(item) {
    return item.url.match(/\/(\d+)\/$/i)[1];
  }

  _transformPlanet = (planet) => {
    return {
      id: this._extractId(planet),
      name: planet.name,
      population: planet.population,
      rotationPeriod: planet.rotation_period,
      diameter: planet.diameter,
    }
  }

  _transformSpaceship = (starship) => {
    return {
      id: this._extractId(starship),
      name: starship.name,
      model: starship.model,
      manufacturer: starship.manufacturer,
      costInCredit: starship.cost_in_credit,
      length: starship.length,
      crew: starship.crew,
      passengers: starship.passengers,
      cargoCapacity: starship.cargo_capacity
    }
  }

  _transformPersone = (persone) => {
    return {
      id: this._extractId(persone),
      name: persone.name,
      gender: persone.gender,
      birthYear: persone.birth_year,
      eyeColor: persone.eye_color
    }
  }
}
