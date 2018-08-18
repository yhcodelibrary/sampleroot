package sample.web.taskweb.model;

public class ModelJsonResult {
	private int status;
	private Object modelResult;
	
	public ModelJsonResult()
	{
		//ステータス正常を初期値
		this.status = 1;
		
	}
	
	public int getStatus() {
		return status;
	}
	public void setStatus(int status) {
		this.status = status;
	}
	public Object getModelResult() {
		return modelResult;
	}
	public void setModelResult(Object modelResult) {
		this.modelResult = modelResult;
	}
	
	
}
