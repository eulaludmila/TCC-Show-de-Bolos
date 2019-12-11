import React, {Component} from 'react'
import './sobre.css'
import img from '../../../img/logoempresa.jpeg'
import confeiteiro from '../../../img/confeiteiro.jpg'
import TituloSobre from './Componentes/TituloSobre';
import TextoSobre from './Componentes/TextoSobre';


export default class Sobre extends Component{
    render(){
        return(
            <div className="container">
                <TituloSobre titulo="Show de Bolos"/>
                <div className="form-row mt-5">
                    <TextoSobre texto="A show de bolos surgiu em Agosto de 2019, com os principais objetivos em expandir o comércio 
                    de confeitaria com a idéia de aproximar o cliente do confeiteiro 
                    sem a necessidade de sair de casa. Assim gerando uma aproximação entre as duas partes 
                    e aumentando o comércio dos confeiteiros caseiros que tem o sonho de vender seus bolos doces e/ou salgados.">
                    </TextoSobre>
                    <div className="form-group col-md-6">
                        <img className='img1-sobre' alt="la" style={{'width':'70%','height':'300px'}} src={confeiteiro}></img>
                    </div>
                </div>
                <div className="form-row mt-3 mb-5">
                    <div className="form-group col-md-6 d-flex justify-content-center">
                        <img className='img-fluid' alt="la" style={{'width':'70%','height':'300px'}} src={img}></img>
                    </div>
                    <TextoSobre texto="Os princípios da empresa se resumem em aproximar os confeiteiros e clientes, 
                    deixando assim uma relação mais próxima entre eles, 
                    vizando facilitar as vendas e as procuras por produtos de alta qualidade e doces para encomenda, 
                    e assim criando mais visibilidades aos confeiteiros para comercializar seus produtos, 
                    gerando um novo formato para trabalhar e aproximar os clientes e admiradores da confeitaria.">
                    </TextoSobre>
                </div>
            </div>
        )
    }
}

export class BoxSobre extends Component{
    render(){
        return(
            <div>
                <Sobre></Sobre>
            </div>
        )
    }
}