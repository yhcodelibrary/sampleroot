package sample.web.common.logic;

import java.util.Date;

import org.springframework.stereotype.Component;

import sample.web.common.ilogic.ManageUtil;

@Component
public class ManageUtilImpl implements ManageUtil {

	public Date getDate(int year,int month, int day) 
	{
		Date result = new Date(year - 1900, month, day);
		
		return result;
	}
}
	
