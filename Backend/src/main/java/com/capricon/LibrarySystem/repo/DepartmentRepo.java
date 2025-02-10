package com.capricon.LibrarySystem.repo;

import com.capricon.LibrarySystem.model.Department;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;


@Repository
public interface DepartmentRepo extends JpaRepository<Department, String> {

    @Query("SELECT d from Department d WHERE LOWER(d.departmentName) LIKE LOWER(CONCAT('%', :searchTerm, '%'))")
    Page<Department> searchDepartments(@Param("searchTerm") String searchTerm, Pageable pageable);

    @Query("SELECT d from Department d LEFT JOIN FETCH d.books")
    Page<Department> findAllWithBooks(Pageable pageable);

}
