import React, {Component} from 'react';
import {BotaoTodosProdutos} from '../../../global/BotaoTodosProdutos';
import { Link } from 'react-router';
import axios from 'axios';
import { ipAPI} from '../../../../../link_config';
import {Modal} from 'react-bootstrap';
import SubTitulos from '../Modal/Componentes/SubTitulos'
import Infos from '../Modal/Componentes/Infos';
import '../Modal/Componentes/Css/modal.css';

export default class Finalizado extends Component{

    constructor(props){
        super(props);
        this.state={showConfirm:false, show:'', onHide:'', listaProdutos:[], listaItens:[]};
        
    }

    componentDidMount(){
        axios.get(`${ipAPI}pedido/finalizado/limit/pagamento/${this.props.codConfeiteiro}`, {headers:{'Authorization':sessionStorage.getItem('auth')}})
        .then(resposta => {
            const produtos = resposta.data;
            this.setState({listaProdutos: produtos});
            console.log(produtos);
        })
        
    }

    close=()=>{
        this.setState({showConfirm:false});
    }

    open=()=>{
        this.setState({showConfirm:true});
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
            <div>
                <div className="form-row">
                {this.state.listaProdutos.map(produto =>
                    <div key={produto.codPedido} className="form-group col-md-4">
                        <div className="card ml-3 caixa">
                            <div className="card-header text-center text-uppercase font-weight-bold">
                                   {produto.cliente.nome}
                            </div>
                            <div className="card-body">
                                <p className="texto_produto text-center">Data de entrega: {this.formataData(produto.dataEntrega)}</p>
                                <p className="texto_produto text-center">Hora da entrega: {this.formataHora(produto.dataEntrega)}</p>
                                <p className="texto_produto text-center">Pagamento: {produto.tipoPagamento === 'B' ? 'Boleto' : 'Crédito'}</p>
                                <p className="texto_produto text-center">Preço: R${produto.valorTotal}</p>

                                <BotaoTodosProdutos id="Detalhes" tipo="button" classe="btn btn-primary btn_detalhes_center" onClick={() => this.detalhes(produto.codPedido)}></BotaoTodosProdutos>
                            </div>
                        </div>
                    </div>
                )}
                </div>
            
                <div>
                    <Link to={"/adm/profissional/pedidos_em_producao/"+this.props.codConfeiteiro+"/finalizados"}><p className="link_vermais text-right">Ver mais</p></Link>
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
                                    <textarea className="text_obs" disabled>{this.state.obs}</textarea>
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