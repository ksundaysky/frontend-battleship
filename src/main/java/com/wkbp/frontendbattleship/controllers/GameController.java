package com.wkbp.frontendbattleship.controllers;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

/**
 * Controller to map https://battleship-wkbp-server.herokuapp.com/game
 *
 * @author Bartosz Kupajski
 */
@Controller
public class GameController {

    /**
     * Maps https://battleship-wkbp-server.herokuapp.com/game to template
     *
     * @return resources/templates/game.html
     */

    @GetMapping("/game")
    public String game() {
        return "game";
    }
}
