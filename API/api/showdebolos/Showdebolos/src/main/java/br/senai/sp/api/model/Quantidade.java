package br.senai.sp.api.model;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;
import javax.validation.constraints.NotNull;

@Entity
@Table(name="tbl_quantidade")
public class Quantidade {
	
	@Id
	@GeneratedValue(strategy=GenerationType.IDENTITY)
	private Long codQuantidade;
	
	@NotNull
	private int multiplo;
	
	@NotNull
	private int maximo;

	public Long getCodQuantidade() {
		return codQuantidade;
	}

	public void setCodQuantidade(Long codQuantidade) {
		this.codQuantidade = codQuantidade;
	}

	public int getMultiplo() {
		return multiplo;
	}

	public void setMultiplo(int multiplo) {
		this.multiplo = multiplo;
	}

	public int getMaximo() {
		return maximo;
	}

	public void setMaximo(int maximo) {
		this.maximo = maximo;
	}

	@Override
	public String toString() {
		return "Quantidade [codQuantidade=" + codQuantidade + ", multiplo=" + multiplo + ", maximo=" + maximo + "]";
	}

}
