package com.capricon.LibrarySystem.dto;

import org.springframework.stereotype.Component;

import java.io.Serializable;
import java.util.List;

@Component
public class BookRequest implements Serializable {

    private String bookTitle;
    private String departmentId;
    private List<String> authors;


    public String getBookTitle() {
        return bookTitle;
    }

    public void setBookTitle(String bookTitle) {
        this.bookTitle = bookTitle;
    }

    public String getDepartmentId() {
        return departmentId;
    }

    public void setDepartmentId(String departmentId) {
        this.departmentId = departmentId;
    }

    public List<String> getAuthors() {
        return authors;
    }

    public void setAuthors(List<String> authors) {
        this.authors = authors;
    }
}
