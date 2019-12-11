import React, {Component} from 'react';
import '../../css/cadastro.css';
import InputCadastro from '../../InputCadastro'
import BotaoCadastro from '../../BotaoCadastro'
import $ from 'jquery';
import { browserHistory} from 'react-router';
import imgVoltar from '../../../../img/voltar.png';

//Classe da áre de Cadastro do Cliente
class CadastroEndereco extends Component{

    voltar = () => {
        browserHistory.push("/cadastro/profissional");
    }

    //CONSTRUTOR QUE DECLARA OS ESTADOS
    constructor(props){
        super(props);
        this.state={logradouro:'',complemento:'',numero:'',bairro:'',cep:'',estado:'',cidade:'', classMessage:'', message:''};
        
    }

    componentDidMount(){
        if(sessionStorage.getItem('endereco') != null){

            var dados = JSON.parse(sessionStorage.getItem('endereco'));
            this.setState({logradouro:dados.endereco,
                complemento:dados.complemento,
                numero:dados.numero,
                bairro:dados.bairro,
                cep:dados.cep,
                estado:dados.cidade.estado.uf,
                cidade:dados.cidade.cidade});
        }else if(sessionStorage.getItem('dados') == null){
            this.voltar();
        }

        sessionStorage.removeItem('endereco')
    }

    //EVENTOS DOS INPUTS
    setCep = (evento) => {
        this.setState({cep:evento.target.value});
        this.onFocusInput("#cep");

        $("#cep").mask("00000-000");
        this.verificaCep(this.state.cep);
        
    }

    setLogradouro = (evento) => {
        this.setState({logradouro:evento.target.value});
        this.onFocusInput("#logradouro");
    }

    setComplemento = (evento) => {
        this.setState({complemento:evento.target.value});
    }

    setNumero = (evento) => {
        this.setState({numero:evento.target.value});
        this.onFocusInput("#numero");
        $("#cep").mask("0000000");
    }

    setBairro = (evento) => {
        this.setState({bairro:evento.target.value});
        this.onFocusInput("#bairro");
    }
    
    setEstado = (evento) => {
        this.setState({estado:evento.target.value});
        this.onFocusInput("#estado");
    }

    setCidade = (evento) => {
        console.log(evento.target.value);
        this.setState({cidade:evento.target.value});
        this.onFocusInput("#cidade");
    }

     //VALIDAÇÃO DOS CAMPOS DOS INPUTS
     verificaCampos = (evento) => {
        evento.preventDefault();
        var mensagem = "";
        var id= "";
        
        if(this.state.cep.length < 9){
            mensagem = "O CEP inválido";
            id = '#cep';
            this.erroCaixaVazia(mensagem,id);
            
        }else if(this.state.numero.length === 0){
            mensagem = "Prencha o campo numero";
            id = "#numero";
            this.erroCaixaVazia(mensagem,id);
        
        }else{
            this.enviarFormEndereco();
        }


    }

    //ERROS NOS INPUTS
    erroCaixaVazia(mensagem,id){

        $(id).css('border', '1px solid #880e4f');
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

            //REQUISIÇÃO
            $.ajax({
            
                url:`http://viacep.com.br/ws/${cep}/json/?callback=?`,
                dataType:"json",
                
                success: function(resposta){
                    console.log(resposta.uf);

                    //SE NÃO DE ERROR IRÁ MUDAR O ESTADO DOS COMPONENTES
                    if(!resposta.erro){

                        this.setState({logradouro: resposta.logradouro})
                        this.setState({bairro:resposta.bairro})
                        this.setState({cidade:resposta.localidade})
                        this.setState({estado:resposta.uf})

                    }else{
                        alert("CEP não encontrado");
                    }
                    
                }.bind(this)
            });
        }
    }


    //MÉTODO PARA SALVAR O ENDERECO
    enviarFormEndereco = ()=>{

        //JSON COMPLETO COM O ENDEREÇO, CIDADE E ESTADO, JSON MONTADO
        let json = {endereco: this.state.logradouro,
            numero: this.state.numero,
            complemento: this.state.complemento,
            bairro: this.state.bairro,
            cidade:{ cidade:this.state.cidade,estado: {uf:this.state.estado},},
            cep: this.state.cep};
        
        sessionStorage.setItem('endereco', JSON.stringify(json));

        //FAZENDO UM LINK PARA A ROTA
        browserHistory.push("/cadastro/profissional/foto");

    }

    render(){
        return(
            <div className="container-fluid pt-5 cadastro-cliente">
                <div className="container pt-5">
                    <div className="card">
                        <div className="card-header">
                            <img src={imgVoltar} onClick={this.voltar} alt="Voltar" title="Voltar" style={{'width':'50px','height':'45px','float':'left'}}></img><h2  className="mb-4 text-center card-title">Cadastro de endereço</h2>            
                        </div>
                        <div className="progress">
                            <div className="progress-bar progress-bar-striped progress-bar-animated" role="progressbar" aria-valuenow="75" aria-valuemin="0" aria-valuemax="100" style={{"width": "60%","backgroundColor":"#880e4f"}}></div>
                        </div>
                        <div className="card-body">
                        
                            <div className={this.state.classMessage} role="alert">
                                <h6 className="text-center color-danger">{this.state.message}</h6>
                            </div>
                            <form>
                                <div className="row mt-5 justify-content-md-center">
                                    <InputCadastro id="cep" className="form-group col-xl-2 col-lg-2 col-md-4 col-sm-12 col-12" type="text" onChange={this.setCep} value={this.state.cep} placeholder=". . ." label="CEP" ></InputCadastro>
                                    
                                    <InputCadastro id="logradouro" disabled="disabled" className="form-group col-xl-3 col-lg-3 col-md-4 col-sm-12 col-12" type="text" onChange={this.setLogradouro} value={this.state.logradouro} label="Logradouro" ></InputCadastro>

                                    <InputCadastro id="bairro" disabled="disabled" className="form-group col-xl-3 col-lg-3 col-md-4 col-sm-12 col-12" type="celular" onChange={this.setBairro} value={this.state.bairro} label="Bairro" ></InputCadastro>

                                </div>
                                <div className="row mt-4 justify-content-md-center mb-4">
                                    <InputCadastro id="numero" className="form-group col-xl-1 col-lg-3 col-md-4 col-sm-12 col-12" type="text" onChange={this.setNumero} value={this.state.numero} placeholder=". . ." label="Número" ></InputCadastro>

                                    <InputCadastro id="complemento" className="form-group col-xl-3 col-lg-3 col-md-4 col-sm-12 col-12" type="text" onChange={this.setComplemento} value={this.state.complemento} placeholder=". . ." label="Complemento" ></InputCadastro>

                                    
                                    <InputCadastro readOnly id="estado" disabled="disabled" className="form-group col-xl-1 col-lg-3 col-md-4 col-sm-12 col-12" type="text" onChange={this.setEstado} value={this.state.estado}  label="UF" ></InputCadastro>
                                    
                                    <InputCadastro readOnly id="cidade" disabled="disabled" className="form-group col-xl-3 col-lg-3 col-md-4 col-sm-12 col-12" type="email" onChange={this.setCidade} value={this.state.cidade}  label="Cidade" ></InputCadastro>

                                    </div>

                                <div className="row justify-content-center">
                                    <div className="col-xl-2 col-lg-2 col-md-6 col-sm-10 col-8" style={{'display': this.state.botao_invisivel}}>
                                        <div className="row">
                                            <BotaoCadastro onClick={this.verificaCampos} id="Próximo"></BotaoCadastro>
                                            
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

export default CadastroEndereco;