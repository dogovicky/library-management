package com.capricon.LibrarySystem.service;

import com.capricon.LibrarySystem.dto.BookRequest;
import com.capricon.LibrarySystem.model.Author;
import com.capricon.LibrarySystem.model.Book;
import com.capricon.LibrarySystem.model.Department;
import com.capricon.LibrarySystem.repo.AuthorRepo;
import com.capricon.LibrarySystem.repo.BooksRepo;
import com.capricon.LibrarySystem.repo.DepartmentRepo;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class BooksService {

    private BooksRepo booksRepo;
    private DepartmentRepo departmentRepo;
    private AuthorRepo authorRepo;

    public BooksService(BooksRepo booksRepo, DepartmentRepo departmentRepo, AuthorRepo authorRepo) {
        this.booksRepo = booksRepo;
        this.departmentRepo = departmentRepo;
        this.authorRepo = authorRepo;
    }

    public Page<Book> getBooks(int page, int size, String sortBy, String sortOrder, String department_id) {
        Department department = new Department();
        department.setDepartment_id(department_id);

        Pageable pageable = PageRequest.of(page, size,
                sortOrder.equalsIgnoreCase("asc") ? Sort.by(sortBy).ascending() : Sort.by(sortBy).descending());

        return booksRepo.findByDepartment(pageable, department);

    }

    public Optional<Department> findDepartmentById(String department_id) {
        return departmentRepo.findById(department_id);
    }

    public Book saveBook(BookRequest bookRequest) {
        try {
            Department department = findDepartmentById(bookRequest.getDepartmentId())
                    .orElseThrow(() -> new RuntimeException("Department not found"));

            String bookId = generateBookId(department.getDepartment_id());

            Book book = new Book();
            book.setBookId(bookId);
            book.setBookTitle(bookRequest.getBookTitle());
            book.setDepartment(department);

            //Convert list of author names to author objects
            List<Author> authors = bookRequest.getAuthors().stream()
                    .map(name -> authorRepo.findByAuthorName(name)
                            .orElseGet(() -> {
                                Author author = new Author();
                                author.setAuthorName(name);
                                return authorRepo.save(author);
                            })).toList();

            //set authors and save book
            book.setAuthors(authors);
            return  booksRepo.save(book);
        } catch (Exception ex) {
            System.out.println(ex.getMessage());
        }
        return null;
    }

    private String generateBookId(String department_id) {
        //Find the latest book id in this department
        String lastBookId = booksRepo.findLastBookIdByDepartment(department_id);

        //Extract the last used number e.g "BK001-101" -> 001
        int nextNumber = 1;
        if (lastBookId != null) {
            String lastNumberStr = lastBookId.substring(2, 5);
            nextNumber = Integer.parseInt(lastNumberStr) + 1;
        }

        //format and return the new id
        return String.format("BK%03d-%s", nextNumber, department_id);
    }

}
