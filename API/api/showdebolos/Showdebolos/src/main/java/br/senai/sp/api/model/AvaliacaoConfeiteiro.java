package br.senai.sp.api.model;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

@Entity
@Table(name = "tbl_avaliacao_confeiteiro")
public class AvaliacaoConfeiteiro {
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long codAvaliacaoConfeiteiro;
	
	@JoinColumn(name = "avaliacao_confeiteiro")
	private double avaliacaoConfeiteiro;
	
	private String comentario;
	
	@ManyToOne
	@JoinColumn(name = "cod_confeiteiro")
	private Confeiteiro confeiteiro;
	
	@ManyToOne
	@JoinColumn(name = "cod_cliente")
	private Cliente cliente;

	public Long getCodAvaliacaoConfeiteiro() {
		return codAvaliacaoConfeiteiro;
	}

	public void setCodAvaliacaoConfeiteiro(Long codAvaliacaoConfeiteiro) {
		this.codAvaliacaoConfeiteiro = codAvaliacaoConfeiteiro;
	}

	public double getAvaliacaoConfeiteiro() {
		return avaliacaoConfeiteiro;
	}

	public void setAvaliacao(double avaliacaoConfeiteiro) {
		this.avaliacaoConfeiteiro = avaliacaoConfeiteiro;
	}

	public Confeiteiro getConfeiteiro() {
		return confeiteiro;
	}

	public void setConfeiteiro(Confeiteiro confeiteiro) {
		this.confeiteiro = confeiteiro;
	}
	
	
	public void setAvaliacaoConfeiteiro(double avaliacaoConfeiteiro) {
		this.avaliacaoConfeiteiro = avaliacaoConfeiteiro;
	}

	public String getComentario() {
		return comentario;
	}

	public void setComentario(String comentario) {
		this.comentario = comentario;
	}

	public Cliente getCliente() {
		return cliente;
	}

	public void setCliente(Cliente cliente) {
		this.cliente = cliente;
	}

	@Override
	public String toString() {
		return "AvaliacaoConfeiteiro [codAvaliacaoConfeiteiro=" + codAvaliacaoConfeiteiro + ", avaliacaoConfeiteiro=" + avaliacaoConfeiteiro
				+ ", comentario=" + comentario + ", confeiteiro=" + confeiteiro + ", cliente=" + cliente + "]";
	}
	
	
	
}
