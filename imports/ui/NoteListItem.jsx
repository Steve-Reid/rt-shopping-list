import React from 'react';
import moment from 'moment';
import { Session } from 'meteor/session';
import PropTypes from 'prop-types';
import { createContainer } from 'meteor/react-meteor-data';

export const NoteListItem = (props) => {
  const className = props.note.selected ? 'item item--selected' : 'item';
  return (
    <div className={className} onClick={() => {
      props.Session.set('selectedNoteId', props.note._id);
    }}>
      <h5 className="item__title">{props.note.title || 'Untitled note'}</h5>
      <p className="item__subtitle">{moment(props.note.updatedAt).format('DD/M/YY')}</p>
    </div>
  );
};

NoteListItem.propTypes = {
  Session: PropTypes.object.isRequired,
  note: PropTypes.shape({
    _id: PropTypes.string,
    title: PropTypes.string,
    updatedAt: PropTypes.number,
    selected: PropTypes.bool
  }).isRequired
};

export default createContainer(() => {
  return { Session };
}, NoteListItem);
