package br.senai.sp.api.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import br.senai.sp.api.model.Cartao;
import br.senai.sp.api.model.Celular;
import br.senai.sp.api.model.Pagamento;

public interface PagamentoRepository extends JpaRepository<Pagamento, Long> {

	
}
