import React, { Component } from 'react';

export default class Descricao extends Component{
    render(){
        return(
            <div className="form-group m-3">
                <h4>Descrição:</h4>
                <textarea className="form-control txtArea" value={this.props.descricao} disabled id="txt_descricao_produto" rows="10"></textarea>
            </div>
        );
    }
}