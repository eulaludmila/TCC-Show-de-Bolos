import React, { Component } from 'react';
class Cadastro extends Component {
  render(){
    return (
      <div>
        {this.props.children}
      </div>
    );
  }
}

export default Cadastro;