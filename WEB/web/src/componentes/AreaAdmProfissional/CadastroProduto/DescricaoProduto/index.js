import React, {Component} from 'react';
import '../../../../css/bootstrap.min.css';

//CLASSE DO INPUT DO CADASTRO
class DescricaoProduto extends Component{

    render(){
        return(
            <div className={this.props.className}>
                <label htmlFor={this.props.id}>{this.props.label}</label>
                <textarea className="form-control" id={this.props.id} onChange={this.props.onChange}></textarea>
            </div>
        )
    }
}

export default DescricaoProduto;