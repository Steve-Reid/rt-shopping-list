/* eslint prefer-arrow-callback: "off", no-undef: "off" */
import { Meteor } from 'meteor/meteor';
import React from 'react';
import expect from 'expect';
import { mount } from 'enzyme';

import { ShoppingListFooter } from './ShoppingListFooter';
import { lists } from './../fixtures/fixtures';

if (Meteor.isClient) {
  describe('ShoppingListFooter', function() {
    let meteorCall;
    let Session;

    beforeEach(function() {
      meteorCall = expect.createSpy();
      Session = {
        set: expect.createSpy()
      };
    });

    it('should call meteorCall with lists.insert', function() {
      const method = 'lists.insert';
      const wrapper = mount(<ShoppingListFooter meteorCall={meteorCall} Session={Session} />);

      wrapper.find('button').simulate('click');
      meteorCall.calls[0].arguments[1](undefined, lists[0]._id);

      expect(meteorCall.calls[0].arguments[0]).toBe(method);
      expect(Session.set).toHaveBeenCalledWith('selectedListId', lists[0]._id);
    });

    it('should not set session for failed insert', function(){
      const method = 'lists.insert';
      const wrapper = mount(<ShoppingListFooter meteorCall={meteorCall} Session={Session} />);

      wrapper.find('button').simulate('click');
      meteorCall.calls[0].arguments[1]('error');

      expect(meteorCall.calls[0].arguments[0]).toBe(method);
      expect(Session.set).toNotHaveBeenCalled();
    });

  });

}
