package sample.web.common.model;

import java.util.ArrayList;
import java.util.List;

public class ModelValidErrors {
	private List<String> errorMessages;
	private List<String> codes;
	
	public ModelValidErrors()
	{
		this.errorMessages = new ArrayList<String>();
		this.codes = new ArrayList<String>();
	}
	
	public List<String> getErrorMessages() {
		return errorMessages;
	}
	public void setErrorMessages(List<String> errorMessages) {
		this.errorMessages = errorMessages;
	}
	
	public void addErrorMessage(String message)
	{
		this.errorMessages.add(message);
	}
	
	public List<String> getCodes() {
		return codes;
	}
	public void setCodes(List<String> codes) {
		this.codes = codes;
	}
	
	public void addCode(String code)
	{
		this.codes.add(code);
	}
}
