package sample.web.taskweb.model;

import sample.web.common.model.ModelTableCommon;

public class ModelCommonValues
	extends ModelTableCommon  {

	
	private int commonValueType;
	private int keyValue;
	private String valueText;
	
	public int getCommonValueType() {
		return commonValueType;
	}
	public void setCommonValueType(int commonValueType) {
		this.commonValueType = commonValueType;
	}
	public int getKeyValue() {
		return keyValue;
	}
	public void setKeyValue(int keyValue) {
		this.keyValue = keyValue;
	}
	public String getValueText() {
		return valueText;
	}
	public void setValueText(String valueText) {
		this.valueText = valueText;
	}

}
