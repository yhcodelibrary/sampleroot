package sample.web.common.logic;

import java.io.IOException;

import org.springframework.stereotype.Component;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.SerializationFeature;

import sample.web.common.ilogic.ManageJson;
 
@Component
public class ManageJsonImpl implements ManageJson {

	public <T extends Object> String ConvertObjectToJson(T tar) 
			throws JsonProcessingException
	{
        ObjectMapper mapper = new ObjectMapper();
        mapper.enable(SerializationFeature.INDENT_OUTPUT);

        String json = mapper.writeValueAsString(tar);
        
        return json;
	}

	public <T extends Object> T ConvertJsonToObject(String tar,Class<T> typeParameterClass) 
			throws IOException
	{
        ObjectMapper mapper = new ObjectMapper();
        mapper.enable(SerializationFeature.INDENT_OUTPUT);

		//JSONデータからJavaオブジェクトに変換
		T result = mapper.readValue(tar, typeParameterClass);
        
		return result;
	}
}
