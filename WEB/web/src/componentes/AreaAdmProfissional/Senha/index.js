import React, {Component} from 'react';
import Header from '../Header';
import {ContainerAdm} from '../../../styles'
import {InputEmailSenha} from '../global/InputEmailSenha';
import $ from 'jquery';
import {ButtonToolbar} from 'react-bootstrap';
import {ModalCadastro} from '../../Modal'
import {ipAPI} from '../../../link_config'

export class TelaSenha extends Component{

    //CONSTRUTOR DECLARANDO OS ESTADOS
    constructor(props){
        super(props);
        this.state={ senhaAtual:'',senhaNova:'',confirmSenha:'',message:"", classMessage:"", codConfeiteiro:sessionStorage.getItem("key"), showConfirm:false};
    }

    

    setSenhaAtual=(evento)=>{
        this.setState({senhaAtual:evento.target.value});
        this.onFocusInput("#txt_senha");
    }

    setSenhaNova=(evento)=>{
        this.setState({senhaNova:evento.target.value});
        this.onFocusInput("#txt_nova_senha");
    }


    setConfirmSenha=(evento)=>{
        this.setState({confirmSenha:evento.target.value});
        this.onFocusInput("#txt_confirmar_senha");
    }

    //VALIDAÇÃO DOS CAMPOS DOS INPUTS
    verificaCampos = (evento) => {
        evento.preventDefault();
        var mensagem = "";
        var id = "";
        
        if(this.state.senhaAtual.length < 8){
            mensagem = "O campo senha atual deve conter no mínimo 8 caracteres";
            id = "#txt_senha";

            this.erroCaixaVazia(mensagem, id);
        
        }else if(this.state.senhaNova.length < 8){
            mensagem = "O campo senha nova deve conter no mínimo 8 caracteres";
            id = "#txt_nova_senha";

            this.erroCaixaVazia(mensagem, id);
        
        }else if(this.state.senhaNova !== this.state.confirmSenha){
            mensagem = "O campo confirmação da senha está errada";
            id = "#txt_confirmar_senha";

            this.erroCaixaVazia(mensagem, id);
            
        }else{
            //VERIFICAR A SENHA ATUAL NO BANCO PARA VER SE BATE
            this.verificaSenhaAtual();
        }


    }

    //ERROS NOS INPUTS
    erroCaixaVazia(mensagem, id){

        $(id).css('border', '1px solid red');
        this.setState({classMessage: "alert alert-danger"});
        this.setState({message: mensagem});

    }

    //TIRAR OS ERROS AO DIGITAR NOS INPUTS
    onFocusInput(id){
        this.setState({message:""});
        this.setState({classMessage:""});
        $(id).css('border', '1px solid #ced4da');

    }

    verificaSenhaAtual=()=>{
        $.ajax({
            url: `${ipAPI}confeiteiro/senha/${this.props.codConfeiteiro}/${this.state.senhaAtual}`,
            dataType:"json",
            headers:{'Authorization':sessionStorage.getItem('auth')},
            success: function(resposta)
            {
                var mensagem = "";
                var id = "";
                if(resposta === 0){
                    mensagem = "A senha atual está incorreta";
                    id = "#txt_senha";
                    this.erroCaixaVazia(mensagem, id);

                }else{

                    this.atualizaSenha();
                }

            }.bind(this)
        })
    }

    atualizaSenha=()=>{
        $.ajax({
            url: `${ipAPI}confeiteiro/senha/${this.props.codConfeiteiro}`,
            contentType:"application/json",
            dataType:"json",
            headers:{'Authorization':sessionStorage.getItem('auth')},
            type:"put",
            data:this.state.senhaNova,
            success: function(resposta)
            {
                this.setState({showConfirm:true});
                this.setState({senhaAtual:""});
                this.setState({senhaNova:""});
                this.setState({confirmSenha:""});

            }.bind(this)
        })
    }


    close=()=>{
        this.setState({showConfirm:false});
    }


    render(){
        return(
            <ContainerAdm className="container conteudo-adm">
                <div className="caixa_input center mt-5">
                    <div className={this.state.classMessage} role="alert">
                        <h6 className="text-center">{this.state.message}</h6>
                    </div>
                    <form>
                        <InputEmailSenha grupo="form-group" onChange={this.setSenhaAtual} value={this.state.senhaAtual} tipo="password" label="Senha Atual:" classeInput="form-control" id="txt_senha" placeholder="Digite sua senha atual"></InputEmailSenha>
                        <InputEmailSenha grupo="form-group" onChange={this.setSenhaNova} value={this.state.senhaNova} tipo="password" label="Nova Senha:" classeInput="form-control" aria-describedby="emailHelp" id="txt_nova_senha" placeholder="Digite a sua nova senha"></InputEmailSenha>
                        <InputEmailSenha grupo="form-group" onChange={this.setConfirmSenha} value={this.state.confirmSenha} tipo="password" label="Confirme Senha:" aria-describedby="emailHelp" classeInput="form-control" id="txt_confirmar_senha" placeholder="Confirme a sua nova senha"></InputEmailSenha>
                        
                        <div className="caixa_botoes center">
                            <button type="button" onClick={this.verificaCampos} className="btn btn-success mr-5">Salvar</button>
                            <button type="button" className="btn btn-danger">Cancelar</button>
                        </div>
                    </form>

                </div>

                <ButtonToolbar>
                    <ModalCadastro titulo="Atualização Realizada com sucesso"
                        show={this.state.showConfirm}
                        onHide={this.close}
                    />
                </ButtonToolbar>

		    </ContainerAdm>
        );
    }
}

export class BoxTelaSenha extends Component{
    constructor(props){
        super(props)
        this.state={status:''}
    }
    render(){
        return(
            <div>
                <Header titulo="Configurações de Senha"></Header>
                <TelaSenha codConfeiteiro={this.props.params.codConfeiteiro}></TelaSenha>
            </div>
        );
    }
}