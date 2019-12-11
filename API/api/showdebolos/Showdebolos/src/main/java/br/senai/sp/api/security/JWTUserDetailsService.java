package br.senai.sp.api.security;

import java.util.ArrayList;
import java.util.Collection;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import br.senai.sp.api.model.Cliente;
import br.senai.sp.api.model.Confeiteiro;
import br.senai.sp.api.repository.ClienteRepository;
import br.senai.sp.api.repository.ConfeiteiroRepository;



@Service
public class JWTUserDetailsService implements UserDetailsService {

	
	@Autowired
	ConfeiteiroRepository confeiteiroRepository;
	
	@Autowired
	ClienteRepository clienteRepository;

	
	public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
		
		System.out.println(username);
		
		Confeiteiro confeiteiro = confeiteiroRepository.findConfeiteiroByEmail(username);
		
		Cliente cliente = clienteRepository.findClienteByEmail(username);
		
		if (confeiteiro != null) {
			return (UserDetails) new User(confeiteiro.getEmail(), confeiteiro.getSenha(),  new ArrayList());
		} else if(cliente != null) {
			return (UserDetails) new User(cliente.getEmail(), cliente.getSenha(),  new ArrayList());
		}else {
			throw new UsernameNotFoundException("User not found with username: " + username);
		}
	}

}