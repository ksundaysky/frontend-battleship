package com.wkbp.frontendbattleship.controllers;

import com.wkbp.frontendbattleship.models.UserDto;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.client.RestTemplate;

/**
 * RestController to communicate with server in terms of user authentication
 *
 * @author Patryk Kucharski
 * <p>
 *
 */

@Controller
public class AuthenticationController {


    @Value("${backend.url}")
    private String url;

    /**
     * Maps /login to html template
     *
     * @return login template
     */

    @GetMapping("/login")
    public String login() {
        return "login";
    }

    /**
     * Sends request to a server with user to be verified
     * if sever confirms that user is in database it responds with HttpStatus.Accepted
     * then redirection to home page occurs, otherwise model is used to notify user
     * that given email or password is wrong and returns login template
     *
     * @param email    email provided by user in form on login template
     * @param password password provided by user in form on login template
     * @param model    supplies attributes used for rendering views
     * @return redirects to home template if authentication
     * is indeed successful otherwise returns login template
     */

    @PostMapping("/login")
    public String home(@RequestParam("email") String email,
                       @RequestParam("password") String password,
                       Model model) {

        HttpStatus response = getResponseEntityFromServerUserAuthentication(email, password);
        if (response.equals(HttpStatus.ACCEPTED)) {
            model.addAttribute("wrongPasswordOrEmail", "email or password is incorrect");
            return "redirect:/";
        }
        return "login";
    }

    private HttpStatus getResponseEntityFromServerUserAuthentication(@RequestParam("email") String email, @RequestParam("password") String password) {
        UserDto user = new UserDto(email, password);
        RestTemplate restTemplate = new RestTemplate();
        return restTemplate.postForObject(url + "getUser", user, HttpStatus.class);
    }
}
