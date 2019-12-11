import React, { Component } from 'react';
import '../../css/style.css';
import '../../css/rate.css';
import img from '../../img/app.jpg'
import $ from 'jquery';
import {ipAPI, ipFotos} from '../../../../../link_config'
import {Link} from 'react-router'
import Estrelas from 'react-star-ratings'


export class Produto extends Component{


    constructor(props){

        super(props);

        this.state = {listaProdutos: []};

    }

    componentDidMount(){

        $.ajax({
           
            url: `${ipAPI}produto/categoria/`+this.props.codigo,
            dataType: "json",
            success: function(resposta){
                this.setState({listaProdutos: resposta});
            }.bind(this)
        })
    }

    atualizarListagemProdutos(novaLista){
        this.setState({listaProdutos: novaLista});
    }



    render(){
        return(
            <div className="container bolo" id={this.props.id}>
                <div className="titulo_home mx-auto">
                    <h1>{this.props.titulo}</h1>
                    <hr></hr>
                </div>
            
                {this.state.listaProdutos.map(produtos =>
                    <div key={produtos.codProduto}>
                        <Link to={"/descricao/" + produtos.codProduto}><div className="card text-center prod mb-5"  style={{'width': '14rem'}}>
                            <img className="card-img-top imagens-bolos" src={ipFotos+produtos.foto} alt={produtos.nomeProduto} title={produtos.nomeProduto}/>
                            <div className="card-body">
                                <h5 className="card-title nome-bolo-adm">{produtos.nomeProduto}</h5>
                                <p className="card-text">R${produtos.preco.toFixed(2)}</p>
                                <div className="avaliacao">
                                <Estrelas starDimension="25px" starRatedColor="#fcba03" starEmptyColor="#dedede" starSpacing="1px" rating={produtos.avaliacao} numberOfStars={5}></Estrelas>
                                </div>
                            </div>
                        </div></Link>
                    </div>
                )}
            </div> 

        );
    }

}
