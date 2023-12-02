package com.FornecTech.fornecedores.model;


import jakarta.persistence.*;
import lombok.Data;

@Data
@Entity
@Table(name = "fornecedores")
public class Fornecedores {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Integer id;
    @Basic(optional = false)
    @Column(name = "nome")
    private String nome;
    @Column(name = "endereco")
    private String endereco;
    @Column(name = "contato")
    private String contato;
    @Column(name = "categoria_prod")
    private String  categoria_prod;
    @Column(name = "foto")
    private String foto;
}
