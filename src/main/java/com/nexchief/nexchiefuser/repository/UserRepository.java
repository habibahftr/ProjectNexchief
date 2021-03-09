package com.nexchief.nexchiefuser.repository;

import com.nexchief.nexchiefuser.model.User;

import java.util.List;

public interface UserRepository {
    List<User> findAll();
    User findbyId(String id);
    User findbyEmail(String email);
    User findByusername(String username);
    User findByPhone (String phone);
    User login(String username, String password);// INI untuk login
    int saveuser(User user);
    int update(User user);
    int delete(String username);
}
