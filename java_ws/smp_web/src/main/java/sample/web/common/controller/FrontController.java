package sample.web.common.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
@CrossOrigin("http://localhost:4200")
public class FrontController {

	@GetMapping("/test123")
	public String test() {

		return "test123";
	}
	
	@GetMapping("/calendar")
	public String calendar() {

		return "redirect:/";
	}

	@GetMapping("/login")
	public String login() {

		return "redirect:/";
	}

	@GetMapping("/list")
	public String list() {

		return "redirect:/";
	}

	@GetMapping("/logout")
	public String logout() {

		return "forward:/";
	}

	@GetMapping("/graph")
	public String graph() {

		return "redirect:/";
	}
}
