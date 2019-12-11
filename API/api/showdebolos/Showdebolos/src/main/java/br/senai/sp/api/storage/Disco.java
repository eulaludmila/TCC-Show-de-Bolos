package br.senai.sp.api.storage;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;
import org.springframework.web.multipart.MultipartFile;

@Component
public class Disco {

	@Value("${disco.caminho.raiz}")
	private String caminhoRaiz;
	
	@Value("${disco.cliente.diretorio-clientes}")
	private String diretorioFotosClientes;
	
	@Value("${disco.confeiteiro.diretorio-confeiteiros}")
	private String diretorioFotosConfeiteiros;
	
	@Value("${disco.produto.diretorio-produtos}")
	private String diretorioFotosProdutos;
	
	public Path salvarFoto(MultipartFile foto, String tipoUsuario) {
		
		if(tipoUsuario == "cliente") {
			Path caminhoFoto = this.salvar(diretorioFotosClientes, foto);

			return caminhoFoto;
			
		} else if(tipoUsuario == "confeiteiro"){
			Path caminhoFoto = this.salvar(diretorioFotosConfeiteiros, foto);

			return caminhoFoto;
		} else {
			Path caminhoFoto = this.salvar(diretorioFotosProdutos, foto);

			return caminhoFoto;
		}

	}
	
	public Path salvar(String diretorio, MultipartFile arquivo) {
		
		// Monta o caminho do diretório onde a foto será salva
		// C:/Users/18175251/TCC-API/diretorio
		Path diretorioPath = Paths.get(this.caminhoRaiz, diretorio);
		
		Path diretorioBanco = Paths.get("/fotos/", diretorio);
		
		//Monta o caminho do arquivo, juntando o caminho do diretorio 
		// com o nome da foto
		//C:/Users/18175251/TCC-API/diretorio/teste.jpg
		Path arquivoPath = diretorioPath.resolve(arquivo.getOriginalFilename());
		
		Path arquivoBanco = diretorioBanco.resolve(arquivo.getOriginalFilename());
	
		try {
			
			// Caso os diretorios não existam, será criado
			Files.createDirectories(diretorioPath);
			
			// Transfere o arquivo para a pasta desejada
			arquivo.transferTo(arquivoPath.toFile());
			
			return arquivoBanco;
			
		} catch (IOException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
			
			return null;
		}
		
	
	}
}
