import React, { Component } from 'react';
import img from '../../../../../img/bolo_chocolate.jpg'
import Estrelas from 'react-star-ratings'

export default class Comentarios extends Component{
    render(){
        return(
            <div>
                <div className="form-row m-3">
                    <div className="col-md-8 container">
                        <div className="card">
                            <div className="card-body">
                                <img src={img} className="img_pessoa mr-2" alt="Responsive "/>
                                <p className="card-text mt-3">Roberto Carlos - 12/05/2019</p>
                                <p className="card-text">Muito bom! Entrega no horário combinado, sem surpresas! Recomendo boleiro e o bolo!</p>
                                <div className="avaliacao">
                                    <Estrelas starDimension="25px" starRatedColor="#fcba03" starEmptyColor="#dedede" starSpacing="1px" rating={5} numberOfStars={5}></Estrelas>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="form-row mt-3">
                    <div className="col-md-11">
                        <hr className="linha"/>
                    </div>
                </div>
            </div>
        );
    }
}