package br.senai.sp.api.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import br.senai.sp.api.model.Cliente;
import br.senai.sp.api.model.ClienteDTO;

public interface ClienteDTORepository extends JpaRepository<ClienteDTO, Long>{
	
	
	@Query("select c from ClienteDTO c where c.codCliente=?1")
	ClienteDTO findByCod(Long codCliente);
	
	

}
