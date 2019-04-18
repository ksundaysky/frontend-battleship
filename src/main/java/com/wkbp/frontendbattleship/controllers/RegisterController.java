package com.wkbp.frontendbattleship.controllers;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

/**
 * Controller to map https://battleship-wkbp-server.herokuapp.com/register
 *
 * @author Bartosz Kupajski
 */
@Controller
@RequestMapping("/register")
public class RegisterController {

    /**
     * Maps https://battleship-wkbp-server.herokuapp.com/register to template
     *
     * @return resources/templates/register.html
     */

    @GetMapping
    public String register() {
        return "register";
    }
}