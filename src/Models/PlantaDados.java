/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package Models;

import java.time.LocalDate;

/**
 *Representa os dados de uma planta cadastrada no sistema.
 * @author aluno
 */
public class PlantaDados {
    /** Nome da planta cadastrada*/
    private String nomePlanta;
    
    /**Número do lote aonde a planta está registrada */
    private int lote;
    
    /**Data em que a planta foi cadastrada */
    private LocalDate data;
    
    
    /**Cria um objeto PlantaDados com nome, lote e data informados.
     * @param nomePlanta nome da planta
     * @param lote número do lote da planta
     * @param data  data de cadastro da planta
     */
        public PlantaDados(String nomePlanta, int lote, LocalDate data){
        this.nomePlanta = nomePlanta;
        this.lote= lote;
        this.data = data;    
}
        
 /**@return  o nome da planta */       
 public String getNome(){ return nomePlanta;}
 
 /** @return o número da planta*/
 public int getLote(){return lote;}
 
 /** @return a data de cadastro da planta*/
 public LocalDate getData(){ return data;}
    
    
}
 
