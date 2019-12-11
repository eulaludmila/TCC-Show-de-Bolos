import React, {Component} from 'react';
import '../../../css/bootstrap.min.css';

//CLASSE DO INPUT DO CADASTRO
class InputCadastro extends Component{

    render(){
        return(
            <div className={this.props.className}>
                <label htmlFor={this.props.id}>{this.props.label}</label>
                <input type={this.props.type} autoComplete={this.props.autocomplete} disabled={this.props.disabled} className="form-control" id={this.props.id} onChange={this.props.onChange} value={this.props.value} placeholder={this.props.placeholder}/>
            </div>
        )
    }
}

export default InputCadastro;