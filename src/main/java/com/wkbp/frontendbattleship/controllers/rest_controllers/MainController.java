package com.wkbp.frontendbattleship.controllers.rest_controllers;

import com.wkbp.frontendbattleship.models.UserDto;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.client.RestTemplate;

/**
 * @author Patryk Kucharski
 */

@RestController
public class MainController {

    @ResponseBody
    @PostMapping("/")
    public String home(@RequestParam("email") String email,
                       @RequestParam("password") String password) {

        UserDto user = new UserDto(email, password);
        RestTemplate restTemplate = new RestTemplate();
        return restTemplate.postForObject("https://battleship-wkbp.herokuapp.com/getUser", user, String.class);

//        return mapper.writeValueAsString(user);
//        return ResponseEntity.status(HttpStatus.CREATED).build();

    }
}
