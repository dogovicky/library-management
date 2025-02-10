package com.capricon.LibrarySystem.repo;

import com.capricon.LibrarySystem.model.Author;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface AuthorRepo extends JpaRepository<Author, String> {

    Optional<Author> findByAuthorName(String name);
}
