import React, {Component} from 'react';
import {Row, Col, Button} from 'react-bootstrap'
import axios from 'axios'
import { ipAPI } from '../../../link_config'
import {CarregandoMaior} from '../../Carregamento'
import {Modal} from 'react-bootstrap'
import SubTitulos from '../../AreaAdmProfissional/TodosProdutos/Modal/Componentes/SubTitulos'
import Infos from '../../AreaAdmProfissional/TodosProdutos/Modal/Componentes/Infos';

export class PedidosAndamento extends Component{

    constructor(props){
        super(props)
        this.state={listaPedidos:[],loading:false, showConfirm:false, data:'', hora:'', valorTotal:'',pagamento:'',listaItens:[]}
    }
    componentDidMount(){
        this.setState({loading:true})
        this.pedidoRealizados()
    }

    pedidoRealizados=()=>{
        axios.get(`${ipAPI}pedido/cliente/aguarde/` + this.props.codCliente, { headers: { 'Authorization': sessionStorage.getItem('authC') } })
            .then(resposta => {
                const dados = resposta.data;
               this.setState({listaPedidos:dados})
    this.setState({loading:false})

            }).catch((err) => { console.log("AXIOS ERROR: ", err); })
    }
    detalhes = (codProduto) =>{
        var config = {
            headers: {'Authorization':sessionStorage.getItem('authC')}
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
    close=()=>{
        this.setState({showConfirm:false});
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
       var mes = dataEntrega.getMonth().toLocaleString();

       return dia + "/" + mes + "/" + ano[0] + ano[1]
       

   }

    render(){
        return(
           <div>
               
               <div className="caixa-perfil p-3 mt-4 center">
               <CarregandoMaior loading={this.state.loading} message='carregando ...'></CarregandoMaior>
               {this.state.listaPedidos.map(pedidos => 
             

             <div className="pedido" key={pedidos[0].codPedido}>
                 
                 <Row className="show-grid area-pedidos pb-2">
                     {/* <Col xs={3} md={3}>
                         <img src={ipFotos + pedidos.foto} alt="" title="" style={{'width':'100%','height':'150px'}} ></img>
                     </Col> */}
                     <Col xs={12} md={12} sm={12} lg={12}>
                         <Row className="show-grid">
                             <Col xl={12} xs={12} md={12} sm={12} lg={12} className="titulo-pedido">
                                 <h2 className='text-center'>Nº Pedido: {pedidos[0].codPedido}</h2>
                             </Col>
                             <Col xl={12} xs={12} md={12} sm={12} lg={12} className='text-center mb-2'>
                                 Tipo de pagamento: {pedidos[0].tipoPagamento === "B" ? "Boleto" : "Crédito"}
                             </Col>
                             <Col xl={12} xs={12} md={12} sm={12} lg={10}>
                                 <Row className="show-grid">
                                     <Col xs={12} xl={12} md={10} sm={9} lg={9} className="mb-3">
                                         <Row className="show-grid col">
                                             <Col xl={12} xs={12} md={12}>
                                                 Confeiteiro(a): {pedidos[1].confeiteiro.nome}HGHGHGHHHHHHHHHHHHHHHHHHHHHHHHHH
                                             </Col>
                                             <Col xl={12} xs={12} md={12}>
                                                 Data do pedido: {pedidos[0].dataSolicitacao}
                                             </Col>
                                             <Col xl={12} xs={12} md={12}>
                                                 {/* Obs.: pedidos[0].observacao */}
                                                 Data da entrega: {pedidos[0].dataEntrega}
                                             </Col>
                                             <Col xl={12} xs={12} md={12}>
                                                 R${pedidos[0].valorTotal}
                                             </Col>
                                         </Row>
                                     </Col>
                                     <Col xl={12} xs={12} md={2} sm={2} lg={2}>
                                         <Row className="show-grid">
                                             
                                             <Col xs={12} md={12} sm={12} lg={2} className="center">
                                             <Button className="btn btn-outline-entrar btn-pedido" onClick={() => this.detalhes(pedidos[0].codPedido)}>Detalhes</Button>
                                             </Col>
                                             
                                         </Row>
                                     </Col>
                                 </Row>
                             </Col>
                         </Row>
                     </Col>
                 </Row>
             </div>
                )}
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
                                        <tr key={item.codItemPedido}>
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
        )
    }
}