import React, { Component } from 'react';
import {InputLoginCSS} from '../../../styles';

class InputLogin extends Component{

    render(){
        return(
            <div className="dados-login" style={this.props.style}>
                <label htmlFor={this.props.id}>{this.props.label}</label>
                <InputLoginCSS required minLength="8" ref={this.props.ref} id={this.props.id} onChange={this.props.onChange} value={this.props.value} type={this.props.type} placeholder={this.props.placeholder}/>
            </div>
        )
    }

 
}

export default InputLogin;