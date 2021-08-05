import React, { Component } from 'react';
import { Container } from 'reactstrap';


export class Layout extends Component {
  static displayName = Layout.name;

  render () {
    return (
      //the first page load the home route-fetchData component
      <div>
      
        <div><h3>Exercise – Calculator </h3></div>
        <Container>
          {this.props.children}
        </Container>
      </div>
    );
  }
}
