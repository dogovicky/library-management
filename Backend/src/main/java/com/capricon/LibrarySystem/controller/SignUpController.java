package com.capricon.LibrarySystem.controller;

import com.capricon.LibrarySystem.model.User;
import com.capricon.LibrarySystem.service.SignUpService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class SignUpController {

    private SignUpService service;

    public SignUpController(SignUpService service) {
        this.service = service;
    }

    @PostMapping("/signup")
    public ResponseEntity<String> signUp(@RequestBody User newUser) {
        service.register(newUser);
        return ResponseEntity.ok("Registration Successful");
    }

}
