import React, {Component} from 'react';

export class InputEditarEndereco extends Component{
    render(){
        return(
            <div className={this.props.grupo}>
                <label>{this.props.label}</label>
                <input type={this.props.tipo} onChange={this.props.onChange} value={this.props.value} className={this.props.classeInput} disabled={this.props.disabled} id={this.props.id} placeholder={this.props.placeholder}/>
            </div>
        );
    }
}