import React, { Component } from 'react';

export default class TextAvaliar extends Component{
    render(){
        return(
            <div>
                <h4>{this.props.titulo}</h4>
                <textarea className={this.props.className} onFocus={this.props.onFocus} id={this.props.id} rows={this.props.rows} disabled={this.props.disabled}></textarea>
            </div>
        );
    }
}