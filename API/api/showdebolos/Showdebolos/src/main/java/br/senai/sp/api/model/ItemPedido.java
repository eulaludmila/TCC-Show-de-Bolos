package br.senai.sp.api.model;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToMany;
import javax.persistence.ManyToOne;
import javax.persistence.Table;
import javax.validation.constraints.NotNull;

@Entity
@Table(name = "tbl_item_pedido")
public class ItemPedido {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long codItemPedido;

	@ManyToOne
	@JoinColumn(name = "cod_produto")
	private ProdutoDTO produto;

	@NotNull
	private String quantidade;
	
	@NotNull
	private double valor;

	
	@ManyToOne
	@JoinColumn(name = "cod_pedido")
	private Pedido pedido;


	public Long getCodItemPedido() {
		return codItemPedido;
	}


	public void setCodItemPedido(Long codItemPedido) {
		this.codItemPedido = codItemPedido;
	}


	public ProdutoDTO getProduto() {
		return produto;
	}


	public void setProduto(ProdutoDTO produto) {
		this.produto = produto;
	}


	public String getQuantidade() {
		return quantidade;
	}


	public void setQuantidade(String quantidade) {
		this.quantidade = quantidade;
	}


	public double getValor() {
		return valor;
	}


	public void setValor(double valor) {
		this.valor = valor;
	}


	public Pedido getPedido() {
		return pedido;
	}


	public void setPedido(Pedido pedido) {
		this.pedido = pedido;
	}


	@Override
	public String toString() {
		return "ItemPedido [codItemPedido=" + codItemPedido + ", produto=" + produto + ", quantidade=" + quantidade
				+ ", valor=" + valor + ", pedido=" + pedido + "]";
	}

	

}
