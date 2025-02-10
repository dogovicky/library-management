package com.capricon.LibrarySystem.service;

import com.capricon.LibrarySystem.model.User;
import com.capricon.LibrarySystem.repo.AuthRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.stereotype.Service;

@Service
public class LoginService {

    @Autowired
    private RedisTemplate<String, Object> redisTemplate;

    @Autowired
    private AuthRepo repo;

    @Autowired
    AuthenticationManager authManager;

    @Autowired
    JwtService jwtService;

    //@Cacheable(value = "user", key = "#email")
    public User getUserDetails(String email) {
        return repo.findByEmail(email);
    }

    public boolean findUser(String email) {
        User user = repo.findByEmail(email);
        return user != null;
    }

    public String verifyUser(User user) {
        boolean isUserAvailable = findUser(user.getEmail());
        if (isUserAvailable) {
            try {
                Authentication authentication =
                        authManager.authenticate(new UsernamePasswordAuthenticationToken(user.getEmail(), user.getPassword()));
                if (authentication.isAuthenticated()) {
                    return jwtService.generateToken(user.getEmail());
                }
            } catch (AuthenticationException ex) {
                System.out.println(ex.getMessage());
            }
        }
        return "Failed";
    }

}
