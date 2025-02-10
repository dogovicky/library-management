package com.capricon.LibrarySystem.controller;


import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class HomeController {

    @GetMapping("/Home/AdminDashboard")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<?> adminHomePage() {

        return ResponseEntity.ok("Welcome Admin");
    }

    @GetMapping("/Home/LibrarianDashboard")
    @PreAuthorize("hasAnyRole('ADMIN', 'LIBRARIAN')")
    public ResponseEntity<?> librarianHomePage() {
        return ResponseEntity.ok("Welcome.");
    }

    @GetMapping("/Home/StudentDashboard")
    @PreAuthorize("hasRole('STUDENT')")
    public ResponseEntity<?> studentHomePage() {
        return ResponseEntity.ok("Welcome. This is your Student Dashboard");
    }

}
