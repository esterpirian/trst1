import React, { Component } from 'react';
import { Container } from 'reactstrap';


export class Layout extends Component {
  static displayName = Layout.name;

  render () {
    return (
      <div>
      
        <div><h3>Exercise – Calculator </h3></div>
        <Container>
          {this.props.children}
        </Container>
      </div>
    );
  }
}
