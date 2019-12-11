package br.senai.sp.api.model;

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
public class Produto {
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
	
	@ManyToOne
	@JoinColumn(name="cod_confeiteiro")
	private ConfeiteiroDTOEmail confeiteiro;
	
	@ManyToOne
	@JoinColumn(name="cod_categoria")
	private Categoria categoria;
	
	@OneToOne
	@JoinColumn(name="cod_quantidade")
	private Quantidade quantidade;
	
	private boolean status;
	
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
	public ConfeiteiroDTOEmail getConfeiteiro() {
		return confeiteiro;
	}
	public void setConfeiteiro(ConfeiteiroDTOEmail confeiteiro) {
		this.confeiteiro = confeiteiro;
	}
	public Categoria getCategoria() {
		return categoria;
	}
	public void setCategoria(Categoria categoria) {
		this.categoria = categoria;
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
	public boolean getStatus() {
		return status;
	}
	public void setStatus(boolean status) {
		this.status = status;
	}
	public Quantidade getQuantidade() {
		return quantidade;
	}
	public void setQuantidade(Quantidade quantidade) {
		this.quantidade = quantidade;
	}
	
	public double getAvaliacao() {
		return avaliacao;
	}
	public void setAvaliacao(double avaliacao) {
		this.avaliacao = avaliacao;
	}
	
	
	@Override
	public String toString() {
		return "Produto [codProduto=" + codProduto + ", nomeProduto=" + nomeProduto + ", descricao=" + descricao
				+ ", foto=" + foto + ", preco=" + preco + ", avaliacao=" + avaliacao + ", confeiteiro=" + confeiteiro
				+ ", categoria=" + categoria + ", quantidade=" + quantidade + ", status=" + status + "]";
	}
	
}
