import React from 'react';
import AuthenticatedComponent from '../components/AuthenticatedComponent';


@AuthenticatedComponent
export default class Home extends React.Component {
  render() {
    return (
      <div>Home</div>
    );
  }
}
