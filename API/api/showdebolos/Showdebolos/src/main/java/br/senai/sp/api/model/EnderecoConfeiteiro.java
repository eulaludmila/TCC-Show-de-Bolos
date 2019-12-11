package br.senai.sp.api.model;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

@Entity
@Table (name="tbl_endereco_confeiteiro") 
public class EnderecoConfeiteiro {
	
	@Id
	@Column(name="cod_endereco_confeiteiro")
	@GeneratedValue(strategy=GenerationType.IDENTITY)
	private Long codEnderecoConfeiteiro;
	
	@ManyToOne
	@JoinColumn(name="cod_confeiteiro")
	private Confeiteiro confeiteiro;
	
	@ManyToOne
	@JoinColumn(name="cod_endereco")
	private Endereco endereco;

	public Long getCodEnderecoConfeiteiro() {
		return codEnderecoConfeiteiro;
	}

	public void setCodEnderecoConfeiteiro(Long codEnderecoConfeiteiro) {
		this.codEnderecoConfeiteiro = codEnderecoConfeiteiro;
	}

	public Confeiteiro getConfeiteiro() {
		return confeiteiro;
	}

	public void setConfeiteiro(Confeiteiro confeiteiro) {
		this.confeiteiro = confeiteiro;
	}

	public Endereco getEndereco() {
		return endereco;
	}

	public void setEndereco(Endereco endereco) {
		this.endereco = endereco;
	}

	@Override
	public String toString() {
		return "EnderecoConfeiteiro [codEnderecoConfeiteiro=" + codEnderecoConfeiteiro + ", confeiteiro=" + confeiteiro
				+ "]";
	}
	
	

}
