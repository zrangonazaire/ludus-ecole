package ci.company.eduops.config;

import ci.company.eduops.common.exception.ApiError;
import ci.company.eduops.common.exception.ErrorCode;
import ci.company.eduops.security.filter.JwtAuthenticationFilter;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.http.MediaType;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

import java.util.Arrays;
import java.util.List;

/**
 * HTTP security.
 *
 * <p>Stateless JWT, method-level authorization enabled so each controller can
 * declare the exact permission it needs, and a JSON error body on 401/403 that
 * matches the {@link ApiError} contract used everywhere else.</p>
 */
@Configuration
@EnableMethodSecurity(prePostEnabled = true)
public class SecurityConfig {

    private final EduOpsProperties properties;
    private final JwtAuthenticationFilter jwtAuthenticationFilter;
    private final ObjectMapper objectMapper;

    public SecurityConfig(EduOpsProperties properties,
                          JwtAuthenticationFilter jwtAuthenticationFilter,
                          ObjectMapper objectMapper) {
        this.properties = properties;
        this.jwtAuthenticationFilter = jwtAuthenticationFilter;
        this.objectMapper = objectMapper;
    }

    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        http
            .csrf(AbstractHttpConfigurer::disable)   // stateless API, no cookies used for auth
            .cors(cors -> cors.configurationSource(corsConfigurationSource()))
            .sessionManagement(session -> session.sessionCreationPolicy(SessionCreationPolicy.STATELESS))
            .headers(headers -> headers
                    .frameOptions(frame -> frame.sameOrigin())
                    .contentTypeOptions(opts -> {})
                    .httpStrictTransportSecurity(hsts -> hsts
                            .includeSubDomains(true)
                            .maxAgeInSeconds(31536000)))
            .authorizeHttpRequests(auth -> auth
                    .requestMatchers(HttpMethod.OPTIONS, "/**").permitAll()
                    .requestMatchers(
                            "/api/v1/auth/login",
                            "/api/v1/auth/refresh",
                            "/api/v1/auth/password-reset/**",
                            "/api/v1/public/**").permitAll()
                    .requestMatchers("/actuator/health", "/actuator/health/**", "/actuator/info").permitAll()
                    .requestMatchers("/actuator/**").hasRole("SUPER_ADMIN")
                    .requestMatchers(
                            "/api/v1/api-docs/**",
                            "/swagger-ui/**",
                            "/swagger-ui.html",
                            "/v3/api-docs/**").permitAll()
                    .requestMatchers("/ws/**").authenticated()
                    .anyRequest().authenticated())
            .exceptionHandling(handling -> handling
                    .authenticationEntryPoint((request, response, ex) ->
                            writeError(response, ErrorCode.UNAUTHENTICATED, request.getRequestURI()))
                    .accessDeniedHandler((request, response, ex) ->
                            writeError(response, ErrorCode.ACCESS_DENIED, request.getRequestURI())))
            .addFilterBefore(jwtAuthenticationFilter, UsernamePasswordAuthenticationFilter.class);

        return http.build();
    }

    private void writeError(jakarta.servlet.http.HttpServletResponse response,
                            ErrorCode code,
                            String path) throws java.io.IOException {
        response.setStatus(code.getStatus().value());
        response.setContentType(MediaType.APPLICATION_JSON_VALUE);
        response.setCharacterEncoding("UTF-8");
        ApiError error = new ApiError(code.getStatus().value(), code.name(),
                code.getDefaultMessage(), path);
        objectMapper.writeValue(response.getOutputStream(), error);
    }

    @Bean
    public CorsConfigurationSource corsConfigurationSource() {
        EduOpsProperties.Cors cors = properties.getCors();
        CorsConfiguration configuration = new CorsConfiguration();
        configuration.setAllowedOrigins(split(cors.getAllowedOrigins()));
        configuration.setAllowedMethods(split(cors.getAllowedMethods()));
        if ("*".equals(cors.getAllowedHeaders())) {
            configuration.addAllowedHeader("*");
        } else {
            configuration.setAllowedHeaders(split(cors.getAllowedHeaders()));
        }
        configuration.setExposedHeaders(List.of(
                "X-Correlation-Id", "X-Request-Id", "Content-Disposition"));
        configuration.setAllowCredentials(cors.isAllowCredentials());
        configuration.setMaxAge(3600L);

        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", configuration);
        return source;
    }

    private List<String> split(String value) {
        return Arrays.stream(value.split(",")).map(String::trim).filter(s -> !s.isEmpty()).toList();
    }

    /** BCrypt with strength 12: deliberately slow to make offline attacks costly. */
    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder(12);
    }

    @Bean
    public AuthenticationManager authenticationManager(AuthenticationConfiguration configuration)
            throws Exception {
        return configuration.getAuthenticationManager();
    }
}
