import React, {Component} from 'react';

//CLASSE SELECT FEMININO OU MASCULINO
class SelectCadastro extends Component{
    render(){
        return(
            <div className="form-group col-xl-3 col-lg-3 col-md-4 col-sm-12 col-12">
                <label htmlFor="sexo">Sexo</label>
                <select id={this.props.id} onChange={this.props.onChange} className="form-control">
                    <option defaultValue>Selecione o sexo...</option>
                    <option value="F">Feminino</option>
                    <option value="M">Masculino</option>
                    <option value="O">Outro</option>
                    <option value="N">Não informar</option>
                </select>
            </div>
        )
    }
}

export default SelectCadastro;