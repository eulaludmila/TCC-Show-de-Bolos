package br.senai.sp.api.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import br.senai.sp.api.model.AvaliacaoConfeiteiro;

public interface AvaliacaoConfeiteiroRepository extends JpaRepository<AvaliacaoConfeiteiro, Long>{
	
	/*@Query("select ac from AvaliacaoConfeiteiro ac order by ac.")
	int findByAvaliacaoConfeiteiro(Long codConfeiteiro);*/

	@Query("select sum(ac.avaliacaoConfeiteiro) from AvaliacaoConfeiteiro ac where ac.confeiteiro.codConfeiteiro=?1")
	int findByAvaliacaoConfeiteiro(Long codConfeiteiro);
	
	@Query("select count(ac) from AvaliacaoConfeiteiro ac where ac.confeiteiro.codConfeiteiro=?1")
	int findByCountAvaliacaoConfeiteiro(Long codConfeiteiro);
	
}
