import React, {Component} from 'react';
import {BotaoTodosProdutos} from '../../../../../global/BotaoTodosProdutos'
import axios from 'axios';
import { ipAPI } from '../../../../../../../link_config';
import {Modal} from 'react-bootstrap';
import SubTitulos from '../../../Modal/Componentes/SubTitulos'
import Infos from '../../../Modal/Componentes/Infos';
import '../../../Modal/Componentes/Css/modal.css';
import Voltar from '../../../Img/Voltar.png';
import { Link } from 'react-router';

export default class Produtos extends Component{

    constructor(props){
        super(props);

        this.state={showConfirm:false, show:'', onHide:'', listaProdutos:[], listaItens:[], hora:'',data:'', valorTotal:'', pagamento:'', obs:''};
    }

    close=()=>{
        this.setState({showConfirm:false});
    }

    open=()=>{
        this.setState({showConfirm:true});
    }

    componentDidMount(){
        axios.get(`${ipAPI}pedido/andamento/pagamento/${this.props.codConfeiteiro}`, {headers:{'Authorization':sessionStorage.getItem('auth')}})
        .then(resposta => {
            const produtos = resposta.data;
            console.log(produtos)
            this.setState({listaProdutos: produtos});
        })
        
    }

    detalhes = (codProduto) =>{
        var config = {
            headers: {'Authorization':sessionStorage.getItem('auth')}
        };

        axios.get(ipAPI + "pedido/" + codProduto, config)
        .then(resposta => {
            this.setState({listaItens: resposta.data});
            this.setState({data:this.formataData(this.state.listaItens[0].pedido.dataEntrega)})
            this.setState({hora:this.formataHora(this.state.listaItens[0].pedido.dataEntrega)})
            this.setState({valorTotal:this.state.listaItens[0].pedido.valorTotal})
            this.setState({pagamento:this.state.listaItens[0].pedido.tipoPagamento})
            this.setState({obs:this.state.listaItens[0].pedido.obs})
            this.setState({showConfirm:true});
        }) 
    }

    formataHora =(horas)=>{
        var horasEntrega = new Date(horas);

       if(horasEntrega.getHours().toLocaleString() === '0' & horasEntrega.getMinutes().toLocaleString() === '0'){
           return '00:00'

       }else if(horasEntrega.getHours().toLocaleString() === '0' & horasEntrega.getMinutes().toLocaleString() !== '0'){
           return '00:' + horasEntrega.getMinutes().toLocaleString()

       }else if(horasEntrega.getHours().toLocaleString() !== '0' & horasEntrega.getMinutes().toLocaleString() === '0'){
           return horasEntrega + ":00"

       }else{

           return horasEntrega.getHours().toLocaleString() + ":" + horasEntrega.getMinutes().toLocaleString()
           
       }

   }

   formataData = (data) => {

       var dataEntrega = new Date(data);
       var ano = dataEntrega.getFullYear().toLocaleString().split(".");
       var dia = dataEntrega.getDate().toLocaleString();
       var mes = dataEntrega.getMonth()+1;

       return dia + "/" + mes + "/" + ano[0] + ano[1]
       
   }


    render(){
        return(
        <div className="mb-5 mt-3 mb-3">
            <Link to={"/adm/profissional/pedidos_em_producao/"+this.props.codConfeiteiro}><img src={Voltar} alt="Voltar" title="Voltar"/></Link>
            <div className="form-row">
                <div className="form-group col-md-4 mt-3">
                {this.state.listaProdutos.map(produto =>
                    <div key={produto.codPedido} className="card ml-3 caixa">
                        <div className="card-header text-center text-uppercase font-weight-bold">
                                {produto.cliente.nome}
                        </div>
                        <div className="card-body">
                            <p className="texto_produto text-center">Dada de entrega: {this.formataData(produto.dataEntrega)}</p>
                            <p className="texto_produto text-center">Hora da entrega: {this.formataHora(produto.dataEntrega)}</p>
                            <p className="texto_produto text-center">Pagamento: {produto.tipoPagamento === 'B' ? 'Boleto' : 'Crédito'}</p>
                            <p className="texto_produto text-center">Preço: R${produto.valorTotal}</p>
                            <BotaoTodosProdutos id="Detalhes" tipo="button" classe="btn btn-primary ml-4" onClick={() => this.detalhes(produto.codPedido)}></BotaoTodosProdutos>
                            <BotaoTodosProdutos id="Finalizar" tipo="button" classe="btn btn-danger ml-5" onClick={() => this.aceitarRecusar("F",produto.codPedido)}></BotaoTodosProdutos>
                        </div>
                    </div>
                )}
                </div>
            </div>
            <Modal
                show={this.state.showConfirm}
                size="lg"
                aria-labelledby="contained-modal-title-vcenter"
                centered
                onHide={this.close}
                >
                <div className="modal_detalhes">
                    <Modal.Header className="header_modal" closeButton>
                        <Modal.Title >
                            <h2 className="titulo_modal text-uppercase">Detalhes</h2>
                        </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <SubTitulos sub="Detalhes de entrega e pagamento"/>
                        <Infos/>
                        <div className="caixa_direita">
                            <p className="font_modal">{this.state.data}</p>
                            <p className="font_modal">Até as {this.state.hora}</p>
                            <p className="font_modal">{this.state.pagamento === 'B' ? 'Boleto' : 'Crédito'}</p>
                            <p className="font_modal">R${this.state.valorTotal}</p>
                        </div>
                        <SubTitulos sub="Detalhes dos produtos"/>
                        
                        <table className="table table_modal">
                                <thead>
                                    <tr>
                                        <th scope="col">Produto</th>
                                        <th scope="col">Quantidade</th>
                                        <th scope="col">Preço</th>
                                    </tr>
                                </thead>
                                <tbody>
                                {this.state.listaItens.map( item => 
                                    <tr key={item.produto.codProduto}>
                                        <td>{item.produto.nomeProduto}</td>
                                        <td>{item.quantidade}</td>
                                        <td>R${item.produto.preco}</td>
                                    </tr>
                                )} 
                                </tbody>
                        </table>

                    <div className="caixa_obs">
                            <h4>Observação</h4>
                            <textarea className="text_obs" defaultValue={this.state.obs} disabled></textarea>
                        </div>
                    </Modal.Body>   
                    <Modal.Footer>
                    
                    </Modal.Footer> 
                </div>
            </Modal>
        </div>
        );
    }
}