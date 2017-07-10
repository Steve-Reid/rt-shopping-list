/* eslint prefer-arrow-callback: "off", no-undef: "off" */
import { Meteor } from 'meteor/meteor';
import React from 'react';
import expect from 'expect';
import { mount } from 'enzyme';

import { lists } from './../fixtures/fixtures';
import { ShoppingLists } from './ShoppingLists';


if (Meteor.isClient) {
  describe('ShoppingLists', function() {

    it('should render ShoppingListItem for each note', function() {
      const wrapper = mount(<ShoppingLists lists={lists} />);

      expect(wrapper.find('ShoppingListItem').length).toBe(2);
      expect(wrapper.find('ShoppingListEmptyItem').length).toBe(0);
    });

    it('should render ShoppingListEmptyItem if zero lists', function() {
      const wrapper = mount(<ShoppingLists lists={[]} />);

      expect(wrapper.find('ShoppingListItem').length).toBe(0);
      expect(wrapper.find('ShoppingListEmptyItem').length).toBe(1);
    });

    it('should update the searchTerm on input change', function() {
      const searchValue = '';
      const newSearchValue = 'Make';
      const wrapper = mount(<ShoppingLists lists={''} />);
      wrapper.setState({ searchTerm: searchValue });


      wrapper.find('.item-list__search > input').simulate('change', {
        target: {
          value: newSearchValue
        }
      });

      expect(wrapper.state('searchTerm')).toBe(newSearchValue);
    });

    it('should correctly filter list on search input change', function() {
      const searchValue = '';
      const newSearchValue = 'test';
      const wrapper = mount(<ShoppingLists lists={lists} />);
      wrapper.setState({ searchTerm: searchValue });


      wrapper.find('.item-list__search > input').simulate('change', {
        target: {
          value: newSearchValue
        }
      });

      expect(wrapper.find('ShoppingListItem').length).toBe(1);
    });
  });

}
