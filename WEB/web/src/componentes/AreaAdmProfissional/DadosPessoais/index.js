import React, {Component} from 'react';
import Header from '../Header';
import {ContainerAdm} from '../../../styles'
import {InputEditarDados} from '../global/InputEditarDados'
import {BotaoEditarDados} from '../global/BotaoEditarDados'
import {SelectDadosPessoais} from './SelectSexoDadosPessoais'
import {ImgAtualizar} from './ImgAtualizar'
import $ from 'jquery';
import {ModalCadastro} from '../../Modal';
import {ButtonToolbar} from 'react-bootstrap'
import {ipAPI, ipFotos} from '../../../link_config';
import img from '../../../img/baker.png'
import axios from 'axios';

export class AreaEditarDadosPessoais extends Component{

    constructor(props){
        super(props);

        this.state={nome:'',sobrenome:'',celular:'',dtNasc:'',cpf:'',sexo:'',foto:'',tamanhoFoto:'',message:"",imgFoto:"",showConfirm:false, classMessage:""};
        // this.setNome = this.setNome.bind(this);
    
    }

    componentDidMount(){

        axios.get(`${ipAPI}confeiteiro/`+this.props.codConfeiteiro,{headers: {'Authorization': sessionStorage.getItem('auth')}})
        .then(resposta => {
            const dados = resposta.data;

            this.setState({nome:dados.nome});
            this.setState({sobrenome:dados.sobrenome});
            this.setState({celular:dados.celular.celular});
            this.setState({dtNasc:dados.dtNasc});
            this.setState({cpf:dados.cpf});
            this.setState({sexo:dados.sexo});

            if(dados.foto !== null){
                this.setState({imgFoto:ipFotos + dados.foto});
            }else{
                this.setState({imgFoto:img});
            }

        }).catch((err) => {console.log("AXIOS ERROR: ", err);})
    
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
        this.setState({nome:evento.target.value});
        this.onFocusInput("#nome");
    }

    setSobrenome = (evento) => {
        this.setState({sobrenome:evento.target.value});
        this.onFocusInput("#sobrenome");
    }

    setCelular = (evento) => {
        this.setState({celular:evento.target.value});
        this.onFocusInput("#celular");
        $("#celular").mask("(00) 00000-0000");
    }

    setDtNasc = (evento) => {
        this.setState({dtNasc:evento.target.value});
        this.onFocusInput("#dt-nasc");
        $("#dtNasc").mask("00/00/0000");
    }

    setSexo = (evento) => {
        this.setState({sexo:evento.target.value});
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
        
        }else{

            this.enviarForm();

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

    //Método que vai atualizar os dados do confeiteiro

    enviarForm(){
        // evento.preventDefault();

        let json = {codConfeiteiro:this.props.codConfeiteiro,
            nome: this.state.nome,
            sobrenome: this.state.sobrenome,
            celular: {celular:this.state.celular},
            sexo: this.state.sexo,
            dtNasc: this.state.dtNasc};


        // axios.put(`${ipAPI}confeiteiroDTO/${this.props.codConfeiteiro}`, JSON.stringify(json), 
        // {headers: {'Authorization': sessionStorage.getItem('auth')}})
        // .then((res) => {
        //     let dados = res.dados

        //     this.setState({nomeProduto:""});
        //     this.setState({descricaoProduto:""});
        //     this.setState({qtdeMin:""});
        //     this.setState({qtdeMax:""});
        //     this.setState({precoProduto:""});
        //     this.enviaFormFotoProduto(res.codProduto);
        // })
        // .catch((err) => {console.log("AXIOS ERROR: ", err);})



        $.ajax({
            url: `${ipAPI}confeiteiroDTO/${this.props.codConfeiteiro}`,
            contentType: "application/json",
            dataType: "json",
            headers:{'Authorization':sessionStorage.getItem('auth')},
            type: "put",
            data: JSON.stringify(json),
            success:function(resposta){

                // this.props.dadosConfeiteiroAtual(resposta);

                if(this.state.foto === ""){

                    this.open();

                }else{
                    this.enviarFormFoto(resposta.codConfeiteiro);
                }

                this.atualizarDadosPessoais(resposta);


            }.bind(this),error:function(resposta){
            }


            
        });
    }

    enviarFormFoto=(codigo)=>{

        //PEGA O ARQUIVO DA FOTO E SALVA JUNTO COM O CODIGO DO CONFEITEIRO

        var formDados= new FormData();
        formDados.append('foto', this.state.foto);
        formDados.append('codConfeiteiro', codigo);



        $.ajax({

            url: `${ipAPI}foto/confeiteiro`,
            data: formDados,
            processData: false,
            contentType: false,
            type: 'put',

            success: function(data) 
            {
                this.open();
            }.bind(this)
        });
    }

    close=()=>{
        this.setState({showConfirm:false});
    }

    open=()=>{
        this.setState({showConfirm:true});
    }

    atualizarDadosPessoais(dados){
        this.setState({nome:dados.nome});
        this.setState({sobrenome:dados.sobrenome});
        this.setState({celular:dados.celular.celular});
        this.setState({sexo:dados.sexo});
        this.setState({dtNasc:dados.dtNasc});
        this.setState({ingFoto:dados.foto});
    }


    render(){
        return(
            <ContainerAdm className="container conteudo">
                {/* <ModalCadastro nome="Atualização dos dados pessoais efetuado com sucesso!!" alt="Atualizado" title="Atualizado"></ModalCadastro> */}
                <form>
                    <div id="caixa_imagem" className="centralizar">

                        <ImgAtualizar classe="imagem_confeiteiro" name="file" id="img"  src={this.state.imgFoto} ></ImgAtualizar>
                        <InputEditarDados classe="input_imagem" tipo="file"  onChange={this.setFoto}  classeInput="form-control-file"></InputEditarDados>
                    </div>
                    <div className="form-row mt-5">
                        <InputEditarDados classe="form-group col-md-4" label="Nome:" tipo="text" classeInput="form-control" id="nome" onChange={this.setNome} value={this.state.nome} placeholder="Digite o seu nome">{this.state.nome}</InputEditarDados>

                        <InputEditarDados classe="form-group col-md-4" label="Sobrenome:" tipo="text" classeInput="form-control" id="sobrenome" onChange={this.setSobrenome} value={this.state.sobrenome} placeholder="Digite o seu sobrenome"></InputEditarDados>
                        <InputEditarDados classe="form-group col-md-4" label="Celular:" tipo="text" classeInput="form-control" id="celular" onChange={this.setCelular} value={this.state.celular} placeholder="(00) 00000-0000"></InputEditarDados>
                    </div>
                    <div className="form-row">

                        <SelectDadosPessoais id="sexo" onChange={this.setSexo} value={this.state.sexo}></SelectDadosPessoais>

                        <InputEditarDados classe="form-group col-md-4" disable="disable" label="CPF:" tipo="text" classeInput="form-control" id="cpf" onChange={this.setCpf} value={this.state.cpf} desabilitado="disabled"></InputEditarDados>
                        <InputEditarDados classe="form-group col-md-4" label="Data de Nascimento::" tipo="text" classeInput="form-control" id="dtNasc" onChange={this.setDtNasc} value={this.state.dtNasc} placeholder="00/00/0000"></InputEditarDados>
                        
                        <div className="form-group mt-5 centralizar">
                        <BotaoEditarDados onClick={this.verificaCampos} id="Salvar" tipo="button" classe="btn btn-success btn_salvar"></BotaoEditarDados>
                        <BotaoEditarDados  id="Cancelar" tipo="button" classe="btn btn-danger"></BotaoEditarDados>

                        </div>
                    </div>
                </form>

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

export class BoxEditarDadosPessoais extends Component{
    constructor(props){
        super(props)
        this.state={status:''}
    }
    render(){
        return(
            
            <div>
                <Header titulo="Dados Pessoais"></Header>
                <AreaEditarDadosPessoais codConfeiteiro={this.props.params.codConfeiteiro}></AreaEditarDadosPessoais>
            </div>
        )
    }
} 

