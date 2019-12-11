import React, { Component } from 'react';

import '../../../css/bootstrap.min.css';
import axios from 'axios';
import { ipAPI,ipFotos } from '../../../link_config';
import {Link} from 'react-router'
import Estrelas from 'react-star-ratings'
import {CarregandoMaior} from '../../Carregamento'


export class Confeiteiros extends Component{

    constructor(props){
        super(props);

        this.state = {listaConfeiteiros: [], pesquisa:'',loading:false,itemClicado: "idTodos",todosConfeiteiros:`${ipAPI}confeiteiroDTO/ativo`, melhoresAvaliados:`${ipAPI}confeiteiroDTO/avaliacao/confeiteiros`,listaPesquisa: []}
    }


    componentDidMount(){
        this.setState({loading:true})
        axios.get(ipAPI + "confeiteiroDTO/ativo")
        .then(resposta => {
             const confeiteiro = resposta.data;
            this.setState({loading:false})   
             this.setState({listaConfeiteiros: confeiteiro})
        })

    }

    listarProdutos(idClicado){
        this.setState({listaConfeiteiros: []})
        if(idClicado ==="idTodos"){
            this.setState({loading:true})
            axios.get(ipAPI+"confeiteiroDTO/ativo")
            .then(resposta => {
                this.setState({loading:false}) 
                const confeiteiros = resposta.data;
                this.setState({listaConfeiteiros: confeiteiros})
                
                this.setState({itemClicado: idClicado});
            })
        }else if(idClicado ==="maisAvaliados"){
            this.setState({loading:true})
            axios.get(ipAPI+"confeiteiroDTO/avaliacao/confeiteiros")
            .then(resposta => {
                this.setState({loading:false}) 
                const confeiteiros = resposta.data;
                this.setState({listaConfeiteiros: confeiteiros})
                
                this.setState({itemClicado: idClicado});
            })
        }
        

    }

    
    setPesquisa = (evento) => {
        this.setState({pesquisa: evento.target.value});

        if(evento.target.value === ""){
            this.listarProdutos(this.state.itemClicado)
        }
       
    }

    pesquisar = (pesquisa) => {

        var c = this.state.listaConfeiteiros.filter( 
            evento => pesquisa === evento.nome
        )


        this.setState({listaConfeiteiros: c})

        console.log(this.state.listaConfeiteiros)

    }



    render(){
  
        return(

          

            <div className="container bolo" id={this.props.id}>
          
                
                <div className="container titulo mx-auto">


                    <div className="d-flex justify-content-center">

                        <ul className="nav nav-pills mb-3" id="pills-tab" role="tablist">

                             
                                <li className="nav-item categoria mb-3">
                                    <span className={"idTodos" === this.state.itemClicado ? "nav-link ativo" : "nav-link"}  id="idTodos" onClick={()=>this.listarProdutos("idTodos")}>Todos</span>
                                </li>
                                <li className="nav-item categoria">
                                    <span className={"maisAvaliados" === this.state.itemClicado ? "nav-link ativo" : "nav-link"}  id="maisAvaliados" onClick={()=>this.listarProdutos("maisAvaliados")}>Melhores Avaliados</span>
                                </li>

                            

                        </ul>

                    </div>
                    <hr className="linha-separa"></hr>

                    <div className="container caixa-pesquisa">
                        <div className="row ">
                            <div className="input-group pesquisa center">
                                <input type="text"  className="form-control border-0 flexdatalist-alias flex0 input-pesquisa" id="pesquisa" onChange={this.setPesquisa} placeholder="Pesquisa por um confeiteiro ..."/>
                                <div className="input-group-append">
                                    <button className="btn btn-pesquisa btn-sm px-3 border-0" type="submit" onClick={() => this.pesquisar(this.state.pesquisa)}></button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                

                <div className="container produtos-todos">
                <CarregandoMaior loading={this.state.loading} message='carregando ...'></CarregandoMaior>
                {this.state.listaConfeiteiros.map(confeiteiro =>
                    <div key={confeiteiro.codConfeiteiro}>
                        <Link to={"/confeiteiro/" + confeiteiro.codConfeiteiro}>
                        <div className="card text-center prod-conf-pag mb-5"  style={{'width': '14rem'}}>
                            <img className="card-img-top imagens-bolos" src={ipFotos+confeiteiro.foto} alt={confeiteiro.nome}/>
                            <div className="card-body">
                                <h5 className="card-title nome-bolo-adm">{confeiteiro.nome}</h5>
                                <div className="avaliacao">
                                    
                                    <Estrelas starDimension="25px" starRatedColor="#fcba03" starEmptyColor="#dedede" starSpacing="1px" rating={confeiteiro.avaliacao} numberOfStars={5}></Estrelas>
                                </div>
                            </div>
                        </div>
                        </Link>
                    </div>
                )}
                </div>
            </div> 
           
                
        
        
        );
    }

}
