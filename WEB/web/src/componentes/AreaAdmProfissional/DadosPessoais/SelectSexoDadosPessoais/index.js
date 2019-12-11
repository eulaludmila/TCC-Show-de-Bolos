import React, {Component} from 'react';

export class SelectDadosPessoais extends Component{
    render(){
        return(
            <div className="form-group col-md-4">
                <label htmlFor="sexo">Sexo:</label>
                <select id={this.props.id} onChange={this.props.onChange} className="form-control">
                    <option defaultValue>Informe o seu sexo...</option>
                    <option value="M">Masculino</option>
                    <option value="F">Feminino</option>
                    <option value="O">Outros</option>
                    <option value="N">Não informar</option>
                </select>
            </div>
        );
    }
}
