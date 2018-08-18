package sample.web.taskweb.model;

import java.util.Date;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;

import com.fasterxml.jackson.annotation.JsonFormat;

import sample.web.common.model.ModelTableCommon;

//@Entity // This tells Hibernate to make a table out of this class
//@Table(name="T_SMP_Event")
//@Getter
//@Setter
public class ModelEvent 
	extends ModelTableCommon 
//	implements Serializable  
{

//    @Id
//    @GeneratedValue(strategy=GenerationType.AUTO)
	private int eventId;
	@NotBlank()
	private String type;
	@NotBlank()
	private String category;
	private String amount;
	private String detail;
	private String note;
//	@NotBlank()
	@NotNull
	private Date eventDate;
	public int getEventId() {
		return eventId;
	}
	public void setEventId(int eventId) {
		this.eventId = eventId;
	}
	public String getType() {
		return type;
	}
	public void setType(String type) {
		this.type = type;
	}
	public String getCategory() {
		return category;
	}
	public void setCategory(String category) {
		this.category = category;
	}
	public String getAmount() {
		return amount;
	}
	public void setAmount(String amount) {
		this.amount = amount;
	}
	public String getDetail() {
		return detail;
	}
	public void setDetail(String detail) {
		this.detail = detail;
	}
	public String getNote() {
		return note;
	}
	public void setNote(String note) {
		this.note = note;
	}
	@JsonFormat(pattern = "yyyy/MM/dd", timezone = "Asia/Tokyo")
	public Date getEventDate() {
		return eventDate;
	}
	public void setEventDate(Date eventDate) {
		this.eventDate = eventDate;
	}

}
