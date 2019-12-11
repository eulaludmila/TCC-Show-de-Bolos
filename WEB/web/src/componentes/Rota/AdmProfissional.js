import React, { Component } from 'react';
import '../../componentes/AreaAdmProfissional/HomeProfissional/cms_home_confeiteiro.css'
import '../../componentes/AreaAdmProfissional/Email/cms_editar_email.css'
import '../../componentes/AreaAdmProfissional/Header/header_adm_profissional.css'
import '../../componentes/AreaAdmProfissional/Menu/menu_adm_profissional.css'
import '../../componentes/AreaAdmProfissional/DadosPessoais/cms_editar_dados.css'
import '../../componentes/AreaAdmProfissional/EditarEndereco/cms_editar_endereco.css'
import '../../componentes/AreaAdmProfissional/TodosProdutos/cms_todos_produtos.css'
import '../../componentes/AreaAdmProfissional/PedidosEmProducao/cms_aprovados.css'
import '../../componentes/AreaAdmProfissional/CadastroProduto/cms_cadastro_produtos.css'
import '../../componentes/AreaAdmProfissional/ProdutosCadastrados/produtos_cadastrados.css'

import '../../css/font/css/all.css'
import '../../js/accordian'

import {movePage} from '../../link_config'

// import Header from '../AreaAdmProfissional/Header'
import Menu from '../AreaAdmProfissional/Menu'
import {browserHistory} from 'react-router'

class AdmProfissional extends Component {

  constructor(props){
    super(props)

    this.state={status:''}
  }

  componentDidUpdate(){
    movePage(0)
  }

 componentDidMount(){
   if(sessionStorage.getItem('auth') === null){
     alert("Você ainda não está logado")
    browserHistory.push('/login/profissional')
   }
 }

  render(){
    return (
      <div>
        <Menu codConfeiteiro={this.props.params.codConfeiteiro}></Menu>
        <div className="main">
        {this.props.children}
			
        
      </div>

      </div>
    );
  }
}

export default AdmProfissional;
