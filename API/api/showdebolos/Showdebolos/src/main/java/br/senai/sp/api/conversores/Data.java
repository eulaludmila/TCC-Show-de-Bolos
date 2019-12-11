package br.senai.sp.api.conversores;

import java.text.SimpleDateFormat;
import java.util.Date;

public class Data {
	
	public static String getDataBanco(String data) {
		
		System.out.println("data inserida" + data);
		
		SimpleDateFormat df = new SimpleDateFormat("yyyy-MM-dd");
		
		System.out.println("data formatada" + df.format(data));
		return df.format(data);
	}
	
	public static String getDataBrasil(Date data) {
		SimpleDateFormat df = new SimpleDateFormat("dd/MM/yyyy");
		return df.format(data);
	}
	
	public static String getDataHoraBanco() {
		Date hoje = new Date();
		SimpleDateFormat df = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
		return df.format(hoje);
	}
	
	public static String getDataHoraBrasil(Date data) {
		SimpleDateFormat df = new SimpleDateFormat("dd/MM/yyyy HH:mm:ss");
		return df.format(data);
	}

}
