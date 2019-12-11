import React, { Component } from 'react';
import './Css/perfil_confeiteiro.css';
import '../../../../css/bootstrap.min.css';
import CapaPerfil from '../CapaPerfil';
import Capa from '../CapaPerfil/ImgCapa/sobremesas.jpg';
import CardConfeiteiro from '../CardConfeiteiro';
import TitulosPerfil from './Componentes/TitulosPerfil';
import ProdutosMaisAvaliados from './Componentes/ProdutosMaisAvaliados';
import ProdutosMaisBaratos from './Componentes/ProdutosMaisBaratos';


export default class Perfil extends Component{

    constructor(props){
        super(props);

        this.state = {codConfeiteiro:''};
    }

    render(){
        return(
            <div>
                <CapaPerfil src={Capa} title="Perfil" alt="Perfil"/>
                <CardConfeiteiro codConfeiteiro={this.props.params.codConfeiteiro}/>
                <div className="container-fluid" >
                    <TitulosPerfil titulo="Melhores Avaliados"/>
                    <ProdutosMaisAvaliados codConfeiteiro={this.props.params.codConfeiteiro}/>
                    <TitulosPerfil titulo="Mais Baratos"/>
                    <ProdutosMaisBaratos codConfeiteiro={this.props.params.codConfeiteiro}/>
                </div>
            </div>
        );
    }
}