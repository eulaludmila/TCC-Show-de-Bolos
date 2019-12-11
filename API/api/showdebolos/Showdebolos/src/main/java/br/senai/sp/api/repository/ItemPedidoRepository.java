package br.senai.sp.api.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import br.senai.sp.api.model.ItemPedido;
import br.senai.sp.api.model.Produto;

public interface ItemPedidoRepository extends JpaRepository<ItemPedido, Long>{

	@Query("select ip from ItemPedido ip where ip.pedido.codPedido=?1")
	List<ItemPedido> findByCodPedido(Long codPedido);

}
