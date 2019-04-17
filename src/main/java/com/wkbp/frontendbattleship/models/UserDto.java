package com.wkbp.frontendbattleship.models;

/**
 * @author Patryk Kucharski
 */
public class UserDto {

    private String email;
    private String password;

    public UserDto(){}

    public UserDto(String email, String password) {
        this.email = email;
        this.password = password;
    }

    public String getEmail() {
        return email;
    }

    public String getPassword() {
        return password;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public void setPassword(String password) {
        this.password = password;
    }
}
