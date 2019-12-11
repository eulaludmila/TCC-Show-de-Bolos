package br.senai.sp.api.model;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToOne;
import javax.persistence.Table;
import javax.validation.constraints.NotNull;

@Entity
@Table(name="tbl_produto")
public class ProdutoDTO {
	
	@Id
	@GeneratedValue(strategy=GenerationType.IDENTITY)
	private Long codProduto;
	
	@NotNull
	private String nomeProduto;
	
	@NotNull
	private String descricao;
	
	@NotNull
	private String foto;
	
	private double preco;
	
	private double avaliacao;
	
	@Column(name="cod_confeiteiro")
	private Long confeiteiro;
	
	@Column(name="cod_quantidade")
	private String quantidade;

	public Long getCodProduto() {
		return codProduto;
	}

	public void setCodProduto(Long codProduto) {
		this.codProduto = codProduto;
	}

	public String getNomeProduto() {
		return nomeProduto;
	}

	public void setNomeProduto(String nomeProduto) {
		this.nomeProduto = nomeProduto;
	}

	public String getDescricao() {
		return descricao;
	}

	public void setDescricao(String descricao) {
		this.descricao = descricao;
	}

	public String getFoto() {
		return foto;
	}

	public void setFoto(String foto) {
		this.foto = foto;
	}

	public double getPreco() {
		return preco;
	}

	public void setPreco(double preco) {
		this.preco = preco;
	}

	public double getAvaliacao() {
		return avaliacao;
	}

	public void setAvaliacao(double avaliacao) {
		this.avaliacao = avaliacao;
	}

	public Long getConfeiteiro() { 
		return confeiteiro;
	}

	public void setConfeiteiro(Long confeiteiro) {
		this.confeiteiro = confeiteiro;
	}

	public String getQuantidade() {
		return quantidade;
	}

	public void setQuantidade(String quantidade) {
		this.quantidade = quantidade;
	}

	@Override
	public String toString() {
		return "ProdutoDTO [codProduto=" + codProduto + ", nomeProduto=" + nomeProduto + ", descricao=" + descricao
				+ ", foto=" + foto + ", preco=" + preco + ", avaliacao=" + avaliacao + ", confeiteiro=" + confeiteiro
				+ ", quantidade=" + quantidade + "]";
	}
	
	

}
