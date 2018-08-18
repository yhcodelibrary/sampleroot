package sample.web.taskweb.model;

import java.io.Serializable;

public class ModelRequestCommonType implements Serializable{

	private static final long serialVersionUID = 2L;
	
	private int type;

	public int getType() {
		return type;
	}

	public void setType(int type) {
		this.type = type;
	}
	
}
