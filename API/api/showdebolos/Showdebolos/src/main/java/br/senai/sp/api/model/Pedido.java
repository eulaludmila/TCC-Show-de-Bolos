package br.senai.sp.api.model;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;
import javax.validation.constraints.NotNull;

@Entity
@Table(name = "tbl_pedido")
public class Pedido {
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long codPedido;
	
	private double valorTotal;
	private String dataSolicitacao;
	private String dataEntrega;
	private char tipoPagamento;
	private String status;
	private String aprovacao;
	private String observacao;
	private String producao;
	
	@NotNull
	@ManyToOne
	@JoinColumn(name = "cod_cliente")
	private Cliente cliente;
	

	public Long getCodPedido() {
		return codPedido;
	}

	public void setCodPedido(Long codPedido) {
		this.codPedido = codPedido;
	}

	public double getValorTotal() {
		return valorTotal;
	}

	public void setValorTotal(double valorTotal) {
		this.valorTotal = valorTotal;
	}

	public String getDataSolicitacao() {
		return dataSolicitacao;
	}

	public void setDataSolicitacao(String dataSolicitacao) {
		this.dataSolicitacao = dataSolicitacao;
	}

	public String getDataEntrega() {
		return dataEntrega;
	}

	public void setDataEntrega(String dataEntrega) {
		this.dataEntrega = dataEntrega;
	}
	
	
	public char getTipoPagamento() {
		return tipoPagamento;
	}

	public void setTipoPagamento(char tipoPagamento) {
		this.tipoPagamento = tipoPagamento;
	}

	public String getStatus() {
		return status;
	}

	public void setStatus(String status) {
		this.status = status;
	}

	public String getAprovacao() {
		return aprovacao;
	}

	public void setAprovacao(String aprovacao) {
		this.aprovacao = aprovacao;
	}

	public String getObservacao() {
		return observacao;
	}

	public void setObservacao(String observacao) {
		this.observacao = observacao;
	}

	public Cliente getCliente() {
		return cliente;
	}

	public void setCliente(Cliente cliente) {
		this.cliente = cliente;
	}

	
	public String getProducao() {
		return producao;
	}

	public void setProducao(String producao) {
		this.producao = producao;
	}

	@Override
	public String toString() {
		return "Pedido [codPedido=" + codPedido + ", valorTotal=" + valorTotal + ", dataSolicitacao=" + dataSolicitacao
				+ ", dataEntrega=" + dataEntrega + ", tipoPagamento=" + tipoPagamento + ", status=" + status
				+ ", aprovacao=" + aprovacao + ", observacao=" + observacao + ", producao=" + producao + ", cliente="
				+ cliente + "]";
	}


	
}
