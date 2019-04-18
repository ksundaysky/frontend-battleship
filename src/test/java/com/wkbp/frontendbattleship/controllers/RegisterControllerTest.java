package com.wkbp.frontendbattleship.controllers;

import org.testng.annotations.Test;

import static org.testng.Assert.assertEquals;

/**
 * @author Wiktor Rup
 */
public class RegisterControllerTest {

    @Test
    public void testRegister() {
        RegisterController registerController = new RegisterController();
        assertEquals(registerController.register(), "register");
    }
}