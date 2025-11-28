/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package Teste;


import Models.ColheitaDados;
import cadastro.RegistrarColheitaMain;
import org.junit.Test;
import static org.junit.Assert.*;

/**
 *
 * @author ecoz
 */
public class ColheitaTeste {
 
    private final RegistrarColheitaMain registro = new RegistrarColheitaMain();

    /**
     * Teste de sucesso ao registrar uma colheita.
     */
    @Test
    public void registrarColheitaComSucesso() {
        ColheitaDados c = registro.registrarColheita( 10, "12/12/2024", 500, "Marcos Silva");
        assertNotNull(c);
        assertEquals(10, c.getIdLote());
        assertEquals("12/12/2024", c.getDataColheita());
        assertEquals(500, c.getQuantidade());
        assertEquals("Marcos Silva", c.getResponsavel());
    }
    /**
     *Teste do ID do lote inválido (zero ou negativo).
     */
    @Test(expected = IllegalArgumentException.class)
    public void erroIdLoteInvalido() {
        registro.registrarColheita( 0, "12/12/2024", 300, "Marcos");
    }
    /**
     * Teste da Data da colheita vazia.
     */
    @Test(expected = IllegalArgumentException.class)
    public void erroDataColheitaVazia() {
        registro.registrarColheita(10, "", 300, "Marcos");
    }
    /**
     * Teste da Quantidade menor ou igual a zero.
     */
    @Test(expected = IllegalArgumentException.class)
    public void erroQuantidadeInvalida() {
        registro.registrarColheita(10, "12/12/2024", -10, "Marcos");
    }
    /**
     *Teste do Responsável não informado.
     */
    @Test(expected = IllegalArgumentException.class)
    public void erroResponsavelVazio() {
        registro.registrarColheita(10, "12/12/2024", 200, "");
    }
}
