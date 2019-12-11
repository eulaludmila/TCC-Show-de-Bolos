package br.senai.sp.api.resource;

import java.lang.reflect.Field;
import java.util.List;
import java.util.Map;

import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.http.ResponseEntity;
import org.springframework.util.ReflectionUtils;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import br.senai.sp.api.model.Celular;
import br.senai.sp.api.model.Cliente;
import br.senai.sp.api.model.Confeiteiro;
import br.senai.sp.api.model.ConfeiteiroDTO;
import br.senai.sp.api.repository.CelularRepository;
import br.senai.sp.api.repository.ConfeiteiroDTORepository;
import br.senai.sp.api.repository.ConfeiteiroRepository;
import br.senai.sp.api.utils.ConverterData;

@CrossOrigin(origins = "http://showdebolos.tk")
@RestController
@RequestMapping("/confeiteiroDTO")
public class ConfeiteiroDTOResource {
	
	@Autowired
	public ConfeiteiroDTORepository confeiteiroDTORepository;
	
	@Autowired
	CelularRepository celularRepository;
	
	//TRAZER TODOS OS CONFEITEIROS
	@GetMapping
	@CrossOrigin(origins = "http://localHost:3000")
	public List<ConfeiteiroDTO> getConfeiteiros(){
		return confeiteiroDTORepository.findAll();
	}
	
	//RETORNA APENAS UM CONFEITEIRO
	@GetMapping("/{codConfeiteiro}")
	@CrossOrigin(origins = "http://localhost:3000")
	public ConfeiteiroDTO getConfeiteiro(@PathVariable Long codConfeiteiro){
		
		ConfeiteiroDTO confeiteiroDTO = confeiteiroDTORepository.findByCod(codConfeiteiro);
		
		return confeiteiroDTO;
		
	}
	
	//RETORNA O CONFEITEIRO PELA AVALIACAO
	@SuppressWarnings("deprecation")
	@GetMapping("/avaliacao")
	@CrossOrigin(origins = "http://localHost:3000")
	public List<ConfeiteiroDTO> getAvaliacao(){
		
		
		return confeiteiroDTORepository.findByAvaliacao(new PageRequest(0,8));
	}
	
	
	//TRAZ TODOS OS CONFEITEIROS ATIVOS DEMAIOR AVALIACAO PARA MENOR AVALIACAO
	@GetMapping("/avaliacao/confeiteiros")
	@CrossOrigin(origins = "http://localHost:3000")
	public List<ConfeiteiroDTO> getAvaliacaoConfeiteiros(){
		return confeiteiroDTORepository.findByAvaliacaoConfeiteiros();
	}
	
	
	//BUSCA TODOS OS CONFEITEIROS ATIVOS
	@GetMapping("/ativo")
	@CrossOrigin(origins = "http://localHost:3000")
	public List<ConfeiteiroDTO>getAtivos(){
		return confeiteiroDTORepository.findByConfeiteiroAtivo();
	}
	
	
	//ATUALIZA OS DADOS DO CONFEITEIRO SEM CPF, SENHA E EMAIL
	@PutMapping("/{codConfeiteiro}")
	@CrossOrigin(origins = "http://localhost:3000")
	public ResponseEntity<ConfeiteiroDTO> atualizaConteiteiro (@PathVariable Long codConfeiteiro, @RequestBody ConfeiteiroDTO confeiteiro){
		
		ConfeiteiroDTO confeiteiroSalvo = confeiteiroDTORepository.findByCod(codConfeiteiro);
		System.out.println(confeiteiro);
		//pega o objeto celular
		Celular celular = confeiteiroSalvo.getCelular();
		
		// Converte a data inserida no padrão dd/MM/yyyy 
		// para o padrão yyyy-MM-dd que será inserida no banco
		confeiteiro.setDtNasc(ConverterData.dataBanco(confeiteiro.getDtNasc()));
		
		
		//seta nesse celular o celular que estou passando no corpo
		celular.setCelular(confeiteiro.getCelular().getCelular());
		
		//depois passa o retorno do objeto no confeiteiro
		confeiteiro.setCelular(celular);
		confeiteiro.setAvaliacao(confeiteiroSalvo.getAvaliacao());
		confeiteiro.setStatus(confeiteiroSalvo.getStatus());
		
		BeanUtils.copyProperties(confeiteiro, confeiteiroSalvo,"codConfeiteiro");
		
		confeiteiroDTORepository.save(confeiteiro);
		
		return ResponseEntity.ok(confeiteiro);
	}
	
	

}
