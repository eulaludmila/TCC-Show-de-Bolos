import React, {Component} from 'react';

export default class Infos extends Component{
    render(){
        return(
            <div className="caixa_esquerda">
                <p className="font_modal text-center">Data de entrega:</p>
                <p className="font_modal text-center">Hora de entrega:</p>
                <p className="font_modal text-center">Pagamento:</p>
                <p className="font_modal text-center">Preço:</p>
            </div>
        );
    }
}