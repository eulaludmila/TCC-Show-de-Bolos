package br.senai.sp.api.model;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

public class ConfeiteiroCodDTO {
	


	private int codConfeiteiro;

	public int getCodConfeiteiro() {
		return codConfeiteiro;
	}

	public void setCodConfeiteiro(int codConfeiteiro) {
		this.codConfeiteiro = codConfeiteiro;
	}

	@Override
	public String toString() {
		return "ConfeiteiroCodDTO [codConfeiteiro=" + codConfeiteiro + "]";
	}
	
	

}