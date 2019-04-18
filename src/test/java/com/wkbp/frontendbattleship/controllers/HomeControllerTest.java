package com.wkbp.frontendbattleship.controllers;

import org.testng.annotations.Test;

import static org.testng.Assert.*;

/**
 * @author Wiktor Rup
 */
public class HomeControllerTest {

    @Test
    public void testHome() {
        HomeController homeController = new HomeController();
        assertEquals(homeController.home(), "home");
    }
}