import React, {Component} from 'react';
import { BotaoLoginCSS } from '../../../styles'
import {Link} from 'react-router'

class BotaoLogin extends Component{

    render(){
        return(
            <div id={this.props.id} className="mt-5">
                <BotaoLoginCSS type={this.props.type} className="my-btn btn">{this.props.label}</BotaoLoginCSS>

                <span className="pure-form-message">Ainda não tem cadastro?</span>
                <Link to={this.props.link}><span className="pure-form-message">Cadastre-se aqui!</span></Link>
            </div>
        );
    };

}

export default BotaoLogin;