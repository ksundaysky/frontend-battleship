package com.wkbp.frontendbattleship.controllers;

import org.testng.annotations.Test;

/**
 * @author Wiktor Rup
 */
public class AuthenticationControllerTest {

    private AuthenticationController authenticationController = new AuthenticationController();

    @Test
    public void testLogin() {
        assert authenticationController.login().equals("login") : "login string should be returned";
    }
}