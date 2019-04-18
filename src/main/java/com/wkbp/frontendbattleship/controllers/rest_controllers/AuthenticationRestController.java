package com.wkbp.frontendbattleship.controllers.rest_controllers;

import com.wkbp.frontendbattleship.models.UserDto;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.client.RestTemplate;

/**
 * RestController to communicate with server in terms of user authentication
 *
 * @author Patryk Kucharski
 */

@RestController
public class AuthenticationRestController {

    /**
     * Sends request to a server with user to be verified
     * if sever confirms that user is in database it responds with HttpStatus.Accepted
     * then redirection to home page occurs, otherwise model is used to notify user
     * that given email or password is wrong and returns login template
     *
     * @param email email provided by user in form on login template
     * @param password password provided by user in form on login template
     * @param model supplies attributes used for rendering views
     * @return redirects to home template if authentication
     *         is indeed successful otherwise returns login template
     */

    @ResponseBody
    @PostMapping("/")
    public String home(@RequestParam("email") String email,
                       @RequestParam("password") String password,
                       Model model) {

        ResponseEntity response = getResponseEntityFromServerUserAuthentication(email, password);
        if (response.getStatusCode().equals(HttpStatus.ACCEPTED)) {
            model.addAttribute("wrongPasswordOrEmail", "email or password is incorrect");
            return "redirect:/";
        }
        return "login";
        // TODO: 18.04.19 zwracać templatke, zapytanie w osobnej metodzie
    }

    private ResponseEntity getResponseEntityFromServerUserAuthentication(@RequestParam("email") String email, @RequestParam("password") String password) {
        UserDto user = new UserDto(email, password);
        RestTemplate restTemplate = new RestTemplate();
        return restTemplate.postForObject("https://battleship-wkbp-server.herokuapp.com/getUser", user, ResponseEntity.class);
    }
}
