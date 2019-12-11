import React from 'react'
import {Modal} from 'react-bootstrap'
import { ipFotos } from '../../../../link_config'
import './modal_detalhes_produto.css'

export function ModalDetalhesProduto(props){

    return(

        <Modal {...props}
        aria-labelledby="contained-modal-title-vcenter"
        centered >
            
        <Modal.Header closeButton>
            <Modal.Title>{props.nome}</Modal.Title>
        </Modal.Header>

        <Modal.Body>
            <div className="card">
                <img className="card-img-top img_produto" src={ipFotos + props.foto} alt={props.nome} title={props.nome}/>

                <div className="card-body">
                    <p className="card-text">{props.descricao}</p>
                </div>

                <ul className="list-group list-group-flush">
                    <li className="list-group-item">R${props.preco}</li>
                    <li className="list-group-item">{props.categoria}</li>
                    <li className="list-group-item">{props.avaliacao}</li>
                </ul>
            </div>
        </Modal.Body>

        <Modal.Footer>
        
        </Modal.Footer>
    </Modal>
        
    )

    
}