import React, {Component} from 'react';

export default class Observacoes extends Component{
    render(){
        return(
            <div className="caixa_obs">
                <h4>{this.props.titulo}</h4>
                <textarea className="text_obs" disabled></textarea>
            </div>
        );
    }
}