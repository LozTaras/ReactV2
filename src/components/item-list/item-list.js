import React, { Component } from 'react';

import './item-list.css';

class ItemList extends Component {

  renderItems(arr) {
    return arr.map((item) => {
      const { id } = item;

      return (        
        <li className="list-group-item"
            key={ id }
            onClick={ () => this.props.onItemSelected(id) } >
          { this.props.children(item) }
        </li>
      );      
    });
  }

  render() {
    const { itemList } = this.props;
    const items = this.renderItems(itemList);

    return (
      <ul className="item-list list-group">
        { items }
      </ul>
    );
  }
}

export default ItemList;