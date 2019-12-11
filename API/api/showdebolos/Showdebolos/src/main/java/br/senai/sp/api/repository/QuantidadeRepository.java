package br.senai.sp.api.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import br.senai.sp.api.model.Quantidade;

public interface QuantidadeRepository extends JpaRepository<Quantidade, Long>{
	@Query("select q from Quantidade q where q.codQuantidade=?1")
	Quantidade findByCod(Long codQuantidade);
}
