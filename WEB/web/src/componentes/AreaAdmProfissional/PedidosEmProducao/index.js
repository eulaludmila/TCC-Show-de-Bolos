import React, {Component} from 'react';
import Header from '../Header';
import {ContainerAdm} from '../../../styles'
import NaoIniciados from './Componentes/NaoIniciados';
import EmAndamento from './Componentes/EmAndamento';
import Finalizado from './Componentes/Finalizado';
import Titulos from './Componentes/Titulos';

export class AreaPedidos extends Component{
    render(){
        return(
            <ContainerAdm className="container conteudo">
                <Titulos titulo="Não iniciados"/>
                <NaoIniciados codConfeiteiro={this.props.codConfeiteiro}/>
                <Titulos titulo="Em andamento"/>
                <EmAndamento codConfeiteiro={this.props.codConfeiteiro}/>
                <Titulos titulo="Finalizados"/>
                <Finalizado codConfeiteiro={this.props.codConfeiteiro}/>
            </ContainerAdm>
        );
    }
}

export class BoxPedidos extends Component{

    constructor(props){
        super(props)
        this.state={status:''}
    }

    render(){
        return(
            <div>
                <Header titulo="Produtos em Produção"></Header>
                <AreaPedidos codConfeiteiro={this.props.params.codConfeiteiro}></AreaPedidos>
            </div>
        );
    }
}