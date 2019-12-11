import React, {Component} from 'react';
import Header from '../../../Header';
import Produtos from './Componentes/Produtos';
import {ContainerAdm} from '../../../../../styles'


export default class TodosAprovados extends Component{
    render(){
        return(
            <ContainerAdm className="container conteudo">
                <Produtos codConfeiteiro={this.props.codConfeiteiro}/>
            </ContainerAdm>
        );
    }
}

export class BoxTodosAprovados extends Component{

    constructor(props){
        super(props)
        this.state={status:''}
    }

    render(){
        return(
            <div>
                <Header titulo="Pedidos aprovados"></Header>
                <TodosAprovados codConfeiteiro={this.props.params.codConfeiteiro}></TodosAprovados>
            </div>
        );
    }
}