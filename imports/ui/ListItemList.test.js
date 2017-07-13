/* eslint prefer-arrow-callback: "off", no-undef: "off" */
import { Meteor } from 'meteor/meteor';
import React from 'react';
import expect from 'expect';
import { mount } from 'enzyme';

import ListItemList from './ListItemList';
import { items } from './../fixtures/fixtures';


if (Meteor.isClient) {
  describe('ListItemList', function() {

    it('should render Item for each item', function() {
      const wrapper = mount(<ListItemList items={items} />);
      console.log('items', items);

      expect(wrapper.find('Item').length).toBe(4);
      expect(wrapper.find('.item__message').length).toBe(0);
    });

    it('should render message if zero items', function() {
      const wrapper = mount(<ListItemList items={[]} />);

      expect(wrapper.find('Item').length).toBe(0);
      expect(wrapper.find('.item__message').length).toBe(1);
    });

    it('should remove item when X button clicked ', function() {
      const wrapper = mount(<ListItemList items={items} />);
      wrapper.find('button.button--round').first().simulate('click');

      expect(wrapper.state('searchTerm')).toBe(newSearchValue);
      expect(wrapper.find('Item').length).toBe(3);
      expect(wrapper.containsAnyMatchingElements([
        <h4 className="list-item__body">{item[0].itemBody}</h4>
      ])).to.equal(true);
    });

  });
}
