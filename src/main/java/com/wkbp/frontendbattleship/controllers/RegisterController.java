package com.wkbp.frontendbattleship.controllers;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

/**
 * @author Bartosz Kupajski
 */
@Controller
@RequestMapping("/register")
public class RegisterController {

    @GetMapping
    public String register() {
        return "register";
    }
}