import React, { Component } from 'react';
import InputAvaliar from '../InputAvaliar'
import TextAvaliar from '../TextAvaliar'
import Estrelas from 'react-star-ratings'
import email from 'email-validator'
import {Modal} from 'react-bootstrap';
import { InputEmailSenha } from '../../../../AreaAdmProfissional/global/InputEmailSenha';
import $ from 'jquery'
import axios from 'axios'
import {ipAPI} from '../../../../../link_config'
import {browserHistory} from 'react-router'

export default class AvaliarProduto extends Component{

    constructor(props){
        super(props)
        this.state = {rating:0, nome:'',email:'', teaxo:'',show:false,emailVerificacao:'',senhaVerificacao:''}
    }

    onFocus = (evento) => {
        
        console.log(evento)
        if(sessionStorage.getItem('authC') === null){

            if(evento === "opiniao"){
                $("#txt_opiniao").blur();
                this.setState({show:true})
                
            }else if(evento === "nome"){
                $("#txt_nome").blur();
                this.setState({show:true})
            }else if(evento === "email"){
                $("#txt_email").blur();
                this.setState({show:true})
            }
            
                
            return false
        }else{
            
        }
    }

    autenticar=(evento)=>{
        evento.preventDefault();

        const login={
            username: this.state.emailVerificacao,
            password: this.state.senhaVerificacao
        };

        axios.post(
            ipAPI + "login/cliente", login)
            .then(resposta=> {
                sessionStorage.setItem("authC", resposta.data.token)
                Promise.resolve(resposta.data.token)
                this.close()
            }).catch(error=>{console.log(error);alert("Usuário e/ou senha incorretos")})
    }

    close=()=>{
      
        this.setState({show:false});
        browserHistory.push("/descricao/" + this.props.codProduto)
    }

    setNome = (evento) => {
        this.setState({nome:evento.target.value})
    }

    setEmail = (evento) => {

        this.setState({email:evento.target.value})
        if(email.validate(evento.target.value)){

        }else{
            console.log('inválido')
        }

    }

    setTexto = (evento) => {
        this.setState({texto:evento.target.value})
    }

    setEmailVerificacao = (evento) =>{
        this.setState({emailVerificacao:evento.target.value})
        if(email.validate(evento.target.value)){

        }else{
            console.log('inválido')
        }
    }

    setSenhaVerificacao = (evento) =>{
        this.setState({senhaVerificacao:evento.target.value})
    }

    login =(evento)=>{

        if(sessionStorage.getItem('authC') !== null){
            this.setState({rating:evento})
            
        }else{
          
            this.setState({show:true})
            
        }
        
    }


    cadastrarAvaliacao = (evento) =>{
        evento.preventDefault()
        
        if(sessionStorage.getItem('authC') === null){
            this.setState({show:true})
            
        }

        axios.post();
    }


    render(){
        return(
            <div className="form-row mt-3 mb-4">
                <div className="col-md-8 container">
                    <h4 className="card-text">Avalie este produto:</h4>
                    <h6>Sua Avaliação:*</h6>
                    <div className="rate">
                        <Estrelas starDimension="25px" numberOfStars={5}  starHoverColor="#fcba03" starRatedColor="#fcba03" starEmptyColor="#dedede" starSpacing="1px" rating={this.state.rating} changeRating={this.login} name="estrelas"></Estrelas>
                    </div>
                </div>
                <form className="container col-md-8 mt-3" onSubmit={this.cadastrarAvaliacao}>
                    <TextAvaliar titulo="Escreva sua opinião:*" value={this.state.texto} onChange={this.setTexto} onFocus={() => this.onFocus("opiniao") } className="form-control txtArea foco" id="txt_opiniao" rows="5"/>
                    <div className="form-row mt-2">
                        <InputAvaliar className="form-group col-md-6" onFocus={() => this.onFocus("nome")} value={this.state.nome} onChange={this.setNome} label="Nome:*" type="text" id="txt_nome" classeIp="form-control"/>
                        <InputAvaliar className="form-group col-md-6" value={this.state.email} onChange={this.setEmail} onFocus={() => this.onFocus("email")} label="Email:*" type="email" id="txt_email" classeIp="form-control"/>
                        <InputAvaliar className="form-group col-md-6" type="submit" id="btn_enviar" classeIp="btn btn-primary" value="Enviar"/>
                    </div>
                </form>

                <Modal show={this.state.show} animation={true} onHide={this.close} id="my-modal" centered>
                    <Modal.Header closeButton>
                    <Modal.Title>Login</Modal.Title>

                    </Modal.Header>
                    <form  onSubmit={this.autenticar}>
                        <Modal.Body>
                            <div className={this.state.classMessage} role="alert">
                                <h6 className="text-center color-danger">{this.state.message}</h6>
                            </div>
                        
                            <InputEmailSenha grupo="form-group" tipo="email" label="E-mail:" classeInput="form-control" aria-describedby="emailHelp" id="txt_email_verificacao" onChange={this.setEmailVerificacao} value={this.state.emailVerificacao} placeholder="Digite seu e-mail"></InputEmailSenha>
                            <InputEmailSenha grupo="form-group"  tipo="password" label="Senha:" aria-describedby="emailHelp" classeInput="form-control" id="txt_senha_verificacao" onChange={this.setSenhaVerificacao} value={this.state.senhaVerificacao} placeholder="Digite sua senha"></InputEmailSenha>
                            
                        </Modal.Body>
                        <Modal.Footer>
                            <button type="submit" className="btn btn-success">Salvar</button>
                               
                        </Modal.Footer>
                        </form>  
                </Modal>
            </div>
        );
    }
}