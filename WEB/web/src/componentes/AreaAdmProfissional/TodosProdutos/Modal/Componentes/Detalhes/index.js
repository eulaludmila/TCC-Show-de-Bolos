import React, {Component} from 'react';

export default class Detalhes extends Component{
    render(){
        return(
            <div className="caixa_direita">
                <p className="font_modal">10/12/2020</p>
                <p className="font_modal">Até as 20:25</p>
                <p className="font_modal">Boleto</p>
                <p className="font_modal">R$250.00</p>
            </div>
        );
    }
}