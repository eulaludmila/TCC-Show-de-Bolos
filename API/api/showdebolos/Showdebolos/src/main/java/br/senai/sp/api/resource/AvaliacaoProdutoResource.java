package br.senai.sp.api.resource;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import br.senai.sp.api.model.AvaliacaoConfeiteiro;
import br.senai.sp.api.model.AvaliacaoProduto;
import br.senai.sp.api.model.Confeiteiro;
import br.senai.sp.api.model.ConfeiteiroDTO;
import br.senai.sp.api.model.Produto;
import br.senai.sp.api.repository.AvaliacaoConfeiteiroRepository;
import br.senai.sp.api.repository.AvaliacaoProdutoRepository;
import br.senai.sp.api.repository.ConfeiteiroDTORepository;
import br.senai.sp.api.repository.ConfeiteiroRepository;
import br.senai.sp.api.repository.ProdutoRepository;

@CrossOrigin(origins = "http://showdebolos.tk")
@RestController
@RequestMapping("/avaliacao/produto")
public class AvaliacaoProdutoResource {

	@Autowired
	public AvaliacaoProdutoRepository avaliacaoProdutoRepository;

	@Autowired
	public ProdutoRepository produtoRepository;

	@Autowired
	public ConfeiteiroDTORepository confeiteiroDTOrepository;

	@GetMapping
	@CrossOrigin(origins = "http://localhost:3000")
	public List<AvaliacaoProduto> getAvaliacaoProdutos() {

		return avaliacaoProdutoRepository.findAll();
	}

	
	//SALVA A AVALIAÇÃO DO PRODUTO E DIANTE DISSO SALVA A DO CONFEITEIRO 
	@PostMapping
	@CrossOrigin(origins = "http://localhost:3000")
	public AvaliacaoProduto salvarAvaliacaoProduto(@RequestBody AvaliacaoProduto avaliacaoProduto) {

		// Pegando o confeiteiro
		Produto produto = produtoRepository.findByCod(avaliacaoProduto.getProduto().getCodProduto());
		
		
		ConfeiteiroDTO confeiteiro = confeiteiroDTOrepository
				.findByCod(avaliacaoProduto.getProduto().getConfeiteiro().getCodConfeiteiro());
		
		
			double somaAvaliacaoSalvo = avaliacaoProdutoRepository.findByAvaliacaoProduto(
					avaliacaoProduto.getProduto().getCodProduto()) + avaliacaoProduto.getAvaliacaoProduto();

			double vezesAvaliadoSalvo = avaliacaoProdutoRepository
					.findByCountAvaliacaoProduto(avaliacaoProduto.getProduto().getCodProduto()) + 1;

			double mediaTotal = somaAvaliacaoSalvo / vezesAvaliadoSalvo;
			produto.setAvaliacao(mediaTotal);
		
			double somaTodosProdutos = avaliacaoProdutoRepository
					.findByAvaliacaoTodosProdutos(avaliacaoProduto.getProduto().getConfeiteiro().getCodConfeiteiro())
					+ avaliacaoProduto.getAvaliacaoProduto();
			
			System.out.println("soma: "+somaTodosProdutos);

			double vezesTodosProdutos = avaliacaoProdutoRepository.findByCountAvaliacaoTodosProdutos(
					avaliacaoProduto.getProduto().getConfeiteiro().getCodConfeiteiro()) + 1;
			
			System.out.println("vezes: "+vezesTodosProdutos);

			double mediaTodosTotal = somaTodosProdutos / vezesTodosProdutos;
			
			System.out.println("media: "+mediaTodosTotal);
			confeiteiro.setAvaliacao(mediaTodosTotal);
	

		// setando no campo categoria todo o objeto categoria que foi pego pelo codigo
		// no banco

		// avaliacaoProduto.getProduto().getConfeiteiro().setAvaliacao(mediaTodosTotal);

		// salvando a quantidade no banco de dados
		AvaliacaoProduto avaliacaoProdutoSalvo = avaliacaoProdutoRepository.save(avaliacaoProduto);
		confeiteiroDTOrepository.save(confeiteiro);

		return avaliacaoProdutoSalvo;

	}
}
