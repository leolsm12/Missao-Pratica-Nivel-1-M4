package com.FornecTech.fornecedores.controller;

import com.FornecTech.fornecedores.Service.googleDriveUploader;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;

@RestController
@RequestMapping("/upload")
public class GoogleController {


    @PostMapping("/file")
    public ResponseEntity<String> uploadFoto(@RequestParam("file") MultipartFile file) {
        try {
            // Lógica para processar o arquivo e fazer upload para o Google Drive
            String fileId = googleDriveUploader.uploadFile(file);

            // Você pode adicionar lógica adicional aqui, se necessário.

            return ResponseEntity.ok("Upload de foto bem-sucedido. File ID: " + fileId);
        } catch (IOException e) {
            // Tratar a exceção adequadamente
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Erro ao processar o arquivo: " + e.getMessage());
        }
    }
}
