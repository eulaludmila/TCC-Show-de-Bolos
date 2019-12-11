import React from 'react'
import ReactLoading from 'react-loading'

export const Carregando = ({loading, message}) => {
    return loading ? (
        
            <div className='wrapper center alin-loading' style={{'width':'10%', 'height':'5vh'}}>
               
                <ReactLoading type='spinningBubbles'  color='#880e4f' height={'35%'} width={'35%'} />

            </div>
    ):null
}

export const CarregandoMaior = ({loading, message}) => {
    return loading ? (
        
            <div className='wrapper center alin-loading' style={{'width':'20%', 'height':'1vh'}}>
               
                <ReactLoading type='spinningBubbles'  color='#880e4f' height={'45%'} width={'45%'} />
                

            </div>
    ):null
}