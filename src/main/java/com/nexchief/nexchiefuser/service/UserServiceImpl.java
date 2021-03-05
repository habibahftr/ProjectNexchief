package com.nexchief.nexchiefuser.service;

import com.nexchief.nexchiefuser.model.User;
import com.nexchief.nexchiefuser.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.UUID;

@Service("UserService")
public class UserServiceImpl implements UserService{
    @Autowired
    UserRepository userRepository;

    @Override
    public List<User> findAll() {
        return userRepository.findAll();
    }

    @Override
    public User findbyEmail(String email) {
        return userRepository.findbyEmail(email);
    }

    @Override
    public User findByusername(String username) {
        return userRepository.findByusername(username);
    }

    @Override
    public User findByPhone(String phone) {
        return userRepository.findByPhone(phone);
    }

    @Override
    public User login(String username, String password) {
        return userRepository.login(username, password);
    }

    @Override
    public void saveuser(User user) {
        UUID userId = UUID.randomUUID();
        user.setId(userId.toString());
        synchronized (this){
            userRepository.saveuser(user);
        }

    }

    @Override
    public void update(User user) {
        synchronized (this){
            userRepository.update(user);
        }
    }

    @Override
    public boolean isUserExist(User user) {
        return userRepository.findByusername(user.getUsername()) != null;
    }

    @Override
    public boolean isEmailExist(User user) {
        return userRepository.findbyEmail(user.getEmail())!= null;
    }

    @Override
    public boolean isPhoneExist(User user) {
        return userRepository.findByPhone(user.getPhone())!= null;
    }

    @Override
    public boolean emptyValidation(User user) {
        if (user.getUsername().isBlank())
        {
            return false;
        }
        else if (user.getName().isBlank())
        {
            return false;
        }
        else if(user.getPhone().isBlank())
        {
            return false;
        }
        else if (user.getEmail().isBlank())
        {
            return false;
        }
        else if(user.getPassword().isBlank())
        {
            return false;
        }
        return true;
    }
}
