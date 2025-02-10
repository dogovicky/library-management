package com.capricon.LibrarySystem.controller;

import com.capricon.LibrarySystem.dto.BookRequest;
import com.capricon.LibrarySystem.model.Book;
import com.capricon.LibrarySystem.model.Department;
import com.capricon.LibrarySystem.service.BooksService;
import org.springframework.data.domain.Page;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

@RestController
@PreAuthorize("hasRole('LIBRARIAN')")
public class BooksController {

    private BooksService booksService;

    public BooksController(BooksService booksService) {
        this.booksService = booksService;
    }

    @GetMapping("/departments/{department_id}")
    public ResponseEntity<?> getBooks(@PathVariable String department_id,
                                      @RequestParam(defaultValue = "0") int page,
                                      @RequestParam(defaultValue = "15")int size,
                                      @RequestParam(defaultValue = "bookTitle") String sortBy,
                                      @RequestParam(defaultValue = "asc") String sortOrder) {

        Page<Book> books = booksService.getBooks(page, size, sortBy, sortOrder, department_id);
        return ResponseEntity.ok(books);
    }

    @PostMapping("/departments/{department_id}/add-new-book")
    public ResponseEntity<?> addNewBook(@RequestBody BookRequest bookRequest) {
        return ResponseEntity.ok(booksService.saveBook(bookRequest));
    }



}
