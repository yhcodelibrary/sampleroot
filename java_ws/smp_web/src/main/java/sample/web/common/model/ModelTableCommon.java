package sample.web.common.model;

import java.util.Date;

import org.springframework.beans.factory.annotation.Autowired;

import com.fasterxml.jackson.core.JsonProcessingException;

import sample.web.common.define.CommonConst;
import sample.web.common.logic.ManageSession;

public class ModelTableCommon {

	
	public static final String ITEM_DEFINE = ",ssCreateDate,ssCreatePrg,ssUpdateDate,ssUpdatePrg,ssVersion";

	public static final String INSERT_VALUE = ", #{ssCreateDate}, #{ssCreatePrg}, #{ssUpdateDate}, #{ssUpdatePrg}, #{ssVersion}";
	
	private int userId;
	private Date ssCreateDate;
	private String ssCreatePrg;
	private Date ssUpdateDate;
	private String ssUpdatePrg;
	private int ssVersion;
	private int ssIsDelete;

	public int getUserId() {
		return userId;
	}
	public void setUserId(int userId) {
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

	public int getSsIsDelete() {
		return ssIsDelete;
	}
	public void setSsIsDelete(int ssIsDelete) {
		this.ssIsDelete = ssIsDelete;
	}
}
