package ci.company.eduops.security.jwt;

import ci.company.eduops.config.EduOpsProperties;
import ci.company.eduops.security.service.EduOpsUserDetails;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.ExpiredJwtException;
import io.jsonwebtoken.JwtException;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.security.Keys;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Component;

import javax.crypto.SecretKey;
import java.nio.charset.StandardCharsets;
import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;
import java.util.Base64;
import java.util.Date;
import java.util.List;
import java.util.UUID;

/**
 * Issues and verifies the access and refresh tokens.
 *
 * <p>The access token carries the user id, the roles and the permission codes so
 * the API stays stateless; the refresh token carries nothing but an opaque id
 * and is additionally checked against the database (so it can be revoked).</p>
 */
@Component
public class JwtTokenProvider {

    private static final Logger log = LoggerFactory.getLogger(JwtTokenProvider.class);

    public static final String CLAIM_USER_ID = "uid";
    public static final String CLAIM_ROLES = "roles";
    public static final String CLAIM_PERMISSIONS = "perms";
    public static final String CLAIM_SCHOOL_ID = "sid";
    public static final String CLAIM_TYPE = "typ";
    public static final String TYPE_ACCESS = "access";
    public static final String TYPE_REFRESH = "refresh";

    private final EduOpsProperties properties;
    private final SecretKey signingKey;

    public JwtTokenProvider(EduOpsProperties properties) {
        this.properties = properties;
        String secret = properties.getSecurity().getJwt().getSecret();
        if (secret == null || secret.getBytes(StandardCharsets.UTF_8).length < 64) {
            throw new IllegalStateException(
                    "eduops.security.jwt.secret must be at least 64 characters for HS512");
        }
        this.signingKey = Keys.hmacShaKeyFor(secret.getBytes(StandardCharsets.UTF_8));
    }

    public String generateAccessToken(EduOpsUserDetails user) {
        long now = System.currentTimeMillis();
        long expiration = properties.getSecurity().getJwt().getExpirationMs();
        return Jwts.builder()
                .issuer(properties.getSecurity().getJwt().getIssuer())
                .subject(user.getUsername())
                .claim(CLAIM_USER_ID, user.getUserId().toString())
                .claim(CLAIM_ROLES, List.copyOf(user.getRoleCodes()))
                .claim(CLAIM_PERMISSIONS, List.copyOf(user.getPermissionCodes()))
                .claim(CLAIM_SCHOOL_ID, user.getSchoolId() == null ? null : user.getSchoolId().toString())
                .claim(CLAIM_TYPE, TYPE_ACCESS)
                .issuedAt(new Date(now))
                .expiration(new Date(now + expiration))
                .id(UUID.randomUUID().toString())
                .signWith(signingKey)
                .compact();
    }

    public String generateRefreshToken(EduOpsUserDetails user) {
        long now = System.currentTimeMillis();
        long expiration = properties.getSecurity().getJwt().getRefreshExpirationMs();
        return Jwts.builder()
                .issuer(properties.getSecurity().getJwt().getIssuer())
                .subject(user.getUsername())
                .claim(CLAIM_USER_ID, user.getUserId().toString())
                .claim(CLAIM_TYPE, TYPE_REFRESH)
                .issuedAt(new Date(now))
                .expiration(new Date(now + expiration))
                .id(UUID.randomUUID().toString())
                .signWith(signingKey)
                .compact();
    }

    public Claims parse(String token) {
        return Jwts.parser()
                .verifyWith(signingKey)
                .requireIssuer(properties.getSecurity().getJwt().getIssuer())
                .build()
                .parseSignedClaims(token)
                .getPayload();
    }

    public boolean isValid(String token) {
        try {
            parse(token);
            return true;
        } catch (ExpiredJwtException ex) {
            log.debug("Rejected an expired token");
            return false;
        } catch (JwtException | IllegalArgumentException ex) {
            log.debug("Rejected an invalid token: {}", ex.getMessage());
            return false;
        }
    }

    public UUID extractUserId(Claims claims) {
        Object value = claims.get(CLAIM_USER_ID);
        return value == null ? null : UUID.fromString(value.toString());
    }

    public boolean isAccessToken(Claims claims) {
        return TYPE_ACCESS.equals(claims.get(CLAIM_TYPE, String.class));
    }

    public boolean isRefreshToken(Claims claims) {
        return TYPE_REFRESH.equals(claims.get(CLAIM_TYPE, String.class));
    }

    public long accessTokenValiditySeconds() {
        return properties.getSecurity().getJwt().getExpirationMs() / 1000L;
    }

    public long refreshTokenValiditySeconds() {
        return properties.getSecurity().getJwt().getRefreshExpirationMs() / 1000L;
    }

    /** Refresh tokens are persisted hashed so a database leak is not replayable. */
    public String hash(String token) {
        try {
            MessageDigest digest = MessageDigest.getInstance("SHA-256");
            return Base64.getEncoder()
                    .encodeToString(digest.digest(token.getBytes(StandardCharsets.UTF_8)));
        } catch (NoSuchAlgorithmException ex) {
            throw new IllegalStateException("SHA-256 is required but unavailable", ex);
        }
    }
}
