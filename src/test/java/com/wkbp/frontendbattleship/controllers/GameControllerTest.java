package com.wkbp.frontendbattleship.controllers;

import org.testng.annotations.Test;

import static org.testng.Assert.*;

/**
 * @author Wiktor Rup
 */
public class GameControllerTest {

    @Test
    public void testGame() {

        GameController gameController = new GameController();
        assertEquals(gameController.game(), "game");
    }
}