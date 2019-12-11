import React, { Component } from 'react';

import { SliderHome } from './componentes/SliderHome';
import { Produto } from './componentes/ConteudoProduto';
import { ContainerImagem } from './componentes/ContainerImagem';
import '../../../css/bootstrap.min.css';
import { Confeiteiro } from './componentes/Confeiteiros';

class Home extends Component{

    render(){
        return(

            <div>
                <SliderHome id="header_home" />
                <Produto titulo="BOLOS SIMPLES" codigo="1" id="bolo_simples_home"/>
                <Produto  titulo="BOLOS RECHEADOS" codigo="2" id="bolo_recheado_home"/>
                <ContainerImagem imagem="baixar_app_img" titulo="Fique por dentro dos novos produtos e faça umas compras" conteudoBotao="Baixe nosso App" link="#"/>
                <Produto  titulo="DOCES" codigo="3" id="doce_home"/>
                <ContainerImagem imagem="registre_seu_produto_img" titulo="Registre seu produto aqui" conteudoBotao="SAIBA MAIS" link="/login/profissional"/>
                <Confeiteiro  titulo="NOSSOS CONFEITEIROS" id="profissional_home"/>
                
            </div>
           
        );
    }

}

export default Home;