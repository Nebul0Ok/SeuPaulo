/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package Teste;

import Models.UsuarioDados;
import cadastro.CadastroUsuarioMain;
import org.junit.Test;
import static org.junit.Assert.*;

/**
 *Classe de testes para a funcionalidade de cadastro de usuários.
 * @author aluno
 */
public class CadastroUsuarioTest {
    CadastroUsuarioMain cadastro= new CadastroUsuarioMain();
    
    /**
    *Testa o cadastro de usuário com dados válidos.
    */
    @Test
    public void cadUsuarioSucesso(){   
    UsuarioDados usuarioCadastrado = cadastro.cadastrarUsuario(
            "Cornovaldo",
            "usuario@exemplo.com",
            "Abc-12345!@"
            );
    assertNotNull(usuarioCadastrado);
    assertEquals("Cornovaldo",usuarioCadastrado.getNomeUsuario());
    assertEquals("usuario@exemplo.com",usuarioCadastrado.getEmail());
    assertEquals("Abc-12345!@",usuarioCadastrado.getPassword()); 
    }
    
    /**
    *Verifica se ocorre erro quando o nome está vazio.
    */
    @Test (expected = IllegalArgumentException.class)
    public void cadUsuarioNomeVazio(){
        cadastro.cadastrarUsuario(
            "",
            "usuario@exemplo.com",
            "Abc-12345!@"
            );   
    }
   
    /**
    *Verifica se ocorre erro quando o e-mail está vazio.
    */    
    @Test (expected = IllegalArgumentException.class)
    public void cadUsuarioEmailVazio(){
        cadastro.cadastrarUsuario(
            "Cornovaldo",
            "",
            "Abc-12345!@"
            );  
    }

    /**
    *Verifica se ocorre erro quando a senha está vazia.
    */     
    @Test (expected = IllegalArgumentException.class)
        public void cadUsuarioPasswordVazio(){
            cadastro.cadastrarUsuario(
                "Cornovaldo",
                "usuario@exemplo.com",
                ""
                );  
        }
    
    /**
    *Verifica se ocorre erro quando o e-mail tem formato inválido(sem @ ou dominio).
    */    
    @Test(expected = IllegalArgumentException.class)
    public void cadUsuarioEmailInvalido(){
        cadastro.cadastrarUsuario(
                "Cornovaldo",
                "usuarioexemplo.com",
                "Abc-12345!@"
                );  
    }

    /**
    *Verifica se ocorre erro quando a senha não segue os requisitos mínimos.
    */     
    @Test(expected = IllegalArgumentException.class)
    public void cadUsuarioSenhaIncorreta(){
        cadastro.cadastrarUsuario(
                "Cornovaldo",
                "usuario@exemplo.com",
                "Abc123"
                );  
    }    
}

