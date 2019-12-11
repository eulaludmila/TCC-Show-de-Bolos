import React from 'react';
import { Route, Router, browserHistory, IndexRoute } from 'react-router';
import Home from './componentes/Conteudo/Home';
import Site from './componentes/Rota/Site';
import Cadastro from './componentes/Rota/Cadastro';
import Login from './componentes/Rota/Login';
import Produtos from './componentes/Conteudo/Produtos';
import { Confeiteiros } from './componentes/Conteudo/Confeiteiros'

import EntrarLogin from './componentes/Conteudo/EntrarCadastrar/Entrar';
import CadastrarLogin from './componentes/Conteudo/EntrarCadastrar/Cadastrar';
import { BoxSobre } from './componentes/Conteudo/Sobre'
import { BoxFaleConosco } from './componentes/Conteudo/FaleConosco'
import DescricaoProduto from './componentes/Conteudo/DescricaoProduto'
import Perfil from './componentes/Conteudo/PerfilConfeiteiro/Perfil';
import ProdutosConfeiteiro from './componentes/Conteudo/PerfilConfeiteiro/ProdutosConfeiteiro';
import MelhoresAvaliados from './componentes/Conteudo/PerfilConfeiteiro/MelhoresAvaliados';
import MaisBaratos from './componentes/Conteudo/PerfilConfeiteiro/MaisBaratos';

import CadastroCliente from './componentes/FormularioCadastro/CadastroCliente';
import CadastroProfissional from './componentes/FormularioCadastro/CadastroProfissional';
import CadastroProfissionalEndereco from './componentes/FormularioCadastro/CadastroProfissional/CadastroEndereco';
import CadastroProfissionalFoto from './componentes/FormularioCadastro/CadastroProfissional/CadastroFoto';
import { AreaCliente } from './componentes/AreaCliente';

import LoginCliente from './componentes/Login/LoginCliente';
import LoginProfissional from './componentes/Login/LoginProfissional';

import AdmProfissional from './componentes/Rota/AdmProfissional'
import { BoxHomeProfissional } from './componentes/AreaAdmProfissional/HomeProfissional'
import { BoxCadastroProdutos } from './componentes/AreaAdmProfissional/ProdutosCadastrados'
import { BoxEditarDadosPessoais } from './componentes/AreaAdmProfissional/DadosPessoais'
import { BoxEditarEndereco } from './componentes/AreaAdmProfissional/EditarEndereco'
import { BoxTelaEmail } from './componentes/AreaAdmProfissional/Email'
import { BoxTelaSenha } from './componentes/AreaAdmProfissional/Senha'
import { BoxPedidos } from './componentes/AreaAdmProfissional/PedidosEmProducao'
import { BoxTodosAguardandoResposta } from './componentes/AreaAdmProfissional/TodosProdutos/Componentes/TodosAguardandoResposta';
import { BoxTodosAprovados } from './componentes/AreaAdmProfissional/TodosProdutos/Componentes/TodosAprovados';
import { BoxTodosRecusados } from './componentes/AreaAdmProfissional/TodosProdutos/Componentes/TodosRecusados';
import { BoxTodosProdutos } from './componentes/AreaAdmProfissional/TodosProdutos';
import { BoxCadastrarProdutos } from './componentes/AreaAdmProfissional/CadastroProduto';
import { BoxTodosNaoIniciados } from './componentes/AreaAdmProfissional/PedidosEmProducao/Componentes/TodosNaoIniciados';
import { BoxTodosEmAndamento } from './componentes/AreaAdmProfissional/PedidosEmProducao/Componentes/TodosEmAndamento';
import { BoxTodosFinalizados } from './componentes/AreaAdmProfissional/PedidosEmProducao/Componentes/TodosFinalizados';



export const Rota = () => (
    <Router history={browserHistory} >
        <Route path="/" component={Site}>

            <IndexRoute component={Home}></IndexRoute>
            <Route path="/entrar" component={EntrarLogin}></Route>
            <Route path="/cadastrar" component={CadastrarLogin}></Route>
            <Route path="/produtos" component={Produtos}></Route>
            <Route path="/faleconosco" component={BoxFaleConosco}></Route>
            <Route path="/sobre" component={BoxSobre}></Route>
            <Route exact path="/descricao/:codProduto" component={DescricaoProduto}></Route>
            <Route path="/confeiteiros" component={Confeiteiros}></Route>
            <Route path="/cliente/:codCliente" component={AreaCliente}></Route>
            <Route exact path="/confeiteiro/:codConfeiteiro" component={Perfil}></Route>
            <Route exact path="/confeiteiro/:codConfeiteiro/produto" component={ProdutosConfeiteiro}></Route>
            <Route exact path="/confeiteiro/:codConfeiteiro/produto/melhoravaliados" component={MelhoresAvaliados}></Route>
            <Route exact path="/confeiteiro/:codConfeiteiro/produto/menorpreco" component={MaisBaratos}></Route>
            <Route exact path="/confeiteiro/:codConfeiteiro/produto/menorpreco" component={MaisBaratos}></Route>

        </Route>
        <Route path="/cadastro" component={Cadastro}>

            <Route path="/cadastro/cliente" component={CadastroCliente}></Route>
            <Route path="/cadastro/profissional" component={CadastroProfissional}></Route>
            <Route path="/cadastro/profissional/endereco" component={CadastroProfissionalEndereco}></Route>
            <Route path="/cadastro/profissional/foto" component={CadastroProfissionalFoto}></Route>

        </Route>
        <Route path="/login" component={Login}>

            <Route path="/login/cliente" component={LoginCliente}></Route>
            <Route path="/login/profissional" component={LoginProfissional}></Route>

        </Route>
        <Route path="/adm/profissional/:codConfeiteiro" component={AdmProfissional}>

            <IndexRoute component={BoxHomeProfissional}></IndexRoute>
            <Route path="/adm/profissional/produtos/:codConfeiteiro" component={BoxCadastroProdutos}></Route>
            <Route path="/adm/profissional/editar_dados_pessoais/:codConfeiteiro" component={BoxEditarDadosPessoais}></Route>
            <Route path="/adm/profissional/editar_endereco/:codConfeiteiro" exact component={BoxEditarEndereco}></Route>
            <Route path="/adm/profissional/email/:codConfeiteiro" component={BoxTelaEmail}></Route>
            <Route path="/adm/profissional/senha/:codConfeiteiro" component={BoxTelaSenha}></Route>
            <Route path="/adm/profissional/pedidos_em_producao/:codConfeiteiro" component={BoxPedidos}></Route>
            <Route path="/adm/profissional/cadastro_produtos/:codConfeiteiro" component={BoxCadastrarProdutos}></Route>
            <Route path="/adm/profissional/todos_produtos/:codConfeiteiro/aguardando_resposta" component={BoxTodosAguardandoResposta}></Route>
            <Route path="/adm/profissional/todos_produtos/:codConfeiteiro/aprovados" component={BoxTodosAprovados}></Route>
            <Route path="/adm/profissional/todos_produtos/:codConfeiteiro/recusados" component={BoxTodosRecusados}></Route>
            <Route exact path="/adm/profissional/cadastro_produtos/:codProduto?" component={BoxCadastrarProdutos}></Route>
            <Route path="/adm/profissional/todos_produtos/:codConfeiteiro" component={BoxTodosProdutos}></Route>
            <Route path="/adm/profissional/pedidos_em_producao/:codConfeiteiro/nao_iniciados" component={BoxTodosNaoIniciados}></Route>
            <Route path="/adm/profissional/pedidos_em_producao/:codConfeiteiro/em_andamento" component={BoxTodosEmAndamento}></Route>
            <Route path="/adm/profissional/pedidos_em_producao/:codConfeiteiro/finalizados" component={BoxTodosFinalizados}></Route>
        </Route>
    </Router>
)