package Models;

/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */

/**
 * Model que representa os dados de uma colheita.
 * @author ecoz
 */
public class ColheitaDados {

    private int idLote;
    private String dataColheita;
    private int quantidade;
    private String responsavel;

    public ColheitaDados(int idLote, String dataColheita, int quantidade, String responsavel) {
        this.idLote = idLote;
        this.dataColheita = dataColheita;
        this.quantidade = quantidade;
        this.responsavel = responsavel;
    }

    public int getIdLote() {
        return idLote;
    }

    public String getDataColheita() {
        return dataColheita;
    }

    public int getQuantidade() {
        return quantidade;
    }

    public String getResponsavel() {
        return responsavel;
    }
}
