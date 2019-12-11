import React, {Component} from 'react';
import { ImgPrimeiroCadastroCSS } from '../../../styles'

//classe do img de cadastro do formulário de cadastro, usando estilização de componentes react
class ImgCadastro extends Component{
    render(){
        return(
            <div className="form-group col-xl-2 col-lg-3 col-md-3 col-sm-5 col-5 mr-auto ml-auto mb-5" style={{height: '150px'}} >
                <ImgPrimeiroCadastroCSS className="rounded-circle mb-3" id={this.props.id} width="100%" height="100%" src={this.props.src}/>
                <input className="input-file" type="file" onChange={this.props.onChange} name={this.props.name}/>
            </div>
        )
    }
}

export default ImgCadastro;