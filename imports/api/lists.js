import { Mongo } from 'meteor/mongo';
import { Meteor } from 'meteor/meteor';
import SimpleSchema from 'simpl-schema';
import moment from 'moment';

export const Lists = new Mongo.Collection('lists');

if (Meteor.isServer) {
  Meteor.publish('lists', function() {
    return Lists.find({ userId: this.userId });
  });
}

Meteor.methods({
  'lists.insert'() {
    if (!this.userId) {
      throw new Meteor.Error('not-authorised');
    }

    return Lists.insert({
      title: '',
      body: '',
      userId: this.userId,
      updatedAt: moment().valueOf() // new Date().getTime()
    });
  },
  'lists.remove'(_id) {
    if (!this.userId) {
      throw new Meteor.Error('not-authorised');
    }

    new SimpleSchema({
      _id: {
        type: String,
        min: 2
      }
    }).validate({ _id });

    Lists.remove({ _id, userId: this.userId });
  },
  'lists.update'(_id, updates) {
    if (!this.userId) {
      throw new Meteor.Error('not-authorised');
    }

    new SimpleSchema({
      _id: {
        type: String,
        min: 2
      },
      title: {
        type: String,
        optional: true,
      },
      body: {
        type: String,
        optional: true
      }
    }).validate({
      _id,
      ...updates
    });

    Lists.update({
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
