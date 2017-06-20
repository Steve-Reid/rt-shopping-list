import React from 'react';
import { createContainer } from 'meteor/react-meteor-data';
import PropTypes from 'prop-types';
import { Session } from 'meteor/session';
import { Meteor } from 'meteor/meteor';
import { browserHistory } from 'react-router';

import { Notes } from './../api/notes';

export class Editor extends React.Component {
  constructor(props) {
    super(props);
    this.handleBodyChange = this.handleBodyChange.bind(this);
    this.handleTitleChange = this.handleTitleChange.bind(this);
    this.handleDeleteNote = this.handleDeleteNote.bind(this);
    this.state = {
      title: '',
      body: ''
    };
  }
  handleTitleChange(e) {
    const title = e.target.value;
    this.setState({ title });
    this.props.call('notes.update', this.props.note._id, { title });
  }
  handleBodyChange(e) {
    const body = e.target.value;
    this.setState({ body });
    this.props.call('notes.update', this.props.note._id, { body });
  }

  handleDeleteNote(e) {
    this.props.call('notes.remove', this.props.note._id);
    this.props.browserHistory.push('/dashboard');
  }
  componentDidUpdate(prevProps, prevState) {
    const currentNoteId = this.props.note ? this.props.note._id : undefined;
    const prevNoteId = prevProps.note ? prevProps.note._id : undefined;

    if (currentNoteId && currentNoteId !== prevNoteId) {
      this.setState({
        title: this.props.note.title,
        body: this.props.note.body
      });
    }
  }
  render() {
    if (this.props.note) {
      return (
        <div className="editor">
          <input
            className="editor__title"
            value={this.state.title}
            placeholder="Title"
            onChange={this.handleTitleChange}
          />
          <textarea
            className="editor__body"
            value={this.state.body}
            placeholder="Note text here"
            onChange={this.handleBodyChange}
          />
          <div>
            <button className="button button--secondary" onClick={this.handleDeleteNote}>Delete Note</button>
          </div>
        </div>
      );
    }
    return (
      <div className="editor">
        <p className="editor__message">
          {this.props.selectedNoteId ? 'Note not found' : 'Pick or Create a note to get started'}
        </p>
      </div>
    );
  }
}

Editor.propTypes = {
  selectedNoteId: PropTypes.string,
  note: PropTypes.shape({
    _id: PropTypes.string,
    title: PropTypes.string,
    body: PropTypes.string,
    userId: PropTypes.string,
    updatedAt: PropTypes.number
  }),
  call: PropTypes.func.isRequired,
  browserHistory: PropTypes.object.isRequired
};

export default createContainer(() => {
  const selectedNoteId = Session.get('selectedNoteId');

  return {
    selectedNoteId,
    note: Notes.findOne(selectedNoteId),
    call: Meteor.call,
    browserHistory
  };
}, Editor);
