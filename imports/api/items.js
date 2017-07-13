import { Mongo } from 'meteor/mongo';
import { Meteor } from 'meteor/meteor';
import SimpleSchema from 'simpl-schema';
import moment from 'moment';

export const Items = new Mongo.Collection('items');

if (Meteor.isServer) {
  Meteor.publish('items', function() {
    return Items.find({ userId: this.userId });
  });
}

Meteor.methods({
  'items.insert'({ itemBody, listId }) {
    console.log('itemBody: ', itemBody);
    console.log('listId: ', listId);
    if (!this.userId) {
      throw new Meteor.Error('not-authorised');
    }

    new SimpleSchema({
      itemBody: {
        type: String,
        min: 2
      },
      listId: {
        type: String
      }
    }).validate({
      itemBody,
      listId
    });

    return Items.insert({
      itemBody,
      listId,
      itemMarked: false,
      userId: this.userId,
      updatedAt: moment().valueOf()
    });
  },
  'items.remove'({ _id }) {
    if (!this.userId) {
      throw new Meteor.Error('not-authorised');
    }

    new SimpleSchema({
      _id: {
        type: String,
        min: 2
      }
    }).validate({ _id });

    Items.remove({ _id, userId: this.userId });
  },
  'items.update'(_id, updates) {
    if (!this.userId) {
      throw new Meteor.Error('not-authorised');
    }

    new SimpleSchema({
      _id: {
        type: String,
        min: 2
      },
      itemBody: {
        type: String,
        optional: true
      },
      itemMarked: {
        type: Boolean,
        optional: false
      }
    }).validate({
      _id,
      ...updates
    });

    Items.update({
      _id,
      userId: this.userId
    }, {
      $set: {
        updatedAt: moment().valueOf(),
        ...updates
      }
    });
  }
});
