import React from 'react';
import { Meteor } from 'meteor/meteor';
import PropTypes from 'prop-types';
import { createContainer } from 'meteor/react-meteor-data';
import { Session } from 'meteor/session';

import { Notes } from './../api/notes';
import NoteListHeader from './NoteListHeader';
import NoteListItem from './NoteListItem';
import NoteListEmptyItem from './NoteListEmptyItem';
import NoteListFooter from './NoteListFooter';


export const NoteList = (props) => {
  const renderNoteListItems = () => {
    if (props.notes.length === 0) {
      return (
        <NoteListEmptyItem />
      );
    }
    return props.notes.map((note) => {
      return <NoteListItem key={note._id} note={note} />;
    });
  };
  return (
    <div className="item-list">
      <NoteListHeader />
      {renderNoteListItems()}
      <NoteListFooter />
    </div>
  );
};

NoteList.propTypes = {
  notes: PropTypes.arrayOf(PropTypes.object).isRequired
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
