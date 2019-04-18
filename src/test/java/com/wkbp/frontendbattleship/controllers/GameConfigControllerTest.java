package com.wkbp.frontendbattleship.controllers;

import org.testng.annotations.Test;

import static org.testng.Assert.assertEquals;

/**
 * @author Wiktor Rup
 */
public class GameConfigControllerTest {

    @Test
    public void testGameConfig() {
        GameConfigController gameConfigController = new GameConfigController();
        assert gameConfigController.gameConfig().equals("gameConfig") : "gameConfig String should be retured";
    }
}