package sample.web.common.controller;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import sample.web.common.define.CommonConst;
import sample.web.common.logic.ManageJson;
import sample.web.common.logic.ManageSession;
import sample.web.common.model.ModelUser;
import sample.web.common.model.ModelValidErrors;
import sample.web.taskweb.model.ModelJsonResult;

@RestController
@RequestMapping("/api/account")
@CrossOrigin
public class AccountController {

	@Autowired
	ManageJson mngJson;

	@Autowired
	ManageSession session;

	/**
	 * ログイン処理
	 * @param target
	 * @param result
	 * @return
	 * @throws Exception
	 */
	@RequestMapping("/login")
	ResponseEntity<String> login(@RequestBody @Valid ModelUser target, BindingResult result) throws Exception 
	{

		// 戻り値を作成
		ModelJsonResult ret = new ModelJsonResult();

		//仮実装
		if(target.getUserName() != "sample" || target.getPassword() != "sample1")
		{
			//バリデーションエラーインスタンスの作成
			ModelValidErrors errors = new ModelValidErrors();
			
			errors.addErrorMessage("ユーザー名、パスワードのいずれかに誤りがあります。");
			
			ret.setModelResult(errors);
		}		
		else
		{
			//情報をセッションに格納
			this.session.setNever(CommonConst.SystemSession.LoginInfo,target,ModelUser.class);			
		}
		//レスポンス情報を作成
		HttpHeaders responseHeaders = new HttpHeaders();
		ResponseEntity<String> response = new ResponseEntity<String>(this.mngJson.ConvertObjectToJson(ret),
				responseHeaders, HttpStatus.OK);
		
		return response;
	}
	

	/**
	 * ログアウト処理
	 * @param target
	 * @param result
	 * @return
	 * @throws Exception
	 */
	@RequestMapping("/logout")
	void logout() throws Exception 
	{
		this.session.clearTemporary();
		this.session.clearNever();
	}
}
