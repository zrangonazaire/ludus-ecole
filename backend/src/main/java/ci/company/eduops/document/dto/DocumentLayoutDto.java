package ci.company.eduops.document.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;
import lombok.Getter;
import lombok.Setter;

/** School-wide identity and print options used on official documents. */
@Getter
@Setter
public class DocumentLayoutDto {

    @NotBlank
    @Size(max = 200)
    private String schoolName;
    @Size(max = 255)
    private String legalName;
    @Size(max = 255)
    private String motto;
    @Size(max = 80)
    private String registrationNumber;
    @Size(max = 400)
    private String address;
    @Size(max = 120)
    private String city;
    @Size(max = 120)
    private String country;
    @Size(max = 40)
    private String phone;
    @Size(max = 180)
    private String email;
    @Size(max = 200)
    private String website;
    @Size(max = 750000)
    private String logoDataUrl;
    @Size(max = 500)
    private String headerLeft;
    @Size(max = 500)
    private String headerRight;
    @Size(max = 1000)
    private String footerText;
    @Size(max = 200)
    private String signatoryName;
    @NotBlank
    @Size(max = 160)
    private String signatoryTitle;
    @NotBlank
    @Pattern(regexp = "^#[0-9a-fA-F]{6}$")
    private String accentColor;
    @NotBlank
    @Size(max = 80)
    @Pattern(regexp = ".*\\{seq(?::\\d+)?}.*",
            message = "Le modèle de numérotation doit contenir {seq} ou {seq:n}")
    private String documentNumberPattern;
    private boolean showLogo;
    private boolean showMotto;
    private boolean showSignatureLine;
    private boolean showVerificationCode;
}

