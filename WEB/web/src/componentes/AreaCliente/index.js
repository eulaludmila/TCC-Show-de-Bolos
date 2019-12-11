import React, {Component} from 'react';
import {Tabs, Tab} from 'react-bootstrap'
import './area_cliente.css'
import {PedidosCliente} from './Pedidos'
import {Perfil} from './Perfil'
import {browserHistory} from 'react-router'
import {PedidosAndamento} from './Andamento'
import {PagamentoCliente} from './Pagamento'
import {EnderecoCliente} from './Endereco'

export class AreaCliente extends Component{

    constructor(props){
        super(props)
        this.state={cor:'#880e4f'}
    }

    componentDidMount(){
        if(sessionStorage.getItem('authC') === null){
         browserHistory.push('/login/cliente')
        }
      }

    selecionado =() =>{
        this.setState({cor:'#ffffff'})
    }
    render(){
        return(
            <div className="container tab">
                <div className="caixa-area-cliente">
                    <Tabs defaultActiveKey="Dados Pessoais" onSelect={this.selecionado}  transition={false} id="noanim-tab-example">
                        <Tab eventKey="Dados Pessoais" title="Dados Pessoais" >
                            <Perfil codCliente={this.props.params.codCliente}></Perfil>

                        </Tab>
                        <Tab eventKey="Endereco" title="Endereco">
                            <EnderecoCliente codCliente={this.props.params.codCliente}></EnderecoCliente>
                        </Tab>
                        <Tab eventKey="Pedidos Realizados" title="Pedidos Realizados">
                        <PedidosCliente codCliente={this.props.params.codCliente}></PedidosCliente>
                        </Tab>
                        <Tab eventKey="Andamento" title="Em andamento">
                        
                            <PedidosAndamento codCliente={this.props.params.codCliente}></PedidosAndamento>
                        </Tab>
                        <Tab eventKey="Pagamento" title="Pagamento">
                            <PagamentoCliente codCliente={this.props.params.codCliente}></PagamentoCliente>
                        </Tab>

                        
                    </Tabs>
                </div>
                
            </div>
        )
    }
}
