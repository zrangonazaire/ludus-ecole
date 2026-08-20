package ci.company.eduops.config;

import io.swagger.v3.oas.models.Components;
import io.swagger.v3.oas.models.OpenAPI;
import io.swagger.v3.oas.models.info.Contact;
import io.swagger.v3.oas.models.info.Info;
import io.swagger.v3.oas.models.info.License;
import io.swagger.v3.oas.models.security.SecurityRequirement;
import io.swagger.v3.oas.models.security.SecurityScheme;
import io.swagger.v3.oas.models.servers.Server;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import java.util.List;

/** Swagger UI configuration (section 91). */
@Configuration
public class OpenApiConfig {

    private static final String SECURITY_SCHEME = "bearerAuth";

    private final EduOpsProperties properties;

    public OpenApiConfig(EduOpsProperties properties) {
        this.properties = properties;
    }

    @Bean
    public OpenAPI eduOpsOpenAPI() {
        return new OpenAPI()
                .info(new Info()
                        .title("EduOps API")
                        .version("v1")
                        .description("""
                                Integrated school management system: academic, administrative
                                and financial operations of a school.

                                **Business rules enforced server-side**
                                - Class capacity and double-enrollment control
                                - Teacher / class / room timetable conflicts
                                - Grade workflow DRAFT -> SUBMITTED -> VALIDATED -> PUBLISHED
                                - Averages computed by the backend only
                                - Idempotent payments and enrollments
                                - Relation-based access control for teachers and parents

                                **Errors** follow a single envelope with a stable `code`
                                (see the `ApiError` schema).
                                """)
                        .contact(new Contact().name("EduOps").email("support@eduops.local"))
                        .license(new License().name("Proprietary")))
                .servers(List.of(
                        new Server().url(properties.getApp().getApiUrl()).description("Current environment")))
                .addSecurityItem(new SecurityRequirement().addList(SECURITY_SCHEME))
                .components(new Components().addSecuritySchemes(SECURITY_SCHEME,
                        new SecurityScheme()
                                .name(SECURITY_SCHEME)
                                .type(SecurityScheme.Type.HTTP)
                                .scheme("bearer")
                                .bearerFormat("JWT")
                                .description("Paste the access token returned by POST /api/v1/auth/login")));
    }
}
