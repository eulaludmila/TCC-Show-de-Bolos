package br.senai.sp.api.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import br.senai.sp.api.model.Celular;

public interface CelularRepository extends JpaRepository<Celular, Long> {

	@Query("select c from Celular c where c.codCelular=?1")
	Celular findByCod(Long codCelular);
	
}
