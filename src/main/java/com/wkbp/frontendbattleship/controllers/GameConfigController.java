package com.wkbp.frontendbattleship.controllers;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.PostMapping;

/**
 * @author Patryk Kucharski
 */

@Controller
public class GameConfigController {

    @PostMapping("/set-game-confing")
    public String home(Model model){
        // TODO: 18.04.19 sprawdzic czy jest zalogowany
        return "gameConfig";
    }
}
