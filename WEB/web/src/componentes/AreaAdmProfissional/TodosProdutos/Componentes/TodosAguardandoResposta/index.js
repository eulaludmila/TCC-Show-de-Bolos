import React, {Component} from 'react';
import Header from '../../../Header';
import Produtos from './Componentes/Produtos';
import {ContainerAdm} from '../../../../../styles'


export default class TodosAguardandoResposta extends Component{
    render(){
        return(
            <ContainerAdm className="container conteudo">
                <Produtos codConfeiteiro={this.props.codConfeiteiro}/>
            </ContainerAdm>
        );
    }
}

export class BoxTodosAguardandoResposta extends Component{

    constructor(props){
        super(props)
        this.state={status:''}
    }

    render(){
        return(
            <div>
                <Header titulo="Pedidos aguardando resposta"></Header>
                <TodosAguardandoResposta codConfeiteiro={this.props.params.codConfeiteiro}></TodosAguardandoResposta>
            </div>
        );
    }
}