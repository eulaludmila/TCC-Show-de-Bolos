package br.senai.sp.api.repository;

import java.util.List;

import org.springframework.data.domain.PageRequest;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import br.senai.sp.api.model.Pedido;
import br.senai.sp.api.model.Produto;

public interface PedidoRepository extends JpaRepository<Pedido, Long>{

	
	@Query("select distinct ip.pedido from ItemPedido ip where ip.produto.confeiteiro=?1 and ip.pedido.status='E' and ip.pedido.aprovacao='A' order by ip.pedido.dataEntrega asc")
	List<Pedido> findByPedidoEmAguardeLimit(Long codConfeiteiro, PageRequest pageRequest);
	
//	@Query(value="select",nativeQuery=true)
//	List<Pedido> findByPedidoEmAguardeLimit(Long codConfeiteiro, PageRequest pageRequest);

	@Query("select distinct ip.pedido from ItemPedido ip where ip.produto.confeiteiro=?1 and ip.pedido.status='R' and ip.pedido.aprovacao='A'")
	List<Pedido> findByPedidoRecusadoLimit(Long codConfeiteiro, PageRequest pageRequest);
	
	@Query("select distinct ip.pedido from ItemPedido ip where ip.produto.confeiteiro=?1 and ip.pedido.status='A' and ip.pedido.aprovacao='A'")
	List<Pedido> findByPedidoAprovadoLimit(Long codConfeiteiro, PageRequest pageRequest);
	
	
	//CONFEITEIRO MOBILE
	@Query("select ip.pedido from ItemPedido ip where ip.produto.confeiteiro=?1 and ip.pedido.status='E' and ip.pedido.aprovacao='A' order by ip.pedido.dataEntrega asc")
	List<Pedido> findByPedidoMobileEmAguarde(Long codConfeiteiro);
	
	@Query("select ip.pedido from ItemPedido ip where ip.produto.confeiteiro=?1 and ip.pedido.status='R' and ip.pedido.aprovacao='A' order by ip.pedido.dataEntrega asc")
	List<Pedido> findByPedidoMobileRecusado(Long codConfeiteiro);
	
	@Query("select ip.pedido from ItemPedido ip where ip.produto.confeiteiro=?1 and ip.pedido.status='A' and ip.pedido.aprovacao='A' order by ip.pedido.dataEntrega asc")
	List<Pedido> findByPedidoMobileAprovado(Long codConfeiteiro);
	
	
	//CONFEITEIRO WEB
	@Query("select distinct ip.pedido from ItemPedido ip where ip.produto.confeiteiro=?1 and ip.pedido.status='E' and ip.pedido.aprovacao='A' order by ip.pedido.dataEntrega asc")
	List<Pedido> findByPedidoWebEmAguarde(Long codConfeiteiro);
	
	@Query("select distinct ip.pedido from ItemPedido ip where ip.produto.confeiteiro=?1 and ip.pedido.status='R' and ip.pedido.aprovacao='A' order by ip.pedido.dataEntrega asc")
	List<Pedido> findByPedidoWebRecusado(Long codConfeiteiro);
	
	@Query("select distinct ip.pedido from ItemPedido ip where ip.produto.confeiteiro=?1 and ip.pedido.status='A' and ip.pedido.aprovacao='A' order by ip.pedido.dataEntrega asc")
	List<Pedido> findByPedidoWebAprovado(Long codConfeiteiro);
	
	
	
	@Query("select distinct ip.pedido from ItemPedido ip where ip.pedido.cliente.codCliente=?1 and ip.pedido.aprovacao='A' order by ip.pedido.dataEntrega asc")
	List<Pedido> findByPedidosCliente(Long codConfeiteiro);
	
	
	
	
	//CLIENTE WEB
	@Query("select distinct ip.pedido, ip.produto from ItemPedido ip where ip.pedido.cliente.codCliente=?1 and ip.pedido.status='P'")
	List<Pedido> findByPedidosClienteAprovado(Long codConfeiteiro);
	
	@Query("select distinct ip.pedido, ip.produto from ItemPedido ip where ip.pedido.cliente.codCliente=?1 and ip.pedido.status='E'")
	List<Pedido> findByPedidosClienteAguarde(Long codConfeiteiro);
	
	@Query("select distinct ip.pedido, ip.produto from ItemPedido ip where ip.pedido.cliente.codCliente=?1 and ip.pedido.status='A'")
	List<Pedido> findByPedidosClientePagamento(Long codConfeiteiro);
	
	
	
	//CLIENTE MOBILE
	@Query("select distinct ip.pedido from ItemPedido ip where ip.pedido.cliente.codCliente=?1 and ip.pedido.status='P'")
	List<Pedido> findByPedidosClienteMobileWebAprovado(Long codConfeiteiro);
	
	@Query("select distinct ip.pedido from ItemPedido ip where ip.pedido.cliente.codCliente=?1 and ip.pedido.aprovacao='A' and ip.pedido.status='E' order by ip.pedido.dataEntrega asc")
	List<Pedido> findByPedidosClienteMobileAguarde(Long codConfeiteiro);
	
	@Query("select distinct ip.pedido from ItemPedido ip where ip.pedido.cliente.codCliente=?1 and ip.pedido.aprovacao='A' and ip.pedido.status='E' order by ip.pedido.dataEntrega asc")
	List<Pedido> findByPedidosClienteMobilePagamento(Long codConfeiteiro);
	
	
	//SELECTS PARA TRAZER OS PEDIDOS DO CONFEITEIRO QUE ESTÃO PAGOS E DEVEM SER REALIZADOS
//	@Query(value="select tbl_pedido.* from tbl_pagamento \r\n" + 
//			"			join tbl_pedido on tbl_pedido.cod_pedido = tbl_pagamento.cod_pedido\r\n" + 
//			"           join tbl_item_pedido on tbl_pedido.cod_pedido = tbl_item_pedido.cod_pedido\r\n" + 
//			"           join tbl_produto on tbl_produto.cod_produto = tbl_item_pedido.cod_produto\r\n" +
//			"           join tbl_confeiteiro on tbl_produto.cod_confeiteiro = tbl_confeiteiro.cod_confeiteiro\r\n" +
//			"			where tbl_confeiteiro.cod_confeiteiro=?1 and tbl_pedido.aprovacao='A' and tbl_pedido.status='N' and tbl_pagamento.cod_pedido = tbl_pedido.cod_pedido and tbl_pagamento.status = 'authorized' \r\n" + 
//			"			order by tbl_pedido.data_entrega", nativeQuery=true)
	@Query("select distinct ip.pedido from ItemPedido ip where ip.produto.confeiteiro=?1 and ip.pedido.status='A' and ip.pedido.aprovacao='A' and ip.pedido.producao IS NULL")
	List<Pedido> findByPedidosPagosNaoIniciados(Long codConfeiteiro);
	
	  
//	@Query(value="select tbl_pedido.* from tbl_pagamento \r\n" + 
//			"			join tbl_pedido on tbl_pedido.cod_pedido = tbl_pagamento.cod_pedido\r\n" + 
//			"           join tbl_item_pedido on tbl_pedido.cod_pedido = tbl_item_pedido.cod_pedido\r\n" + 
//			"           join tbl_produto on tbl_produto.cod_produto = tbl_item_pedido.cod_produto\r\n" +
//			"           join tbl_confeiteiro on tbl_produto.cod_confeiteiro = tbl_confeiteiro.cod_confeiteiro\r\n" +
//			"			where tbl_confeiteiro.cod_confeiteiro=?1 and tbl_pedido.aprovacao='A' and tbl_pedido.status='A' and tbl_pagamento.cod_pedido = tbl_pedido.cod_pedido and tbl_pagamento.status = 'authorized' \r\n" + 
//			"			order by tbl_pedido.data_entrega", nativeQuery=true)
//	@Query("select distinct ip.pedido from ItemPedido ip where ip.produto.confeiteiro.codConfeiteiro=?1 and ip.pedido.status='A' order by ip.pedido.dataEntrega")
	@Query("select distinct ip.pedido from ItemPedido ip where ip.produto.confeiteiro=?1 and ip.pedido.status='A' and ip.pedido.aprovacao='A' and ip.pedido.producao = 'E'")
	List<Pedido> findByPedidosPagosEmAndamento(Long codConfeiteiro);
	
//	@Query(value="select tbl_pedido.* from tbl_pagamento \r\n" + 
//			"			join tbl_pedido on tbl_pedido.cod_pedido = tbl_pagamento.cod_pedido\r\n" + 
//			"           join tbl_item_pedido on tbl_pedido.cod_pedido = tbl_item_pedido.cod_pedido\r\n" + 
//			"           join tbl_produto on tbl_produto.cod_produto = tbl_item_pedido.cod_produto\r\n" +
//			"           join tbl_confeiteiro on tbl_produto.cod_confeiteiro = tbl_confeiteiro.cod_confeiteiro\r\n" +
//			"			where tbl_confeiteiro.cod_confeiteiro=?1 and tbl_pedido.aprovacao='A' and tbl_pedido.status='C' and tbl_pagamento.cod_pedido = tbl_pedido.cod_pedido and tbl_pagamento.status = 'authorized' \r\n" + 
//			"			order by tbl_pedido.data_entrega", nativeQuery=true)
//	@Query("select distinct ip.pedido from ItemPedido ip where ip.produto.confeiteiro.codConfeiteiro=?1 and ip.pedido.status='C' order by ip.pedido.dataEntrega")
	@Query("select distinct ip.pedido from ItemPedido ip where ip.produto.confeiteiro=?1 and ip.pedido.status='A' and ip.pedido.aprovacao='A' and ip.pedido.producao = 'F'")
	List<Pedido> findByPedidosPagosConcluidos(Long codConfeiteiro);
	
	
	
	//SELECTS PARA TRAZER OS PEDIDOS DO CONFEITEIRO QUE ESTÃO PAGOS E DEVEM SER REALIZADOS
//	@Query("select distinct ip.pedido from ItemPedido ip where ip.produto.confeiteiro.codConfeiteiro=?1 and ip.pedido.status='N' and ip.pedido.aprovacao='A' order by ip.pedido.dataEntrega")
//	@Query(value="select tbl_pedido.* from tbl_pagamento \r\n" + 
//			"			join tbl_pedido on tbl_pedido.cod_pedido = tbl_pagamento.cod_pedido\r\n" + 
//			"           join tbl_item_pedido on tbl_pedido.cod_pedido = tbl_item_pedido.cod_pedido\r\n" + 
//			"           join tbl_produto on tbl_produto.cod_produto = tbl_item_pedido.cod_produto\r\n" +
//			"           join tbl_confeiteiro on tbl_produto.cod_confeiteiro = tbl_confeiteiro.cod_confeiteiro\r\n" +
//			"			where tbl_confeiteiro.cod_confeiteiro=?1 and tbl_pedido.aprovacao='A' and tbl_pedido.status='N' and tbl_pagamento.cod_pedido = tbl_pedido.cod_pedido and tbl_pagamento.status = 'authorized' \r\n" + 
//			"			order by tbl_pedido.data_entrega", nativeQuery=true)
	@Query("select distinct ip.pedido from ItemPedido ip where ip.produto.confeiteiro=?1 and ip.pedido.status='A' and ip.pedido.aprovacao='A' and ip.pedido.producao IS NULL")
	List<Pedido> findByPedidosLimitPagosNaoIniciados(Long codConfeiteiro, PageRequest pageRequest);
	
//	@Query("select distinct ip.pedido from ItemPedido ip where ip.produto.confeiteiro.codConfeiteiro=?1 and ip.pedido.status='A' order by ip.pedido.dataEntrega")
//	@Query(value="select tbl_pedido.* from tbl_pagamento \r\n" + 
//			"			join tbl_pedido on tbl_pedido.cod_pedido = tbl_pagamento.cod_pedido\r\n" + 
//			"           join tbl_item_pedido on tbl_pedido.cod_pedido = tbl_item_pedido.cod_pedido\r\n" + 
//			"           join tbl_produto on tbl_produto.cod_produto = tbl_item_pedido.cod_produto\r\n" +
//			"           join tbl_confeiteiro on tbl_produto.cod_confeiteiro = tbl_confeiteiro.cod_confeiteiro\r\n" +
//			"			where tbl_confeiteiro.cod_confeiteiro=?1 and tbl_pedido.aprovacao='A' and tbl_pedido.status='A' and tbl_pagamento.cod_pedido = tbl_pedido.cod_pedido and tbl_pagamento.status = 'authorized' \r\n" + 
//			"			order by tbl_pedido.data_entrega", nativeQuery=true)
	
	@Query("select distinct ip.pedido from ItemPedido ip where ip.produto.confeiteiro=?1 and ip.pedido.status='A' and ip.pedido.aprovacao='A' and ip.pedido.producao = 'E'")
	List<Pedido> findByPedidosLimitPagosEmAndamento(Long codConfeiteiro, PageRequest pageRequest);
	
//	@Query("select distinct ip.pedido from ItemPedido ip where ip.produto.confeiteiro.codConfeiteiro=?1 and ip.pedido.status='C' order by ip.pedido.dataEntrega")
//	@Query(value="select tbl_pedido.* from tbl_pagamento \r\n" + 
//			"			join tbl_pedido on tbl_pedido.cod_pedido = tbl_pagamento.cod_pedido\r\n" + 
//			"           join tbl_item_pedido on tbl_pedido.cod_pedido = tbl_item_pedido.cod_pedido\r\n" + 
//			"           join tbl_produto on tbl_produto.cod_produto = tbl_item_pedido.cod_produto\r\n" +
//			"           join tbl_confeiteiro on tbl_produto.cod_confeiteiro = tbl_confeiteiro.cod_confeiteiro\r\n" +
//			"			where tbl_confeiteiro.cod_confeiteiro=?1 and tbl_pedido.aprovacao='A' and tbl_pedido.status='C' and tbl_pagamento.cod_pedido = tbl_pedido.cod_pedido and tbl_pagamento.status = 'authorized' \r\n" + 
//			"			order by tbl_pedido.data_entrega", nativeQuery=true)
	@Query("select distinct ip.pedido from ItemPedido ip where ip.produto.confeiteiro=?1 and ip.pedido.status='A' and ip.pedido.aprovacao='A' and ip.pedido.producao = 'F'")
	List<Pedido> findByPedidosLimitPagosConcluidos(Long codConfeiteiro, PageRequest pageRequest);
	
	@Query("select p from Pedido p where p.codPedido=?1")
	Pedido findByPedidoConfeiteiro(Long codPedido);
	
}
