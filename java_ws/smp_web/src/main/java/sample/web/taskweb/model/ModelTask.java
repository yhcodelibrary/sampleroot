package sample.web.taskweb.model;

import java.util.Calendar;

import com.fasterxml.jackson.annotation.JsonFormat;

public class ModelTask {

	private int Id;
	private String Title;
	private String Detail;
	private String Location;
	private Calendar StartDate;
	private Calendar EndDate;
	private String Tags;
	private int ImportanceType;
	private int TaskType;
	
	public int getId() {
		return Id;
	}
	public void setId(int id) {
		Id = id;
	}
	public String getTitle() {
		return Title;
	}
	public void setTitle(String title) {
		Title = title;
	}
	public String getDetail() {
		return Detail;
	}
	public void setDetail(String detail) {
		Detail = detail;
	}
	public String getLocation() {
		return Location;
	}
	public void setLocation(String location) {
		Location = location;
	}
	@JsonFormat(pattern = "yyyy/MM/dd HH:mm:ss")
	public Calendar getStartDate() {
		return StartDate;
	}
	public void setStartDate(Calendar startDate) {
		StartDate = startDate;
	}
	public Calendar getEndDate() {
		return EndDate;
	}
	public void setEndDate(Calendar endDate) {
		EndDate = endDate;
	}
	public String getTags() {
		return Tags;
	}
	public void setTags(String tags) {
		Tags = tags;
	}
	public int getImportanceType() {
		return ImportanceType;
	}
	public void setImportanceType(int importanceType) {
		ImportanceType = importanceType;
	}
	public int getTaskType() {
		return TaskType;
	}
	public void setTaskType(int taskType) {
		TaskType = taskType;
	}
}
