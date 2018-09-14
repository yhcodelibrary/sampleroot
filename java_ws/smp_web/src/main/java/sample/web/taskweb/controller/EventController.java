package sample.web.taskweb.controller;

import java.util.Locale;

import javax.servlet.http.HttpSession;
import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.MessageSource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import sample.web.common.define.CommonConst;
import sample.web.common.logic.ManageJson;
import sample.web.common.logic.ManageSession;
import sample.web.common.logic.ManageUtil;
import sample.web.common.model.ModelValidErrors;
import sample.web.taskweb.model.ModelEvent;
import sample.web.taskweb.model.ModelJsonResult;
import sample.web.taskweb.model.ModelRequestDateRange;
import sample.web.taskweb.model.ModelRequestMonth;
import sample.web.taskweb.model.ModelSessionTest;
import sample.web.taskweb.service.ServiceEvent;

//@SpringBootApplication

@RestController
@RequestMapping("/api/event")
@CrossOrigin("http://localhost:4200")
public class EventController {

	@Autowired
	MessageSource messageSource;

	@Autowired
	ManageJson mngJson;

	@Autowired
	ManageUtil mngUtil;

	@Autowired
	ManageSession session;

	@Autowired
	ServiceEvent service;
	
//	@RequestMapping("/get")
//	String get(HttpSession httpSession) throws Exception {
//
//		ModelSessionValue m = new ModelSessionValue();
//		m.setUserId((int)(Math.random() * 100));
//		session.<ModelSessionValue>setTemporary("key", m, ModelSessionValue.class);
//
//		return String.valueOf(m.getUserId());
//		// return "get world";
//	}
//
//	@RequestMapping("/get2")
//	String get2(HttpSession httpSession) throws Exception {
//
//		ModelSessionValue model = session.<ModelSessionValue>getTemporary("key", ModelSessionValue.class);
//
//		return String.valueOf(model.getUserId());
//		// return "get world";
//	}

//	@RequestMapping("/get3")
//	String get3(HttpSession httpSession) throws Exception {
//
//		ModelEvent te = this.service.get();
//
//		return String.valueOf(te.getDetail());
//		// return "get world";
//	}

	@RequestMapping("/test")
	String test(HttpSession httpSession) throws Exception {

		ModelSessionTest m = (ModelSessionTest) httpSession.getAttribute("test");

		return m.getName();
		// return "get world";
	}

	/**
	 * 指定した月のイベントデータを検索する。
	 * 前後10日ほどを含む
	 * @param bean
	 * @return
	 * @throws Exception
	 */
	@RequestMapping("/getMonthEvents")
	ResponseEntity<String> getMonthEvents(@RequestBody ModelRequestMonth bean) throws Exception {

		// 戻り値を作成
		ModelJsonResult result = new ModelJsonResult();

		// 検索の実行
		result.setModelResult(this.service.getMonthList(bean.getYear(), bean.getMonth()));

		HttpHeaders responseHeaders = new HttpHeaders();

		ResponseEntity<String> response = new ResponseEntity<String>(this.mngJson.ConvertObjectToJson(result),
				responseHeaders, HttpStatus.OK);

		return response;
	}

	/**
	 * 指定した範囲のイベントデータを検索する。
	 * @param bean
	 * @return
	 * @throws Exception
	 */
	@RequestMapping("/getRangeEvents")
	ResponseEntity<String> getRangeEvents(@RequestBody @Valid ModelRequestDateRange bean, BindingResult result) throws Exception {

		// 戻り値を作成
		ModelJsonResult ret = new ModelJsonResult();

		//バリデーションエラーがない場合に検索の実行
		if(this.mngUtil.getErrorResult(ret, result)== true)
		{
			// 検索の実行
			ret.setModelResult(this.service.getRangeList(this.mngUtil.getDate(bean.getFromDate()),this.mngUtil.getDate(bean.getToDate())));
		}
		HttpHeaders responseHeaders = new HttpHeaders();

		ResponseEntity<String> response = new ResponseEntity<String>(this.mngJson.ConvertObjectToJson(ret),
				responseHeaders, HttpStatus.OK);

		return response;
	}

	/**
	 * 指定した範囲のイベントデータを検索する。
	 * @param bean
	 * @return
	 * @throws Exception
	 */
	@RequestMapping("/getEventSummary")
	ResponseEntity<String> getEventSummary(@RequestBody @Valid ModelRequestDateRange bean, BindingResult result) throws Exception {

		System.out.println("test2:" + bean);
		// 戻り値を作成
		ModelJsonResult ret = new ModelJsonResult();

		System.out.println(bean);

		//バリデーションエラーがない場合に検索の実行
		if(this.mngUtil.getErrorResult(ret, result)== true)
		{
			ret.setModelResult(this.service.getEventSummary(bean.getType(),this.mngUtil.getDate(bean.getFromDate()),this.mngUtil.getDate(bean.getToDate())));
		}

		HttpHeaders responseHeaders = new HttpHeaders();
		
		ResponseEntity<String> response = new ResponseEntity<String>(this.mngJson.ConvertObjectToJson(ret),
				responseHeaders, HttpStatus.OK);

		return response;
	}
	
	/**
	 * イベントデータの新規登録を行う。
	 * 
	 * @param target
	 * @param result
	 * @return
	 * @throws Exception
	 */
	@RequestMapping("/createEvent")
	ResponseEntity<String> createEvent(@RequestBody @Valid ModelEvent target, BindingResult result) throws Exception {

		// 戻り値を作成
		ModelJsonResult ret = new ModelJsonResult();

		//バリデーションエラーがない場合に登録処理を行う
		if(this.mngUtil.getErrorResult(ret, result)== true)
		{
			this.service.createEvent(target);
		}
		
		//レスポンス情報を作成
		HttpHeaders responseHeaders = new HttpHeaders();
		ResponseEntity<String> response = new ResponseEntity<String>(this.mngJson.ConvertObjectToJson(ret),
				responseHeaders, HttpStatus.OK);
		
		return response;
	}

	
	/**
	 * イベントデータの更新を行う。
	 * 
	 * @param target
	 * @param result
	 * @return
	 * @throws Exception
	 */
	@RequestMapping("/updateEvent")
	ResponseEntity<String> updateEvent(@RequestBody @Valid ModelEvent target, BindingResult result) throws Exception {

		// 戻り値を作成
		ModelJsonResult ret = new ModelJsonResult();

		//バリデーションエラーがない場合に更新処理を行う
		if(this.mngUtil.getErrorResult(ret, result)== true)
		{
			this.service.updateEvent(target);
		}
		
		//レスポンス情報を作成
		HttpHeaders responseHeaders = new HttpHeaders();
		ResponseEntity<String> response = new ResponseEntity<String>(this.mngJson.ConvertObjectToJson(ret),
				responseHeaders, HttpStatus.OK);
		
		return response;
	}
}
