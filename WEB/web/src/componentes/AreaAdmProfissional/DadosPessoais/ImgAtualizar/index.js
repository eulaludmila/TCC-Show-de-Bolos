import React, {Component} from 'react';


export class ImgAtualizar extends Component{
    render(){
        return(
            <img className="imagem_confeiteiro" alt="la" id={this.props.id}  src={this.props.src}/>
        );
    }
}