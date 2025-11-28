/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package Models;

/**
 *Representa os dados de um usuário do sistema.
 *
 * @author aluno
 */
public class UsuarioDados {
    /**Nome do usuário */
    private String nomeUsuario;
    
    /** Endereço de e-mail do usuário*/
    private String email;
    
    /** Senha cadastrada pelo usuário*/
    private String password;
    
    /**Cria um objeto UsuarioDados com nome,e-mail e senha informados.
     * @param nomeUsuario nome do usuário
     * @param email e-mail do usuário
     * @param password senha do usuário 
     */
        public UsuarioDados(String nomeUsuario, String email, String password){
        this.nomeUsuario = nomeUsuario;
        this.email= email;
        this.password = password;    
}
 /**@return o nome do usuário */    
 public String getNomeUsuario(){ return nomeUsuario;}

/**@return o e-mail do usuário */ 
 public String getEmail(){return email;}
 
 /**@return a senha cadastrada */
 public String getPassword(){ return password;}
}
