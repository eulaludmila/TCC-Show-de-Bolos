import React, { Component } from 'react';
import axios from 'axios';
import { ipAPI } from '../../../../../../link_config';
import {ipFotos} from '../../../../../../link_config';
import Estrelas from 'react-star-ratings';
import { Link } from 'react-router';

export default class Produtos extends Component{

    constructor(props){
        super(props);

        this.state = {listaProdutos: []};
    }
    
    componentDidMount(){

        axios.get(`${ipAPI}produto/melhoravaliados/${this.props.codConfeiteiro}`)
        .then(resposta => {
            const produtos = resposta.data;

            this.setState({listaProdutos: produtos})

        })
    }

    render(){
        return(
            <div className="container">
                <hr className="mb-5"></hr>
                <div className="row d-flex justify-content-center">
                {this.state.listaProdutos.map(produto => 
                    <div key={produto.codProduto} className="card_produto">
                        <Link to={"/descricao/" + produto.codProduto}>
                            <div className="card text-center mb-5" style={{'width': '14rem'}}>
                                <img className="card-img-top imagens-bolos" src={ipFotos+produto.foto} alt={produto.nomeProduto} title={produto.nomeProduto}/>
                                <div className="card-body">
                                
                                    <h5 className="card-title nome_bolo">{produto.nomeProduto}</h5>
                                    <p className="card-text produto">A partir de <span className="preco">R${produto.preco}</span></p>
                                    <div className="avaliacao">
                                        <Estrelas starDimension="25px" starRatedColor="#fcba03" starEmptyColor="#dedede" starSpacing="1px" rating={produto.avaliacao} numberOfStars={5}></Estrelas>
                                    </div>
                                </div>
                            </div>
                        </Link>
                    </div>   
                )}       
                </div>
            </div>
        );
    }
}