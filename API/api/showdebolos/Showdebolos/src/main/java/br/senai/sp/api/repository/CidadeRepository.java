package br.senai.sp.api.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import br.senai.sp.api.model.Cidade;

public interface CidadeRepository extends JpaRepository<Cidade, Long>{

	@Query("select c from Cidade c where c.cidade=?1")
	Cidade findByCidade(String cidade);
	
}
