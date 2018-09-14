package sample.web.taskweb.model;

import sample.web.common.util.CheckDateString;

public class ModelRequestDateRange {

	private String type;
	
	@CheckDateString
	private String fromDate;
	
	@CheckDateString
	private String toDate;

	public String getType() {
		return type;
	}
	public void setType(String type) {
		this.type = type;
	}
	public String getFromDate() {
		return fromDate;
	}
	public void setFromDate(String fromDate) {
		this.fromDate = fromDate;
	}
	public String getToDate() {
		return toDate;
	}
	public void setToDate(String toDate) {
		this.toDate = toDate;
	}
}
