package com.nexchief.nexchiefuser.service;

import com.nexchief.nexchiefuser.model.User;

import java.util.List;

public interface UserService {
    List<User> findAll();
    User findbyEmail(String email);
    User findByusername(String username);
    User findByPhone (String phone);
    User login(String username, String password);
    void saveuser(User user);
    void update(User user);
    boolean isUserExist(User user);
    boolean isEmailExist(User user);
    boolean isPhoneExist(User user);
    boolean emptyValidation(User user);

}
