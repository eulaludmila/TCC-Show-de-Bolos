import React, { Component } from 'react';
import '../../css/style.css';
import {Link} from 'react-router';
import classnames from 'classnames';




export class ContainerImagem extends Component{

    render(){
        return(
            <div className={classnames('container-fluid propaganda',this.props.imagem )}>
                <div className="prop">
                    <div className="titulo_propaganda">
                        <h1>{this.props.titulo}</h1>
                        <div className='caixa_botao_app'>
                            <Link to={this.props.link}><button type="button" className="btn btn-block btn-outline-light">{this.props.conteudoBotao}</button></Link>   
                        </div>
                    </div>
                </div>
            </div>
        );
    }

}
