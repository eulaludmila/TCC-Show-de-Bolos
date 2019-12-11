import React, {Component} from 'react'

export default class TextoSobre extends Component{
    render(){
        return(
            <div className="form-group col-md-6 d-flex align-items-center">
                <p className="text-justify texto-sobre">
                    {this.props.texto}
                </p>
            </div>
        );
    }
}