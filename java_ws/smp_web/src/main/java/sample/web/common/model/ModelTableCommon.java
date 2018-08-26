package sample.web.common.model;

import java.util.Date;

import org.springframework.beans.factory.annotation.Autowired;

import com.fasterxml.jackson.core.JsonProcessingException;

import sample.web.common.define.CommonConst;
import sample.web.common.logic.ManageSession;

public class ModelTableCommon {

	@Autowired
	ManageSession session;
	
	public static final String ITEM_DEFINE = ",ssCreateDate,ssCreatePrg,ssUpdateDate,ssUpdatePrg,ssVersion";

	public static final String INSERT_VALUE = ", #{ssCreateDate}, #{ssCreatePrg}, #{ssUpdateDate}, #{ssUpdatePrg}, #{ssVersion}";
	
	private int userId;
	private Date ssCreateDate;
	private String ssCreatePrg;
	private Date ssUpdateDate;
	private String ssUpdatePrg;
	private int ssVersion;

	public int getUserId() {
		return userId;
	}
	public void setUserId(int useId) {
		this.userId = userId;
	}
	public Date getSsCreateDate() {
		return ssCreateDate;
	}
	public void setSsCreateDate(Date ssCreateDate) {
		this.ssCreateDate = ssCreateDate;
	}
	public String getSsCreatePrg() {
		return ssCreatePrg;
	}
	public void setSsCreatePrg(String ssCreatePrg) {
		this.ssCreatePrg = ssCreatePrg;
	}
	public Date getSsUpdateDate() {
		return ssUpdateDate;
	}
	public void setSsUpdateDate(Date ssUpdateDate) {
		this.ssUpdateDate = ssUpdateDate;
	}
	public String getSsUpdatePrg() {
		return ssUpdatePrg;
	}
	public void setSsUpdatePrg(String ssUpdatePrg) {
		this.ssUpdatePrg = ssUpdatePrg;
	}
	public int getSsVersion() {
		return ssVersion;
	}
	public void setSsVersion(int ssVersion) {
		this.ssVersion = ssVersion;
	}

	public void setCreateInfo() throws JsonProcessingException
	{
		ModelActionInfo info = this.session.getNever(CommonConst.SystemSession.ActionInfo, ModelActionInfo.class);
		
		this.setCreateInfo(info.getActionName());
	}
	public void setCreateInfo(String prgName)
	{
		this.setSsCreateDate(new Date());
		this.setSsCreatePrg(prgName);
		this.setSsUpdateDate(new Date());
		this.setSsUpdatePrg(prgName);
		this.setSsVersion(1);
	}

	public void setUpdateInfo() throws JsonProcessingException 
	{
		ModelActionInfo info = this.session.getNever(CommonConst.SystemSession.ActionInfo, ModelActionInfo.class);

		this.setUpdateInfo(info.getActionName());
	}
	public void setUpdateInfo(String prgName) 
	{
		this.setUserId(1);
		this.setSsUpdateDate(new Date());
		this.setSsUpdatePrg(prgName);
		this.setSsVersion(this.ssVersion + 1);
	}
}
