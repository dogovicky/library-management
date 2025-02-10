package com.capricon.LibrarySystem.repo;

import com.capricon.LibrarySystem.model.Book;
import com.capricon.LibrarySystem.model.Department;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface BooksRepo extends JpaRepository<Book, String> {

    Page<Book> findByDepartment(Pageable pageable, Department department);

    @Query("SELECT b.bookId FROM Book b WHERE b.department.department_id = :department_id ORDER BY b.bookId DESC LIMIT 1")
    String findLastBookIdByDepartment(@Param("department_id") String department_id);
}
