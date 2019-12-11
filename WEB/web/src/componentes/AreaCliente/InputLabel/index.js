import React, {Component} from 'react'
import {Form} from 'react-bootstrap'

class InputLabel extends Component{
    render(){
        return(
            <div>
                <Form.Label>{this.props.label}</Form.Label>
                <Form.Control
                    type={this.props.type}
                    name={this.props.name}
                    disabled = {this.props.disabled}
                    id= {this.props.id}
                    className={this.props.className}
                    onChange={this.props.onChange}
                    value={this.props.value}
                />
            </div>
        )
    }
}

export default InputLabel