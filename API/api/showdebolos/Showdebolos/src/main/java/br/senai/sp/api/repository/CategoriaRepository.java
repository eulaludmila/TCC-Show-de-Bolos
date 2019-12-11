package br.senai.sp.api.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import br.senai.sp.api.model.Categoria;

public interface CategoriaRepository extends JpaRepository<Categoria, Long>{

	
	@Query("select c from Categoria c where c.codCategoria=?1")
	Categoria findByCod(Long codCategoria);

	/*@Query("select c from Categoria c where c.codSubcategoria=?1")
	Categoria findByCodSubcategoria(Long codSubcategoria);*/
}
