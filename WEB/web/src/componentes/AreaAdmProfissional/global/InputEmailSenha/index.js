import React, {Component} from 'react';

export class InputEmailSenha extends Component{
    render(){
        return(
                <div>
                    <div className={this.props.grupo}>
                        <label>{this.props.label}</label>
                        <input type={this.props.tipo} onChange={this.props.onChange} value={this.props.value} disabled={this.props.desabilitado} className={this.props.classeInput} id={this.props.id} placeholder={this.props.placeholder}/>
                    </div>
                </div>
        );
    }
}