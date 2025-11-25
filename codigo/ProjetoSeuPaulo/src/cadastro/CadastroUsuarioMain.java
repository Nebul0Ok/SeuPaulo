package cadastro;

import Models.UsuarioDados;

/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */

/**
 *Classe responsável por realizar o cadastro de usuários no sistema.
 * @author aluno
 */
public class CadastroUsuarioMain {
     /**
     * Cadastra um novo usuário validando nome, e-mail e senha.
     * Exibe mensagem do resultado no console.
     * @param nomeUsuario nome do usuário(não pode ser vazio).
     * @param password senha do usuário(deve seguir reuiqisitos mínimos).
     * @param email endereço de e-mail do usuario (deve ter o formato válido).
     * @return objeto UsuarioDados contendo as informações do usuário cadastrado.
     * @throws IllegalArgumentException caso algum dado seja inválido.
     */
    public  UsuarioDados cadastrarUsuario(String nomeUsuario,String email, String password){
        
        //valida se o nome foi informado.
        if(nomeUsuario == null || nomeUsuario.isBlank()){
            throw new IllegalArgumentException("Nome do Usuario não pode estar vazio.");
        }
        
        //valida se o e-mail foi informado;
        if(email== null || email.isBlank() ){
            throw new IllegalArgumentException("Email não pode estar vazio");
        }
        
        //valida se o e-mail possui um formato válido.
        if(!email.matches("^[\\w._%+-]+@[\\w.-]+\\.[a-zA-Z]{2,}$")){
            throw new IllegalArgumentException("Email invalido");
        }
        
        //valida se a senha foi informada.
        if( password== null || password.isBlank()){
            throw new IllegalArgumentException("Senha não pode esta vazia");
        }
        
        //valida se a senha atende aos requisitos mínimos de segurança.
        if (!password.matches("^(?=.*[A-Z])(?=.*[a-z])(?=.*\\d)(?=.*[^a-zA-Z0-9]).{8,}$")){
            throw new IllegalArgumentException("A senha deve conter ao menos 8 caracteres, incluindo letra maiúscula, minúscula, número e caractere especial");
        }
        
        //exibe uma mensagem de sucesso no console caso passe por toda validação.
        System.out.println("Usuario cadastrado(a) com sucesso: "+ nomeUsuario);
        
        //cria um novo objeto com os dados validos.
        return  new UsuarioDados(nomeUsuario, email, password);
        
    }
}
