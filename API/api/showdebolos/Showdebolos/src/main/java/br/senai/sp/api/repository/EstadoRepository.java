package br.senai.sp.api.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import br.senai.sp.api.model.Estado;

public interface EstadoRepository extends JpaRepository<Estado, Long> {

	@Query("select e from Estado e where e.uf=?1")
	Estado findByUf(String uf);
	
}
