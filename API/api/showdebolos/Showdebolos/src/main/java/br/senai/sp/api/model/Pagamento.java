package br.senai.sp.api.model;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import javax.persistence.OneToOne;
import javax.persistence.Table;
import javax.validation.constraints.NotNull;

@Entity
@Table(name = "tbl_pagamento")
public class Pagamento {
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long codPagamento;
	
	@NotNull
	@ManyToOne
	@JoinColumn(name = "cod_cartao_cliente")
	private CartaoCliente cartaoCliente;
	
	private String dataPagamento;
	private char status;
	
	@NotNull
	@OneToOne
	@JoinColumn(name = "cod_pedido")
	private Pedido pedido;

	public Long getCodPagamento() {
		return codPagamento;
	}

	public void setCodPagamento(Long codPagamento) {
		this.codPagamento = codPagamento;
	}

	public CartaoCliente getCartaoCliente() {
		return cartaoCliente;
	}

	public void setCartaoCliente(CartaoCliente cartaoCliente) {
		this.cartaoCliente = cartaoCliente;
	}

	public String getDataPagamento() {
		return dataPagamento;
	}

	public void setDataPagamento(String dataPagamento) {
		this.dataPagamento = dataPagamento;
	}

	public char getStatus() {
		return status;
	}

	public void setStatus(char status) {
		this.status = status;
	}

	public Pedido getPedido() {
		return pedido;
	}

	public void setPedido(Pedido pedido) {
		this.pedido = pedido;
	}

	@Override
	public String toString() {
		return "Pagamento [codPagamento=" + codPagamento + ", dataPagamento=" + dataPagamento + ", status=" + status
				+ ", pedido=" + pedido + "]";
	}
	

	

	
}
