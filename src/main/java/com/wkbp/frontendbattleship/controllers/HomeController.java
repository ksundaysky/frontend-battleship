package com.wkbp.frontendbattleship.controllers;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

/**
 * Main Controller to map https://battleship-wkbp-server.herokuapp.com/
 *
 * @author Patryk Kucharski
 */
@Controller
public class HomeController {

    /**
     * Maps https://battleship-wkbp-server.herokuapp.com/ to template
     *
     * @return resources/templates/home.html
     */
    @GetMapping("/")
    public String home() {
        return "home";
    }
}
