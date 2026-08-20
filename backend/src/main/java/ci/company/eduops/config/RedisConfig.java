package ci.company.eduops.config;

import com.fasterxml.jackson.annotation.JsonAutoDetect;
import com.fasterxml.jackson.annotation.PropertyAccessor;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.jsontype.impl.LaissezFaireSubTypeValidator;
import com.fasterxml.jackson.datatype.jsr310.JavaTimeModule;
import org.springframework.cache.CacheManager;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.data.redis.cache.RedisCacheConfiguration;
import org.springframework.data.redis.cache.RedisCacheManager;
import org.springframework.data.redis.connection.RedisConnectionFactory;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.data.redis.serializer.GenericJackson2JsonRedisSerializer;
import org.springframework.data.redis.serializer.RedisSerializationContext;
import org.springframework.data.redis.serializer.StringRedisSerializer;

import java.time.Duration;
import java.util.Map;

/**
 * Redis is a cache and a coordination tool only.
 *
 * <p>Rule: nothing lives in Redis that cannot be rebuilt from PostgreSQL
 * (section 7). Every cache therefore carries a TTL.</p>
 */
@Configuration
public class RedisConfig {

    public static final String CACHE_DASHBOARD = "dashboard";
    public static final String CACHE_CLASSROOM_OCCUPANCY = "classroomOccupancy";
    public static final String CACHE_ACADEMIC_YEAR = "academicYear";
    public static final String CACHE_CURRICULUM = "curriculum";
    public static final String CACHE_REFERENCE = "reference";
    public static final String CACHE_STUDENT_SUMMARY = "studentSummary";
    public static final String CACHE_FINANCIAL_SUMMARY = "financialSummary";

    @Bean
    public ObjectMapper redisObjectMapper() {
        ObjectMapper mapper = new ObjectMapper();
        mapper.registerModule(new JavaTimeModule());
        mapper.setVisibility(PropertyAccessor.ALL, JsonAutoDetect.Visibility.ANY);
        mapper.activateDefaultTyping(LaissezFaireSubTypeValidator.instance,
                ObjectMapper.DefaultTyping.NON_FINAL);
        return mapper;
    }

    @Bean
    public RedisTemplate<String, Object> redisTemplate(RedisConnectionFactory factory) {
        RedisTemplate<String, Object> template = new RedisTemplate<>();
        template.setConnectionFactory(factory);
        template.setKeySerializer(new StringRedisSerializer());
        template.setHashKeySerializer(new StringRedisSerializer());
        GenericJackson2JsonRedisSerializer serializer =
                new GenericJackson2JsonRedisSerializer(redisObjectMapper());
        template.setValueSerializer(serializer);
        template.setHashValueSerializer(serializer);
        template.afterPropertiesSet();
        return template;
    }

    @Bean
    public CacheManager cacheManager(RedisConnectionFactory factory) {
        GenericJackson2JsonRedisSerializer serializer =
                new GenericJackson2JsonRedisSerializer(redisObjectMapper());

        RedisCacheConfiguration base = RedisCacheConfiguration.defaultCacheConfig()
                .entryTtl(Duration.ofMinutes(5))
                .disableCachingNullValues()
                .prefixCacheNameWith("eduops:")
                .serializeKeysWith(RedisSerializationContext.SerializationPair
                        .fromSerializer(new StringRedisSerializer()))
                .serializeValuesWith(RedisSerializationContext.SerializationPair
                        .fromSerializer(serializer));

        return RedisCacheManager.builder(factory)
                .cacheDefaults(base)
                .withInitialCacheConfigurations(Map.of(
                        // live figures: short TTL, invalidated by domain events
                        CACHE_DASHBOARD, base.entryTtl(Duration.ofSeconds(60)),
                        CACHE_CLASSROOM_OCCUPANCY, base.entryTtl(Duration.ofSeconds(30)),
                        CACHE_STUDENT_SUMMARY, base.entryTtl(Duration.ofMinutes(2)),
                        CACHE_FINANCIAL_SUMMARY, base.entryTtl(Duration.ofMinutes(2)),
                        // slow-moving structure: longer TTL
                        CACHE_ACADEMIC_YEAR, base.entryTtl(Duration.ofMinutes(30)),
                        CACHE_CURRICULUM, base.entryTtl(Duration.ofMinutes(30)),
                        CACHE_REFERENCE, base.entryTtl(Duration.ofHours(2))))
                .transactionAware()
                .build();
    }
}
