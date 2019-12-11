import React, { Component } from 'react';

export default class TitulosMaisBaratos extends Component{
    render(){
        return(
            <div className="d-flex justify-content-center col-md-12">
                <h2 className="titulo_perfil">{this.props.titulo}</h2>
            </div>
        );
    }
}