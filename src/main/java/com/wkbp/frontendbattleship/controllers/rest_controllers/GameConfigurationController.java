package com.wkbp.frontendbattleship.controllers.rest_controllers;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

/**
 * @author Bartosz Kupajski
 */
@Controller
@RequestMapping("/gameConfiguration")
public class GameConfigurationController {

    @GetMapping
    public String gameConfiguration(){
        return "configurationGame";
    }
}
