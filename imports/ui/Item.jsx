import React from 'react';
import PropTypes from 'prop-types'
import moment from 'moment';

import { Items } from './../api/items';

const Item = (props) => {
  return (
      <div className="list-item">
        <div>
          <h4 className="list-item__body">{props.item.itemBody}</h4>
          <p className="list-item__stats">
            added {moment(props.item.updatedAt).format('DD/M/YY')} ({moment(props.item.updatedAt).fromNow()})
          </p>
        </div>
        <div className="list-item__actions">
          <button className="button button--round" onClick={() => props.removeItem(props.item._id)}>X</button>
        </div>
      </div>
  );
};

Item.propTypes = {
  item: PropTypes.object.isRequired
};

export default Item;
