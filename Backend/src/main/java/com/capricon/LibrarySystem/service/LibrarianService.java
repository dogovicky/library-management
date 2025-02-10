package com.capricon.LibrarySystem.service;


import com.capricon.LibrarySystem.model.Department;
import com.capricon.LibrarySystem.repo.DepartmentRepo;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;


@Service
public class LibrarianService {

    private DepartmentRepo depRepo;

    public LibrarianService(DepartmentRepo depRepo) {
        this.depRepo = depRepo;
    }

    public Page<Department> getAllDepartments(int page, int size, String sortBy, String sortOrder) {
        Pageable pageable = PageRequest.of(page, size,
                sortOrder.equalsIgnoreCase("asc") ? Sort.by(sortBy).ascending() : Sort.by(sortBy).descending());
        return depRepo.findAllWithBooks(pageable);
    }

    public Page<Department> searchDepartment(String searchTerm, int page, int size, String sortBY, String sortOrder) {
        Pageable pageable = PageRequest.of(page, size,
                sortOrder.equalsIgnoreCase("asc") ? Sort.by(sortBY).ascending() : Sort.by(sortBY).descending());
        return depRepo.searchDepartments(searchTerm, pageable);
    }

}
