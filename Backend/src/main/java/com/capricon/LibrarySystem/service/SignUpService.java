package com.capricon.LibrarySystem.service;

import com.capricon.LibrarySystem.model.User;
import com.capricon.LibrarySystem.repo.AuthRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class SignUpService {

    @Autowired
    private PasswordEncoder passwordEncoder;

    private AuthRepo repo;

    public SignUpService(AuthRepo repo) {
        this.repo = repo;
    }

    public User register(User user) {
        user.setPassword(passwordEncoder.encode(user.getPassword()));
        return repo.save(user);
    }

}
