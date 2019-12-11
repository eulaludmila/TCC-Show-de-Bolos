package br.senai.sp.api.resource;

import java.util.List;

import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import br.senai.sp.api.model.Categoria;
import br.senai.sp.api.repository.CategoriaRepository;

@CrossOrigin(origins = "http://showdebolos.tk")
@RestController
@RequestMapping("/categoria")
public class CategoriaResource {

	@Autowired
	public CategoriaRepository categoriaRepository;
	
	//traz todas as categorias
	@GetMapping
	@CrossOrigin(origins = "http://localhost:3000")
	public List<Categoria> getCategorias(){
		return categoriaRepository.findAll();
	}
	
	//traz todas as categorias
//	@GetMapping("/{codCategoria}")
//	@CrossOrigin(origins = "http://localhost:3000")
//	public Categoria getCategoria(@PathVariable Long codCategoria){
//		return categoriaRepository.findByCod(codCategoria);
//	}
	
	//CADASTRA A CATEGORIA
	@PostMapping
	@CrossOrigin(origins = "http://localhost:3000")
	public Categoria gravarCategoria(@RequestBody Categoria categoria) {
		
		//Subcategoria subcategoria = categoria.getSubcategoria();
		
		Categoria categoriaSalvo = categoriaRepository.save(categoria);
		return categoriaSalvo;
		
	}
	
	//ATUALIZA A CATEGORIA
	@PutMapping("/{codCategoria}")
	@CrossOrigin(origins = "http://localhost:3000")
	public ResponseEntity<Categoria> atualizaCategoria(@PathVariable Long codCategoria, @RequestBody Categoria categoria){
		
		Categoria categoriaSalvo = categoriaRepository.findByCod(codCategoria);
		BeanUtils.copyProperties(categoria, codCategoria, "codCategoria");
		
		categoriaRepository.save(categoria);
		return ResponseEntity.ok(categoriaSalvo);
	}
	
}
