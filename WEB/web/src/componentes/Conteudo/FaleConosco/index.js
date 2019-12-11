import React,{Component} from 'react'
import './faleconosco.css'
import {Form, InputGroup,Button} from 'react-bootstrap'
import axios from 'axios'
import {ButtonToolbar} from 'react-bootstrap'
import {ModalCadastro} from '../../Modal'
import { ipAPI } from '../../../link_config';
export class FaleConosco extends Component{

    constructor(props){
        super(props)
        this.state = {nome:'', email:'',mensagem:'', assunto:'', show:false}
    }


    setNome = (evento) =>{

        this.setState({nome:evento.target.value})

    }

    setEmail = (evento) =>{

        this.setState({email:evento.target.value})
    }

    setAssunto = (evento) =>{

        this.setState({assunto:evento.target.value})
    }
    
    setMensagem = (evento) =>{

        this.setState({mensagem:evento.target.value})
    }

    validaCampos = (event) => {
        event.preventDefault();
    }

    close=()=>{
        this.setState({show:false});
    }

    enviarForm = (event) => {
        event.preventDefault()
        var dados = {nome: this.state.nome, email:this.state.email,assunto:this.state.assunto, mensagem:this.state.email}
        axios.post(`${ipAPI}faleconosco`, dados, {headers: {'Content-Type': 'application/json'}}).then((res) => {this.setState({nome:''});this.setState({email:''});this.setState({assunto:''});this.setState({mensagem:''});this.setState({show:true}); }).catch((err) => {console.log("AXIOS ERROR: ", err);})
    }

    render(){
        return(
           
            <div className='container faleconosco'>
                <div className='caixa-form-fale-conosco center'>
                <h1 className='center titulo-fale-conosco'>Fale Conosco</h1>
                <div className='texto-fale-conosco'><p>Bem-vindo a nossa área de fale conosco. Esse é uma espaço exclusivamente reservado para que você nos envie a sua crítica, sugestão ou agradecimento. Agradecemos a sua mensagem e em breve entraremos em contato.</p></div>
                <Form onSubmit={this.enviarForm}>
                    
                        <Form.Group  controlId="formGridEmail">
                            <Form.Label>*Nome:</Form.Label>
                            <Form.Control type="text" placeholder="Digite seu nome" value = {this.state.nome}
                                        onChange={this.setNome}/>
                        </Form.Group>
                        <Form.Group >
                            <Form.Label>*Email:</Form.Label>
                            <InputGroup>
                                <InputGroup.Prepend>
                                <InputGroup.Text id="inputGroupPrepend">@</InputGroup.Text>
                                </InputGroup.Prepend>
                                <Form.Control
                                    type="email"
                                    placeholder="Digite seu email"
                                    aria-describedby="inputGroupPrepend"
                                    required
                                    value = {this.state.email}
                                    onChange={this.setEmail}
                                />
                            </InputGroup>
                        </Form.Group>

                        
                    

                    <Form.Group controlId="formGridAddress1">
                        <Form.Label>*Assunto: </Form.Label>
                        <Form.Control value = {this.state.assunto}
                                    onChange={this.setAssunto}/>
                    </Form.Group>

                    <Form.Group controlId="formGridAddress1">
                        <Form.Label>*Mensagem:</Form.Label>
                        <Form.Control as='textarea' rows='6' value = {this.state.mensagem}
                                    onChange={this.setMensagem}/>
                    </Form.Group>
                    <Form.Group controlId="formBasicCheckbox">
                        <label>* Campos obrigatórios</label>
                    </Form.Group>


                    <Button variant="primary" className='center' type="submit">
                        Enviar
                    </Button>
                    </Form>
                </div>

                <ButtonToolbar>
                    <ModalCadastro titulo="Enviado com sucesso! Obrigado pela sua mensagem <3"
                        show={this.state.show}
                        onHide={this.close}
                    />
                </ButtonToolbar>
            </div>
           
        )
    }
}

export class BoxFaleConosco extends Component{
    render(){
        return(
            <div>
                <FaleConosco></FaleConosco>
            </div>
        )
    }
}