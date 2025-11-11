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
 *TESTE CLASSE
 * @author aluno
 */

public class CadastroPlantaTest {
    /**
     * TESTE CLASSE
     */
    public CadastroPlantaTest() {
    }
    CadastroPlantaMain cadastro = new CadastroPlantaMain();
    
    /**
     * TESTANDO CLASSE
     */
    @Test
    public void cadPlantaSucesso(){   
    String nomePlanta = "Cenoura"; 
    int lote = 5;
    LocalDate data = LocalDate.of(2025,11,06);
    
    PlantaDados plantaCadastrada = cadastro.cadastrarPlanta(nomePlanta,lote,data);
    
    assertNotNull(plantaCadastrada);
    assertEquals(nomePlanta,plantaCadastrada.getNome());
    assertEquals(lote,plantaCadastrada.getLote());
    assertEquals(data,plantaCadastrada.getData()); 
    }
    
    @Test (expected = IllegalArgumentException.class)
    public void cadPlantaNomeVazio(){
        String nomePlanta = ""; 
        int lote = 5;
        LocalDate data = LocalDate.of(2025,11,06);

        PlantaDados plantaCadastrada = cadastro.cadastrarPlanta(nomePlanta,lote,data);
        
        assertNotNull(plantaCadastrada);
        assertEquals("", plantaCadastrada.getNome());
    
    }
    
    
    @Test (expected = IllegalArgumentException.class)
    public void cadPlantaLoteVazioOuZero(){
        String nomePlanta = "Batata"; 
        int lote = 0;
        LocalDate data = LocalDate.of(2025,11,06);

        PlantaDados plantaCadastrada = cadastro.cadastrarPlanta(nomePlanta,lote,data);
        
        assertNotNull(plantaCadastrada);
        assertEquals(0, plantaCadastrada.getLote());
    
    }
    
    @Test (expected = IllegalArgumentException.class)
    public void cadPlantaDataVazia(){
        String nomePlanta = "Alface"; 
        int lote = 7;
        LocalDate data = null;

        PlantaDados plantaCadastrada = cadastro.cadastrarPlanta(nomePlanta,lote,data);
    
        assertNotNull(plantaCadastrada);
        assertNull(plantaCadastrada.getData());
    }
    
    @Test (expected = IllegalArgumentException.class)
    public void cadPlantaDataFutura(){
        String nomePlanta = "Espinafre"; 
        int lote = 8;
        LocalDate dataFutura = LocalDate.now().plusDays(1);

        PlantaDados plantaCadastrada = cadastro.cadastrarPlanta(nomePlanta,lote,dataFutura);
    
        assertNotNull(plantaCadastrada);   
    }
    
    
    
}
