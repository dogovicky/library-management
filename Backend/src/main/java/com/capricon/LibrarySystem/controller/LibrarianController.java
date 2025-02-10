package com.capricon.LibrarySystem.controller;

import com.capricon.LibrarySystem.model.Department;
import com.capricon.LibrarySystem.service.LibrarianService;
import org.springframework.data.domain.Page;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@PreAuthorize("hasRole('LIBRARIAN')")
public class LibrarianController {

    private LibrarianService libService;

    public LibrarianController(LibrarianService libService) {
        this.libService = libService;
    }

    @GetMapping("/departments")
    public ResponseEntity<Page<Department>> getDepartments(
            @RequestParam(defaultValue = "0") int page, //default page to 0
            @RequestParam(defaultValue = "10") int size, //Default page size
            @RequestParam(defaultValue = "departmentName") String sortBy, //sort by name
            @RequestParam(defaultValue = "asc") String sortOrder //sort in ascending order
    ) {
        Page<Department> departments = libService.getAllDepartments(page, size, sortBy, sortOrder);
        return ResponseEntity.ok(departments);
    }

    @GetMapping("/departments/search")
    public ResponseEntity<?> searchDepartment(@RequestParam String searchTerm,
                                              @RequestParam(defaultValue = "0") int page, //default page to 0
                                              @RequestParam(defaultValue = "10") int size, //Default page size
                                              @RequestParam(defaultValue = "departmentName") String sortBy, //sort by name
                                              @RequestParam(defaultValue = "asc") String sortOrder) {
        Page<Department> departments = libService.searchDepartment(searchTerm, page, size, sortBy, sortOrder);
        return ResponseEntity.ok(departments);
    }

}
