import React, { Component } from 'react';
import SwapiServices from '../../services/swapi-service';
import Spinner from '../spinner';

import './item-details.css';

export default class ItemsDetails extends Component {

  swapiService = new SwapiServices();

  state = {
    item: null,
    loading: true
  }

  componentDidMount() {
    this.updateItem();
  }

  componentDidUpdate(prevProps) {    
    if(prevProps.itemId !== this.props.itemId) {            
      this.updateItem();

      this.setState({ loading: true });
    }    
  }

  updateItem() {
    const { itemId, getData } = this.props;   
    if(!itemId) return;
    
    getData(itemId)
      .then((item) => {
        this.setState({ 
          item,
          loading: false
        });
      });
  }

  render() {
    const { item, loading } = this.state;
    const { getImageUrl } = this.props;
    if(!item || loading) {
      return (
        <div className="person-details card">
          <Spinner />
        </div>
      );
    }

    return (
      <div className="person-details card">
        <img className="person-image"
          src={ getImageUrl(item.id) }
          alt="icon" />

        <div className="card-body">
          <h4>{ item.name }</h4>
          <ul className="list-group list-group-flush">
            { 
              React.Children.map(this.props.children, (child) => {
                return React.cloneElement(child, { item });
              })
            }
          </ul>
        </div>
      </div>
    )
  }
}
