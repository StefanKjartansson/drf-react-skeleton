import React from 'react';
import Flexbox from 'flexbox-react';
import {Grid, Cell} from 'radium-grid';

export default class Master extends React.Component {

  render() {
		return (
			<Grid>
				{this.props.user.loggedIn ? this.page : this.single}
			</Grid>
		);
  }

  get page() {
    return (
      <div>
      </div>
    );
  }

  get single() {
    return (
      <div>
        <Cell/>
        <Cell>
          {this.props.children}
        </Cell>
        <Cell/>
      </div>
    );
  }

};
