package com.wkbp.frontendbattleship.controllers;

import org.testng.annotations.Test;

import static org.testng.Assert.assertEquals;

/**
 * @author Wiktor Rup
 */
public class AuthenticationControllerTest {

    private AuthenticationController authenticationController = new AuthenticationController();

    @Test
    public void testLogin() {
        assertEquals(authenticationController.login(), "login");
    }
}