import React, {Component} from 'react';
import '../../css/cadastro.css';
import img from '../../../../img/user3.png'
import ImgCadastro from '../../ImgCadastro'
import BotaoCadastro from '../../BotaoCadastro'
import {ipAPI} from '../../../../link_config';
import $ from 'jquery';
import {ModalCadastro2} from '../../../Modal';
import { browserHistory} from 'react-router';
import imgVoltar from '../../../../img/voltar.png';
import {Carregando} from '../../../Carregamento'

//Classe da áre de Cadastro do Cliente
class CadastroEndereco extends Component{

    voltar = () => {
        browserHistory.push("/cadastro/profissional/endereco");
    }

    //CONSTRUTOR QUE DECLARA OS ESTADOS
    constructor(props){
        super(props);
        this.state={logradouro:'',complemento:'',numero:'',bairro:'',cep:'',estado:'',foto:'',cidade:'', imgFoto:`${img}`, classMessage:'', message:'', loading:false, botao_invisivel:''};
        
        this.enviaFormEnderecoProfissional = this.enviaFormEnderecoProfissional.bind(this);
    }
    componentDidMount(){
        if(sessionStorage.getItem('endereco') === null){
            this.voltar();
        }
    }

    //PEGAR O ONCHANGE DA FOTO
    setFoto = (evento) => {

        this.onFocusInput("#img");

        //PEGANDO O ARQUIVO DA FOTO
        let file = evento.target.files[0];
        if(evento.target.files[0].size !== null){
            var tamanho = evento.target.files[0].size
        }

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

    //MÉTODO RESPONSÁVEL POR SALVAR O ENDEREÇO RELACIONADO AO PROFISSIONAL
    enviaFormEnderecoProfissional(evento){
        evento.preventDefault();
        this.setState({botao_invisivel:'none'})
        this.setState({loading:true})

        $.ajax({
            url:`${ipAPI}enderecoconfeiteiro`,
            contentType:"application/json",
            dataType:"json",
            type:"post",
            data:JSON.stringify({endereco:JSON.parse(sessionStorage.getItem("endereco")),
                                confeiteiro:JSON.parse(sessionStorage.getItem("dados"))}),

            success: function(resposta){
                this.setState({botao_invisivel:''})
                this.setState({loading:false})
               

                if(this.state.foto !== ""){
                    this.enviarFotoConfeiteiro(resposta.confeiteiro.codConfeiteiro);
                }else{
                    this.cadastroRealizado();
                }
            }.bind(this)               
        });

    }

    //ENVIAR A FOTO JUNTO COM O CODIGO DO CONFEITEIRO
    enviarFotoConfeiteiro=(codigo)=>{

        //PEGA O ARQUIVO DA FOTO E SALVA JUNTO COM O CODIGO DO CLIENTE
        var formDados= new FormData();
        formDados.append('foto', this.state.foto);
        formDados.append('codConfeiteiro', codigo);

        $.ajax({
            url: `${ipAPI}foto/confeiteiro`,
            data: formDados,
            processData: false,
            contentType: false,
            type: 'post',
            success: function(data) 
            {
                sessionStorage.removeItem("endereco")
                sessionStorage.removeItem("dados")
                this.cadastroRealizado();
                // sessionStorage.setItem("key", codigo)
            }.bind(this)
        });
    }

    cadastroRealizado=()=>{
        //ABRIR A MODAL DE CADASTRO REALIZADO
        $('#my-modal').modal('show');
                    
        //AO APERTAR EM "OK" IRÁ REDIRECIONAR PARA A TELA INCIAL DO SITE
        $(".btn-modal").on("click", function(){
           
            browserHistory.push("/login/profissional")
        });
    }

    render(){
        return(
            <div className="container-fluid pt-5 cadastro-cliente">
                <ModalCadastro2 nome="Cadastro efetuado com sucesso!!" alt="Finalizado" title="Finalizado"></ModalCadastro2>
                <div className="container pt-5">
                    <div className="card">
                        <div className="card-header">
                            <img src={imgVoltar} onClick={this.voltar} alt="Voltar" title="Voltar" style={{'width':'50px','height':'45px','float':'left'}}></img><h2 className="mb-4 text-center card-title">Cadastre a sua foto</h2>            
                        </div>
                        <div className="progress">
                            <div className="progress-bar progress-bar-striped progress-bar-animated" role="progressbar" aria-valuenow="75" aria-valuemin="0" aria-valuemax="100" style={{"width": "90%","backgroundColor":"#880e4f"}}></div>
                        </div>
                        <div className="card-body">
                            <div className={this.state.classMessage} role="alert">
                                <h6 className="text-center color-danger">{this.state.message}</h6>
                            </div>
                            <form>
                                <div className="row mb-5">
                                    <ImgCadastro name="file" id="img" onChange={this.setFoto} src={this.state.imgFoto}></ImgCadastro>
                                </div>
                                <div className="row justify-content-center">
                                    <Carregando loading={this.state.loading} message='carregando ...'></Carregando>
                                    <div className="col-xl-2 col-lg-2 col-md-6 col-sm-10 col-8">
                                        <div className="row">
                                            <BotaoCadastro onClick={this.enviaFormEnderecoProfissional} id="Cadastrar"></BotaoCadastro>
                                            
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