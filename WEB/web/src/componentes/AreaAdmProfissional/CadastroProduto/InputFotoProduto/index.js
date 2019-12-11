import React, {Component} from 'react';
import '../../../../css/bootstrap.min.css';

//CLASSE DO INPUT DO CADASTRO
class InputFotoProduto extends Component{

    render(){
        return(

            <div className={this.props.className}>
                <label htmlFor={this.props.id}>{this.props.label}</label>
                <div className="img-produto">
                    <img id={this.props.idImg} alt={this.props.alt} title={this.props.alt} src={this.props.src} className="img-thumbnail"/>
                </div>
                <input type={this.props.type} onChange={this.props.onChange} className="form-control mt-2" id={this.props.id}/>
            </div>
        )
    }
}

export default InputFotoProduto;