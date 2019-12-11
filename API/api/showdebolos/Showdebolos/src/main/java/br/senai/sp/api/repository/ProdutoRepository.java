package br.senai.sp.api.repository;

import java.util.List;

import org.springframework.data.domain.PageRequest;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import br.senai.sp.api.model.Categoria;
import br.senai.sp.api.model.ConfeiteiroDTO;
import br.senai.sp.api.model.Produto;

public interface ProdutoRepository extends JpaRepository<Produto, Long>{
	
	@Query("select p from Produto p where p.codProduto=?1")
	Produto findByCod(Long codProduto);
	
	//select que traz os produtos de determinada categoria eu que o status do produto seja true e o confeiteiro esteja ativo
	@Query("select cp from Produto cp where cp.categoria.codCategoria=?1 and cp.status = 1 and cp.confeiteiro.status=1")
	List<Produto> findByCodCategoria(Long codCategoria);
	
	@Query("select cp from Produto cp where cp.confeiteiro.codConfeiteiro=?1")
	List<Produto> findByCodConfeiteiro(Long codConfeiteiro);
	
	@Query("select c from Produto c where c.status=1 and c.confeiteiro.status = 1 order by c.avaliacao desc")
	List<Produto> findByAvaliacaoProduto(PageRequest pageRequest);
	
	//select que traz os produtos mais bem avaliados de um confeiteiro
	@Query("select p from Produto p where p.status=1 and p.confeiteiro.status = 1 and p.confeiteiro.codConfeiteiro=?1 order by p.avaliacao desc")
	List<Produto> findByAvaliacaoProdutoConfeiteiro(Long codConfeiteiro);
	
	//select que traz os produtos mais bem avaliados de um confeiteiro com um limite de 4 registros
	@Query(value="select * from tbl_produto \r\n" + 
			"	join tbl_confeiteiro on tbl_produto.cod_confeiteiro = tbl_confeiteiro.cod_confeiteiro\r\n" + 
			"    where tbl_produto.status=1 and tbl_confeiteiro.status=1 \r\n" + 
			"    and tbl_produto.cod_confeiteiro=?1 \r\n" + 
			"    order by tbl_produto.avaliacao desc limit 4", nativeQuery=true)
	List<Produto> findByAvaliacaoProdutoConfeiteiroLIMIT4(Long codConfeiteiro);
	
	//select que traz os produtos mais baratos de um confeiteiro
	@Query(value="select * from tbl_produto \r\n" + 
			"			join tbl_confeiteiro on tbl_produto.cod_confeiteiro = tbl_confeiteiro.cod_confeiteiro\r\n" + 
			"			where tbl_produto.status=1 and tbl_confeiteiro.status=1 \r\n" + 
			"			and tbl_produto.cod_confeiteiro=?1 \r\n" + 
			"			order by tbl_produto.preco", nativeQuery=true)
	List<Produto> findByPrecoProdutoConfeiteiro(Long codConfeiteiro);
	
	//select que traz os produtos mais baratos de um confeiteiro com um limite de 4 registros
	@Query(value="select * from tbl_produto \r\n" + 
			"			join tbl_confeiteiro on tbl_produto.cod_confeiteiro = tbl_confeiteiro.cod_confeiteiro\r\n" + 
			"			where tbl_produto.status=1 and tbl_confeiteiro.status=1 \r\n" + 
			"			and tbl_produto.cod_confeiteiro=?1\r\n" + 
			"			order by tbl_produto.preco limit 4", nativeQuery=true)
	List<Produto> findByPrecoProdutoConfeiteiroLIMIT4(Long codConfeiteiro);
	
	

}
