import React from 'react';
import moment from 'moment';
import { Session } from 'meteor/session';
import PropTypes from 'prop-types';
import { createContainer } from 'meteor/react-meteor-data';

export const ShoppingListItem = (props) => {
  const className = props.list.selected ? 'item item--selected' : 'item';
  return (
    <div className={className} onClick={() => {
      props.Session.set('selectedListId', props.list._id);
    }}>
      <h5 className="item__title">{props.list.title || 'Untitled list'}</h5>
      <p className="item__subtitle">{moment(props.list.updatedAt).format('DD/M/YY')}</p>
    </div>
  );
};

ShoppingListItem.propTypes = {
  Session: PropTypes.object.isRequired,
  list: PropTypes.shape({
    _id: PropTypes.string,
    title: PropTypes.string,
    updatedAt: PropTypes.number,
    selected: PropTypes.bool
  }).isRequired
};

export default createContainer(() => {
  return { Session };
}, ShoppingListItem);
