package sample.web.common.ilogic;

import java.io.IOException;

import com.fasterxml.jackson.core.JsonProcessingException;

public interface ManageJson {

	public <T extends Object> String ConvertObjectToJson(T tar) 
			throws JsonProcessingException;

	public <T extends Object> T ConvertJsonToObject(String tar,Class<T> typeParameterClass) 
			throws IOException;
	
}
