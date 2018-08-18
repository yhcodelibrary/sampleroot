package sample.web.taskweb.controller;

import java.io.Serializable;
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

import sample.web.common.ilogic.ManageJson;
import sample.web.common.logic.ManageSession;
import sample.web.common.model.ModelSessionValue;
import sample.web.common.model.ModelValidErrors;
import sample.web.taskweb.model.ModelEvent;
import sample.web.taskweb.model.ModelJsonResult;
import sample.web.taskweb.model.ModelRequestMonth;
import sample.web.taskweb.model.ModelSessionTest;
import sample.web.taskweb.service.ServiceEvent;

//@SpringBootApplication

@RestController
@RequestMapping("/api/event")
@CrossOrigin
public class EventController {

	@Autowired
	MessageSource messageSource;

	@Autowired
	ManageJson mngJson;

	@Autowired
	ManageSession session;

	@Autowired
	ServiceEvent service;
	
	@RequestMapping("/get")
	String get(HttpSession httpSession) throws Exception {

		ModelSessionValue m = new ModelSessionValue();
		m.setUserId((int)(Math.random() * 100));
		session.<ModelSessionValue>setTemporary("key", m, ModelSessionValue.class);

		return String.valueOf(m.getUserId());
		// return "get world";
	}

	@RequestMapping("/get2")
	String get2(HttpSession httpSession) throws Exception {

		ModelSessionValue model = session.<ModelSessionValue>getTemporary("key", ModelSessionValue.class);

		return String.valueOf(model.getUserId());
		// return "get world";
	}

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

	// public String login(HttpSession httpSession, @RequestParam("userid") String
	// userId) {
	@RequestMapping("/getMonthEvents")
	ResponseEntity<String> getMonthEvents(@RequestBody ModelRequestMonth bean) throws Exception {

		// 戻り値を作成
		ModelJsonResult result = new ModelJsonResult();

		// 検索の実行
		result.setModelResult(this.service.getMonthList(bean.getYear(), bean.getMonth()));

		HttpHeaders responseHeaders = new HttpHeaders();
		// ResponseEntity<String> result = new ResponseEntity<String>(model.GetJson(),
		// responseHeaders, HttpStatus.OK);
		ResponseEntity<String> response = new ResponseEntity<String>(this.mngJson.ConvertObjectToJson(result),
				responseHeaders, HttpStatus.OK);

		return response;
		// return "get world";
	}
	
	protected void getErrorResult(ModelJsonResult ret ,BindingResult result)
	{
		//バリデーションエラーインスタンスの作成
		ModelValidErrors errors = new ModelValidErrors();
		
		ret.setStatus(2);
		
		//エラーメッセージ値を格納
		for (FieldError err : result.getFieldErrors()) {
			System.out.println(err);
			String mes = messageSource.getMessage(err.getCode(), err.getArguments(), err.getDefaultMessage(),
					Locale.getDefault());
			System.out.println(mes);
			errors.addErrorMessage(mes);
			errors.addCode(err.getField());
			// log.debug("error code = [" + err.getCode() + "]");
		}

		//戻り値を格納する
		ret.setModelResult(errors);
	}

	@RequestMapping("/createEvent")
	ResponseEntity<String> createEvent(@RequestBody @Valid ModelEvent target, BindingResult result) throws Exception {

		// 戻り値を作成
		ModelJsonResult ret = new ModelJsonResult();

		//アノテーションバリデーションエラーがある場合
		if (result.hasErrors()) {
			
			//バリデーションエラーの結果を処理
			this.getErrorResult(ret,result);
		}
		else
		{
			//登録処理を行う
			this.service.createEvent(target);
		}
		
		//レスポンス情報を作成
		HttpHeaders responseHeaders = new HttpHeaders();
		ResponseEntity<String> response = new ResponseEntity<String>(this.mngJson.ConvertObjectToJson(ret),
				responseHeaders, HttpStatus.OK);
		
		return response;
	}

	@RequestMapping("/updateEvent")
	ResponseEntity<String> updateEvent(@RequestBody @Valid ModelEvent target, BindingResult result) throws Exception {

		// 戻り値を作成
		ModelJsonResult ret = new ModelJsonResult();

		//アノテーションバリデーションエラーがある場合
		if (result.hasErrors()) {
			
			//バリデーションエラーの結果を処理
			this.getErrorResult(ret,result);
		}
		else
		{
			//登録処理を行う
			this.service.updateEvent(target);
		}
		
		//レスポンス情報を作成
		HttpHeaders responseHeaders = new HttpHeaders();
		ResponseEntity<String> response = new ResponseEntity<String>(this.mngJson.ConvertObjectToJson(ret),
				responseHeaders, HttpStatus.OK);
		
		return response;
	}
}
