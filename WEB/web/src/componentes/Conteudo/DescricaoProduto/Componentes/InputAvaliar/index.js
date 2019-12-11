import React, { Component } from 'react';

export default class InputAvaliar extends Component{
    render(){
        return(
            <div className={this.props.className}>
                <label>{this.props.label}</label>
                <input type={this.props.type} value={this.props.value} id={this.props.id} className={this.props.classeIp} onFocus={this.props.onFocus} onChange={this.props.onChange} disabled={this.props.disabled}></input>
            </div>
        );
    }
}