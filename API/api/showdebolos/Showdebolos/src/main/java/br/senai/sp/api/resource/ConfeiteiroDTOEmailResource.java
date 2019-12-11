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
import br.senai.sp.api.model.ConfeiteiroDTOEmail;
import br.senai.sp.api.repository.CelularRepository;
import br.senai.sp.api.repository.ConfeiteiroDTOEmailRepository;
import br.senai.sp.api.repository.ConfeiteiroDTORepository;
import br.senai.sp.api.repository.ConfeiteiroRepository;
import br.senai.sp.api.utils.ConverterData;

@CrossOrigin(origins = "http://showdebolos.tk")
@RestController
@RequestMapping("/confeiteiroDTOEmail")
public class ConfeiteiroDTOEmailResource {
	
	@Autowired
	public ConfeiteiroDTOEmailRepository confeiteiroDTOEmailRepository;
	
	
	@GetMapping
	@CrossOrigin(origins = "http://localHost:3000")
	public List<ConfeiteiroDTOEmail> getConfeiteiros(){
		return confeiteiroDTOEmailRepository.findAll();
	}
	

	

}
