import React, { Component } from 'react';
import { createContainer } from 'meteor/react-meteor-data';
import PropTypes from 'prop-types';
import { Session } from 'meteor/session';
import { Meteor } from 'meteor/meteor';
import Modal from 'react-modal'
import { browserHistory } from 'react-router';

import { Notes } from './../api/notes';

export class Editor extends Component {
  state = {
    title: '',
    body: '',
    isOpen: false
  };

  componentDidUpdate = (prevProps, prevState) => {
    const currentNoteId = this.props.note ? this.props.note._id : undefined;
    const prevNoteId = prevProps.note ? prevProps.note._id : undefined;

    if (currentNoteId && currentNoteId !== prevNoteId) {
      this.setState({
        title: this.props.note.title,
        body: this.props.note.body
      });
    }
  }

  handleBodyChange = (e) => {
    const body = e.target.value;
    this.setState({ body });
    this.props.call('notes.update', this.props.note._id, { body });
  }

  handleDeleteNote = (e) => {
    this.props.call('notes.remove', this.props.note._id);
    this.props.browserHistory.push('/dashboard');
  }

  handleTitleChange = (e) => {
    const title = e.target.value;
    this.setState({ title });
    this.props.call('notes.update', this.props.note._id, { title });
  }

  cancelDeletNote = () => {
    this.setState({
      isOpen: false,
    });
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
            <button
              className="button button--secondary"
              onClick={() => this.setState({ isOpen: true })}
            >
              Delete Note
            </button>
            <Modal
              isOpen={this.state.isOpen}
              contentLabel="Confirn Delete Note"
              onRequestClose={this.cancelDeletNote}
              className="boxed-view_box"
              overlayClassName="boxed-view boxed-view--modal"
            >
              <h1>Confirm Delete Note</h1>
              <h3>(This cannot be undone!)</h3>
              <button
                className="button"
                onClick={this.handleDeleteNote}
              >
                DELETE
              </button>
              <button
                type="button"
                className="button button--secondary"
                onClick={this.cancelDeletNote}
              >
                CANCEL
              </button>
            </Modal>
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
  isOpen: PropTypes.bool,
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
