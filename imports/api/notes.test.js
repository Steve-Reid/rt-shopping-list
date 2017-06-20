/* eslint prefer-arrow-callback: "off", no-undef: "off" */
import { Meteor } from 'meteor/meteor';
import expect from 'expect';

import { Notes } from './notes';

if (Meteor.isServer) {
  describe('notes', function() {
    const testNote1 = {
      _id: 'testNoteId1',
      title: 'My Test Title',
      body: 'My test body text for the notes app.',
      updatedAt: 0,
      userId: 'testUserId1'
    };

    const testNote2 = {
      _id: 'testNoteId2',
      title: 'Other Test Title',
      body: 'Other test body text for the notes app.',
      updatedAt: 0,
      userId: 'testUserId2'
    };

    beforeEach(function() {
      Notes.remove({});
      Notes.insert(testNote1);
      Notes.insert(testNote2);
    });

    it('should insert new note', function() {
      const userId = 'testid';
      const _id = Meteor.server.method_handlers['notes.insert'].apply({ userId });
      expect(Notes.findOne({ _id, userId })).toExist();
    });

    it('should not insert note if not authenticated', function() {
      expect(() => {
        Meteor.server.method_handlers['notes.insert']();
      }).toThrow();
    });

    it('should remove note', function() {
      Meteor.server.method_handlers['notes.remove'].apply({ userId: testNote1.userId }, [testNote1._id]);

      expect(Notes.findOne({ _id: testNote1._Id })).toNotExist();
    });

    it('should note remove not if unauthenticated', function() {
      expect(() => {
        Meteor.server.method_handlers['notes.remove'].apply({}, [testNote1._id]);
      }).toThrow();
    });

    it('should not remove not if invalid _id', function() {
      expect(() => {
        Meteor.server.method_handlers['notes.remove'].apply({ userId: testNote1.userId }, []);
      }).toThrow();
    });

    it('should update note', function() {
      const title = 'This is an updated title';

      Meteor.server.method_handlers['notes.update'].apply({
        userId: testNote1.userId
      }, [
        testNote1._id,
        { title }
      ]);

      const note = Notes.findOne({ _id: testNote1._id });
      expect(note.updatedAt).toBeGreaterThan(0);
      expect(note).toInclude({
        title,
        body: testNote1.body
      });
    });

    it('should throw error if extra updates provided', function() {
      const title = 'This is an updated title';
      const name = 'malicious code';

      expect(() => {
        Meteor.server.method_handlers['notes.update'].apply({
          userId: testNote1.userId
        }, [
          testNote1._id,
          { title, name }
        ]);
      }).toThrow();
    });

    it('should not update note if user was not creator', function() {
      const title = 'This is an updated title';

      Meteor.server.method_handlers['notes.update'].apply({
        userId: 'differentUser'
      }, [
        testNote1._id,
        { title }
      ]);

      const note = Notes.findOne({ _id: testNote1._id });

      expect(note).toInclude(testNote1);
    });

    it('should note update not if unauthenticated', function() {
      expect(() => {
        Meteor.server.method_handlers['notes.update'].apply({}, [testNote1._id]);
      }).toThrow();
    });

    it('should not update not if invalid _id', function() {
      expect(() => {
        Meteor.server.method_handlers['notes.update'].apply({ userId: testNote1.userId }, []);
      }).toThrow();
    });

    it('should return a users notes', function() {
      const res = Meteor.server.publish_handlers.notes.apply({ userId: testNote1.userId });
      const notes = res.fetch();

      expect(notes.length).toBe(1);
      expect(notes[0]).toEqual(testNote1);
    });

    it('should return zero notes for user that has none', function() {
      const res = Meteor.server.publish_handlers.notes.apply({ userId: 'testUserId99' });
      const notes = res.fetch();

      expect(notes.length).toBe(0);
    });

  });
}
