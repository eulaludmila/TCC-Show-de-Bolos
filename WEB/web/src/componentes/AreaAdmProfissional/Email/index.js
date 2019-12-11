import React, { Component } from 'react';
import Header from '../Header';
import { ContainerAdm } from '../../../styles'
import { InputEmailSenha } from '../global/InputEmailSenha';
import $ from 'jquery';
import {Modal} from 'react-bootstrap';
import {ipAPI} from '../../../link_config'
// import decode from 'jwt-decode'
import email from 'email-validator'


export class TelaEmail extends Component {

    //CONSTRUTOR DECLARANDO OS ESTADOS
    constructor(props) {
        super(props);
        this.state = { emailNovo: '', confirmEmail: '', message: "", classMessage: "", show:false, emailAtual:'' };
        this.atualizarListagem = this.atualizarListagem.bind(this);

    }

    componentDidMount() {
        $.ajax({
            url: `${ipAPI}confeiteiro/` + this.props.codConfeiteiro,
            dataType: 'json',
            headers:{'Authorization':sessionStorage.getItem('auth')},
            
            success: function (resposta) {
                
                this.setState({ emailAtual: resposta.email });

            }.bind(this)
        })
    }

    setEmailNovo = (evento) => {
        this.setState({ emailNovo: evento.target.value });
        if(email.validate(evento.target.value) === false){
            var mensagem = "Email é inválido";
            var id = "#txt_novo_email";
            this.erroCaixaVazia(mensagem, id);
        }else{
            this.onFocusInput("#txt_novo_email");
        }
    }

    setConfirmEmail = (evento) => {
        this.setState({ confirmEmail: evento.target.value });
        this.onFocusInput("#txt_confirmar_email");
    }

    //VALIDAÇÃO DOS CAMPOS DOS INPUTS
    verificaCampos = (evento) => {
        evento.preventDefault();
        var mensagem = "";
        var id = "";

        if (this.state.emailNovo.length < 13) {
            mensagem = "O campo e-mail deve ter no mínimo 13 caracteres";
            id = "#txt_novo_email";

            this.erroCaixaVazia(mensagem, id);

        } else if (this.state.emailNovo !== this.state.confirmEmail) {
            mensagem = "O campo confirmação da senha está errada";
            id = "#txt_confirmar_email";

            this.erroCaixaVazia(mensagem, id);

        } else {
            this.setState({ show: true});
            sessionStorage.setItem("confirm", this.state.emailNovo)
            this.setState({ emailNovo: '' });
            this.setState({ confirmEmail: '' });
        }

    }

    close=()=>{
        this.setState({show:false});
    }

    //ERROS NOS INPUTS
    erroCaixaVazia(mensagem, id) {

        $(id).css('border', '1px solid red');
        this.setState({ classMessage: "alert alert-danger" });
        this.setState({ message: mensagem });

    }

    //TIRAR OS ERROS AO DIGITAR NOS INPUTS
    onFocusInput(id) {
        this.setState({ message: "" });
        this.setState({ classMessage: "" });
        $(id).css('border', '1px solid #ced4da');

    }

     //aqui o novaLista vai receber a resposta e a lista vair receber a resposta
     atualizarListagem(novaLista) {

        this.setState({ emailAtual: novaLista });
    }

    editarEmail = () => {
        $.ajax({
            url: `${ipAPI}confeiteiro/email/`+this.props.codConfeiteiro,
            contentType: "application/json",
            headers:{'Authorization':sessionStorage.getItem('auth')},
            type: "put",
            data: sessionStorage.getItem("confirm"),
            success: function (resposta) {
                
                /* setando o state com a reposta, que no caso é o json da api*/
                this.atualizarListagem(resposta.email);
                this.setState({show:false});
                
           }.bind(this)

        });
    }

    render() {
        return (
            <ContainerAdm className="container conteudo-adm">

                <div className="caixa_input center mt-5">
                    <div className={this.state.classMessage} role="alert">
                        <h6 className="text-center">{this.state.message}</h6>
                    </div>

                    <form>
                        <InputEmailSenha grupo="form-group" tipo="email" label="E-mail Atual:" desabilitado="disabled" value={this.state.emailAtual} classeInput="form-control" id="txt_email"></InputEmailSenha>
                        <InputEmailSenha grupo="form-group" onChange={this.setEmailNovo} value={this.state.emailNovo} tipo="email" label="Novo E-mail:" classeInput="form-control" aria-describedby="emailHelp" id="txt_novo_email" placeholder="Digite o seu novo e-mail"></InputEmailSenha>
                        <InputEmailSenha grupo="form-group" onChange={this.setConfirmEmail} value={this.state.confirmEmail} tipo="email" label="Confirme E-mail:" aria-describedby="emailHelp" classeInput="form-control" id="txt_confirmar_email" placeholder="Confirme o seu novo e-mail"></InputEmailSenha>
                    </form>
                    <div className="caixa_botoes center">

                        <button type="button" onClick={this.verificaCampos} className="btn btn-success mr-5">Salvar</button>
                        <button type="button" className="btn btn-danger" >Limpar</button>

                    </div>

                </div>
                
                <Modal show={this.state.show} animation={true} onHide={this.close} id="my-modal" centered>
                    <Modal.Header closeButton>
                    <Modal.Title>Verificação</Modal.Title>

                    </Modal.Header>
                    <form>
                        <Modal.Body>
                            <div className={this.state.classMessage} role="alert">
                                <h6 className="text-center color-danger">{this.state.message}</h6>
                            </div>
                        
                            <InputEmailSenha grupo="form-group" tipo="email" label="E-mail:" classeInput="form-control" aria-describedby="emailHelp" id="txt_email_verificacao" onChange={this.setEmailVerificacao} value={this.state.emailVerificacao} placeholder="Digite seu e-mail"></InputEmailSenha>
                            <InputEmailSenha grupo="form-group"  tipo="password" label="Senha:" aria-describedby="emailHelp" classeInput="form-control" id="txt_senha_verificacao" onChange={this.setSenhaVerificacao} value={this.state.senhaVerificacao} placeholder="Digite sua senha"></InputEmailSenha>
                            
                        </Modal.Body>
                        <Modal.Footer>
                            <button type="button" onClick={this.editarEmail} className="btn btn-success">Salvar</button>
                               
                        </Modal.Footer>
                        </form>  
                </Modal>
            </ContainerAdm>
        );
    }
}

export class BoxTelaEmail extends Component {

    constructor(props){
        super(props)
        this.state={lala:''}
    }

    render() {
        return (
            <div>
                <Header titulo="Configurações do E-mail"></Header>
                <TelaEmail codConfeiteiro={this.props.params.codConfeiteiro}></TelaEmail>
            </div>
        );
    }
}