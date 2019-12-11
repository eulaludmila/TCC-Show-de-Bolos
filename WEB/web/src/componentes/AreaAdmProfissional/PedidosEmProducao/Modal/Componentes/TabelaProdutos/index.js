import React, {Component} from 'react';

export default class TabelaProdutos extends Component{
    render(){
        return(
            <table className="table table_modal">
                <thead>
                    <tr>
                        <th scope="col">Produto</th>
                        <th scope="col">Quantidade</th>
                        <th scope="col">Preço</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>Bolo de laranja</td>
                        <td>5</td>
                        <td>R$85.00</td>
                    </tr>
                </tbody>
            </table>
        );
    }
}