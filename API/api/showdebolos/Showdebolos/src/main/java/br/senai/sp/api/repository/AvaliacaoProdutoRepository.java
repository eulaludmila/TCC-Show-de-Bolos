package br.senai.sp.api.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import br.senai.sp.api.model.AvaliacaoConfeiteiro;
import br.senai.sp.api.model.AvaliacaoProduto;
import br.senai.sp.api.model.ConfeiteiroDTO;
import br.senai.sp.api.model.Produto;

public interface AvaliacaoProdutoRepository extends JpaRepository<AvaliacaoProduto, Long>{
	
	/*@Query("select ac from AvaliacaoConfeiteiro ac order by ac.")
	int findByAvaliacaoConfeiteiro(Long codConfeiteiro);*/
	
	@Query("select sum(ap.avaliacaoProduto) from AvaliacaoProduto ap where ap.produto.codProduto=?1")
	boolean findByProduto(Long codProduto);
//
	@Query("select coalesce(sum(ap.avaliacaoProduto),0) from AvaliacaoProduto ap where ap.produto.codProduto=?1")
	double findByAvaliacaoProduto(Long codProduto);
	
	@Query("select count(ap) from AvaliacaoProduto ap where ap.produto.codProduto=?1")
	int findByCountAvaliacaoProduto(Long codProduto);
	
	@Query("select coalesce(sum(ap.avaliacaoProduto),0) from AvaliacaoProduto ap where ap.produto.confeiteiro.codConfeiteiro=?1")
	double findByAvaliacaoTodosProdutos(Long codConfeiteiro);
	
	@Query("select count(ap) from AvaliacaoProduto ap where ap.produto.confeiteiro.codConfeiteiro=?1")
	int findByCountAvaliacaoTodosProdutos(Long codConfeiteiro);
	
	@Query("select cd from ConfeiteiroDTO cd where cd.codConfeiteiro=?1")
	ConfeiteiroDTO findByConfeiteiroProduto(Long codConfeiteiro);
	
	
	
}
