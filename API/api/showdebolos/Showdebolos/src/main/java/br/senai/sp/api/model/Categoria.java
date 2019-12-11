package br.senai.sp.api.model;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;
import javax.validation.constraints.NotNull;

@Entity
@Table(name="tbl_categoria")
public class Categoria {
	
	@Id
	@GeneratedValue(strategy=GenerationType.IDENTITY)
	private Long codCategoria;
	
	@NotNull
	private String categoria;
	
	@NotNull
	private String tipoUnidade;
	
	public Long getCodCategoria() {
		return codCategoria;
	}
	public void setCodCategoria(Long codCategoria) {
		this.codCategoria = codCategoria;
	}
	public String getCategoria() {
		return categoria;
	}
	public void setCategoria(String categoria) {
		this.categoria = categoria;
	}
	public String getTipoUnidade() {
		return tipoUnidade;
	}
	public void setTipoUnidade(String tipoUnidade) {
		this.tipoUnidade = tipoUnidade;
	}
	
	@Override
	public String toString() {
		return "Categoria [codCategoria=" + codCategoria + ", categoria=" + categoria + ", tipoUnidade=" + tipoUnidade
				+"]";
	}

}
