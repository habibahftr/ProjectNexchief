package com.nexchief.nexchiefuser.controller;


import com.nexchief.nexchiefuser.model.User;
import com.nexchief.nexchiefuser.service.UserService;
import com.nexchief.nexchiefuser.util.CustomErrorType;
import com.nexchief.nexchiefuser.util.CustomSuccessType;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataAccessException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;
import java.util.regex.Matcher;
import java.util.regex.Pattern;


@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/nexchief")
public class UserController {

    @Autowired
    UserService userService;

    @GetMapping("/users/")
    public ResponseEntity<List<User>> listAllUser(){
        List<User> userList = userService.findAll();
        if (userList.isEmpty()){
            return new ResponseEntity<>(userList, HttpStatus.NOT_FOUND);
        }
        return new ResponseEntity<>(userList, HttpStatus.OK);
    }

    @GetMapping("/user/{id}")
    public ResponseEntity<?> getUserById(@PathVariable("id") String id){
        User userFind = userService.findbyId(id);
        if(userFind== null){
            return new ResponseEntity<>(userFind, HttpStatus.NOT_FOUND);
        }
        else{
            return new ResponseEntity<>(userFind, HttpStatus.OK);
        }
    }

    @GetMapping("/login/") ///-------------------ini login----------------------------------
    public ResponseEntity<?> login(@RequestParam String username, @RequestParam String password) {

        System.out.println("Username ==>" + username);
        System.out.println("Password ==>" + password);

        User user = userService.login(username, password);

        if(user == null) {
            return new ResponseEntity<>(new CustomErrorType("Username or password is wrong!"), HttpStatus.NOT_FOUND);
        }
        return new ResponseEntity<>(user, HttpStatus.OK);
    }

    @PostMapping("/user/")
    public  ResponseEntity<?> createUser (@RequestBody User user) {
        if (user.getName().isBlank() || user.getUsername().isBlank() ||
                user.getPassword().isBlank() || user.getPhone().isBlank() || user.getEmail().isBlank()) {
            return new ResponseEntity<>("insert all data", HttpStatus.BAD_REQUEST);
        }
        else {
            Pattern p_uname = Pattern.compile("^(?=.{6,8}$)(?![_.])[a-zA-Z0-9._]+(?<![_.])$");
            Matcher m_uname = p_uname.matcher(user.getUsername());

            Pattern p_pass = Pattern.compile("^(?=.*\\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{6}$");
            Matcher m_pass = p_pass.matcher(user.getPassword());

            Pattern p_email = Pattern.compile("^[\\w-\\.]+@([\\w-]+\\.)+[\\w-]{2,4}$");
            Matcher m_email = p_email.matcher(user.getEmail());

            Pattern p_phone = Pattern.compile("^(^08)(\\d{3,4}-?){2}\\d{3,4}$");
            Matcher m_phone = p_phone.matcher(user.getPhone());

            if (m_email.matches()){
                if (m_phone.matches()){
                    if (m_uname.matches()){
                        if(m_pass.matches()){
                            try{
                                if (userService.isEmailExist(user)){
                                    return new ResponseEntity<>(new CustomErrorType("Email "+user.getEmail()+" already exist"), HttpStatus.CONFLICT);
                                }else if (userService.isUserExist(user)){
                                    return new ResponseEntity<>(new CustomErrorType("Username "+user.getUsername()+" already exist"), HttpStatus.CONFLICT);
                                }else if (userService.isPhoneExist(user)){
                                    return new ResponseEntity<>(new CustomErrorType("Phone Number "+user.getPhone()+" already exist"), HttpStatus.CONFLICT);
                                }
                                else{
                                    userService.saveuser(user);
                                    return new ResponseEntity<>(new CustomSuccessType("New user successfully created"), HttpStatus.CREATED);
                                }
                            }catch (Exception e){
                                e.printStackTrace();
                                return new ResponseEntity<>(new CustomErrorType("Failed create user"), HttpStatus.BAD_REQUEST);
                            }
                        }else{
                            return new ResponseEntity<>(new CustomErrorType("Password must be 6 in alphanumeric and at least 1 uppercase letter")
                                    , HttpStatus.BAD_REQUEST);
                        }
                    }else {
                        return new ResponseEntity<>(new CustomErrorType("Username must be 6 to 8 in alphanumeric and without any symbol")
                                , HttpStatus.BAD_REQUEST);
                    }
                }else {
                    return new ResponseEntity<>(new CustomErrorType("Phone number must in Indonesia type (ex:08134455555)")
                            , HttpStatus.BAD_REQUEST);
                }
            }else {
                return new ResponseEntity<>(new CustomErrorType("email get wrong. ex (xxx@xxx.)")
                        , HttpStatus.BAD_REQUEST);
            }

        }
    }

    @PutMapping("/changePass/{id}")
    public ResponseEntity<?> updateData (@PathVariable("id") String id, @RequestBody User user){
        if(user.getPassword().isBlank()){
            return new ResponseEntity<>(new CustomErrorType("Insert all data!"), HttpStatus.BAD_REQUEST);
        }else{
            try{
                User finduser = userService.findbyId(id);
                if (finduser != null){
                    if (Pattern.matches("^(?=.*\\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[aA-zZ]).{6}$", user.getPassword())){
                        user.setId(finduser.getId());
                        userService.update(user);
                        return new ResponseEntity<>(new CustomSuccessType("Update success!"), HttpStatus.CREATED);
                    }else{
                        return new ResponseEntity<>(new CustomErrorType("Password must be 6 in alphanumeric and at least 1 uppercase letter"), HttpStatus.BAD_REQUEST);
                    }
                }else{
                    return new ResponseEntity<>(new CustomErrorType("User with username "+user.getUsername()+" not found"), HttpStatus.NOT_FOUND);
                }
            }catch (DataAccessException e){
                e.printStackTrace();
                return new ResponseEntity<>(new CustomErrorType("Update failed"), HttpStatus.EXPECTATION_FAILED);
            }

        }
    }






}
