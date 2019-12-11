package br.senai.sp.api.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import br.senai.sp.api.model.Confeiteiro;
import br.senai.sp.api.model.Endereco;

public interface EnderecoRepository extends JpaRepository<Endereco, Long>{
	
	@Query("select e from Endereco e where e.codEndereco=?1")
	Endereco findByCod(Long codEndereco);
	
	

}
