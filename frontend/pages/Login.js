import _ from 'underscore';
import React from 'react';
import API from '../api';

import {Form, Input, Button} from 'antd';

const FormItem = Form.Item;

class Login extends React.Component {

	state = {
		user: '',
		password: '',
		userErrorText: '',
		passwordErrorText: '',
		hasError: false,
	};

  handleSubmit = this.handleSubmit.bind(this);

  handleSubmit(e) {
    e.preventDefault();
    console.log('收到表单值：', this.props.form.getFieldsValue());
    // API.auth.login(this.state.user, this.state.password)
  }

  render() {
    return (
     <Form horizontal onSubmit={this.handleSubmit}>
        <FormItem
          label="失败校验"
          labelCol={{span: 5}}
          wrapperCol={{span: 12}}
          validateStatus="error"
          help="请输入数字和字母组合"
        >
          <Input defaultValue="无效选择" id="error" />
        </FormItem>
        <FormItem wrapperCol={{ span: 16, offset: 6 }} style={{ marginTop: 24 }}>
          <Button type="primary" htmlType="submit">确定</Button>
        </FormItem>
      </Form>
    );
  }

  /*
  login(e) {
    e.preventDefault();
    API.auth.login(this.state.user, this.state.password)
      .catch((err) => {
        let rt = JSON.parse(err.responseText);
        let stateUpdate = {
          userErrorText: '',
          passwordErrorText: '',
          hasError: false,
        };
        if (_.has(rt, 'username')) {
          stateUpdate.userErrorText = rt.username.join(' ');
          stateUpdate.hasError = true;
        }
        if (_.has(rt, 'password')) {
          stateUpdate.passwordErrorText = rt.password.join(' ');
          stateUpdate.hasError = true;
        }
        if (_.has(rt, 'non_field_errors')) {
          stateUpdate.userErrorText = '';
          stateUpdate.passwordErrorText = rt.non_field_errors.join(' ');
          stateUpdate.hasError = true;
        }
        this.setState(stateUpdate);
      });
  }

  get userField() {
    return (
      <input
        type="text"
        autoComplete="off"
        autoFocus
        onChange={(e) => {
          this.setState({
            userErrorText: '',
            user: e.target.value,
          });
        }}/>
    );
  }

  get passwordField() {
    return (
      <input
        type="password"
        autoComplete="off"
        onChange={(e) => {
          this.setState({
            passwordErrorText: '',
            password: e.target.value,
          });
        }}
        onKeyDown={(e) => {
          if (e.which === 13) {
            this.login(e);
          }
        }}/>
    );
  }

  get loginButton() {
    let enabled = this.state.password !== '' && this.state.user !== '';
    return (
      <button
        disabled={!enabled}
        onClick={this.login}>
      Login
      </button>
    );
  }
  */

}

export default Form.create()(Login);
