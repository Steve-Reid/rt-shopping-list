/* eslint prefer-arrow-callback: "off", no-undef: "off" */
import { Meteor } from 'meteor/meteor';
import React from 'react';
import expect from 'expect';
import { mount } from 'enzyme';

import { lists } from './../fixtures/fixtures';
import { ShoppingListItem } from './ShoppingListItem';

if (Meteor.isClient) {
  describe('ShoppingListItem', function() {
    let Session;

    beforeEach(function() {
      Session = {
        set: expect.createSpy()
      };
    });

    it('should render title and timestamp', function() {
      const wrapper = mount(<ShoppingListItem list={lists[0]} Session={Session} />);

      expect(wrapper.find('h5').text()).toBe(lists[0].title);
      expect(wrapper.find('p').text()).toBe('28/4/17');
    });

    it('should render default title when no title set', function() {
      const wrapper = mount(<ShoppingListItem list={lists[1]} Session={Session} />);

      expect(wrapper.find('h5').text()).toBe('Untitled list');
    });

    it('should call set on click', function() {
      const wrapper = mount(<ShoppingListItem list={lists[0]} Session={Session} />);

      wrapper.find('div').simulate('click');
      expect(Session.set).toHaveBeenCalledWith('selectedListId', lists[0]._id);
    });


  });
}
