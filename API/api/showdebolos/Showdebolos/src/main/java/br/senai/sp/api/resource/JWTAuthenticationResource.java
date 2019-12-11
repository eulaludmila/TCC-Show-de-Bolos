package br.senai.sp.api.resource;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.DisabledException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import br.senai.sp.api.model.Cliente;
import br.senai.sp.api.model.Confeiteiro;
import br.senai.sp.api.model.JWTRequest;
import br.senai.sp.api.model.JWTResponse;
import br.senai.sp.api.repository.ClienteRepository;
import br.senai.sp.api.repository.ConfeiteiroRepository;
import br.senai.sp.api.security.JWTTokenUtil;
import br.senai.sp.api.security.JWTUserDetailsService;


@CrossOrigin(origins = {"http://showdebolos.tk", "http://localhost:3000"})
@RestController
@RequestMapping("/login")
public class JWTAuthenticationResource {

	@Autowired
	private AuthenticationManager authenticationManager;

	@Autowired
	private JWTTokenUtil jwtTokenUtil;

	@Autowired
	private JWTUserDetailsService userDetailsService;

	@Autowired
	private ConfeiteiroRepository confeiteiroRepository;

	@Autowired
	private ClienteRepository clienteRepository;

	@PostMapping("/cliente")
	@CrossOrigin(origins = "http://localhost:3000")
	public ResponseEntity createAuthenticationTokenCliente(@Validated @RequestBody JWTRequest authenticationRequest)
			throws Exception {

		Cliente cliente = clienteRepository.findClienteByEmailAndSenha(authenticationRequest.getUsername(), authenticationRequest.getPassword());
		
		if(cliente != null) {
			final UserDetails userDetails = userDetailsService.loadUserByUsername(cliente.getEmail());
			final String token = jwtTokenUtil.generateToken(userDetails, cliente.getCodCliente());
			return ResponseEntity.ok(new JWTResponse(token));
		} else {
			return ResponseEntity.badRequest().build();
		}

		

	}

	@PostMapping("/confeiteiro")
	@CrossOrigin(origins = "http://localhost:3000")
	public ResponseEntity<?> createAuthenticationTokenConfeiteiro(@RequestBody JWTRequest authenticationRequest)
			throws Exception {

		Confeiteiro confeiteiro = confeiteiroRepository.findConfeiteiroByEmailAndSenha(authenticationRequest.getUsername(), authenticationRequest.getPassword());

		if(confeiteiro != null) {
			final UserDetails userDetails = userDetailsService.loadUserByUsername(confeiteiro.getEmail());
			final String token = jwtTokenUtil.generateToken(userDetails, confeiteiro.getCodConfeiteiro());
			return ResponseEntity.ok(new JWTResponse(token));
		}else {
			return ResponseEntity.badRequest().build();
		}

	}

}