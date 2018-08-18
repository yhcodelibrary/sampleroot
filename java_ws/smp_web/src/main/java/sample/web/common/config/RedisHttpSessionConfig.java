package sample.web.common.config;

import javax.annotation.Resource;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.data.redis.connection.RedisConnectionFactory;
import org.springframework.session.data.redis.config.ConfigureRedisAction;
import org.springframework.session.data.redis.config.annotation.web.http.EnableRedisHttpSession;

@Configuration
@EnableRedisHttpSession(maxInactiveIntervalInSeconds = 1800)
public class RedisHttpSessionConfig {

//	  @Resource
//	  private RedisConnectionFactory redisConnectionFactory;
//
//	  @Bean
//	  public RedisConnectionFactory connectionFactory() {
//	    return redisConnectionFactory;
//	  }
//
//  //※ElastiCacheではconfigureRedisAction()が必要らしいので追加
//  @Bean
//  public static ConfigureRedisAction configureRedisAction() {
//      return ConfigureRedisAction.NO_OP;
//  }
}
