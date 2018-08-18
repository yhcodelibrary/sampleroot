//package sample.web.taskweb.model;
//
//import java.util.ArrayList;
//import java.util.Calendar;
//import java.util.List;
//import java.util.Random;
//
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.stereotype.Service;
//
//import com.fasterxml.jackson.core.JsonProcessingException;
//
//import sample.web.common.ilogic.ManageJson;
//
//@Service
//public class ModelLogicGetMonthTaskList {
//
//	@Autowired
//	ManageJson mngJson;
//
////	@Autowired
////	private EventRepository eventRepository;
//	
//	public String GetJson() 
//				throws JsonProcessingException{
//
////{"id":100,"type":"2","category":"3","subCategory":"1","detail":"test","registerDate":"2018/04/01"},
////{"id":102,"type":"2","category":"7","subCategory":"1","detail":"test","registerDate":"2018/04/01"},
////{"id":103,"type":"2","category":"4","subCategory":"1","detail":"test","registerDate":"2018/04/01"},
////{"id":104,"type":"2","category":"3","subCategory":"1","detail":"test","registerDate":"2018/04/03"},
////{"id":105,"type":"2","category":"7","subCategory":"1","detail":"test","registerDate":"2018/04/03"},
////{"id":106,"type":"2","category":"4","subCategory":"1","detail":"test","registerDate":"2018/04/03"},
////{"id":107,"type":"2","category":"5","subCategory":"1","detail":"test","registerDate":"2018/04/03"},
////{"id":101,"type":"1","category":"13","subCategory":"1","detail":"test","registerDate":1520080980000}]
////		Date since = new Date();
////		eventRepository.findByRegisterDateBetween(since, until).findAll(Specifications
////				.where(registerDateContains(""))
////		CriteriaBuilder cb = eventRepository.getCriteriaBuilder();
//		
//		
//		List<ModelEvent> list = new ArrayList<ModelEvent>();
//		ModelEvent t = new ModelEvent();
//		t.setId(100);
//		t.setType("2");
//		t.setCategory("3");
//		t.setAmount("1");
//		t.setDetail("test");
//		Calendar cal = Calendar.getInstance();
//		cal.set(2018, 4, 1);
//		t.setEventDate(cal.getTime());		
//		list.add(t);
//		
//		t = new ModelEvent();
//		t.setId(101);
//		t.setType("2");
//		t.setCategory("7");
//		t.setAmount("1");
//		t.setDetail("test");
//		cal = Calendar.getInstance();
//		cal.set(2018, 4, 1);
//		t.setEventDate(cal.getTime());		
//		list.add(t);
//
//		t = new ModelEvent();
//		t.setId(102);
//		t.setType("2");
//		t.setCategory("4");
//		t.setAmount("1");
//		t.setDetail("test");
//		cal = Calendar.getInstance();
//		cal.set(2018, 4, 1);
//		t.setEventDate(cal.getTime());		
//		list.add(t);
//
//		t = new ModelEvent();
//		t.setId(104);
//		t.setType("2");
//		t.setCategory("3");
//		t.setAmount("1");
//		t.setDetail("test");
//		cal = Calendar.getInstance();
//		cal.set(2018, 4, 3);
//		t.setEventDate(cal.getTime());		
//		list.add(t);
//		
//		t = new ModelEvent();
//		t.setId(105);
//		t.setType("2");
//		t.setCategory("7");
//		t.setAmount("1");
//		t.setDetail("test");
//		cal = Calendar.getInstance();
//		cal.set(2018, 4, 3);
//		t.setEventDate(cal.getTime());		
//		list.add(t);
//
//		t = new ModelEvent();
//		t.setId(106);
//		t.setType("2");
//		t.setCategory("4");
//		t.setAmount("1");
//		t.setDetail("test");
//		cal = Calendar.getInstance();
//		cal.set(2018, 4, 3);
//		t.setEventDate(cal.getTime());		
//		list.add(t);
//
//		t = new ModelEvent();
//		//t.setId(107);
//		t.setType("2");
//		t.setCategory("5");
//		t.setAmount("1");
//		t.setDetail("test");
//		cal = Calendar.getInstance();
//		cal.set(2018, 4, 3);
//		t.setEventDate(cal.getTime());		
//		list.add(t);
//		
//		t = new ModelEvent();
//		//t.setId(108);
//		t.setType("1");
//		t.setCategory("13");
//		t.setAmount("1");
//		t.setDetail("test");
//		cal = Calendar.getInstance();
//		cal.set(2018, 4, 4);
//		t.setEventDate(cal.getTime());		
//		list.add(t);
//		
//		ModelJsonResult result = new ModelJsonResult();
//		result.setStatus(1);
//		result.setModelResult(list);
//		
////		HashMap<String,Object> hm = new HashMap<String,Object>();
////		hm.put("testtest", t);
//		String json = this.mngJson.ConvertObjectToJson(result);
//		return json;
//	}
//
//	public String CreateEvent(ModelEvent target) 
//				throws JsonProcessingException{
//	
//		target.setId(new Random().nextInt());
//
//		ModelJsonResult result = new ModelJsonResult();
//		result.setStatus(9);
//		result.setModelResult(target);
//		
//		String json = this.mngJson.ConvertObjectToJson(result);
//		return json;
//	}
//
//	public String UpdateEvent(ModelEvent target) 
//				throws JsonProcessingException{
//
//		ModelJsonResult result = new ModelJsonResult();
//		result.setStatus(1);
//		result.setModelResult(target);
//		
//		String json = this.mngJson.ConvertObjectToJson(result);
//		return json;
//	}
//	
//	public String GetMonthTask() 
//				throws JsonProcessingException{
//		ModelTask t = new ModelTask();
//		t.setId(1);
//		t.setTitle("タイトル");
//		t.setLocation("川口");
//		t.setTaskType(1);
//		Calendar start = Calendar.getInstance();
//		start.set(2018, 3, 20);
//		t.setStartDate(start);
//		String json = this.mngJson.ConvertObjectToJson(t);
//		return json;
//	}
//}
