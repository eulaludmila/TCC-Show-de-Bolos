import React, {Component} from 'react';
import lupa from '../../../img/lupa.png'
import Header from '../Header'
import {ContainerAdm} from '../../../styles'
import $ from 'jquery'
import axios from 'axios'
import {ipAPI,ipFotos} from '../../../link_config';
import {Link} from 'react-router';
import {ModalDetalhesProduto} from './Modal/'
import {ButtonToolbar} from 'react-bootstrap';
import {CarregandoMaior} from '../../Carregamento'
import {Form, Button, FormControl} from 'react-bootstrap'

export class ProdutosCadastrados extends Component{


    //CONSTRUTOR DECLARANDO OS ESTADOS
    constructor(props){
        super(props);

        this.state = {confeiteiro: "", avaliacao: "", listaProdutos: [], listaPesquisa:[] ,ativoDesativo: "", classAtivo:"btn-success", classDesativo:"btn-danger", showConfirm:false, categoria: "", produto: [], loading:false, pesquisa:''};

    }

    componentDidMount(){
        this.setState({loading:true})

        this.trazerProdutos();
        
    }

    setPesquisa = (evento) =>{

        this.setState({pesquisa:evento.target.value})
        if(evento.target.value === ""){
            this.setState({loading:true})
            this.trazerProdutos()
            this.setState({listaProdutos:[]})
        }

    }

    trazerProdutos = () =>{
        $.ajax({
            url: ipAPI + "produto/confeiteiro/" + this.props.codConfeiteiro,
            dataType: "json",
            headers:{'Authorization':sessionStorage.getItem('auth')},
            type: "get",
            success: function(resposta){

                this.setState({loading:false})

                this.setState({listaProdutos: resposta});

                resposta.map( confeiteiro => 
                    this.setState({confeiteiro : confeiteiro.confeiteiro.nome}))



            }.bind(this)
        })
    }

    // componentDidUpdate(){
    //     alert("lala")
    // }

    atualizarListagemProdutos(novalista){
        this.setState({listaProdutos: novalista});
    }

    close=()=>{
        this.setState({showConfirm:false});
    }

    open(){
  
        this.setState({showConfirm:true});
    }

    detalhes = (codProduto) =>{

        var config = {
            headers: {'Authorization':sessionStorage.getItem('auth')}
        };

        axios.get(ipAPI + "produto/" + codProduto, config)
        .then(resposta => {

            this.setState({produto: resposta.data})
            this.setState({categoria: this.state.produto.categoria.categoria})

            var avaliacao = resposta.data.avaliacao;

            if(avaliacao === 0){
                this.setState({avaliacao: "Seu produto ainda não foi avaliado"})
            } else {
                this.setState({avaliacao: avaliacao + " avaliações"})
            }
           
            

            this.open()
       })
    }


    ativarDesativarProduto(codProduto){

        $.ajax({
            url: ipAPI + "produto/status/" + codProduto,
            dataType: "json",
            headers:{'Authorization':sessionStorage.getItem('auth')},
            type: "put",
            success: function(resposta){

                var dados = `#${resposta.codProduto}`
               
                if(resposta.status === true){
                    // this.setState({listaProdutos: resposta});

                    $(dados).removeClass("btn btn-success")
                    $(dados).addClass("btn btn-danger")
                    $(dados).val("Desativar")
                   
                   
                    
                } else {
                    // this.setState({listaProdutos: resposta});
                    $(dados).removeClass("btn btn-danger")
                    $(dados).addClass("btn btn-success")
                    $(dados).val("Ativar")
                }

                this.trazerProdutos();

            }.bind(this)
        })
    }

    pesquisar = (pesquisa) => {

        var p = this.state.listaProdutos.filter( 
            evento => pesquisa === evento.nomeProduto || pesquisa === evento.descricao
        )


        this.setState({listaProdutos: p})


    }

  render(){
    return (
       
        <ContainerAdm className="container conteudo-adm">

            <div className="card intro">
                <div className="card-body">
                    <h5 className="card-title">Olá {this.state.confeiteiro}!</h5>
                    <p className="card-text">Aqui você tem acesso a lista de produtos que você já cadastrou, você pode editá-los, desativá-los e visualizar os detalhes.</p>
                    <p className="card-text"> Deseja cadastrar um novo produto? </p> 
                    <Link to={"/adm/profissional/cadastro_produtos/" + this.props.codConfeiteiro}><div className="btn btn-cadastrar"> Cadastrar</div></Link>
                </div>
            </div>

            <div style={{'width':'100%', 'marginBottom':'2em','marginTop':'2em'}}>

              <Form style={{'width':'27em','marginLeft':'auto'}}>
                <div style={{'width':'70%','float':'left','marginRight':'17px'}}>
                  <FormControl type="text" placeholder="Pesquisa" onChange={this.setPesquisa} className="mr-sm-2" style={{}}/>
                </div>
                <div >
                  <Button variant="btn btn-cadastrar" onClick={() => this.pesquisar(this.state.pesquisa)}>Pesquisa</Button>
                </div>
              </Form>

            </div>

        
            <div className="form-row">
            <CarregandoMaior loading={this.state.loading} message='carregando ...'></CarregandoMaior>
                <div className="form-group">

                {this.state.listaProdutos.map(produtos =>
                
                <div key={produtos.codProduto} className="card mb-3 mr-3 float-left" style={{maxWidth: '540px'}}>
                    <div className="row no-gutters">
                        <div className="col-md-5">
                        <img src={ipFotos + produtos.foto} title={produtos.nomeProduto} style={{width: '100%',height:'210px'}} className="card-img" alt={produtos.nomeProduto}/>
                        </div>
                        <div className="col-md-7">
                            <div className="card-body">
                                <h5 className="card-title titulo-produto-adm" >{produtos.nomeProduto}</h5>
                                <p className="card-text mb-5 descricao">{produtos.descricao}</p>
                                <div className="botao-centro">
                                    <Link to={"/adm/profissional/cadastro_produtos/" + produtos.codProduto}><button className="btn btn-warning mr-2">Editar</button></Link>
                                    <button className="btn btn-dark  mr-2 " onClick={() => this.detalhes(produtos.codProduto)}><img src={lupa} alt="..." ></img></button>
                                    <input type="button" className={produtos.status === true ? "btn " + this.state.classDesativo :"btn " + this.state.classAtivo} id={produtos.codProduto} onClick={() => this.ativarDesativarProduto(produtos.codProduto)} value={produtos.status === true ? "Desativar" : "Ativar"}/>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                
                )}


                </div>
           

           </div>
                
                <ButtonToolbar>
                    <ModalDetalhesProduto
                        show={this.state.showConfirm}
                        onHide={this.close}
                        codproduto = {this.state.codProduto}
                        descricao = {this.state.produto.descricao}
                        foto = {this.state.produto.foto}
                        preco = {this.state.produto.preco}
                        nome = {this.state.produto.nomeProduto}
                        categoria = {this.state.categoria}
                        avaliacao = {this.state.avaliacao}
                    />
                </ButtonToolbar>


        </ContainerAdm>
			
    );
  }
}

export class BoxCadastroProdutos extends Component{

    constructor(props){
        super(props)
        this.state = {lala:''}
    }

    render(){
      return (
         <div>
            <Header titulo="Seus Produtos"></Header>
            <ProdutosCadastrados codConfeiteiro={this.props.params.codConfeiteiro}></ProdutosCadastrados>
         </div>
          
              
      );
    }
  }

