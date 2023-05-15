package com.api.geekbook.dtos.requests;

import jakarta.annotation.Nullable;
import jakarta.validation.constraints.AssertTrue;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import org.hibernate.validator.constraints.URL;

public record SignUpRequest(
		@NotBlank
	    @Email
	    String email,

	    @NotBlank
	    @Size(max = 16)
	    String nickname,

	    @URL
	    @Nullable
	    String avatar,

	    @NotBlank
	    @Size(min = 3)
	    String password,

	    @NotBlank
	    String confirmPassword
	    ) {
    

    @AssertTrue(message = "password and confirmPassword are not the same")
    private boolean isPasswordComparison() {
        return this.password.equals(this.confirmPassword);
    }
}
