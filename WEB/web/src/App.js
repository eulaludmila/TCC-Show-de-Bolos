import React, { Component } from 'react';
import { Rota } from './Rota';
import 'jquery-mask-plugin/dist/jquery.mask';
import './css/bootstrap.min.css';
import './css/pure-min.css';
import './componentes/Conteudo/EntrarCadastrar/css/entrarCadastrar.css'
import './css/rate.css'



class App extends Component {
  render(){
    return (
      <div>
        <Rota></Rota>
      </div>
    );
  }
}

export default App;
