/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Main.java to edit this template
 */
package cadastro;

import Models.PlantaDados;
import java.time.LocalDate;

/**
 * Implementa a classe Calculadora do projeto XYZ
 * @author CHURRUMINO
 * @version 1.0.0
 */

public class CadastroPlantaMain {

    /**
     * Cadastra uma nova planta com nome, lote e data informados.
     * Exibe mensagem do resultado no console.
     * @param nomePlanta nome da planta.
     * @param lote número do lote aonde.
     * @param data data do cadastro.
     * @return objeto PlantaDados contendo as informações da planta cadastrada.
     */
    public  PlantaDados cadastrarPlanta(String nomePlanta, int lote, LocalDate data){
        PlantaDados planta = new PlantaDados(nomePlanta, lote, data);
        LocalDate hoje = LocalDate.now();
        
        if(nomePlanta == null || nomePlanta.isBlank()){
            throw new IllegalArgumentException("Nome da planta não pode estar vazio.");
        }
        if(lote <= 0 ){
            throw new IllegalArgumentException("Lote não pode estar vazio");
        }
        if(data == null){
            throw new IllegalArgumentException("Data não pode esta vazia");
        }
        if (data.isAfter(hoje)){
            throw new IllegalArgumentException("Data informada não pode ser maior que a data atual");
        };
        System.out.println("Planta cadastrada com sucesso: "+ nomePlanta);
        
        return  planta;
        
    }


}
