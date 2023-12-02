package com.FornecTech.fornecedores.Service;

import com.google.api.client.googleapis.json.GoogleJsonResponseException;
import com.google.api.client.http.FileContent;
import com.google.api.client.http.HttpRequestInitializer;
import com.google.api.client.http.javanet.NetHttpTransport;
import com.google.api.client.json.gson.GsonFactory;
import com.google.api.services.drive.Drive;
import com.google.api.services.drive.DriveScopes;
import com.google.api.services.drive.model.File;
import com.google.auth.http.HttpCredentialsAdapter;
import com.google.auth.oauth2.GoogleCredentials;
import org.springframework.web.multipart.MultipartFile;

import java.io.FileInputStream;
import java.io.IOException;
import java.util.Arrays;
import java.util.Collections;


public class googleDriveUploader {
    public static String uploadFile(MultipartFile file) throws IOException {
        // Carregar credenciais do arquivo JSON
        GoogleCredentials credentials = GoogleCredentials.fromStream(
                        new FileInputStream("src/main/java/com/FornecTech/fornecedores/assets/fornectech-9cf6a2285661.json"))
                .createScoped(Arrays.asList(DriveScopes.DRIVE_FILE));
        HttpRequestInitializer requestInitializer = new HttpCredentialsAdapter(credentials);

        // Construir o cliente da API do Google Drive
        Drive service = new Drive.Builder(new NetHttpTransport(),
                GsonFactory.getDefaultInstance(),
                requestInitializer)
                .setApplicationName("FornecTech")
                .build();

        // Upload da foto
        File fileMetadata = new File();
        fileMetadata.setName("photo.jpg");
        fileMetadata.setParents(Collections.singletonList("17lP1IKyiIdPKNYqxJByMwzdg7UpEusTO"));

        java.io.File filePath = convertMultiPartToFile(file);
        FileContent mediaContent = new FileContent("image/jpeg", filePath);

        try {
            File uploadedFile = service.files().create(fileMetadata, mediaContent)
                    .setFields("id")
                    .execute();
            System.out.println("File ID: " + uploadedFile.getId());
            return uploadedFile.getId();
        } catch (GoogleJsonResponseException e) {
            System.err.println("Unable to upload file: " + e.getDetails());
            throw e;
        }
    }
    private static java.io.File convertMultiPartToFile(MultipartFile file) throws IOException {
        java.io.File convFile = new java.io.File(file.getOriginalFilename());
        file.transferTo(convFile);
        return convFile;
    }
}
