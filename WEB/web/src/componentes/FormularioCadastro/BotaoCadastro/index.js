import React, {Component} from 'react';
import { BotaoPrimeiroCadastroCSS } from '../../../styles';

//CLASSE DE BOTÃO PARA CADASTRO
class BotaoCadastro extends Component{
    render(){
        return(
            <BotaoPrimeiroCadastroCSS to={this.props.to} type={this.props.type} onClick={this.props.onClick} className="btn btn-outline-entrar col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12 mr-auto mb-3"> {this.props.id} </BotaoPrimeiroCadastroCSS>
        )
    }
}

export default BotaoCadastro;