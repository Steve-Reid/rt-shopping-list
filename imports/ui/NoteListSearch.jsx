import React, { Component } from 'react';
import { Meteor } from 'meteor/meteor';
import PropTypes from 'prop-types';
import { createContainer } from 'meteor/react-meteor-data';
import { Session } from 'meteor/session';

export class NoteListSearch extends Component {
  state = { searchTerm: '' }

  onSearchChange = (e) => {
    this.setState({ searchTerm: e.target.value });
    this.props.Session.set('searchValue', this.state.searchTerm.trim().toLocaleLowerCase());
  }

  render() {
    return (
      <div className="item-list__search">
        <input
          type="text"
          placeholder="Search..."
          value={this.state.searchTerm}
          onChange={this.onSearchChange}
        />
      </div>
    );
  }

}

NoteListSearch.propTypes = {
  Session: PropTypes.object.isRequired,
};

export default createContainer(() => {
  return {
    Session
  };
}, NoteListSearch);
