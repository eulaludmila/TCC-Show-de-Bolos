import React, { Component } from 'react';
import Produto from './Componentes/Produto';
import LinkApp from './Componentes/LinkApp';
import TotalAvaliacao from './Componentes/TotalAvaliacao';
import Comentarios from './Componentes/Comentarios';
import AvaliarProduto from './Componentes/AvaliarProduto';
import '../../../css/bootstrap.min.css';
import '../DescricaoProduto/css/descricao_produto.css';
import '../DescricaoProduto/css/rate.css';


export class DescricaoProduto extends Component{

    render(){
        return(

            <div className="container">
                <Produto codigo={this.props.params.codProduto}/>
                <LinkApp/>
                <TotalAvaliacao/>
                <Comentarios/>
                <AvaliarProduto codProduto={this.props.params.codProduto}/>   
            </div>
      

        );
    }
}



export default DescricaoProduto;