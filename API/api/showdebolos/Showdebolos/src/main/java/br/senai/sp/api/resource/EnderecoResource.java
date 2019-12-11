package br.senai.sp.api.resource;

import java.util.List;

import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import br.senai.sp.api.model.Celular;
import br.senai.sp.api.model.Cidade;
import br.senai.sp.api.model.Confeiteiro;
import br.senai.sp.api.model.Endereco;
import br.senai.sp.api.model.EnderecoCliente;
import br.senai.sp.api.model.EnderecoConfeiteiro;
import br.senai.sp.api.model.Estado;
import br.senai.sp.api.repository.CidadeRepository;
import br.senai.sp.api.repository.EnderecoClienteRepository;
import br.senai.sp.api.repository.EnderecoConfeiteiroRepository;
import br.senai.sp.api.repository.EnderecoRepository;
import br.senai.sp.api.repository.EstadoRepository;

@CrossOrigin(origins = "http://showdebolos.tk")
@RestController
@RequestMapping("/endereco")
public class EnderecoResource {
	
	@Autowired
	private EnderecoRepository enderecoRepository;
	
	@Autowired
	private EnderecoClienteRepository enderecoClienteRepository;
	
	@Autowired
	private CidadeRepository cidadeRepository;
	
	@Autowired
	private EstadoRepository estadoRepository;
	
	@Autowired
	private EnderecoConfeiteiroRepository enderecoConfeiteiroRepository;
	
	//traz todos os endereço cadastrados
	@GetMapping
	@CrossOrigin(origins = "http://localhost:3000")
	public List<Endereco> getEnderecos(){
		return enderecoRepository.findAll();
	}
	
	//traz o endereco do confeiteiro
	@GetMapping("/confeiteiro/{codConfeiteiro}")
	@CrossOrigin(origins = "http://localhost:3000")
	public Endereco getConfeiteiroEndereco(@PathVariable Long codConfeiteiro){
		
		EnderecoConfeiteiro enderecoConfeiteiro = enderecoConfeiteiroRepository.findByCodConfeiteiro(codConfeiteiro);

		Endereco endereco = enderecoConfeiteiro.getEndereco();
		
		return endereco;
	}
	
	//traz o endereco do cliente
	@GetMapping("/cliente/{codCliente}")
	@CrossOrigin(origins = "http://localhost:3000")
	public Endereco getClienteEndereco(@PathVariable Long codCliente){
		
		EnderecoCliente enderecoCliente = enderecoClienteRepository.findByCodCliente(codCliente);

		Endereco endereco = enderecoCliente.getEndereco();
		
		return endereco;
	}

	//cadastro do endereço do confeiteiro para o mobile
	@PostMapping
	@CrossOrigin(origins = "http://localhost:3000")
	public Endereco gravarEndereco(@Validated @RequestBody Endereco endereco) {
		
		Cidade cidade = cidadeRepository.findByCidade(endereco.getCidade().getCidade());
		
		// Por meio do enderecoConfeiteiro que foi passado pelo corpo da requisição
		// temos acesso ao endereco, que possui uma cidade e através dela acessamos o estado cadastrado
		// com o estado que foi cadastrado procuramos no banco um registro que coincide com o que foi digitado
		// que é salvo em estado
		Estado estado = estadoRepository.findByUf(endereco.getCidade().getEstado().getUf());
		
		// Atribuindo o estado cadastrado a cidade cadastrada
		cidade.setEstado(estado);
		
		// Atribuindo a cidade cadastrada ao endereco cadastrado
		endereco.setCidade(cidade);
		
		// Salvando o endereco no banco
		Endereco enderecoSalvo = enderecoRepository.save(endereco);
		return enderecoSalvo;
	}
	
	//atualiza o endereço do confeiteiro no web
	@PutMapping("/{codConfeiteiro}")
	@CrossOrigin(origins = "http://localhost:3000")
	public ResponseEntity<Endereco> atualizaEnderecoConfeiteiro (@PathVariable Long codConfeiteiro, @RequestBody Endereco endereco){
		
		
		//procura o confeiteiro pelo codigo
		EnderecoConfeiteiro enderecoConfeiteiro = enderecoConfeiteiroRepository.findByCodConfeiteiro(codConfeiteiro);
		
		//pega o endereco do confeiteiro
		Endereco pegaEndereco = enderecoConfeiteiro.getEndereco();
		
		//no endereco seta o codigo do endereco
		endereco.setCodEndereco(pegaEndereco.getCodEndereco());
		
		//pega a cidade do endereço
		Cidade cidade = cidadeRepository.findByCidade(endereco.getCidade().getCidade());
		
		//pega o estado da cidade que está passando
		Estado estado = estadoRepository.findByUf(cidade.getEstado().getUf());
		
		//seta na cidade do estado
		cidade.setEstado(estado);
		
		//seta no no endereco a cidade
		endereco.setCidade(cidade);
		
		
		//BeanUtils.copyProperties(endereco, pegaEndereco,"codEndereco");
		
		enderecoRepository.save(endereco);
		
		return ResponseEntity.ok(endereco);
	}
	
	//atualiza o endereço do confeiteiro no web
	@PutMapping("/cliente/{codCliente}")
	@CrossOrigin(origins = "http://localhost:3000")
	public ResponseEntity<Endereco> atualizaEnderecoCliente (@PathVariable Long codCliente, @RequestBody Endereco endereco){
		
		
		//procura o confeiteiro pelo codigo
		EnderecoCliente enderecoCliente = enderecoClienteRepository.findByCodCliente(codCliente);
		
		//pega o endereco do confeiteiro
		Endereco pegaEndereco = enderecoCliente.getEndereco();
		
		//no endereco seta o codigo do endereco
		endereco.setCodEndereco(pegaEndereco.getCodEndereco());
		
		//pega a cidade do endereço
		Cidade cidade = cidadeRepository.findByCidade(endereco.getCidade().getCidade());
		
		//pega o estado da cidade que está passando
		Estado estado = estadoRepository.findByUf(cidade.getEstado().getUf());
		
		//seta na cidade do estado
		cidade.setEstado(estado);
		
		//seta no no endereco a cidade
		endereco.setCidade(cidade);
		
		
		//BeanUtils.copyProperties(endereco, pegaEndereco,"codEndereco");
		
		enderecoRepository.save(endereco);
		
		return ResponseEntity.ok(endereco);
	}
	

}









