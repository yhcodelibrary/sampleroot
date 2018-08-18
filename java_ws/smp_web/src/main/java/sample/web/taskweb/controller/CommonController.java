package sample.web.taskweb.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import sample.web.common.ilogic.ManageJson;
import sample.web.taskweb.model.ModelJsonResult;
import sample.web.taskweb.model.ModelRequestCommonType;
import sample.web.taskweb.service.ServiceCommonImpl;

//@SpringBootApplication
@RestController
@RequestMapping("/api/common")
@CrossOrigin
public class CommonController {

	@Autowired
	ManageJson mngJson;
	
	@Autowired
	ServiceCommonImpl service;

	@RequestMapping("/getCommonTypeGroup")
	ResponseEntity<String> getCommonTypeGroup(@RequestBody ModelRequestCommonType bean) throws Exception {

		// 戻り値を作成
		ModelJsonResult result = new ModelJsonResult();

		// 検索の実行
		result.setModelResult(this.service.getTypeGroup(bean.getType()));

		HttpHeaders responseHeaders = new HttpHeaders();

		ResponseEntity<String> response = new ResponseEntity<String>(this.mngJson.ConvertObjectToJson(result),
				responseHeaders, HttpStatus.OK);

		return response;
	}
}
