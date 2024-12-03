package pl.joboffer.job.security.jwt;

import io.jsonwebtoken.*;
import io.jsonwebtoken.security.Keys;
import io.jsonwebtoken.security.SignatureException;
import jakarta.servlet.http.HttpServletRequest;
import java.security.Key;
import java.time.Instant;
import java.time.temporal.ChronoUnit;
import java.util.Collection;
import java.util.Date;
import java.util.function.Function;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.stereotype.Component;
import org.springframework.util.StringUtils;

@Slf4j
@Component
public class JwtUtils {

  private static final Key SECRET_KEY = Keys.secretKeyFor(SignatureAlgorithm.HS256);
  private static final Long JWT_EXPIRATION = 36000000L;

  public String extractUsername(String token) {
    return extractClaim(token, Claims::getSubject);
  }

  public Claims extractAllClaims(String token) {
    return Jwts.parser().setSigningKey(SECRET_KEY).parseClaimsJws(token).getBody();
  }

  public <T> T extractClaim(String token, Function<Claims, T> claimsResolver) {
    final Claims claims = extractAllClaims(token);
    return claimsResolver.apply(claims);
  }

  public String generateToken(
      String email, Collection<? extends GrantedAuthority> roles, Long idUser) {
    return Jwts.builder()
        .setSubject(email)
        .claim("role", roles)
        .claim("idUser", idUser)
        .setIssuedAt(new Date(System.currentTimeMillis()))
        .setExpiration(Date.from(Instant.now().plus(JWT_EXPIRATION, ChronoUnit.MILLIS)))
        .signWith(SignatureAlgorithm.HS256, SECRET_KEY)
        .compact();
  }

  public boolean validateToken(String token) {
    try {
      Jwts.parser().setSigningKey(SECRET_KEY).parseClaimsJws(token);
      return true;
    } catch (SignatureException e) {
      log.info("Invalid JWT signature");
    } catch (MalformedJwtException e) {
      log.info("Invalid JWT token");
    } catch (ExpiredJwtException e) {
      log.info("Expired JWT token");
    } catch (UnsupportedJwtException e) {
      log.info("Unsupported JWT token");
    } catch (IllegalArgumentException e) {
      log.info("JWT token compact of handler are invalid");
    }
    return false;
  }

  public String getToken(HttpServletRequest httpServletRequest) {
    final String bearerToken = httpServletRequest.getHeader("Authorization");
    if (StringUtils.hasText(bearerToken) && bearerToken.startsWith("Bearer ")) {
      return bearerToken.substring(7);
    }
    return null;
  }
}
