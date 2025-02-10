package com.capricon.LibrarySystem.repo;

import com.capricon.LibrarySystem.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface LibrarianRepo extends JpaRepository<User, String> {
}
