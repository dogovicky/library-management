package com.capricon.LibrarySystem.controller;


import com.capricon.LibrarySystem.dto.LoginResponse;
import com.capricon.LibrarySystem.model.User;
import com.capricon.LibrarySystem.service.LoginService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/auth")
public class LoginController {

    @Autowired
    private LoginService service;

    @PostMapping("/login")
    public ResponseEntity<LoginResponse> login(@RequestBody User user) {
        String token = service.verifyUser(user);
        User loggedInUser = service.getUserDetails(user.getEmail());
        LoginResponse response = new LoginResponse(loggedInUser, token);
        return ResponseEntity.ok().body(response);
    }
}
