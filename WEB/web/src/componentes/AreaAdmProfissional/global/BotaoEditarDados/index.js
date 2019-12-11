import React, {Component} from 'react';

export class BotaoEditarDados extends Component{
    render(){
        return(
            <button className={this.props.classe} id={this.props.id}  type={this.props.tipo} onClick={this.props.onClick}>{this.props.id}</button>
        );
    }
}