import React, { Component } from 'react';
import { Meteor } from 'meteor/meteor';
import PropTypes from 'prop-types';
import { createContainer } from 'meteor/react-meteor-data';
import { Session } from 'meteor/session';

import { Notes } from './../api/notes';
import NoteListSearch from './NoteListSearch';
import NoteListItem from './NoteListItem';
import NoteListEmptyItem from './NoteListEmptyItem';
import NoteListFooter from './NoteListFooter';


export class NoteList extends Component {
  state = { searchTerm: '' }

  onInputChange = (e) => {
    this.setState({ searchTerm: e.target.value });
  }

  renderNoteListItems = () => {
    if (this.props.notes.length === 0) {
      return (
        <NoteListEmptyItem />
      );
    } else if (!this.state.searchTerm) {
      return this.props.notes.map(note => <NoteListItem key={note._id} note={note} />);
    }

    return this.props.notes.filter((note) => {
      const title = note.title.toLowerCase();
      return title.includes(this.state.searchTerm.toLowerCase());
    }).map(note => <NoteListItem key={note._id} note={note} />);
  };

  render() {
    return (
      <div className="item-list__container">
        <NoteListSearch
          searchTerm={this.state.searchTerm}
          onSearchChange={this.onInputChange}
        />
        <div className="item-list">
          {this.renderNoteListItems()}
        </div>
        <NoteListFooter />
      </div>
    );
  }
}

NoteList.propTypes = {
  notes: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default createContainer(() => {
  const selectedNoteId = Session.get('selectedNoteId');
  Meteor.subscribe('notes');

  return {
    notes: Notes.find({}, { sort: { updatedAt: -1 } }).fetch().map((note) => {
      return {
        ...note,
        selected: note._id === selectedNoteId
      };
    })
  };
}, NoteList);
