package com.wkbp.frontendbattleship.controllers;

import com.wkbp.frontendbattleship.models.User;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.client.RestTemplate;

import javax.servlet.http.HttpSession;

/**
 * @author Patryk Kucharski
 */

@Controller
@RequestMapping("/")
public class AuthenticationController {

    @GetMapping
    public String home(){
        return "index";
    }

    @PostMapping
    public ResponseEntity<SuccessMessage> home(@ModelAttribute User user, HttpSession httpSession){

        System.out.println(user);
        // TODO: 17.04.19 wyslij jsona


        RestTemplate restTemplate = new RestTemplate();

        httpSession.setAttribute("user", user);


        return restTemplate.postForEntity("https://battleship-wkbp.herokuapp.com/getUser", user, SuccessMessage.class);
    }
}
