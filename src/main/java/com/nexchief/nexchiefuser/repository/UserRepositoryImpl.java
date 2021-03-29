package com.nexchief.nexchiefuser.repository;

import com.nexchief.nexchiefuser.model.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository("UserRepository")
public class UserRepositoryImpl implements UserRepository{
    @Autowired
    private JdbcTemplate jdbcTemplate;

    @Override
    public List<User> findAll() {
        List<User> userList;
        try{
            userList= this.jdbcTemplate.query("SELECT * FROM user",
                    (rs, rowNum)->
                            new User(
                                    rs.getString("id"),
                                    rs.getString("name"),
                                    rs.getString("username"),
                                    rs.getString("password"),
                                    rs.getString("email"),
                                    rs.getString("phone")
                            ));
        }catch (Exception e){
            userList =null;
        }
        return userList;
    }

    @Override
    public User findbyEmail(String email) {
        User user;

        try{
            user = this.jdbcTemplate.query(
                    "SELECT * FROM user WHERE email =?",
                    preparedStatement -> preparedStatement.setString(1, email),
                    (rs, rowNum)->
                            new User (
                                    rs.getString("id"),
                                    rs.getString("name"),
                                    rs.getString("username"),
                                    rs.getString("password"),
                                    rs.getString("email"),
                                    rs.getString("phone")
                            )

            ).get(0);
        }catch (Exception e){
            user=null;
        }
        return user;
    }

    @Override
    public User findByusername(String username) {
        User user;

        try{
            user = this.jdbcTemplate.query(
                    "SELECT * FROM user WHERE username =?",
                    preparedStatement -> preparedStatement.setString(1, username),
                    (rs, rowNum)->
                            new User (
                                    rs.getString("id"),
                                    rs.getString("name"),
                                    rs.getString("username"),
                                    rs.getString("password"),
                                    rs.getString("email"),
                                    rs.getString("phone")
                            )

            ).get(0);
        }catch (Exception e){
            user=null;
        }

        return user;
    }

    @Override
    public User findByPhone(String phone) {
        User user;

        try{
            user = this.jdbcTemplate.query(
                    "SELECT * FROM user WHERE phone =?",
                    preparedStatement -> preparedStatement.setString(1, phone),
                    (rs, rowNum)->
                            new User (
                                    rs.getString("id"),
                                    rs.getString("name"),
                                    rs.getString("username"),
                                    rs.getString("password"),
                                    rs.getString("email"),
                                    rs.getString("phone")
                            )

            ).get(0);
        }catch (Exception e){
            user=null;
        }
        return user;
    }



    @Override
    public User login(String username, String password) {
        User user;

        try{
            user = this.jdbcTemplate.query(
                    "SELECT * FROM user WHERE  BINARY username=? AND BINARY  password =?",
                    preparedStatement -> {preparedStatement.setString(1, username);
                        preparedStatement.setString(2, password);},
                    (rs, rowNum)->
                            new User (
                                    rs.getString("id"),
                                    rs.getString("name"),
                                    rs.getString("username"),
                                    rs.getString("password"),
                                    rs.getString("email"),
                                    rs.getString("phone")
                            )

            ).get(0);
        }catch (Exception e){
            user=null;
        }
        return user;
    }

    @Override
    public User findbyId(String id) {
        User user;
        try{
            user=jdbcTemplate.query(
                    "SELECT * FROM user WHERE id=?",
                    preparedStatement -> preparedStatement.setString(1, id),
                    (rs, rowNum)->
                            new User(
                                    rs.getString("id"),
                                    rs.getString("name"),
                                    rs.getString("username"),
                                    rs.getString("password"),
                                    rs.getString("email"),
                                    rs.getString("phone")
                            )
            ).get(0);
        }catch (IndexOutOfBoundsException e){
            user=null;
        }
        return  user;
    }

    @Override
    public int saveuser(User user) {
        return jdbcTemplate.update(
                "INSERT INTO user(id, name, username, password, phone, email) values(?,?,?,?,?,?)",
                user.getId(), user.getName(), user.getUsername(), user.getPassword(), user.getPhone(), user.getEmail()
        );
    }

    @Override
    public int update(User user) {
        return jdbcTemplate.update(
                "UPDATE user SET password=? WHERE id=? " ,
                user.getPassword(), user.getId()
        );
    }

    @Override
    public int delete(String username) {
        return jdbcTemplate.update(
                "DELETE FROM user WHERE username=?, username"
        );
    }
}
