package sample.web.common.logic;

import java.text.ParseException;
import java.util.Date;

import org.springframework.validation.BindingResult;

import sample.web.taskweb.model.ModelJsonResult;

public interface ManageUtil {

	public Date getDate(int year,int month, int day) ;

	public Date getDate(String target) throws ParseException ;

	public Boolean getErrorResult(ModelJsonResult ret ,BindingResult result);
}
