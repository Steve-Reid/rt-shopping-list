/* eslint prefer-arrow-callback: "off", no-undef: "off" */
import { Meteor } from 'meteor/meteor';
import React from 'react';
import expect from 'expect';
import { mount } from 'enzyme';

import { Editor } from './Editor';
import { lists } from './../fixtures/fixtures';

if (Meteor.isClient) {
  describe('Editor', function() {
    let browserHistory;
    let call;

    beforeEach(function() {
      call = expect.createSpy();
      browserHistory = {
        push: expect.createSpy()
      };
    });

    it('should render pick list message', function() {
      const wrapper = mount(<Editor browserHistory={browserHistory} call={call} />);
      expect(wrapper.find('p').text()).toBe('Pick or Create a list to get started');
    });

    it('should render list not found message', function() {
      const wrapper = mount(<Editor browserHistory={browserHistory} call={call} selectedListId={lists[0]._id} />);
      expect(wrapper.find('p').text()).toBe('Note not found');
    });

    // it('should render modal on delete button click', function() {
    //   const wrapper = mount(<Editor browserHistory={browserHistory} call={call} selectedListId={lists[0]._id} list={lists[0]} />);
    //
    //   wrapper.find('button').simulate('click');
    //   expect(call).toHaveBeenCalledWith('lists.remove', lists[0]._id);
    //   expect(browserHistory.push).toHaveBeenCalledWith('/dashboard');
    // });

    // it('should remove list', function() {
    //   const wrapper = mount(<Editor browserHistory={browserHistory} call={call} selectedListId={lists[0]._id} list={lists[0]} />);
    //
    //   wrapper.find('button').simulate('click');
    //   expect(call).toHaveBeenCalledWith('lists.remove', lists[0]._id);
    //   expect(browserHistory.push).toHaveBeenCalledWith('/dashboard');
    // });

    it('should update the list body on textarea change', function() {
      const newBody = 'This is the updated body text';
      const wrapper = mount(<Editor browserHistory={browserHistory} call={call} selectedListId={lists[0]._id} list={lists[0]} />);

      wrapper.find('textarea').simulate('change', {
        target: {
          value: newBody
        }
      });

      expect(wrapper.state('body')).toBe(newBody);
      expect(call).toHaveBeenCalledWith('lists.update', lists[0]._id, { body: newBody });
    });

    it('should update the list title on input change', function() {
      const newTitle = 'New Title';
      const wrapper = mount(<Editor browserHistory={browserHistory} call={call} selectedListId={lists[0]._id} list={lists[0]} />);

      wrapper.find('input').simulate('change', {
        target: {
          value: newTitle
        }
      });

      expect(wrapper.state('title')).toBe(newTitle);
      expect(call).toHaveBeenCalledWith('lists.update', lists[0]._id, { title: newTitle });
    });

    it('should set state for new list', function() {
      const wrapper = mount(<Editor browserHistory={browserHistory} call={call} />);

      wrapper.setProps({
        selectedListId: lists[0]._id,
        list: lists[0]
      });

      expect(wrapper.state('title')).toBe(lists[0].title);
      expect(wrapper.state('body')).toBe(lists[0].body);
    });

    it('should not set state if no list prop provided', function() {
      const wrapper = mount(<Editor browserHistory={browserHistory} call={call} />);

      wrapper.setProps({
        selectedListId: lists[0]._id
      });

      expect(wrapper.state('title')).toBe('');
      expect(wrapper.state('body')).toBe('');
    });

  });

}
