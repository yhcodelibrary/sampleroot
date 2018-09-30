package sample.web.taskweb;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.builder.SpringApplicationBuilder;
import org.springframework.boot.web.servlet.support.SpringBootServletInitializer;
//import org.springframework.boot.autoconfigure.domain.EntityScan;
//import org.springframework.data.jpa.repository.config.EnableJpaRepositories;
import org.springframework.web.bind.annotation.RequestMapping;

//import sample.web.taskweb.dao.EventRepository;

@SpringBootApplication(scanBasePackages={"sample.web.common", "sample.web.taskweb"})
public class TaskwebApplication  extends SpringBootServletInitializer  {

	@RequestMapping("/hello")
	String hello() {
		return "Hello world";
	}

	public static void main(String[] args) {
		SpringApplication.run(TaskwebApplication.class, args);
	}

	@Override
	protected SpringApplicationBuilder configure(SpringApplicationBuilder application) {
		return application.sources(TaskwebApplication.class);
	}
}
