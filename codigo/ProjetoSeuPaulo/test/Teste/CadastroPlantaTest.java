package Teste;
/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/UnitTests/JUnit5TestClass.java to edit this template
 */


import Models.PlantaDados;
import cadastro.CadastroPlantaMain;
import java.time.LocalDate;
import org.junit.Test;
import static org.junit.Assert.*;


/**
 *Classe de testes para a funcionalide de cadastro de plantas.
 * @author aluno
 */

public class CadastroPlantaTest {
    CadastroPlantaMain cadastro = new CadastroPlantaMain();
    
    /**
    *Testa o cadastro de planta com dados válidos
    */
    @Test
    public void cadPlantaSucesso(){   
    String nomePlanta = "Cenoura"; 
    int lote = 5;
    LocalDate data = LocalDate.of(2025,11,06);
    
    PlantaDados plantaCadastrada = cadastro.cadastrarPlanta(nomePlanta,lote,data);
       
    assertEquals(nomePlanta,plantaCadastrada.getNome());
    assertEquals(lote,plantaCadastrada.getLote());
    assertEquals(data,plantaCadastrada.getData()); 
    }
    
    
    /**
    *Verifica se ocorre erro quando o nome da planta está vázio.
    */    
    @Test (expected = IllegalArgumentException.class)
    public void cadPlantaNomeVazio(){
        cadastro.cadastrarPlanta(
            "",
            5,
            LocalDate.of(2025,11,06)
        );
    }
    
    /**
    *Verifica se occore erro quando o lote é zero ou inválido.
    */    
    @Test (expected = IllegalArgumentException.class)
    public void cadPlantaLoteVazioOuZero(){
        cadastro.cadastrarPlanta(
            "Batata",
            0,
            LocalDate.of(2025,11,06)
        );
    }
    
    /**
    *Verifica se occore erro quando a data está ausente(null).
    */
    @Test (expected = IllegalArgumentException.class)
    public void cadPlantaDataVazia(){
        cadastro.cadastrarPlanta(
            "Alface",
            7,
            null
        );
    }
    
    /**
    *Verifica se ocorre erro quando a data informada é futura.
    */
    @Test (expected = IllegalArgumentException.class)
    public void cadPlantaDataFutura(){
        cadastro.cadastrarPlanta(
            "Espinafre", 
            8,
            LocalDate.now().plusDays(1)
        );
    }
    
}
