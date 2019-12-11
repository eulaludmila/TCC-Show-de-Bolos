import React, { Component } from 'react';
import { Link } from 'react-router';
import $ from 'jquery';
import {ipAPI, ipFotos} from '../../../../link_config'
import Estrelas from 'react-star-ratings'

export default class CardConfeiteiro extends Component{

    constructor(props){
        super(props);

        this.state = {perfilConfeiteiro: [], confeiteiro:'', enderecoConfeiteiro:'', estadoConfeiteiro:'',avaliacao:0};
    }

    componentDidMount(){
        $.ajax({
            url: `${ipAPI}enderecoconfeiteiro/${this.props.codConfeiteiro}`,
            dataType: "json",
            success: function(resposta){
                this.setState({perfilConfeiteiro: resposta.confeiteiro});
                this.setState({enderecoConfeiteiro: resposta.endereco.cidade});
                this.setState({estadoConfeiteiro: resposta.endereco.cidade.estado.uf});
                
                var nota = this.state.perfilConfeiteiro.avaliacao.toFixed(2)
                this.setState({avaliacao:nota})
                
            }.bind(this)
        })
    }

    render(){
        return(
            <div className="container">
                <div className="row justify-content-center">
                    <div key={this.state.perfilConfeiteiro.codConfeiteiro} className="col-12 col-sm-12 col-md-12 col-lg-12 col-xl-10">
                        <div className="row img_perfil_confeiteiro center d-flex justify-content-center">
                            <img  src={ipFotos + this.state.perfilConfeiteiro.foto} alt={this.state.perfilConfeiteiro.nome} title={this.state.perfilConfeiteiro.nome} className="img-fluid img_confeiteiro col-12 col-sm-12 col-md-12 col-lg-6 col-xl-6"/>
                          
                        </div>
                        <div className="caixa_confeiteiro2 ">
                            <div className="row">
                                <div className="col-md-6">
                                    <div className="caixa_info_confeiteiro d-flex text-center flex-column bd-highlight">
                                        <p className="pl-3 nome_perfil_confeiteiro">{this.state.perfilConfeiteiro.nome}</p>
                                        <p className="pl-3 info_confeiteiro_perfil">{this.state.enderecoConfeiteiro.cidade}-{this.state.estadoConfeiteiro}</p>
                                        <p className="pl-3 info_confeiteiro_perfil">{this.state.perfilConfeiteiro.email}</p>
                                    </div>
                                </div>
                                <div className="col-md-6 caixa_avaliacao_perfil">
                                    <div className="avaliacao_perfil_confeiteiro">
                                        <div className="nota2">
                                            {this.state.avaliacao}
                                        </div>
                                            <Estrelas starDimension="25px" starRatedColor="#fcba03" starEmptyColor="#dedede" starSpacing="1px" rating={this.state.perfilConfeiteiro.avaliacao} numberOfStars={5}></Estrelas>
                                        <p className="av">Avaliações:</p>
                                    </div>
                                </div> 
                            </div>
                            
                            <div className="btn_card_confeiteiro text-center d-flex justify-content-center col-md-12">
                                <Link to={"/confeiteiro/" + this.props.codConfeiteiro}>
                                    <div className="link_produto mr-5" valor='1'>
                                        <p className="texto">Meu perfil</p>
                                    </div>
                                </Link>
                                <Link to={"/confeiteiro/" + this.props.codConfeiteiro + "/produto"}>
                                    <div className="link_produto" valor='1'>
                                        <p className="texto">Produtos</p>
                                    </div>
                                </Link>
                            </div>
                            
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}