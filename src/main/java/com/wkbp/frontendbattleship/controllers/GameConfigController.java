package com.wkbp.frontendbattleship.controllers;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

/**
 * Controller that maps https://battleship-wkbp-server.herokuapp.com/gameConfig
 *
 * @author Patryk Kucharski
 */

@Controller
public class GameConfigController {

    /**
     * maps https://battleship-wkbp-server.herokuapp.com/gameConfig to template
     *
     * @return resources/templates/gameConfig.html
     */

    @GetMapping("/gameConfig")
    public String gameConfig() {

        return "gameConfig";
    }
}
