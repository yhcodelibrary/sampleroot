package sample.web.common.model;

import java.io.Serializable;

public class ModelActionInfo implements ModelSession, Serializable{

	private String actionName;
	
	public String getActionName() {
		return actionName;
	}

	public void setActionName(String actionName) {
		this.actionName = actionName;
	}
}
