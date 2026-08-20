package ci.company.eduops.security.dto;

import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

@Schema(name = "LoginRequest")
public class LoginRequest {

    @NotBlank
    @Schema(example = "registrar@eduops.local", description = "Username or email")
    private String login;

    @NotBlank
    @Size(min = 6, max = 128)
    @Schema(example = "ChangeMe!2026")
    private String password;

    public String getLogin() {
        return login;
    }

    public void setLogin(String login) {
        this.login = login;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }
}
