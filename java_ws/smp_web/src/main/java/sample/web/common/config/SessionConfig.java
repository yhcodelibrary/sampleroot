package sample.web.common.config;

/*
import org.springframework.boot.autoconfigure.EnableAutoConfiguration;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.session.data.redis.config.ConfigureRedisAction;
import org.springframework.session.data.redis.config.annotation.web.http.EnableRedisHttpSession;


//@ConfigurationProperties(prefix = "spring.datasource.redis")
@EnableRedisHttpSession(maxInactiveIntervalInSeconds = 180) // 3分
@Configuration
//@EnableAutoConfiguration(exclude={SessionConfig.class})
public class SessionConfig {
    @Bean
    public ConfigureRedisAction configureRedisAction() {
        return ConfigureRedisAction.NO_OP;
    }

    /*
    String host = "";
 
    int port = 0;
    @Bean
    public JedisConnectionFactory connectionFactory() {
    	JedisConnectionFactory factory = JedisConnectionFactory()
        factory.hostName = host;
        factory.port = port;
        return factory;
    }
}
 */
