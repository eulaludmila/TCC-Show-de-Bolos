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
import br.senai.sp.api.model.Cliente;
import br.senai.sp.api.model.ClienteDTO;
import br.senai.sp.api.model.Confeiteiro;
import br.senai.sp.api.repository.CelularRepository;
import br.senai.sp.api.repository.ClienteDTORepository;
import br.senai.sp.api.repository.ClienteRepository;
import br.senai.sp.api.repository.ConfeiteiroRepository;
import br.senai.sp.api.storage.Disco;
import br.senai.sp.api.utils.ConverterData;

@CrossOrigin(origins = "http://showdebolos.tk")
@RestController
@RequestMapping("/clienteDTO")
public class ClienteDTOResource {

	@Autowired
	ClienteDTORepository clienteDTORepository;
	
	@Autowired
	CelularRepository celularRepository;
	
	@Autowired
	Disco disco;

	//TRAZ TODOS OS CLIENTES
	@GetMapping("{codCliente}")
	@CrossOrigin(origins ="http://localhost:3000")
	public ClienteDTO getCliente(@PathVariable Long codCliente){
		return clienteDTORepository.findByCod(codCliente);
	}
	
	
	//ATUALIZA OS DADOS DO CONFEITEIRO
	@PutMapping("/{codCliente}")
	@CrossOrigin(origins = "http://localhost:3000")
	public ResponseEntity<ClienteDTO> atualizaCliente (@PathVariable Long codCliente, @RequestBody ClienteDTO cliente	){
		ClienteDTO clienteSalvo = clienteDTORepository.findByCod(codCliente);
		System.out.println(cliente);
		Celular celular = clienteSalvo.getCelular();
		
		if(cliente.getEmail() == "" && cliente.getSenha() == "") {
			
			cliente.setEmail(clienteSalvo.getEmail());
			cliente.setSenha(clienteSalvo.getSenha());
			
		}else if(cliente.getEmail() == "") {
			cliente.setEmail(clienteSalvo.getEmail());
			
		}else if(cliente.getSenha() == "") {
			cliente.setSenha(clienteSalvo.getSenha());
			
		}
		
		cliente.setStatus(1);
		cliente.setDtNasc(ConverterData.dataBanco(cliente.getDtNasc()));
		celular.setCelular(cliente.getCelular().getCelular());
		
		cliente.setCelular(celular);
		
		BeanUtils.copyProperties(cliente, clienteSalvo,"codCliente");
		
		clienteDTORepository.save(cliente);
		
		return ResponseEntity.ok(clienteSalvo);
	}
	
	
}
