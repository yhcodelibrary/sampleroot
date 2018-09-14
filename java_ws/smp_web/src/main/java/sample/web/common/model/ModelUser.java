package sample.web.common.model;

import java.io.Serializable;

public class ModelUser 
	extends ModelTableCommon
	implements ModelSession , Serializable{
	
	/**
	 * 
	 */
	private static final long serialVersionUID = 3564805125571984737L;
	
	public int userId;
	public String userName;
	public String password;
	
	public int getUserId() {
		return userId;
	}
	public void setUserId(int userId) {
		this.userId = userId;
	}
	public String getUserName() {
		return userName;
	}
	public void setUserName(String userName) {
		this.userName = userName;
	}
	public String getPassword() {
		return password;
	}
	public void setPassword(String password) {
		this.password = password;
	}
}
