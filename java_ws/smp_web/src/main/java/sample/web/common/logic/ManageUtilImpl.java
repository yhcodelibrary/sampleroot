package sample.web.common.logic;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.Locale;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.MessageSource;
import org.springframework.stereotype.Component;
import org.springframework.validation.BindingResult;
import org.springframework.validation.FieldError;

import com.fasterxml.jackson.core.JsonProcessingException;

import sample.web.common.define.CommonConst;
import sample.web.common.model.ModelActionInfo;
import sample.web.common.model.ModelTableCommon;
import sample.web.common.model.ModelValidErrors;
import sample.web.taskweb.model.ModelJsonResult;

@Component
public class ManageUtilImpl implements ManageUtil {

	@Autowired
	MessageSource messageSource;
	
	@Autowired
	ManageSession session;
	
	public Date getDate(int year,int month, int day) 
	{
		Date result = new Date(year - 1900, month, day);
		
		return result;
		
	}

	public Date getDate(String target) throws ParseException 
	{
		SimpleDateFormat sdf = new SimpleDateFormat("yyyy/MM/dd");
		Date date = sdf.parse(target);
		
		return date;
		
	}
	
	public Boolean getErrorResult(ModelJsonResult ret ,BindingResult result)
	{

		//アノテーションバリデーションエラーがない場合
		if (result.hasErrors() == false) {
			return true;
		}
		//バリデーションエラーインスタンスの作成
		ModelValidErrors errors = new ModelValidErrors();
		
		ret.setStatus(CommonConst.AngularPostStatus.ValidationError);
		
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
		
		return false;
	}

	public void setCreateInfo(ModelTableCommon tb) throws JsonProcessingException
	{
		ModelActionInfo info = this.session.getNever(CommonConst.SystemSession.ActionInfo, ModelActionInfo.class);
		
		this.setCreateInfo(tb, info.getActionName());
	}
	public void setCreateInfo(ModelTableCommon tb, String prgName)
	{
		tb.setSsCreateDate(new Date());
		tb.setSsCreatePrg(prgName);
		tb.setSsUpdateDate(new Date());
		tb.setSsUpdatePrg(prgName);
		tb.setSsVersion(1);
		tb.setSsIsDelete(0);
	}

	public void setUpdateInfo(ModelTableCommon tb) throws JsonProcessingException 
	{
		ModelActionInfo info = this.session.getNever(CommonConst.SystemSession.ActionInfo, ModelActionInfo.class);

		this.setUpdateInfo(tb, info.getActionName());
	}
	public void setUpdateInfo(ModelTableCommon tb, String prgName) 
	{
		tb.setUserId(1);
		tb.setSsUpdateDate(new Date());
		tb.setSsUpdatePrg(prgName);
	}
}
	
