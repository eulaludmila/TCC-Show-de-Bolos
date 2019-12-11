package br.senai.sp.api.model;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name="tbl_estado")
public class Estado {
	
	@Id
	@Column(name="cod_estado")
	@GeneratedValue(strategy=GenerationType.IDENTITY)
	private Long codEstado;
	
	private String uf;
	
	private String estado;

	public Long getCodEstado() {
		return codEstado;
	}

	public void setCodEstado(Long codEstado) {
		this.codEstado = codEstado;
	}

	public String getUf() {
		return uf;
	}

	public void setUf(String uf) {
		this.uf = uf;
	}
	
	

	public String getEstado() {
		return estado;
	}

	public void setEstado(String estado) {
		this.estado = estado;
	}

	@Override
	public String toString() {
		return "Estado [codEstado=" + codEstado + ", uf=" + uf + ", estado=" + estado + "]";
	}

	

}
