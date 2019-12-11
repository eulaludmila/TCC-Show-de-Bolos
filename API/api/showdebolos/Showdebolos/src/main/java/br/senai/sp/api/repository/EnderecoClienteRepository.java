package br.senai.sp.api.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import br.senai.sp.api.model.Endereco;
import br.senai.sp.api.model.EnderecoCliente;
import br.senai.sp.api.model.EnderecoConfeiteiro;

public interface EnderecoClienteRepository extends JpaRepository<EnderecoCliente, Long>{
	
	
	@Query("select ec from EnderecoCliente ec where ec.cliente.codCliente=?1")
	EnderecoCliente findByCodCliente(Long codCliente);
	
	//retorna uma lista de endereços do cliente
	@Query("select ec from EnderecoCliente ec where ec.cliente.codCliente=?1")
	List<EnderecoCliente> findByCodClienteListEnderecos(Long codCliente);
	
	@Query("select count(ec) from EnderecoCliente ec where ec.cliente.codCliente=?1")
	int findByCodClienteBuscarEndereco(Long codCliente);
	
	@Query("select ec.endereco from EnderecoCliente ec where ec.cliente.codCliente=?1")
	Endereco findByCodClienteEndereco(Long codCliente);
}
