package com.wkbp.frontendbattleship.controllers;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

/**
 * @author Bartosz Kupajski
 */
@Controller
@RequestMapping("/game")
public class GameController {

    @GetMapping
    public String game(){
        return "game";
    }
}
