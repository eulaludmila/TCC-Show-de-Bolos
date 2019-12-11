package br.senai.sp.api.model;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import javax.persistence.Table;
import javax.validation.constraints.NotNull;

@Entity
@Table(name = "tbl_cartao_cliente")
public class CartaoCliente {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long codCartaoCliente;
	
	@NotNull
	@ManyToOne
	@JoinColumn(name = "cod_cartao")
	private Cartao cartao;
	
	@NotNull
	@ManyToOne
	@JoinColumn(name = "cod_cliente")
	private Cliente cliente;

	public Long getCodCartaoCliente() {
		return codCartaoCliente;
	}

	public void setCodCartaoCliente(Long codCartaoCliente) {
		this.codCartaoCliente = codCartaoCliente;
	}

	public Cartao getCartao() {
		return cartao;
	}

	public void setCartao(Cartao cartao) {
		this.cartao = cartao;
	}

	public Cliente getCliente() {
		return cliente;
	}

	public void setCliente(Cliente cliente) {
		this.cliente = cliente;
	}

	@Override
	public String toString() {
		return "CartaoCliente [codCartaoCliente=" + codCartaoCliente + ", cartao=" + cartao + ", cliente=" + cliente
				+ "]";
	}
	
}
