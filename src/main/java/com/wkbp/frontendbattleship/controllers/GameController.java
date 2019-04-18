package com.wkbp.frontendbattleship.controllers;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

/**
 * @author Bartosz Kupajski
 */
@Controller
public class GameController {

    @GetMapping("/game")
    public String game(){
        return "game";
    }
}
