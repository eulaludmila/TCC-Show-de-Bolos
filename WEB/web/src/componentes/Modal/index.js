import React, {Component} from 'react'
import imgCadastroRealizado from '../../img/correct.png';
import {Modal} from 'react-bootstrap'

export class ModalCadastro2 extends Component{

    render(){
        return(
            <div>
                {/* <button type="button" class="btn btn-primary" data-toggle="modal" data-target=".bd-example-modal-sm">Small modal</button> */}
              
                <div className="modal fade bd-example-modal-sm" id="my-modal" data-backdrop="static" tabIndex="-1" role="dialog" aria-labelledby="mySmallModalLabel" aria-hidden="true">
                    <div className="modal-dialog modal-dialog-centered" role="document">
                        <div className="modal-content bg-light">
                            <div className="modal-header">
                                <h5 className="modal-title">{this.props.nome}</h5><img src={imgCadastroRealizado} alt={this.props.alt} title={this.props.title}></img>
                                {/* <button type="button" className="close" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                                </button> */}
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-modal btn-success" data-dismiss="modal">Ok</button>
                                
                            </div>
                        </div>
                    </div>
                    
                </div>
            </div>
        )
    }


}

export function ModalCadastro(props){

    return(
        <Modal {...props}
        aria-labelledby="contained-modal-title-vcenter"
        centered >
        <Modal.Header closeButton>
        <Modal.Title>{props.titulo}</Modal.Title>

        </Modal.Header>
     
            <Modal.Body>
                <p className="text-center"> Seu produto foi cadastrado com sucesso!</p>
                <p className="text-center"> Agora ele pode ser visualizado em nosso site</p>
            </Modal.Body>
            <Modal.Footer>
                <button type="button" onClick={props.onHide} className="btn btn-success">OK</button>
            </Modal.Footer>
          
    </Modal>
    )

}