package br.senai.sp.api.utils;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;

import br.senai.sp.api.model.Cliente;

public class ConverterData {
	
	public static String dataBanco(String dtNasc) {
		
		SimpleDateFormat sd = new SimpleDateFormat("dd/MM/yyyy");
		
		try {
			
			Date data1 = sd.parse(dtNasc);
			
			sd.applyPattern("yyyy-MM-dd");
				
			return sd.format(data1);
			
		} catch (ParseException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
			
			return null;
		}
		
	}
	
	
public static String dataBrasileiro(String dtNasc) {
		
		SimpleDateFormat sd = new SimpleDateFormat("yyyy-MM-dd");
		
		try {
			
			Date data1 = sd.parse(dtNasc);
			
			sd.applyPattern("dd-MM-yyyy");
				
			return sd.format(data1);
			
		} catch (ParseException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
			
			return null;
		}
		
	}

}
