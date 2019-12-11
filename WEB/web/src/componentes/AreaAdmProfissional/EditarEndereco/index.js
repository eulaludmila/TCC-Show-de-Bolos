import React, {Component} from 'react';
import Header from '../Header';
import {ContainerAdm} from '../../../styles'
import {InputEditarEndereco} from '../global/inputEditarEndereco'
import {BotaoEditarEndereco} from '../global/BotaoEditarEndereco'
import {ModalCadastro} from '../../Modal';
import {ipAPI} from '../../../link_config';
import $ from 'jquery';
import axios from 'axios';
import {ButtonToolbar} from 'react-bootstrap'; 


//Classe da áre de Editar endereço do confeiteiro
export class AreaEditarCadastro extends Component{

    //CONSTRUTOR QUE DECLARA OS ESTADOS
    constructor(props){
        super(props);
        this.state={cep:'',uf:'',numero:'',complemento:'',endereco:'',bairro:'',cidade:'', classMessage:'', message:'', showConfirm:false, codConfeiteiro:sessionStorage.getItem("key")};

        this.enviarFormEditarEndereco = this.enviarFormEditarEndereco.bind(this);

        // console.log(this.props.params.codConfeiteiro)
    }

    //EVENTOS DOS INPUTS
    setCep = (evento) => {
        console.log(evento.target.value);
        this.setState({cep:evento.target.value});
        this.onFocusInput("#cep");

        $("#cep").mask("00000-000");
        this.verificaCep(this.state.cep);
    }

    setEndereco = (evento) =>{
        console.log(evento.target.value);
        this.setState({endereco:evento.target.value});
        this.onFocusInput("#endereco");
    }

    setBairro = (evento) =>{
        this.setState({bairro:evento.target.value});
        this.onFocusInput("#bairro")
    }

    setComplemento = (evento) => {
        this.setState({complemento:evento.target.value});
    }

    setNumero = (evento) => {
        this.setState({numero:evento.target.value});
        this.onFocusInput("#numero");
        $("#cep").mask("0000000");
    }

    setUf = (evento) => {
        this.setState({uf:evento.target.value});
        this.onFocusInput("#uf");
    }

    setCidade = (evento) => {
        console.log(evento.target.value);
        this.setState({cidade:evento.target.value});
        this.onFocusInput("#cidade");
    }


    enviarForm(json){
        // evento.preventDefault();

        // console.log(json)
        $.ajax({
            url: `${ipAPI}endereco/${this.props.codConfeiteiro}`,
            contentType: 'application/json',
            headers:{'Authorization':sessionStorage.getItem('auth')},
            dataType: 'json',
            type: 'put',
            data: JSON.stringify(json),
            success:function(resposta){
                this.setState({showConfirm:true})
                this.props.atualizarEndereco(resposta);
            }.bind(this),
            
        });
    }

    // atualizacaoRealizada = () =>{
    //     //ABRIR A MODAL DE CADASTRO REALIZADO
    //     $('#my-modal').modal('show');
                    
    //     $(".btn-modal").on("click", function(){
    //         browserHistory.push("/adm/profissional/editar_endereco")
    //     });
    // }


    //VALIDAÇÃO DOS CAMPOS DOS INPUTS
    verificaCampos = (evento) => {
        evento.preventDefault();
        var mensagem = "";
        var id = "";

        if(this.state.cep.length < 9){
            mensagem = "CEP inválido";
            id = '#cep';
            this.erroCaixaVazia(mensagem,id);
        }else if(this.state.numero.length === 0){
            mensagem = "Prencha o campo numero";
            id = "#numero";
            this.erroCaixaVazia(mensagem,id);
        }else{
            this.enviarFormEditarEndereco();
        }

    }

    //ERROS NOS INPUTS
    erroCaixaVazia(mensagem,id){

        $(id).css('border', '1px solid red');
        this.setState({classMessage: "alert alert-danger"});
        this.setState({message: mensagem});
        
    }

    //TIRAR OS ERROS AO DIGITAR NOS INPUTS
    onFocusInput = (id) => {
        this.setState({message:""});
        this.setState({classMessage:""});

        //COLOCANDO UMA BORDA VERMELHA NO INPUT
        $(id).css('border', '1px solid #ced4da');
        
    }

    verificaCep = () => {
        
        //VÁRIAVEL PARA PEGAR O VALOR DO CEP
        var cep = $("#cep").val();

        console.log(cep.length);

        //VERIFICANDO SE O CEP É VÁLIDO, SENDO COM 9 NÚMEROS
        if(cep.length === 9){

        //     axios.get(`http://viacep.com.br/ws/${cep}/json/?callback=?`)
        // .then(resposta => {
        //     const endereco = resposta.data;
        //     console.log(resposta)
        //     if(!resposta.erro){
                        
        //         this.setState({uf:resposta.data.uf})
        //         this.setState({cidade:resposta.data.localidade})
        //         this.setState({bairro:resposta.data.bairro})
        //         this.setState({endereco:resposta.data.logradouro})

        //     }else{
        //         alert("CEP não encontrado");
        //     }

        // }).catch((err) => {console.log("AXIOS ERROR: ", err);})

            // REQUISIÇÃO
            $.ajax({
            
                url:`http://viacep.com.br/ws/${cep}/json/?callback=?`,
                dataType:"json",
                
                success: function(resposta){
                    console.log(resposta.uf);

                    //SE NÃO DE ERROR IRÁ MUDAR O ESTADO DOS COMPONENTES
                    if(!resposta.erro){
                        
                        this.setState({uf:resposta.uf})
                        this.setState({cidade:resposta.localidade})
                        this.setState({bairro:resposta.bairro})
                        this.setState({endereco:resposta.logradouro})

                    }else{
                        alert("CEP não encontrado");
                    }
                          
                }.bind(this)

            });
        }

    }

    enviarFormEditarEndereco(){
        let json = {endereco: this.state.endereco,
            numero: this.state.numero,
            complemento: this.state.complemento,
            bairro: this.state.bairro,
            cidade:{cidade:this.state.cidade,estado:{uf:this.state.uf},},
            cep: this.state.cep};

            sessionStorage.setItem('endereco', JSON.stringify(json));

            this.enviarForm(json);

    }

    close=()=>{
        this.setState({showConfirm:false});
    }

    render(){
        return(
            <ContainerAdm className="container conteudo">

                {/* <ModalCadastro nome="Atualização efetuada com sucesso!!"></ModalCadastro> */}
                <ButtonToolbar>
                    <ModalCadastro titulo="Atualização Realizada com sucesso"
                        show={this.state.showConfirm}
                        onHide={this.close}
                    />
                </ButtonToolbar>
                <div className={this.state.classMessage} role="alert">
                    <h6 className="text-center">{this.state.message}</h6>
                </div>

                <form>
                    <div className="form-row mt-5 mr-5 ml-5">
                        <InputEditarEndereco label="CEP:" grupo="form-group col-md-4" tipo="text" classeInput="form-control" id="cep" onChange={this.setCep} value={this.state.cep} placeholder={this.props.cep}></InputEditarEndereco>
                        <InputEditarEndereco label="UF:" disabled="disabled" grupo="form-group col-md-1" tipo="text" classeInput="form-control" id="uf" onChange={this.setUf} value={this.state.uf}  placeholder={this.props.uf} ></InputEditarEndereco>
                        <InputEditarEndereco label="Número" grupo="form-group col-md-3" tipo="number" classeInput="form-control" id="numero" onChange={this.setNumero} value={this.state.numero} placeholder={this.props.numero}></InputEditarEndereco>
                        <InputEditarEndereco label="Complemento:" grupo="form-group col-md-4" tipo="text" classeInput="form-control" id="complemento" onChange={this.setComplemento} value={this.state.complemento} placeholder={this.props.complemento}></InputEditarEndereco>
                    </div>
                    <div className="form-row mr-5 ml-5">
                        <InputEditarEndereco label="Endereço:" disabled="disabled" grupo="form-group col-md-12" tipo="text" classeInput="form-control" id="endereco" onChange={this.setEndereco} value={this.state.endereco} placeholder={this.props.logradouro}></InputEditarEndereco>
                    </div>
                    <div className="form-row mr-5 ml-5">
                        <InputEditarEndereco label="Bairro:" disabled="disabled" grupo="form-group col-md-6" tipo="text" classeInput="form-control" id="bairro" onChange={this.setBairro} value={this.state.bairro} placeholder={this.props.bairro}></InputEditarEndereco>
                        <InputEditarEndereco label="Cidade:" disabled="disabled" grupo="form-group col-md-6" tipo="text" classeInput="form-control" id="cidade" onChange={this.setCidade} value={this.state.cidade} placeholder={this.props.cidade}></InputEditarEndereco>
                    </div>
                    <div className="form-row">
                        <div className="form-group mt-5 centralizar">
                            <BotaoEditarEndereco onClick={this.verificaCampos} id="Salvar" tipo="button" classe="btn btn-success btn_salvar"></BotaoEditarEndereco>
                            <BotaoEditarEndereco id="Cancelar" tipo="button" classe="btn btn-danger"></BotaoEditarEndereco>
                        </div>
                    </div>
                </form>
            </ContainerAdm>
        );
    }
}

export class BoxEditarEndereco extends Component{

    constructor(props){
        super(props);
        this.state = {cep: '',numero:'',complemento:'',logradouro:'',bairro:'',cidade:'', uf:'',codConfeiteiro:sessionStorage.getItem("key")};
        this.atualizarEnderecoAtual = this.atualizarEnderecoAtual.bind(this);
    }
    
    componentDidMount(){
        

        axios.get(`${ipAPI}endereco/confeiteiro/`+this.props.params.codConfeiteiro,{headers: {'Authorization': sessionStorage.getItem('auth')}})
        .then(resposta => {
            const endereco = resposta.data;

            this.setState({cep:endereco.cep});
            this.setState({uf:endereco.cidade.estado.uf});
            this.setState({cidade:endereco.cidade.cidade});
            this.setState({numero:endereco.numero});
            this.setState({logradouro:endereco.endereco});
            this.setState({complemento:endereco.complemento});
            this.setState({bairro:endereco.bairro});


        }).catch((err) => {console.log("AXIOS ERROR: ", err);})
        
    }

    atualizarEnderecoAtual(novoEndereco){
        console.log(novoEndereco)
        this.setState({cep:novoEndereco.cep});
        this.setState({cidade:novoEndereco.cidade.cidade});
        this.setState({uf:novoEndereco.cidade.estado.uf});
        this.setState({numero:novoEndereco.numero});
        this.setState({logradouro:novoEndereco.endereco});
        this.setState({bairro:novoEndereco.bairro});
        this.setState({complemento:novoEndereco.complemento});
    }

    render(){
        return(
            <div>
                <Header titulo="Configurações de Endereço"></Header>
                <AreaEditarCadastro 
                codConfeiteiro={this.props.params.codConfeiteiro}
                cep={this.state.cep} 
                cidade={this.state.cidade}
                uf={this.state.uf}
                bairro={this.state.bairro}
                logradouro={this.state.logradouro}
                numero={this.state.numero}
                complemento={this.state.complemento}
                atualizarEndereco={this.atualizarEnderecoAtual}></AreaEditarCadastro>
            </div>
        );
    }
}