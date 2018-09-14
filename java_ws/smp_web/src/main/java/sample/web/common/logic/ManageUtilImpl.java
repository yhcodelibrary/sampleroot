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

import sample.web.common.define.CommonConst;
import sample.web.common.model.ModelValidErrors;
import sample.web.taskweb.model.ModelJsonResult;

@Component
public class ManageUtilImpl implements ManageUtil {

	@Autowired
	MessageSource messageSource;
	
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

}
	
