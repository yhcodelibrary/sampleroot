package sample.web.taskweb.model;

import java.io.Serializable;

public class ModelRequestMonth implements Serializable {

	private static final long serialVersionUID = 1L;
		
	private int year;
	private int month;

	public int getMonth() {
		return month;
	}
	public void setMonth(int month) {
		this.month = month;
	}
	public int getYear() {
		return year;
	}
	public void setYear(int year) {
		this.year = year;
	}	
}
