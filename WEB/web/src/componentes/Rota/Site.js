import React, { Component } from 'react';
import { Header} from '../Conteudo/Home/componentes/Header';
import { Footer} from '../Conteudo/Footer';
import {movePage} from './../../link_config'

class Site extends Component {

  componentDidUpdate(){
    movePage(0)
  }
  
  render(){
    
    return (
      <div>
        
        <Header/>
        {this.props.children}
        <Footer/>
      </div>
    );
  }
}

export default Site;
