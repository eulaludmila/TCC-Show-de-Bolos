import React, {Component} from 'react';
import '../css/entrarCadastrar.css';
import {Link} from "react-router";
// import GridAreaClienteProfissional from '../GridAreaClienteProfissional';


class Cadastrar extends Component{


    render(){
        return(
            
    
                    <div className="container area_entrar pt-5">
                        
                        <div><h1 className="mb-5 mt-5 text-center">Venha fazer parte dessas doçuras</h1></div>
                        <p className="mb-5 pt-5 lead">Venha aproveitar essa oportunidade de estar por dentro de produtos e serviços de alta qualidade. Oferecemos diversas novidades que estarão a sua disposição a qualquer momento.</p>
                    
                        {/* // <!--CONTEUDO PARA ENTRAR NA DASHBOARD--> */}
                        <div className="row justify-content-center pt-5">
                        
                            {/* // <!-- ÁREA DE ENTRAR PARA O CLIENTE --> */}
                            <div className="col-xl-5 col-lg-5 col-md-5 col-sm-12 col-12 entrar-cliente mb-4 mr-auto">
                            
                            
                                <div className="row">
                                
                                    {/* {/* {/* // <!-- ICONE CLIENTE-->  */}
                                    <div className="col-xl-3 col-lg-2 col-md-2 col-sm-2 col-12 icone_entrar_cliente"></div>
                                
                                    {/* // <!-- LINKS PARA ENTRAR PARA ÁREA DO CLIENTE--> */}
                                    <div className="col-xl-7 col-lg-8 col-md-8 col-sm-8 col-10 titulo_entrar"><Link to="/cadastro/cliente" style={{color:'black' }}><h3>Cadastre-se como Cliente</h3></Link></div>
                                
                                    {/* // <!-- SETA --> */}
                                    <div className="col-xl-2 col-lg-2 col-md-2 col-sm-2 col-2 img_entrar"><div className="imagem_seta"></div></div>
                                
                                    {/* // <!-- INFO SOBRE A ÁREA DO CLIENTE --> */}
                                    <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12 info_entrar"> 
                                        <p>
                                            Encontre tudo o que você precisa de
                                            guloseimas para a sua festa de aniversário.
                                    </p>
                                    </div>
                                </div>
                            
                            
                            </div> 

                            {/* <GridAreaClienteProfissional estilo="col-xl-5 col-lg-5 col-md-5 col-sm-12 col-12 entrar-cliente mb-4 mr-auto"
                            titulo="Entre como Cliente" icone="col-xl-7 col-lg-8 col-md-8 col-sm-8 col-10 titulo_entrar" informacao="Encontre tudo o que você precisa de
                            guloseimas para a sua festa de aniversário."></GridAreaClienteProfissional> */}
                        
                            {/* // <!-- ÁREA DE ENTRAR PARA O PROFISSIONAL --> */}
                            <div className="col-xl-5 col-lg-5 col-md-5 col-sm-12 col-12 entrar-cliente mb-4">
                                <div className="row">
                                
                                    {/* // <!-- ICONE PROFISSIONAL --> */}
                                    <div className="col-xl-3 col-lg-2 col-md-2 col-sm-2 col-12 icone_entrar_profissional"></div>
                                
                                    {/* // <!-- LINKS PARA ENTRAR PARA ÁREA DO PROFISSIONAL --> */}
                                    <div className="col-xl-7 col-lg-8 col-md-8 col-sm-8 col-10 titulo_entrar"><Link to="/cadastro/profissional" style={{color:'black' }}><h3>Cadastre-se como Confeiteiro</h3></Link></div>
                                    
                                    {/* // <!-- SETA --> */}
                                    <div className="col-xl-2 col-lg-2 col-md-2 col-sm-2 col-2 img_entrar"><div className="imagem_seta"></div></div>
                                
                                    {/* // <!-- INFO SOBRE A ÁREA DO PROFISSIONAL --> */}
                                    <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12 info_entrar"> 
                                        <p>
                                            Gerencie seus produtos, veja seu
                                            histórico de atendimento e muito mais.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        
                        </div>
                        
                    </div>
             
        );
    }

}

export default Cadastrar;