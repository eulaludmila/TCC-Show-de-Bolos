package br.senai.sp.api.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import br.senai.sp.api.model.Cliente;
import br.senai.sp.api.model.Confeiteiro;

public interface ConfeiteiroRepository extends JpaRepository<Confeiteiro, Long>{
	
	@Query("select count(c) from Confeiteiro c where c.email=?1")
	int findByEmail(String email);
	
	@Query("select count(c) from Confeiteiro c where c.cpf=?1")
	int findByCPF(String cpf);
	
	@Query("select c from Confeiteiro c where c.codConfeiteiro=?1")
	Confeiteiro findByCod(Long codConfeiteiro);
	
	@Query("select count(c) from Confeiteiro c where c.codConfeiteiro=?1 and c.senha=?2")
	int findByConfeiteiroSenha(Long codConfeiteiro, String senha);
	
	@Query("select c from Confeiteiro c where c.email=?1")
	Confeiteiro findConfeiteiroByEmail(String email);
	
	@Query("select c from Confeiteiro c where c.email=?1 AND c.senha=?2 AND status=1")
	Confeiteiro findConfeiteiroByEmailAndSenha(String email, String senha);

	@Query("select c from Confeiteiro c where c.email=?1 AND c.senha=?2 AND status=1")
	int findConfeiteiroByEmailAndSenha2(String email, String senha);
}
