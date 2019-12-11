import React, {Component} from 'react';

export default class Titulos extends Component{
    render(){
        return(
            <div>
                <h3 className="text-center mt-3">{this.props.titulo}</h3>
                <hr></hr>
            </div>
            
        );
    }
}