import React, { Component } from 'react';
import { createContainer } from 'meteor/react-meteor-data';
import PropTypes from 'prop-types';
import { Session } from 'meteor/session';
import { Meteor } from 'meteor/meteor';
import Modal from 'react-modal'
import { browserHistory } from 'react-router';

import ListItemList from './ListItemList';
import { Lists } from './../api/lists';
import { Items } from './../api/items';

export class Editor extends Component {
  state = {
    title: '',
    body: '',
    isOpen: false,
    itemBody: ''
  };

  componentDidUpdate = (prevProps, prevState) => {
    const currentListId = this.props.list ? this.props.list._id : undefined;
    const prevListId = prevProps.list ? prevProps.list._id : undefined;

    if (currentListId && currentListId !== prevListId) {
      this.setState({
        title: this.props.list.title,
        body: this.props.list.body
      });
    }
  }

  handleBodyChange = (e) => {
    const body = e.target.value;
    this.setState({ body });
    this.props.call('lists.update', this.props.list._id, { body });
  }

  handleDeleteList = (e) => {
    this.props.call('lists.remove', this.props.list._id);
    this.props.browserHistory.push('/dashboard');
  }

  handleTitleChange = (e) => {
    const title = e.target.value;
    this.setState({ title });
    this.props.call('lists.update', this.props.list._id, { title });
  }

  cancelDeleteList = () => {
    this.setState({
      isOpen: false,
    });
  }

  handleItemBodyChange = (e) => {
    this.setState({ itemBody: e.target.value });
  }

  handleAddItem = (e) => {
    e.preventDefault();

    const itemBody = this.state.itemBody;
    const listId = this.props.selectedListId;

    if (itemBody) {
      this.props.call('items.insert', { itemBody, listId });
      this.setState({ itemBody: ''});
    }
  }

  render() {
    if (this.props.list) {
      return (
        <div className="editor">
          <input
            className="editor__title"
            value={this.state.title}
            placeholder="List Title"
            onChange={this.handleTitleChange}
          />
          <ListItemList
            className="editor__body"
            addItem={this.handleAddItem}
            addItemChange={this.handleItemBodyChange}
            itemBody={this.state.itemBody}
          />
          <div>
            <button
              className="button button--secondary"
              onClick={() => this.setState({ isOpen: true })}
            >
              Delete List
            </button>
            <Modal
              isOpen={this.state.isOpen}
              contentLabel="Confirn Delete List"
              onRequestClose={this.cancelDeleteList}
              className="boxed-view_box"
              overlayClassName="boxed-view boxed-view--modal"
            >
              <h1>Confirm Delete List</h1>
              <h3>(This cannot be undone!)</h3>
              <button
                className="button"
                onClick={this.handleDeleteList}
              >
                DELETE
              </button>
              <button
                type="button"
                className="button button--secondary"
                onClick={this.cancelDeleteList}
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
          {this.props.selectedListId ? 'Note not found' : 'Pick or Create a list to get started'}
        </p>
      </div>
    );
  }
}

Editor.propTypes = {
  isOpen: PropTypes.bool,
  selectedListId: PropTypes.string,
  list: PropTypes.shape({
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
  const selectedListId = Session.get('selectedListId');

  return {
    selectedListId,
    list: Lists.findOne(selectedListId),
    call: Meteor.call,
    browserHistory
  };
}, Editor);
