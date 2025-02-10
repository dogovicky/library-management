package com.capricon.LibrarySystem.service;

import com.capricon.LibrarySystem.model.User;
import com.capricon.LibrarySystem.model.UserPrincipal;
import com.capricon.LibrarySystem.repo.AuthRepo;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

@Service
public class MyUserDetailsService implements UserDetailsService {

    private AuthRepo repo;

    public MyUserDetailsService(AuthRepo repo) {
        this.repo = repo;
    }

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        try {
            User user = repo.findByEmail(username);
            return new UserPrincipal(user);
        } catch (UsernameNotFoundException ex) {
            System.out.println(ex.getMessage());
        }
        return null;
    }
}
