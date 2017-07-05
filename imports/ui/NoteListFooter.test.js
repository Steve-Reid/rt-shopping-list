/* eslint prefer-arrow-callback: "off", no-undef: "off" */
import { Meteor } from 'meteor/meteor';
import React from 'react';
import expect from 'expect';
import { mount } from 'enzyme';

import { NoteListFooter } from './NoteListFooter';
import { notes } from './../fixtures/fixtures';

if (Meteor.isClient) {
  describe('NoteListFooter', function() {
    let meteorCall;
    let Session;

    beforeEach(function() {
      meteorCall = expect.createSpy();
      Session = {
        set: expect.createSpy()
      };
    });

    it('should call meteorCall with notes.insert', function() {
      const method = 'notes.insert';
      const wrapper = mount(<NoteListFooter meteorCall={meteorCall} Session={Session} />);

      wrapper.find('button').simulate('click');
      meteorCall.calls[0].arguments[1](undefined, notes[0]._id);

      expect(meteorCall.calls[0].arguments[0]).toBe(method);
      expect(Session.set).toHaveBeenCalledWith('selectedNoteId', notes[0]._id);
    });

    it('should not set session for failed insert', function(){
      const method = 'notes.insert';
      const wrapper = mount(<NoteListFooter meteorCall={meteorCall} Session={Session} />);

      wrapper.find('button').simulate('click');
      meteorCall.calls[0].arguments[1]('error');

      expect(meteorCall.calls[0].arguments[0]).toBe(method);
      expect(Session.set).toNotHaveBeenCalled();
    });

  });

}
