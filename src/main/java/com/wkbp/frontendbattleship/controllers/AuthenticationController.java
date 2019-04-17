package com.wkbp.frontendbattleship.controllers;

import com.wkbp.frontendbattleship.models.User;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;

/**
 * @author Patryk Kucharski
 */

@Controller
public class AuthenticationController {

    @GetMapping("/")
    public String home(){
        return "home";
    }

    @PostMapping("/")
    public String home(@RequestParam("email") String email,
                       @RequestParam("password") String password,
                       Model model){

        User user = new User(email, password);
        // TODO: 17.04.19 wyslij jsona


        return "home";
    }
}
