import React, {Component} from 'react';
import '../css/cadastro.css';
import img from '../../../img/user3.png'
import InputCadastro from '../InputCadastro'
import SelectSexoCadastro from '../SelectSexoCadastro'
import BotaoCadastro from '../BotaoCadastro'
import imgClose from '../../../img/close_form.png';
import {ipAPI} from '../../../link_config';
import '../../../css/bootstrap.min.css'
import $ from 'jquery';
import { browserHistory} from 'react-router';
import cpf from 'cpf';
import email from 'email-validator';


//CLASSE RESPONSÁVEL PELO CADASTRO DO CLIENTE
class CadastroProfissional extends Component{

    cancelar = () => {
        sessionStorage.removeItem('dados');
        sessionStorage.removeItem('endereco');
        browserHistory.push("/");
    }

    //CONSTRUTOR DECLARANDO OS ESTADOS
    constructor(props){
        super(props);
        this.state={ nome:'',sobrenome:'',dtNasc:'',celular:'',cpf:'',sexo:'',email:'',senha:'',confirmSenha:'',message:"", classMessage:""};
        
    }

    componentDidMount(){
        if(sessionStorage.getItem('dados') != null){

            var dados = JSON.parse(sessionStorage.getItem('dados'));
            this.setState({nome:dados.nome,
                sobrenome:dados.sobrenome,
                dtNasc:dados.dtNasc,
                celular:dados.celular.celular,
                cpf:dados.cpf,
                email:dados.email,
                sexo:dados.sexo});

                sessionStorage.removeItem('dados')
        }
    }

    /*EVENTOS DOS INPUTS*/
    setNome = (evento) => {
        this.setState({nome:evento.target.value});
        this.onFocusInput("#nome");
    }

    setSobrenome = (evento) => {
        this.setState({sobrenome:evento.target.value});
        this.onFocusInput("#sobrenome");
    }

    setDtNasc = (evento) => {
        this.setState({dtNasc:evento.target.value});
        this.onFocusInput("#dt-nasc");
        $("#dt-nasc").mask("00/00/0000");
    }

    setCelular = (evento) => {
        this.setState({celular:evento.target.value});
        this.onFocusInput("#celular");
        $("#celular").mask("(00) 00000-0000");
    }
    
    setCpf = (evento) => {
        this.setState({cpf:evento.target.value});
        if(cpf.isValid(evento.target.value) === false){
            var mensagem = "CPF é inválido";
            var id = "#cpf";
            this.erroCaixaVazia(mensagem, id);
        }else{
            this.onFocusInput("#cpf");
        }

        $("#cpf").mask("000.000.000-00");
    }

    setSexo = (evento) => {
        console.log(evento.target.value);
        this.setState({sexo:evento.target.value});
    }

    setEmail = (evento) => {
        this.setState({email:evento.target.value});
        if(email.validate(evento.target.value) === false){
            var mensagem = "Email é inválido";
            var id = "#email";
            this.erroCaixaVazia(mensagem, id);
        }else{
            this.onFocusInput("#email");
        }
    }
    
    setSenha = (evento) => {
        this.setState({senha:evento.target.value});
        this.onFocusInput("#senha");
    }
    setConfirmSenha = (evento) => {
        this.setState({confirmSenha:evento.target.value});
        this.onFocusInput("#confirmSenha");
    }

    //VALIDAÇÃO DOS CAMPOS DOS INPUTS
    verificaCampos = (evento) => {
        evento.preventDefault();
        var mensagem = "";
        var id = "";
        
        if(this.state.nome.length < 3){
            mensagem = "O campo nome deve conter no mínimo 3 caracteres";
            id = "#nome";

            this.erroCaixaVazia(mensagem, id);
        
        }else if(this.state.sobrenome.length < 3){
            mensagem = "O campo sobrenome deve conter no mínimo 3 caracteres";
            id = "#sobrenome";

            this.erroCaixaVazia(mensagem, id);
        
        }else if(this.state.dtNasc.length !== 10){
            mensagem = "O campo data de nascimento deve estar no formato correto";
            id = "#dt-nasc";

            this.erroCaixaVazia(mensagem, id);
        
        }else if(this.state.celular.length !== 15){
            mensagem = "O campo celular deve estar no formato correto";
            id = "#celular";

            this.erroCaixaVazia(mensagem, id);
        
        }else if(this.state.cpf.length !== 14){
            mensagem = "O campo CPF deve estar no formato correto";
            id = "#cpf";

            this.erroCaixaVazia(mensagem, id);
        
        }else if(this.state.email.length === "" || this.state.email.length < 13 ){
            mensagem = "O campo e-mail deve ter no mínimo 13 caracteres";
            id = "#email";

            this.erroCaixaVazia(mensagem, id);
            
        }else if(this.state.senha.length < 8){
            mensagem = "O campo senha deve conter no mínimo 8 caracteres";
            id = "#senha";

            this.erroCaixaVazia(mensagem, id);
        
        }else if(this.state.senha !== this.state.confirmSenha){
            mensagem = "O campo confirmação da senha está errada";
            id = "#confirmar-senha";

            this.erroCaixaVazia(mensagem, id);
            
        }else{
            this.verificaCpf();
        }


    }

    // MÉTODO PARA VERIFICAR SE JÁ EXISTE O CPF
    verificaCpf(){
        console.log("verifica")
        $.ajax({
            url: `${ipAPI}confeiteiro/cpf/${this.state.cpf}`,
            dataType:"json",
            success: function(resposta)
            {
                var mensagem = "";
                var id = "";

                //SE EXISTE VAI RETORNA UM ERRO E O INPUT FICARÁ VERMELHO
                if(resposta === 1){
                    mensagem = "Esse CPF já está cadastrado";
                    id = "#cpf";
                    this.erroCaixaVazia(mensagem, id);

                //SENÃO IREI SETAR O ESTADO cpfValido E VERIFICAR NOVAMENTE
                }else{

                    this.verificaEmail();
                }

            }.bind(this)
        });
    }
    
    //MÉTODO PARA VERIFICAR SE JÁ EXISTE O EMAIL
    verificaEmail(){
        console.log("verifica")
        $.ajax({
            url: `${ipAPI}confeiteiro/email/${this.state.email}`,
            dataType:"json",
            success: function(resposta)
            {
                var mensagem = "";
                var id = "";
                if(resposta === 1){
                    mensagem = "Esse e-mail já está cadastrado no sistema";
                    id = "#email";
                    this.erroCaixaVazia(mensagem, id);

                }else{

                    this.enviaFormConfeiteiro();
                }

            }.bind(this)
        });

    }

    //ERROS NOS INPUTS
    erroCaixaVazia= (mensagem, id) =>{

        $(id).css('border', '1px solid #880e4f');
        this.setState({classMessage: "alert alert-danger"});
        this.setState({message: mensagem});

    }

    //TIRAR OS ERROS AO DIGITAR NOS INPUTS
    onFocusInput = (id) =>{
        this.setState({message:""});
        this.setState({classMessage:""});
        $(id).css('border', '1px solid #ced4da');

    }

    //MÉTODO QUE IRÁ SALVAR OS DADOS DO PROFISSIONAL JUNTO AO CELULAR
    enviaFormConfeiteiro = () =>{

        let json = {nome:this.state.nome,
                    sobrenome:this.state.sobrenome,
                    dtNasc:this.state.dtNasc,
                    celular:{celular: this.state.celular},
                    cpf:this.state.cpf,
                    email:this.state.email,
                    senha:this.state.senha,
                    sexo:this.state.sexo};

        //SETANDO O JSON COMPLETO NO SESSIONSTORAGE
        sessionStorage.setItem('dados', JSON.stringify(json));

        //FAZENDO UM LINK PARA A ROTA
        browserHistory.push("/cadastro/profissional/endereco");

    }

    render(){
        return(
            <div className="container-fluid pt-5 cadastro-cliente">
                
                <div className="container pt-5">
                    <div className="card">
                        <div className="card-header">
                        <img src={imgClose} onClick={this.cancelar} alt="Cancelar" title="Cancelar" style={{'width':'50px','height':'45px','float':'left'}}></img><h2 className="mb-4 text-center card-title">Realize seu cadastro aqui</h2>            
                        </div>
                        <div className="progress">
                            <div className="progress-bar progress-bar-striped progress-bar-animated" role="progressbar" aria-valuenow="75" aria-valuemin="0" aria-valuemax="100" style={{"width": "10%","backgroundColor":"#880e4f"}}></div>
                        </div>
                        <div className="card-body">
                            <div className={this.state.classMessage} role="alert">
                                <h6 className="text-center">{this.state.message}</h6>
                            </div>
                            
                            <form onSubmit={this.verificaCampos}>
                                
                                <div className="row mt-5 justify-content-md-center">
                                    <InputCadastro id="nome" className="form-group col-xl-3 col-lg-3 col-md-4 col-sm-12 col-12" type="text" onChange={this.setNome} value={this.state.nome} placeholder=". . ." label="Nome" ></InputCadastro>

                                    <InputCadastro id="sobrenome" type="text" className="form-group col-xl-3 col-lg-3 col-md-4 col-sm-12 col-12" onChange={this.setSobrenome} value={this.state.sobrenome} placeholder=". . ." label="Sobrenome" ></InputCadastro>

                                    <InputCadastro id="dt-nasc" type="dt-nasc" className="form-group col-xl-3 col-lg-3 col-md-4 col-sm-12 col-12" onChange={this.setDtNasc} value={this.state.dtNasc} placeholder=". . ." label="Data de Nascimento" ></InputCadastro>
                                </div>
                                <div className="row mt-4 justify-content-md-center">
                                    <InputCadastro id="celular" type="celular" className="form-group col-xl-3 col-lg-3 col-md-4 col-sm-12 col-12" onChange={this.setCelular} value={this.state.celular} placeholder=". . ." label="Celular" ></InputCadastro>

                                    <InputCadastro id="cpf" type="cpf" className="form-group col-xl-3 col-lg-3 col-md-4 col-sm-12 col-12" onChange={this.setCpf} value={this.state.cpf} placeholder=". . ." label="CPF" ></InputCadastro>
                                    <SelectSexoCadastro id="sexo" onChange={this.setSexo} value={this.state.sexo}></SelectSexoCadastro>
                                </div>
                                <div className="row mt-4 mb-4 justify-content-md-center" >
                                    <InputCadastro id="email" type="email" autocomplete="username" className="form-group col-xl-3 col-lg-3 col-md-4 col-sm-12 col-12" onChange={this.setEmail} value={this.state.email} placeholder=". . ." label="E-mail" ></InputCadastro>

                                    <InputCadastro id="senha" autocomplete="new-password" type="password" className="form-group col-xl-3 col-lg-3 col-md-4 col-sm-12 col-12" onChange={this.setSenha} value={this.state.senha} placeholder=". . ." label="Senha" ></InputCadastro>

                                    <InputCadastro id="confirmar-senha" type="password" autocomplete="new-password" className="form-group col-xl-3 col-lg-3 col-md-4 col-sm-12 col-12" onChange={this.setConfirmSenha} value={this.state.confirmSenha} placeholder=". . ." label="Confirme a senha" ></InputCadastro>
                                </div>

                                <div className="row justify-content-center">
                                    <div className="col-xl-2 col-lg-2 col-md-6 col-sm-10 col-8" style={{'display': this.state.botao_invisivel}}>
                                        <div className="row">
                                            <BotaoCadastro id="Próximo" type='submit'></BotaoCadastro>
                                        </div>
                                    </div>
                                </div>
                            </form>  
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default CadastroProfissional;