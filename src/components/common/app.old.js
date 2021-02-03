import React, {Component} from 'react';
import styled from 'styled-components';


const GlobalStyleDiv = styled.div`
  font-family: roboto, 'Helvetica Neue', Helvetica, sans-serif;
  font-weight: 400;
  font-size: 0.875em;
  line-height: 1.71429;
  *,
  *:before,
  *:after {
    -webkit-box-sizing: border-box;
    -moz-box-sizing: border-box;
    box-sizing: border-box;
  }
  ul {
    margin: 0;
    padding: 0;
  }
  li {
    margin: 0;
  }
  a {
    text-decoration: none;
  }
`;

export default class App extends Component {
  render() {
    return <GlobalStyleDiv>{this.props.children}</GlobalStyleDiv>;
  }
}
