/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Main.java to edit this template
 */
package cadastro;

import Models.PlantaDados;
import java.time.LocalDate;

/**
 * Classe responsável por realizar o cadastro das plantas
 * @author CHURRUMINO
 * @version 1.0.0
 */

public class CadastroPlantaMain {

    /**
     * Cadastra uma nova planta com nome, lote e data informados.
     * Exibe mensagem do resultado no console.
     * @param nomePlanta nome da planta(não pode esta vazio).
     * @param lote número do lote aonde(deve ser maior que zero).
     * @param data data do cadastro(não pode ser nula ou futura).
     * @return objeto PlantaDados contendo as informações da planta cadastrada.
     * @throws IllegalArgumentException se algum dado for inválido.
     */
    public  PlantaDados cadastrarPlanta(String nomePlanta, int lote, LocalDate data){
        LocalDate hoje = LocalDate.now();
        
        //valida se o nome da planta foi informado.
        if(nomePlanta == null || nomePlanta.isBlank()){
            throw new IllegalArgumentException("Nome da planta não pode estar vazio.");
        }
        
        //valida se o lote é maior que zero.
        if(lote <= 0 ){
            throw new IllegalArgumentException("Lote não pode estar vazio");
        }
        
        //valida se a data foi informada.
        if(data == null){
            throw new IllegalArgumentException("Data não pode esta vazia");
        }
        
        //valida se a data não é futura.
        if (data.isAfter(hoje)){
            throw new IllegalArgumentException("Data informada não pode ser maior que a data atual");
        }
       
        //cria um objeto com os dados validos.
        PlantaDados planta = new PlantaDados(nomePlanta, lote, data);
        
        //se passar em todas validações exibe no consle mensagem de sucesso.
        System.out.println("Planta cadastrada com sucesso: "+ nomePlanta);
        
        //retorna o objeto criado.
        return  planta;
        
    }


}
