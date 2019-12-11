package br.senai.sp.api.resource;

import javax.servlet.ServletContext;

import org.apache.tomcat.util.codec.binary.Base64;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import br.senai.sp.api.model.Cliente;
import br.senai.sp.api.model.Confeiteiro;
import br.senai.sp.api.model.Produto;
import br.senai.sp.api.repository.ClienteRepository;
import br.senai.sp.api.repository.ConfeiteiroRepository;
import br.senai.sp.api.repository.ProdutoRepository;
import br.senai.sp.api.storage.Disco;

@CrossOrigin(origins = "http://showdebolos.tk")
@RestController
@RequestMapping("/foto")
public class FotoResource {
	
	
	@Autowired
	private Disco disco;
	
	@Autowired
	private ClienteRepository clienteRepository;
	
	@Autowired
	private ConfeiteiroRepository confeiteiroRepository;
	
	@Autowired
	public ProdutoRepository produtoRepository;
	
	@Value("${disco.caminho.raiz}")
	private String caminhoRaiz;
	
	
	//cadastro da foto do cliente
	@PostMapping("/cliente")
	@CrossOrigin(origins = "http://localhost:3000")
	public Cliente uploadCliente(@RequestParam MultipartFile foto, @RequestParam Long codCliente) {
		
		String caminhoFoto = String.valueOf(disco.salvarFoto(foto, "cliente"));
		
		Cliente clienteFoto = clienteRepository.findByCod(codCliente);
		
		clienteFoto.setFoto(caminhoFoto);
		
		//		
		return clienteRepository.save(clienteFoto);

	}
	
	//cadastro da foto do confeiteiro
	@PostMapping("/confeiteiro")
	@CrossOrigin(origins = "http://localhost:3000")
	public Confeiteiro uploadConfeiteiro(@RequestParam MultipartFile foto, @RequestParam Long codConfeiteiro) {
		String caminhoFoto = String.valueOf(disco.salvarFoto(foto, "confeiteiro"));
		
		Confeiteiro confeiteiroFoto = confeiteiroRepository.findByCod(codConfeiteiro);
		
		confeiteiroFoto.setFoto(caminhoFoto);
		
		
		
		return confeiteiroRepository.save(confeiteiroFoto);
	}
	
	
	//cadastro da foto do produto
	@PostMapping("/produto")
	@CrossOrigin(origins = "http://localhost:3000")
	public Produto uploadProduto(@RequestParam MultipartFile foto, @RequestParam Long codProduto) {
		String caminhoFoto = String.valueOf(disco.salvarFoto(foto, "produto"));
		
		Produto produtoFoto = produtoRepository.findByCod(codProduto);
		
		produtoFoto.setFoto(caminhoFoto);
		
		
		
		return produtoRepository.save(produtoFoto);
	}
	
	

}
