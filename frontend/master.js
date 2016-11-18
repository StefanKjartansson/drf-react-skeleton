import React from 'react';
import Flexbox from 'flexbox-react';


export default class Master extends React.Component {

  render() {
		return (
			<Flexbox flexDirection="column" minHeight="100vh">
				{this.props.user.loggedIn ? this.page : this.single}
			</Flexbox>
		);
  }

  get page() {
    return (
      <div>
        <Flexbox element="header" height="60px">
          Header
        </Flexbox>
        <Flexbox flexGrow={1}>
          {this.props.children}
        </Flexbox>
        <Flexbox element="footer" height="60px">
          Footer
        </Flexbox>
      </div>
    );
  }

  get single() {
    return (
      <Flexbox flexGrow={1}>
        {this.props.children}
      </Flexbox>
    );
  }

};
