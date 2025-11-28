/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package cadastro;

import Models.ColheitaDados;

/**
 * Classe responsável por registrar informações de colheita no sistema.
 * Segue o mesmo padrão estruturado do CadastroUsuarioMain.
 * @author ecoz
 */
public class RegistrarColheitaMain {

 /**
     * Registra uma colheita validando todos os campos.
     * Exibe mensagem do resultado no console.
     * 
     * @param idLote ID do lote colhido (deve ser maior que zero).
     * @param dataColheita data da colheita no formato dd/MM/yyyy (não pode ser vazia).
     * @param quantidade quantidade colhida (deve ser maior que zero).
     * @param responsavel nome do responsável pela colheita (não pode ser vazio).
     * @return objeto ColheitaDados contendo as informações registradas.
     * @throws IllegalArgumentException caso algum dado seja inválido.
     */
    public ColheitaDados registrarColheita(int idLote, String dataColheita, int quantidade, String responsavel) {

        // valida ID do lote
        if (idLote <= 0) {
            throw new IllegalArgumentException("ID do lote deve ser maior que zero.");
        }

        // valida data da colheita
        if (dataColheita == null || dataColheita.isBlank()) {
            throw new IllegalArgumentException("A data da colheita é obrigatória.");
        }

        // valida quantidade colhida
        if (quantidade <= 0) {
            throw new IllegalArgumentException("A quantidade colhida deve ser maior que zero.");
        }

        // valida responsável
        if (responsavel == null || responsavel.isBlank()) {
            throw new IllegalArgumentException("O responsável pela colheita deve ser informado.");
        }

        // sucesso
        System.out.println("Colheita registrada com sucesso! Lote: " + idLote);

        // retorna objeto preenchido
        return new ColheitaDados(idLote, dataColheita, quantidade, responsavel);
    }
}
