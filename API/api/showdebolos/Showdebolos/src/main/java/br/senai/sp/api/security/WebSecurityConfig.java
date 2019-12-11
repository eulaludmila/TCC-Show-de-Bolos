package br.senai.sp.api.security;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.method.configuration.EnableGlobalMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

@Configuration
@EnableWebSecurity
@EnableGlobalMethodSecurity(prePostEnabled = true)
public class WebSecurityConfig extends WebSecurityConfigurerAdapter {

	@Autowired
	private JWTAuthenticationEntryPoint jwtAuthenticationEntryPoint;

	@Autowired
	private JWTUserDetailsService jwtUserDetailsService;

	@Autowired
	private JWTRequestFilter jwtRequestFilter;

	@Autowired
	public void configureGlobal(AuthenticationManagerBuilder auth) throws Exception {
		auth.userDetailsService(jwtUserDetailsService).passwordEncoder(passwordEncoder());
	}

	@Bean
	public PasswordEncoder passwordEncoder() {
		return new BCryptPasswordEncoder();
	}

	@Bean
	@Override
	public AuthenticationManager authenticationManagerBean() throws Exception {
		return super.authenticationManagerBean();
	}

	@Override
	protected void configure(HttpSecurity httpSecurity) throws Exception {
		httpSecurity.csrf().disable()
				// Não cheque essas requisições
				.authorizeRequests()
				.antMatchers(HttpMethod.GET, "/confeiteiro"
						, "/confeiteiro/cpf/{cpf}"
						, "/confeiteiro/email/{email}"
						, "/cliente/cpf/{cpf}"
						, "/cliente/email/{email}"
						, "/produto"
						, "/produto/categoria/{codCategoria}"
						, "/produto/confeiteiro/{codConfeiteiro}"
						,"/produto/{codProduto}"
						, "/produto/melhoravaliados/{codConfeiteiro}"
						, "/produto/melhoravaliados/{codConfeiteiro}/limit/4"
						, "/produto/menorpreco/{codConfeiteiro}"
						,"/produto/menorpreco/{codConfeiteiro}/limit/4"
						, "/confeiteiroDTO/avaliacao"
						, "/confeiteiroDTO"
						, "/confeiteiroDTO/{codConfeiteiro}"
						, "/confeiteiroDTO/avaliacao/confeiteiros"
						, "/confeiteiroDTO/ativo"
						,"/categoria"
						, "/enderecoconfeiteiro/{codConfeiteiro}"
						,"/enderecocliente/cliente/{codCliente}"
						,"/pedido"
						,"/itemPedido").permitAll()
				.antMatchers(HttpMethod.POST, 
						"/login/cliente", 
						"/login/confeiteiro",
						"/enderecoconfeiteiro",
						"/foto/confeiteiro",
						"/foto/cliente",
						"/cliente",
						"/confeiteiro", 
						"/endereco",
						"/enderecoconfeiteiro/mobile").permitAll()
				// Qualquer outra requisição deve ser checada
				.anyRequest()
				.authenticated()
				.and().cors()
				.and().cors()
				.and().exceptionHandling()
				.authenticationEntryPoint(jwtAuthenticationEntryPoint).and().sessionManagement()
				.sessionCreationPolicy(SessionCreationPolicy.STATELESS);

		
		httpSecurity.addFilterBefore(jwtRequestFilter, UsernamePasswordAuthenticationFilter.class);
	}

}
