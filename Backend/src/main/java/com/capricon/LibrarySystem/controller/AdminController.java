package com.capricon.LibrarySystem.controller;

import com.capricon.LibrarySystem.model.Role;
import com.capricon.LibrarySystem.model.User;
import com.capricon.LibrarySystem.service.AdminService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

//Responsible for managing all operations that can be carried out by the admin
@RestController
@PreAuthorize("hasRole('ADMIN')")
public class AdminController {

    private AdminService service;

    public AdminController(AdminService service) {
        this.service = service;
    }

    @GetMapping("/users")
    public ResponseEntity<?> getAllUsers() {
        //Return all users being managed by the Admin, that is Librarians
        List<User> users = service.getUsers(Role.LIBRARIAN);
        return ResponseEntity.ok(users);
    }

    @GetMapping("/users/{email}")
    public ResponseEntity<?> getUserById(@PathVariable String email) {
        User user = service.getUserById(email);
        return ResponseEntity.ok(user);
    }

    @DeleteMapping("/users/{email}")
    public ResponseEntity<?> deleteUser(@PathVariable String email) {
        service.deleteUser(email);
        return ResponseEntity.status(HttpStatus.OK).body("User successfully deleted");
    }

    @PostMapping("/users/add-new-user")
    public ResponseEntity<?> addUser(@RequestBody User user) {
        User newUser = service.addUser(user);
        return ResponseEntity.status(HttpStatus.CREATED).body(newUser);
    }

}
