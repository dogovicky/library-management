package com.capricon.LibrarySystem.repo;

//Responsible for handling database interactions that the admin carries out

import com.capricon.LibrarySystem.model.Role;
import com.capricon.LibrarySystem.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;


@Repository
public interface AdminRepo extends JpaRepository<User, String> {

    List<User> findByRole(Role role);

    User findUserByEmail(String email);
}
