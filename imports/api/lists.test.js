/* eslint prefer-arrow-callback: "off", no-undef: "off" */
import { Meteor } from 'meteor/meteor';
import expect from 'expect';

import { Lists } from './lists';

if (Meteor.isServer) {
  describe('lists', function() {
    const testList1 = {
      _id: 'testListId1',
      title: 'My Test Title',
      body: 'My test body text for the lists app.',
      updatedAt: 0,
      userId: 'testUserId1'
    };

    const testList2 = {
      _id: 'testListId2',
      title: 'Other Test Title',
      body: 'Other test body text for the lists app.',
      updatedAt: 0,
      userId: 'testUserId2'
    };

    beforeEach(function() {
      Lists.remove({});
      Lists.insert(testList1);
      Lists.insert(testList2);
    });

    it('should insert new note', function() {
      const userId = 'testid';
      const _id = Meteor.server.method_handlers['lists.insert'].apply({ userId });
      expect(Lists.findOne({ _id, userId })).toExist();
    });

    it('should not insert note if not authenticated', function() {
      expect(() => {
        Meteor.server.method_handlers['lists.insert']();
      }).toThrow();
    });

    it('should remove note', function() {
      Meteor.server.method_handlers['lists.remove'].apply({ userId: testList1.userId }, [testList1._id]);

      expect(Lists.findOne({ _id: testList1._Id })).toNotExist();
    });

    it('should note remove not if unauthenticated', function() {
      expect(() => {
        Meteor.server.method_handlers['lists.remove'].apply({}, [testList1._id]);
      }).toThrow();
    });

    it('should not remove not if invalid _id', function() {
      expect(() => {
        Meteor.server.method_handlers['lists.remove'].apply({ userId: testList1.userId }, []);
      }).toThrow();
    });

    it('should update note', function() {
      const title = 'This is an updated title';

      Meteor.server.method_handlers['lists.update'].apply({
        userId: testList1.userId
      }, [
        testList1._id,
        { title }
      ]);

      const note = Lists.findOne({ _id: testList1._id });
      expect(note.updatedAt).toBeGreaterThan(0);
      expect(note).toInclude({
        title,
        body: testList1.body
      });
    });

    it('should throw error if extra updates provided', function() {
      const title = 'This is an updated title';
      const name = 'malicious code';

      expect(() => {
        Meteor.server.method_handlers['lists.update'].apply({
          userId: testList1.userId
        }, [
          testList1._id,
          { title, name }
        ]);
      }).toThrow();
    });

    it('should not update note if user was not creator', function() {
      const title = 'This is an updated title';

      Meteor.server.method_handlers['lists.update'].apply({
        userId: 'differentUser'
      }, [
        testList1._id,
        { title }
      ]);

      const note = Lists.findOne({ _id: testList1._id });

      expect(note).toInclude(testList1);
    });

    it('should note update not if unauthenticated', function() {
      expect(() => {
        Meteor.server.method_handlers['lists.update'].apply({}, [testList1._id]);
      }).toThrow();
    });

    it('should not update not if invalid _id', function() {
      expect(() => {
        Meteor.server.method_handlers['lists.update'].apply({ userId: testList1.userId }, []);
      }).toThrow();
    });

    it('should return a users lists', function() {
      const res = Meteor.server.publish_handlers.lists.apply({ userId: testList1.userId });
      const lists = res.fetch();

      expect(lists.length).toBe(1);
      expect(lists[0]).toEqual(testList1);
    });

    it('should return zero lists for user that has none', function() {
      const res = Meteor.server.publish_handlers.lists.apply({ userId: 'testUserId99' });
      const lists = res.fetch();

      expect(lists.length).toBe(0);
    });

  });
}
