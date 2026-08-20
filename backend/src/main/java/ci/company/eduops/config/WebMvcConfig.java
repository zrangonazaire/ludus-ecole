package ci.company.eduops.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.data.web.config.EnableSpringDataWebSupport;
import org.springframework.format.FormatterRegistry;
import org.springframework.format.datetime.standard.DateTimeFormatterRegistrar;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

import java.time.format.DateTimeFormatter;

/** ISO date binding for query parameters and pageable defaults. */
@Configuration
@EnableSpringDataWebSupport
public class WebMvcConfig implements WebMvcConfigurer {

    @Override
    public void addFormatters(FormatterRegistry registry) {
        DateTimeFormatterRegistrar registrar = new DateTimeFormatterRegistrar();
        registrar.setDateFormatter(DateTimeFormatter.ISO_LOCAL_DATE);
        registrar.setTimeFormatter(DateTimeFormatter.ISO_LOCAL_TIME);
        registrar.setDateTimeFormatter(DateTimeFormatter.ISO_OFFSET_DATE_TIME);
        registrar.registerFormatters(registry);
    }
}
