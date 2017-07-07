/* eslint prefer-arrow-callback: "off", no-undef: "off" */
import { Meteor } from 'meteor/meteor';
import React from 'react';
import expect from 'expect';
import { mount } from 'enzyme';

import { notes } from './../fixtures/fixtures';
import { NoteList } from './NoteList';


if (Meteor.isClient) {
  describe('NoteList', function() {

    it('should render NoteListItem for each note', function() {
      const wrapper = mount(<NoteList notes={notes} />);

      expect(wrapper.find('NoteListItem').length).toBe(2);
      expect(wrapper.find('NoteListEmptyItem').length).toBe(0);
    });

    it('should render NoteListEmptyItem if zero notes', function() {
      const wrapper = mount(<NoteList notes={[]} />);

      expect(wrapper.find('NoteListItem').length).toBe(0);
      expect(wrapper.find('NoteListEmptyItem').length).toBe(1);
    });

    it('should update the searchTerm on input change', function() {
      const searchValue = '';
      const newSearchValue = 'Make';
      const wrapper = mount(<NoteList notes={''} />);
      wrapper.setState({ searchTerm: searchValue });


      wrapper.find('.item-list__search > input').simulate('change', {
        target: {
          value: newSearchValue
        }
      });

      expect(wrapper.state('searchTerm')).toBe(newSearchValue);
    });

    it('should correctly filter list on search input change', function(){
      const searchValue = '';
      const newSearchValue = 'test';
      const wrapper = mount(<NoteList notes={notes} />);
      wrapper.setState({ searchTerm: searchValue });


      wrapper.find('.item-list__search > input').simulate('change', {
        target: {
          value: newSearchValue
        }
      });

      expect(wrapper.find('NoteListItem').length).toBe(1);
    });
  });

}
