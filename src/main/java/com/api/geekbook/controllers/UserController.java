package com.api.geekbook.controllers;

import com.api.geekbook.dtos.requests.SignUpRequest;
import com.api.geekbook.dtos.responses.UserResponse;
import com.api.geekbook.services.UserService;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin(origins = "*")
@RequestMapping("/api")
public class UserController {

    private final UserService userService;

    public UserController(UserService userService) {
        this.userService = userService;
    }

    @PostMapping("/sign-up")
    @ResponseStatus(HttpStatus.CREATED)
    public UserResponse createUser(@RequestBody @Valid SignUpRequest body) {
        return this.userService.create(body);
    }
}
