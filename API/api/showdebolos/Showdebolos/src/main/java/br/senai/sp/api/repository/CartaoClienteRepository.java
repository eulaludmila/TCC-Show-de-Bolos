package br.senai.sp.api.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import br.senai.sp.api.model.Cartao;
import br.senai.sp.api.model.CartaoCliente;
import br.senai.sp.api.model.Celular;

public interface CartaoClienteRepository extends JpaRepository<CartaoCliente, Long> {

	
}
