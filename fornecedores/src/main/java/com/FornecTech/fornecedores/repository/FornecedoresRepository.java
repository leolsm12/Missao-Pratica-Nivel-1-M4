package com.FornecTech.fornecedores.repository;

import com.FornecTech.fornecedores.model.Fornecedores;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;


@Repository
public interface FornecedoresRepository extends JpaRepository<Fornecedores, Integer> {

}
