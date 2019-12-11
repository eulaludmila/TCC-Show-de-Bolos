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
@Table (name="tbl_endereco_cliente")
public class EnderecoCliente {

	@Id
	@GeneratedValue(strategy=GenerationType.IDENTITY)
	@Column(name="cod_endereco_cliente")
	private Long codEnderecoCliente;
	
	@ManyToOne
	@JoinColumn(name="cod_endereco")
	private Endereco endereco;
	
	@ManyToOne
	@JoinColumn(name="cod_cliente")
	private Cliente cliente;

	public Long getCodEnderecoCliente() {
		return codEnderecoCliente;
	}

	public void setCodEnderecoCliente(Long codEnderecoCliente) {
		this.codEnderecoCliente = codEnderecoCliente;
	}

	public Endereco getEndereco() {
		return endereco;
	}

	public void setEndereco(Endereco endereco) {
		this.endereco = endereco;
	}

	public Cliente getCliente() {
		return cliente;
	}

	public void setCliente(Cliente cliente) {
		this.cliente = cliente;
	}

	@Override
	public String toString() {
		return "EnderecoCliente [codEnderecoCliente=" + codEnderecoCliente + ", endereco=" + endereco + ", cliente="
				+ cliente + "]";
	}
	
	
}
