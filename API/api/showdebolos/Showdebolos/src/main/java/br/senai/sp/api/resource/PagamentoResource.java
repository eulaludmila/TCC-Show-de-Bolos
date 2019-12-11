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

import br.senai.sp.api.model.Cartao;
import br.senai.sp.api.model.Celular;
import br.senai.sp.api.model.Pagamento;
import br.senai.sp.api.repository.CartaoRepository;
import br.senai.sp.api.repository.CelularRepository;
import br.senai.sp.api.repository.PagamentoRepository;

@CrossOrigin(origins = "http://showdebolos.tk")
@RestController
@RequestMapping("/pagamento")
public class PagamentoResource {
	
	@Autowired 
	private PagamentoRepository pagamentoRepository;
	
	@GetMapping
	@CrossOrigin(origins = "http://localHost3000")
	public List<Pagamento> getPagamento(){
		return pagamentoRepository.findAll();
		
	}
	
	

}
