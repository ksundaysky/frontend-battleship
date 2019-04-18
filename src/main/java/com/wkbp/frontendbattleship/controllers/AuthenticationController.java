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

    @GetMapping("/login")
    public String login(){
        return "login";
    }
}
