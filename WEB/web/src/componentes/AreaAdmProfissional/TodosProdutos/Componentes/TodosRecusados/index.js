import React, {Component} from 'react';
import Header from '../../../Header';
import Produtos from './Componentes/Produtos';
import {ContainerAdm} from '../../../../../styles'


export default class TodosRecusados extends Component{
    render(){
        return(
            <ContainerAdm className="container conteudo">
                <Produtos codConfeiteiro={this.props.codConfeiteiro}/>
            </ContainerAdm>
        );
    }
}

export class BoxTodosRecusados extends Component{

    constructor(props){
        super(props)
        this.state={status:''}
    }

    render(){
        return(
            <div>
                <Header titulo="Todos pedidos recusados"></Header>
                <TodosRecusados codConfeiteiro={this.props.params.codConfeiteiro}></TodosRecusados>
            </div>
        );
    }
}