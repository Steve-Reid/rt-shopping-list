import React from 'react';
import { Meteor } from 'meteor/meteor';
import PropTypes from 'prop-types';
import { createContainer } from 'meteor/react-meteor-data';
import { Session } from 'meteor/session';

export const ShoppingListFooter = (props) => {
  return (
    <div className="item-list__footer">
      <button className="button button--primary" onClick={() => {
        props.meteorCall('lists.insert', (err, res) => {
          if (res) {
            props.Session.set('selectedListId', res);
          }
        });
      }}>New List</button>
    </div>
  );
};

ShoppingListFooter.propTypes = {
  meteorCall: PropTypes.func.isRequired,
  Session: PropTypes.object.isRequired
};

export default createContainer(() => {
  return {
    meteorCall: Meteor.call,
    Session
  };
}, ShoppingListFooter);
