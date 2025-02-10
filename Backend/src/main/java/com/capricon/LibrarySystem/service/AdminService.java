package com.capricon.LibrarySystem.service;


import com.capricon.LibrarySystem.model.Role;
import com.capricon.LibrarySystem.model.User;
import com.capricon.LibrarySystem.repo.AdminRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Set;

//Responsible for providing services to AdminController
@Service
public class AdminService {

    private AdminRepo repo;
    @Autowired
    private RedisTemplate<String, Object> redisTemplate;

    @Autowired
    private PasswordEncoder passwordEncoder;

    public AdminService(AdminRepo repo) {
        this.repo = repo;
    }

    //@Cacheable(value = "users", key = "#roleName")
    public List<User> getUsers(Role role) {
        return repo.findByRole(role);
    }

   // @Cacheable(value = "userDetails", key = "#email")
    public User getUserById(String email) {
        return repo.findUserByEmail(email);
    }

   // @CacheEvict(value = {"userDetails", "users"}, allEntries = true)
    public void deleteUser(String email) {
        repo.deleteById(email);
        //redisTemplate.delete("users");
    }

    public User addUser(User user) {
        user.setPassword(passwordEncoder.encode(user.getPassword()));
        User newUser = repo.save(user);
        return newUser;
    }

}
