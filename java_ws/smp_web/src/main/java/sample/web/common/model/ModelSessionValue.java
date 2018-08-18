package sample.web.common.model;

import java.io.Serializable;

public class ModelSessionValue extends ModelSession implements Serializable {

//	public ModelSessionValue()
//	{
//		
//	}
	
	private int userId;

	public int getUserId() {
		return userId;
	}

	public void setUserId(int userId) {
		this.userId = userId;
	}
	
}
