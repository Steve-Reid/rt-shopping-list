/* eslint prefer-arrow-callback: "off", no-undef: "off" */
import { Meteor } from 'meteor/meteor';
import React from 'react';
import expect from 'expect';
import { mount } from 'enzyme';

import { NoteListSearch } from './NoteListSearch';
import { notes } from './../fixtures/fixtures';

if (Meteor.isClient) {
  describe('NoteListSearch', function() {
    let Session;

    beforeEach(function() {
      Session = {
        set: expect.createSpy()
      };
    });

    it('should show search input', function() {
      const searchTerm = 'eggs';
      const wrapper = mount(<NoteListSearch />)
    });


  });

}
