import React from 'react';
import { Meteor } from 'meteor/meteor';
import PropTypes from 'prop-types';
import { createContainer } from 'meteor/react-meteor-data';
import { Session } from 'meteor/session';

import { Notes } from './../api/notes';
import NoteListSearch from './NoteListSearch';
import NoteListItem from './NoteListItem';
import NoteListEmptyItem from './NoteListEmptyItem';
import NoteListFooter from './NoteListFooter';


export const NoteList = (props) => {
  const renderNoteListItems = () => {
    if (props.notes.length === 0) {
      return (
        <NoteListEmptyItem />
      );
    } else if (!props.searchValue) {
      return props.notes.map(note => <NoteListItem key={note._id} note={note} />);
    }

    return props.notes.filter((note) => {
      const title = note.title.toLowerCase();
      return title.includes(props.searchValue);
    }).map(note => <NoteListItem key={note._id} note={note} />);
  };
  return (
    <div className="item-list__container">
      <NoteListSearch />
      <div className="item-list">
        {renderNoteListItems()}
      </div>
      <NoteListFooter />
    </div>
  );
};

NoteList.propTypes = {
  notes: PropTypes.arrayOf(PropTypes.object).isRequired,
  Session: PropTypes.object
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
    }),
    searchValue: Session.get('searchValue')
  };
}, NoteList);
