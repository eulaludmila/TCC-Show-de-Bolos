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
@Table (name="tbl_cliente")
public class Cliente {
	
	@Id
	@GeneratedValue(strategy=GenerationType.IDENTITY)
	@Column(name="cod_cliente")
	private Long codCliente;
	
	
	@NotNull
	@Size(min=3, max=45, message="Nome deve conter pelo menos 3 caracteres")
	private String nome;
	
	@NotNull
	@Size(min=3, max=100, message="Sobrenome deve conter pelo menos 3 caracteres")
	private String sobrenome;
	
	@NotNull
	@Size(min=14, max=14, message="CPF deve estar no formato correto")
	@Column(name="cpf", unique = true)
	private String cpf;
	
	@NotNull
	@Size(min=10, max=10, message="Data deve estar no formato correto")
	private String dtNasc;
	
	@NotNull
	@Size(min=13, max=100, message="E-mail deve estar no formato correto")
	@Column(name="email", unique = true)
	private String email;
	
	@NotNull
	@Size(min=8, max=30, message="Senha deve conter pelo menos 8 caracteres")
	private String senha;
	
	@ManyToOne
	@JoinColumn(name="cod_celular")
	private Celular celular;
	
	@NotNull
	private String sexo;
	
	private String foto;
	
	private boolean status;
	
	public Long getCodCliente() {
		return codCliente;
	}
	public void setCodCliente(Long codCliente) {
		this.codCliente = codCliente;
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
	public String getCpf() {
		return cpf;
	}
	public void setCpf(String cpf) {
		this.cpf = cpf;
	}
	public String getDtNasc() {
		return dtNasc;
	}
	public void setDtNasc(String dtNasc) {
		this.dtNasc = dtNasc;
	}
	public String getEmail() {
		return email;
	}
	public void setEmail(String email) {
		this.email = email;
	}
	public String getSenha() {
		return senha;
	}
	public void setSenha(String senha) {
		this.senha = senha;
	}
	public Celular getCelular() {
		return celular;
	}
	public void setCelular(Celular celular) {
		this.celular = celular;
	}
	public String getSexo() {
		return sexo;
	}
	public void setSexo(String sexo) {
		this.sexo = sexo;
	}
	public String getFoto() {
		return foto;
	}
	public void setFoto(String foto) {
		this.foto = foto;
	}
	
	
	public boolean isStatus() {
		return status;
	}
	public void setStatus(boolean status) {
		this.status = status;
	}
	
	
	@Override
	public String toString() {
		return "Cliente [codCliente=" + codCliente + ", nome=" + nome + ", sobrenome=" + sobrenome + ", cpf=" + cpf
				+ ", dtNasc=" + dtNasc + ", email=" + email + ", senha=" + senha + ", celular=" + celular + ", sexo="
				+ sexo + ", foto=" + foto + ", status=" + status + "]";
	}
	
	
	

}
