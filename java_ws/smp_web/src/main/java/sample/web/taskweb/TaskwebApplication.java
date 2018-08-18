package sample.web.taskweb;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
//import org.springframework.boot.autoconfigure.domain.EntityScan;
//import org.springframework.data.jpa.repository.config.EnableJpaRepositories;
import org.springframework.web.bind.annotation.RequestMapping;

//import sample.web.taskweb.dao.EventRepository;

@SpringBootApplication(scanBasePackages={"sample.web.common", "sample.web.taskweb"})
//@SpringBootApplication(scanBasePackages={"sample.web"})
//@EnableJpaRepositories("sample.web.taskweb.dao")
//@EnableJpaRepositories(basePackageClasses= {EventRepository.class})
//@EntityScan(basePackages={"sample.web.taskweb.model"})
//@EntityScan(basePackageClasses=ModelEvent.class)
//@RestController
public class TaskwebApplication {

	@RequestMapping("/hello")
	String hello() {
		return "Hello world";
	}
	
	public static void main(String[] args) {
		SpringApplication.run(TaskwebApplication.class, args);
		//SpringApplication.run(TaskManageController.class, args);
	}
}
