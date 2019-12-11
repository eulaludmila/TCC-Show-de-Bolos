import React, { Component } from 'react';
// import '../../css/style.css';
import Carousel from 'react-bootstrap/Carousel'
import img from '../../../../../img/blur.jpg'
import img2 from '../../../../../img/bolo_frutas.jpg'
import img3 from '../../../../../img/baked_goods.jpg'

export class SliderHome extends Component{

    constructor(props){
        super(props)
        this.state = {index:0, setIndex:0, direction:null,setDirection:null}
    }

    handleSelect = (selectedIndex, e) => {
      this.setState({index:selectedIndex});
      this.setState({direction:e.direction});
    };
    render(){
        return (
                
                    <Carousel activeIndex={this.state.index} direction={this.state.direction} onSelect={this.handleSelect}>
                    <Carousel.Item className="foto-carrossel">
                    <img
                        className="d-block w-100 h-100"
                        src={img}
                        alt="First slide"
                    />
                    <Carousel.Caption>
                        <h3>Show de Bolos</h3>
                        <p>Venham fazer parte dessa doçura</p>
                    </Carousel.Caption>
                    </Carousel.Item>
                    <Carousel.Item className="foto-carrossel">
                    <img
                        className="d-block w-100 h-100"
                        src={img2}
                        alt="Second slide"
                    />
            
                    <Carousel.Caption>
                        <h3>Clientes</h3>
                        <p>Encontre tudo o que você precisa para sua festa de aniversário.</p>
                    </Carousel.Caption>
                    </Carousel.Item>
                    <Carousel.Item className="foto-carrossel">
                    <img
                        className="d-block w-100 h-100"
                        src={img3}
                        alt="Third slide"
                    />
            
                    <Carousel.Caption>
                        <h3>Confeiteiros </h3>
                        <p>
                        Gerencie seus produtos, veja seu histórico de atendimento e muito mais.
                        </p>
                    </Carousel.Caption>
                    </Carousel.Item>
                </Carousel>
        );
    }
}
  
