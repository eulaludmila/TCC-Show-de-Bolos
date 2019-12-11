import React, { Component } from 'react'
import { Form, Row, Col } from 'react-bootstrap'
import editar from '../../../img/edit.png'
import salvar from '../../../img/correct.png'
import InputLabel from '../InputLabel'
import axios from 'axios'
// import $ from 'jquery'
import { ipAPI, ipFotos } from '../../../link_config'
import { CarregandoMaior } from '../../Carregamento'
import $ from 'jquery'

export class Perfil extends Component {
    constructor(props) {
        super(props)

        this.state = {
            editar_dados: 'disabled', imagem_dados: editar, alt_dados: "Editar", nome:'', sobrenome:'',
            celular:'', dtnasc:'',email:'',senha:'', sexo:'', imgFoto:''
        }

    }
    setNome = (evento) =>{
    
        this.setState({nome:evento.target.value})

    }

    setSobrenome = (evento) =>{
    
        this.setState({sobrenome:evento.target.value})

    }

    setCelular = (evento) =>{
    
        this.setState({celular:evento.target.value})
        $("#celular").mask("(00) 00000-0000");
    }

    setDtNasc = (evento) =>{
    
        this.setState({dtnasc:evento.target.value})
        $("#dtNasc").mask("00/00/0000");
    }

    setSexo = (evento) =>{
    
        this.setState({sexo:evento.target.value})

    }

    setEmail = (evento) =>{
    
        this.setState({email:evento.target.value})

    }

    setSenha = (evento) =>{
    
        this.setState({sexo:evento.target.value})

    }

    componentDidMount() {

        axios.get(`${ipAPI}cliente/` + this.props.codCliente, { headers: { 'Authorization': sessionStorage.getItem('authC') } })
            .then(resposta => {
                const dados = resposta.data;
                // console.log(dados)
                this.setState({ nome: dados.nome })
                this.setState({ sobrenome: dados.sobrenome })
                this.setState({ celular: dados.celular.celular })
                this.setState({ dtnasc: this.formataData(dados.dtNasc)  })
                this.setState({ sexo: dados.sexo })

                if(dados.foto === null){
                    this.setState({ imgFoto: editar })
                }else{
                    this.setState({ imgFoto: ipFotos + dados.foto })
                }

                

            }).catch((err) => { console.log("AXIOS ERROR: ", err); })
    }

    atualizarDados = () =>{

        const resposta = JSON.stringify({codCliente:this.props.codCliente,nome:this.state.nome, sobrenome:this.state.sobrenome,
                        celular:{celular:this.state.celular},dtNasc:this.state.dtnasc,
                        sexo:this.state.sexo, email:this.state.email,
                        senha:this.state.senha})


        $.ajax({
            url: `${ipAPI}clienteDTO/`+this.props.codCliente,
            contentType: "application/json",
            headers:{'Authorization':sessionStorage.getItem('authC')},
            type: "put",
            data: resposta,
            success: function (resposta) {
                console.log(resposta);
                
           }

        });
    }

    editar = (alt) => {

        if (alt === "Editar") {
            this.setState({ editar_dados: '' })
            this.setState({ imagem_dados: salvar })
            this.setState({ alt_dados: "Salvar" })
            
        } else {
            this.atualizarDados();
            this.setState({ editar_dados: 'disabled' })
            this.setState({ imagem_dados: editar })
            this.setState({ alt_dados: "Editar" })
        }

    }

    formataData = (data) => {

        var dataEntrega = new Date(data);
        var ano = dataEntrega.getFullYear().toLocaleString();
        var dia = dataEntrega.getDate()+1
        var mes = dataEntrega.getMonth()+1

        return dia + "/" + mes + "/" + ano

    }

    
    render() {
        return (
            <div>
                <CarregandoMaior></CarregandoMaior>
                <div className="caixa-perfil p-3 mt-4 center">
                <Form>
                    <Row className="show-grid area-pedidos pb-3 pr-3 pl-3">
                        <Col xs={12} md={12} className="mb-4 text-right">
                            <span onClick={() => this.editar(this.state.alt_dados)}><img src={this.state.imagem_dados} className="tamanho-editar" alt={this.state.alt} title={this.state.alt}></img></span>
                        </Col>
                        <Col xs={9} md={9} sm={9} xl={3} lg={3} className="center mb-5">
                            <img src={this.state.imgFoto} alt="" title="" style={{ 'width': '100%', 'height': '180px' }} ></img>
                            <input className="input-file" type="file" disabled={this.state.editar_dados} onChange={this.setFoto} name={this.props.name} />
                        </Col>
                        <Col xs={12} md={12} sm={12} xl={12} lg={12}>
                            <Row className="show-grid">
                                <Form.Group as={Col} md="6">
                                    <InputLabel label="Nome:" onChange={this.setNome} value={this.state.nome} type="text" name="txt-nome" disabled={this.state.editar_dados}></InputLabel>

                                </Form.Group>
                                <Form.Group as={Col} md="6">
                                    <InputLabel label="Sobrenome:" type="text" onChange={this.setSobrenome} value={this.state.sobrenome} name="txt-sobrenome" disabled={this.state.editar_dados}></InputLabel>
                                  
                                </Form.Group>

                            </Row>
                            <Row className="show-grid">
                                <Form.Group as={Col} md="4">
                                    <InputLabel id="celular" label="Celular:" type="text" onChange={this.setCelular} value={this.state.celular} name="txt-celular" disabled={this.state.editar_dados}></InputLabel>
                                    
                                </Form.Group>
                                <Form.Group as={Col} md="4">

                                    <InputLabel label="Data de Nascimento:" id="dtNasc" onChange={this.setDtNasc} value={this.state.dtnasc} type="text" name="txt-data-nasc" disabled={this.state.editar_dados}></InputLabel>

                               
                                </Form.Group>
                                <Form.Group as={Col} md="4">
                                    <Form.Label>Sexo:</Form.Label>

                                    <Form.Control as="select" value={this.state.sexo} onChange={this.setSexo} name="slt-sexo" disabled={this.state.editar_dados}>
                                        <option>Selecione...</option>
                                        <option value="F">Feminino</option>
                                        <option value="M">Masculino</option>
                                        <option value="O">Outro</option>
                                        <option value="N">Nenhum</option>

                                    </Form.Control>



                                    <Form.Control.Feedback type="invalid">
                                        {/* {errors.username} */}
                                    </Form.Control.Feedback>
                                </Form.Group>

                            </Row>
                            <Row className="show-grid">
                                <Form.Group as={Col} md="6">

                                    <InputLabel label="Email:" type="email" name="txt-email" onChange={this.setEmail} value={this.state.email} disabled={this.state.editar_dados}></InputLabel>

                                    <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                                </Form.Group>
                                <Form.Group as={Col} md="6">
                                    <InputLabel label="Confirmar Email:" type="email" name="txt-confirm-email" value={this.state.confiremail} disabled={this.state.editar_dados}></InputLabel>

                                    <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                                </Form.Group>
                            </Row>
                            <Row className="show-grid">
                                <Form.Group as={Col} md="6">
                                    <InputLabel label="Senha:" type="password" autocomplete='off' name="txt-senha" onChange={this.setSenha} value={this.state.senha} disabled={this.state.editar_dados}></InputLabel>

                                    <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                                </Form.Group>
                                <Form.Group as={Col} md="6">
                                    <InputLabel label="Confirmar Senha:" autocomplete='off' type="password" name="txt-confirm-senha" value={this.state.confirmsenha} disabled={this.state.editar_dados}></InputLabel>

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