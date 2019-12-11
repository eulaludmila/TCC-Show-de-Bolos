import React, { Component } from 'react';
import '../css/login.css';
import InputLogin from '../InputLogin'
import BotaoLogin from '../BotaoLogin'
import { Link } from 'react-router';
import axios from 'axios';
import { ipAPI } from '../../../link_config';
import { browserHistory} from 'react-router';

//Área de Login do Cliente
class LoginCliente extends Component{
    constructor(props){
        super(props);
        this.state={email:"", senha:""}
    }

    autenticar=(evento)=>{
        evento.preventDefault();

        const login={
            username: this.state.email,
            password: this.state.senha
        };

        axios.post(
            ipAPI + "login/cliente", login)
            .then(resposta=> {
                sessionStorage.setItem("authC", resposta.data.token)
                Promise.resolve(resposta.data.token)
                browserHistory.push("/");
            }).catch(error=>{console.log(error);alert("Usuário e/ou senha incorretos")})
    }

    setEmail=(evento)=>{
        this.setState({email:evento.target.value});
    }

    setSenha=(evento)=>{
        this.setState({senha:evento.target.value});
    }
    

    render(){
        return(
            <div className="container-fluid area_login">

                <div className="row primeira_linha">
                    
                <div className="col-xl-5 col-lg-7 col-md-7 col-sm-12 col-12 login">

                    <Link to="/"><div className="btn btn-outline-entrar rounded-circle voltar"> </div></Link>

                    <form className="pure-form pure-form-stacked mb-5" onSubmit={this.autenticar}>
                        <fieldset>
                            <legend>Bem-vindo a nossa área de login!</legend>
                            <p className="lead mb-5 text-center">Área destinada a clientes</p>

                            <div className="elementos-form">

                                <InputLogin id="email" type="email" placeholder="Email" label="Email" onChange={this.setEmail} style={{marginBottom: '20px'}}></InputLogin>
                                <InputLogin id="password" type="password" placeholder="Password" onChange={this.setSenha} label="Password"></InputLogin>
                                <span className="pure-form-message">Esqueceu a senha?</span>
                                
                                <BotaoLogin link="/cadastro/cliente" id="botao" type="submit" label="Entrar"></BotaoLogin>
                                
                            </div>

                        </fieldset>
                    </form>
                    <div>
                        <p className="text-center">Ao se inscrever, você concorda com nossas comunicações e termos de uso</p>
                    </div>

                </div>
                <div className="col-xl-7 col-lg-5 col-md-5 col-sm-1 col-1 img-login">

                </div>

                </div>

            </div> 
        );
    }
}

export default LoginCliente;