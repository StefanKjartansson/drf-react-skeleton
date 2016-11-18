import React from 'react';
import expect from 'expect';
import {mount, shallow} from 'enzyme';

import Login from '../pages/Login';

describe('<Login />', () => {

  it('mounts', () => {
    const wrapper = shallow(<Login />);
    expect(wrapper).toExist();
  });

  it('should be clickable', () => {
    const p = new Promise(function(resolve, reject) {
      reject({username: ['error']});
    });
		const API = {
			auth: {
				login: (username, password) => p,
			},
		};
    const wrapper = mount(<Login API={API} />);
    wrapper.setState({username: 'foo', password: 'bar'});
    const container = wrapper.find('button');
    expect(container.length).toEqual(1);
    container.simulate('click');
  });

});
