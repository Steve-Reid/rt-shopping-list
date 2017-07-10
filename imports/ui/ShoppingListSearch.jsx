import React, { Component } from 'react';
import { Meteor } from 'meteor/meteor';
import PropTypes from 'prop-types';
import { createContainer } from 'meteor/react-meteor-data';
import { Session } from 'meteor/session';

const ShoppingListSearch = (props) => {

  return (
    <div className="item-list__search">
      <input
        type="text"
        placeholder="Search..."
        value={props.searchTerm}
        onChange={props.onSearchChange}
      />
    </div>
  );
};

ShoppingListSearch.propTypes = {
  onSearchChange: PropTypes.func.isRequired,
  searchTerm: PropTypes.string
};

export default ShoppingListSearch;
