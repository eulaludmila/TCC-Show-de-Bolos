package br.senai.sp.api.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import br.senai.sp.api.model.Confeiteiro;
import br.senai.sp.api.model.EnderecoConfeiteiro;

public interface EnderecoConfeiteiroRepository extends JpaRepository<EnderecoConfeiteiro, Long>{

	
	
			
	@Query("select ec from EnderecoConfeiteiro ec where ec.codEnderecoConfeiteiro=?1")
	EnderecoConfeiteiro findByCod(Long codEnderecoConfeiteiro);
	
	@Query("select ec from EnderecoConfeiteiro ec where ec.confeiteiro.codConfeiteiro=?1")
	EnderecoConfeiteiro findByCodConfeiteiro(Long codConfeiteiro);
}
