package br.senai.sp.api.repository;

import java.awt.print.Pageable;
import java.util.List;

import org.springframework.data.domain.PageRequest;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import br.senai.sp.api.model.Confeiteiro;
import br.senai.sp.api.model.ConfeiteiroDTO;
import br.senai.sp.api.model.ConfeiteiroDTOEmail;

public interface ConfeiteiroDTOEmailRepository extends JpaRepository<ConfeiteiroDTOEmail, Long>{
	
	@Query("select count(c) from Confeiteiro c where c.email=?1")
	int findByEmail(String email);
	
	@Query("select count(c) from Confeiteiro c where c.cpf=?1")
	int findByCPF(String cpf);
	
	@Query("select c from ConfeiteiroDTOEmail c where c.codConfeiteiro=?1")
	ConfeiteiroDTOEmail findByCod(Long codConfeiteiro);
	
//	@Query("select c from ConfeiteiroDTO c where c.codConfeiteiro=?1")
//	ConfeiteiroDTO findByCodDTO(Long codConfeiteiro);
	
	@Query("select count(c) from Confeiteiro c where c.codConfeiteiro=?1 and c.senha=?2")
	int findByConfeiteiroSenha(Long codConfeiteiro, String senha);
	
	@Query("select c from ConfeiteiroDTOEmail c where c.status=1 order by c.avaliacao desc")
	List<ConfeiteiroDTOEmail> findByAvaliacao(PageRequest pageRequest);
	
	@Query("select c from ConfeiteiroDTOEmail c where c.status=1 order by c.avaliacao desc")
	List<ConfeiteiroDTOEmail> findByAvaliacaoConfeiteiros();


}
