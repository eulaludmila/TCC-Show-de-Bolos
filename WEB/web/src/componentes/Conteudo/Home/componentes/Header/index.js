import React, { Component } from 'react';
import '../../css/style.css';
import './css/header.css';
import './js/index';
// import abrirMenu from '../../img/menu_mobile.jpg';
// import fecharMenu from '../../img/fechar_menu.jpg';
import { Link, browserHistory } from 'react-router';
// import $ from 'jquery';
import { DropdownButton, Dropdown, Nav, Navbar } from 'react-bootstrap'
import decode from 'jwt-decode'
import $ from 'jquery'


export class Header extends Component {

    constructor(props) {
        super(props);

        this.state = { click: "0", clickMenu: "0", listaCategorias: [], listaProdutos: [] };

    }
   


    logout = () => {
        sessionStorage.removeItem('authC')
        browserHistory.push('/')
    }

    fecharMenu = () =>{

        $("#btn-menu").removeClass("navbar-toggler")
        $("#btn-menu").addClass("navbar-toggler collapsed")
        $("#basic-navbar-nav").removeClass("navbar-collapse collapse show")
        $("#basic-navbar-nav").addClass("navbar-collapse collapse")
       

    }


    render() {

        var menucadastrar = ''
        var menuentrar = ''
        var dropdown = ''
        var loginCliente = ''
        var cadastroCliente = ''


        if (sessionStorage.getItem('authC') === null) {
            menuentrar = <Link to='/entrar'><button className=" btn_header entrar_header" type="submit" onClick={this.fecharMenu}>Entrar</button></Link>
            menucadastrar = <Link to='/cadastrar'><button className=" btn_header cadastro_header" type="submit" onClick={this.fecharMenu}>Cadastre-se</button></Link>
            loginCliente = <Link to='/login/cliente' className="login_linha"><span className="login_header" onClick={this.fecharMenu}>Login Cliente</span></Link> 
            cadastroCliente = <Link to='/cadastro/cliente'><span className="login_header" onClick={this.fecharMenu}>Cadastro Cliente</span></Link>
        } else {
            
            var cod = decode(sessionStorage.getItem('authC'))

        dropdown =
        <div className="d-flex justify-content-center mr-5 mb-2">
            <DropdownButton variant='Primary' style={{'width':'100px'}}className="drop_header btn_header" id="dropdown-basic-button" title='Dados'>
                <Link to={"/cliente/" + cod.codUsuario}><div onClick={this.fecharMenu}>Configurações</div></Link>
                <Dropdown.Divider />
                <Dropdown.Item onClick={this.logout}>Sair</Dropdown.Item>
            </DropdownButton>
        </div>
        }

        return (
            <div>

                <div className="container-fluid menu">
                    <div className="center menu_pc">

                        <Navbar bg="#880e4f" expand="lg">
                    
                            <Link to='/'><div className="logo_header"></div></Link>
                            <div className="logo_aux"></div>
                            <Navbar.Brand ><div className="menu_aux"></div></Navbar.Brand>
                            <Link to='/'><div className="d-flex justify-content-center" id="texto_header" onClick={this.fecharMenu}> Show de Bolos</div></Link>
                            <Navbar.Toggle id="btn-menu" aria-controls="basic-navbar-nav" />
                            
                            <Navbar.Collapse id="basic-navbar-nav">
                            
                                <Nav className="mr-auto">
                                <Link to='/'><div className="item_menu" onClick={this.fecharMenu}>Início</div></Link>
                                    <Link to="/produtos"><div className="item_menu" onClick={this.fecharMenu}>Produtos</div></Link>
                                    <Link to="/confeiteiros"><div className="item_menu" onClick={this.fecharMenu}>Confeiteiros</div></Link>
                                    
                                    <Link to='/faleconosco'><div className="item_menu" onClick={this.fecharMenu}>Contato</div></Link>
                                    <Link to='/sobre'><div className="item_menu" onClick={this.fecharMenu}>Sobre</div></Link>
                                    {loginCliente}
                                    {cadastroCliente}
                                    {menuentrar}
                                {menucadastrar}
                                {dropdown}
                                </Nav>
                               
                            </Navbar.Collapse>
                        </Navbar>
                    </div>
                </div>
                <div className="espaco_menu"></div>

            </div>
           




        );
    }

}
