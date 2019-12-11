package br.senai.sp.api.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import br.senai.sp.api.model.Cliente;

public interface ClienteRepository extends JpaRepository<Cliente, Long>{
	
	@Query("select count(c) from Cliente c where c.email=?1")
	int findByEmail(String email);
	
	@Query("select count(c) from Cliente c where c.cpf=?1")
	int findByCPF(String cpf);
	
	@Query("select c from Cliente c where c.codCliente=?1")
	Cliente findByCod(Long codCliente);
	
	@Query("select c from Cliente c where c.email=?1")
	Cliente findClienteByEmail(String email);
	
	@Query("select c from Cliente c where c.email=?1 AND c.senha=?2 AND status=1")
	Cliente findClienteByEmailAndSenha(String email, String senha);

}
