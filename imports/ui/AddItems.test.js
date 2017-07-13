/* eslint prefer-arrow-callback: "off", no-undef: "off" */
import { Meteor } from 'meteor/meteor';
import React from 'react';
import expect from 'expect';
import { mount } from 'enzyme';

import AddItem from './AddItem';
import { items } from './../fixtures/fixtures';

if (Meteor.isClient) {
  describe('AddItem', function() {

    it('should call itemInputChange on input change', function() {
      const inputValue = '';
      const newInputValue = 'Milk';
      const spy = expect.createSpy();
      const wrapper = mount(<AddItem inputTerm={inputValue} itemInputChange={spy} />);

      wrapper.find('input').simulate('change', {
        target: {
          value: newInputValue
        }
      });

      expect(spy).toHaveBeenCalled();
    });
  });
}
