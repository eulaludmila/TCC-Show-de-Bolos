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


import br.senai.sp.api.model.FaleConosco;
import br.senai.sp.api.repository.FaleConoscoRepository;

@RequestMapping("/faleconosco")
@RestController
public class FaleConoscoResource {

	@Autowired
	public FaleConoscoRepository faleConoscoRepository;
	
	@GetMapping
	public List<FaleConosco> getFaleConosco(){
		return faleConoscoRepository.findAll();
	}
	
	@PostMapping
	@CrossOrigin(origins = "http://localhost:3000")
	public FaleConosco gravarFaleConosco(@Validated @RequestBody FaleConosco faleConosco){
		FaleConosco faleConoscoSalvo = faleConoscoRepository.save(faleConosco);
		return faleConoscoSalvo;
	}
	
	@PutMapping
	@CrossOrigin(origins = "http://localhost:3000")
	public ResponseEntity<FaleConosco> atualizaCelular (@PathVariable Long codFaleConosco, @RequestBody FaleConosco faleConosco	){
		FaleConosco faleConoscoSalvo = faleConoscoRepository.findById(codFaleConosco).get();
		
		BeanUtils.copyProperties(faleConosco, faleConoscoSalvo,"codFaleConosco");
		
		faleConoscoRepository.save(faleConosco);
		
		return ResponseEntity.ok(faleConoscoSalvo);
	}
	
}
