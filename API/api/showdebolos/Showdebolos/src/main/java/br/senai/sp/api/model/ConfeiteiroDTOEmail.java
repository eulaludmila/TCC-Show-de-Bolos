package br.senai.sp.api.model;


import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;

@Entity
@Table (name="tbl_confeiteiro")
public class ConfeiteiroDTOEmail {

	@Id
	@GeneratedValue(strategy=GenerationType.IDENTITY)
	@Column(name="cod_confeiteiro")
	private Long codConfeiteiro;
	
	@NotNull
	@Size(min=3, max=45, message="Nome deve conter pelo menos 3 caracteres")
	private String nome;
	
	@NotNull
	@Size(min=3, max=100, message="Sobrenome deve conter pelo menos 3 caracteres")
	private String sobrenome;
	
	
	@NotNull
	@Size(min=10, max=10, message="Data deve estar no formato correto")
	private String dtNasc;
	

	@ManyToOne
	@JoinColumn(name="cod_celular")
	private Celular celular;
	
	private String foto;
	
	private String email;
	
	@NotNull
	private String sexo;
	
	private double avaliacao;
	private int status;
	
	public Long getCodConfeiteiro() {
		return codConfeiteiro;
	}
	public void setCodConfeiteiro(Long codConfeiteiro) {
		this.codConfeiteiro = codConfeiteiro;
	}
	public String getNome() {
		return nome;
	}
	public void setNome(String nome) {
		this.nome = nome;
	}
	public String getSobrenome() {
		return sobrenome;
	}
	public void setSobrenome(String sobrenome) {
		this.sobrenome = sobrenome;
	}
	
	public String getDtNasc() {
		return dtNasc;
	}
	public void setDtNasc(String dtNasc) {
		this.dtNasc = dtNasc;
	}
	
	public Celular getCelular() {
		return celular;
	}
	public void setCelular(Celular celular) {
		this.celular = celular;
	}
	public String getFoto() {
		return foto;
	}
	public void setFoto(String foto) {
		this.foto = foto;
	}
	public String getSexo() {
		return sexo;
	}
	public void setSexo(String sexo) {
		this.sexo = sexo;
	}
	
	
	public double getAvaliacao() {
		return avaliacao;
	}
	public void setAvaliacao(double avaliacao) {
		this.avaliacao = avaliacao;
	}
	public int getStatus() {
		return status;
	}
	public void setStatus(int status) {
		this.status = status;
	}
	
	
	
	public String getEmail() {
		return email;
	}
	public void setEmail(String email) {
		this.email = email;
	}
	
	
	@Override
	public String toString() {
		return "ConfeiteiroDTOEmail [codConfeiteiro=" + codConfeiteiro + ", nome=" + nome + ", sobrenome=" + sobrenome
				+ ", dtNasc=" + dtNasc + ", celular=" + celular + ", foto=" + foto + ", email=" + email + ", sexo="
				+ sexo + ", avaliacao=" + avaliacao + ", status=" + status + "]";
	}

	
	
	
	
}
