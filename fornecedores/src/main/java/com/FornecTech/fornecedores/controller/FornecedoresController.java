package com.FornecTech.fornecedores.controller;

import com.FornecTech.fornecedores.Service.FornecedoresService;
import com.FornecTech.fornecedores.model.Fornecedores;
import com.FornecTech.fornecedores.repository.FornecedoresRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;


import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/fornecedores")
public class FornecedoresController {

    private FornecedoresService fornecedoresService;
    
    @Autowired
    private FornecedoresRepository repository;
    public FornecedoresController(FornecedoresService fornecedoresService) {
        this.fornecedoresService = fornecedoresService;
    }

    @PostMapping("/post")
    public void postFornecedores(@RequestBody Fornecedores fornecedores) {
        repository.save(fornecedores);
    }

    @GetMapping
    public ResponseEntity<List<Fornecedores>> obterTodosFornecedores() {
        List<Fornecedores> fornecedores = repository.findAll();
        if (!fornecedores.isEmpty()) {
            return new ResponseEntity<>(fornecedores, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        }
    }

    @GetMapping("/{id}")
    public ResponseEntity<Fornecedores> obterFornecedorPorId(@PathVariable Integer id) {
        Optional<Fornecedores> fornecedorOptional = repository.findById(id);

        return fornecedorOptional.map(fornecedor -> new ResponseEntity<>(fornecedor, HttpStatus.OK))
                .orElseGet(() -> new ResponseEntity<>(HttpStatus.NOT_FOUND));
    }

    @PutMapping("/{id}")
    public ResponseEntity<Fornecedores> editarFornecedor(@PathVariable Integer id, @RequestBody Fornecedores fornecedorAtualizado) {
        Optional<Fornecedores> fornecedorOptional = repository.findById(id);

        if (fornecedorOptional.isPresent()) {
            Fornecedores fornecedorExistente = fornecedorOptional.get();
            fornecedorExistente.setNome(fornecedorAtualizado.getNome());
            fornecedorExistente.setEndereco(fornecedorAtualizado.getEndereco());
            fornecedorExistente.setContato(fornecedorAtualizado.getContato());
            fornecedorExistente.setCategoria_prod(fornecedorAtualizado.getCategoria_prod());
            fornecedorExistente.setFoto(fornecedorAtualizado.getFoto());

            Fornecedores fornecedorAtualizadoSalvo = repository.save(fornecedorExistente);
            return new ResponseEntity<>(fornecedorAtualizadoSalvo, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    // Endpoint para excluir um fornecedor
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> excluirFornecedor(@PathVariable Integer id) {
        Optional<Fornecedores> fornecedorOptional = repository.findById(id);

        if (fornecedorOptional.isPresent()) {
            repository.deleteById(id);
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }


}