/* eslint prefer-arrow-callback: "off", no-undef: "off" */
import { Meteor } from 'meteor/meteor';
import React from 'react';
import expect from 'expect';
import { mount } from 'enzyme';

import ShoppingListSearch from './ShoppingListSearch';
import { list } from './../fixtures/fixtures';

if (Meteor.isClient) {
  describe('ShoppingListSearch', function() {

    it('should call onSearchChange on input change', function() {
      const searchValue = '';
      const newSearchValue = 'Make';
      const spy = expect.createSpy();
      const wrapper = mount(<ShoppingListSearch searchTerm={searchValue} onSearchChange={spy} />);

      wrapper.find('input').simulate('change', {
        target: {
          value: newSearchValue
        }
      });

      expect(spy).toHaveBeenCalled();
    });

  });

}
