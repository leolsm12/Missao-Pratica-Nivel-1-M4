package com.FornecTech.fornecedores.Service;
import com.FornecTech.fornecedores.model.Fornecedores;
import com.FornecTech.fornecedores.repository.FornecedoresRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.crossstore.ChangeSetPersister;
import org.springframework.stereotype.Service;

import java.util.Optional;
@Service
public class FornecedoresService {

    @Autowired
    private FornecedoresRepository fornecedoresRepository;

    public Fornecedores salvarFornecedor(Fornecedores fornecedor) {
        return fornecedoresRepository.save(fornecedor);
    }

    public Optional<Fornecedores> buscarFornecedorPorId(Integer id) {
        return fornecedoresRepository.findById(id);
    }


}
