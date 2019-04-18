package com.wkbp.frontendbattleship.controllers;

import org.junit.Before;
import org.mockito.Mockito;
import org.springframework.http.HttpStatus;
import org.springframework.ui.Model;
import org.testng.annotations.Test;

import static org.testng.Assert.*;

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