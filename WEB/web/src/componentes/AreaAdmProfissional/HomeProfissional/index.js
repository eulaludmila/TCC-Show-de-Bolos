import React, {Component} from 'react';
import Header from '../Header'
import {ContainerAdm} from '../../../styles'
import { ipAPI, ipFotos } from '../../../link_config';
import axios from 'axios'
import Estrelas from 'react-star-ratings'
import {Carregando} from '../../Carregamento'
import {Link} from 'react-router'


export class HomeProfissional extends Component{

    //CONSTRUTOR DECLARANDO OS ESTADOS
    constructor(props){
      super(props);

      this.state = {listaProdutos: [], loading:false};

  }

  componentDidMount(){
    this.setState({loading:true})
    axios.get(`${ipAPI}produto/confeiteiro/`+this.props.codConfeiteiro,{headers: {'Authorization': sessionStorage.getItem('auth')}})
        .then(resposta => {
          this.setState({loading:false})
            const produtos = resposta.data;
            this.setState({listaProdutos: produtos})
            
        })
      
  }

  atualizarListagemProdutos(novalista){
      this.setState({listaProdutos: novalista});
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
            
          <Carregando loading={this.state.loading} message='carregando ...'></Carregando>
          {this.state.listaProdutos.map(produtos =>
              <div key={produtos.codProduto} className="card text-center float-left mb-5 mr-3 ml-3" style={{width: '15rem'}}>
              <img className="card-img-top imagens-bolos" src={ipFotos + produtos.foto} alt={produtos.nomeProduto} title={produtos.nomeProduto}/>
              <div className="card-body">
                <h5 className="card-title nome-bolo-adm">{produtos.nomeProduto}</h5>
                <p className="card-text">R${produtos.preco.toFixed(2)}</p>
                <div className="avaliacao">
                <Estrelas starDimension="25px" starRatedColor="#fcba03" starEmptyColor="#dedede" starSpacing="1px" rating={produtos.avaliacao} numberOfStars={5}></Estrelas>
                </div>
              </div>
            </div> 
            )}

        
          {/* */}
        </ContainerAdm>
			
    );
  }
}

export class BoxHomeProfissional extends Component{

  constructor(props){
    super(props)
      this.state={status:''}
  }
  
  render(){
    return (
       
        <div>
          <Header titulo="Área Administrativa"></Header>
          <HomeProfissional codConfeiteiro={this.props.params.codConfeiteiro}></HomeProfissional>
        </div>
			
    );
  }
}

