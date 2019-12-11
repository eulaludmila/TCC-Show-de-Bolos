import React, { Component } from 'react';
import Vendedor from '../Vendedor';
import Descricao from '../Descricao';
import SelectPesoQtd from '../SelectPesoQtd';
import $ from 'jquery';
import {ipAPI, ipFotos} from '../../../../../link_config'
import Estrelas from 'react-star-ratings'

export default class Produto extends Component{

    constructor(props){
        super(props)

        this.state={nomeProduto:"",preco:0,foto:"",codConfeiteiro:0,nomeConfeiteiro:"",fotoConfeiteiro:"", descricao:"",avaliacao:0, tipoUni:"",labelProdutoSelect:"", resultado:""};
    }

    componentDidMount(){

        // console.log(this.props.params.codProduto)

        $.ajax({ 
            url: `${ipAPI}produto/` + this.props.codigo,
            contentType: "application/json",
            dataType: "json",
            success: function(resposta){
                this.setState({codConfeiteiro:resposta.confeiteiro.codConfeiteiro})
                this.setState({nomeProduto: resposta.nomeProduto});
                this.setState({preco: resposta.preco});
                this.setState({imgFoto: ipFotos+resposta.foto});
                this.setState({avaliacao:resposta.avaliacao})
                this.setState({nomeConfeiteiro: resposta.confeiteiro.nome});
                this.setState({fotoConfeiteiro: resposta.confeiteiro.foto});
                this.setState({descricao: resposta.descricao});
                this.setState({tipoUni: resposta.categoria.tipoUnidade});

                
            }.bind(this)
        })
    }

    render(){
        return(
            <div className="form-row tt mb-5">
                
                <div className="col-md-12 mt-2">
                    <h1>{this.state.nomeProduto}</h1>
                </div>
                <div className="col-md-6 mt-3">
                <img src={this.state.imgFoto} className="img-fluid img_produto" alt={this.state.nomeProduto} title={this.state.nomeProduto}/>
                    <div className="avaliacao">
                        <Estrelas starDimension="25px" starRatedColor="#fcba03" starEmptyColor="#dedede" starSpacing="1px" rating={this.state.avaliacao} numberOfStars={5}></Estrelas>
                    </div>
                    <div className="row col-md-12 mt-2">
                        <p className="texto_preco">Preço a partir de: R$ {this.state.preco}</p>
                    </div>
                    <div className="form-row">
                        {(() => {
                            if(this.state.tipoUni === "uni."){
                                this.setState.labelProdutoSelect = "Quantidade:";
                            }else{
                                this.setState.labelProdutoSelect = "Kg:";
                            }
                        })()}
                            
                        <SelectPesoQtd  codigo={this.props.codigo} label={this.state.labelProdutoSelect} />
                    </div>
                </div>
                <div className="col-md-5">
                    <Vendedor nomeConfeiteiro={this.state.nomeConfeiteiro} codConfeiteiro={this.state.codConfeiteiro} fotoConfeiteiro={this.state.fotoConfeiteiro}/>
                    <Descricao descricao={this.state.descricao}/>
                </div>
            </div>
        );
    }
}