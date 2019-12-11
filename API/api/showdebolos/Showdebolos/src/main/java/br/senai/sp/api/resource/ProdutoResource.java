package br.senai.sp.api.resource;

import java.util.List;

import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import br.senai.sp.api.model.Categoria;
import br.senai.sp.api.model.Confeiteiro;
import br.senai.sp.api.model.ConfeiteiroDTO;
import br.senai.sp.api.model.ConfeiteiroDTOEmail;
import br.senai.sp.api.model.Produto;
import br.senai.sp.api.model.Quantidade;
import br.senai.sp.api.repository.CategoriaRepository;
import br.senai.sp.api.repository.ConfeiteiroDTOEmailRepository;
import br.senai.sp.api.repository.ConfeiteiroDTORepository;
import br.senai.sp.api.repository.ConfeiteiroRepository;
import br.senai.sp.api.repository.ProdutoRepository;
import br.senai.sp.api.repository.QuantidadeRepository;


@CrossOrigin(origins = "http://showdebolos.tk")
@RestController
@RequestMapping("/produto")
public class ProdutoResource {

	@Autowired
	public ProdutoRepository produtoRepository;
	
	@Autowired
	public CategoriaRepository categoriaRepository;
	
	@Autowired
	public ConfeiteiroRepository confeiteiroRepository;
	
	@Autowired
	public ConfeiteiroDTORepository confeiteiroDTORepository;
	
	@Autowired
	public ConfeiteiroDTOEmailRepository confeiteiroDTOEmailRepository;
	
	@Autowired
	public QuantidadeRepository quantidadeRepository;
	
	@GetMapping
	@CrossOrigin(origins = "http://localhost:3000")
	public List<Produto> getProdutos(){
		return produtoRepository.findAll();
		
	}
	
	@SuppressWarnings("deprecation")
	@GetMapping("/produto")
	@CrossOrigin(origins = "http://localHost:3000")
	public List<Produto> getAvaliacaoProduto(){
		return produtoRepository.findByAvaliacaoProduto(new PageRequest(0,10));
	}
	
	
	//retorna produtos de uma categoria
	@GetMapping("/categoria/{codCategoria}")
	@CrossOrigin(origins = "http://localhost:3000")
	public List<Produto> getProdutosPelaCategoria(@PathVariable Long codCategoria){
		
		List<Produto> produto = produtoRepository.findByCodCategoria(codCategoria);
		
		
		return produto;
		
	}
		

	
	//retorna todos os produtos mais bem avaliados de um confeiteiro
	@GetMapping("/melhoravaliados/{codConfeiteiro}")
	@CrossOrigin(origins = "http://localhost:3000")
	public List<Produto> getProdutosPorAvaliacao(@PathVariable Long codConfeiteiro){
		
		List<Produto> produto = produtoRepository.findByAvaliacaoProdutoConfeiteiro(codConfeiteiro);
		
		
		return produto;
		
	}
	
	//retorna os produtos mais bem avaliados de um confeiteiro com um limite de 4
	@GetMapping("/melhoravaliados/{codConfeiteiro}/limit/4")
	@CrossOrigin(origins = "http://localhost:3000")
	public List<Produto> getProdutosPorAvaliacaoLIMIT4(@PathVariable Long codConfeiteiro){
		
		List<Produto> produto = produtoRepository.findByAvaliacaoProdutoConfeiteiroLIMIT4(codConfeiteiro);
		
		return produto;
		
	}
	
	//retorna os produtos do menor para o maior preco de um confeiteiro com um limite de 4
	@GetMapping("/menorpreco/{codConfeiteiro}/limit/4")
	@CrossOrigin(origins = "http://localhost:3000")
	public List<Produto> getProdutosPorPrecoLIMIT4( @PathVariable Long codConfeiteiro){
		
		List<Produto> produto = produtoRepository.findByPrecoProdutoConfeiteiroLIMIT4(codConfeiteiro);
		
		return produto;
		
	}
	
	//retorna os produtos do menor para o maior preco de um confeiteiro
	@GetMapping("/menorpreco/{codConfeiteiro}")
	@CrossOrigin(origins = "http://localhost:3000")
	public List<Produto> getProdutosPorPreco( @PathVariable Long codConfeiteiro){
		
		List<Produto> produto = produtoRepository.findByPrecoProdutoConfeiteiro(codConfeiteiro);
		
		return produto;
		
	}
	
	
	//retorna produtos de um confeiteiro
	@GetMapping("confeiteiro/{codConfeiteiro}")
	@CrossOrigin(origins = "http://localhost:3000")
	public List<Produto> getProdutosConfeiteiro(@PathVariable Long codConfeiteiro){
		
		List<Produto> produto = produtoRepository.findByCodConfeiteiro(codConfeiteiro);
		
		return produto;
		
	}
	
	//retorna um produto
	@GetMapping("/{codProduto}")
	@CrossOrigin(origins = "http://localhost:3000")
	public Produto getProduto(@PathVariable Long codProduto){
		
		Produto produto = produtoRepository.findByCod(codProduto);
		
		return produto;
		
	}
	
	

	//cadastra o produto do confeiteiro
	@PostMapping
	@CrossOrigin(origins = "http://localhost:3000")
	public Produto salvarProduto(@RequestBody Produto produto) {
		
		//Pegando o codigo da categoria na tabela de categoria
		Categoria categoria = categoriaRepository.findByCod(produto.getCategoria().getCodCategoria());
		
		//Pegando o confeiteiro
		ConfeiteiroDTOEmail confeiteiro = confeiteiroDTOEmailRepository.findByCod(produto.getConfeiteiro().getCodConfeiteiro());
		
		//pegando o objeto quantidade
		Quantidade quantidade = produto.getQuantidade();
		
		//setando no confeiteiro o confeiteiro
		produto.setConfeiteiro(confeiteiro);
		
		//setando no campo categoria todo o objeto categoria que foi pego pelo codigo no banco
		produto.setCategoria(categoria);
		
		//salvando a quantidade no banco de dados
		quantidadeRepository.save(quantidade);
		
		//salvando todo objeto produto
		Produto produtoSalvo = produtoRepository.save(produto);
		
		return produtoSalvo;
	}
	
	//atualiza o produto do confeiteiro
	@PutMapping("/{codProduto}")
	@CrossOrigin(origins = "http://localhost:3000")
	public ResponseEntity<Produto> atualizaProduto(@PathVariable Long codProduto, @RequestBody Produto produto){
		
		//Pegando o codigo da categoria na tabela de categoria
		Categoria categoria = categoriaRepository.findByCod(produto.getCategoria().getCodCategoria());
		
		//pegando o codigo da quantidade
		Quantidade quantidade = quantidadeRepository.findByCod(produto.getQuantidade().getCodQuantidade());
		
		//setando no campo quantidade o objeto quantidade
		produto.setQuantidade(quantidade);
		
		//setando no campo categoria todo o objeto categoria que foi pego pelo codigo no banco
		produto.setCategoria(categoria);
		
		Produto produtoSalvo = produtoRepository.findById(codProduto).get();
		BeanUtils.copyProperties(produto,produtoSalvo, "codProduto");
		
		produtoRepository.save(produtoSalvo);
		
		return ResponseEntity.ok(produtoSalvo);
	}
	
	//atualiza e desativa o produto
	@PutMapping("/status/{codProduto}")
	@CrossOrigin(origins = "http://localhost:3000")
	public ResponseEntity<Produto> desativaProduto(@PathVariable Long codProduto){
		
		Produto produto = produtoRepository.findByCod(codProduto);
	
		
		
		if(produto.getStatus()) {
			produto.setStatus(false);
		} else {
			produto.setStatus(true);
		}
		
		Produto produtoSalvo = produtoRepository.findById(codProduto).get();
		BeanUtils.copyProperties(produto,produtoSalvo, "codProduto");
		
		produtoRepository.save(produto);
		
		return ResponseEntity.ok(produtoSalvo);
	}
		
	
}
