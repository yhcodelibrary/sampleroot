package sample.web.common.logic;

import java.text.ParseException;
import java.util.Date;

import org.springframework.validation.BindingResult;

import com.fasterxml.jackson.core.JsonProcessingException;

import sample.web.common.define.CommonConst;
import sample.web.common.model.ModelActionInfo;
import sample.web.common.model.ModelTableCommon;
import sample.web.taskweb.model.ModelJsonResult;

public interface ManageUtil {

	public Date getDate(int year,int month, int day) ;

	public Date getDate(String target) throws ParseException ;

	public Boolean getErrorResult(ModelJsonResult ret ,BindingResult result);
	

	public void setCreateInfo(ModelTableCommon tb) throws JsonProcessingException;
	
	public void setCreateInfo(ModelTableCommon tb, String prgName);

	public void setUpdateInfo(ModelTableCommon tb) throws JsonProcessingException ;
	
	public void setUpdateInfo(ModelTableCommon tb, String prgName);
}
