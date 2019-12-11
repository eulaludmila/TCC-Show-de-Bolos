import React, {Component} from 'react';

export default class SubTitulo extends Component{
    render(){
        return(
            <div className="caixa_subTitulo_modal">
                <h4 className="text-center">{this.props.sub}</h4>
                <hr></hr>
            </div>
        );
    }
}