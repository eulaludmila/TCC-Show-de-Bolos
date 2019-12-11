import React, { Component } from 'react';
import img from '../../../img/bolo.jpg'
// import '../../../css/font/all.css'
import { Link, browserHistory } from 'react-router';
import { ipAPI, ipFotos } from '../../../link_config';
import axios from 'axios';
import { Accordion, Button } from 'react-bootstrap'
import './menu_adm_profissional.css'
// import $ from 'jquery';

class Menu extends Component {

    //CONSTRUTOR DECLARANDO OS ESTADOS
    constructor(props) {
        super(props);

        this.state = { listaProdutos: [], img: '', click1: 0,click2: 0,click3: 0, classe1: 'seta-efeito',classe2: 'seta-efeito',classe3: 'seta-efeito' };

    }

    componentDidMount() {
        axios.get(`${ipAPI}confeiteiro/` + this.props.codConfeiteiro, { headers: { 'Authorization': sessionStorage.getItem('auth') } })
            .then(resposta => {
                

                const dados = resposta.data;

                this.setState({ listaProdutos: dados });
                if (dados.foto !== null) {

                    this.setState({ img: ipFotos + dados.foto });
                } else {
                    this.setState({ img: img });
                }

            })
    }

    abrir = (id) => {
        if (this.state.click1 === 0 && id === 'seta1') {
            this.setState({ classe1: 'seta-efeito fechar' })
            this.setState({ classe2: 'seta-efeito abrir-com-efeito' })
            this.setState({ classe3: 'seta-efeito abrir-com-efeito' })


            this.setState({ click1: 1 })
            this.setState({ click2: 0 })
            this.setState({ click3: 0 })

        } else if(this.state.click2 === 0 && id === 'seta2'){
            this.setState({ classe2: 'seta-efeito fechar' })
            this.setState({ classe1: 'seta-efeito abrir-com-efeito' })
            this.setState({ classe3: 'seta-efeito abrir-com-efeito' })

            this.setState({ click1: 0 })
            this.setState({ click3: 0 })
            this.setState({ click2: 1 })
        }else if(this.state.click3 === 0 && id === 'seta3'){
            this.setState({ classe1: 'seta-efeito abrir-com-efeito' })
            this.setState({ classe2: 'seta-efeito abrir-com-efeito' })
            this.setState({ classe3: 'seta-efeito fechar' })

            this.setState({ click3: 1 })
            this.setState({ click1: 0 })
            this.setState({ click2: 0 })
        
        }else {
            this.setState({ classe1: 'seta-efeito abrir-com-efeito' })
            this.setState({ classe2: 'seta-efeito abrir-com-efeito' })
            this.setState({ classe3: 'seta-efeito abrir-com-efeito' })

            this.setState({ click1: 0 })
            this.setState({ click2: 0 })
            this.setState({ click3: 0 })
        }


    }

    home = () =>{
        browserHistory.push("/adm/profissional/" + this.props.codConfeiteiro)
    }

    logout = () =>{
        sessionStorage.removeItem('auth')
        browserHistory.push("/")
    }

    render() {
        return (
            <div >
                <div className="embaixo">

                </div>
                <div id="segura_tudo" className="centralizar">
                    {/* <!-- Menu vertical  --> */}
                    <div className="caixa_imagem_confeiteiro">
                        <div className="imagem_confeiteiro">
                            <img src={this.state.img} alt={this.state.listaProdutos.nome} title={this.state.listaProdutos.nome} className="imagem_confeiteiro" style={{ 'width': '100%', 'height': '100%' }}></img>
                        </div>
                    </div>
                    <div className="nome_confeiteiro"><div className="nome-icone"><i className="fas fa-user-alt"></i></div><div className="nome-texto-icone">{this.state.listaProdutos.nome + " " + this.state.listaProdutos.sobrenome}</div></div>
                    <Accordion>
                        <div >
                            <div className="info-principal">
                                <Accordion.Toggle as={Button} onClick={() => this.abrir("seta1")} className="button-icone linha-icone" variant="link" eventKey="0" >
                                    <div className="icone"><i className="fas fa-user-edit"></i></div><div className="texto-icone">Seus Dados</div><div className={this.state.classe1} ><i className="fa fa-chevron-down"></i></div>
                                </Accordion.Toggle>
                            </div>
                            <Link to={"/adm/profissional/editar_dados_pessoais/"+this.props.codConfeiteiro}><Accordion.Collapse eventKey="0" className="itens">
                                <div className="info">Dados Pessoais</div>
                            </Accordion.Collapse></Link>
                            <Link to={"/adm/profissional/editar_endereco/" + this.props.codConfeiteiro}><Accordion.Collapse eventKey="0" className="itens">
                                <div className="info">Endereço</div>
                            </Accordion.Collapse></Link>
                            <Link to={"/adm/profissional/email/" + this.props.codConfeiteiro}><Accordion.Collapse eventKey="0" className="itens">
                                <div className="info">E-mail</div>
                            </Accordion.Collapse></Link>
                            <Link to={"/adm/profissional/senha/" + this.props.codConfeiteiro}><Accordion.Collapse eventKey="0" className="itens">
                                <div className="info">Senha</div>
                            </Accordion.Collapse></Link>
                        </div>
                        <div>
                            <div className="info-principal">
                                <Accordion.Toggle as={Button} onClick={() => this.abrir("seta2")} className="button-icone linha-icone" variant="link" eventKey="1" >
                                    <div className="icone"><i className="fas fa-shopping-cart"></i></div> <div className="texto-icone">Produtos</div><div className={this.state.classe2} ><i className="fa fa-chevron-down"></i></div>
                                </Accordion.Toggle>
                            </div>
                            <Link to={"/adm/profissional/produtos/" + this.props.codConfeiteiro}><Accordion.Collapse eventKey="1" className="itens">
                                <div className="info">Seus Produtos</div>
                            </Accordion.Collapse></Link>
                            <Link to={"/adm/profissional/cadastro_produtos/" + this.props.codConfeiteiro}><Accordion.Collapse eventKey="1" className="itens">
                                <div className="info">Cadastrar Produtos</div>
                            </Accordion.Collapse></Link>
                        </div>
                        <div >
                            <div className="info-principal">
                                <Accordion.Toggle as={Button} onClick={() => this.abrir("seta3")} className="button-icone linha-icone" variant="link" eventKey="2" >
                                    <div className="icone"><i className="fas fa-shopping-basket"></i></div> <div className="texto-icone">Pedidos</div><div className={this.state.classe3} ><i className="fa fa-chevron-down"></i></div>
                                </Accordion.Toggle>
                            </div>
                            <Link to={"/adm/profissional/todos_produtos/" + this.props.codConfeiteiro}><Accordion.Collapse eventKey="2" className="itens">
                                <div className="info">Todos os Pedidos</div>
                            </Accordion.Collapse></Link>
                            <Link to={"/adm/profissional/pedidos_em_producao/" + this.props.codConfeiteiro}><Accordion.Collapse eventKey="2" className="itens">
                                <div className="info">Pedidos em Produção</div>
                            </Accordion.Collapse></Link>
                        </div>
                        <div >
                            <div className="info-home">
                                <Accordion.Toggle as={Button} onClick={this.home} className="button-icone linha-icone" variant="link" eventKey="3">
                                    <div className="icone"><i className="fas fa-home"></i></div><div className="texto-icone"> Home</div>
                                </Accordion.Toggle>
                            </div>
                        </div>
                        <div >
                            <div className="info-sair">
                                <Accordion.Toggle as={Button} onClick={this.logout} className="button-icone linha-icone" variant="link" eventKey="4">
                                    <div className="icone"><i className="fas fa-sign-out-alt"></i></div><div className="texto-icone"> Sair</div>
                                </Accordion.Toggle>
                            </div>
                        </div>
                    </Accordion>


                </div>
            </div>

        );
    }
}

export default Menu;
