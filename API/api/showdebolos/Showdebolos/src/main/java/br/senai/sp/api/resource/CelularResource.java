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
import br.senai.sp.api.repository.CelularRepository;

@CrossOrigin(origins = "http://showdebolos.tk")
@RestController
@RequestMapping("/celular")
public class CelularResource {
	
	@Autowired 
	private CelularRepository celularRepository;
	
	@GetMapping
	@CrossOrigin(origins = "http://localHost3000")
	public List<Celular> getCelulares(){
		return celularRepository.findAll();
		
	}
	
	@PostMapping
	@CrossOrigin(origins = "http://localhost:3000")
	public Celular gravarCelular(@Validated @RequestBody Celular celular){
		Celular celularSalvo = celularRepository.save(celular);
		return celularSalvo;
	}
	
	
	@PutMapping("/{codCelular}")
	@CrossOrigin(origins = "http://localhost:3000")
	public ResponseEntity<Celular> atualizaCelular (@PathVariable Long codCelular, @RequestBody Celular celular	){
		Celular celularSalvo = celularRepository.findById(codCelular).get();
		
		BeanUtils.copyProperties(celular, celularSalvo,"codCelular");
		
		celularRepository.save(celular);
		
		return ResponseEntity.ok(celularSalvo);
	}

}
