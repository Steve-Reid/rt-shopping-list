import React from 'react';
import { Meteor } from 'meteor/meteor';
import PropTypes from 'prop-types';
import { createContainer } from 'meteor/react-meteor-data';
import { Session } from 'meteor/session';

import { Items } from './../api/items';
import Item from './Item';
import AddItem from './AddItem';


export class ListItemList extends React.Component {

  handleRemoveItem = (_id) => {
    if (_id) {
      this.props.call('items.remove', { _id });
    }

  }

  renderItems() {
    if (this.props.items.length === 0) {
      return (
        <div className="item-empty">
          <p className="item__message">Add your first item to get started!</p>
        </div>
      );
    }
    return this.props.items.map((item) => {
      return <Item key={item._id} item={item} removeItem={this.handleRemoveItem} />;
    });
  }

  render() {
    return (
      <div className="list-item-list">
        <div className="list-item-list__scroll">
          {this.renderItems()}
        </div>
        <div className="item-add">
          <AddItem
            submitItem={this.props.addItem}
            itemInputChange={this.props.addItemChange}
            itemBody={this.props.itemBody}
          />
        </div>
      </div>
    );
  }
}

ListItemList.propTypes = {
  items: PropTypes.array.isRequired,
  addItemChange: PropTypes.func.isRequired,
  addItem: PropTypes.func.isRequired
};

export default createContainer(() => {
  const selectedListId = Session.get('selectedListId');
  Meteor.subscribe('items');

  return {
    call: Meteor.call,
    items: Items.find({ listId: selectedListId }, { sort: { updatedAt: -1 } }).fetch().map((item) => {
      return {
        ...item
      };
    })
  };
}, ListItemList);
