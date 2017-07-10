import React, { Component } from 'react';
import { Meteor } from 'meteor/meteor';
import PropTypes from 'prop-types';
import { createContainer } from 'meteor/react-meteor-data';
import { Session } from 'meteor/session';

import { Lists } from './../api/lists';
import ShoppingListSearch from './ShoppingListSearch';
import ShoppingListItem from './ShoppingListItem';
import ShoppingListEmptyItem from './ShoppingListEmptyItem';
import ShoppingListFooter from './ShoppingListFooter';


export class ShoppingLists extends Component {
  state = { searchTerm: '' }

  onInputChange = (e) => {
    this.setState({ searchTerm: e.target.value });
  }

  renderShoppingListItems = () => {
    if (this.props.lists.length === 0) {
      return (
        <ShoppingListEmptyItem />
      );
    } else if (!this.state.searchTerm) {
      return this.props.lists.map(list => <ShoppingListItem key={list._id} list={list} />);
    }

    return this.props.lists.filter((list) => {
      const title = list.title.toLowerCase();
      return title.includes(this.state.searchTerm.toLowerCase());
    }).map(list => <ShoppingListItem key={list._id} list={list} />);
  };

  render() {
    return (
      <div className="item-list__container">
        <ShoppingListSearch
          searchTerm={this.state.searchTerm}
          onSearchChange={this.onInputChange}
        />
        <div className="item-list">
          {this.renderShoppingListItems()}
        </div>
        <ShoppingListFooter />
      </div>
    );
  }
}

ShoppingLists.propTypes = {
  lists: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default createContainer(() => {
  const selectedListId = Session.get('selectedListId');
  Meteor.subscribe('lists');

  return {
    lists: Lists.find({}, { sort: { updatedAt: -1 } }).fetch().map((list) => {
      return {
        ...list,
        selected: list._id === selectedListId
      };
    })
  };
}, ShoppingLists);
