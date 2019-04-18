package com.wkbp.frontendbattleship.controllers;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;

/**
 * @author Patryk Kucharski
 */

@Controller
public class GameConfigController {

    @GetMapping("/gameConfig")
    public String gameConfig(Model model) {
        // TODO: 18.04.19 sprawdzic czy jest zalogowany
        return "gameConfig";
    }
}
