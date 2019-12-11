import React, { Component } from 'react';
import '../../css/style.css';
import '../../css/rate.css';
import $ from 'jquery';
import {ipAPI, ipFotos} from '../../../../../link_config'
import {Link} from 'react-router'
import Estrelas from 'react-star-ratings'



export class Confeiteiro extends Component{


    constructor(props){

        super(props);

        this.state = {listaConfeiteiros: []};
    }

    componentDidMount(){

        
        $.ajax({
           
            url: `${ipAPI}confeiteiroDTO/avaliacao`,
            dataType: "json",
            success: function(resposta){
                this.setState({listaConfeiteiros: resposta});
            }.bind(this)
        })
    }

    atualizarListagemProdutos(novaLista){
        this.setState({listaConfeiteiros: novaLista});
    }



    render(){
        return(
            <div className="container bolo" id={this.props.id}>
                <div className="titulo_home mx-auto">
                    <h1>{this.props.titulo}</h1>
                    <hr className="linha-separa"></hr>
                </div>
            
                {this.state.listaConfeiteiros.map(confeiteiros =>
                    <div key={confeiteiros.codConfeiteiro} >
                        <Link to={"/confeiteiro/" + confeiteiros.codConfeiteiro}><div className="card text-center prod mb-5"  style={{'width': '14rem'}}>
                            <img className="card-img-top imagens-bolos" src={ipFotos+confeiteiros.foto} alt={confeiteiros.nome} title={confeiteiros.nome}/>
                            <div className="card-body">
                                <h5 className="card-title nome-bolo-adm">{confeiteiros.nome}</h5>
                                <div className="avaliacao">
                                <Estrelas starDimension="25px" starRatedColor="#fcba03" starEmptyColor="#dedede" starSpacing="1px" rating={confeiteiros.avaliacao} numberOfStars={5}></Estrelas>
                                </div>
                            </div>
                        </div></Link>
                    </div>
                )}
            </div> 

        );
    }

}
