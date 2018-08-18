//package sample.web.taskweb.controller;
//
//import java.util.Calendar;
//
//import javax.servlet.http.HttpSession;
//import javax.validation.Valid;
//
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.boot.autoconfigure.SpringBootApplication;
//import org.springframework.http.HttpHeaders;
//import org.springframework.http.HttpStatus;
//import org.springframework.http.ResponseEntity;
//import org.springframework.validation.BindingResult;
//import org.springframework.validation.FieldError;
//import org.springframework.web.bind.annotation.CrossOrigin;
//import org.springframework.web.bind.annotation.RequestBody;
//import org.springframework.web.bind.annotation.RequestMapping;
//import org.springframework.web.bind.annotation.RestController;
//
//import sample.web.taskweb.model.ModelEvent;
//import sample.web.taskweb.model.ModelLogicGetMonthTaskList;
//import sample.web.taskweb.model.ModelSessionTest;
//
//@SpringBootApplication
//@RestController
//@RequestMapping("/api/event")
//@CrossOrigin
//public class TaskController {
//
//	@Autowired
//	ModelLogicGetMonthTaskList model;
//
//	@RequestMapping("/get")
//	String get(HttpSession httpSession) throws Exception {
//
//		ModelSessionTest m = new ModelSessionTest();
//		m.setName("testest");
//		
//		httpSession.setAttribute("test", m);
//		
//	
//		
//		return model.GetJson();
//		//return "get world";
//	}
//	@RequestMapping("/test")
//	String test(HttpSession httpSession) throws Exception {
//
//		ModelSessionTest m = (ModelSessionTest)httpSession.getAttribute("test");
//		
//		return m.getName();
//		//return "get world";
//	}
//
//    //public String login(HttpSession httpSession, @RequestParam("userid") String userId) {
//	@RequestMapping("/getMonthEvents")
//	ResponseEntity<String> getMonthEvents(Integer year, Integer month) throws Exception {
//
//	    HttpHeaders responseHeaders = new HttpHeaders();
//	    ResponseEntity result =new ResponseEntity<String>(model.GetJson(), responseHeaders, HttpStatus.OK);
//	    
//	    
//		return result;
//		//return "get world";
//	}
//	@RequestMapping("/createEvent")
//	ResponseEntity<String> createEvent(@RequestBody  @Valid ModelEvent target,BindingResult result) throws Exception {
//
//        if (result.hasErrors()) {
//            for(FieldError err: result.getFieldErrors()) {
//        	    System.out.println(err.getCode());
//                //log.debug("error code = [" + err.getCode() + "]");
//            }
//        }
//	    System.out.println(target.getRegisterDate().get(Calendar.YEAR));
//	    System.out.println(target.getRegisterDate().get(Calendar.MONTH));
//	    System.out.println(target.getRegisterDate().get(Calendar.DATE));
//	    HttpHeaders responseHeaders = new HttpHeaders();
//	    ResponseEntity response =new ResponseEntity<String>(model.CreateEvent(target), responseHeaders, HttpStatus.OK);
//		return response;
//	}
//	@RequestMapping("/updateEvent")
//	ResponseEntity<String> updateEvent(@RequestBody ModelEvent target) throws Exception {
//
//	    HttpHeaders responseHeaders = new HttpHeaders();
//	    ResponseEntity result =new ResponseEntity<String>(model.UpdateEvent(target), responseHeaders, HttpStatus.OK);
//		return result;
//	}
//}
