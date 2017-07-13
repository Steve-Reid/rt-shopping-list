import React from 'react';
import { Meteor } from 'meteor/meteor';
import PropTypes from 'prop-types';


const AddItem = (props) => {

  return (
    <form className="form" onSubmit={props.submitItem}>
      <input
        className="form__input"
        type="text"
        name="itemBody"
        placeholder="New Item..."
        onChange={props.itemInputChange}
        value={props.itemBody}
      />
      <button className="button">Add Item</button>
    </form>
  );
};

AddItem.propTypes = {
  submitItem: PropTypes.func.isRequired,
  itemInputChange: PropTypes.func.isRequired
};

export default AddItem;
