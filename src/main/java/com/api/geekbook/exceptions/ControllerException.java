package com.api.geekbook.exceptions;

import org.springframework.core.NestedExceptionUtils;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.http.HttpStatus;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import java.util.ArrayList;
import java.util.List;

@RestControllerAdvice
public class ControllerException {

    @ResponseStatus(HttpStatus.BAD_REQUEST)
    @ExceptionHandler(MethodArgumentNotValidException.class)
    public List<ErrorResponse> validationException(MethodArgumentNotValidException exception) {
        List<FieldError> fieldErrorList = exception.getBindingResult().getFieldErrors();

        List<ErrorResponse> listError = new ArrayList<>();
        fieldErrorList.forEach(error -> {
            String field = error.getField();
            String message = error.getDefaultMessage();
            listError.add(new ErrorResponse(field, message));
        });

        return listError;
    }

    @ExceptionHandler(DataIntegrityViolationException.class)
    @ResponseStatus(HttpStatus.CONFLICT)
    public String handleDataIntegrityViolationException(DataIntegrityViolationException ex) {

        return NestedExceptionUtils.getMostSpecificCause(ex).getMessage();
    }
}
