import React, {Component} from 'react';
import Header from '../../../Header';
import Produtos from './Componentes/Produtos';
import {ContainerAdm} from '../../../../../styles'


export default class TodosNaoIniciados extends Component{
    render(){
        return(
            <ContainerAdm className="container conteudo">
                <Produtos codConfeiteiro={this.props.codConfeiteiro}/>
            </ContainerAdm>
        );
    }
}

export class BoxTodosNaoIniciados extends Component{

    constructor(props){
        super(props)
        this.state={status:''}
    }

    render(){
        return(
            <div>
                <Header titulo="Pedidos não iniciados"></Header>
                <TodosNaoIniciados codConfeiteiro={this.props.params.codConfeiteiro}></TodosNaoIniciados>
            </div>
        );
    }
}