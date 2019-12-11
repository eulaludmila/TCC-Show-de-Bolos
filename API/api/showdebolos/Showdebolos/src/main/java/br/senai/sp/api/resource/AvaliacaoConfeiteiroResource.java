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

import br.senai.sp.api.model.Confeiteiro;

import br.senai.sp.api.repository.AvaliacaoConfeiteiroRepository;
import br.senai.sp.api.repository.ConfeiteiroRepository;

@CrossOrigin(origins = "http://showdebolos.tk")
@RestController
@RequestMapping("/avaliacao/confeiteiro")
public class AvaliacaoConfeiteiroResource {

	@Autowired
	public AvaliacaoConfeiteiroRepository avaliacaoConfeiteiroRepository;
	
	@Autowired
	public ConfeiteiroRepository confeiteiroRepository;
	
	
	@GetMapping
	@CrossOrigin(origins = "http://localhost3000")
	public List<AvaliacaoConfeiteiro> getAvaliacaoConfeiteiros(){
		
		return avaliacaoConfeiteiroRepository.findAll();
	}
	
	
	/*@GetMapping
	@CrossOrigin(origins = "http://localhost3000")
	public List<AvaliacaoConfeiteiro> getAvaliacaoConfeiteiros(){
		
		List<Confeiteiro> confeiteiro = confeiteiroRepository.findAll();
		
		List<AvaliacaoConfeiteiro> avaliacaoConfeiteiro = avaliacaoConfeiteiroRepository.findByListAvaliacaoConfeiteiro();
		
		avaliacaoConfeiteiro.set(3, (AvaliacaoConfeiteiro) confeiteiro);
		
		return avaliacaoConfeiteiroRepository.findByListAvaliacaoConfeiteiro();
	}*/
	
	//SALVA A AVALIAC~]AO DO CONFEITEIRO
	@PostMapping
	@CrossOrigin(origins = "http://localhost:3000")
	public AvaliacaoConfeiteiro salvarAvaliacaoConfeiteiro(@RequestBody AvaliacaoConfeiteiro avaliacaoConfeiteiro) {
		
		
		//Pegando o confeiteiro
		Confeiteiro confeiteiro = confeiteiroRepository.findByCod(avaliacaoConfeiteiro.getConfeiteiro().getCodConfeiteiro());
		
		double somaAvaliacaoSalvo = avaliacaoConfeiteiroRepository.
		findByAvaliacaoConfeiteiro(avaliacaoConfeiteiro.getConfeiteiro().getCodConfeiteiro()) + avaliacaoConfeiteiro.getAvaliacaoConfeiteiro();
			
		double vezesAvaliadoSalvo = avaliacaoConfeiteiroRepository.
					findByCountAvaliacaoConfeiteiro(avaliacaoConfeiteiro.getConfeiteiro().getCodConfeiteiro()) + 1;
			
		double vezesAvaliado = vezesAvaliadoSalvo;
		double mediaTotal = somaAvaliacaoSalvo/vezesAvaliado;

		//setando no campo categoria todo o objeto categoria que foi pego pelo codigo no banco
		confeiteiro.setAvaliacao(mediaTotal);
			
		
		//salvando a quantidade no banco de dados
		AvaliacaoConfeiteiro avaliacaoConfeiteiroSalvo = avaliacaoConfeiteiroRepository.save(avaliacaoConfeiteiro);
	
			
		return avaliacaoConfeiteiroSalvo;
		
	}
}
