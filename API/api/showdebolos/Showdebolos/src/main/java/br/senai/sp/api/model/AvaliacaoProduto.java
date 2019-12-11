package br.senai.sp.api.model;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

@Entity
@Table(name = "tbl_avaliacao_produto")
public class AvaliacaoProduto {
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long codAvaliacaoProduto;
	
	@JoinColumn(name = "avaliacao_produto")
	private double avaliacaoProduto;
	
	private String comentario;
	
	@ManyToOne
	@JoinColumn(name = "cod_produto")
	private Produto produto;
	
	//@ManyToOne
	//@JoinColumn(name = "cod_confeiteiro")
	//private Confeiteiro confeiteiro;
	
	@ManyToOne
	@JoinColumn(name = "cod_cliente")
	private Cliente cliente;

	public Long getCodAvaliacaoProduto() {
		return codAvaliacaoProduto;
	}

	public void setCodAvaliacaoProduto(Long codAvaliacaoProduto) {
		this.codAvaliacaoProduto = codAvaliacaoProduto;
	}

	public double getAvaliacaoProduto() {
		return avaliacaoProduto;
	}

	public void setAvaliacaoProduto(double avaliacaoProduto) {
		this.avaliacaoProduto = avaliacaoProduto;
	}

	public String getComentario() {
		return comentario;
	}

	public void setComentario(String comentario) {
		this.comentario = comentario;
	}

	public Produto getProduto() {
		return produto;
	}

	public void setProduto(Produto produto) {
		this.produto = produto;
	}

//	public Confeiteiro getConfeiteiro() {
//		return confeiteiro;
//	}
//
//	public void setConfeiteiro(Confeiteiro confeiteiro) {
//		this.confeiteiro = confeiteiro;
//	}

	public Cliente getCliente() {
		return cliente;
	}

	public void setCliente(Cliente cliente) {
		this.cliente = cliente;
	}

	
	@Override
	public String toString() {
		return "AvaliacaoProduto [codAvaliacaoProduto=" + codAvaliacaoProduto + ", avaliacaoProduto=" + avaliacaoProduto
				+ ", comentario=" + comentario + ", produto=" + produto + ", cliente="
				+ cliente + "]";
	}

	
	
	
	
}
