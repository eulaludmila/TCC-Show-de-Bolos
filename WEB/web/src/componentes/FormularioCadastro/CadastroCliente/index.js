import React, {Component} from 'react';
import '../css/cadastro.css';
import img from '../../../img/user3.png'
import InputCadastro from '../InputCadastro'
import SelectSexoCadastro from '../SelectSexoCadastro'
import BotaoCadastro from '../BotaoCadastro'
import ImgCadastro from '../ImgCadastro'
import '../../../css/bootstrap.min.css'
import $ from 'jquery';
import {ModalCadastro2} from '../../Modal';
import 'bootstrap/js/dist/modal';
import { browserHistory} from 'react-router';
import imgClose from '../../../img/close_form.png';
import {ipAPI} from '../../../link_config';
import cpf from 'cpf';
import email from 'email-validator';
import {Carregando} from '../../Carregamento'

//Classe da áre de Cadastro do Cliente
class CadastroCliente extends Component{

    cancelar = () => {
       
        browserHistory.push("/");
    }
    //construtor para a realização do post
    constructor(props){
        super(props);
        this.state={nome:'',sobrenome:'',dtNasc:'',celular:'',cpf:'',sexo:'',email:'',senha:'',confirmSenha:'',foto:'',tamanhoFoto:'', imgFoto:`${img}`,message:"", classMessage:"",loading:false,botao_invisivel:''};
        
        this.enviaFormCliente = this.enviaFormCliente.bind(this);
       
    }

    setFoto = (evento) => {
        this.onFocusInput("#img");

        //PEGANDO O ARQUIVO DA FOTO
        let file = evento.target.files[0];
        if(evento.target.files[0].size !== null){
            var tamanho = evento.target.files[0].size
        }

        //VALIDA O TAMANHO DA FOTO
        if(tamanho < 1048576){

            //SETANDO O ESTADO DA FOTO COM O ARQUIVO
            this.setState({foto:file});
            let reader = new FileReader();

            //PREVIEW DA FOTO
            reader.onloadend = function(){
                $('#img').attr('src', reader.result)
            }

            reader.readAsDataURL(file);
        }else{
            $('#img').attr('src',this.state.imgFoto);
            $("#img").css("border", "solid 2px #880e4f");
            var mensagem = "Tamanho máximo para a foto é de 1MB";
            this.erroCaixaVazia(mensagem);
        }
    }

    /*eventos do input do formulario*/
    setNome = (evento) => {
        console.log(evento.target.value);
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
        console.log(evento.target.value)

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
            mensagem = "O nome deve conter no mínimo 3 caracteres";
            id = "#nome";
            this.erroCaixaVazia(mensagem, id);
        
        }else if(this.state.sobrenome.length < 3){
            mensagem = "O sobrenome deve conter no mínimo 3 caracteres";
            id = "#sobrenome";
            this.erroCaixaVazia(mensagem, id);
        
        }else if(this.state.dtNasc.length !== 10){
            mensagem = "A data de nascimento deve estar no formato correto (00/00/0000)";
            id = "#dt-nasc";
            this.erroCaixaVazia(mensagem, id);
        
        }else if(this.state.celular.length !== 15){
            mensagem = "O celular deve estar no formato correto (00) 00000-0000";
            id = "#celular";
            this.erroCaixaVazia(mensagem, id);
        
        }else if(this.state.cpf.length !== 14){
            mensagem = "O CPF deve estar no formato correto 000.000.000-00";
            id = "#cpf";
            this.setState({cpfValido:""})
            this.erroCaixaVazia(mensagem, id);
        
        
        }else if(this.state.email.length === "" || this.state.email.length < 13 ){
            mensagem = "O campo e-mail deve conter no mínimo 13 caracteres";
            id = "#email";
            this.setState({emailValido:""})
            this.erroCaixaVazia(mensagem, id);
            
        
        }else if(this.state.senha.length < 8){
            mensagem = "A senha deve conter no mínimo 8 caracteres";
            id = "#senha";
            this.erroCaixaVazia(mensagem, id);
        
        }else if(this.state.senha !== this.state.confirmSenha){
            console.log("senha: " + this.state.senha)
            console.log("confirsenha: " + this.state.confirmSenha)
            mensagem = "A confirmação da senha está errada";
            id = "#confirmar-senha";
            this.erroCaixaVazia(mensagem, id);
            
        }else{
            
            this.verificaCpf();

        }

    }


    // MÉTODO PARA VERIFICAR SE JÁ EXISTE O CPF
    verificaCpf=()=>{
        $.ajax({
            url: `${ipAPI}cliente/cpf/${this.state.cpf}`,
            dataType:"json",
            success: function(resposta)
            {
                console.log('repostas:' +resposta);
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
                console.log(resposta);

            }.bind(this)
        });
    }
    
    //MÉTODO PARA VERIFICAR SE JÁ EXISTE O EMAIL
    verificaEmail=()=>{
        $.ajax({
            url: `${ipAPI}/cliente/email/${this.state.email}`,
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
                    this.enviaFormCliente()
                }

            }.bind(this)
        });

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

    //Método que vai salvar os dados do cliente juntamento com o código do seu celular
    enviaFormCliente(){
        this.setState({botao_invisivel:'none'})
        this.setState({loading:true})
        $.ajax({
            url:`${ipAPI}/cliente`,
            contentType:"application/json",
            dataType:"json",
            type:"post",
            data:JSON.stringify({nome:this.state.nome,
                                sobrenome:this.state.sobrenome,
                                dtNasc:this.state.dtNasc,
                                celular:{celular: this.state.celular},
                                cpf:this.state.cpf,
                                email:this.state.email,
                                senha:this.state.senha,
                                sexo:this.state.sexo}),
            success: function(resposta){
                this.setState({botao_invisivel:''})
                this.setState({loading:false})
                
                this.setState({nome:""});
                this.setState({sobrenome:""});
                this.setState({dtNasc:""});
                this.setState({celular:""});
                this.setState({cpf:""});
                this.setState({email:""});
                this.setState({senha:""});
                this.setState({confirmSenha:""});
                // $('#img').attr('src',this.state.imgFoto)

                if(this.state.foto === ""){

                    this.cadastroRealizado();

                }else{
                    console.log(resposta.codCliente)
                    this.enviarFormFoto(resposta.codCliente);
                }
                

            }.bind(this)                 
        });

    }

    enviarFormFoto=(codigo)=>{

        //PEGA O ARQUIVO DA FOTO E SALVA JUNTO COM O CODIGO DO CLIENTE
        console.log(codigo);
        console.log(this.state.foto);
        var formDados= new FormData();
        formDados.append('foto', this.state.foto);
        formDados.append('codCliente', codigo);

        console.log(formDados);


        $.ajax({
            url: `${ipAPI}/foto/cliente`,
            data: formDados,
            processData: false,
            contentType: false,
            type: 'post',
            success: function(data) 
            {
                this.cadastroRealizado();
            }.bind(this)
        });
    }

    cadastroRealizado=()=>{
        //ABRIR A MODAL DE CADASTRO REALIZADO
        $('#my-modal').modal('show');
                    
        //AO APERTAR EM "OK" IRÁ REDIRECIONAR PARA A TELA INCIAL DO SITE
        $(".btn-modal").on("click", function(){
            browserHistory.push("/login/cliente")
        });
    }

    render(){
        return(
            <div className="container-fluid cadastro-cliente">
              
                <ModalCadastro2 nome="Cadastro efetuado com sucesso!!"></ModalCadastro2>
                <div className="container pt-5">
                    <div className="card">
                        <div className="card-header">
                        <img src={imgClose} onClick={this.cancelar} alt="Cancelar" title="Cancelar" style={{'width':'50px','height':'45px','float':'left'}}></img><h2 className="mb-4 text-center card-title">Realize seu cadastro aqui</h2>            
                        </div>
                        <div className="card-body">
                            <div className={this.state.classMessage} role="alert">
                                <h5 className="text-center">{this.state.message}</h5>
                            </div>
                            <form>
                                <div className="row">
                                    <ImgCadastro name="file" id="img" onChange={this.setFoto} src={this.state.imgFoto} ></ImgCadastro>
                                </div>
                                <div className="row mt-5 justify-content-md-center">
                                    <InputCadastro id="nome" type="text" className="form-group col-xl-3 col-lg-3 col-md-4 col-sm-12 col-12" onChange={this.setNome} value={this.state.nome} placeholder=". . ." label="Nome" ></InputCadastro>

                                    <InputCadastro id="sobrenome" type="text" className="form-group col-xl-3 col-lg-3 col-md-4 col-sm-12 col-12" onChange={this.setSobrenome} value={this.state.sobrenome} placeholder=". . ." label="Sobrenome" ></InputCadastro>

                                    <InputCadastro id="dt-nasc" type="text" className="form-group col-xl-3 col-lg-3 col-md-4 col-sm-12 col-12" onChange={this.setDtNasc} value={this.state.dtNasc} placeholder=". . ." label="Data de Nascimento" ></InputCadastro>
                                </div>
                                <div className="row mt-4 justify-content-md-center">
                                    <InputCadastro id="celular" type="text" className="form-group col-xl-3 col-lg-3 col-md-4 col-sm-12 col-12" onChange={this.setCelular} value={this.state.celular} placeholder=". . ." label="Celular" ></InputCadastro>

                                    <InputCadastro id="cpf" type="text" className="form-group col-xl-3 col-lg-3 col-md-4 col-sm-12 col-12" onChange={this.setCpf} value={this.state.cpf} placeholder=". . ." label="CPF" ></InputCadastro>
                                    <SelectSexoCadastro id="sexo" onChange={this.setSexo}></SelectSexoCadastro>
                                </div>
                                <div className="row mt-4 mb-4 justify-content-md-center" >
                                    <InputCadastro id="email" type="email" autocomplete="username" className="form-group col-xl-3 col-lg-3 col-md-4 col-sm-12 col-12" onChange={this.setEmail} value={this.state.email} placeholder=". . ." label="E-mail" ></InputCadastro>

                                    <InputCadastro id="senha" type="password" autocomplete="new-password" className="form-group col-xl-3 col-lg-3 col-md-4 col-sm-12 col-12" onChange={this.setSenha} value={this.state.senha} placeholder=". . ." label="Senha" ></InputCadastro>

                                    <InputCadastro id="confirmar-senha" autocomplete="new-password" className="form-group col-xl-3 col-lg-3 col-md-4 col-sm-12 col-12" type="password" onChange={this.setConfirmSenha} value={this.state.confirmSenha} placeholder=". . ." label="Confirme a senha" ></InputCadastro>
                                </div>

                                <div className="row justify-content-center">
                                    <Carregando loading={this.state.loading} message='carregando ...'></Carregando>
                                    <div className="col-xl-2 col-lg-2 col-md-6 col-sm-10 col-8" style={{'display': this.state.botao_invisivel}}>
                                        <div className="row">
                                             <BotaoCadastro id="Cadastrar" onClick={this.verificaCampos}></BotaoCadastro>
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

export default CadastroCliente;