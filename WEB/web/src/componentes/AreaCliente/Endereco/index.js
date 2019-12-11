import React, { Component } from 'react'
import { Form, Row, Col } from 'react-bootstrap'
import editar from '../../../img/edit.png'
import salvar from '../../../img/correct.png'
import InputLabel from '../InputLabel'
import axios from 'axios'
// import $ from 'jquery'
import { ipAPI } from '../../../link_config'
import { CarregandoMaior } from '../../Carregamento'
import $ from 'jquery'

export class EnderecoCliente extends Component {
    constructor(props) {
        super(props)

        this.state = {editar_endereco: 'disabled', imagem_endereco: editar, alt_endereco: "Editar", cep:'', endereco:'',
            bairro:'', numero:'', complemento:'', cidade:'', estado:'', imgFoto:''
        }

    }
    setCep = (evento) =>{
    
        this.setState({cep:evento.target.value})
        this.verificaCep(this.state.cep);
        $("#cep").mask("00000-000");
    }

    setEndereco = (evento) =>{
    
        this.setState({endereco:evento.target.value})

    }

    setBairro = (evento) =>{
    
        this.setState({bairro:evento.target.value})
    }

    setNumero = (evento) =>{
    
        this.setState({numero:evento.target.value})
       
    }

    setComplemento = (evento) =>{
    
        this.setState({complemento:evento.target.value})

    }

    setCidade = (evento) =>{
    
        this.setState({cidade:evento.target.value})

    }

    setEstado = (evento) =>{
    
        this.setState({estado:evento.target.value})

    }

    componentDidMount() {
        
        this.endereco();
    }

    verificaCep = () => {
        
        //VÁRIAVEL PARA PEGAR O VALOR DO CEP
        var cep = $("#cep").val();

        //VERIFICANDO SE O CEP É VÁLIDO, SENDO COM 9 NÚMEROS
        if(cep.length === 9){

            // REQUISIÇÃO
            $.ajax({
            
                url:`http://viacep.com.br/ws/${cep}/json/?callback=?`,
                dataType:"json",
                
                success: function(resposta){

                    //SE NÃO DE ERROR IRÁ MUDAR O ESTADO DOS COMPONENTES
                    if(!resposta.erro){
                        
                        this.setState({estado:resposta.uf})
                        this.setState({cidade:resposta.localidade})
                        this.setState({bairro:resposta.bairro})
                        this.setState({endereco:resposta.logradouro})

                    }else{
                        alert("CEP não encontrado");
                    }
                          
                }.bind(this)

            });
        }

    }


    verificaEndereco = () =>{

        axios.get(`${ipAPI}enderecocliente/endereco/verifica/cliente/` + this.props.codCliente, { headers: { 'Authorization': sessionStorage.getItem('authC') } })
            .then(resposta => {
                const dados = resposta.data;
                
               if(dados === 1){
                    this.atualizaEndereco();
               }else{
                    this.cadastraEndereco();
               }

            }).catch((err) => { console.log("AXIOS ERROR: ", err); })

    }

    endereco=()=>{
        axios.get(`${ipAPI}enderecocliente/endereco/cliente/` + this.props.codCliente, { headers: { 'Authorization': sessionStorage.getItem('authC') } })
            .then(resposta => {
                const dados = resposta.data;
               console.log(dados)
               if(dados !== ""){
                    this.setState({ endereco: dados.endereco })

                    this.setState({ cidade: dados.cidade.cidade })
                    this.setState({ estado: dados.cidade.estado.uf })
                    this.setState({ cep: dados.cep })
                    this.setState({ numero: dados.numero })
                    this.setState({ bairro: dados.bairro})
               }

            }).catch((err) => { console.log("AXIOS ERROR: ", err); })
    } 


    editarEndereco = (alt) => {

        if (alt === "Editar") {
            this.setState({ editar_endereco: '' })
            this.setState({ imagem_endereco: salvar })
            this.setState({ alt_endereco: "Salvar" })
            
        } else {
            this.setState({ editar_endereco: 'disabled' })
            this.setState({ imagem_endereco: editar })
            this.setState({ alt_endereco: "Editar" })
            this.verificaEndereco()
        }

    }

    cadastraEndereco = () =>{

        const resposta = JSON.stringify(
                        {cliente:{codCliente:this.props.codCliente},

                        endereco:{endereco:this.state.endereco, cep:this.state.cep,
                        complemento:this.state.complemento,cidade:{cidade:this.state.cidade, 
                        estado:{uf:this.state.estado}},bairro:this.state.bairro,numero:this.state.numero}})

        $.ajax({
            url: `${ipAPI}enderecocliente/web/`+this.props.codCliente,
            contentType: "application/json",
            headers:{'Authorization':sessionStorage.getItem('authC')},
            type: "post",
            data: resposta,
            success: function (resposta) {
                console.log("cadastrou");
                
           }

        });
    }

    atualizarEndereco = () =>{

        const resposta = JSON.stringify({codCliente:this.props.codCliente,endereco:this.state.endereco, cep:this.state.cep,
                        complemento:this.state.complemento,cidade:{cidade:this.state.cidade, estado:{uf:this.state.estado}},
                        bairro:this.state.bairro,numero:this.state.numero})

        $.ajax({
            url: `${ipAPI}clienteDTO/`+this.props.codCliente,
            contentType: "application/json",
            headers:{'Authorization':sessionStorage.getItem('authC')},
            type: "put",
            data: resposta,
            success: function (resposta) {
                // console.log(resposta);
                
           }

        });
    }

    render() {
        return (
            <div>
                <CarregandoMaior></CarregandoMaior>
               <div className="caixa-perfil p-3 mt-4 center">
                <Form>
                    <Row className="show-grid area-pedidos pb-3 pr-3 pl-3">
                        <Col xs={12} md={12} className="mb-4 text-right">
                            <span onClick={() => this.editarEndereco(this.state.alt_endereco)}><img src={this.state.imagem_endereco} className="tamanho-editar" alt={this.state.alt_endereco} title={this.state.alt}></img></span>
                        </Col>
                        <Col xs={12} md={12}>
                            <Row className="show-grid">
                                <Form.Group as={Col} md="2">

                                    <InputLabel label="CEP:" id="cep" type="text" name="txt-cep" onChange={this.setCep} value={this.state.cep} disabled={this.state.editar_endereco}></InputLabel>

                                    <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                                </Form.Group>
                                <Form.Group as={Col} md="5" >

                                    <InputLabel label="Endereço:" type="text" name="txt-endereco" onChange={this.setEndereco} value={this.state.endereco} disabled={this.state.editar_endereco}></InputLabel>

                                    <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                                </Form.Group>
                                <Form.Group as={Col} md="2">

                                    <InputLabel label="Número:" type="text" name="txt-numero" onChange={this.setNumero} value={this.state.numero} disabled={this.state.editar_endereco}></InputLabel>

                                    <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                                </Form.Group>
                                <Form.Group as={Col} md="3">

                                    <InputLabel label="Complemento:" type="text" name="txt-complemento" onChange={this.setComplemento} value={this.state.complemento} disabled={this.state.editar_endereco}></InputLabel>

                                    <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                                </Form.Group>

                            </Row>
                            <Row className="show-grid">
                                <Form.Group as={Col} md="5">
                                    <InputLabel label="Bairro:" type="text" name="txt-bairro" onChange={this.setBairro} value={this.state.bairro} disabled={this.state.editar_endereco}></InputLabel>

                                    <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                                </Form.Group>
                                <Form.Group as={Col} md="5">
                                    <InputLabel label="Cidade:" type="text" name="txt-cidade" onChange={this.setCidade} value={this.state.cidade} disabled={this.state.editar_endereco}></InputLabel>

                                    <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                                </Form.Group>
                                <Form.Group as={Col} md="2">
                                    <InputLabel label="UF:" type="text" name="txt-uf" onChange={this.setEstado} value={this.state.estado} disabled={this.state.editar_endereco}></InputLabel>

                                    <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                                </Form.Group>
                            </Row>
                        </Col>
                    </Row>
                </Form>
            </div>
            
            </div>
        )
    }
}