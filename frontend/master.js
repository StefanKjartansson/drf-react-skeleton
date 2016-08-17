'use strict';

import React from 'react';
import {Row, Col} from 'antd';


export default class Master extends React.Component {

  render() {
		return (
			<div>
				{this.props.user.loggedIn ? this.page : this.single}
			</div>
		);
  }

  get page() {
    return (
			<Row>
				<Col span={6}>
					Nav
				</Col>
				<Col span={18}>
					{this.props.children}
				</Col>
			</Row>
    );
  }

  get single() {
    return (
			<Row>
				<Col span={24}>
					{this.props.children}
				</Col>
			</Row>
    );
  }

}
