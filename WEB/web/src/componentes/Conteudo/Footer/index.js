import React, { Component } from 'react';
// import 'font-awesome/css/font-awesome.min.css';
import './css/footer-white.css';
import './css/footer.css';
import {Link} from 'react-router';

export class Footer extends Component{

    render(){
        return(
            <div className="container-fluid rodape">
                <footer id="myFooter">
                    <div className="container">
                        <div className="row">
                            <div className="col-sm-3 mt-4">
                                <h2 className="logo d-flex justify-content-center"> Show de Bolos </h2>
                            </div>
                            <div className="col-sm-2">
                                <h5>Inicio</h5>
                                <ul>
                                    <Link to="/produtos"><li>Produtos</li></Link>
                                    <Link to="/confeiteiros"><li>Confeiteiros</li></Link>
                                </ul>
                            </div>
                            <div className="col-sm-2">
                                <h5>Quem somos</h5>
                                <ul>
                                    <Link to="#"><li>Empresa</li></Link>
                                    <Link to="/sobre"><li>Sobre</li></Link>
                                </ul>
                            </div>
                            <div className="col-sm-2">
                                <h5>Login e Cadastro</h5>
                                <ul>
                                    <Link to="/entrar"><li>Entrar</li></Link>
                                    <Link to="/cadastrar"><li>Cadastrar</li></Link>
                                </ul>
                            </div>
                            <div className="col-sm-3">
                                <div className="social-networks">
                                    <span className="twitter m-2"><i className="fab fa-twitter fa-lg"></i></span>
                                    <span className="facebook m-2"><i className="fab fa-facebook-f fa-lg"></i></span>
                                    <span className="instagram m-2"><i className="fab fa-instagram fa-lg"></i></span>
                                </div>
                                <Link to="/faleconosco"><button type="button" className="btn btn-default">Contato</button></Link>
                            </div>
                        </div>
                    </div>
                    <div className="footer-copyright">
                        <p>© 2019 Copyright - IDeal Innovation</p>
                    </div>
                </footer>
            </div>

        );
    }

}
