package br.senai.sp.api.resource;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import br.senai.sp.api.model.Quantidade;
import br.senai.sp.api.repository.QuantidadeRepository;

@CrossOrigin(origins = "http://showdebolos.tk")
@RestController
@RequestMapping("/quantidade")
public class QuantidadeResource {

	
	@Autowired
	public QuantidadeRepository quantidadeRepository;
	
	@GetMapping
	@CrossOrigin(origins = "http://localhost:3000")
	public List<Quantidade> getQuantidades(){
		return quantidadeRepository.findAll();
	}
}
