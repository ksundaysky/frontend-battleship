package com.wkbp.frontendbattleship.models;

/**
 * User Data Transfer Object for User entity
 *
 * @author Patryk Kucharski
 */
public class UserDTO {

    private String email;
    private String password;

    public UserDTO(String email, String password) {
        this.email = email;
        this.password = password;
    }

    public String getEmail() {
        return email;
    }

    public String getPassword() {
        return password;
    }

}
