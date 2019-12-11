import React, { Component } from 'react';
import '../../../../css/bootstrap.min.css';
import CapaPerfil from '../CapaPerfil';
import Capa from '../CapaPerfil/ImgCapa/sobremesas.jpg';
import CardConfeiteiro from '../CardConfeiteiro';
import TituloMelhoresAvaliados from './Componentes/TituloMelhoresAvaliados';
import Produtos from './Componentes/Produtos';

export default class MelhoresAvaliados extends Component{

    constructor(props){
        super(props);

        this.state = {codConfeiteiro:''};
    }

    render(){
        return(
        <div>
            <CapaPerfil src={Capa} title="Perfil" alt="Perfil"/>
            <CardConfeiteiro codConfeiteiro={this.props.params.codConfeiteiro}/>
            <div className="container-fluid">
                <TituloMelhoresAvaliados titulo="Melhores Avaliados"/>
                <Produtos codConfeiteiro={this.props.params.codConfeiteiro}/>
            </div>
        </div>
        );
    }
}