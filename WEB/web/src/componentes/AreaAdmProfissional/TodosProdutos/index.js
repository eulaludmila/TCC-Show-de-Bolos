import React, {Component} from 'react';
import Header from '../Header';
import {ContainerAdm} from '../../../styles'
import AguardandoResposta from './Componentes/AguardandoResposta';
import Aprovados from './Componentes/Aprovados';
import Recusados from './Componentes/Recusados';
import Titulos from './Componentes/Titulos';


export class AreaTodosProdutos extends Component{

    constructor(props){
        super(props);

        this.state = {codConfeiteiro:''};
    }


    render(){
        return(
            <ContainerAdm className="container conteudo">
                <Titulos titulo="Aguardando resposta"/>
                <AguardandoResposta codConfeiteiro={this.props.codConfeiteiro}/>
                <Titulos titulo="Aprovados"/>
                <Aprovados codConfeiteiro={this.props.codConfeiteiro}/>
                <Titulos titulo="Recusados"/>
                <Recusados codConfeiteiro={this.props.codConfeiteiro}/>
            </ContainerAdm>
        );
    }
}



export class BoxTodosProdutos extends Component{

    constructor(props){
        super(props)
        this.state={status:''}
    }

    render(){
        return(
            <div>
                <Header titulo="Seus Pedidos"></Header>
                <AreaTodosProdutos codConfeiteiro={this.props.params.codConfeiteiro}></AreaTodosProdutos>
            </div>
        );
    }
}