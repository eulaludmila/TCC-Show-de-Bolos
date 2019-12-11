import React, { Component } from 'react';

export default class LinkApp extends Component{
    render(){
        return(
            <div>
                <div className="form-row mt-4">
                    <div className="col-md-7 container">
                        <p className="font_normal">Deseja fazer uma encomenta? <span>baixe nosso App</span></p>
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