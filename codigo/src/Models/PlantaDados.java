/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package Models;

import java.time.LocalDate;

/**
 *
 * @author aluno
 */
public class PlantaDados {
    private String nomePlanta;
    private int lote;
    private LocalDate data;
    
        public PlantaDados(String nome, int local, LocalDate data){
        this.nomePlanta = nome;
        this.lote=local;
        this.data = data;    
}
 public String getNome(){ return nomePlanta;}
 public int getLote(){return lote;}
 public LocalDate getData(){ return data;}
    
    
}
 
