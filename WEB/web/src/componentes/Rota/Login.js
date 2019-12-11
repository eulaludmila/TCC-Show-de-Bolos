import React, { Component } from 'react';
class Login extends Component {
  render(){
    return (
      <div>
        {this.props.children}
      </div>
    );
  }
}

export default Login;