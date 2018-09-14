package sample.web.taskweb.model;

import java.io.Serializable;

public class ModelEventSummary implements Serializable {
	
	/**
	 * 
	 */
	private static final long serialVersionUID = 5359353248380085508L;
	
	private String type;
	private String itemText;
	private int amount;

	public String getType() {
		return type;
	}
	public void setType(String type) {
		this.type = type;
	}
	public String getItemText() {
		return itemText;
	}
	public void setItemText(String itemText) {
		this.itemText = itemText;
	}
	public int getAmount() {
		return amount;
	}
	public void setAmount(int amount) {
		this.amount = amount;
	}
}
