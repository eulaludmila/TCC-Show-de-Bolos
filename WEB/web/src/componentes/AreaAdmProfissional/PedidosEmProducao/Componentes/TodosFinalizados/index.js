import React, {Component} from 'react';
import Header from '../../../Header';
import Produtos from './Componentes/Produtos';
import {ContainerAdm} from '../../../../../styles'


export default class TodosFinalizados extends Component{
    render(){
        return(
            <ContainerAdm className="container conteudo">
                <Produtos codConfeiteiro={this.props.codConfeiteiro}/>
            </ContainerAdm>
        );
    }
}

export class BoxTodosFinalizados extends Component{

    constructor(props){
        super(props)
        this.state={status:''}
    }

    render(){
        return(
            <div>
                <Header titulo="Pedidos finalizados"></Header>
                <TodosFinalizados codConfeiteiro={this.props.params.codConfeiteiro}></TodosFinalizados>
            </div>
        );
    }
}