package com.wkbp.frontendbattleship.controllers;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

/**
 * @author Patryk Kucharski
 * <p>
 * Controller that maps
 */

@Controller
public class AuthenticationController {


    @GetMapping("/")
    public String home() {
        return "home";
    }
}
